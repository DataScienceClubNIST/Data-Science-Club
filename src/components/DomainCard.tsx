'use client';

import React from 'react';
import Link from 'next/link';
import { DomainType } from '@/types';
import { Database, Brain, Network, Eye, Code, ArrowRight } from 'lucide-react';

interface DomainCardProps {
  name: DomainType;
  description: string;
  subtopics: string[];
}

const domainIcons = {
  'Data Science': { icon: Database, color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  'Machine Learning': { icon: Brain, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  'Deep Learning': { icon: Network, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  'OpenCV': { icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'Web Development': { icon: Code, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
};

export default function DomainCard({ name, description, subtopics }: DomainCardProps) {
  const meta = domainIcons[name] || domainIcons['Data Science'];
  const Icon = meta.icon;

  return (
    <div className="glass-card shine-hover p-6 flex flex-col justify-between group relative overflow-hidden">
      {/* Background ambient accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${meta.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

      <div>
        <div className="flex items-center justify-between mb-5">
          <div className={`w-14 h-14 rounded-2xl ${meta.bg} ${meta.border} border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${meta.color}`} />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
            Domain
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {description}
        </p>

        <div className="space-y-2 mb-6">
          {subtopics.map((topic, index) => (
            <div key={index} className="flex items-center text-xs text-slate-700 dark:text-slate-300">
              <span className={`w-1.5 h-1.5 rounded-full ${meta.bg} ${meta.border} border mr-2 shrink-0`} />
              <span>{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href={`/projects?domain=${encodeURIComponent(name)}`}
        className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
      >
        <span>Explore Domain Projects</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
