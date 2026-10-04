'use client';

import React from 'react';
import Image from 'next/image';
import { Achievement } from '@/types';
import { Trophy, Medal, Award, Star } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'Competition Win': return Trophy;
      case 'Hackathon Position': return Medal;
      case 'Project Award': return Award;
      default: return Star;
    }
  };

  const Icon = getCategoryIcon(achievement.category);

  return (
    <div className="glass-card shine-hover p-6 flex flex-col justify-between group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div>
        {achievement.image && (
          <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-slate-800">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Icon className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              {achievement.category}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {achievement.year}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
          {achievement.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {achievement.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>NIST Data Science Club</span>
        <span className="text-amber-500 font-bold">★ Verified Recognition</span>
      </div>
    </div>
  );
}
