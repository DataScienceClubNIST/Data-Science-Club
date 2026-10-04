'use client';

import React, { useState } from 'react';
import EventCard from '@/components/EventCard';
import AnimeStaggerGrid from '@/components/AnimeStaggerGrid';
import AnimeHeading from '@/components/AnimeHeading';
import { useData } from '@/context/DataContext';
import { Calendar, Filter, Search } from 'lucide-react';

export default function EventsPage() {
  const { events } = useData();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract years dynamically from 2026 down to 2020
  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020'];
  const categories = ['All', 'Workshop', 'Competition', 'Hackathon', 'Tech Talk', 'Seminar'];

  // Filter events
  const filteredEvents = events.filter((evt) => {
    const matchesYear = selectedYear === 'All' || evt.year.toString() === selectedYear;
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesYear && matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* PAGE HEADER */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
          <Calendar className="w-4 h-4 text-cyan-500" />
          <span>Historical Archive (2020 → Present)</span>
        </div>
        <AnimeHeading
          text="Club Events &"
          highlightText="Workshops"
          subtitle="Explore all technical workshops, competitive hackathons, guest seminars, and training sessions organized by Data Science Club at NIST University since inception."
        />
      </div>

      {/* FILTERS & YEAR SWITCHER */}
      <div className="glass-card p-6 space-y-6">
        
        {/* YEAR BUTTON STRIP */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Select Event Year:
          </label>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {yr === 'All' ? 'All Years (2020–26)' : yr}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH & CATEGORY FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search event title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="md:col-span-5 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-cyan-500 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* EVENT CARDS GRID */}
      {filteredEvents.length > 0 ? (
        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </AnimeStaggerGrid>
      ) : (
        <div className="glass-card p-12 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No events found matching filters
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try resetting your year or category selection.
          </p>
        </div>
      )}

    </div>
  );
}
