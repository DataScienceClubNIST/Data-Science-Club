import { 
  Advisor, 
  TeamMember, 
  ClubEvent, 
  SankalpEvent, 
  Achievement, 
  Project, 
  GalleryItem, 
  RecruitmentSettings,
  RecruitmentApplication 
} from '@/types';

export const INITIAL_ADVISORS: Advisor[] = [
  {
    id: 'adv-1',
    name: 'Dr. Debabrata Swain',
    role: 'Advisor',
    designation: 'Professor & HOD, Dept. of CSE',
    department: 'Computer Science & Engineering',
    bio: 'Pioneer in Machine Learning and Data Science research at NIST University with over 18 years of academic & industry leadership.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/debabrata-swain',
    email: 'dswain@nist.edu'
  },
  {
    id: 'adv-2',
    name: 'Prof. Ananya Roy',
    role: 'Co-Advisor',
    designation: 'Associate Professor, AI & DS',
    department: 'Computer Science & Engineering',
    bio: 'Specialist in Computer Vision and Deep Learning with focus on real-world OpenCV applications and student technical mentorship.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/ananya-roy-nist',
    email: 'ananya.roy@nist.edu'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  // 2025 Batch (Current Core Leadership)
  {
    id: 'tm-2026-1',
    name: 'Rahul Kumar Sahoo',
    batch: '2025',
    domain: 'Data Science',
    role: 'Club President',
    bio: 'Passionate about machine learning pipelines, big data architectures, and leading student innovation at NIST.',
    is_alumni: false,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/rahul-sahoo',
    github: 'https://github.com/rahulsahoo'
  },
  {
    id: 'tm-2026-2',
    name: 'Priya Sharma',
    batch: '2025',
    domain: 'Machine Learning',
    role: 'Tech Head',
    bio: 'Specializes in computer vision applications, model optimization, and building AI tools for open source projects.',
    is_alumni: false,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/priyasharma-ml',
    github: 'https://github.com/priyasharma'
  },
  {
    id: 'tm-2026-3',
    name: 'Aman Verma',
    batch: '2025',
    domain: 'Deep Learning',
    role: 'Junior Secretary',
    bio: 'Focuses on deep learning architectures, PyTorch model training, and coordinating technical workshops.',
    is_alumni: false,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/amanverma-dl',
    github: 'https://github.com/amanverma'
  },
  {
    id: 'tm-2026-4',
    name: 'Sneha Pattnaik',
    batch: '2025',
    domain: 'OpenCV',
    role: 'Vision Lead',
    bio: 'OpenCV developer working on real-time autonomous rover vision and object tracking systems.',
    is_alumni: false,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/snehapattnaik',
    github: 'https://github.com/snehapattnaik'
  },
  {
    id: 'tm-2026-5',
    name: 'Rohan Das',
    batch: '2025',
    domain: 'Web Development',
    role: 'Fullstack Lead',
    bio: 'Building reactive Next.js web applications, UI design systems, and cloud backend integrations.',
    is_alumni: false,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/rohandas-web',
    github: 'https://github.com/rohandas'
  },
  
  // Alumni Batches
  {
    id: 'tm-2025-1',
    name: 'Subhashree Behera',
    batch: '2025',
    domain: 'Data Science',
    role: 'Ex-President',
    bio: 'Data Science Alumna working as an AI Data Analyst; led NIST DSC during 2024–25 sessions.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/subhashree-b',
    github: 'https://github.com/subhashree'
  },
  {
    id: 'tm-2025-2',
    name: 'Aditya Mishra',
    batch: '2025',
    domain: 'Machine Learning',
    role: 'Ex-Tech Head',
    bio: 'Machine Learning Engineer alumnus with focus on edge ML deployments.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/adityamishra-ml',
    github: 'https://github.com/adityamishra'
  },
  {
    id: 'tm-2025-3',
    name: 'Anusha Mahapatra',
    batch: '2025',
    domain: 'Deep Learning',
    bio: 'Deep Learning Alumna specialized in medical image analysis and neural networks.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/anusha-m',
    github: 'https://github.com/anusham'
  },

  // 2024 Alumni Batch
  {
    id: 'tm-2024-1',
    name: 'Debasish Tripathy',
    batch: '2024',
    domain: 'OpenCV',
    role: 'Vision Coordinator',
    bio: 'OpenCV Alumnus who led image processing projects and robotics competitions.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/debasisht',
    github: 'https://github.com/debasisht'
  },
  {
    id: 'tm-2024-2',
    name: 'Swati Sucharita',
    batch: '2024',
    domain: 'Web Development',
    bio: 'Software Engineer Alumna working on scalable frontend web architectures.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/swati-s',
    github: 'https://github.com/swatis'
  },

  // 2023 Alumni Batch
  {
    id: 'tm-2023-1',
    name: 'Abhishek Choudhury',
    batch: '2023',
    domain: 'Data Science',
    bio: 'Data Scientist Alumnus skilled in predictive analytics and business intelligence.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/abhishekc',
    github: 'https://github.com/abhishekc'
  },

  // 2022 Alumni Batch
  {
    id: 'tm-2022-1',
    name: 'Manish Mohanty',
    batch: '2022',
    domain: 'Machine Learning',
    bio: 'Senior Software Engineer Alumnus building NLP recommendation engines.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/manishm',
    github: 'https://github.com/manishm'
  },

  // 2021 Alumni Batch
  {
    id: 'tm-2021-1',
    name: 'Archana Senapati',
    batch: '2021',
    domain: 'Deep Learning',
    bio: 'AI Researcher Alumna working on computer vision and reinforcement learning.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/archanas',
    github: 'https://github.com/archanas'
  },

  // 2020 Alumni Batch (Founding Batch)
  {
    id: 'tm-2020-1',
    name: 'Satyajit Ray',
    batch: '2020',
    domain: 'Data Science',
    role: 'Founding President',
    bio: 'Founding President of NIST Data Science Club; currently Lead Data Engineer.',
    is_alumni: true,
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/satyajitray-ds',
    github: 'https://github.com/satyajitray'
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'evt-2026-1',
    title: 'Hands-on Deep Learning with PyTorch & CUDA',
    year: 2026,
    date: 'February 18, 2026',
    description: 'An intensive 2-day bootcamp covering convolutional neural networks, transformer architectures, and CUDA GPU acceleration techniques.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    venue: 'Seminar Hall 3, NIST Campus',
    category: 'Workshop',
    registration_link: 'https://nist.ac.in/events/dl-pytorch-2026',
    result: 'Over 140 students completed model training projects on NIST GPU Cluster.'
  },
  {
    id: 'evt-2026-2',
    title: 'OpenCV Real-Time Object Tracking Sprint',
    year: 2026,
    date: 'January 24, 2026',
    description: 'Practical hack-day building edge computer vision applications for autonomous rovers using OpenCV C++ and Python bindings.',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
    venue: 'Data Science Lab 2',
    category: 'Competition',
    result: 'Team VisionX won 1st prize for real-time traffic signal recognition.'
  },
  {
    id: 'evt-2025-1',
    title: 'Generative AI & LLM Fine-Tuning Summit',
    year: 2025,
    date: 'November 12, 2025',
    description: 'Expert talks on quantization, LoRA fine-tuning, and RAG pipelines for enterprise applications.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    venue: 'Main Auditorium, NIST',
    category: 'Tech Talk',
    result: '250+ attendees across NIST engineering departments.'
  },
  {
    id: 'evt-2025-2',
    title: 'Full-Stack Data Web Apps with Next.js & Supabase',
    year: 2025,
    date: 'August 14, 2025',
    description: 'Building modern, reactive web dashboards for data science tools using Next.js 15, Tailwind CSS, and Supabase database.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    venue: 'Web Tech Lab',
    category: 'Workshop'
  },
  {
    id: 'evt-2024-1',
    title: 'Exploratory Data Analysis & Feature Engineering Sprint',
    year: 2024,
    date: 'September 10, 2024',
    description: 'Mastering Pandas, Seaborn, and Scikit-learn preprocessing pipelines for real-world dataset modeling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    venue: 'Lab 4',
    category: 'Workshop'
  },
  {
    id: 'evt-2023-1',
    title: 'Intro to Supervised & Unsupervised Machine Learning',
    year: 2023,
    date: 'March 15, 2023',
    description: 'Foundational concepts of Decision Trees, Random Forests, K-Means clustering and PCA.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    venue: 'Computer Center 1',
    category: 'Workshop'
  },
  {
    id: 'evt-2022-1',
    title: 'Computer Vision Basics: Image Filtering & Edge Detection',
    year: 2022,
    date: 'October 05, 2022',
    description: 'Introduction to OpenCV matrix transformations, contour detection, and color space manipulation.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    venue: 'Lab 3',
    category: 'Workshop'
  },
  {
    id: 'evt-2021-1',
    title: 'Python for Data Analysis Bootcamp',
    year: 2021,
    date: 'November 20, 2021',
    description: 'Numpy, Pandas, and Matplotlib hands-on session for first-year engineering students.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    venue: 'Online (Google Meet)',
    category: 'Workshop'
  },
  {
    id: 'evt-2020-1',
    title: 'Data Science Club Inaugural Technical Webinar',
    year: 2020,
    date: 'August 28, 2020',
    description: 'The foundation of Data Science Club at NIST University. Keynote address on future tech careers in AI.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    venue: 'NIST Virtual Hall',
    category: 'Seminar',
    result: 'Marked the official inception of Data Science Club.'
  }
];

export const INITIAL_SANKALP_EVENTS: SankalpEvent[] = [
  {
    id: 'snk-2026-1',
    title: 'Sankalp 2026: AI Grand Prix Hackathon',
    year: 2026,
    date: 'March 28–29, 2026',
    description: '24-hour flagship hackathon organized by Data Science Club at Sankalp Tech Fest. Teams create innovative solutions in Machine Learning, Vision, and NLP.',
    image: '/images/sankalp_banner.jpg',
    venue: 'NIST Central Arena',
    registration_link: 'https://sankalp.nist.edu/register-ai-hackathon',
    result: 'Registration active! Prize pool: ₹50,000.'
  },
  {
    id: 'snk-2026-2',
    title: 'Sankalp 2026: OpenCV Autonomous Bot Race',
    year: 2026,
    date: 'March 29, 2026',
    description: 'Line tracking and obstacle avoidance challenge using micro-cameras and computer vision algorithms.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    venue: 'Outdoor Robotics Track, NIST Campus',
    registration_link: 'https://sankalp.nist.edu/register-bot-race'
  },
  {
    id: 'snk-2025-1',
    title: 'Sankalp 2025: Data Analytics & Dashboarding Clash',
    year: 2025,
    date: 'April 14, 2025',
    description: 'Live dataset visualization and business insights competition judged by industry leaders from Microsoft & Amazon.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    venue: 'NIST Computer Center',
    result: 'Winners: Team DataViz Masters (NIST B.Tech CSE).'
  },
  {
    id: 'snk-2024-1',
    title: 'Sankalp 2024: Deep Learning Model Efficiency Cup',
    year: 2024,
    date: 'April 05, 2024',
    description: 'Optimize neural network inference latency on restricted hardware benchmarks.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    venue: 'Lab 5',
    result: '1st Place: Team EdgeAI NIST.'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: '1st Prize — Smart India Hackathon (SIH)',
    description: 'Data Science Club team developed an AI-driven disaster response system with computer vision satellite image analytics.',
    year: 2025,
    category: 'Hackathon Position',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ach-2',
    title: 'Best Technical Club Award — NIST University',
    description: 'Awarded by NIST administration for organizing 12+ high-impact technical workshops and Sankalp tech events.',
    year: 2025,
    category: 'Recognition',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ach-3',
    title: 'National OpenCV Vision Challenge Winners',
    description: '1st position in real-time video stream processing and gesture control robotics track.',
    year: 2024,
    category: 'Competition Win'
  },
  {
    id: 'ach-4',
    title: 'Top 3 Kaggle University Sprint',
    description: 'Club members ranked among top 1% globally in predictive tabular data modeling.',
    year: 2023,
    category: 'Competition Win'
  },
  {
    id: 'ach-5',
    title: 'IEEE Conference Research Paper Publication',
    description: 'Deep Learning domain members published a paper on agricultural weed detection using YOLOv8.',
    year: 2022,
    category: 'Project Award'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'NIST Predictive Campus Analytics',
    description: 'An end-to-end data pipeline & web application predicting campus energy usage and attendance patterns using Time-Series ML models.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    domain: 'Data Science',
    project_url: 'https://analytics.nist-dsc.org',
    github_url: 'https://github.com/nist-dsc/campus-analytics',
    featured: true
  },
  {
    id: 'proj-2',
    name: 'MediVision: Brain Tumor Segmentation',
    description: 'Deep U-Net segmentation architecture trained on MRI scans to assist radiologist detection accuracy.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    domain: 'Deep Learning',
    project_url: 'https://medivision-demo.vercel.app',
    github_url: 'https://github.com/nist-dsc/medivision',
    featured: true
  },
  {
    id: 'proj-3',
    name: 'AutoTrack OpenCV Surveillance Engine',
    description: 'Real-time multi-camera vehicle speed estimation and license plate recognition using OpenCV & YOLO.',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
    domain: 'OpenCV',
    github_url: 'https://github.com/nist-dsc/autotrack-opencv',
    featured: true
  },
  {
    id: 'proj-4',
    name: 'Smart Crop Health Classifier',
    description: 'Mobile-friendly ML model assessing plant leaf diseases from camera photos with high accuracy.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    domain: 'Machine Learning',
    github_url: 'https://github.com/nist-dsc/crop-health-ml'
  },
  {
    id: 'proj-5',
    name: 'Data Science Club Portal (Next.js + Supabase)',
    description: 'Official dynamic web application for Data Science Club at NIST University with dynamic admin content management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    domain: 'Web Development',
    project_url: 'https://datascienceclub-nist.vercel.app',
    github_url: 'https://github.com/nist-dsc/club-website',
    featured: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Hands-on Deep Learning Workshop 2026',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    category: 'Workshops',
    year: 2026
  },
  {
    id: 'gal-2',
    title: 'Sankalp Tech Fest Arena 2025',
    image: '/images/sankalp_banner.jpg',
    category: 'Sankalp',
    year: 2025
  },
  {
    id: 'gal-3',
    title: 'Data Science Team Hackathon 2025',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Events',
    year: 2025
  },
  {
    id: 'gal-4',
    title: 'Smart India Hackathon Winners 2025',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    category: 'Projects',
    year: 2025
  },
  {
    id: 'gal-5',
    title: 'Executive Council 2026 Batch',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    category: 'Team',
    year: 2026
  }
];

export const INITIAL_RECRUITMENT_SETTINGS: RecruitmentSettings = {
  is_open: true,
  year: 2026,
  opening_date: '2026-03-01',
  closing_date: '2026-04-15',
  announcement_note: 'Recruitment for 2026–27 is now open! We welcome students from all years interested in Data Science, ML, DL, OpenCV, and Web Dev.'
};

export const INITIAL_APPLICATIONS: RecruitmentApplication[] = [
  {
    id: 'app-1',
    full_name: 'Soumya Ranjan Mohapatra',
    email: 'soumya.23cse@nist.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    batch: '2027',
    primary_domain: 'Machine Learning',
    secondary_domain: 'Data Science',
    skills: 'Python, NumPy, Pandas, Scikit-Learn, SQL',
    linkedin: 'https://linkedin.com/in/soumya-m',
    github: 'https://github.com/soumya-m',
    portfolio: 'https://soumya.dev',
    motivation: 'I want to build real-world ML projects and represent NIST in national hackathons.',
    resume_url: 'https://drive.google.com/file/d/sample-resume-1',
    submitted_at: '2026-03-05T14:22:00Z',
    status: 'Pending'
  }
];
