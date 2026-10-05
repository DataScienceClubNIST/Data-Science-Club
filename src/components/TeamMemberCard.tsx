'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import { TeamMember, Advisor } from '@/types';
import { Mail, RotateCw, Sparkles, ShieldCheck } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/SocialIcons';

interface TeamMemberCardProps {
  member: TeamMember | Advisor;
  isAdvisor?: boolean;
}

export default function TeamMemberCard({ member, isAdvisor = false }: TeamMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (isAdvisor) {
    const adv = member as Advisor;
    return (
      <div 
        className="flip-card-container w-full min-h-[220px] cursor-pointer"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          
          {/* ADVISOR FRONT FACE */}
          <div className="flip-card-front glass-card p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 relative overflow-hidden">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shrink-0 shadow-lg">
              <SafeImage
                src={adv.photo}
                fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt={adv.name}
                fill
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                <span>{adv.role}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{adv.name}</h3>
              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">{adv.designation}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{adv.department}</p>
              
              <div className="flex items-center justify-center md:justify-start space-x-1 text-[11px] font-medium text-cyan-500 opacity-80 pt-1">
                <RotateCw className="w-3 h-3" />
                <span>Hover card to view full bio</span>
              </div>
            </div>
          </div>

          {/* ADVISOR BACK FACE */}
          <div className="flip-card-back glass-card p-6 flex flex-col justify-between text-left relative overflow-hidden bg-slate-900/95 border-cyan-500/50 shadow-2xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h4 className="text-base font-bold text-white">{adv.name}</h4>
                  <span className="text-xs text-cyan-400 font-medium">{adv.designation}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {adv.role}
                </span>
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-4 pt-1">
                {adv.bio}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/90">
              <div className="flex items-center space-x-2">
                {adv.linkedin && (
                  <a
                    href={adv.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all border border-cyan-500/30"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {adv.email && (
                  <a
                    href={`mailto:${adv.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-cyan-500 hover:text-white transition-all border border-slate-700"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                <span>NIST Advisor</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const tm = member as TeamMember;

  return (
    <div 
      className="flip-card-container w-full h-[280px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* TEAM MEMBER FRONT FACE */}
        <div className="flip-card-front glass-card p-5 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-700 mb-3 shadow-md">
              <SafeImage
                src={tm.photo}
                fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt={tm.name}
                fill
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

            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Batch {tm.batch}
            </span>
          </div>

          <div className="flex items-center space-x-1 text-[10px] font-semibold text-cyan-500 opacity-80 pt-2 border-t border-slate-200 dark:border-slate-800/80 w-full justify-center">
            <RotateCw className="w-3 h-3" />
            <span>Hover to view details</span>
          </div>
        </div>

        {/* TEAM MEMBER BACK FACE */}
        <div className="flip-card-back glass-card p-5 flex flex-col justify-between text-center relative overflow-hidden bg-slate-900/95 border-cyan-500/50 shadow-2xl">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg">
              <SafeImage
                src={tm.photo}
                fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt={tm.name}
                fill
              />
            </div>

            <div>
              <h4 className="text-base font-bold text-white line-clamp-1">{tm.name}</h4>
              <p className="text-xs font-bold text-cyan-400">{tm.role || 'Club Executive'}</p>
            </div>

            <div className="w-full bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-left space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400 font-medium">Domain:</span>
                <span className="text-purple-300 font-bold">{tm.domain}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400 font-medium">Academic Year:</span>
                <span className="text-cyan-300 font-mono font-bold">{tm.batch}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400 font-medium">Affiliation:</span>
                <span className="text-slate-200 font-semibold">DSC NIST</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-center space-x-2">
              {tm.linkedin ? (
                <a
                  href={tm.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all text-xs font-bold flex items-center space-x-1 border border-cyan-500/30 cursor-pointer"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              ) : null}
              {tm.github ? (
                <a
                  href={tm.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all text-xs font-bold flex items-center space-x-1 border border-slate-700 cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              ) : null}
            </div>

            <div className="flex items-center justify-center space-x-1 text-[10px] text-slate-500 font-mono">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>NIST Data Science Club</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
