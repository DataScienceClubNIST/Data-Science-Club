'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import { EligibleYear, TeamMemberDetail } from '@/types';
import {
  Sparkles,
  Download,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Printer,
  Check,
  AlertTriangle,
  Lock,
  RefreshCw,
  Info,
  ExternalLink,
  MessageCircle,
  FolderUp,
  Cpu,
  Award,
  Layers,
  Trophy
} from 'lucide-react';

const COMMON_BRANCHES = [
  'B.Tech - Computer Science & Engineering (CSE)',
  'B.Tech - CSE (AI & Machine Learning)',
  'B.Tech - CSE (Data Science)',
  'B.Tech - Electronics & Communication (ECE)',
  'B.Tech - Electrical & Electronics (EEE)',
  'B.Tech - Mechanical Engineering',
  'B.Tech - Civil Engineering',
  'Master of Computer Applications (MCA)',
  'B.Sc / BCA Computer Science',
  'M.Tech / Post Graduate',
  'Other Stream / Department'
];

const ALL_ELIGIBLE_YEARS: EligibleYear[] = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'MCA / PG',
  'Other'
];

const GOOGLE_DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1PFt_IxM8DFoSoRBNBlpPwwx5iw0Ekgky?usp=sharing';
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/DdtjtPi0R80D00x86KEuf4';
const PPT_TEMPLATE_URL = '/templates/Idea2Odishi_Proposed_Template.pptx';

const CATEGORIES = [
  {
    id: 'Agriculture & Rural Economy',
    title: 'Agriculture & Rural Economy',
    tagline: 'AgriTech & Smart Farming for Odisha',
    desc: 'Precision irrigation, crop disease AI, cold storage telemetry, farmer marketplaces & yield optimization.',
    color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
  },
  {
    id: 'Healthcare & Telemedicine',
    title: 'Healthcare & Telemedicine',
    tagline: 'Rural Healthcare & Emergency Access',
    desc: 'AI diagnostics for remote districts, maternal health alerts, ambulance tracking & telemedicine hubs.',
    color: 'border-rose-500/40 text-rose-400 bg-rose-500/10'
  },
  {
    id: 'Tourism, Heritage & Handlooms',
    title: 'Tourism, Heritage & Handlooms',
    tagline: 'Smart Tourism & Odia Artisan Economy',
    desc: 'AR/VR temple walkthroughs, direct artisan trade for Sambalpuri & Pipili crafts, eco-tourism trails.',
    color: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
  },
  {
    id: 'Disaster Management & Resilience',
    title: 'Disaster Management & Resilience',
    tagline: 'Cyclone, Flood & Coastal Warning Systems',
    desc: 'AI cyclone path alerts, flood inundation modeling, relief logistics & emergency offline mesh networks.',
    color: 'border-blue-500/40 text-blue-400 bg-blue-500/10'
  },
  {
    id: 'Chilika Ecology & Green Energy',
    title: 'Chilika Ecology & Green Energy',
    tagline: 'Wetlands Conservation & Solar Microgrids',
    desc: 'Lagoon water telemetry, migratory bird protection, solar power routing & sustainable aquaculture.',
    color: 'border-teal-500/40 text-teal-400 bg-teal-500/10'
  },
  {
    id: 'Smart Cities & Public Governance',
    title: 'Smart Cities & Public Governance',
    tagline: 'Urban Resilience & Odia Citizen Portals',
    desc: 'Odia-vernacular civic chatbots, municipal waste telemetry, automated traffic and public transit.',
    color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
  },
  {
    id: 'Cultural Preservation & Art Digitization',
    title: 'Cultural Preservation & Art',
    tagline: 'Palm-Leaf Manuscripts, Jhoti & Odia NLP',
    desc: 'Digitizing ancient Pattachitra art, Odia language AI models, cultural archives & tribal heritage.',
    color: 'border-purple-500/40 text-purple-400 bg-purple-500/10'
  },
  {
    id: 'Open Innovation / Any Domain',
    title: 'Open Innovation (Any Domain)',
    tagline: 'Any Tech Solution Addressing Odisha Needs',
    desc: 'Any breakthrough technology or student startup idea that solves a tangible challenge in Odisha.',
    color: 'border-amber-400/50 text-amber-300 bg-amber-500/10'
  }
];

