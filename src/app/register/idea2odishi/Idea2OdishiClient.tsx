'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
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
  UploadCloud,
  Plus,
  Trash2,
  Check,
  AlertTriangle,
  FileCheck,
  Lock,
  RefreshCw,
  Info
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
  'Other Stream / Department'
];

const CATEGORIES = [
  {
    id: 'Agriculture',
    title: 'Agriculture',
    tagline: 'AgriTech & Smart Farming for Odisha',
    desc: 'Precision irrigation, crop disease detection, farmer supply chains & yield prediction.',
    color: 'from-emerald-500/20 to-green-600/20 text-emerald-400 border-emerald-500/40'
  },
  {
    id: 'Healthcare',
    title: 'Healthcare',
    tagline: 'Rural Healthcare & Telemedicine',
    desc: 'Accessible diagnosis, AI triage, ambulance logistics & mobile health networks.',
    color: 'from-rose-500/20 to-red-600/20 text-rose-400 border-rose-500/40'
  },
  {
    id: 'Education',
    title: 'Education',
    tagline: 'EdTech & Skill Empowerment',
    desc: 'Odia-vernacular AI tutors, rural STEM access & gamified technical learning.',
    color: 'from-blue-500/20 to-indigo-600/20 text-blue-400 border-blue-500/40'
  },
  {
    id: 'Tourism and Heritage',
    title: 'Tourism and Heritage',
    tagline: 'Smart Tourism & Temple Heritage',
    desc: 'AR temple walkthroughs, handloom authenticity, pilgrimage guides & eco-stays.',
    color: 'from-amber-500/20 to-yellow-600/20 text-amber-400 border-amber-500/40'
  },
  {
    id: 'Sustainability',
    title: 'Sustainability',
    tagline: 'Clean Energy & Chilika Eco-Protection',
    desc: 'Lagoon biodiversity tracking, solar microgrids, circular waste & flood drainage.',
    color: 'from-teal-500/20 to-cyan-600/20 text-teal-400 border-teal-500/40'
  },
  {
    id: 'Smart Cities',
    title: 'Smart Cities',
    tagline: 'Urban Resilience & Disaster Management',
    desc: 'Cyclone warning systems, coastal evacuation logistics, smart traffic & utility monitoring.',
    color: 'from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-500/40'
  },
  {
    id: 'Cultural Preservation',
    title: 'Cultural Preservation',
    tagline: 'Odia Language, Pattachitra & Art Digitization',
    desc: 'Preserving Pipili applique craft, palm leaf manuscripts, Jhoti art & Sambalpuri weavers.',
    color: 'from-purple-500/20 to-fuchsia-600/20 text-purple-400 border-purple-500/40'
  },
  {
    id: 'Other',
    title: 'Other',
    tagline: 'Open Tech Innovation & Startups',
    desc: 'Any breakthrough technology solution addressing an unmet societal or business need.',
    color: 'from-slate-500/20 to-slate-700/20 text-slate-300 border-slate-500/40'
  }
];

const VOXEL_GALLERY = [
  {
    title: 'Konark Riverside Splendour',
    caption: 'Voxel Konark Sun Temple & riverside ghats',
    src: '/images/Idea2Odishi_images/Voxel Konark Temple by the Riverside-1.png'
  },
  {
    title: 'Heritage in Voxel Splendour',
    caption: 'Puri Ratha Chariot, Lord Jagannath & Saura wall art',
    src: '/images/Idea2Odishi_images/Odisha Heritage in Voxel Splendour-2.png'
  },
  {
    title: 'Chilika Lagoon Sanctuary',
    caption: 'Voxel village boats, flamingos & Kalijai waters',
    src: '/images/Idea2Odishi_images/Chilika Lagoon Voxel Village-3.png'
  },
  {
    title: 'Odisha Heritage Meets Future',
    caption: 'Smart voxel cyber city, skybridges & Konark portal',
    src: '/images/Idea2Odishi_images/Odisha Heritage Meets Voxel Future-4.png'
  }
];

