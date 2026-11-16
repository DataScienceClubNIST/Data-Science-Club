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
  Mail
} from 'lucide-react';

export default function HomePageClient() {
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
                <span>Premier Technical Community • NIST University</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Data Science <span className="gradient-text">Club</span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">
                    – NIST University (DSC NIST)
                  </span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl font-extrabold tracking-wide text-slate-800 dark:text-slate-100 uppercase pt-2">
                Learn. Build. Present. Compete.
              </p>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to the <strong className="text-slate-900 dark:text-white">Data Science Club (DSC)</strong> at <strong className="text-slate-900 dark:text-white">NIST University</strong>, Berhampur, Odisha. We are a student-driven technical organization dedicated to cultivating expertise in <strong className="text-cyan-600 dark:text-cyan-400">Data Science, Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision (OpenCV), and Modern Web Development</strong>. Through intensive workshops, innovative engineering projects, research showcases, and national competitions, we empower students to transform ideas into scalable technical solutions.
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="About Data Science Club NIST">
        <AnimeScrollReveal variant="fade-up">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  About DSC NIST
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  Who We Are – NIST University Data Science Club
                </h2>
                <div className="space-y-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    The <strong className="text-slate-900 dark:text-white">Data Science Club (DSC)</strong> is an officially recognized student technical organization of <strong className="text-slate-900 dark:text-white">NIST University</strong>, Berhampur, Odisha, established in 2020 to foster data-driven engineering, research culture, and algorithmic problem-solving.
                  </p>
                  <p>
                    We emphasize hands-on, industry-aligned skill building. Through intensive PyTorch and TensorFlow deep learning bootcamps, OpenCV vision robotics, real-world full-stack web applications, and Kaggle competitive clashing, we prepare students for competitive careers in modern Artificial Intelligence.
                  </p>
                  <p>
                    Every member benefits from a supportive peer-to-peer learning environment to build production-grade software, publish research papers, and compete in prestigious national hackathons like Smart India Hackathon and Sankalp Tech Fest.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="glass-card p-5 text-center space-y-2 border-cyan-500/20">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mx-auto">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">50+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Workshops &amp; Talks</div>
                </div>

                <div className="glass-card p-5 text-center space-y-2 border-indigo-500/20">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                    <Hammer className="w-5 h-5" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">25+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Deployed Projects</div>
                </div>

                <div className="glass-card p-5 text-center space-y-2 border-purple-500/20">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mx-auto">
                    <Presentation className="w-5 h-5" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">10+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Research Papers</div>
                </div>

                <div className="glass-card p-5 text-center space-y-2 border-emerald-500/20">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">15+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Hackathon Podiums</div>
                </div>
              </div>
            </div>
          </div>
        </AnimeScrollReveal>
      </section>

      {/* 3. FOUR PILLARS: WHAT WE DO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="What We Do - Learn Build Present Compete">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Our Core Methodology
          </span>
          <AnimeHeading
            text="What We"
            highlightText="Do"
            subtitle="At Data Science Club NIST University, our activities revolve around four foundational pillars designed to transition students from foundational theory to competitive mastery."
          />
        </div>

        <AnimeStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDoCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="glass-card p-6 shine-hover flex flex-col justify-between space-y-4 border border-slate-200/80 dark:border-slate-800 group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.border} border flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </AnimeStaggerGrid>
      </section>

      {/* 4. DOMAINS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Technical Domains at DSC NIST">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Specialized Wings
          </span>
          <AnimeHeading
            text="Technical"
            highlightText="Domains"
            subtitle="Explore the five specialized technical wings that power the Data Science Club at NIST University."
          />
        </div>

        <DomainScrollShowcase />
      </section>

      {/* 5. SANKALP HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Sankalp Tech Fest NIST University">
        <AnimeScrollReveal variant="zoom-in">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 p-6 sm:p-8 lg:p-10 text-white shadow-2xl space-y-8">
            {/* Dedicated Flexible Sankalp Banner Preview */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl group">
              {/* Ambient Glow */}
              <div className="absolute inset-0 overflow-hidden filter blur-2xl scale-110 opacity-30 pointer-events-none" aria-hidden="true">
                <Image
                  src="/images/sankalp_banner.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              {/* Full Banner Artwork - 100% visible with responsive aspect ratio */}
              <div className="relative z-10 w-full aspect-[21/9] sm:aspect-[2048/754] min-h-[160px] max-h-[340px] flex items-center justify-center p-1 sm:p-2">
                <Image
                  src="/images/sankalp_banner.webp"
                  alt="Sankalp Tech Fest NIST University Official Banner - Data Science Club"
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                  priority
                />
              </div>
            </div>

            {/* Information Grid & Current Events */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NIST University Flagship Tech Fest</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  SANKALP <span className="text-cyan-400">2026</span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Sankalp is the annual technical festival of NIST University. As an officially recognized student club within NIST, the Data Science Club organizes flagship hackathons, ideathons (<strong className="text-white">Idea2Odishi</strong>), and algorithmic challenges (<strong className="text-white">Code Arena 2.0</strong>) during Sankalp.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/sankalp"
                    className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors inline-flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
                  >
                    <span>Explore Sankalp 2026 Events</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <h3 className="font-bold text-sm text-cyan-400 uppercase tracking-wider">Current Fest Events</h3>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Club Achievements Track Record">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Club Achievements &amp; Accolades
            </h2>
          </div>
          <Link
            href="/achievements"
            className="mt-4 sm:mt-0 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Achievements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.slice(0, 3).map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} />
          ))}
        </AnimeStaggerGrid>
      </section>

      {/* 7. PROJECTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Student Engineering Projects">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Featured Technical Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-4 sm:mt-0 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </AnimeStaggerGrid>
      </section>

      {/* 8. RECRUITMENT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Member Recruitment Announcement">
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
                    ? 'Applications are open for NIST University students interested in Data Science, Machine Learning, Deep Learning, OpenCV, and Web Development.'
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Contact Information">
        <AnimeScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Have Questions? Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Reach out directly to the Data Science Club team at NIST University Campus, Berhampur, Odisha.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 shadow-lg flex items-center space-x-2 transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Open Contact Form &amp; Gmail Compose</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimeScrollReveal>
      </section>

    </div>
  );
}
