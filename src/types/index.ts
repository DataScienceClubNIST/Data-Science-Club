export type DomainType = 
  | 'Data Science'
  | 'Machine Learning'
  | 'Deep Learning'
  | 'OpenCV'
  | 'Web Development';

export type EventStatus = 'Coming soon...' | 'Register Now' | 'Registration Closed';

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
  contest_link?: string;
  result?: string;
  status?: EventStatus;
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
  contest_link?: string;
  result?: string;
  status?: EventStatus;
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
  batch: string; // e.g., '2025', '2024', '2023', '2022', '2021', '2020'
  domain: DomainType;
  role?: string;
  photo: string;
  bio?: string;
  is_alumni?: boolean;
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

export type EligibleYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'MCA / PG' | 'Other' | string;

export interface TeamMemberDetail {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  roll: string;
  stream_branch: string;
  year: EligibleYear;
}

export interface Idea2OdishiRegistration {
  id: string; // Sequential ID: I2O001, I2O002, etc.
  submitted_at: string;
  participation_type: 'Solo' | 'Team';

  // Team & Leader Information
  team_name?: string;
  leader_name?: string;
  leader_email?: string;
  leader_phone?: string;
  leader_roll?: string;
  leader_stream_branch?: string;
  leader_year?: EligibleYear;

  // Team Member 2 (1 or 2 members total)
  team_members?: TeamMemberDetail[];
  member2_name?: string;
  member2_email?: string;
  member2_roll?: string;
  member2_stream_branch?: string;
  member2_year?: EligibleYear;
  member2_phone?: string;

  // Idea Information
  idea_title?: string;
  category?: string;
  problem_statement: string;
  proposed_solution?: string;
  short_description?: string;

  // Google Drive PPT Upload
  drive_uploaded?: boolean;
  drive_file_name?: string;
  drive_folder_url?: string;
  ppt_filename?: string;
  ppt_url?: string;
  ppt_filesize?: number;

  // WhatsApp Group Confirmation
  whatsapp_joined?: boolean;

  // Legacy / Backward Compatibility fields:
  name?: string;
  roll?: string;
  stream_branch?: string;
  year?: EligibleYear;
  phone?: string;
}

export interface CodeArenaRegistration {
  id: string;
  submitted_at: string;
  name: string;
  roll: string;
  year: EligibleYear;
  phone: string;
  stream_branch: string;
  email: string;
}
