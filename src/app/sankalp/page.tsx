'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import EventCard from '@/components/EventCard';
import AnimeStaggerGrid from '@/components/AnimeStaggerGrid';
import { useData } from '@/context/DataContext';
import { Sparkles, Calendar, Trophy, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function SankalpPage() {
  const { sankalpEvents } = useData();
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  // Extract available years dynamically
  const years = Array.from(new Set(sankalpEvents.map(e => e.year))).sort((a, b) => b - a);

  // Filter events by selected year
  const filteredEvents = sankalpEvents.filter(e => e.year === selectedYear);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* COMBINED SANKALP HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-slate-950 shadow-2xl">
        {/* Banner Display Section */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[2048/754] min-h-[190px] max-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Ambient background glow using banner colors */}
          <div className="absolute inset-0 overflow-hidden filter blur-2xl scale-110 opacity-30 pointer-events-none">
            <SafeImage
              src="/images/sankalp_banner.jpg"
              fallbackSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
              alt=""
              fill
              fit="cover"
            />
          </div>

          {/* Full Crisp Banner Artwork (100% visible, no buttons blocking) */}
          <div className="relative z-10 w-full h-full p-1 sm:p-2 flex items-center justify-center">
            <SafeImage
              src="/images/sankalp_banner.jpg"
              fallbackSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
              alt="Sankalp NIST Tech Fest Official Banner"
              fill
              fit="contain"
              priority
            />
          </div>
        </div>

        {/* Integrated Details Section (Combined directly within the same card) */}
        <div className="p-6 sm:p-8 lg:p-10 border-t border-purple-500/20 bg-gradient-to-r from-slate-950 via-slate-900/90 to-purple-950/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Official Tech Fest of NIST University</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                SANKALP <span className="text-cyan-400">TECH FEST</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Sankalp</strong> is the flagship annual technical festival of <strong className="text-white">NIST University</strong>. As an officially recognized student club of NIST, the Data Science Club drives the AI, Machine Learning, Computer Vision, and Data Engineering events for Sankalp.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-sm">
                <div className="text-slate-400 font-medium">Flagship Fest</div>
                <div className="text-cyan-400 font-bold text-base">Sankalp 2026</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-sm">
                <div className="text-slate-400 font-medium">Organized By</div>
                <div className="text-purple-300 font-bold text-base">Data Science Club</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YEAR SELECTION NAVIGATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Sankalp {selectedYear} Activities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing activities & competitions organized by Data Science Club for Sankalp {selectedYear}.
          </p>
        </div>

        {/* YEAR TABS */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                selectedYear === yr
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Sankalp {yr}
            </button>
          ))}
        </div>
      </div>

      {/* EVENTS GRID */}
      {filteredEvents.length > 0 ? (
        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} isSankalp={true} />
          ))}
        </AnimeStaggerGrid>
      ) : (
        <div className="glass-card p-12 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Sankalp events listed for {selectedYear}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Check back soon or select another year tab above.
          </p>
        </div>
      )}

      {/* SANKALP CLUB PARTICIPATION NOTICE */}
      <div className="glass-card p-8 bg-slate-900 text-slate-300 border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Represent Data Science Club at Sankalp</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Club members serve as domain mentors, event leads, and workshop coordinators during Sankalp fest. Registrations are open to all NIST University students.
          </p>
        </div>
        <a
          href="/contact"
          className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shrink-0"
        >
          Contact Sankalp Lead
        </a>
      </div>

    </div>
  );
}
