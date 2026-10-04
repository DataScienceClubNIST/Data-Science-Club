export type DomainType = 
  | 'Data Science'
  | 'Machine Learning'
  | 'Deep Learning'
  | 'OpenCV'
  | 'Web Development';

export interface ClubEvent {
  id: string;
  title: string;
  year: number;
  date: string;
  description: string;
  image: string;
  venue: string;
  category: 'Workshop' | 'Competition' | 'Hackathon' | 'Tech Talk' | 'Seminar';
  registration_link?: string;
  result?: string;
}

export interface SankalpEvent {
  id: string;
  title: string;
  year: number;
  date: string;
  description: string;
  image: string;
  venue: string;
  registration_link?: string;
  result?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  category: 'Competition Win' | 'Hackathon Position' | 'Project Award' | 'Recognition';
  image?: string;
}

export interface Advisor {
  id: string;
  name: string;
  role: 'Advisor' | 'Co-Advisor';
  designation: string;
  department: string;
  bio: string;
  photo: string;
  linkedin?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  batch: string; // e.g., '2026–27', '2025–26', '2024–25', '2023–24', '2022–23', '2021–22', '2020–21'
  domain: DomainType;
  role?: string;
  photo: string;
  linkedin?: string;
  github?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  domain: DomainType;
  project_url?: string;
  github_url?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: 'Events' | 'Sankalp' | 'Team' | 'Workshops' | 'Projects';
  year: number;
}

export interface RecruitmentSettings {
  is_open: boolean;
  year: number;
  opening_date: string;
  closing_date: string;
  announcement_note?: string;
}

export interface RecruitmentApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  department: string;
  batch: string;
  primary_domain: DomainType;
  secondary_domain: DomainType;
  skills: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  motivation: string;
  resume_url?: string;
  submitted_at: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
}

export type AdminRole = 'Tech Head' | 'Club President' | 'Junior Secretary';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}
