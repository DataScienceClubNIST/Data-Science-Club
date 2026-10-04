'use client';

import React, { useState } from 'react';
import AchievementCard from '@/components/AchievementCard';
import AnimeStaggerGrid from '@/components/AnimeStaggerGrid';
import AnimeHeading from '@/components/AnimeHeading';
import { useData } from '@/context/DataContext';
import { Trophy, Award, Medal, Star } from 'lucide-react';

export default function AchievementsPage() {
  const { achievements } = useData();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020'];
  const categories = ['All', 'Competition Win', 'Hackathon Position', 'Project Award', 'Recognition'];

  const filteredAchievements = achievements.filter((ach) => {
    const matchesYear = selectedYear === 'All' || ach.year.toString() === selectedYear;
    const matchesCategory = selectedCategory === 'All' || ach.category === selectedCategory;
    return matchesYear && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Hall of Fame & Accolades</span>
        </div>
        <AnimeHeading
          text="Club"
          highlightText="Achievements"
          subtitle="Celebrating national hackathon victories, competition awards, IEEE publications, and student honors earned by Data Science Club members since 2020."
        />
      </div>

      {/* FILTER BAR */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* YEAR TABS */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedYear === yr
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {yr === 'All' ? 'All Years' : yr}
            </button>
          ))}
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Filter: {cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* GRID */}
      {filteredAchievements.length > 0 ? (
        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} />
          ))}
        </AnimeStaggerGrid>
      ) : (
        <div className="glass-card p-12 text-center space-y-3">
          <Trophy className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No achievements match selected filters
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select another year or reset the category filter.
          </p>
        </div>
      )}

    </div>
  );
}