export default function Idea2OdishiClient() {
  const { submitIdea2OdishiRegistration } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Scene Background
  const [activeVoxelIndex, setActiveVoxelIndex] = useState(0);

  // Form Step: 1 (Team), 2 (Idea), 3 (PPT), 4 (Review), 5 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1 — Team Information
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [leaderRoll, setLeaderRoll] = useState('');
  const [leaderStreamBranch, setLeaderStreamBranch] = useState(COMMON_BRANCHES[0]);
  const [leaderCustomBranch, setLeaderCustomBranch] = useState('');
  const [leaderYear, setLeaderYear] = useState<EligibleYear>('1st Year');

  // Dynamic Team Members (up to 3 additional members + 1 leader = 4 max)
  const [teamMembers, setTeamMembers] = useState<TeamMemberDetail[]>([]);

  // STEP 2 — Idea Information
  const [ideaTitle, setIdeaTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  // STEP 3 — Final PPT Upload
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // STEP 4 — Confirmation Dialog & Submission UI States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // STEP 5 — Success Screen State
  const [successData, setSuccessData] = useState<{
    registrationId: string;
    teamName: string;
    leaderName: string;
    ideaTitle: string;
    category: string;
    pptFilename: string;
    pptUrl?: string;
    submittedAt: string;
  } | null>(null);

  // Helpers
  const validatePhone = (num: string) => {
    const cleaned = num.trim().replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Add Dynamic Team Member
  const handleAddMember = () => {
    if (teamMembers.length >= 3) return; // Leader + 3 members = 4
    setTeamMembers([
      ...teamMembers,
      {
        name: '',
        email: '',
        phone: '',
        roll: '',
        stream_branch: COMMON_BRANCHES[0],
        year: '1st Year'
      }
    ]);
  };

  // Remove Dynamic Team Member
  const handleRemoveMember = (idx: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  // Update Dynamic Team Member field
  const handleUpdateMember = (idx: number, field: keyof TeamMemberDetail, val: string) => {
    const updated = [...teamMembers];
    updated[idx] = { ...updated[idx], [field]: val };
    setTeamMembers(updated);
  };

  // File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'ppt' && ext !== 'pptx') {
      setErrorMessage('Invalid file format. Only Microsoft PowerPoint files (.ppt, .pptx) are accepted.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds 25MB limit. Please compress images in your slides before uploading.');
      return;
    }

    setErrorMessage('');
    setPptFile(file);

    // Simulated progress bar animation
    setUploadProgress(20);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 100);
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'ppt' && ext !== 'pptx') {
        setErrorMessage('Invalid file format. Only Microsoft PowerPoint files (.ppt, .pptx) are accepted.');
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        setErrorMessage('File size exceeds 25MB limit. Please compress slides.');
        return;
      }
      setErrorMessage('');
      setPptFile(file);
      setUploadProgress(100);
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    setErrorMessage('');
    if (!teamName.trim()) {
      setErrorMessage('Please enter a team name.');
      return false;
    }
    if (!leaderName.trim()) {
      setErrorMessage('Please enter the team leader name.');
      return false;
    }
    if (!validateEmail(leaderEmail)) {
      setErrorMessage('Please enter a valid email address for the team leader.');
      return false;
    }
    if (!validatePhone(leaderPhone)) {
      setErrorMessage('Please enter a valid 10-digit phone number for the team leader.');
      return false;
    }
    if (!leaderRoll.trim()) {
      setErrorMessage('Please enter the team leader NIST roll number.');
      return false;
    }
    const resolvedBranch = leaderStreamBranch === 'Other Stream / Department' && leaderCustomBranch.trim()
      ? leaderCustomBranch.trim()
      : leaderStreamBranch;
    if (!resolvedBranch) {
      setErrorMessage('Please specify your stream/department.');
      return false;
    }

    // Validate additional team members
    for (let i = 0; i < teamMembers.length; i++) {
      const m = teamMembers[i];
      if (!m.name.trim()) {
        setErrorMessage(`Please enter Team Member ${i + 2} name.`);
        return false;
      }
      if (!m.roll.trim()) {
        setErrorMessage(`Please enter Team Member ${i + 2} roll number.`);
        return false;
      }
      if (m.roll.trim().toUpperCase() === leaderRoll.trim().toUpperCase()) {
        setErrorMessage(`Team Member ${i + 2} roll number cannot be the same as the team leader.`);
        return false;
      }
      if (!validatePhone(m.phone)) {
        setErrorMessage(`Please enter a valid 10-digit phone number for Team Member ${i + 2}.`);
        return false;
      }
      if (m.phone.trim().replace(/\D/g, '') === leaderPhone.trim().replace(/\D/g, '')) {
        setErrorMessage(`Team Member ${i + 2} phone number must be different from the team leader.`);
        return false;
      }
    }

    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    setErrorMessage('');
    if (!ideaTitle.trim()) {
      setErrorMessage('Please enter your idea / project title.');
      return false;
    }
    if (!category) {
      setErrorMessage('Please select a domain / category.');
      return false;
    }
    if (!problemStatement.trim() || problemStatement.trim().length < 20) {
      setErrorMessage('Please provide a descriptive problem statement (at least 20 characters).');
      return false;
    }
    if (!proposedSolution.trim() || proposedSolution.trim().length < 20) {
      setErrorMessage('Please explain your proposed solution (at least 20 characters).');
      return false;
    }
    if (!shortDescription.trim()) {
      setErrorMessage('Please provide a short project description.');
      return false;
    }
    return true;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    setErrorMessage('');
    if (!pptFile) {
      setErrorMessage('Please upload your final presentation deck (.ppt or .pptx) before continuing.');
      return false;
    }
    return true;
  };

  // Step navigation
  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else if (currentStep === 3) {
      if (!validateStep3()) return;
      setCurrentStep(4);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  // Submit Final Registration (invoked after confirmation modal)
  const handleFinalSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const resolvedLeaderBranch = leaderStreamBranch === 'Other Stream / Department' && leaderCustomBranch.trim()
        ? leaderCustomBranch.trim()
        : leaderStreamBranch;

      const formData = new FormData();
      formData.append('team_name', teamName.trim());
      formData.append('leader_name', leaderName.trim());
      formData.append('leader_email', leaderEmail.trim().toLowerCase());
      formData.append('leader_phone', leaderPhone.trim());
      formData.append('leader_roll', leaderRoll.trim().toUpperCase());
      formData.append('leader_stream_branch', resolvedLeaderBranch);
      formData.append('leader_year', leaderYear);

      formData.append('team_members', JSON.stringify(teamMembers));

      formData.append('idea_title', ideaTitle.trim());
      formData.append('category', category);
      formData.append('problem_statement', problemStatement.trim());
      formData.append('proposed_solution', proposedSolution.trim());
      formData.append('short_description', shortDescription.trim());

      if (pptFile) {
        formData.append('ppt_file', pptFile);
      }

      const res = await fetch('/api/register/idea2odishi', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Registration failed. Please review your details and try again.');
      }

      // Also sync to DataContext so admin / memory stays up to date
      await submitIdea2OdishiRegistration(result.registration);

      setSuccessData({
        registrationId: result.registrationId,
        teamName: teamName.trim(),
        leaderName: leaderName.trim(),
        ideaTitle: ideaTitle.trim(),
        category,
        pptFilename: pptFile?.name || 'Uploaded Pitch Deck.pptx',
        pptUrl: result.registration?.ppt_url,
        submittedAt: result.registration?.submitted_at || new Date().toISOString()
      });

      setCurrentStep(5);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const totalMembersCount = 1 + teamMembers.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-500 selection:text-slate-950">
      
      {/* AMBIENT VOXEL BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-3xl scale-110 transition-all duration-1000"
          style={{ backgroundImage: `url("${VOXEL_GALLERY[activeVoxelIndex].src}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* TOP BREADCRUMB BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/sankalp"
            className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Sankalp Tech Fest</span>
          </Link>

          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Sankalp 2026 Portal</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              NIST University
            </span>
          </div>
        </div>

        {/* HERO CARD WITH VOXEL ARTWORK & SCENE CHANGER */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-slate-900/95 shadow-2xl backdrop-blur-md">
          {/* Voxel Image Viewport */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] max-h-[380px] overflow-hidden bg-slate-950">
            <SafeImage
              src={VOXEL_GALLERY[activeVoxelIndex].src}
              alt={VOXEL_GALLERY[activeVoxelIndex].title}
              fill
              fit="cover"
              priority
              className="transition-all duration-700 brightness-95 contrast-105"
            />
            {/* Voxel vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

            {/* Scene info pill */}
            <div className="absolute bottom-3 left-4 right-4 sm:right-auto z-10 flex flex-wrap items-center justify-between sm:justify-start gap-2 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-amber-300">
              <span className="font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{VOXEL_GALLERY[activeVoxelIndex].title}</span>
              </span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">•</span>
              <span className="text-slate-300 text-[11px]">{VOXEL_GALLERY[activeVoxelIndex].caption}</span>
            </div>

            {/* Scene Selector Dots */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 bg-slate-950/85 backdrop-blur-md border border-amber-500/30 px-2.5 py-1.5 rounded-full">
              <span className="text-[10px] text-slate-300 mr-1 font-mono uppercase">Voxel Scene:</span>
              {VOXEL_GALLERY.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVoxelIndex(idx)}
                  className={`w-3 h-3 rounded-sm transition-all cursor-pointer ${
                    activeVoxelIndex === idx
                      ? 'bg-amber-400 ring-2 ring-amber-300 scale-125'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={g.title}
                  aria-label={`View ${g.title}`}
                />
              ))}
            </div>
          </div>

          {/* Header Details */}
          <div className="p-6 sm:p-8 space-y-4 border-t-2 border-amber-500/30 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                State-Level Innovation Clash
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-rose-600/30 text-rose-300 border border-rose-500/50">
                1st &amp; 2nd Year Students Only
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                1 to 4 Members Per Team
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center space-x-3">
                  <span>IDEA2ODISHI</span>
                  <span className="text-amber-400 font-mono">2026</span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                  The flagship ideathon at <strong>Sankalp 2026 Tech Fest</strong>, NIST University. Pitch your pioneering technological or digital innovation to transform Odisha across agriculture, healthcare, tourism, smart cities, and sustainable heritage.
                </p>
              </div>

              {/* Schedule Box */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border-2 border-amber-500/30 text-xs shadow-lg space-y-1.5 shrink-0 min-w-[220px]">
                <div className="flex items-center space-x-2 text-amber-400 font-bold">
                  <Calendar className="w-4 h-4" />
                  <span>26–27 November 2026</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300 font-medium">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>11:00 AM – 3:30 PM</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>NIST Seminar Hall 1 &amp; Auditorium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OFFICIAL PPT TEMPLATE DOWNLOAD BANNER */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-amber-400 font-bold text-sm">
              <FileText className="w-4 h-4" />
              <span>Standard Pitch Deck Template Available</span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Participants are encouraged to structure their final pitch using the official Idea2Odishi deck template before uploading in Step 3.
            </p>
          </div>
          <a
            href="/templates/Idea2Odishi_Pitch_Template.pptx"
            download="Idea2Odishi_Pitch_Template.pptx"
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-2 shrink-0 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 shadow-lg cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PPT Template</span>
          </a>
        </div>

        {/* STEP PROGRESS INDICATOR (Minecraft / Voxel Chunky Style) */}
        {currentStep < 5 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { num: 1, title: 'TEAM INFO', subtitle: 'Leader & Members' },
              { num: 2, title: 'IDEA DETAILS', subtitle: 'Title & Category' },
              { num: 3, title: 'PPT UPLOAD', subtitle: 'Final Pitch Deck' },
              { num: 4, title: 'REVIEW & SUBMIT', subtitle: 'Final Lock' }
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

        {/* ERROR NOTIFICATION BANNER */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/15 border-2 border-rose-500/40 text-rose-300 text-xs flex items-start space-x-3 shadow-lg animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold">Please check the following requirement:</div>
              <div>{errorMessage}</div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 1: TEAM INFORMATION */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-slate-800 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                    [ Step 1 of 4 ]
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    Team Information
                  </h2>
                  <p className="text-xs text-slate-400">
                    Register as a Solo participant or assemble a team of up to 4 members.
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 font-bold self-start sm:self-auto">
                  Team Size: {totalMembersCount} / 4 {totalMembersCount === 1 ? '(Solo)' : '(Team)'}
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
                  placeholder="e.g., Konark Cyber Innovators, Utkal AI Labs..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-sm placeholder-slate-600 font-medium transition-all"
                  required
                />
              </div>

              {/* Team Leader Details */}
              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <div className="flex items-center space-x-2 text-sm font-bold text-amber-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Team Leader Details (Primary Participant)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Leader Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      placeholder="e.g., Soumya Ranjan Mohapatra"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>

                  {/* Leader Roll */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      NIST Roll Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={leaderRoll}
                      onChange={(e) => setLeaderRoll(e.target.value.toUpperCase())}
                      placeholder="e.g., 2024BCSE042"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs font-mono uppercase"
                      required
                    />
                  </div>

                  {/* Leader Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={leaderEmail}
                      onChange={(e) => setLeaderEmail(e.target.value)}
                      placeholder="e.g., soumya@nist.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>

                  {/* Leader Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      WhatsApp / Contact Phone <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={leaderPhone}
                      onChange={(e) => setLeaderPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                      required
                    />
                  </div>

                  {/* Leader Stream/Branch */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Stream / Branch <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={leaderStreamBranch}
                      onChange={(e) => setLeaderStreamBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs"
                    >
                      {COMMON_BRANCHES.map((b) => (
                        <option key={b} value={b} className="bg-slate-900">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Leader Year */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Academic Year <span className="text-rose-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['1st Year', '2nd Year'] as EligibleYear[]).map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setLeaderYear(yr)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            leaderYear === yr
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                              : 'bg-slate-950 text-slate-400 border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Branch if other */}
                  {leaderStreamBranch === 'Other Stream / Department' && (
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        Specify Your Department / Branch <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={leaderCustomBranch}
                        onChange={(e) => setLeaderCustomBranch(e.target.value)}
                        placeholder="Enter department name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* DYNAMIC TEAM MEMBERS SECTION */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2 text-sm font-bold text-purple-400">
                      <Users className="w-4 h-4" />
                      <span>Additional Team Members ({teamMembers.length} / 3)</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Add up to 3 team members (1 to 4 members total including team leader).
                    </p>
                  </div>

                  {teamMembers.length < 3 && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md self-start sm:self-auto cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Team Member</span>
                    </button>
                  )}
                </div>

                {/* Team Members List */}
                {teamMembers.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-400">
                    No additional team members added. Currently participating as <strong>Solo</strong>. Click &ldquo;Add Team Member&rdquo; above to register with partners.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {teamMembers.map((member, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-950 border-2 border-purple-500/30 space-y-4 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                            Member {idx + 2} Details
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(idx)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Remove Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Name */}
                          <div className="space-y-1">
                            <label className="block text-[11px] text-slate-400">Member Name *</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleUpdateMember(idx, 'name', e.target.value)}
                              placeholder="Full Name"
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-purple-400 focus:outline-none"
                              required
                            />
                          </div>

                          {/* Roll */}
                          <div className="space-y-1">
                            <label className="block text-[11px] text-slate-400">Roll Number *</label>
                            <input
                              type="text"
                              value={member.roll}
                              onChange={(e) => handleUpdateMember(idx, 'roll', e.target.value.toUpperCase())}
                              placeholder="e.g., 2024BCSE088"
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono uppercase focus:border-purple-400 focus:outline-none"
                              required
                            />
                          </div>

                          {/* Phone */}
                          <div className="space-y-1">
                            <label className="block text-[11px] text-slate-400">Phone Number *</label>
                            <input
                              type="tel"
                              value={member.phone}
                              onChange={(e) => handleUpdateMember(idx, 'phone', e.target.value)}
                              placeholder="10-digit mobile"
                              maxLength={10}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:border-purple-400 focus:outline-none"
                              required
                            />
                          </div>

                          {/* Branch */}
                          <div className="space-y-1 sm:col-span-2">
                            <label className="block text-[11px] text-slate-400">Stream / Branch *</label>
                            <select
                              value={member.stream_branch}
                              onChange={(e) => handleUpdateMember(idx, 'stream_branch', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-purple-400 focus:outline-none"
                            >
                              {COMMON_BRANCHES.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Year */}
                          <div className="space-y-1">
                            <label className="block text-[11px] text-slate-400">Academic Year *</label>
                            <select
                              value={member.year}
                              onChange={(e) => handleUpdateMember(idx, 'year', e.target.value as EligibleYear)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-purple-400 focus:outline-none"
                            >
                              <option value="1st Year">1st Year</option>
                              <option value="2nd Year">2nd Year</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg cursor-pointer"
                >
                  <span>Proceed to Step 2: Idea Information</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 2: IDEA INFORMATION */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-slate-800 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                    [ Step 2 of 4 ]
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    Idea &amp; Project Information
                  </h2>
                  <p className="text-xs text-slate-400">
                    Articulate your solution, focus category, and Odisha impact.
                  </p>
                </div>
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
                  placeholder="e.g., AgriChakshu: AI Drone Crop Monitoring for Odisha Paddy Farms"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-sm placeholder-slate-600 font-medium transition-all"
                  required
                />
              </div>

              {/* Suggested Domain Categories (Grid of Cards) */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Focus Domain / Category <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.02]'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">{cat.title}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <div className="text-[10px] text-amber-400 font-semibold">{cat.tagline}</div>
                          <p className="text-[10px] text-slate-400 leading-snug pt-1">{cat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Problem Statement */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Problem Statement <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500">What specific Odisha challenge are you solving?</span>
                </div>
                <textarea
                  rows={4}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="Detail the real-world bottleneck, affected demographic in Odisha, and why existing alternatives are insufficient..."
                  className="w-full p-4 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Proposed Solution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Proposed Solution &amp; Technical Approach <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500">Tech stack, AI models, hardware or software flow</span>
                </div>
                <textarea
                  rows={4}
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                  placeholder="Describe your architecture, data inputs, algorithms, AI/ML models, or platform architecture and how it directly solves the problem..."
                  className="w-full p-4 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Short Project Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Short Project Description (Elevator Pitch) <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500">2–3 sentences summary</span>
                </div>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="A concise summary of your idea for judges and jury evaluation..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-white text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Buttons */}
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
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg cursor-pointer"
                >
                  <span>Proceed to Step 3: PPT Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: FINAL PPT UPLOAD */}
        {/* ============================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-slate-800 shadow-xl space-y-6">
              
              <div className="pb-4 border-b border-slate-800">
                <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  [ Step 3 of 4 ]
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Final PowerPoint Presentation Upload
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Upload your completed presentation deck in .ppt or .pptx format.
                </p>
              </div>

              {/* MANDATORY WARNING BANNER */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 text-amber-200 text-xs flex items-start space-x-3.5 shadow-lg">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed">
                  <div className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">
                    Important Submission Warning
                  </div>
                  <p className="font-semibold text-slate-200">
                    &ldquo;Please ensure that you upload your final presentation. Once submitted, the PPT cannot be modified or replaced.&rdquo;
                  </p>
                </div>
              </div>

              {/* PPT UPLOAD DROPZONE */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center space-y-4 flex flex-col items-center justify-center ${
                  pptFile
                    ? 'bg-amber-500/10 border-amber-400/80 shadow-inner'
                    : 'bg-slate-950/80 border-slate-700 hover:border-amber-400/60 hover:bg-slate-900/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                  {pptFile ? <FileCheck className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-sm text-white">
                    {pptFile ? 'Change Selected PowerPoint Deck' : 'Click or Drag & Drop PPT / PPTX file here'}
                  </div>
                  <p className="text-xs text-slate-400">
                    Supports <strong>.ppt</strong> and <strong>.pptx</strong> formats up to <strong>25 MB</strong>
                  </p>
                </div>

                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all cursor-pointer"
                >
                  {pptFile ? 'Replace File' : 'Browse Files on Device'}
                </button>
              </div>

              {/* SELECTED FILE DETAILS CARD & PROGRESS */}
              {pptFile && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 truncate">
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-xs text-white truncate">{pptFile.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {formatFileSize(pptFile.size)} • PowerPoint Presentation
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold shrink-0">
                      Ready for Submission
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Verification &amp; Integrity Check</span>
                      <span className="text-emerald-400 font-bold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Template Reminder Box */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Need the standard template before uploading?</span>
                </div>
                <a
                  href="/templates/Idea2Odishi_Pitch_Template.pptx"
                  download="Idea2Odishi_Pitch_Template.pptx"
                  className="text-amber-400 hover:underline font-bold text-xs shrink-0"
                >
                  Download Deck Template
                </a>
              </div>

              {/* Buttons */}
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
                  disabled={!pptFile}
                  className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 border-b-4 transition-all shadow-lg cursor-pointer ${
                    pptFile
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-800 active:border-b-0 active:translate-y-1'
                      : 'bg-slate-800 text-slate-500 border-slate-900 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Proceed to Step 4: Review &amp; Lock</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 4: REVIEW AND FINAL SUBMISSION */}
        {/* ============================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-amber-500/40 shadow-xl space-y-6">
              
              <div className="pb-4 border-b border-slate-800">
                <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  [ Step 4 of 4 ]
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Review &amp; Final Submission
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Carefully verify all information. You can go back to make corrections before final submission.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                
                {/* 1. Team & Leader Details */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Team &amp; Leader Profile</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
                    >
                      Edit Step 1
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Team Name</span>
                      <span className="font-bold text-white text-sm">{teamName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Team Leader</span>
                      <span className="font-semibold text-slate-200">{leaderName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Leader Roll</span>
                      <span className="font-mono text-cyan-400">{leaderRoll}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Leader Email</span>
                      <span className="text-slate-300 truncate block">{leaderEmail}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Leader Phone</span>
                      <span className="font-mono text-slate-300">{leaderPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Stream &amp; Year</span>
                      <span className="text-slate-300">{leaderStreamBranch} • {leaderYear}</span>
                    </div>
                  </div>

                  {/* Team Members */}
                  {teamMembers.length > 0 && (
                    <div className="pt-3 border-t border-slate-900 space-y-2">
                      <span className="text-[11px] font-bold text-purple-400 block">
                        Additional Team Members ({teamMembers.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {teamMembers.map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                            <div className="font-bold text-white">Member {idx + 2}: {m.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{m.roll} • {m.year}</div>
                            <div className="text-[10px] text-slate-500">{m.stream_branch} • Ph: {m.phone}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Idea Overview */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Idea &amp; Solution Overview</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
                    >
                      Edit Step 2
                    </button>
                  </div>

                  <div className="space-y-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Idea Title</span>
                      <span className="font-bold text-white text-sm">{ideaTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Category</span>
                      <span className="font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 inline-block mt-0.5">
                        {category}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Problem Statement</span>
                      <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mt-1 whitespace-pre-wrap">
                        {problemStatement}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Proposed Solution</span>
                      <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mt-1 whitespace-pre-wrap">
                        {proposedSolution}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Short Description</span>
                      <p className="text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 mt-1">
                        &ldquo;{shortDescription}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. PPT Presentation */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <FileCheck className="w-4 h-4" />
                      <span>Uploaded Final Pitch Deck</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
                    >
                      Change PPT (Step 3)
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center space-x-3 truncate">
                      <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="truncate">
                        <div className="font-bold text-white truncate">{pptFile?.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {pptFile ? formatFileSize(pptFile.size) : ''} • Ready for final submission
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono shrink-0">
                      Validated
                    </span>
                  </div>
                </div>

              </div>

              {/* Warning Notice */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  Clicking <strong>&ldquo;Submit Registration&rdquo;</strong> will prompt for your final confirmation to permanently lock your PPT submission.
                </span>
              </div>

              {/* Buttons */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back &amp; Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-xl cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Submit Final Registration</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* CONFIRMATION DIALOG MODAL (Prompt Requirement) */}
        {/* ============================================================== */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
            <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-lg">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-extrabold text-white">
                  Confirm Final Submission
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  &ldquo;Are you sure you want to submit your final registration? Once submitted, your PPT cannot be changed or replaced.&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Team Name:</span>
                  <span className="font-bold text-white">{teamName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Pitch Deck:</span>
                  <span className="font-mono text-emerald-400 truncate max-w-[200px]">{pptFile?.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Go Back
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Locking &amp; Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm Final Submission</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 5: SUCCESS SCREEN (Matching Reference Images & Voxel Theme) */}
        {/* ============================================================== */}
        {currentStep === 5 && successData && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            
            {/* SUCCESS CONFIRMATION SLIP */}
            <div
              id="registration-slip"
              className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-slate-900 shadow-2xl p-6 sm:p-10 space-y-8"
            >
              {/* Header Badge */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Registration Successful!</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Idea2Odishi <span className="text-amber-400">2026</span> Official Pass
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  Your team registration and PowerPoint pitch deck have been locked and submitted for jury evaluation.
                </p>
              </div>

              {/* UNIQUE REGISTRATION ID (Sandstone Voxel Chunky Block) */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-2 border-amber-500/60 text-center space-y-1.5 shadow-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block">
                  UNIQUE REGISTRATION ID
                </span>
                <div className="text-4xl sm:text-6xl font-black font-mono tracking-wider text-amber-400 drop-shadow-md">
                  {successData.registrationId}
                </div>
                <p className="text-[11px] text-slate-400">
                  Please quote this ID during reporting and presentation clash at Sankalp Tech Fest.
                </p>
              </div>

              {/* STRUCTURED EVENT & TEAM DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Team & Leader */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-mono font-bold uppercase text-[11px]">
                    Team Particulars
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Team Name</span>
                    <span className="font-bold text-white text-sm">{successData.teamName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Team Leader Name</span>
                    <span className="font-semibold text-slate-200">{successData.leaderName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Leader Roll</span>
                    <span className="font-mono text-cyan-400">{leaderRoll}</span>
                  </div>
                </div>

                {/* Idea & PPT */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 font-mono font-bold uppercase text-[11px]">
                    Project &amp; Presentation
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Idea / Project Title</span>
                    <span className="font-bold text-white text-sm truncate block">{successData.ideaTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Domain / Category</span>
                    <span className="font-semibold text-amber-400">{successData.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">PPT Upload Confirmation</span>
                    <span className="font-mono text-emerald-400 flex items-center space-x-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span className="truncate">{successData.pptFilename}</span>
                    </span>
                  </div>
                </div>

                {/* Event Schedule (Prompt Mandate: 26–27 November 2026, 11:00 AM – 3:30 PM) */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Event Date</div>
                      <div className="text-amber-300 font-mono font-bold text-sm">26–27 November 2026</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Event Time</div>
                      <div className="text-cyan-300 font-mono font-bold text-sm">11:00 AM – 3:30 PM</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Venue</div>
                      <div className="text-slate-300 text-xs">NIST Seminar Hall 1 &amp; Auditorium</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Email Confirmation Notice */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center space-x-2.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  A confirmation record has been logged for <strong>{leaderEmail}</strong>. Keep this page or print your pass for offline presentation access.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Registration Slip</span>
                </button>

                <div className="flex items-center space-x-3">
                  <Link
                    href="/sankalp"
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                  >
                    Return to Sankalp Fest
                  </Link>

                  <a
                    href="/templates/Idea2Odishi_Pitch_Template.pptx"
                    download="Idea2Odishi_Pitch_Template.pptx"
                    className="px-4 py-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 border border-purple-500/40 font-bold text-xs transition-colors flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Deck</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
