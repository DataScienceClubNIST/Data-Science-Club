'use client';

import React from 'react';
import Image from 'next/image';
import { TeamMember, Advisor } from '@/types';
import { Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/SocialIcons';

interface TeamMemberCardProps {
  member: TeamMember | Advisor;
  isAdvisor?: boolean;
}

export default function TeamMemberCard({ member, isAdvisor = false }: TeamMemberCardProps) {
  if (isAdvisor) {
    const adv = member as Advisor;
    return (
      <div className="glass-card shine-hover p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 relative overflow-hidden group">
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <Image
            src={adv.photo}
            alt={adv.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 mb-2">
            {adv.role}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{adv.name}</h3>
          <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">{adv.designation}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{adv.department}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{adv.bio}</p>

          <div className="flex items-center justify-center md:justify-start space-x-3">
            {adv.linkedin && (
              <a
                href={adv.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {adv.email && (
              <a
                href={`mailto:${adv.email}`}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  const tm = member as TeamMember;

  return (
    <div className="glass-card shine-hover p-4 flex flex-col items-center text-center group relative overflow-hidden transition-all duration-300">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-700 group-hover:border-cyan-400 transition-colors duration-300 mb-3 shadow-md">
        <Image
          src={tm.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
          alt={tm.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {tm.role && (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 mb-1.5">
          {tm.role}
        </span>
      )}

      <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
        {tm.name}
      </h4>

      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
        {tm.domain}
      </span>

      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3">
        Batch {tm.batch}
      </span>

      <div className="flex items-center space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 w-full justify-center">
        {tm.linkedin && (
          <a
            href={tm.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        )}
        {tm.github && (
          <a
            href={tm.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
