'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { 
  ClubEvent, 
  SankalpEvent, 
  Achievement, 
  TeamMember, 
  Project, 
  GalleryItem, 
  Advisor,
  DomainType 
} from '@/types';
import { 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Calendar, 
  Sparkles, 
  Trophy, 
  Users, 
  FolderGit2, 
  Image as ImageIcon, 
  UserCheck, 
  Download,
  X,
  ToggleLeft,
  ToggleRight,
  Eye,
  Wand2,
  GraduationCap,
  KeyRound,
  User,
  Database,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Search
} from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { formatExternalUrl } from '@/lib/urlUtils';

export default function PresidentPage() {
  const { 
    isAdminLoggedIn, 
    adminUser, 
    loginAdmin, 
    logoutAdmin,
    events,
    sankalpEvents,
    achievements,
    teamMembers,
    projects,
    gallery,
    advisors,
    recruitmentSettings,
    applications,
    addEvent,
    updateEvent,
    deleteEvent,
    addSankalpEvent,
    updateSankalpEvent,
    deleteSankalpEvent,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addTeamMember,
    updateTeamMember,
    updateBatchAlumniStatus,
    alumniBatches,
    toggleAlumniBatch,
    deleteTeamMember,
    addProject,
    updateProject,
    deleteProject,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    addAdvisor,
    updateAdvisor,
    deleteAdvisor,
    toggleRecruitment,
    deleteApplication,
    idea2OdishiRegistrations,
    codeArenaRegistrations,
    deleteIdea2OdishiRegistration,
    deleteCodeArenaRegistration,
    refreshRegistrations,
    dbStatus,
    refreshConnection
  } = useData();

  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    await refreshConnection();
    setIsTestingConnection(false);
  };

  // Login form state
  const [presidentId, setPresidentId] = useState('DSCPresident');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'events' | 'sankalp' | 'registrations' | 'achievements' | 'team' | 'projects' | 'gallery' | 'advisors' | 'recruitment'
  >('events');

  // Modal forms state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string; type: string; data: any } | null>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [eventRegSubTab, setEventRegSubTab] = useState<'idea2odishi' | 'codearena'>('idea2odishi');
  const [selectedReg, setSelectedReg] = useState<any>(null);
  const [regSearchQuery, setRegSearchQuery] = useState('');
  const [isRefreshingRegs, setIsRefreshingRegs] = useState(false);

  const handleRefreshRegs = async () => {
    setIsRefreshingRegs(true);
    await refreshRegistrations();
    setIsRefreshingRegs(false);
  };

  const filteredIdea2Odishi = idea2OdishiRegistrations.filter((r) => {
    if (!regSearchQuery.trim()) return true;
    const q = regSearchQuery.toLowerCase();
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.roll && r.roll.toLowerCase().includes(q)) ||
      (r.phone && r.phone.toLowerCase().includes(q)) ||
      (r.stream_branch && r.stream_branch.toLowerCase().includes(q)) ||
      (r.problem_statement && r.problem_statement.toLowerCase().includes(q)) ||
      (r.member2_name && r.member2_name.toLowerCase().includes(q)) ||
      (r.member2_roll && r.member2_roll.toLowerCase().includes(q)) ||
      (r.id && r.id.toLowerCase().includes(q))
    );
  });

  const filteredCodeArena = codeArenaRegistrations.filter((r) => {
    if (!regSearchQuery.trim()) return true;
    const q = regSearchQuery.toLowerCase();
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.roll && r.roll.toLowerCase().includes(q)) ||
      (r.phone && r.phone.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.stream_branch && r.stream_branch.toLowerCase().includes(q)) ||
      (r.id && r.id.toLowerCase().includes(q))
    );
  });

  const exportIdea2OdishiCSV = () => {
    if (idea2OdishiRegistrations.length === 0) return;
    const headers = [
      'Registration ID',
      'Participation Type',
      'Lead Participant Name',
      'Lead Roll Number',
      'Lead Stream & Branch',
      'Lead Year',
      'Lead Phone Number',
      'Problem Statement',
      'Pitch PPT Deck Link',
      'Member 2 Name',
      'Member 2 Roll Number',
      'Member 2 Stream & Branch',
      'Member 2 Year',
      'Member 2 Phone Number',
      'Registration Timestamp'
    ];
    const rows = idea2OdishiRegistrations.map(r => [
      `"${(r.id || '').replace(/"/g, '""')}"`,
      `"${(r.participation_type || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.roll || '').replace(/"/g, '""')}"`,
      `"${(r.stream_branch || '').replace(/"/g, '""')}"`,
      `"${(r.year || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.problem_statement || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`,
      `"${(r.ppt_url || '').replace(/"/g, '""')}"`,
      `"${(r.member2_name || '').replace(/"/g, '""')}"`,
      `"${(r.member2_roll || '').replace(/"/g, '""')}"`,
      `"${(r.member2_stream_branch || '').replace(/"/g, '""')}"`,
      `"${(r.member2_year || '').replace(/"/g, '""')}"`,
      `"${(r.member2_phone || '').replace(/"/g, '""')}"`,
      `"${r.submitted_at ? new Date(r.submitted_at).toLocaleString('en-IN') : ''}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Idea2Odishi_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportCodeArenaCSV = () => {
    if (codeArenaRegistrations.length === 0) return;
    const headers = [
      'Registration ID',
      'Participant Full Name',
      'Roll Number',
      'Academic Year',
      'Stream & Department',
      'Phone Number',
      'Email Address',
      'Registration Timestamp'
    ];
    const rows = codeArenaRegistrations.map(r => [
      `"${(r.id || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.roll || '').replace(/"/g, '""')}"`,
      `"${(r.year || '').replace(/"/g, '""')}"`,
      `"${(r.stream_branch || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${r.submitted_at ? new Date(r.submitted_at).toLocaleString('en-IN') : ''}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CodeArena_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Form states for adding / editing items
  const [eventForm, setEventForm] = useState<Omit<ClubEvent, 'id'>>({
    title: '',
    year: 2026,
    date: '',
    description: '',
    image: '',
    venue: '',
    category: 'Workshop',
    registration_link: '',
    contest_link: '',
    result: '',
    status: 'Register Now'
  });

  const [sankalpForm, setSankalpForm] = useState<Omit<SankalpEvent, 'id'>>({
    title: '',
    year: 2026,
    date: '',
    description: '',
    image: '',
    venue: '',
    registration_link: '',
    contest_link: '',
    result: '',
    status: 'Register Now'
  });

  const [achievementForm, setAchievementForm] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    year: 2026,
    category: 'Competition Win',
    image: ''
  });

  const [teamForm, setTeamForm] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    batch: '2025',
    domain: 'Data Science',
    role: 'Executive Member',
    photo: '',
    linkedin: '',
    github: '',
    bio: '',
    is_alumni: false
  });

  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    image: '',
    domain: 'Data Science',
    project_url: '',
    github_url: '',
    featured: false
  });

  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    image: '',
    category: 'Events',
    year: 2026
  });

  const [advisorForm, setAdvisorForm] = useState<Omit<Advisor, 'id'>>({
    name: '',
    role: 'Advisor',
    designation: 'Professor, Dept. of CSE',
    department: 'Computer Science & Engineering',
    bio: '',
    photo: '',
    linkedin: '',
    email: ''
  });

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(presidentId, passcode);
    if (!success) {
      setLoginError('Invalid Credentials! President ID: DSCPresident | Passcode: DSCPresident@1');
    }
  };

  // Sample Loaders for Quick Sample Creation
  const loadSampleEvent = () => {
    setEventForm({
      title: 'Hands-on Generative AI & Fine-Tuning Workshop',
      year: 2026,
      date: 'April 20, 2026',
      description: 'Mastering parameter-efficient fine-tuning (LoRA, QLoRA) on custom datasets using PyTorch & Hugging Face Transformers.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      venue: 'Data Science Lab 1, NIST Campus',
      category: 'Workshop',
      registration_link: 'https://nist.ac.in/events/genai-2026',
      contest_link: 'https://kaggle.com/competitions/genai-sprint-2026',
      result: '120+ students deployed local LLM fine-tuned models.'
    });
  };

  const loadSampleSankalp = () => {
    setSankalpForm({
      title: 'Sankalp 2026: Vision AI Rover Challenge',
      year: 2026,
      date: 'March 29, 2026',
      description: 'High-speed autonomous rover navigation task utilizing real-time OpenCV lane detection and barrier recognition.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      venue: 'Outdoor Robotics Track, NIST',
      registration_link: 'https://sankalp.nist.edu/rover-challenge',
      contest_link: 'https://github.com/nist-dsc/sankalp-rover-challenge-2026',
      result: 'Cash prize pool worth ₹35,000.',
      status: 'Register Now'
    });
  };

  const loadSampleAchievement = () => {
    setAchievementForm({
      title: '1st Runner Up — National AI Innovation Hackathon',
      description: 'Data Science Club team created an edge AI wildfire detection system using infrared drone imagery.',
      year: 2026,
      category: 'Hackathon Position',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'
    });
  };

  const loadSampleTeamMember = () => {
    setTeamForm({
      name: 'Aarav Sharma',
      batch: '2025',
      domain: 'Machine Learning',
      role: 'ML Lead',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/aarav-sharma-ml',
      github: 'https://github.com/aarav-sharma',
      bio: 'Machine Learning lead focused on neural networks and open-source data science tools.',
      is_alumni: false
    });
  };

  const loadSampleProject = () => {
    setProjectForm({
      name: 'NeuroVision: Real-Time Brain MRI Classifier',
      description: 'Automated deep learning model for early anomaly detection in neurological MRI scans with low latency web UI.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      domain: 'Deep Learning',
      project_url: 'https://neurovision-demo.vercel.app',
      github_url: 'https://github.com/nist-dsc/neuro-vision',
      featured: true
    });
  };

  const loadSampleGallery = () => {
    setGalleryForm({
      title: 'Annual Data Science Hackathon Keynote 2026',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      category: 'Workshops',
      year: 2026
    });
  };

  const loadSampleAdvisor = () => {
    setAdvisorForm({
      name: 'Dr. Rajesh Kumar Mohanty',
      role: 'Advisor',
      designation: 'Professor & Dean R&D',
      department: 'Computer Science & Engineering',
      bio: 'Specializing in High-Performance Computing and Data Science with 20+ research publications.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/rajesh-mohanty',
      email: 'rkmohanty@nist.edu'
    });
  };

  // Start Editing Item
  const handleStartEdit = (type: string, item: any) => {
    setEditingItem({ id: item.id, type, data: item });
    if (type === 'events') {
      setEventForm({
        title: item.title,
        year: item.year,
        date: item.date,
        description: item.description,
        image: item.image || '',
        venue: item.venue,
        category: item.category,
        registration_link: item.registration_link || '',
        contest_link: item.contest_link || '',
        result: item.result || '',
        status: item.status || 'Register Now'
      });
    } else if (type === 'sankalp') {
      setSankalpForm({
        title: item.title,
        year: item.year,
        date: item.date,
        description: item.description,
        image: item.image || '',
        venue: item.venue,
        registration_link: item.registration_link || '',
        contest_link: item.contest_link || '',
        result: item.result || '',
        status: item.status || 'Register Now'
      });
    } else if (type === 'achievements') {
      setAchievementForm({
        title: item.title,
        description: item.description,
        year: item.year,
        category: item.category,
        image: item.image || ''
      });
    } else if (type === 'team') {
      setTeamForm({
        name: item.name,
        batch: item.batch,
        domain: item.domain,
        role: item.role || '',
        photo: item.photo,
        linkedin: item.linkedin || '',
        github: item.github || '',
        bio: item.bio || '',
        is_alumni: Boolean(item.is_alumni)
      });
    } else if (type === 'projects') {
      setProjectForm({
        name: item.name,
        description: item.description,
        image: item.image,
        domain: item.domain,
        project_url: item.project_url || '',
        github_url: item.github_url || '',
        featured: Boolean(item.featured)
      });
    } else if (type === 'gallery') {
      setGalleryForm({
        title: item.title,
        image: item.image,
        category: item.category,
        year: item.year
      });
    } else if (type === 'advisors') {
      setAdvisorForm({
        name: item.name,
        role: item.role,
        designation: item.designation,
        department: item.department,
        bio: item.bio,
        photo: item.photo,
        linkedin: item.linkedin || '',
        email: item.email || ''
      });
    }
  };

  // Export applications to CSV
  const exportApplicationsCSV = () => {
    if (applications.length === 0) return;
    const headers = ['Full Name', 'Email', 'Phone', 'Department', 'Batch', 'Primary Domain', 'Secondary Domain', 'Skills', 'Submitted At'];
    const rows = applications.map(a => [
      `"${a.full_name}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.department}"`,
      `"${a.batch}"`,
      `"${a.primary_domain}"`,
      `"${a.secondary_domain}"`,
      `"${a.skills.replace(/"/g, '""')}"`,
      `"${a.submitted_at}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `recruitment_applications_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // IF NOT LOGGED IN
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="glass-card p-8 sm:p-10 space-y-6 border-cyan-500/40">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-500 shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              President Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Data Science Club • NIST University
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-cyan-500" />
                <span>President ID *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter President ID"
                value={presidentId}
                onChange={(e) => setPresidentId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-500" />
                <span>Password *</span>
              </label>
              <input
                type="password"
                required
                placeholder="Enter Password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg cursor-pointer transition-all"
            >
              Authenticate Access
            </button>
          </form>

          <div className="pt-2 text-[11px] text-slate-500 text-center">
            Restricted Access Portal • Authorized Personnel Only
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN PRESIDENT DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* LOGGED IN HEADER */}
      <div className="glass-card p-6 border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-500 font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-slate-900 dark:text-white">{adminUser?.name}</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {adminUser?.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{adminUser?.email}</p>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Session</span>
        </button>
      </div>

      {/* DATABASE CONNECTION & STATUS BANNER */}
      <div className={`p-4 rounded-2xl border transition-all ${
        dbStatus.isConnected
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
          : dbStatus.isConfigured
          ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl border mt-0.5 shrink-0 ${
              dbStatus.isConnected
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : dbStatus.isConfigured
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
            }`}>
              {dbStatus.isConnected ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-extrabold text-sm">
                  {dbStatus.isConnected
                    ? '🟢 Supabase Database Connected (Live Data Sync Active)'
                    : dbStatus.isConfigured
                    ? '🔴 Supabase Database Connection Error'
                    : '🟡 Offline / Demo Mode (Saved to Local Browser Cache Only)'}
                </span>
                {dbStatus.lastSyncTime && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900/40 font-mono text-slate-300">
                    Last synced: {dbStatus.lastSyncTime}
                  </span>
                )}
              </div>
              <p className="text-xs opacity-90 mt-0.5">
                {dbStatus.message}
              </p>
              {dbStatus.errorDetail && (
                <p className="text-[11px] font-mono mt-1.5 p-2.5 rounded-lg bg-black/40 border border-current/20 text-rose-300 overflow-x-auto">
                  {dbStatus.errorDetail}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={isTestingConnection}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900/50 hover:bg-slate-900/80 border border-current/30 text-white transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin' : ''}`} />
            <span>{isTestingConnection ? 'Testing DB...' : 'Test Connection'}</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { key: 'events', label: `Events (${events.length})`, icon: Calendar },
          { key: 'sankalp', label: `Sankalp (${sankalpEvents.length})`, icon: Sparkles },
          { key: 'registrations', label: `Registrations (${idea2OdishiRegistrations.length + codeArenaRegistrations.length})`, icon: FileText },
          { key: 'achievements', label: `Achievements (${achievements.length})`, icon: Trophy },
          { key: 'team', label: `Team (${teamMembers.length})`, icon: Users },
          { key: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
          { key: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
          { key: 'advisors', label: `Advisors (${advisors.length})`, icon: GraduationCap },
          { key: 'recruitment', label: `Applications (${applications.length})`, icon: UserCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center space-x-2 ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Events Archive</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  loadSampleEvent();
                  setShowAddModal(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Add Sample Event</span>
              </button>
              <button
                onClick={() => {
                  setEventForm({
                    title: '', year: 2026, date: '', description: '', image: '', venue: '', category: 'Workshop', registration_link: '', contest_link: '', result: '', status: 'Register Now'
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Event</span>
              </button>
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div>{e.title}</div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 font-normal">
                        {e.contest_link && (
                          <a
                            href={formatExternalUrl(e.contest_link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-0.5"
                            title="Direct Contest Link"
                          >
                            <span>Contest</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {e.registration_link && (
                          <a
                            href={formatExternalUrl(e.registration_link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-0.5"
                            title="Direct Registration Link"
                          >
                            <span>Registration</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-mono">{e.year}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">{e.category}</span></td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        e.status === 'Register Now'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : e.status === 'Coming soon...'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      }`}>
                        {e.status || 'Register Now'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{e.venue}</td>
                    <td className="p-4 text-slate-500">{e.date}</td>
                    <td className="p-4 text-right space-x-1">
                      <button onClick={() => handleStartEdit('events', e)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Event">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteEvent(e.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Event">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: SANKALP */}
      {activeTab === 'sankalp' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Sankalp Tech Fest Activities</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  loadSampleSankalp();
                  setShowAddModal(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Add Sample Sankalp Activity</span>
              </button>
              <button
                onClick={() => {
                  setSankalpForm({
                    title: '', year: 2026, date: '', description: '', image: '', venue: '', registration_link: '', contest_link: '', result: '', status: 'Register Now'
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Activity</span>
              </button>
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Event Title</th>
                  <th className="p-4">Fest Year</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {sankalpEvents.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div>{e.title}</div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 font-normal">
                        {e.contest_link && (
                          <a
                            href={formatExternalUrl(e.contest_link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-0.5"
                            title="Direct Separate Contest Link"
                          >
                            <span>Contest</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {e.registration_link && (
                          <a
                            href={formatExternalUrl(e.registration_link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-0.5"
                            title="Direct Registration Link"
                          >
                            <span>Registration</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-purple-400">Sankalp {e.year}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        e.status === 'Register Now'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : e.status === 'Coming soon...'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      }`}>
                        {e.status || 'Register Now'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{e.venue}</td>
                    <td className="p-4 text-slate-500">{e.date}</td>
                    <td className="p-4 text-right space-x-1">
                      <button onClick={() => handleStartEdit('sankalp', e)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Activity">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteSankalpEvent(e.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Activity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: EVENT REGISTRATIONS (IDEA2ODISHI & CODE ARENA 2.0) */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-500" />
                <span>Sankalp 2026 Event Registrations</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live participant sign-ups fetched directly from database for Idea2Odishi and Code Arena 2.0.
              </p>
            </div>

            {/* SUB-TABS & SYNC BUTTON */}
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <button
                onClick={handleRefreshRegs}
                disabled={isRefreshingRegs}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer border border-slate-300 dark:border-slate-700"
                title="Fetch latest student signups from Supabase"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingRegs ? 'animate-spin text-cyan-500' : 'text-slate-400'}`} />
                <span>{isRefreshingRegs ? 'Syncing...' : 'Sync Database'}</span>
              </button>

              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                <button
                  onClick={() => setEventRegSubTab('idea2odishi')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    eventRegSubTab === 'idea2odishi'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Idea2Odishi ({idea2OdishiRegistrations.length})
                </button>
                <button
                  onClick={() => setEventRegSubTab('codearena')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    eventRegSubTab === 'codearena'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Code Arena 2.0 ({codeArenaRegistrations.length})
                </button>
              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="flex items-center bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Search className="w-4 h-4 text-slate-400 ml-2 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder={`Search ${eventRegSubTab === 'idea2odishi' ? 'Idea2Odishi' : 'Code Arena'} participants by name, roll number, stream, phone, or problem...`}
              value={regSearchQuery}
              onChange={(e) => setRegSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {regSearchQuery && (
              <button
                onClick={() => setRegSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* SUB-TAB 1: IDEA2ODISHI */}
          {eventRegSubTab === 'idea2odishi' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Showing <strong>{filteredIdea2Odishi.length}</strong> of {idea2OdishiRegistrations.length} registered innovators
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="/register/idea2odishi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors flex items-center space-x-1"
                  >
                    <span>Open Form</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={exportIdea2OdishiCSV}
                    disabled={idea2OdishiRegistrations.length === 0}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center space-x-1 shadow-sm disabled:opacity-40 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV (Excel)</span>
                  </button>
                </div>
              </div>

              <div className="glass-card overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-4">Reg ID</th>
                      <th className="p-4">Mode</th>
                      <th className="p-4">Lead Participant</th>
                      <th className="p-4">Stream &amp; Year</th>
                      <th className="p-4">Contact Phone</th>
                      <th className="p-4">Co-Member (If Team)</th>
                      <th className="p-4">Problem Statement</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredIdea2Odishi.length > 0 ? (
                      filteredIdea2Odishi.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-purple-500">{reg.id}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              reg.participation_type === 'Team'
                                ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                                : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                            }`}>
                              {reg.participation_type}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-900 dark:text-white">{reg.name}</div>
                            <div className="font-mono text-[11px] text-slate-500">{reg.roll}</div>
                          </td>
                          <td className="p-4">
                            <div>{reg.stream_branch}</div>
                            <span className="text-[10px] font-bold text-amber-500">{reg.year}</span>
                          </td>
                          <td className="p-4 font-mono">{reg.phone}</td>
                          <td className="p-4">
                            {reg.participation_type === 'Team' && reg.member2_name ? (
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">{reg.member2_name}</div>
                                <div className="text-[11px] font-mono text-slate-500">{reg.member2_roll} • {reg.member2_year}</div>
                                <div className="text-[10px] text-slate-400">{reg.member2_phone}</div>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">—</span>
                            )}
                          </td>
                          <td className="p-4 max-w-xs">
                            <p className="line-clamp-2 text-slate-600 dark:text-slate-400 text-[11px]">
                              {reg.problem_statement}
                            </p>
                            {reg.ppt_url && (
                              <a
                                href={reg.ppt_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-purple-400 hover:underline flex items-center space-x-0.5 mt-0.5"
                              >
                                <span>View PPT Link</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              <button
                                onClick={() => setSelectedReg(reg)}
                                className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer transition-colors"
                                title="View Full Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete registration for ${reg.name} (${reg.id})?`)) {
                                    deleteIdea2OdishiRegistration(reg.id);
                                  }
                                }}
                                className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors"
                                title="Delete Registration"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          {regSearchQuery ? 'No matching registrations found for your search.' : 'No Idea2Odishi registrations recorded yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: CODE ARENA 2.0 */}
          {eventRegSubTab === 'codearena' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Showing <strong>{filteredCodeArena.length}</strong> of {codeArenaRegistrations.length} registered speed coders
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="/register/codearena"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors flex items-center space-x-1"
                  >
                    <span>Open Form</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={exportCodeArenaCSV}
                    disabled={codeArenaRegistrations.length === 0}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center space-x-1 shadow-sm disabled:opacity-40 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV (Excel)</span>
                  </button>
                </div>
              </div>

              <div className="glass-card overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-4">Reg ID</th>
                      <th className="p-4">Participant Name</th>
                      <th className="p-4">Roll Number</th>
                      <th className="p-4">Year</th>
                      <th className="p-4">Stream &amp; Branch</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Email Address</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredCodeArena.length > 0 ? (
                      filteredCodeArena.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-cyan-500">{reg.id}</td>
                          <td className="p-4 font-bold text-slate-900 dark:text-white">{reg.name}</td>
                          <td className="p-4 font-mono font-bold text-purple-400">{reg.roll}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                              {reg.year}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-400">{reg.stream_branch}</td>
                          <td className="p-4 font-mono">{reg.phone}</td>
                          <td className="p-4 text-cyan-600 dark:text-cyan-400">{reg.email}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              <button
                                onClick={() => setSelectedReg(reg)}
                                className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer transition-colors"
                                title="View Full Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete registration for ${reg.name} (${reg.id})?`)) {
                                    deleteCodeArenaRegistration(reg.id);
                                  }
                                }}
                                className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors"
                                title="Delete Registration"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          {regSearchQuery ? 'No matching registrations found for your search.' : 'No Code Arena 2.0 registrations recorded yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* REGISTRATION DETAIL MODAL */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl ${
                  'participation_type' in selectedReg
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                    : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-cyan-500">{selectedReg.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {'participation_type' in selectedReg ? 'Idea2Odishi 2026' : 'Code Arena 2.0'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedReg.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Primary Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <div>
                  <span className="text-slate-400 block text-[11px]">Roll Number</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{selectedReg.roll}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Academic Year</span>
                  <span className="font-bold text-amber-500">{selectedReg.year}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Stream &amp; Branch</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.stream_branch}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                  <a href={`tel:${selectedReg.phone}`} className="font-mono font-bold text-cyan-500 hover:underline">
                    {selectedReg.phone}
                  </a>
                </div>
                {'email' in selectedReg && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[11px]">Email Address</span>
                    <a href={`mailto:${selectedReg.email}`} className="font-medium text-cyan-500 hover:underline">
                      {selectedReg.email}
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[11px]">Registration Date &amp; Time</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono">
                    {selectedReg.submitted_at ? new Date(selectedReg.submitted_at).toLocaleString('en-IN') : 'N/A'}
                  </span>
                </div>
                {'participation_type' in selectedReg && (
                  <div>
                    <span className="text-slate-400 block text-[11px]">Participation Mode</span>
                    <span className="font-bold text-purple-400">{selectedReg.participation_type}</span>
                  </div>
                )}
              </div>

              {/* Team Member 2 Section if applicable */}
              {'member2_name' in selectedReg && selectedReg.member2_name && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>Team Partner Details (Member 2)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Member Name</span>
                      <span className="font-bold text-slate-900 dark:text-white">{selectedReg.member2_name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Roll Number</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedReg.member2_roll}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Stream &amp; Branch</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.member2_stream_branch}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Academic Year</span>
                      <span className="font-bold text-amber-500">{selectedReg.member2_year}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                      <a href={`tel:${selectedReg.member2_phone}`} className="font-mono font-bold text-purple-400 hover:underline">
                        {selectedReg.member2_phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Problem Statement Section if Idea2Odishi */}
              {'problem_statement' in selectedReg && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Problem Statement &amp; Solution Details
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 max-h-60 overflow-y-auto">
                    {selectedReg.problem_statement}
                  </div>
                </div>
              )}

              {/* PPT URL Link if provided */}
              {'ppt_url' in selectedReg && selectedReg.ppt_url && (
                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-purple-400 block">Submitted Pitch Deck</span>
                    <a
                      href={selectedReg.ppt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-400 hover:underline truncate block"
                    >
                      {selectedReg.ppt_url}
                    </a>
                  </div>
                  <a
                    href={selectedReg.ppt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shrink-0 flex items-center space-x-1"
                  >
                    <span>Open PPT</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <button
                onClick={() => {
                  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedReg, null, 2));
                  const dl = document.createElement('a');
                  dl.setAttribute('href', dataStr);
                  dl.setAttribute('download', `${selectedReg.id}_Registration.json`);
                  document.body.appendChild(dl);
                  dl.click();
                  document.body.removeChild(dl);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={() => setSelectedReg(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Achievements</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  loadSampleAchievement();
                  setShowAddModal(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Add Sample Achievement</span>
              </button>
              <button
                onClick={() => {
                  setAchievementForm({
                    title: '', description: '', year: 2026, category: 'Competition Win', image: ''
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Achievement</span>
              </button>
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Year</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {achievements.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{a.title}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-bold">{a.category}</span></td>
                    <td className="p-4 font-mono">{a.year}</td>
                    <td className="p-4 text-right space-x-1">
                      <button onClick={() => handleStartEdit('achievements', a)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Achievement">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteAchievement(a.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Achievement">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: TEAM */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Team Members & Alumni</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Categorize members as Alumni or Current Members by batch tickboxes or individual member settings.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  loadSampleTeamMember();
                  setShowAddModal(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Add Sample Member Card</span>
              </button>
              <button
                onClick={() => {
                  setTeamForm({
                    name: '', batch: '2025', domain: 'Data Science', role: 'Executive Member', photo: '', linkedin: '', github: '', bio: '', is_alumni: false
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>
          </div>

          {/* ALUMNI BATCHES CONFIGURATION CARD */}
          <div className="glass-card p-5 space-y-3 bg-purple-900/10 border-purple-500/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-purple-900 dark:text-purple-300 flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Alumni Batches Configuration (Tickboxes to select Alumni batches)</span>
              </h3>
              <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                Checked = Alumni | Unchecked = Current Members
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {['2025', '2024', '2023', '2022', '2021', '2020'].map((batchYear) => {
                const isAlumniChecked = alumniBatches.includes(batchYear);

                return (
                  <label
                    key={batchYear}
                    className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isAlumniChecked
                        ? 'bg-purple-600/20 border-purple-500/60 text-purple-300 font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-purple-600 accent-purple-500 cursor-pointer"
                      checked={isAlumniChecked}
                      onChange={(e) => toggleAlumniBatch(batchYear, e.target.checked)}
                    />
                    <span className="text-xs font-mono">Batch {batchYear}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Batch</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Member Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {teamMembers.map((m) => {
                  const isAlum = m.is_alumni ?? ['2020', '2021', '2022', '2023'].some(b => m.batch && m.batch.includes(b));
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{m.name}</td>
                      <td className="p-4 font-mono font-bold text-cyan-500">{m.batch}</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-semibold">{m.domain}</span></td>
                      <td className="p-4 text-slate-500">{m.role || 'Member'}</td>
                      <td className="p-4">
                        <button
                          onClick={() => updateTeamMember(m.id, { is_alumni: !isAlum })}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer border transition-all ${
                            isAlum
                              ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 hover:bg-purple-500/30'
                              : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/30'
                          }`}
                          title="Click to toggle Alumni vs Current Member"
                        >
                          {isAlum ? 'Alumni' : 'Current Member'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button onClick={() => handleStartEdit('team', m)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Member">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteTeamMember(m.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Member">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Student Projects</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  loadSampleProject();
                  setShowAddModal(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Add Sample Project Card</span>
              </button>
              <button
                onClick={() => {
                  setProjectForm({
                    name: '', description: '', image: '', domain: 'Data Science', project_url: '', github_url: '', featured: false
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Project Name</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{p.name}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold">{p.domain}</span></td>
                    <td className="p-4">{p.featured ? '★ Yes' : 'No'}</td>
                    <td className="p-4 text-right space-x-1">
                      <button onClick={() => handleStartEdit('projects', p)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Project">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProject(p.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Project">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: GALLERY */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Photo Gallery</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  loadSampleGallery();
                  setShowAddModal(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Add Sample Gallery Card</span>
              </button>
              <button
                onClick={() => {
                  setGalleryForm({
                    title: '', image: '', category: 'Events', year: 2026
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Image</span>
              </button>
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Year</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {gallery.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{g.title}</td>
                    <td className="p-4 font-bold text-purple-400">{g.category}</td>
                    <td className="p-4 font-mono">{g.year}</td>
                    <td className="p-4 text-right space-x-1">
                      <button onClick={() => handleStartEdit('gallery', g)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Gallery Item">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteGalleryItem(g.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Gallery Item">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: ADVISORS */}
      {activeTab === 'advisors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Faculty Advisors</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  loadSampleAdvisor();
                  setShowAddModal(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Add Sample Advisor</span>
              </button>
              <button
                onClick={() => {
                  setAdvisorForm({
                    name: '', role: 'Advisor', designation: 'Professor, Dept. of CSE', department: 'Computer Science & Engineering', bio: '', photo: '', linkedin: '', email: ''
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Advisor</span>
              </button>
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Designation</th>
                  <th className="p-4">Department</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {advisors.map((adv) => (
                  <tr key={adv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{adv.name}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">{adv.role}</span></td>
                    <td className="p-4 text-slate-500">{adv.designation}</td>
                    <td className="p-4 text-slate-500">{adv.department}</td>
                    <td className="p-4 text-right space-x-1">
                      <button onClick={() => handleStartEdit('advisors', adv)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Advisor">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteAdvisor(adv.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Advisor">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 8: RECRUITMENT APPLICATIONS */}
      {activeTab === 'recruitment' && (
        <div className="space-y-6">
          <div className="glass-card p-6 border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recruitment Status Control
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current State: <strong className={recruitmentSettings.is_open ? 'text-emerald-400' : 'text-rose-400'}>
                  {recruitmentSettings.is_open ? 'OPEN (Accepting Applications)' : 'CLOSED (Applications Disabled)'}
                </strong>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleRecruitment(!recruitmentSettings.is_open)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer flex items-center space-x-2 ${
                  recruitmentSettings.is_open
                    ? 'bg-rose-600 hover:bg-rose-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {recruitmentSettings.is_open ? (
                  <>
                    <ToggleRight className="w-5 h-5" />
                    <span>Close Recruitment Applications</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5" />
                    <span>Open Recruitment Applications</span>
                  </>
                )}
              </button>

              <button
                onClick={exportApplicationsCSV}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-300 dark:border-slate-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-500" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Applicant Name</th>
                  <th className="p-4">Email / Phone</th>
                  <th className="p-4">Department / Batch</th>
                  <th className="p-4">Primary Domain</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{app.full_name}</td>
                    <td className="p-4">
                      <div>{app.email}</div>
                      <div className="text-[11px] text-slate-400">{app.phone}</div>
                    </td>
                    <td className="p-4">
                      <div>{app.department}</div>
                      <div className="text-[11px] text-cyan-400 font-mono">Batch {app.batch}</div>
                    </td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold">{app.primary_domain}</span></td>
                    <td className="p-4 text-slate-500">{new Date(app.submitted_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer"
                        title="View Full Application"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                        title="Delete Application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW APPLICATION MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Application: {selectedApp.full_name}
            </h3>

            <div className="space-y-3 text-xs">
              <div><strong className="text-slate-400">Email:</strong> {selectedApp.email}</div>
              <div><strong className="text-slate-400">Phone:</strong> {selectedApp.phone}</div>
              <div><strong className="text-slate-400">Department & Batch:</strong> {selectedApp.department} ({selectedApp.batch})</div>
              <div><strong className="text-slate-400">Domains:</strong> Primary: {selectedApp.primary_domain} | Secondary: {selectedApp.secondary_domain}</div>
              <div><strong className="text-slate-400">Technical Skills:</strong> {selectedApp.skills}</div>
              {selectedApp.linkedin && <div><strong className="text-slate-400">LinkedIn:</strong> <a href={formatExternalUrl(selectedApp.linkedin)} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{selectedApp.linkedin}</a></div>}
              {selectedApp.github && <div><strong className="text-slate-400">GitHub:</strong> <a href={formatExternalUrl(selectedApp.github)} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{selectedApp.github}</a></div>}
              {selectedApp.resume_url && <div><strong className="text-slate-400">Resume Link:</strong> <a href={formatExternalUrl(selectedApp.resume_url)} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">{selectedApp.resume_url}</a></div>}
              
              <div className="pt-2">
                <strong className="text-slate-400 block mb-1">Statement of Motivation:</strong>
                <p className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{selectedApp.motivation}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ITEM MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
              Edit {editingItem.type.replace(/s$/, '')}
            </h3>

            {/* EDIT EVENTS FORM */}
            {editingItem.type === 'events' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateEvent(editingItem.id, {
                  ...eventForm,
                  registration_link: formatExternalUrl(eventForm.registration_link),
                  contest_link: formatExternalUrl(eventForm.contest_link)
                });
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Title *</label>
                  <input required placeholder="Event Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Year *</label>
                    <input type="number" required className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.year} onChange={e => setEventForm({...eventForm, year: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Category *</label>
                    <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value as any})}>
                      <option value="Workshop">Workshop</option>
                      <option value="Competition">Competition</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Tech Talk">Tech Talk</option>
                      <option value="Seminar">Seminar</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Event Status *</label>
                  <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold" value={eventForm.status || 'Register Now'} onChange={e => setEventForm({...eventForm, status: e.target.value as any})}>
                    <option value="Coming soon...">Coming soon...</option>
                    <option value="Register Now">Register Now</option>
                    <option value="Registration Closed">Registration Closed</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Date String *</label>
                  <input required placeholder="e.g. April 20, 2026" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Venue *</label>
                  <input required placeholder="Venue" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Description *</label>
                  <textarea rows={3} required placeholder="Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} />
                </div>
                <ImageUploader
                  label="Event Image / Banner"
                  folder="events"
                  value={eventForm.image}
                  onChange={url => setEventForm({...eventForm, image: url})}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Registration Link (Optional)</label>
                    <input placeholder="https://forms.gle/... or URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.registration_link} onChange={e => setEventForm({...eventForm, registration_link: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Contest Link (Optional Separate Link)</label>
                    <input placeholder="https://hackerrank.com/... or unstop.com/..." className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.contest_link || ''} onChange={e => setEventForm({...eventForm, contest_link: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Result / Outcome (Optional)</label>
                  <input placeholder="Event outcome notes" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.result} onChange={e => setEventForm({...eventForm, result: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Update Event Changes</button>
              </form>
            )}

            {/* EDIT SANKALP FORM */}
            {editingItem.type === 'sankalp' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateSankalpEvent(editingItem.id, {
                  ...sankalpForm,
                  registration_link: formatExternalUrl(sankalpForm.registration_link),
                  contest_link: formatExternalUrl(sankalpForm.contest_link)
                });
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Activity Title *</label>
                  <input required placeholder="Activity Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.title} onChange={e => setSankalpForm({...sankalpForm, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Fest Year *</label>
                    <input type="number" required placeholder="Fest Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.year} onChange={e => setSankalpForm({...sankalpForm, year: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Status *</label>
                    <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold" value={sankalpForm.status || 'Register Now'} onChange={e => setSankalpForm({...sankalpForm, status: e.target.value as any})}>
                      <option value="Coming soon...">Coming soon...</option>
                      <option value="Register Now">Register Now</option>
                      <option value="Registration Closed">Registration Closed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Date String *</label>
                  <input required placeholder="Date String" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.date} onChange={e => setSankalpForm({...sankalpForm, date: e.target.value})} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Venue *</label>
                  <input required placeholder="Venue" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.venue} onChange={e => setSankalpForm({...sankalpForm, venue: e.target.value})} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Description *</label>
                  <textarea rows={3} required placeholder="Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.description} onChange={e => setSankalpForm({...sankalpForm, description: e.target.value})} />
                </div>
                <ImageUploader
                  label="Sankalp Activity Banner"
                  folder="sankalp"
                  value={sankalpForm.image}
                  onChange={url => setSankalpForm({...sankalpForm, image: url})}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Registration Link (Optional)</label>
                    <input placeholder="https://sankalp.nist.edu/... or forms.gle" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.registration_link} onChange={e => setSankalpForm({...sankalpForm, registration_link: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Contest Link (Optional Separate Link)</label>
                    <input placeholder="https://hackerrank.com/... or unstop.com/..." className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.contest_link || ''} onChange={e => setSankalpForm({...sankalpForm, contest_link: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Result Notes (Optional)</label>
                  <input placeholder="Result Notes" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.result} onChange={e => setSankalpForm({...sankalpForm, result: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-bold text-white cursor-pointer hover:bg-purple-500">Update Sankalp Activity</button>
              </form>
            )}

            {/* EDIT ACHIEVEMENTS FORM */}
            {editingItem.type === 'achievements' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateAchievement(editingItem.id, achievementForm);
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <input required placeholder="Achievement Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.title} onChange={e => setAchievementForm({...achievementForm, title: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.category} onChange={e => setAchievementForm({...achievementForm, category: e.target.value as any})}>
                  <option value="Competition Win">Competition Win</option>
                  <option value="Hackathon Position">Hackathon Position</option>
                  <option value="Project Award">Project Award</option>
                  <option value="Recognition">Recognition</option>
                </select>
                <input type="number" required placeholder="Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.year} onChange={e => setAchievementForm({...achievementForm, year: Number(e.target.value)})} />
                <textarea required placeholder="Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.description} onChange={e => setAchievementForm({...achievementForm, description: e.target.value})} />
                <ImageUploader
                  label="Achievement Image / Certificate"
                  folder="achievements"
                  value={achievementForm.image || ''}
                  onChange={url => setAchievementForm({...achievementForm, image: url})}
                />
                <button type="submit" className="w-full py-3 rounded-xl bg-amber-600 font-bold text-white cursor-pointer hover:bg-amber-500">Update Achievement</button>
              </form>
            )}

            {/* EDIT TEAM FORM */}
            {editingItem.type === 'team' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateTeamMember(editingItem.id, teamForm);
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <input required placeholder="Member Full Name" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} />
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Batch Year</label>
                  <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.batch} onChange={e => setTeamForm({...teamForm, batch: e.target.value})}>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.domain} onChange={e => setTeamForm({...teamForm, domain: e.target.value as DomainType})}>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="OpenCV">OpenCV</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <input placeholder="Role (e.g. Club President, Tech Head)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} />
                <ImageUploader
                  label="Member Photo"
                  folder="team"
                  value={teamForm.photo}
                  onChange={url => setTeamForm({...teamForm, photo: url})}
                />
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Short Bio (Shown on Card Flip)</label>
                  <textarea rows={3} placeholder="Short bio about member..." className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.bio || ''} onChange={e => setTeamForm({...teamForm, bio: e.target.value})} />
                </div>
                <div className="flex items-center space-x-2 pt-1 pb-1">
                  <input
                    type="checkbox"
                    id="edit_is_alumni"
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-500 cursor-pointer"
                    checked={teamForm.is_alumni || false}
                    onChange={e => setTeamForm({...teamForm, is_alumni: e.target.checked})}
                  />
                  <label htmlFor="edit_is_alumni" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Mark as Alumni Member
                  </label>
                </div>
                <input placeholder="LinkedIn URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.linkedin} onChange={e => setTeamForm({...teamForm, linkedin: e.target.value})} />
                <input placeholder="GitHub URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.github} onChange={e => setTeamForm({...teamForm, github: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Update Member Card</button>
              </form>
            )}

            {/* EDIT PROJECTS FORM */}
            {editingItem.type === 'projects' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateProject(editingItem.id, projectForm);
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <input required placeholder="Project Name" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.domain} onChange={e => setProjectForm({...projectForm, domain: e.target.value as DomainType})}>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="OpenCV">OpenCV</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <textarea required placeholder="Project Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                <ImageUploader
                  label="Project Cover Image"
                  folder="projects"
                  value={projectForm.image}
                  onChange={url => setProjectForm({...projectForm, image: url})}
                />
                <input placeholder="Live Demo URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.project_url} onChange={e => setProjectForm({...projectForm, project_url: e.target.value})} />
                <input placeholder="GitHub Repository URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.github_url} onChange={e => setProjectForm({...projectForm, github_url: e.target.value})} />
                <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold cursor-pointer">
                  <input type="checkbox" checked={projectForm.featured} onChange={e => setProjectForm({...projectForm, featured: e.target.checked})} className="rounded text-cyan-600" />
                  <span>Feature on Home Page</span>
                </label>
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Update Project Details</button>
              </form>
            )}

            {/* EDIT GALLERY FORM */}
            {editingItem.type === 'gallery' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateGalleryItem(editingItem.id, galleryForm);
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <input required placeholder="Image Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value as any})}>
                  <option value="Events">Events</option>
                  <option value="Sankalp">Sankalp</option>
                  <option value="Team">Team</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Projects">Projects</option>
                </select>
                <input type="number" required placeholder="Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.year} onChange={e => setGalleryForm({...galleryForm, year: Number(e.target.value)})} />
                <ImageUploader
                  label="Gallery Image"
                  folder="gallery"
                  value={galleryForm.image}
                  onChange={url => setGalleryForm({...galleryForm, image: url})}
                />
                <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-bold text-white cursor-pointer hover:bg-purple-500">Update Gallery Image</button>
              </form>
            )}

            {/* EDIT ADVISORS FORM */}
            {editingItem.type === 'advisors' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateAdvisor(editingItem.id, advisorForm);
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <input required placeholder="Advisor Full Name" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.name} onChange={e => setAdvisorForm({...advisorForm, name: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.role} onChange={e => setAdvisorForm({...advisorForm, role: e.target.value as any})}>
                  <option value="Advisor">Advisor</option>
                  <option value="Co-Advisor">Co-Advisor</option>
                </select>
                <input required placeholder="Designation" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.designation} onChange={e => setAdvisorForm({...advisorForm, designation: e.target.value})} />
                <input required placeholder="Department" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.department} onChange={e => setAdvisorForm({...advisorForm, department: e.target.value})} />
                <textarea required placeholder="Short Biography" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.bio} onChange={e => setAdvisorForm({...advisorForm, bio: e.target.value})} />
                <ImageUploader
                  label="Advisor Photo"
                  folder="advisors"
                  value={advisorForm.photo}
                  onChange={url => setAdvisorForm({...advisorForm, photo: url})}
                />
                <input placeholder="LinkedIn URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.linkedin} onChange={e => setAdvisorForm({...advisorForm, linkedin: e.target.value})} />
                <input placeholder="Email" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.email} onChange={e => setAdvisorForm({...advisorForm, email: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Update Advisor Info</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADD ITEM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                Create New {activeTab.replace(/s$/, '')}
              </h3>
              
              {/* SAMPLE TEMPLATE QUICK LOAD BUTTON */}
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'events') loadSampleEvent();
                  if (activeTab === 'sankalp') loadSampleSankalp();
                  if (activeTab === 'achievements') loadSampleAchievement();
                  if (activeTab === 'team') loadSampleTeamMember();
                  if (activeTab === 'projects') loadSampleProject();
                  if (activeTab === 'gallery') loadSampleGallery();
                  if (activeTab === 'advisors') loadSampleAdvisor();
                }}
                className="text-xs font-bold text-cyan-500 hover:text-cyan-400 flex items-center space-x-1 cursor-pointer bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/30"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Autofill Sample Card</span>
              </button>
            </div>

            {/* CONDITIONAL ADD FORMS */}
            {activeTab === 'events' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addEvent({
                  ...eventForm,
                  registration_link: formatExternalUrl(eventForm.registration_link),
                  contest_link: formatExternalUrl(eventForm.contest_link)
                });
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Event Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" required placeholder="Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.year} onChange={e => setEventForm({...eventForm, year: Number(e.target.value)})} />
                  <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value as any})}>
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Tech Talk">Tech Talk</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Event Status *</label>
                  <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold" value={eventForm.status || 'Register Now'} onChange={e => setEventForm({...eventForm, status: e.target.value as any})}>
                    <option value="Coming soon...">Coming soon...</option>
                    <option value="Register Now">Register Now</option>
                    <option value="Registration Closed">Registration Closed</option>
                  </select>
                </div>
                <input required placeholder="Date string (e.g. March 15, 2026)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                <input required placeholder="Venue" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} />
                <textarea required placeholder="Event Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} />
                <ImageUploader
                  label="Event Image / Banner"
                  folder="events"
                  value={eventForm.image}
                  onChange={url => setEventForm({...eventForm, image: url})}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="Registration Link (Optional)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.registration_link} onChange={e => setEventForm({...eventForm, registration_link: e.target.value})} />
                  <input placeholder="Contest Link (Optional separate link)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.contest_link || ''} onChange={e => setEventForm({...eventForm, contest_link: e.target.value})} />
                </div>
                <input placeholder="Result Notes (Optional)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.result} onChange={e => setEventForm({...eventForm, result: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Publish Event Card</button>
              </form>
            )}

            {activeTab === 'sankalp' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addSankalpEvent({
                  ...sankalpForm,
                  registration_link: formatExternalUrl(sankalpForm.registration_link),
                  contest_link: formatExternalUrl(sankalpForm.contest_link)
                });
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Activity Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.title} onChange={e => setSankalpForm({...sankalpForm, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" required placeholder="Fest Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.year} onChange={e => setSankalpForm({...sankalpForm, year: Number(e.target.value)})} />
                  <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold" value={sankalpForm.status || 'Register Now'} onChange={e => setSankalpForm({...sankalpForm, status: e.target.value as any})}>
                    <option value="Coming soon...">Coming soon...</option>
                    <option value="Register Now">Register Now</option>
                    <option value="Registration Closed">Registration Closed</option>
                  </select>
                </div>
                <input required placeholder="Date String" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.date} onChange={e => setSankalpForm({...sankalpForm, date: e.target.value})} />
                <input required placeholder="Venue" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.venue} onChange={e => setSankalpForm({...sankalpForm, venue: e.target.value})} />
                <textarea required placeholder="Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.description} onChange={e => setSankalpForm({...sankalpForm, description: e.target.value})} />
                <ImageUploader
                  label="Sankalp Activity Banner"
                  folder="sankalp"
                  value={sankalpForm.image}
                  onChange={url => setSankalpForm({...sankalpForm, image: url})}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="Registration Link (e.g., https://sankalp.nist.edu/... or forms.gle)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.registration_link} onChange={e => setSankalpForm({...sankalpForm, registration_link: e.target.value})} />
                  <input placeholder="Contest Link (Separate link for contest/hackathon)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.contest_link || ''} onChange={e => setSankalpForm({...sankalpForm, contest_link: e.target.value})} />
                </div>
                <input placeholder="Result Notes" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.result} onChange={e => setSankalpForm({...sankalpForm, result: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-bold text-white cursor-pointer hover:bg-purple-500">Publish Sankalp Activity</button>
              </form>
            )}

            {activeTab === 'achievements' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addAchievement(achievementForm);
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Achievement Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.title} onChange={e => setAchievementForm({...achievementForm, title: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.category} onChange={e => setAchievementForm({...achievementForm, category: e.target.value as any})}>
                  <option value="Competition Win">Competition Win</option>
                  <option value="Hackathon Position">Hackathon Position</option>
                  <option value="Project Award">Project Award</option>
                  <option value="Recognition">Recognition</option>
                </select>
                <input type="number" required placeholder="Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.year} onChange={e => setAchievementForm({...achievementForm, year: Number(e.target.value)})} />
                <textarea required placeholder="Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.description} onChange={e => setAchievementForm({...achievementForm, description: e.target.value})} />
                <ImageUploader
                  label="Achievement Image / Certificate"
                  folder="achievements"
                  value={achievementForm.image || ''}
                  onChange={url => setAchievementForm({...achievementForm, image: url})}
                />
                <button type="submit" className="w-full py-3 rounded-xl bg-amber-600 font-bold text-white cursor-pointer hover:bg-amber-500">Publish Achievement Card</button>
              </form>
            )}

            {activeTab === 'team' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addTeamMember(teamForm);
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Member Full Name" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} />
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Batch Year</label>
                  <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.batch} onChange={e => setTeamForm({...teamForm, batch: e.target.value})}>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.domain} onChange={e => setTeamForm({...teamForm, domain: e.target.value as DomainType})}>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="OpenCV">OpenCV</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <input placeholder="Role (e.g. Club President, Tech Head)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} />
                <ImageUploader
                  label="Member Photo"
                  folder="team"
                  value={teamForm.photo}
                  onChange={url => setTeamForm({...teamForm, photo: url})}
                />
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Short Bio (Shown on Card Flip)</label>
                  <textarea rows={3} placeholder="Short bio about member..." className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.bio || ''} onChange={e => setTeamForm({...teamForm, bio: e.target.value})} />
                </div>
                <div className="flex items-center space-x-2 pt-1 pb-1">
                  <input
                    type="checkbox"
                    id="add_is_alumni"
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-500 cursor-pointer"
                    checked={teamForm.is_alumni || false}
                    onChange={e => setTeamForm({...teamForm, is_alumni: e.target.checked})}
                  />
                  <label htmlFor="add_is_alumni" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Mark as Alumni Member
                  </label>
                </div>
                <input placeholder="LinkedIn URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.linkedin} onChange={e => setTeamForm({...teamForm, linkedin: e.target.value})} />
                <input placeholder="GitHub URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.github} onChange={e => setTeamForm({...teamForm, github: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Publish Team Member</button>
              </form>
            )}

            {activeTab === 'projects' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addProject(projectForm);
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Project Name" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.domain} onChange={e => setProjectForm({...projectForm, domain: e.target.value as DomainType})}>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="OpenCV">OpenCV</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <textarea required placeholder="Project Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                <ImageUploader
                  label="Project Cover Image"
                  folder="projects"
                  value={projectForm.image}
                  onChange={url => setProjectForm({...projectForm, image: url})}
                />
                <input placeholder="Live Demo URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.project_url} onChange={e => setProjectForm({...projectForm, project_url: e.target.value})} />
                <input placeholder="GitHub Repository URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.github_url} onChange={e => setProjectForm({...projectForm, github_url: e.target.value})} />
                <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold cursor-pointer">
                  <input type="checkbox" checked={projectForm.featured} onChange={e => setProjectForm({...projectForm, featured: e.target.checked})} className="rounded text-cyan-600" />
                  <span>Feature on Home Page</span>
                </label>
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Publish Project Card</button>
              </form>
            )}

            {activeTab === 'gallery' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addGalleryItem(galleryForm);
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Image Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value as any})}>
                  <option value="Events">Events</option>
                  <option value="Sankalp">Sankalp</option>
                  <option value="Team">Team</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Projects">Projects</option>
                </select>
                <input type="number" required placeholder="Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.year} onChange={e => setGalleryForm({...galleryForm, year: Number(e.target.value)})} />
                <ImageUploader
                  label="Gallery Image"
                  folder="gallery"
                  value={galleryForm.image}
                  onChange={url => setGalleryForm({...galleryForm, image: url})}
                />
                <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-bold text-white cursor-pointer hover:bg-purple-500">Publish Gallery Item</button>
              </form>
            )}

            {activeTab === 'advisors' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addAdvisor(advisorForm);
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Advisor Full Name" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.name} onChange={e => setAdvisorForm({...advisorForm, name: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.role} onChange={e => setAdvisorForm({...advisorForm, role: e.target.value as any})}>
                  <option value="Advisor">Advisor</option>
                  <option value="Co-Advisor">Co-Advisor</option>
                </select>
                <input required placeholder="Designation" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.designation} onChange={e => setAdvisorForm({...advisorForm, designation: e.target.value})} />
                <input required placeholder="Department" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.department} onChange={e => setAdvisorForm({...advisorForm, department: e.target.value})} />
                <textarea required placeholder="Short Biography" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.bio} onChange={e => setAdvisorForm({...advisorForm, bio: e.target.value})} />
                <ImageUploader
                  label="Advisor Photo"
                  folder="advisors"
                  value={advisorForm.photo}
                  onChange={url => setAdvisorForm({...advisorForm, photo: url})}
                />
                <input placeholder="LinkedIn URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.linkedin} onChange={e => setAdvisorForm({...advisorForm, linkedin: e.target.value})} />
                <input placeholder="Email" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.email} onChange={e => setAdvisorForm({...advisorForm, email: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Publish Advisor Profile</button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
