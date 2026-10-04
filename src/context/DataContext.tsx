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

  // Initialize data from LocalStorage / Supabase
  useEffect(() => {
    const loadData = () => {
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
  const addEvent = (eventData: Omit<ClubEvent, 'id'>) => {
    const newEvent: ClubEvent = { ...eventData, id: `evt-${Date.now()}` };
    const updated = [newEvent, ...events];
    setEvents(updated);
    saveStorage('dsc_events', updated);
  };

  const updateEvent = (id: string, eventData: Partial<ClubEvent>) => {
    const updated = events.map(e => e.id === id ? { ...e, ...eventData } : e);
    setEvents(updated);
    saveStorage('dsc_events', updated);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    saveStorage('dsc_events', updated);
  };

  // Sankalp CRUD
  const addSankalpEvent = (eventData: Omit<SankalpEvent, 'id'>) => {
    const newEvent: SankalpEvent = { ...eventData, id: `snk-${Date.now()}` };
    const updated = [newEvent, ...sankalpEvents];
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);
  };

  const updateSankalpEvent = (id: string, eventData: Partial<SankalpEvent>) => {
    const updated = sankalpEvents.map(e => e.id === id ? { ...e, ...eventData } : e);
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);
  };

  const deleteSankalpEvent = (id: string) => {
    const updated = sankalpEvents.filter(e => e.id !== id);
    setSankalpEvents(updated);
    saveStorage('dsc_sankalp', updated);
  };

  // Achievements CRUD
  const addAchievement = (data: Omit<Achievement, 'id'>) => {
    const newItem: Achievement = { ...data, id: `ach-${Date.now()}` };
    const updated = [newItem, ...achievements];
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);
  };

  const updateAchievement = (id: string, data: Partial<Achievement>) => {
    const updated = achievements.map(a => a.id === id ? { ...a, ...data } : a);
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);
  };

  const deleteAchievement = (id: string) => {
    const updated = achievements.filter(a => a.id !== id);
    setAchievements(updated);
    saveStorage('dsc_achievements', updated);
  };

  // Team CRUD
  const addTeamMember = (data: Omit<TeamMember, 'id'>) => {
    const newItem: TeamMember = { ...data, id: `tm-${Date.now()}` };
    const updated = [newItem, ...teamMembers];
    setTeamMembers(updated);
    saveStorage('dsc_team', updated);
  };

  const updateTeamMember = (id: string, data: Partial<TeamMember>) => {
    const updated = teamMembers.map(t => t.id === id ? { ...t, ...data } : t);
    setTeamMembers(updated);
    saveStorage('dsc_team', updated);
  };

  const deleteTeamMember = (id: string) => {
    const updated = teamMembers.filter(t => t.id !== id);
    setTeamMembers(updated);
    saveStorage('dsc_team', updated);
  };

  // Projects CRUD
  const addProject = (data: Omit<Project, 'id'>) => {
    const newItem: Project = { ...data, id: `proj-${Date.now()}` };
    const updated = [newItem, ...projects];
    setProjects(updated);
    saveStorage('dsc_projects', updated);
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...data } : p);
    setProjects(updated);
    saveStorage('dsc_projects', updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveStorage('dsc_projects', updated);
  };

  // Gallery CRUD
  const addGalleryItem = (data: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...data, id: `gal-${Date.now()}` };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveStorage('dsc_gallery', updated);
  };

  const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => {
    const updated = gallery.map(g => g.id === id ? { ...g, ...data } : g);
    setGallery(updated);
    saveStorage('dsc_gallery', updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    saveStorage('dsc_gallery', updated);
  };

  // Advisor CRUD
  const addAdvisor = (data: Omit<Advisor, 'id'>) => {
    const newItem: Advisor = { ...data, id: `adv-${Date.now()}` };
    const updated = [...advisors, newItem];
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);
  };

  const updateAdvisor = (id: string, data: Partial<Advisor>) => {
    const updated = advisors.map(a => a.id === id ? { ...a, ...data } : a);
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);
  };

  const deleteAdvisor = (id: string) => {
    const updated = advisors.filter(a => a.id !== id);
    setAdvisors(updated);
    saveStorage('dsc_advisors', updated);
  };

  // Recruitment actions
  const toggleRecruitment = (isOpen: boolean) => {
    const updated = { ...recruitmentSettings, is_open: isOpen };
    setRecruitmentSettings(updated);
    saveStorage('dsc_rec_settings', updated);
  };

  const updateRecruitmentSettings = (settings: Partial<RecruitmentSettings>) => {
    const updated = { ...recruitmentSettings, ...settings };
    setRecruitmentSettings(updated);
    saveStorage('dsc_rec_settings', updated);
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

  const deleteApplication = (id: string) => {
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated);
    saveStorage('dsc_applications', updated);
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
