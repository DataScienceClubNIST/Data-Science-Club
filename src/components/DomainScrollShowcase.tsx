'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimeScrollReveal from './AnimeScrollReveal';
import { ArrowRight, Database, Brain, Network, Eye, Code, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { DomainType } from '@/types';

interface DomainItem {
  id: string;
  name: DomainType;
  subtitle: string;
  description: string;
  details: string;
  subtopics: string[];
  gradient: string;
  border: string;
  badgeBg: string;
  icon: any;
  illustrationType: 'data-science' | 'machine-learning' | 'deep-learning' | 'opencv' | 'web-dev';
}

const DOMAIN_SHOWCASE_DATA: DomainItem[] = [
  {
    id: 'ds',
    name: 'Data Science',
    subtitle: 'Exploratory Analytics & Insight Extraction',
    description: 'Transforming raw structured & unstructured datasets into actionable statistical intelligence and high-impact business decisions.',
    details: 'Our Data Science domain is an immersive journey into statistical computing, dataset wrangling, and predictive analytics. You will master Python data stacks (Pandas, NumPy, Seaborn, SQL), feature engineering pipelines, data cleaning strategies, and exploratory data analysis. By the end of this program, you will possess the analytical capability to solve complex real-world data problems.',
    subtopics: ['Data Analysis', 'Data Visualization', 'Statistics', 'Data Processing', 'Pandas & SQL'],
    gradient: 'from-cyan-500/20 via-blue-500/20 to-teal-500/20',
    border: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    icon: Database,
    illustrationType: 'data-science'
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    subtitle: 'Predictive Modeling & Intelligent Algorithms',
    description: 'Engineering self-learning mathematical algorithms to discover hidden patterns and make accurate data predictions.',
    details: 'Our Machine Learning domain delves deep into supervised and unsupervised learning algorithms. Students learn decision trees, random forests, support vector machines, gradient boosting (XGBoost), and clustering techniques. You will gain hands-on experience building, validating, tuning hyperparameters, and deploying production-ready ML models using Scikit-Learn.',
    subtopics: ['Supervised Learning', 'Unsupervised Learning', 'Predictive Modeling', 'Model Evaluation', 'Scikit-Learn'],
    gradient: 'from-indigo-500/20 via-purple-500/20 to-blue-500/20',
    border: 'border-indigo-500/40',
    badgeBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    icon: Brain,
    illustrationType: 'machine-learning'
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    subtitle: 'Neural Networks, NLP & Generative AI',
    description: 'Designing artificial multi-layer neural networks capable of learning complex high-dimensional representations.',
    details: 'Our Deep Learning domain pushes the boundaries of modern AI. You will build convolutional neural networks (CNNs) for image classification, recurrent networks (RNNs/LSTMs) for sequence modeling, and transformer architectures for Natural Language Processing (NLP). Learn model quantization, LoRA fine-tuning, PyTorch frameworks, and GPU acceleration CUDA workflows.',
    subtopics: ['Neural Networks', 'Computer Vision', 'NLP & LLMs', 'PyTorch & CUDA', 'Transformer Models'],
    gradient: 'from-purple-500/20 via-pink-500/20 to-indigo-500/20',
    border: 'border-purple-500/40',
    badgeBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: Network,
    illustrationType: 'deep-learning'
  },
  {
    id: 'cv',
    name: 'OpenCV',
    subtitle: 'Spatial Visual Perception & Video Analytics',
    description: 'Mastering real-time video stream processing, matrix image transformations, and spatial object tracking.',
    details: 'Our OpenCV domain focuses on computer vision algorithms and real-time visual perception. You will explore image filtering, edge detection, contour analysis, optical flow, and bounding box object tracking. Build autonomous robotics navigation systems, gesture recognition tools, and multi-camera surveillance pipelines utilizing OpenCV C++ & Python bindings.',
    subtopics: ['Image Processing', 'Computer Vision', 'Object Detection', 'Gesture Control', 'YOLO & Edge AI'],
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    border: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: Eye,
    illustrationType: 'opencv'
  },
  {
    id: 'web',
    name: 'Web Development',
    subtitle: 'Full-Stack Web Applications & Data Dashboards',
    description: 'Crafting responsive, high-performance web applications to deploy modern AI and data science models to the world.',
    details: 'Our Web Development domain is a comprehensive journey into the world of full-stack software development. You will learn front-end frameworks like React, Next.js, and Tailwind CSS, as well as back-end REST/GraphQL APIs, database management with Supabase & PostgreSQL, and serverless infrastructure. Master the complete end-to-end process from designing modern user interfaces to publishing interactive data dashboards and AI model APIs.',
    subtopics: ['Front-end React/Next.js', 'Back-end Node/APIs', 'Full Stack Dashboards', 'Supabase & SQL', 'AI Web Deployment'],
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    border: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    icon: Code,
    illustrationType: 'web-dev'
  }
];

export default function DomainScrollShowcase() {
  return (
    <div className="space-y-20">
      
      {/* SHOWCASE HEADER */}
      <AnimeScrollReveal variant="fade-up">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Our Domains
            </span>
          </div>
          <div className="w-20 sm:w-28 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Explore the 5 core technical pillars of Data Science Club at NIST University. Scroll down to view each domain journey.
          </p>
        </div>
      </AnimeScrollReveal>

      {/* ONE-BY-ONE SCROLLABLE DOMAIN CARDS */}
      <div className="space-y-24">
        {DOMAIN_SHOWCASE_DATA.map((domain, index) => {
          const Icon = domain.icon;
          const isEven = index % 2 === 0;

          return (
            <AnimeScrollReveal 
              key={domain.id} 
              variant={isEven ? 'fade-up' : 'zoom-in'} 
              threshold={0.15}
            >
              <div className="glass-card p-6 sm:p-10 relative overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 bg-[#0c0f1d]/90">
                {/* Background Ambient Glow */}
                <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-96 h-96 bg-gradient-to-br ${domain.gradient} rounded-full blur-3xl opacity-40 pointer-events-none`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
                  
                  {/* VISUAL ILLUSTRATION CARD (Matching uploaded layout!) */}
                  <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className={`relative w-full h-[280px] sm:h-[340px] rounded-2xl bg-slate-950/80 border ${domain.border} shadow-2xl p-6 flex flex-col justify-between overflow-hidden group`}>
                      
                      {/* Top Header inside card */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl ${domain.badgeBg} border flex items-center justify-center font-bold shadow-lg`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                          Domain 0{index + 1}
                        </span>
                      </div>

                      {/* CENTER ISOMETRIC GRAPHIC & PILLS */}
                      <div className="relative my-auto flex flex-col items-center justify-center space-y-3 py-4">
                        
                        {/* Interactive floating badges */}
                        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                          {domain.subtopics.slice(0, 3).map((topic, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-slate-200 border border-slate-700/80 shadow-md flex items-center space-x-1 group-hover:scale-105 transition-transform"
                            >
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                              <span>{topic}</span>
                            </span>
                          ))}
                        </div>

                        {/* Central Graphic Box */}
                        <div className="w-32 h-20 sm:w-40 sm:h-24 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-900/90 to-slate-800 border border-slate-700 flex items-center justify-center p-3 text-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                          <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                            {domain.name} Stack
                          </span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                          {domain.subtopics.slice(3).map((topic, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900/90 text-cyan-300 border border-cyan-500/30 shadow-md"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                        <span>NIST Data Science Club</span>
                        <span className="text-cyan-400 font-bold">100% Practical</span>
                      </div>

                    </div>
                  </div>

                  {/* DOMAIN TEXT DESCRIPTION (Matching uploaded image layout!) */}
                  <div className={`lg:col-span-6 space-y-4 ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{domain.subtitle}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {domain.name}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {domain.details}
                    </p>

                    {/* KEY SKILLS / TOPICS STRIP */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {domain.subtopics.map((sub, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800">
                          ✓ {sub}
                        </span>
                      ))}
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="pt-4">
                      <Link
                        href={`/projects?domain=${encodeURIComponent(domain.name)}`}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
                      >
                        <span>Explore {domain.name} Projects</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </AnimeScrollReveal>
          );
        })}
      </div>

    </div>
  );
}