const VOXEL_BACKGROUNDS = [
  {
    id: 1,
    title: 'Konark Riverside Splendour',
    caption: 'Konark Sun Temple & sacred stone wheel',
    src: '/images/Idea2Odishi_images/Voxel Konark Temple by the Riverside-1.png'
  },
  {
    id: 2,
    title: 'Heritage in Voxel Splendour',
    caption: 'Puri Ratha Chariot, Lord Jagannath & Saura art',
    src: '/images/Idea2Odishi_images/Odisha Heritage in Voxel Splendour-2.png'
  },
  {
    id: 3,
    title: 'Chilika Lagoon Sanctuary',
    caption: 'Chilika village boats, flamingos & Kalijai waters',
    src: '/images/Idea2Odishi_images/Chilika Lagoon Voxel Village-3.png'
  },
  {
    id: 4,
    title: 'Odisha Heritage Meets Future',
    caption: 'Smart cyber city, skybridges & Konark portal',
    src: '/images/Idea2Odishi_images/Odisha Heritage Meets Voxel Future-4.png'
  }
];

export default function Idea2OdishiClient() {
  const { submitIdea2OdishiRegistration } = useData();
  const registerSectionRef = useRef<HTMLDivElement>(null);

  // Background scene index (0-3) with automatic slow ambient rotation
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % VOXEL_BACKGROUNDS.length);
    }, 12000); // changes ambient background every 12s
    return () => clearInterval(timer);
  }, []);

  // Form State: 1 (Team 1 or 2), 2 (Idea), 3 (Drive PPT), 4 (WhatsApp & Finalize), 5 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1: Team & Member Details (Team size 1 or 2 members)
  const [teamName, setTeamName] = useState('');
  const [participationMode, setParticipationMode] = useState<'Solo' | 'Team'>('Solo');

  // Member 1 (Lead)
  const [leaderName, setLeaderName] = useState('');
  const [leaderRoll, setLeaderRoll] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [leaderStreamBranch, setLeaderStreamBranch] = useState(COMMON_BRANCHES[0]);
  const [leaderCustomBranch, setLeaderCustomBranch] = useState('');
  const [leaderYear, setLeaderYear] = useState<EligibleYear>('1st Year');

  // Member 2 (if Duo / 2 members)
  const [member2Name, setMember2Name] = useState('');
  const [member2Roll, setMember2Roll] = useState('');
  const [member2Email, setMember2Email] = useState('');
  const [member2Phone, setMember2Phone] = useState('');
  const [member2StreamBranch, setMember2StreamBranch] = useState(COMMON_BRANCHES[0]);
  const [member2CustomBranch, setMember2CustomBranch] = useState('');
  const [member2Year, setMember2Year] = useState<EligibleYear>('1st Year');

  // STEP 2: Idea Details
  const [ideaTitle, setIdeaTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  // STEP 3: Google Drive Upload Confirmation
  const [driveUploadedConfirmed, setDriveUploadedConfirmed] = useState(false);
  const [driveFileName, setDriveFileName] = useState('');

  // STEP 4: WhatsApp Group Confirmation
  const [whatsappJoinedConfirmed, setWhatsappJoinedConfirmed] = useState(false);

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // STEP 5: Success Pass State
  const [successData, setSuccessData] = useState<{
    registrationId: string;
    teamName: string;
    leaderName: string;
    ideaTitle: string;
    category: string;
    driveFileName: string;
    submittedAt: string;
  } | null>(null);

  // Validation Helpers
  const validatePhone = (num: string) => {
    const cleaned = num.trim().replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  };

  const validateRoll = (rollStr: string) => {
    const cleaned = rollStr.trim().replace(/\D/g, '');
    return cleaned.length === 9 && /^\d{9}$/.test(cleaned);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const scrollToRegister = () => {
    registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Step 1 Validation (Members Info - 1 or 2 members)
  const validateStep1 = () => {
    setErrorMessage('');
    if (!teamName.trim()) {
      setErrorMessage('Please enter your Team Name.');
      return false;
    }
    if (!leaderName.trim()) {
      setErrorMessage('Please enter Member 1 (Team Leader) full name.');
      return false;
    }
    if (!validateRoll(leaderRoll)) {
      setErrorMessage('Member 1 Roll Number must be exactly 9 digits (e.g. 240120110).');
      return false;
    }
    if (!validateEmail(leaderEmail)) {
      setErrorMessage('Please enter a valid email address for Member 1.');
      return false;
    }
    if (!validatePhone(leaderPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number for Member 1.');
      return false;
    }
    const resolvedLeaderBranch = leaderStreamBranch === 'Other Stream / Department' && leaderCustomBranch.trim()
      ? leaderCustomBranch.trim()
      : leaderStreamBranch;
    if (!resolvedLeaderBranch) {
      setErrorMessage('Please specify Member 1 department/branch.');
      return false;
    }

    // Validate Member 2 if Duo
    if (participationMode === 'Team') {
      if (!member2Name.trim()) {
        setErrorMessage('Please enter Member 2 full name.');
        return false;
      }
      if (!validateRoll(member2Roll)) {
        setErrorMessage('Member 2 Roll Number must be exactly 9 digits (e.g. 240120110).');
        return false;
      }
      if (member2Roll.replace(/\D/g, '') === leaderRoll.replace(/\D/g, '')) {
        setErrorMessage('Member 2 Roll Number cannot be identical to Member 1.');
        return false;
      }
      if (!validatePhone(member2Phone)) {
        setErrorMessage('Please enter a valid 10-digit phone number for Member 2.');
        return false;
      }
      if (member2Phone.replace(/\D/g, '') === leaderPhone.replace(/\D/g, '')) {
        setErrorMessage('Member 2 phone number must be different from Member 1.');
        return false;
      }
    }

    return true;
  };

  // Step 2 Validation (Idea Information)
  const validateStep2 = () => {
    setErrorMessage('');
    if (!ideaTitle.trim()) {
      setErrorMessage('Please enter your Idea / Project Title.');
      return false;
    }
    if (!category) {
      setErrorMessage('Please select a focus domain/category.');
      return false;
    }
    if (!problemStatement.trim() || problemStatement.trim().length < 20) {
      setErrorMessage('Please describe the Odisha problem statement (at least 20 characters).');
      return false;
    }
    if (!proposedSolution.trim() || proposedSolution.trim().length < 20) {
      setErrorMessage('Please describe your proposed solution and technical approach (at least 20 characters).');
      return false;
    }
    return true;
  };

  // Step 3 Validation (Google Drive PPT Upload Confirmation)
  const validateStep3 = () => {
    setErrorMessage('');
    if (!driveUploadedConfirmed) {
      setErrorMessage(
        'Please upload your presentation to the Google Drive folder in format Idea2Odishi_TeamName and check the confirmation box.'
      );
      return false;
    }
    return true;
  };

  // Navigation
  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
      scrollToRegister();
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
      scrollToRegister();
    } else if (currentStep === 3) {
      if (!validateStep3()) return;
      setCurrentStep(4);
      scrollToRegister();
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToRegister();
    }
  };

  // Step 4: Final Submission
  const handleFinalSubmit = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const resolvedLeaderBranch = leaderStreamBranch === 'Other Stream / Department' && leaderCustomBranch.trim()
        ? leaderCustomBranch.trim()
        : leaderStreamBranch;
      const leaderRollClean = leaderRoll.replace(/\D/g, '');

      // Dynamic team member (Member 2 if Duo)
      const team_members: TeamMemberDetail[] = [];
      if (participationMode === 'Team') {
        const resolvedM2Branch = member2StreamBranch === 'Other Stream / Department' && member2CustomBranch.trim()
          ? member2CustomBranch.trim()
          : member2StreamBranch;
        team_members.push({
          name: member2Name.trim(),
          email: member2Email.trim().toLowerCase(),
          phone: member2Phone.replace(/\D/g, ''),
          roll: member2Roll.replace(/\D/g, ''),
          stream_branch: resolvedM2Branch,
          year: member2Year
        });
      }

      const safeTeam = teamName.replace(/[^a-zA-Z0-9]/g, '_');
      const expectedFileName = driveFileName.trim() || `Idea2Odishi_${safeTeam}`;

      const formData = new FormData();
      formData.append('team_name', teamName.trim());
      formData.append('leader_name', leaderName.trim());
      formData.append('leader_email', leaderEmail.trim().toLowerCase());
      formData.append('leader_phone', leaderPhone.trim());
      formData.append('leader_roll', leaderRollClean);
      formData.append('leader_stream_branch', resolvedLeaderBranch);
      formData.append('leader_year', leaderYear);

      formData.append('team_members', JSON.stringify(team_members));

      formData.append('idea_title', ideaTitle.trim());
      formData.append('category', category);
      formData.append('problem_statement', problemStatement.trim());
      formData.append('proposed_solution', proposedSolution.trim());
      formData.append('short_description', shortDescription.trim() || proposedSolution.slice(0, 150));

      formData.append('drive_uploaded', 'true');
      formData.append('drive_file_name', expectedFileName);
      formData.append('whatsapp_joined', whatsappJoinedConfirmed ? 'true' : 'false');

      const res = await fetch('/api/register/idea2odishi', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Submission failed. Please check your network and try again.');
      }

      await submitIdea2OdishiRegistration(result.registration);

      setSuccessData({
        registrationId: result.registrationId,
        teamName: teamName.trim(),
        leaderName: leaderName.trim(),
        ideaTitle: ideaTitle.trim(),
        category,
        driveFileName: expectedFileName,
        submittedAt: result.registration?.submitted_at || new Date().toISOString()
      });

      setCurrentStep(5);
      scrollToRegister();
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-amber-500 selection:text-slate-950">
      
      {/* ============================================================== */}
      {/* IMMERSIVE FULL-PAGE VOXEL BACKGROUND (From provided artworks)  */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {VOXEL_BACKGROUNDS.map((bg, idx) => (
          <div
            key={bg.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeBgIndex === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={bg.src}
              alt={bg.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              unoptimized
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Balanced dark scrim + gradient overlay: leaves vibrant voxel details clearly visible while guaranteeing crisp text readability */}
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/80" />
      </div>

      {/* FLOATING AMBIENT SCENE CONTROLLER (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full text-[11px] text-slate-300 shadow-xl">
        <span className="font-mono text-amber-400 font-bold">Theme:</span>
        <span className="truncate max-w-[160px] text-white">{VOXEL_BACKGROUNDS[activeBgIndex].title}</span>
        <div className="flex items-center space-x-1 pl-1">
          {VOXEL_BACKGROUNDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBgIndex(idx)}
              className={`w-2.5 h-2.5 rounded-sm transition-all cursor-pointer ${
                activeBgIndex === idx
                  ? 'bg-amber-400 scale-125'
                  : 'bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Switch to ${VOXEL_BACKGROUNDS[idx].title}`}
            />
          ))}
        </div>
      </div>

      {/* TOP FLOATING NAVIGATION BAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-amber-500/20 px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <Link
              href="/sankalp"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:text-white transition-colors"
              title="Return to Sankalp Tech Fest"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center space-x-1.5">
                <span>IDEA2ODISHI</span>
                <span className="text-amber-400 font-mono">2026</span>
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                Sankalp Tech Fest • Data Science Club, NIST University
              </span>
            </div>
          </div>

          {/* Clean Anchor Navigation (No direct Drive or WhatsApp links) */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#schedule" className="hover:text-amber-400 transition-colors">2-Day Schedule</a>
            <a href="#domains" className="hover:text-amber-400 transition-colors">Odisha Domains</a>
            <a href="#register" className="hover:text-amber-400 transition-colors">Registration</a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollToRegister}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all border-b-2 border-amber-800 active:border-b-0 active:translate-y-0.5 shadow-md cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* HERO SECTION (Transparent Glass Banner Over Voxel Background) */}
      {/* ============================================================== */}
      <section id="about" className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-slate-950/75 p-6 sm:p-12 shadow-2xl backdrop-blur-xl space-y-8">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                State-Level Innovation Clash
              </span>
              <span className="px-3.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Eligibility: ALL ARE ELIGIBLE
              </span>
              <span className="px-3.5 py-1 rounded-md text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Team Size: 1 or 2 Members
              </span>
              <span className="px-3.5 py-1 rounded-md text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Sankalp 2026 Tech Fest
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white">
                IDEA2ODISHI <span className="text-amber-400 font-mono">2026</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                A flagship state-level ideathon and product building clash dedicated to solving <strong>real problem statements regarding Odisha across any domain</strong>. Present your visionary pitch on Day 1, build your working prototype on Day 2, and compete for incubation and cash awards.
              </p>
            </div>

            {/* Two-Day Format Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Day 1 Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border-2 border-amber-500/30 flex items-start space-x-4 shadow-lg">
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-400 font-mono font-bold text-xs uppercase tracking-wider">Day 1</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">26 Nov 2026</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white">Idea Presentation</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pitch clash before industry judges and jury panel. Present your deck addressing key Odisha bottlenecks and technical feasibility.
                  </p>
                </div>
              </div>

              {/* Day 2 Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border-2 border-cyan-500/30 flex items-start space-x-4 shadow-lg">
                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider">Day 2</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">27 Nov 2026</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white">Product Building</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hands-on rapid MVP development, mentor check-ins, working prototype demonstrations, and grand award ceremony.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons Row (Drive & WhatsApp links are NOT shown here; only shown step by step) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToRegister}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 shadow-xl flex items-center space-x-2 cursor-pointer"
              >
                <span>Register Your Team (1 or 2 Members)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={PPT_TEMPLATE_URL}
                download="Idea2Odishi_Proposed_Template.pptx"
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center space-x-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Proposed PPT Template</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION: TWO-DAY SCHEDULE & FORMAT */}
      {/* ============================================================== */}
      <section id="schedule" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              EVENT ITINERARY &amp; FORMAT
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              The 2-Day Idea2Odishi Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              From ideation to working execution. Held at NIST Seminar Hall 1 &amp; Auditorium, NIST University.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Day 1 Breakdown */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/75 backdrop-blur-xl border-2 border-amber-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-amber-500 text-slate-950">
                  DAY 1 • 26 NOV 2026
                </span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">11:00 AM – 3:30 PM</span>
              </div>

              <h3 className="text-xl font-extrabold text-white">
                Idea Presentation &amp; Jury Clash
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Teams pitch their decks to the evaluation panel. Presentation slides must be submitted in the designated Google Drive folder during Step 3 of registration in format <strong>Idea2Odishi_TeamName</strong>.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>11:00 AM:</strong> Participant Reporting, Team Verification &amp; Welcome Address</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>11:45 AM:</strong> Pitch Presentations (5 min pitch + 3 min Q&amp;A per team)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>03:00 PM:</strong> Jury Scoring &amp; Finalists Announcement for Day 2 Building</span>
                </div>
              </div>
            </div>

            {/* Day 2 Breakdown */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/75 backdrop-blur-xl border-2 border-cyan-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-cyan-500 text-slate-950">
                  DAY 2 • 27 NOV 2026
                </span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">11:00 AM – 3:30 PM</span>
              </div>

              <h3 className="text-xl font-extrabold text-white">
                Product Building &amp; Live Prototype Clash
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Transform slides into working realities! Teams code, assemble, and prototype their solution with technical mentors on site.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>11:00 AM:</strong> Rapid Sprint Start, Architecture Review &amp; Mentor Office Hours</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                  <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>01:30 PM:</strong> Live Prototype Demonstrations &amp; Testing on stage</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                  <Trophy className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>03:00 PM:</strong> Grand Valedictory, Incubation Offers &amp; Cash Prize Awards</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION: ODISHA FOCUS DOMAINS (ANY DOMAIN ELIGIBLE) */}
      {/* ============================================================== */}
      <section id="domains" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              PROBLEM STATEMENTS REGARDING ODISHA
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Open to Any Domain Addressing Odisha
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              Choose from suggested priority tracks or propose any innovative technology challenge solving a real bottleneck in Odisha.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cat.color} inline-block`}>
                    {cat.title}
                  </span>
                  <h4 className="font-bold text-sm text-white pt-1">{cat.tagline}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                </div>

                <div className="pt-2 text-[11px] text-amber-400/80 font-mono">
                  #OdishaChallenge
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION: MULTI-STEP REGISTRATION PORTAL */}
      {/* ============================================================== */}
      <section ref={registerSectionRef} id="register" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              OFFICIAL REGISTRATION PORTAL
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Register for Idea2Odishi 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Follow the 4 steps below to register your team, submit your idea details, and verify your presentation deck.
            </p>
          </div>

          {/* STEP PROGRESS INDICATOR */}
          {currentStep < 5 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[
                { num: 1, title: 'MEMBERS INFO', subtitle: '1 or 2 Members' },
                { num: 2, title: 'IDEA DETAILS', subtitle: 'Title & Odisha Focus' },
                { num: 3, title: 'DRIVE PPT UPLOAD', subtitle: 'Format Verification' },
                { num: 4, title: 'WHATSAPP & FINALIZE', subtitle: 'Pass Generation' }
              ].map((s) => {
                const isActive = currentStep === s.num;
                const isCompleted = currentStep > s.num;
                return (
                  <div
                    key={s.num}
                    className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/10'
                        : isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-extrabold uppercase">
                        STEP {s.num}
                      </span>
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className={`w-2.5 h-2.5 rounded-sm ${isActive ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`} />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs tracking-tight text-white">{s.title}</div>
                      <div className="text-[10px] opacity-80">{s.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ERROR ALERT */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/15 border-2 border-rose-500/40 text-rose-300 text-xs flex items-start space-x-3 shadow-lg animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold">Please complete this requirement:</div>
                <div>{errorMessage}</div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* STEP 1: MEMBERS INFO (1 OR 2 MEMBERS) */}
          {/* ========================================================== */}
          {currentStep === 1 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border-2 border-amber-500/30 shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                <div>
                  <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                    [ Step 1 of 4 ]
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Basic Info About Members
                  </h3>
                  <p className="text-xs text-slate-400">
                    Team size must be <strong>1 or 2 members</strong>. All years and disciplines are eligible.
                  </p>
                </div>

                {/* Team Size Toggle */}
                <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setParticipationMode('Solo')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      participationMode === 'Solo'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Solo (1 Member)
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipationMode('Team')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      participationMode === 'Team'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Duo (2 Members)
                  </button>
                </div>
              </div>

              {/* Team Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Team Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Utkal Innovators, Konark AI..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-sm"
                  required
                />
              </div>

              {/* MEMBER 1 DETAILS */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-2 text-sm font-bold text-amber-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Member 1 {participationMode === 'Team' ? '(Team Leader)' : '(Solo Participant)'} Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      placeholder="e.g. Subhasish Behera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Roll (Strictly 9 Digits) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      NIST Roll Number (Must be 9 Digits) *
                    </label>
                    <input
                      type="text"
                      maxLength={9}
                      value={leaderRoll}
                      onChange={(e) => setLeaderRoll(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      placeholder="e.g. 240120110 (9 digits)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                      required
                    />
                    <span className="text-[10px] text-slate-500 font-mono">
                      {leaderRoll.length} / 9 digits entered
                    </span>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      value={leaderEmail}
                      onChange={(e) => setLeaderEmail(e.target.value)}
                      placeholder="e.g. subhasish@nist.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={leaderPhone}
                      onChange={(e) => setLeaderPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Stream/Branch */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">Department / Stream *</label>
                    <select
                      value={leaderStreamBranch}
                      onChange={(e) => setLeaderStreamBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      {COMMON_BRANCHES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year (All Eligible) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">Academic Year (All Eligible) *</label>
                    <select
                      value={leaderYear}
                      onChange={(e) => setLeaderYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      {ALL_ELIGIBLE_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* MEMBER 2 DETAILS (If Duo) */}
              {participationMode === 'Team' && (
                <div className="space-y-4 pt-6 border-t border-slate-800">
                  <div className="flex items-center space-x-2 text-sm font-bold text-cyan-400">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Member 2 Details (Co-Participant)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Member 2 Full Name *</label>
                      <input
                        type="text"
                        value={member2Name}
                        onChange={(e) => setMember2Name(e.target.value)}
                        placeholder="e.g. Priyanka Mishra"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Roll (Strictly 9 Digits) */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        Member 2 NIST Roll (Must be 9 Digits) *
                      </label>
                      <input
                        type="text"
                        maxLength={9}
                        value={member2Roll}
                        onChange={(e) => setMember2Roll(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        placeholder="e.g. 240120115 (9 digits)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                        required
                      />
                      <span className="text-[10px] text-slate-500 font-mono">
                        {member2Roll.length} / 9 digits entered
                      </span>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Member 2 Email Address</label>
                      <input
                        type="email"
                        value={member2Email}
                        onChange={(e) => setMember2Email(e.target.value)}
                        placeholder="e.g. priyanka@nist.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Member 2 Phone Number *</label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={member2Phone}
                        onChange={(e) => setMember2Phone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Stream/Branch */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Member 2 Stream / Branch *</label>
                      <select
                        value={member2StreamBranch}
                        onChange={(e) => setMember2StreamBranch(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      >
                        {COMMON_BRANCHES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">Member 2 Academic Year *</label>
                      <select
                        value={member2Year}
                        onChange={(e) => setMember2Year(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      >
                        {ALL_ELIGIBLE_YEARS.map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1 Submit Button */}
              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg cursor-pointer"
                >
                  <span>Proceed to Step 2: About Idea</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* STEP 2: ABOUT THEIR IDEA */}
          {/* ========================================================== */}
          {currentStep === 2 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border-2 border-amber-500/30 shadow-2xl space-y-6">
              
              <div className="pb-4 border-b border-slate-800">
                <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  [ Step 2 of 4 ]
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  About Your Idea &amp; Problem Statement
                </h3>
                <p className="text-xs text-slate-400">
                  Focus on solving tangible problem statements regarding Odisha in any domain.
                </p>
              </div>

              {/* Idea Title */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Idea / Project Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  placeholder="e.g. AgriChakshu: Drone Crop Health & Soil Telemetry for Odisha"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-sm"
                  required
                />
              </div>

              {/* Domain / Focus Area Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Focus Domain / Category <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">{cat.title}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-snug">{cat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Problem Statement Regarding Odisha */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Problem Statement Regarding Odisha <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="Describe the specific Odisha bottleneck or issue you are targeting, the affected demographic, and why current solutions are inadequate..."
                  className="w-full p-4 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Proposed Solution */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Proposed Solution &amp; Technical Implementation <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                  placeholder="Explain your approach, technology stack, hardware or AI models, and how this directly impacts and solves the Odisha problem statement..."
                  className="w-full p-4 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Short Project Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Short Description / Elevator Pitch
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="A brief 2–3 sentence overview of your idea..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs leading-relaxed"
                />
              </div>

              {/* Step 2 Buttons */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg cursor-pointer"
                >
                  <span>Proceed to Step 3: Upload PPT in Drive</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* STEP 3: UPLOAD PPT IN GOOGLE DRIVE */}
          {/* ========================================================== */}
          {currentStep === 3 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border-2 border-amber-500/30 shadow-2xl space-y-6">
              
              <div className="pb-4 border-b border-slate-800">
                <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  [ Step 3 of 4 ]
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Upload PPT in Google Drive
                </h3>
                <p className="text-xs text-slate-400">
                  Upload your completed presentation deck to the official Google Drive folder in the required naming format.
                </p>
              </div>

              {/* 3-Step Guide Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-mono font-bold text-xs">1. Download Template</span>
                  <p className="text-[11px] text-slate-300">
                    Get the standard slide deck prepared for Idea2Odishi presentations.
                  </p>
                  <a
                    href={PPT_TEMPLATE_URL}
                    download="Idea2Odishi_Proposed_Template.pptx"
                    className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:underline font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PPTX</span>
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-mono font-bold text-xs">2. Format File Name</span>
                  <p className="text-[11px] text-slate-300">
                    Rename your deck strictly following the pattern:
                  </p>
                  <div className="font-mono text-xs font-bold text-white bg-slate-900 p-2 rounded-lg border border-slate-700">
                    Idea2Odishi_{teamName ? teamName.replace(/[^a-zA-Z0-9]/g, '_') : 'YourTeamName'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-mono font-bold text-xs">3. Upload to Folder</span>
                  <p className="text-[11px] text-slate-300">
                    Drop your presentation into the official Google Drive submission folder.
                  </p>
                  <a
                    href={GOOGLE_DRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:underline font-bold"
                  >
                    <FolderUp className="w-3.5 h-3.5" />
                    <span>Open Drive Folder</span>
                  </a>
                </div>
              </div>

              {/* Primary Drive Button (Revealed exclusively in Step 3) */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-950 to-blue-950/30 border-2 border-blue-500/40 text-center space-y-4">
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-white">
                    Official Idea2Odishi 2026 Google Drive Submission
                  </h4>
                  <p className="text-xs text-slate-300 max-w-lg mx-auto">
                    Click the button below to open the submission folder in a new tab and upload your file formatted as <strong>Idea2Odishi_{teamName || 'TeamName'}</strong>.
                  </p>
                </div>

                <a
                  href={GOOGLE_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-xl cursor-pointer"
                >
                  <FolderUp className="w-5 h-5" />
                  <span>Click to Open Submission Google Drive Folder</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>
              </div>

              {/* Uploaded File Name input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Uploaded File Name in Drive (Format: Idea2Odishi_TeamName)
                </label>
                <input
                  type="text"
                  value={driveFileName}
                  onChange={(e) => setDriveFileName(e.target.value)}
                  placeholder={`Idea2Odishi_${teamName ? teamName.replace(/[^a-zA-Z0-9]/g, '_') : 'YourTeamName'}.pptx`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              {/* MANDATORY CONFIRMATION CHECKBOX */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={driveUploadedConfirmed}
                    onChange={(e) => setDriveUploadedConfirmed(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-amber-400 bg-slate-950 text-amber-500 focus:ring-0 mt-0.5 cursor-pointer"
                  />
                  <div className="space-y-1 text-xs text-slate-200">
                    <span className="font-extrabold text-amber-300 block">
                      Confirmation of Google Drive Submission *
                    </span>
                    <p className="leading-relaxed">
                      &ldquo;I confirm that I have uploaded our presentation deck to the official Google Drive folder in the required naming format: <strong>Idea2Odishi_{teamName || 'TeamName'}</strong>.&rdquo;
                    </p>
                  </div>
                </label>
              </div>

              {/* Step 3 Buttons */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!driveUploadedConfirmed}
                  className={`px-6 py-3 rounded-xl font-extrabold text-xs flex items-center space-x-2 border-b-4 transition-all shadow-lg cursor-pointer ${
                    driveUploadedConfirmed
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-800 active:border-b-0 active:translate-y-1'
                      : 'bg-slate-800 text-slate-500 border-slate-900 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Proceed to Step 4: Join WhatsApp Group</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* STEP 4: JOIN WHATSAPP GROUP & FINAL SUBMISSION */}
          {/* ========================================================== */}
          {currentStep === 4 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border-2 border-amber-500/40 shadow-2xl space-y-6">
              
              <div className="pb-4 border-b border-slate-800">
                <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  [ Step 4 of 4 ]
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Join WhatsApp Group &amp; Finalize Registration
                </h3>
                <p className="text-xs text-slate-400">
                  Stay updated with live reporting schedules, presentation slots, and mentor allocations.
                </p>
              </div>

              {/* WHATSAPP CARD (Revealed exclusively in Step 4) */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-950 to-emerald-950/30 border-2 border-emerald-500/40 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">
                      Official Idea2Odishi WhatsApp Community
                    </h4>
                    <p className="text-xs text-slate-300">
                      Mandatory for all registered team leaders and members for event day announcements.
                    </p>
                  </div>
                </div>

                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Official WhatsApp Group Now</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <label className="flex items-center space-x-2.5 text-xs text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={whatsappJoinedConfirmed}
                    onChange={(e) => setWhatsappJoinedConfirmed(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-500"
                  />
                  <span>I have opened/joined the official WhatsApp group for Idea2Odishi 2026.</span>
                </label>
              </div>

              {/* SUMMARY REVIEW */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Registration Review Summary
                </span>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Team Name</span>
                      <span className="font-bold text-white">{teamName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Participation Mode</span>
                      <span className="font-bold text-cyan-400">{participationMode === 'Team' ? 'Duo (2 Members)' : 'Solo (1 Member)'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Member 1 (Lead)</span>
                      <span className="text-slate-200">{leaderName} ({leaderRoll})</span>
                    </div>
                    {participationMode === 'Team' && (
                      <div>
                        <span className="text-slate-500 block text-[10px]">Member 2</span>
                        <span className="text-slate-200">{member2Name} ({member2Roll})</span>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block text-[10px]">Idea Title</span>
                      <span className="font-bold text-amber-300">{ideaTitle}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block text-[10px]">Google Drive Deck Name</span>
                      <span className="font-mono text-emerald-400">{driveFileName || `Idea2Odishi_${teamName.replace(/[^a-zA-Z0-9]/g, '_')}`}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 Buttons */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-xl cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm &amp; Generate Registration Pass</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* STEP 5: SUCCESS PASS SCREEN */}
          {/* ========================================================== */}
          {currentStep === 5 && successData && (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/60 bg-slate-950/85 backdrop-blur-xl shadow-2xl p-6 sm:p-10 space-y-8">
                
                {/* Header Badge */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Registration Successful!</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Idea2Odishi <span className="text-amber-400">2026</span> Official Pass
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                    Your registration has been locked and recorded for Sankalp Tech Fest.
                  </p>
                </div>

                {/* UNIQUE SEQUENTIAL REGISTRATION ID */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/25 via-amber-500/10 to-amber-500/25 border-2 border-amber-500/60 text-center space-y-1.5 shadow-xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block">
                    UNIQUE REGISTRATION ID
                  </span>
                  <div className="text-4xl sm:text-6xl font-black font-mono tracking-wider text-amber-400 drop-shadow-md">
                    {successData.registrationId}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Quote this ID during reporting and presentation clash on 26 Nov 2026.
                  </p>
                </div>

                {/* SCHEDULE & PARTICULARS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Team Particulars */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-amber-400 font-mono font-bold uppercase text-[11px] block">
                      Team Particulars
                    </span>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Team Name</span>
                      <span className="font-bold text-white text-sm">{successData.teamName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Member 1 (Lead)</span>
                      <span className="text-slate-200">{successData.leaderName} ({leaderRoll})</span>
                    </div>
                    {participationMode === 'Team' && member2Name && (
                      <div>
                        <span className="text-slate-500 block text-[10px]">Member 2</span>
                        <span className="text-slate-200">{member2Name} ({member2Roll})</span>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-cyan-400 font-mono font-bold uppercase text-[11px] block">
                      Project Particulars
                    </span>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Idea Title</span>
                      <span className="font-bold text-white text-sm truncate block">{successData.ideaTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Domain / Category</span>
                      <span className="text-amber-300 font-semibold">{successData.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Google Drive Deck Name</span>
                      <span className="font-mono text-emerald-400 truncate block">{successData.driveFileName}</span>
                    </div>
                  </div>

                  {/* Two-Day Dates Bar */}
                  <div className="sm:col-span-2 p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">26 Nov 2026</div>
                        <div className="text-amber-300 text-xs font-semibold">Day 1: Idea Presentation</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">27 Nov 2026</div>
                        <div className="text-cyan-300 text-xs font-semibold">Day 2: Product Building</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">NIST University</div>
                        <div className="text-slate-300 text-xs">Seminar Hall 1 &amp; Labs</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* WhatsApp Group Reminder on Success Slip */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                    <MessageCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Join the WhatsApp Group if you haven&apos;t yet:</span>
                  </div>
                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0"
                  >
                    Open WhatsApp Group
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Registration Pass</span>
                  </button>

                  <div className="flex items-center space-x-3">
                    <Link
                      href="/sankalp"
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                    >
                      Return to Sankalp Fest
                    </Link>

                    <a
                      href={GOOGLE_DRIVE_FOLDER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 border border-blue-500/40 font-bold text-xs transition-colors flex items-center space-x-1.5"
                    >
                      <FolderUp className="w-3.5 h-3.5" />
                      <span>View Drive Folder</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 px-4 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
        <p>
          Idea2Odishi 2026 • Sankalp National Technical Festival • Data Science Club (DSC), NIST University
        </p>
        <p className="text-[11px] text-slate-600">
          Palur Hills, Berhampur, Odisha 761008 • Open to all student innovators.
        </p>
      </footer>

    </div>
  );
}
