import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Idea2OdishiRegistration, TeamMemberDetail } from '@/types';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'data', 'idea2odishi_registrations.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'idea2odishi');

const GOOGLE_DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1PFt_IxM8DFoSoRBNBlpPwwx5iw0Ekgky?usp=sharing';
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/DdtjtPi0R80D00x86KEuf4';

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
      // offline / sandbox fallback
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
    const leader_roll_raw = (formData.get('leader_roll') as string || '').trim();
    const leader_stream_branch = (formData.get('leader_stream_branch') as string || '').trim();
    const leader_year = (formData.get('leader_year') as string || '1st Year').trim();

    const idea_title = (formData.get('idea_title') as string || '').trim();
    const category = (formData.get('category') as string || 'Open Innovation').trim();
    const problem_statement = (formData.get('problem_statement') as string || '').trim();
    const proposed_solution = (formData.get('proposed_solution') as string || '').trim();
    const short_description = (formData.get('short_description') as string || '').trim();

    // Drive & WhatsApp confirmations
    const drive_uploaded = formData.get('drive_uploaded') === 'true' || formData.get('drive_uploaded') === 'on';
    const drive_file_name = (formData.get('drive_file_name') as string || `Idea2Odishi_${team_name.replace(/[^a-zA-Z0-9]/g, '_')}`).trim();
    const whatsapp_joined = formData.get('whatsapp_joined') === 'true' || formData.get('whatsapp_joined') === 'on';

    // Extract dynamic team members (Team size: 1 or 2 members max)
    const team_members_raw = formData.get('team_members') as string;
    let team_members: TeamMemberDetail[] = [];
    if (team_members_raw) {
      try {
        team_members = JSON.parse(team_members_raw);
      } catch {
        team_members = [];
      }
    }

    // Optional direct PPT File upload
    const ppt_file = formData.get('ppt_file') as File | null;

    // 2. Validate Required Fields
    if (!team_name) {
      return NextResponse.json({ success: false, error: 'Team name is required.' }, { status: 400 });
    }
    if (!leader_name) {
      return NextResponse.json({ success: false, error: 'Team leader / primary participant name is required.' }, { status: 400 });
    }
    if (!leader_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leader_email)) {
      return NextResponse.json({ success: false, error: 'A valid email address is required.' }, { status: 400 });
    }

    // Validate Leader Phone (10 digits)
    const phoneClean = leader_phone.replace(/\D/g, '');
    if (phoneClean.length !== 10 || !/^[6-9]\d{9}$/.test(phoneClean)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit Indian mobile number.' }, { status: 400 });
    }

    // Validate Leader Roll Number (Strictly 9 Digits in all forms)
    const leaderRollClean = leader_roll_raw.replace(/\D/g, '');
    if (leaderRollClean.length !== 9 || !/^\d{9}$/.test(leaderRollClean)) {
      return NextResponse.json({ success: false, error: 'Team Leader Roll Number must be exactly 9 digits (e.g. 240120110).' }, { status: 400 });
    }

    if (!leader_stream_branch) {
      return NextResponse.json({ success: false, error: 'Department / Branch is required.' }, { status: 400 });
    }

    // All are eligible (1st, 2nd, 3rd, 4th, MCA, etc.)
    if (!leader_year) {
      return NextResponse.json({ success: false, error: 'Academic year is required.' }, { status: 400 });
    }

    // Validate Team Size: 1 or 2 members total (team_members can have at most 1 additional member)
    if (team_members.length > 1) {
      return NextResponse.json({ success: false, error: 'Team size is strictly 1 or 2 members only.' }, { status: 400 });
    }

    // Validate Member 2 if Duo
    if (team_members.length === 1) {
      const m = team_members[0];
      if (!m.name?.trim()) {
        return NextResponse.json({ success: false, error: 'Member 2 name is required.' }, { status: 400 });
      }
      const mRollClean = (m.roll || '').replace(/\D/g, '');
      if (mRollClean.length !== 9 || !/^\d{9}$/.test(mRollClean)) {
        return NextResponse.json({ success: false, error: 'Member 2 Roll Number must be exactly 9 digits (e.g. 240120110).' }, { status: 400 });
      }
      if (mRollClean === leaderRollClean) {
        return NextResponse.json({ success: false, error: 'Member 2 Roll Number cannot be identical to the Team Leader.' }, { status: 400 });
      }
      const mPhone = (m.phone || '').replace(/\D/g, '');
      if (mPhone.length !== 10 || !/^[6-9]\d{9}$/.test(mPhone)) {
        return NextResponse.json({ success: false, error: 'Member 2 must have a valid 10-digit mobile number.' }, { status: 400 });
      }
      if (mPhone === phoneClean) {
        return NextResponse.json({ success: false, error: 'Member 2 mobile number must be different from the Team Leader.' }, { status: 400 });
      }
      // sanitize cleaned roll
      m.roll = mRollClean;
      m.phone = mPhone;
    }

    // Validate Idea Information
    if (!idea_title) {
      return NextResponse.json({ success: false, error: 'Idea / Project title is required.' }, { status: 400 });
    }
    if (!problem_statement) {
      return NextResponse.json({ success: false, error: 'Problem statement regarding Odisha is required.' }, { status: 400 });
    }
    if (!proposed_solution) {
      return NextResponse.json({ success: false, error: 'Proposed solution description is required.' }, { status: 400 });
    }

    // Validate Google Drive PPT Upload Confirmation
    if (!drive_uploaded && !ppt_file) {
      return NextResponse.json({
        success: false,
        error: 'Please upload your presentation to the official Google Drive folder in format Idea2Odishi_TeamName and check the confirmation box.'
      }, { status: 400 });
    }

    // 3. Validate PPT File if uploaded directly
    let savedPptUrl = GOOGLE_DRIVE_FOLDER_URL;
    let savedPptFilename = drive_file_name || `Idea2Odishi_${team_name.replace(/[^a-zA-Z0-9]/g, '_')}.pptx`;
    let savedPptSize = 0;

    if (ppt_file && typeof ppt_file === 'object' && 'name' in ppt_file && ppt_file.size > 0) {
      const fileExt = path.extname(ppt_file.name).toLowerCase();
      if (fileExt !== '.pptx' && fileExt !== '.ppt') {
        return NextResponse.json({ success: false, error: 'Invalid file format. Only .ppt and .pptx files are permitted.' }, { status: 400 });
      }

      const MAX_SIZE_BYTES = 25 * 1024 * 1024;
      if (ppt_file.size > MAX_SIZE_BYTES) {
        return NextResponse.json({ success: false, error: 'PPT file size exceeds the 25MB limit.' }, { status: 400 });
      }

      const safeTeam = team_name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const savedFileName = `I2O_${safeTeam}_${Date.now()}${fileExt}`;
      const destinationPath = path.join(UPLOAD_DIR, savedFileName);

      const arrayBuffer = await ppt_file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(destinationPath, buffer);

      savedPptUrl = `/uploads/idea2odishi/${savedFileName}`;
      savedPptFilename = ppt_file.name;
      savedPptSize = ppt_file.size;
    }

    // 4. Duplicate Check
    const localRegs = readLocalRegistrations();
    const duplicate = localRegs.find(
      (r) =>
        (r.team_name && r.team_name.toLowerCase() === team_name.toLowerCase()) ||
        (r.leader_email && r.leader_email.toLowerCase() === leader_email.toLowerCase()) ||
        (r.leader_phone && r.leader_phone.replace(/\D/g, '') === phoneClean) ||
        (r.leader_roll && r.leader_roll.replace(/\D/g, '') === leaderRollClean)
    );

    if (duplicate) {
      let conflictField = 'Team information';
      if (duplicate.team_name?.toLowerCase() === team_name.toLowerCase()) conflictField = `Team Name "${team_name}"`;
      else if (duplicate.leader_email?.toLowerCase() === leader_email.toLowerCase()) conflictField = `Email "${leader_email}"`;
      else if (duplicate.leader_roll?.replace(/\D/g, '') === leaderRollClean) conflictField = `Roll Number "${leaderRollClean}"`;
      else if (duplicate.leader_phone?.replace(/\D/g, '') === phoneClean) conflictField = `Phone Number "${phoneClean}"`;

      return NextResponse.json(
        {
          success: false,
          error: `A registration with this ${conflictField} is already registered for Idea2Odishi 2026. Duplicate registrations are not allowed.`,
        },
        { status: 409 }
      );
    }

    // 5. Generate Sequential ID (I2O001, I2O002...)
    const regId = await getNextRegistrationId();

    // 6. Assemble Structured Record
    const participation_type = team_members.length === 1 ? 'Team' : 'Solo';
    const submitted_at = new Date().toISOString();
    const member2 = team_members[0];

    const newRecord: Idea2OdishiRegistration = {
      id: regId,
      submitted_at,
      participation_type,
      team_name,
      leader_name,
      leader_email,
      leader_phone: phoneClean,
      leader_roll: leaderRollClean,
      leader_stream_branch,
      leader_year,
      team_members,
      member2_name: member2?.name || undefined,
      member2_email: member2?.email || undefined,
      member2_phone: member2?.phone || undefined,
      member2_roll: member2?.roll || undefined,
      member2_stream_branch: member2?.stream_branch || undefined,
      member2_year: member2?.year || undefined,
      idea_title,
      category,
      problem_statement,
      proposed_solution,
      short_description: short_description || proposed_solution.slice(0, 160),
      drive_uploaded,
      drive_file_name: savedPptFilename,
      drive_folder_url: GOOGLE_DRIVE_FOLDER_URL,
      whatsapp_joined,
      ppt_filename: savedPptFilename,
      ppt_url: savedPptUrl,
      ppt_filesize: savedPptSize,
      // Backward compatibility fields:
      name: leader_name,
      roll: leaderRollClean,
      stream_branch: leader_stream_branch,
      year: leader_year,
      phone: phoneClean,
    };

    // Save to local JSON store
    localRegs.unshift(newRecord);
    writeLocalRegistrations(localRegs);

    // Save to Supabase (compatible with existing table schema)
    if (isSupabaseConfigured && supabase) {
      try {
        const enrichedProblemStatement = `[${category} | ${team_name}] ${idea_title}\n\nPROBLEM:\n${problem_statement}\n\nSOLUTION:\n${proposed_solution}\n\nSUMMARY:\n${short_description}\n\nDRIVE_FILE:${savedPptFilename}\nWHATSAPP:${whatsapp_joined ? 'Joined' : 'Pending'}\n\n__METADATA__:${JSON.stringify({
          team_name,
          leader_email,
          idea_title,
          category,
          proposed_solution,
          short_description,
          team_members,
          drive_file_name: savedPptFilename,
          drive_folder_url: GOOGLE_DRIVE_FOLDER_URL,
          whatsapp_joined,
        })}`;

        const supabaseRow: Record<string, any> = {
          id: regId,
          participation_type,
          name: leader_name,
          roll: leaderRollClean,
          stream_branch: leader_stream_branch,
          year: leader_year,
          phone: phoneClean,
          problem_statement: enrichedProblemStatement,
          ppt_url: savedPptUrl,
          member2_name: member2?.name || null,
          member2_roll: member2?.roll || null,
          member2_stream_branch: member2?.stream_branch || null,
          member2_year: member2?.year || null,
          member2_phone: member2?.phone || null,
          submitted_at,
        };

        const { error } = await supabase.from('idea2odishi_registrations').insert([supabaseRow]);
        if (error) {
          console.warn('Supabase insert note (local JSON persisted):', error.message);
        }
      } catch (sbErr) {
        console.warn('Supabase insert exception (local JSON persisted):', sbErr);
      }
    }

    console.log(`[Idea2Odishi] Registration confirmed ${regId} for Team "${team_name}" (${leader_name})`);

    return NextResponse.json({
      success: true,
      registrationId: regId,
      registration: newRecord,
      eventDetails: {
        event_name: 'Idea2Odishi 2026',
        dates: '26–27 November 2026',
        day1: '26 Nov 2026: Idea Presentation',
        day2: '27 Nov 2026: Product Building',
        venue: 'NIST Seminar Hall 1 & Auditorium, NIST University',
        drive_folder_url: GOOGLE_DRIVE_FOLDER_URL,
        whatsapp_group_url: WHATSAPP_GROUP_URL,
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
