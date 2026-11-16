import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Idea2OdishiRegistration, TeamMemberDetail } from '@/types';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'data', 'idea2odishi_registrations.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'idea2odishi');

// Helper to ensure directories exist
function ensureDirs() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// Helper to read local registrations
function readLocalRegistrations(): Idea2OdishiRegistration[] {
  try {
    ensureDirs();
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading local idea2odishi registrations:', err);
  }
  return [];
}

// Helper to write local registrations
function writeLocalRegistrations(regs: Idea2OdishiRegistration[]) {
  try {
    ensureDirs();
    fs.writeFileSync(DATA_FILE, JSON.stringify(regs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local idea2odishi registrations:', err);
  }
}

// Helper to generate sequential registration ID: I2O001, I2O002, etc.
async function getNextRegistrationId(): Promise<string> {
  const localRegs = readLocalRegistrations();
  let maxNum = 0;

  // Check local numbers
  for (const reg of localRegs) {
    const match = reg.id.match(/^I2O(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }

  // Check Supabase if configured and reachable
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('idea2odishi_registrations')
        .select('id');
      if (!error && Array.isArray(data)) {
        for (const row of data) {
          const match = (row.id || '').match(/^I2O(\d+)$/i);
          if (match) {
            const num = parseInt(match[1], 10);
            if (!isNaN(num) && num > maxNum) {
              maxNum = num;
            }
          }
        }
      }
    } catch {
      // Supabase unreachable or in sandbox, maxNum from local is used
    }
  }

  const nextNum = maxNum + 1;
  return `I2O${String(nextNum).padStart(3, '0')}`;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    const localRegs = readLocalRegistrations();

    if (id) {
      const match = localRegs.find((r) => r.id.toLowerCase() === id.toLowerCase());
      if (match) {
        return NextResponse.json({ success: true, registration: match });
      }
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      count: localRegs.length,
      registrations: localRegs,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    ensureDirs();

    const formData = await req.formData();

    // 1. Extract Fields
    const team_name = (formData.get('team_name') as string || '').trim();
    const leader_name = (formData.get('leader_name') as string || '').trim();
    const leader_email = (formData.get('leader_email') as string || '').trim().toLowerCase();
    const leader_phone = (formData.get('leader_phone') as string || '').trim();
    const leader_roll = (formData.get('leader_roll') as string || '').trim().toUpperCase();
    const leader_stream_branch = (formData.get('leader_stream_branch') as string || '').trim();
    const leader_year = (formData.get('leader_year') as string || '1st Year') as '1st Year' | '2nd Year';

    const idea_title = (formData.get('idea_title') as string || '').trim();
    const category = (formData.get('category') as string || '').trim();
    const problem_statement = (formData.get('problem_statement') as string || '').trim();
    const proposed_solution = (formData.get('proposed_solution') as string || '').trim();
    const short_description = (formData.get('short_description') as string || '').trim();

    // Extract dynamic team members
    const team_members_raw = formData.get('team_members') as string;
    let team_members: TeamMemberDetail[] = [];
    if (team_members_raw) {
      try {
        team_members = JSON.parse(team_members_raw);
      } catch {
        team_members = [];
      }
    }

    // Extract PPT File
    const ppt_file = formData.get('ppt_file') as File | null;

    // 2. Validate Required Fields
    if (!team_name) {
      return NextResponse.json({ success: false, error: 'Team name is required.' }, { status: 400 });
    }
    if (!leader_name) {
      return NextResponse.json({ success: false, error: 'Team leader name is required.' }, { status: 400 });
    }
    if (!leader_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leader_email)) {
      return NextResponse.json({ success: false, error: 'A valid leader email address is required.' }, { status: 400 });
    }
    const phoneClean = leader_phone.replace(/\D/g, '');
    if (phoneClean.length !== 10 || !/^[6-9]\d{9}$/.test(phoneClean)) {
      return NextResponse.json({ success: false, error: 'A valid 10-digit Indian phone number is required.' }, { status: 400 });
    }
    if (!leader_roll) {
      return NextResponse.json({ success: false, error: 'Leader roll number is required.' }, { status: 400 });
    }
    if (!leader_stream_branch) {
      return NextResponse.json({ success: false, error: 'Leader stream/branch is required.' }, { status: 400 });
    }
    if (leader_year !== '1st Year' && leader_year !== '2nd Year') {
      return NextResponse.json({ success: false, error: 'Eligibility is restricted to 1st Year and 2nd Year students.' }, { status: 400 });
    }

    if (!idea_title) {
      return NextResponse.json({ success: false, error: 'Idea / Project title is required.' }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ success: false, error: 'Domain / Category selection is required.' }, { status: 400 });
    }
    if (!problem_statement) {
      return NextResponse.json({ success: false, error: 'Problem statement is required.' }, { status: 400 });
    }
    if (!proposed_solution) {
      return NextResponse.json({ success: false, error: 'Proposed solution is required.' }, { status: 400 });
    }
    if (!short_description) {
      return NextResponse.json({ success: false, error: 'Short project description is required.' }, { status: 400 });
    }

    // Validate Team Members (Max 3 additional members + 1 leader = 4 max)
    if (team_members.length > 3) {
      return NextResponse.json({ success: false, error: 'A team cannot have more than 4 members total.' }, { status: 400 });
    }

    for (let i = 0; i < team_members.length; i++) {
      const m = team_members[i];
      if (!m.name?.trim()) {
        return NextResponse.json({ success: false, error: `Member ${i + 2} name is required.` }, { status: 400 });
      }
      if (!m.roll?.trim()) {
        return NextResponse.json({ success: false, error: `Member ${i + 2} roll number is required.` }, { status: 400 });
      }
      if (m.roll.trim().toUpperCase() === leader_roll) {
        return NextResponse.json({ success: false, error: `Member ${i + 2} roll number cannot match the team leader.` }, { status: 400 });
      }
      const mPhone = (m.phone || '').replace(/\D/g, '');
      if (mPhone.length !== 10 || !/^[6-9]\d{9}$/.test(mPhone)) {
        return NextResponse.json({ success: false, error: `Member ${i + 2} must have a valid 10-digit phone number.` }, { status: 400 });
      }
      if (mPhone === phoneClean) {
        return NextResponse.json({ success: false, error: `Member ${i + 2} phone cannot match the team leader.` }, { status: 400 });
      }
    }

    // 3. Validate PPT File
    if (!ppt_file) {
      return NextResponse.json({ success: false, error: 'PowerPoint presentation (.ppt or .pptx) file is required.' }, { status: 400 });
    }

    const fileExt = path.extname(ppt_file.name).toLowerCase();
    if (fileExt !== '.pptx' && fileExt !== '.ppt') {
      return NextResponse.json({ success: false, error: 'Invalid file format. Only .ppt and .pptx files are permitted.' }, { status: 400 });
    }

    // Max file size: 25MB
    const MAX_SIZE_BYTES = 25 * 1024 * 1024;
    if (ppt_file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ success: false, error: 'PPT file size exceeds the 25MB limit. Please compress images in your slides.' }, { status: 400 });
    }

    // 4. Check for duplicates
    const localRegs = readLocalRegistrations();
    const duplicate = localRegs.find(
      (r) =>
        (r.team_name && r.team_name.toLowerCase() === team_name.toLowerCase()) ||
        (r.leader_email && r.leader_email.toLowerCase() === leader_email.toLowerCase()) ||
        (r.leader_phone && r.leader_phone.replace(/\D/g, '') === phoneClean) ||
        (r.leader_roll && r.leader_roll.toUpperCase() === leader_roll)
    );

    if (duplicate) {
      let conflictField = 'Team information';
      if (duplicate.team_name?.toLowerCase() === team_name.toLowerCase()) conflictField = `Team Name "${team_name}"`;
      else if (duplicate.leader_email?.toLowerCase() === leader_email.toLowerCase()) conflictField = `Email "${leader_email}"`;
      else if (duplicate.leader_roll?.toUpperCase() === leader_roll) conflictField = `Roll Number "${leader_roll}"`;
      else if (duplicate.leader_phone?.replace(/\D/g, '') === phoneClean) conflictField = `Phone Number "${phoneClean}"`;

      return NextResponse.json(
        {
          success: false,
          error: `A registration with this ${conflictField} has already been registered for Idea2Odishi 2026. Duplicate submissions are not allowed.`,
        },
        { status: 409 }
      );
    }

    // 5. Generate Sequential Registration ID (I2O001, I2O002...)
    const regId = await getNextRegistrationId();

    // 6. Save PPT File to public/uploads/idea2odishi/
    const safeTeam = team_name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const savedFileName = `${regId}_${safeTeam}_pitch${fileExt}`;
    const destinationPath = path.join(UPLOAD_DIR, savedFileName);

    const arrayBuffer = await ppt_file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destinationPath, buffer);

    const ppt_url = `/uploads/idea2odishi/${savedFileName}`;

    // 7. Assemble Structured Registration Record
    const participation_type = team_members.length > 0 ? 'Team' : 'Solo';
    const submitted_at = new Date().toISOString();

    const newRecord: Idea2OdishiRegistration = {
      id: regId,
      submitted_at,
      participation_type,
      team_name,
      leader_name,
      leader_email,
      leader_phone: phoneClean,
      leader_roll,
      leader_stream_branch,
      leader_year,
      team_members,
      idea_title,
      category,
      problem_statement,
      proposed_solution,
      short_description,
      ppt_filename: ppt_file.name,
      ppt_url,
      ppt_filesize: ppt_file.size,
      // Backward compatibility fields:
      name: leader_name,
      roll: leader_roll,
      stream_branch: leader_stream_branch,
      year: leader_year,
      phone: phoneClean,
      member2_name: team_members[0]?.name || undefined,
      member2_roll: team_members[0]?.roll || undefined,
      member2_stream_branch: team_members[0]?.stream_branch || undefined,
      member2_year: team_members[0]?.year || undefined,
      member2_phone: team_members[0]?.phone || undefined,
    };

    // Save to local JSON store
    localRegs.unshift(newRecord);
    writeLocalRegistrations(localRegs);

    // Save to Supabase (compatible with both current and extended schemas)
    if (isSupabaseConfigured && supabase) {
      try {
        const enrichedProblemStatement = `[${category} | ${team_name}] ${idea_title}\n\nPROBLEM:\n${problem_statement}\n\nSOLUTION:\n${proposed_solution}\n\nDESCRIPTION:\n${short_description}\n\n__METADATA__:${JSON.stringify({
          team_name,
          leader_email,
          idea_title,
          category,
          proposed_solution,
          short_description,
          team_members,
          ppt_filename: ppt_file.name,
          ppt_filesize: ppt_file.size,
        })}`;

        const supabaseRow: Record<string, any> = {
          id: regId,
          participation_type,
          name: leader_name,
          roll: leader_roll,
          stream_branch: leader_stream_branch,
          year: leader_year,
          phone: phoneClean,
          problem_statement: enrichedProblemStatement,
          ppt_url,
          member2_name: team_members[0]?.name || null,
          member2_roll: team_members[0]?.roll || null,
          member2_stream_branch: team_members[0]?.stream_branch || null,
          member2_year: team_members[0]?.year || null,
          member2_phone: team_members[0]?.phone || null,
          submitted_at,
        };

        const { error } = await supabase.from('idea2odishi_registrations').insert([supabaseRow]);
        if (error) {
          console.warn('Supabase insert note (local copy is preserved):', error.message);
        }
      } catch (sbErr) {
        console.warn('Supabase insert exception (local copy is preserved):', sbErr);
      }
    }

    // 8. Confirmation Email Dispatch / Log
    console.log(`[Idea2Odishi] Registration confirmed for ${regId}: Team "${team_name}", Leader: ${leader_name} <${leader_email}>`);

    return NextResponse.json({
      success: true,
      registrationId: regId,
      registration: newRecord,
      eventDetails: {
        event_name: 'Idea2Odishi 2026',
        event_date: '26–27 November 2026',
        event_time: '11:00 AM – 3:30 PM',
        venue: 'NIST Seminar Hall 1 & Auditorium, NIST University, Palur Hills',
      },
    });
  } catch (err: any) {
    console.error('Unhandled registration error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to process registration.' },
      { status: 500 }
    );
  }
}

