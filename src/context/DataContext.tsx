'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  ClubEvent, 
  SankalpEvent, 
  Achievement, 
  Advisor, 
  TeamMember, 
  Project, 
  GalleryItem, 
  RecruitmentSettings, 
  RecruitmentApplication, 
  AdminUser 
} from '@/types';
import { 
  INITIAL_EVENTS, 
  INITIAL_SANKALP_EVENTS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_ADVISORS, 
  INITIAL_TEAM_MEMBERS, 
  INITIAL_PROJECTS, 
  INITIAL_GALLERY, 
  INITIAL_RECRUITMENT_SETTINGS, 
  INITIAL_APPLICATIONS 
} from '@/lib/initialData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface DataContextType {
  events: ClubEvent[];
  sankalpEvents: SankalpEvent[];
  achievements: Achievement[];
  advisors: Advisor[];
  teamMembers: TeamMember[];
  projects: Project[];
  gallery: GalleryItem[];
  recruitmentSettings: RecruitmentSettings;
  applications: RecruitmentApplication[];
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;

  // Admin Actions
  loginAdmin: (username: string, passcode: string) => boolean;
  logoutAdmin: () => void;
  
  // CRUD Actions
  addEvent: (event: Omit<ClubEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<ClubEvent>) => void;
  deleteEvent: (id: string) => void;

  addSankalpEvent: (event: Omit<SankalpEvent, 'id'>) => void;
  updateSankalpEvent: (id: string, event: Partial<SankalpEvent>) => void;
  deleteSankalpEvent: (id: string) => void;

  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;

  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  addAdvisor: (advisor: Omit<Advisor, 'id'>) => void;
  updateAdvisor: (id: string, advisor: Partial<Advisor>) => void;
  deleteAdvisor: (id: string) => void;

  toggleRecruitment: (isOpen: boolean) => void;
  updateRecruitmentSettings: (settings: Partial<RecruitmentSettings>) => void;
  submitApplication: (app: Omit<RecruitmentApplication, 'id' | 'submitted_at' | 'status'>) => Promise<boolean>;
  deleteApplication: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [sankalpEvents, setSankalpEvents] = useState<SankalpEvent[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [recruitmentSettings, setRecruitmentSettings] = useState<RecruitmentSettings>(INITIAL_RECRUITMENT_SETTINGS);
  const [applications, setApplications] = useState<RecruitmentApplication[]>([]);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Initialize data from LocalStorage & Supabase
  useEffect(() => {
    const loadData = async () => {
      const storedEvents = localStorage.getItem('dsc_events');
      const storedSankalp = localStorage.getItem('dsc_sankalp');
      const storedAchievements = localStorage.getItem('dsc_achievements');
      const storedAdvisors = localStorage.getItem('dsc_advisors');
      const storedTeam = localStorage.getItem('dsc_team');
      const storedProjects = localStorage.getItem('dsc_projects');
      const storedGallery = localStorage.getItem('dsc_gallery');
      const storedRecSettings = localStorage.getItem('dsc_rec_settings');
      const storedApps = localStorage.getItem('dsc_applications');
      const storedAdmin = localStorage.getItem('dsc_admin_session');

      // Default local state
      setEvents(storedEvents ? JSON.parse(storedEvents) : INITIAL_EVENTS);
      setSankalpEvents(storedSankalp ? JSON.parse(storedSankalp) : INITIAL_SANKALP_EVENTS);
      setAchievements(storedAchievements ? JSON.parse(storedAchievements) : INITIAL_ACHIEVEMENTS);
      setAdvisors(storedAdvisors ? JSON.parse(storedAdvisors) : INITIAL_ADVISORS);
      setTeamMembers(storedTeam ? JSON.parse(storedTeam) : INITIAL_TEAM_MEMBERS);
      setProjects(storedProjects ? JSON.parse(storedProjects) : INITIAL_PROJECTS);
      setGallery(storedGallery ? JSON.parse(storedGallery) : INITIAL_GALLERY);
      setRecruitmentSettings(storedRecSettings ? JSON.parse(storedRecSettings) : INITIAL_RECRUITMENT_SETTINGS);
      setApplications(storedApps ? JSON.parse(storedApps) : INITIAL_APPLICATIONS);

      if (storedAdmin) {
        setAdminUser(JSON.parse(storedAdmin));
      }

      // Fetch live records from Supabase Database if configured
      if (isSupabaseConfigured && supabase) {
        try {
          const [
            { data: eventsData },
            { data: sankalpData },
            { data: achData },
            { data: advData },
            { data: teamData },
            { data: projData },
            { data: galData },
            { data: recData },
            { data: appData }
          ] = await Promise.all([
            supabase.from('events').select('*').order('created_at', { ascending: false }),
            supabase.from('sankalp_events').select('*').order('created_at', { ascending: false }),
            supabase.from('achievements').select('*').order('created_at', { ascending: false }),
            supabase.from('advisors').select('*'),
            supabase.from('team_members').select('*'),
            supabase.from('projects').select('*'),
            supabase.from('gallery').select('*'),
            supabase.from('recruitment_settings').select('*').limit(1),
            supabase.from('recruitment_applications').select('*').order('submitted_at', { ascending: false })
          ]);

          if (eventsData && eventsData.length > 0) setEvents(eventsData);
          if (sankalpData && sankalpData.length > 0) setSankalpEvents(sankalpData);
          if (achData && achData.length > 0) setAchievements(achData);
          if (advData && advData.length > 0) setAdvisors(advData);
          if (teamData && teamData.length > 0) setTeamMembers(teamData);
          if (projData && projData.length > 0) setProjects(projData);
          if (galData && galData.length > 0) setGallery(galData);
          if (recData && recData.length > 0) setRecruitmentSettings(recData[0]);
          if (appData && appData.length > 0) setApplications(appData);
        } catch (e) {
          console.warn('[Supabase Sync]: Failed to fetch remote database data, using local fallback.', e);
        }
      }
    };

    loadData();
  }, []);

  // Save changes to localStorage helper
  const saveStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Auth actions
  const loginAdmin = (username: string, passcode: string) => {
    if (username.trim() === 'DSCPresident' && passcode.trim() === 'DSCPresident@1') {
      const user: AdminUser = {
        id: `admin-president`,
        name: `Club President`,
        email: `dscpresident@nist.edu`,
        role: 'Club President'
      };
      setAdminUser(user);
      saveStorage('dsc_admin_session', user);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('dsc_admin_session');
  };

  // Events CRUD
  const addEvent = async (eventData: Omit<ClubEvent, 'id'>) => {
    const newEvent: ClubEvent = { ...eventData, id: `evt-${Date.now()}` };
    const updated = [newEvent, ...events];
    setEvents(updated);
    saveStorage('dsc_events', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('events').insert([newEvent]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateEvent = async (id: string, eventData: Partial<ClubEvent>) => {
    const updated = events.map(e => e.id === id ? { ...e, ...eventData } : e);
    setEvents(updated);
    saveStorage('dsc_events', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('events').update(eventData).eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const deleteEvent = async (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    saveStorage('dsc_events', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('events').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  // Sankalp CRUD
  const addSankalpEvent = async (eventData: Omit<SankalpEvent, 'id'>) => {
    const newEvent: SankalpEvent = { ...eventData, id: `snk-${Date.now()}` };
    const updated = [newEvent, ...sankalpEvents];
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('sankalp_events').insert([newEvent]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateSankalpEvent = async (id: string, eventData: Partial<SankalpEvent>) => {
    const updated = sankalpEvents.map(e => e.id === id ? { ...e, ...eventData } : e);
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('sankalp_events').update(eventData).eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const deleteSankalpEvent = async (id: string) => {
    const updated = sankalpEvents.filter(e => e.id !== id);
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('sankalp_events').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  // Achievements CRUD
  const addAchievement = async (data: Omit<Achievement, 'id'>) => {
    const newItem: Achievement = { ...data, id: `ach-${Date.now()}` };
    const updated = [newItem, ...achievements];
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('achievements').insert([newItem]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateAchievement = async (id: string, data: Partial<Achievement>) => {
    const updated = achievements.map(a => a.id === id ? { ...a, ...data } : a);
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('achievements').update(data).eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const deleteAchievement = async (id: string) => {
    const updated = achievements.filter(a => a.id !== id);
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('achievements').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  // Team CRUD
  const addTeamMember = async (data: Omit<TeamMember, 'id'>) => {
    const newItem: TeamMember = { ...data, id: `tm-${Date.now()}` };
    const updated = [newItem, ...teamMembers];
    setTeamMembers(updated);
    saveStorage('dsc_team', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').insert([newItem]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateTeamMember = async (id: string, data: Partial<TeamMember>) => {
    const updated = teamMembers.map(t => t.id === id ? { ...t, ...data } : t);
    setTeamMembers(updated);
    saveStorage('dsc_team', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').update(data).eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const deleteTeamMember = async (id: string) => {
    const updated = teamMembers.filter(t => t.id !== id);
    setTeamMembers(updated);
    saveStorage('dsc_team', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  // Projects CRUD
  const addProject = async (data: Omit<Project, 'id'>) => {
    const newItem: Project = { ...data, id: `proj-${Date.now()}` };
    const updated = [newItem, ...projects];
    setProjects(updated);
    saveStorage('dsc_projects', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').insert([newItem]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...data } : p);
    setProjects(updated);
    saveStorage('dsc_projects', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').update(data).eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveStorage('dsc_projects', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  // Gallery CRUD
  const addGalleryItem = async (data: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...data, id: `gal-${Date.now()}` };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveStorage('dsc_gallery', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('gallery').insert([newItem]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateGalleryItem = async (id: string, data: Partial<GalleryItem>) => {
    const updated = gallery.map(g => g.id === id ? { ...g, ...data } : g);
    setGallery(updated);
    saveStorage('dsc_gallery', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('gallery').update(data).eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const deleteGalleryItem = async (id: string) => {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    saveStorage('dsc_gallery', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('gallery').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  // Advisor CRUD
  const addAdvisor = async (data: Omit<Advisor, 'id'>) => {
    const newItem: Advisor = { ...data, id: `adv-${Date.now()}` };
    const updated = [...advisors, newItem];
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('advisors').insert([newItem]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateAdvisor = async (id: string, data: Partial<Advisor>) => {
    const updated = advisors.map(a => a.id === id ? { ...a, ...data } : a);
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('advisors').update(data).eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const deleteAdvisor = async (id: string) => {
    const updated = advisors.filter(a => a.id !== id);
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('advisors').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  // Recruitment actions
  const toggleRecruitment = async (isOpen: boolean) => {
    const updated = { ...recruitmentSettings, is_open: isOpen };
    setRecruitmentSettings(updated);
    saveStorage('dsc_rec_settings', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('recruitment_settings').upsert([{ id: 1, ...updated }]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const updateRecruitmentSettings = async (settings: Partial<RecruitmentSettings>) => {
    const updated = { ...recruitmentSettings, ...settings };
    setRecruitmentSettings(updated);
    saveStorage('dsc_rec_settings', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('recruitment_settings').upsert([{ id: 1, ...updated }]);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  const submitApplication = async (data: Omit<RecruitmentApplication, 'id' | 'submitted_at' | 'status'>): Promise<boolean> => {
    const newApp: RecruitmentApplication = {
      ...data,
      id: `app-${Date.now()}`,
      submitted_at: new Date().toISOString(),
      status: 'Pending'
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('recruitment_applications').insert([newApp]);
        if (error) console.warn('Supabase insert note:', error.message);
      } catch (e) {
        console.warn('Supabase offline mode, fallback to local storage');
      }
    }

    const updated = [newApp, ...applications];
    setApplications(updated);
    saveStorage('dsc_applications', updated);
    return true;
  };

  const deleteApplication = async (id: string) => {
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated);
    saveStorage('dsc_applications', updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('recruitment_applications').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase sync note:', e);
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        events,
        sankalpEvents,
        achievements,
        advisors,
        teamMembers,
        projects,
        gallery,
        recruitmentSettings,
        applications,
        adminUser,
        isAdminLoggedIn: Boolean(adminUser),
        loginAdmin,
        logoutAdmin,
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
        updateRecruitmentSettings,
        submitApplication,
        deleteApplication
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
