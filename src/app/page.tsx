'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DomainCard from '@/components/DomainCard';
import EventCard from '@/components/EventCard';
import AchievementCard from '@/components/AchievementCard';
import ProjectCard from '@/components/ProjectCard';
import AnimeHeroVisual from '@/components/AnimeHeroVisual';
import AnimeStaggerGrid from '@/components/AnimeStaggerGrid';
import AnimeHeading from '@/components/AnimeHeading';
import AnimeScrollReveal from '@/components/AnimeScrollReveal';
import DomainScrollShowcase from '@/components/DomainScrollShowcase';
import { useData } from '@/context/DataContext';
import { 
  BookOpen, 
  Hammer, 
  Presentation, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  UserPlus, 
  ChevronRight, 
  Star, 
  Layers, 
  Mail, 
  CheckCircle2,
  Calendar,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const { sankalpEvents, achievements, projects, recruitmentSettings, gallery } = useData();

  const officialDomains = [
    {
      name: 'Data Science' as const,
      description: 'Extracting meaningful insights from complex structured and unstructured datasets using statistical rigor.',
      subtopics: ['Data Analysis', 'Data Visualization', 'Statistics', 'Data Processing']
    },
    {
      name: 'Machine Learning' as const,
      description: 'Building intelligent algorithms capable of learning patterns and predicting future outcomes.',
      subtopics: ['Supervised Learning', 'Unsupervised Learning', 'Predictive Modeling', 'Model Development']
    },
    {
      name: 'Deep Learning' as const,
      description: 'Engineering multi-layer artificial neural networks for complex high-dimensional pattern recognition.',
      subtopics: ['Neural Networks', 'Computer Vision', 'NLP & LLMs', 'Deep Learning Apps']
    },
    {
      name: 'OpenCV' as const,
      description: 'Mastering spatial visual perception, image matrix manipulation, and real-time object tracking.',
      subtopics: ['Image Processing', 'Computer Vision', 'Object Detection', 'Image Analysis']
    },
    {
      name: 'Web Development' as const,
      description: 'Crafting responsive, high-performance web applications to deploy modern AI and data science models.',
      subtopics: ['Frontend UI', 'Backend APIs', 'Full-stack Systems', 'Web-based Data Dashboards']
    }
  ];

  const whatWeDoCards = [
    {
      title: 'Learn',
      icon: BookOpen,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      desc: 'Hands-on technical workshops, peer-to-peer coding sessions, and expert guest seminars.'
    },
    {
      title: 'Build',
      icon: Hammer,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      desc: 'Collaborative development of production-ready data systems, ML models, and web tools.'
    },
    {
      title: 'Present',
      icon: Presentation,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      desc: 'Demonstrating technical innovations, presenting research papers, and technical project expos.'
    },
    {
      title: 'Compete',
      icon: Trophy,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      desc: 'Representing NIST University in national hackathons, Kaggle grand prix, and coding challenges.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO TEXT */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4 animate-pulse text-cyan-500" />
                <span>Student-Led Technical Community</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                  Data Science <span className="gradient-text">Club</span>
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  NIST University
                </p>
              </div>

              <p className="text-2xl sm:text-3xl font-extrabold tracking-wide text-slate-800 dark:text-slate-100 uppercase pt-2">
                Learn. Build. Present. Compete.
              </p>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A student-led technical community at NIST University focused on Data Science, Machine Learning, Deep Learning, OpenCV, and Web Development.
              </p>

              {/* ACTION BUTTONS */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/projects"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Explore Our Projects</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/recruitment"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-5 h-5 text-cyan-500" />
                  <span>Join the Club</span>
                </Link>
              </div>

              {/* STATS STRIP */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">2020</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Inception Year</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">100+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Members</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">5</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core Technical Domains</div>
                </div>
              </div>
            </div>

            {/* ANIME.JS HERO VISUAL COMPONENT */}
            <div className="lg:col-span-5 flex justify-center">
              <AnimeHeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT THE CLUB (WHO WE ARE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimeScrollReveal variant="fade-up">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  About The Club
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  Who We Are
                </h2>
                <div className="space-y-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    The <strong className="text-slate-900 dark:text-white">Data Science Club</strong> is a student-led technical club of <strong className="text-slate-900 dark:text-white">NIST University</strong> dedicated to fostering innovation and excellence in data-driven engineering.
                  </p>
                  <p>
                    We focus on practical, industry-aligned learning. Through hands-on workshops, real-world development projects, research initiatives, and national hackathons, we empower students to acquire deep technical competencies.
                  </p>
                  <p>
                    Every member gets platforms to build software, demonstrate project work, present paper solutions, and compete in college & national level technology challenges.
                  </p>
                </div>
              </div>

              {/* MISSION HIGHLIGHT BOX */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
                    <Compass className="w-4 h-4" />
                    <span>Our Dedicated Mission</span>
                  </div>
                  <blockquote className="text-sm sm:text-base font-medium leading-relaxed italic text-slate-200">
                    &ldquo;To provide students with knowledge and practical exposure in our technical domains, encourage them to learn and build projects, provide platforms to present their work, and motivate them to participate and compete in technical competitions.&rdquo;
                  </blockquote>
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-cyan-400/90 font-semibold">
                    — Data Science Club Executive Board, NIST University
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimeScrollReveal>
      </section>

      {/* 3. WHAT WE DO (LEARN, BUILD, PRESENT, COMPETE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Core Activities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            What We Do
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Our activities center around hands-on execution and technical growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="glass-card p-6 flex flex-col justify-between group">
                <div>
                  <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. OUR OFFICIAL 5 DOMAINS (ONE-BY-ONE SCROLL SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DomainScrollShowcase />
      </section>

      {/* 5. SANKALP HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimeScrollReveal variant="zoom-in">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 p-8 lg:p-12 text-white shadow-2xl">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/sankalp_banner.jpg"
                alt="Sankalp Tech Fest NIST University"
                fill
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NIST University Tech Fest</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  SANKALP <span className="text-cyan-400">2026</span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Sankalp is the annual tech fest of NIST University. As a student club within NIST, the Data Science Club organizes flagship hackathons, OpenCV bot races, and data analytics challenges during Sankalp.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/sankalp"
                    className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors inline-flex items-center space-x-2 shadow-lg"
                  >
                    <span>Explore Sankalp 2026 Events</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-sm text-cyan-400 uppercase tracking-wider">Current Fest Events</h4>
                {sankalpEvents.slice(0, 2).map((se) => (
                  <div key={se.id} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="font-bold text-slate-200">{se.title}</div>
                    <div className="text-slate-400 text-[11px] mt-1">{se.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimeScrollReveal>
      </section>

      {/* 6. ACHIEVEMENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Club Achievements
            </h2>
          </div>
          <Link
            href="/achievements"
            className="mt-4 sm:mt-0 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Historical Achievements</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.slice(0, 3).map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} />
          ))}
        </AnimeStaggerGrid>
      </section>

      {/* 7. FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Technical Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Featured Student Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-4 sm:mt-0 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </AnimeStaggerGrid>
      </section>

      {/* 8. RECRUITMENT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimeScrollReveal variant="fade-up">
          <div className="glass-card p-8 sm:p-12 relative overflow-hidden border border-cyan-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>
                    {recruitmentSettings.is_open ? 'Recruitment Open' : 'Recruitment Status'}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {recruitmentSettings.is_open
                    ? 'Apply Now for Data Science Club 2026'
                    : 'Recruitment Currently Closed'}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {recruitmentSettings.is_open
                    ? 'Applications are open for NIST University students interested in Data Science, ML, DL, OpenCV, and Web Development.'
                    : 'Follow our official Instagram and LinkedIn pages for upcoming recruitment cycle announcements.'}
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  href="/recruitment"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <span>{recruitmentSettings.is_open ? 'Submit Application' : 'Check Recruitment Info'}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </AnimeScrollReveal>
      </section>

      {/* 9. CONTACT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimeScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Have Questions? Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Reach out directly to the Data Science Club team at NIST University.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 shadow-lg flex items-center space-x-2 transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Open Contact Form & Gmail Compose</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimeScrollReveal>
      </section>

    </div>
  );
}
