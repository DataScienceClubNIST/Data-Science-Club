'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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

export interface DbStatus {
  isConfigured: boolean;
  isConnected: boolean | null; // null = checking, true = connected, false = error/offline
  message: string;
  errorDetail?: string | null;
  lastSyncTime?: string | null;
}

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
  dbStatus: DbStatus;
  refreshConnection: () => Promise<DbStatus>;

  // Admin Actions
  loginAdmin: (username: string, passcode: string) => boolean;
  logoutAdmin: () => void;
  
  // CRUD Actions
  addEvent: (event: Omit<ClubEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<ClubEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  addSankalpEvent: (event: Omit<SankalpEvent, 'id'>) => Promise<void>;
  updateSankalpEvent: (id: string, event: Partial<SankalpEvent>) => Promise<void>;
  deleteSankalpEvent: (id: string) => Promise<void>;

  addAchievement: (achievement: Omit<Achievement, 'id'>) => Promise<void>;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;

  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  updateBatchAlumniStatus: (batchYear: string, isAlumni: boolean) => Promise<void>;
  alumniBatches: string[];
  toggleAlumniBatch: (batchYear: string, isAlumni: boolean) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  addAdvisor: (advisor: Omit<Advisor, 'id'>) => Promise<void>;
  updateAdvisor: (id: string, advisor: Partial<Advisor>) => Promise<void>;
  deleteAdvisor: (id: string) => Promise<void>;

  toggleRecruitment: (isOpen: boolean) => Promise<void>;
  updateRecruitmentSettings: (settings: Partial<RecruitmentSettings>) => Promise<void>;
  submitApplication: (app: Omit<RecruitmentApplication, 'id' | 'submitted_at' | 'status'>) => Promise<boolean>;
  deleteApplication: (id: string) => Promise<void>;
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
  const [alumniBatches, setAlumniBatches] = useState<string[]>(['2020', '2021', '2022', '2023']);

  const [dbStatus, setDbStatus] = useState<DbStatus>({
    isConfigured: isSupabaseConfigured,
    isConnected: isSupabaseConfigured ? null : false,
    message: isSupabaseConfigured 
      ? 'Connecting to Supabase Database...' 
      : 'Supabase credentials missing in .env.local — using browser cache fallback mode.',
    errorDetail: isSupabaseConfigured 
      ? null 
      : 'Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to connect to Supabase.'
  });

  // Save changes to localStorage helper
  const saveStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }
  };

  // Connection Checker Function
  const checkConnection = useCallback(async (): Promise<DbStatus> => {
    if (!isSupabaseConfigured || !supabase) {
      const status: DbStatus = {
        isConfigured: false,
        isConnected: false,
        message: 'Supabase credentials are not configured in environment variables.',
        errorDetail: 'Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file or host environment.'
      };
      setDbStatus(status);
      return status;
    }

    try {
      // Perform test ping to events table
      const { error } = await supabase.from('events').select('id', { count: 'exact', head: true });
      if (error) {
        const status: DbStatus = {
          isConfigured: true,
          isConnected: false,
          message: `Database connection error: ${error.message}`,
          errorDetail: `[Error Code ${error.code}] ${error.details || error.hint || 'Make sure tables & RLS policies in supabase_schema.sql are applied.'}`
        };
        setDbStatus(status);
        return status;
      } else {
        const status: DbStatus = {
          isConfigured: true,
          isConnected: true,
          message: 'Connected to Supabase Database',
          errorDetail: null,
          lastSyncTime: new Date().toLocaleTimeString()
        };
        setDbStatus(status);
        return status;
      }
    } catch (err: any) {
      const status: DbStatus = {
        isConfigured: true,
        isConnected: false,
        message: 'Network error reaching Supabase backend',
        errorDetail: err?.message || 'Check network connection or Supabase URL.'
      };
      setDbStatus(status);
      return status;
    }
  }, []);

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
      const storedAlumniBatches = localStorage.getItem('dsc_alumni_batches');

      // 1. Initial Local / Default Fallback state
      setEvents(storedEvents ? JSON.parse(storedEvents) : INITIAL_EVENTS);
      setSankalpEvents(storedSankalp ? JSON.parse(storedSankalp) : INITIAL_SANKALP_EVENTS);
      setAchievements(storedAchievements ? JSON.parse(storedAchievements) : INITIAL_ACHIEVEMENTS);
      setAdvisors(storedAdvisors ? JSON.parse(storedAdvisors) : INITIAL_ADVISORS);
      setTeamMembers(storedTeam ? JSON.parse(storedTeam) : INITIAL_TEAM_MEMBERS);
      setProjects(storedProjects ? JSON.parse(storedProjects) : INITIAL_PROJECTS);
      setGallery(storedGallery ? JSON.parse(storedGallery) : INITIAL_GALLERY);
      setRecruitmentSettings(storedRecSettings ? JSON.parse(storedRecSettings) : INITIAL_RECRUITMENT_SETTINGS);
      setApplications(storedApps ? JSON.parse(storedApps) : INITIAL_APPLICATIONS);
      if (storedAlumniBatches) {
        setAlumniBatches(JSON.parse(storedAlumniBatches));
      }

      if (storedAdmin) {
        setAdminUser(JSON.parse(storedAdmin));
      }

      // 2. Fetch live records from Supabase Database if configured
      if (isSupabaseConfigured && supabase) {
        try {
          const [
            { data: eventsData, error: eventsErr },
            { data: sankalpData, error: sankalpErr },
            { data: achData, error: achErr },
            { data: advData, error: advErr },
            { data: teamData, error: teamErr },
            { data: projData, error: projErr },
            { data: galData, error: galErr },
            { data: recData, error: recErr },
            { data: appData, error: appErr }
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

          const errors = [eventsErr, sankalpErr, achErr, advErr, teamErr, projErr, galErr, recErr, appErr].filter(Boolean);

          if (errors.length > 0) {
            const firstErr = errors[0];
            console.error('[Supabase Fetch Error]:', firstErr);
            setDbStatus({
              isConfigured: true,
              isConnected: false,
              message: `Supabase database error: ${firstErr?.message}`,
              errorDetail: `Code: ${firstErr?.code} — ${firstErr?.details || firstErr?.hint || 'Check table schemas and RLS permissions in Supabase.'}`
            });
          } else {
            setDbStatus({
              isConfigured: true,
              isConnected: true,
              message: 'Supabase Database Connected & Synced',
              errorDetail: null,
              lastSyncTime: new Date().toLocaleTimeString()
            });

            // Update state & sync to localStorage so browser cache stays updated
            if (eventsData) { setEvents(eventsData); saveStorage('dsc_events', eventsData); }
            if (sankalpData) { setSankalpEvents(sankalpData); saveStorage('dsc_sankalp', sankalpData); }
            if (achData) { setAchievements(achData); saveStorage('dsc_achievements', achData); }
            if (advData) { setAdvisors(advData); saveStorage('dsc_advisors', advData); }
            if (teamData) { setTeamMembers(teamData); saveStorage('dsc_team', teamData); }
            if (projData) { setProjects(projData); saveStorage('dsc_projects', projData); }
            if (galData) { setGallery(galData); saveStorage('dsc_gallery', galData); }
            if (recData && recData.length > 0) { setRecruitmentSettings(recData[0]); saveStorage('dsc_rec_settings', recData[0]); }
            if (appData) { setApplications(appData); saveStorage('dsc_applications', appData); }
          }
        } catch (e: any) {
          console.warn('[Supabase Sync]: Failed to fetch remote database data, using local fallback.', e);
          setDbStatus({
            isConfigured: true,
            isConnected: false,
            message: 'Failed to sync with Supabase database',
            errorDetail: e?.message || 'Network exception'
          });
        }
      }
    };

    loadData();
  }, [checkConnection]);

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

  // Helper to handle Supabase DB errors during mutations
  const handleMutationError = (tableName: string, error: any) => {
    console.error(`[Supabase Error] ${tableName}:`, error);
    const detailMsg = `[Code ${error.code}] ${error.message} — ${error.details || error.hint || ''}`;
    setDbStatus(prev => ({
      ...prev,
      isConnected: false,
      message: `Failed to save changes to database (${tableName})`,
      errorDetail: detailMsg
    }));
    throw new Error(`Database save failed: ${error.message}`);
  };

  // Events CRUD
  const addEvent = async (eventData: Omit<ClubEvent, 'id'>) => {
    const newEvent: ClubEvent = { ...eventData, id: `evt-${Date.now()}` };
    const updated = [newEvent, ...events];
    setEvents(updated);
    saveStorage('dsc_events', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('events').insert([newEvent]);
      if (error) handleMutationError('events', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateEvent = async (id: string, eventData: Partial<ClubEvent>) => {
    const updated = events.map(e => e.id === id ? { ...e, ...eventData } : e);
    setEvents(updated);
    saveStorage('dsc_events', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('events').update(eventData).eq('id', id);
      if (error) handleMutationError('events', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const deleteEvent = async (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    saveStorage('dsc_events', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) handleMutationError('events', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  // Sankalp CRUD
  const addSankalpEvent = async (eventData: Omit<SankalpEvent, 'id'>) => {
    const newEvent: SankalpEvent = { ...eventData, id: `snk-${Date.now()}` };
    const updated = [newEvent, ...sankalpEvents];
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('sankalp_events').insert([newEvent]);
      if (error) handleMutationError('sankalp_events', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateSankalpEvent = async (id: string, eventData: Partial<SankalpEvent>) => {
    const updated = sankalpEvents.map(e => e.id === id ? { ...e, ...eventData } : e);
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('sankalp_events').update(eventData).eq('id', id);
      if (error) handleMutationError('sankalp_events', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const deleteSankalpEvent = async (id: string) => {
    const updated = sankalpEvents.filter(e => e.id !== id);
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('sankalp_events').delete().eq('id', id);
      if (error) handleMutationError('sankalp_events', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  // Achievements CRUD
  const addAchievement = async (data: Omit<Achievement, 'id'>) => {
    const newItem: Achievement = { ...data, id: `ach-${Date.now()}` };
    const updated = [newItem, ...achievements];
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('achievements').insert([newItem]);
      if (error) handleMutationError('achievements', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateAchievement = async (id: string, data: Partial<Achievement>) => {
    const updated = achievements.map(a => a.id === id ? { ...a, ...data } : a);
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('achievements').update(data).eq('id', id);
      if (error) handleMutationError('achievements', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const deleteAchievement = async (id: string) => {
    const updated = achievements.filter(a => a.id !== id);
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('achievements').delete().eq('id', id);
      if (error) handleMutationError('achievements', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  // Team CRUD
  const addTeamMember = async (data: Omit<TeamMember, 'id'>) => {
    const newItem: TeamMember = { ...data, id: `tm-${Date.now()}` };
    const updated = [newItem, ...teamMembers];
    setTeamMembers(updated);
    saveStorage('dsc_team', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('team_members').insert([newItem]);
      if (error) handleMutationError('team_members', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateTeamMember = async (id: string, data: Partial<TeamMember>) => {
    setTeamMembers(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, ...data } : t);
      saveStorage('dsc_team', updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('team_members').update(data).eq('id', id);
      if (error) handleMutationError('team_members', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const toggleAlumniBatch = async (batchYear: string, isAlumni: boolean) => {
    setAlumniBatches(prev => {
      const updated = isAlumni
        ? (prev.includes(batchYear) ? prev : [...prev, batchYear])
        : prev.filter(b => b !== batchYear);
      saveStorage('dsc_alumni_batches', updated);
      return updated;
    });

    setTeamMembers(prev => {
      const updated = prev.map(m => {
        const isMatch = m.batch === batchYear || (m.batch && m.batch.startsWith(batchYear));
        return isMatch ? { ...m, is_alumni: isAlumni } : m;
      });
      saveStorage('dsc_team', updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      const targetIds = teamMembers
        .filter(m => m.batch === batchYear || (m.batch && m.batch.startsWith(batchYear)))
        .map(m => m.id);

      if (targetIds.length > 0) {
        const { error } = await supabase
          .from('team_members')
          .update({ is_alumni: isAlumni })
          .in('id', targetIds);

        if (error) handleMutationError('team_members', error);
        else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
      }
    }
  };

  const updateBatchAlumniStatus = toggleAlumniBatch;

  const deleteTeamMember = async (id: string) => {
    setTeamMembers(prev => {
      const updated = prev.filter(t => t.id !== id);
      saveStorage('dsc_team', updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) handleMutationError('team_members', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  // Projects CRUD
  const addProject = async (data: Omit<Project, 'id'>) => {
    const newItem: Project = { ...data, id: `proj-${Date.now()}` };
    const updated = [newItem, ...projects];
    setProjects(updated);
    saveStorage('dsc_projects', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').insert([newItem]);
      if (error) handleMutationError('projects', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...data } : p);
    setProjects(updated);
    saveStorage('dsc_projects', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').update(data).eq('id', id);
      if (error) handleMutationError('projects', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveStorage('dsc_projects', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) handleMutationError('projects', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  // Gallery CRUD
  const addGalleryItem = async (data: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...data, id: `gal-${Date.now()}` };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveStorage('dsc_gallery', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('gallery').insert([newItem]);
      if (error) handleMutationError('gallery', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateGalleryItem = async (id: string, data: Partial<GalleryItem>) => {
    const updated = gallery.map(g => g.id === id ? { ...g, ...data } : g);
    setGallery(updated);
    saveStorage('dsc_gallery', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('gallery').update(data).eq('id', id);
      if (error) handleMutationError('gallery', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const deleteGalleryItem = async (id: string) => {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    saveStorage('dsc_gallery', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) handleMutationError('gallery', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  // Advisor CRUD
  const addAdvisor = async (data: Omit<Advisor, 'id'>) => {
    const newItem: Advisor = { ...data, id: `adv-${Date.now()}` };
    const updated = [...advisors, newItem];
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('advisors').insert([newItem]);
      if (error) handleMutationError('advisors', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateAdvisor = async (id: string, data: Partial<Advisor>) => {
    const updated = advisors.map(a => a.id === id ? { ...a, ...data } : a);
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('advisors').update(data).eq('id', id);
      if (error) handleMutationError('advisors', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const deleteAdvisor = async (id: string) => {
    const updated = advisors.filter(a => a.id !== id);
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('advisors').delete().eq('id', id);
      if (error) handleMutationError('advisors', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  // Recruitment actions
  const toggleRecruitment = async (isOpen: boolean) => {
    const updated = { ...recruitmentSettings, is_open: isOpen };
    setRecruitmentSettings(updated);
    saveStorage('dsc_rec_settings', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('recruitment_settings').upsert([{ id: 1, ...updated }]);
      if (error) handleMutationError('recruitment_settings', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
    }
  };

  const updateRecruitmentSettings = async (settings: Partial<RecruitmentSettings>) => {
    const updated = { ...recruitmentSettings, ...settings };
    setRecruitmentSettings(updated);
    saveStorage('dsc_rec_settings', updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('recruitment_settings').upsert([{ id: 1, ...updated }]);
      if (error) handleMutationError('recruitment_settings', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
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
      const { error } = await supabase.from('recruitment_applications').insert([newApp]);
      if (error) {
        console.warn('Supabase application insert note:', error.message);
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
      const { error } = await supabase.from('recruitment_applications').delete().eq('id', id);
      if (error) handleMutationError('recruitment_applications', error);
      else setDbStatus(prev => ({ ...prev, isConnected: true, errorDetail: null, lastSyncTime: new Date().toLocaleTimeString() }));
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
        dbStatus,
        refreshConnection: checkConnection,
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
