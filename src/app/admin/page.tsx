'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { 
  AdminRole, 
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
  GraduationCap
} from 'lucide-react';

export default function AdminPage() {
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
    deleteApplication
  } = useData();

  // Login form state
  const [selectedRole, setSelectedRole] = useState<AdminRole>('Tech Head');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'events' | 'sankalp' | 'achievements' | 'team' | 'projects' | 'gallery' | 'advisors' | 'recruitment'
  >('events');

  // Modal forms state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string; type: string; data: any } | null>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);

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
    result: ''
  });

  const [sankalpForm, setSankalpForm] = useState<Omit<SankalpEvent, 'id'>>({
    title: '',
    year: 2026,
    date: '',
    description: '',
    image: '',
    venue: '',
    registration_link: '',
    result: ''
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
    batch: '2026–27',
    domain: 'Data Science',
    role: 'Executive Member',
    photo: '',
    linkedin: '',
    github: ''
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
    const success = loginAdmin(selectedRole, passcode);
    if (!success) {
      setLoginError('Invalid Passcode! Use default passcode "nistdsc2026" or "admin123".');
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
      result: 'Cash prize pool worth ₹35,000.'
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
      batch: '2026–27',
      domain: 'Machine Learning',
      role: 'ML Lead',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/aarav-sharma-ml',
      github: 'https://github.com/aarav-sharma'
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
        result: item.result || ''
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
        result: item.result || ''
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
        github: item.github || ''
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
              Admin Portal
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
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                Select Admin Role *
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as AdminRole)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Tech Head">Tech Head</option>
                <option value="Club President">Club President</option>
                <option value="Junior Secretary">Junior Secretary</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                Admin Passcode *
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode (e.g. nistdsc2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg cursor-pointer transition-all"
            >
              Authenticate Admin Access
            </button>
          </form>

          <div className="pt-2 text-[11px] text-slate-500 text-center">
            Authorized roles: Tech Head, Club President, Junior Secretary.
            <br />
            Demo passcode: <code className="text-cyan-400">nistdsc2026</code>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
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
          <span>Exit Admin Session</span>
        </button>
      </div>

      {/* DASHBOARD TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { key: 'events', label: `Events (${events.length})`, icon: Calendar },
          { key: 'sankalp', label: `Sankalp (${sankalpEvents.length})`, icon: Sparkles },
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
                    title: '', year: 2026, date: '', description: '', image: '', venue: '', category: 'Workshop', registration_link: '', result: ''
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
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{e.title}</td>
                    <td className="p-4 font-mono">{e.year}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">{e.category}</span></td>
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
                    title: '', year: 2026, date: '', description: '', image: '', venue: '', registration_link: '', result: ''
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
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {sankalpEvents.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{e.title}</td>
                    <td className="p-4 font-mono font-bold text-purple-400">Sankalp {e.year}</td>
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

      {/* TAB CONTENT 3: ACHIEVEMENTS */}
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
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Team Members & Batches</h2>
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
                    name: '', batch: '2026–27', domain: 'Data Science', role: 'Executive Member', photo: '', linkedin: '', github: ''
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

          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Batch</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {teamMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{m.name}</td>
                    <td className="p-4 font-mono font-bold text-cyan-500">{m.batch}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-semibold">{m.domain}</span></td>
                    <td className="p-4 text-slate-500">{m.role || 'Member'}</td>
                    <td className="p-4 text-right space-x-1">
                      <button onClick={() => handleStartEdit('team', m)} className="p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer" title="Edit Member">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteTeamMember(m.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Delete Member">
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
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700"
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
              {selectedApp.linkedin && <div><strong className="text-slate-400">LinkedIn:</strong> <a href={selectedApp.linkedin} target="_blank" className="text-cyan-400 underline">{selectedApp.linkedin}</a></div>}
              {selectedApp.github && <div><strong className="text-slate-400">GitHub:</strong> <a href={selectedApp.github} target="_blank" className="text-cyan-400 underline">{selectedApp.github}</a></div>}
              {selectedApp.resume_url && <div><strong className="text-slate-400">Resume Link:</strong> <a href={selectedApp.resume_url} target="_blank" className="text-purple-400 underline">{selectedApp.resume_url}</a></div>}
              
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
                updateEvent(editingItem.id, eventForm);
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
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Image URL</label>
                  <input placeholder="Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.image} onChange={e => setEventForm({...eventForm, image: e.target.value})} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Registration Link (Optional)</label>
                  <input placeholder="Registration Link" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.registration_link} onChange={e => setEventForm({...eventForm, registration_link: e.target.value})} />
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
                updateSankalpEvent(editingItem.id, sankalpForm);
                setEditingItem(null);
              }} className="space-y-3 text-xs">
                <input required placeholder="Activity Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.title} onChange={e => setSankalpForm({...sankalpForm, title: e.target.value})} />
                <input type="number" required placeholder="Fest Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.year} onChange={e => setSankalpForm({...sankalpForm, year: Number(e.target.value)})} />
                <input required placeholder="Date String" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.date} onChange={e => setSankalpForm({...sankalpForm, date: e.target.value})} />
                <input required placeholder="Venue" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.venue} onChange={e => setSankalpForm({...sankalpForm, venue: e.target.value})} />
                <textarea required placeholder="Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.description} onChange={e => setSankalpForm({...sankalpForm, description: e.target.value})} />
                <input placeholder="Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.image} onChange={e => setSankalpForm({...sankalpForm, image: e.target.value})} />
                <input placeholder="Registration Link" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.registration_link} onChange={e => setSankalpForm({...sankalpForm, registration_link: e.target.value})} />
                <input placeholder="Result Notes" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.result} onChange={e => setSankalpForm({...sankalpForm, result: e.target.value})} />
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
                <input placeholder="Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.image} onChange={e => setAchievementForm({...achievementForm, image: e.target.value})} />
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
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.batch} onChange={e => setTeamForm({...teamForm, batch: e.target.value})}>
                  <option value="2026–27">2026–27</option>
                  <option value="2025–26">2025–26</option>
                  <option value="2024–25">2024–25</option>
                  <option value="2023–24">2023–24</option>
                  <option value="2022–23">2022–23</option>
                  <option value="2021–22">2021–22</option>
                  <option value="2020–21">2020–21</option>
                </select>
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.domain} onChange={e => setTeamForm({...teamForm, domain: e.target.value as DomainType})}>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="OpenCV">OpenCV</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <input placeholder="Role (e.g. Club President, Tech Head)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} />
                <input required placeholder="Photo URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.photo} onChange={e => setTeamForm({...teamForm, photo: e.target.value})} />
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
                <input required placeholder="Cover Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} />
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
                <input required placeholder="Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.image} onChange={e => setGalleryForm({...galleryForm, image: e.target.value})} />
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
                <input required placeholder="Photo URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.photo} onChange={e => setAdvisorForm({...advisorForm, photo: e.target.value})} />
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
                addEvent(eventForm);
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
                <input required placeholder="Date string (e.g. March 15, 2026)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                <input required placeholder="Venue" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} />
                <textarea required placeholder="Event Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} />
                <input placeholder="Image URL (Unsplash or hosted)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.image} onChange={e => setEventForm({...eventForm, image: e.target.value})} />
                <input placeholder="Registration Link (Optional)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.registration_link} onChange={e => setEventForm({...eventForm, registration_link: e.target.value})} />
                <input placeholder="Result Notes (Optional)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={eventForm.result} onChange={e => setEventForm({...eventForm, result: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Publish Event Card</button>
              </form>
            )}

            {activeTab === 'sankalp' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addSankalpEvent(sankalpForm);
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Activity Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.title} onChange={e => setSankalpForm({...sankalpForm, title: e.target.value})} />
                <input type="number" required placeholder="Fest Year" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.year} onChange={e => setSankalpForm({...sankalpForm, year: Number(e.target.value)})} />
                <input required placeholder="Date String" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.date} onChange={e => setSankalpForm({...sankalpForm, date: e.target.value})} />
                <input required placeholder="Venue" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.venue} onChange={e => setSankalpForm({...sankalpForm, venue: e.target.value})} />
                <textarea required placeholder="Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.description} onChange={e => setSankalpForm({...sankalpForm, description: e.target.value})} />
                <input placeholder="Banner Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.image} onChange={e => setSankalpForm({...sankalpForm, image: e.target.value})} />
                <input placeholder="Registration Link" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.registration_link} onChange={e => setSankalpForm({...sankalpForm, registration_link: e.target.value})} />
                <input placeholder="Result Notes" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={sankalpForm.result} onChange={e => setSankalpForm({...sankalpForm, result: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-bold text-white cursor-pointer hover:bg-purple-500">Publish Sankalp Card</button>
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
                <input placeholder="Image URL (Optional)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={achievementForm.image} onChange={e => setAchievementForm({...achievementForm, image: e.target.value})} />
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
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.batch} onChange={e => setTeamForm({...teamForm, batch: e.target.value})}>
                  <option value="2026–27">2026–27</option>
                  <option value="2025–26">2025–26</option>
                  <option value="2024–25">2024–25</option>
                  <option value="2023–24">2023–24</option>
                  <option value="2022–23">2022–23</option>
                  <option value="2021–22">2021–22</option>
                  <option value="2020–21">2020–21</option>
                </select>
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.domain} onChange={e => setTeamForm({...teamForm, domain: e.target.value as DomainType})}>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="OpenCV">OpenCV</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <input placeholder="Role (e.g. Club President, Tech Head, Member)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} />
                <input required placeholder="Photo URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.photo} onChange={e => setTeamForm({...teamForm, photo: e.target.value})} />
                <input placeholder="LinkedIn Profile URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.linkedin} onChange={e => setTeamForm({...teamForm, linkedin: e.target.value})} />
                <input placeholder="GitHub Profile URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={teamForm.github} onChange={e => setTeamForm({...teamForm, github: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Publish Member Card</button>
              </form>
            )}

            {activeTab === 'projects' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                addProject(projectForm);
                setShowAddModal(false);
              }} className="space-y-3 text-xs">
                <input required placeholder="Project Title" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} />
                <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.domain} onChange={e => setProjectForm({...projectForm, domain: e.target.value as DomainType})}>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="OpenCV">OpenCV</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <textarea required placeholder="Project Description" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                <input required placeholder="Cover Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} />
                <input placeholder="Live Demo URL (Optional)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.project_url} onChange={e => setProjectForm({...projectForm, project_url: e.target.value})} />
                <input placeholder="GitHub URL (Optional)" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={projectForm.github_url} onChange={e => setProjectForm({...projectForm, github_url: e.target.value})} />
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
                <input required placeholder="Image URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={galleryForm.image} onChange={e => setGalleryForm({...galleryForm, image: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-bold text-white cursor-pointer hover:bg-purple-500">Publish Gallery Card</button>
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
                <input required placeholder="Photo URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.photo} onChange={e => setAdvisorForm({...advisorForm, photo: e.target.value})} />
                <input placeholder="LinkedIn Profile URL" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.linkedin} onChange={e => setAdvisorForm({...advisorForm, linkedin: e.target.value})} />
                <input placeholder="Email" className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={advisorForm.email} onChange={e => setAdvisorForm({...advisorForm, email: e.target.value})} />
                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 font-bold text-white cursor-pointer hover:bg-cyan-500">Publish Advisor Card</button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
