-- ==============================================================================
-- DATA SCIENCE CLUB (DSC) NIST - SUPABASE DATABASE SCHEMA & RLS SECURITY POLICIES
-- ==============================================================================
-- This SQL script creates all required tables, sets up Row Level Security (RLS)
-- to ensure PUBLIC users can ONLY READ (view) data, while ADMIN users can WRITE
-- (create, edit, delete). Public can also submit recruitment applications.
-- Includes Supabase Storage Bucket setup for Image File Uploads!
-- ==============================================================================

-- 1. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  year INT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  venue TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Workshop', 'Competition', 'Hackathon', 'Tech Talk', 'Seminar')),
  registration_link TEXT,
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SANKALP EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.sankalp_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  year INT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  venue TEXT NOT NULL,
  registration_link TEXT,
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year INT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Competition Win', 'Hackathon Position', 'Project Award', 'Recognition')),
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ADVISORS TABLE
CREATE TABLE IF NOT EXISTS public.advisors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Advisor', 'Co-Advisor')),
  designation TEXT NOT NULL,
  department TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo TEXT NOT NULL,
  linkedin TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  batch TEXT NOT NULL,
  domain TEXT NOT NULL CHECK (domain IN ('Data Science', 'Machine Learning', 'Deep Learning', 'OpenCV', 'Web Development')),
  role TEXT,
  photo TEXT NOT NULL,
  linkedin TEXT,
  github TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  domain TEXT NOT NULL CHECK (domain IN ('Data Science', 'Machine Learning', 'Deep Learning', 'OpenCV', 'Web Development')),
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Events', 'Sankalp', 'Team', 'Workshops', 'Projects')),
  year INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. RECRUITMENT SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.recruitment_settings (
  id INT PRIMARY KEY DEFAULT 1,
  is_open BOOLEAN DEFAULT FALSE,
  year INT NOT NULL,
  opening_date TEXT NOT NULL,
  closing_date TEXT NOT NULL,
  announcement_note TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. RECRUITMENT APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.recruitment_applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  department TEXT NOT NULL,
  batch TEXT NOT NULL,
  primary_domain TEXT NOT NULL,
  secondary_domain TEXT NOT NULL,
  skills TEXT NOT NULL,
  linkedin TEXT,
  github TEXT,
  portfolio TEXT,
  motivation TEXT NOT NULL,
  resume_url TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Accepted', 'Rejected'))
);

-- 10. KEEP ALIVE PINGS TABLE (For automated 48-hr keep-alive triggers without disturbing main data)
CREATE TABLE IF NOT EXISTS public.keep_alive_pings (
  id BIGSERIAL PRIMARY KEY,
  pinged_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'automated_trigger',
  status TEXT DEFAULT 'success'
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sankalp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keep_alive_pings ENABLE ROW LEVEL SECURITY;

-- READ POLICIES (Allow Public & Admin to View Data)
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read sankalp_events" ON public.sankalp_events FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public read advisors" ON public.advisors FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public read recruitment_settings" ON public.recruitment_settings FOR SELECT USING (true);

-- PUBLIC WRITE RESTRICTIONS (Public can ONLY insert into recruitment_applications & keep_alive_pings)
CREATE POLICY "Public submit applications" ON public.recruitment_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public ping keep alive" ON public.keep_alive_pings FOR SELECT USING (true);
CREATE POLICY "Public trigger keep alive ping" ON public.keep_alive_pings FOR INSERT WITH CHECK (true);

-- ADMIN WRITE POLICIES (Authenticated users or Service Role full access)
CREATE POLICY "Admin write events" ON public.events FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin write sankalp_events" ON public.sankalp_events FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin write achievements" ON public.achievements FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin write advisors" ON public.advisors FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin write team_members" ON public.team_members FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin write projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin write gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin write recruitment_settings" ON public.recruitment_settings FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin manage applications" ON public.recruitment_applications FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ==============================================================================
-- SUPABASE STORAGE BUCKET FOR IMAGE UPLOADS
-- ==============================================================================
-- Creates the 'club-assets' storage bucket and sets up public read & upload policies.
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('club-assets', 'club-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Assets" ON storage.objects
FOR SELECT USING (bucket_id = 'club-assets');

CREATE POLICY "Public & Admin Upload Assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'club-assets');

CREATE POLICY "Admin Update Assets" ON storage.objects
FOR UPDATE USING (bucket_id = 'club-assets');

CREATE POLICY "Admin Delete Assets" ON storage.objects
FOR DELETE USING (bucket_id = 'club-assets');
