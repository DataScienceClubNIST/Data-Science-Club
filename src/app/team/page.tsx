'use client';

import React, { useState } from 'react';
import TeamMemberCard from '@/components/TeamMemberCard';
import AnimeStaggerGrid from '@/components/AnimeStaggerGrid';
import AnimeHeading from '@/components/AnimeHeading';
import { useData } from '@/context/DataContext';
import { Users, GraduationCap, Award, ChevronDown } from 'lucide-react';

export default function TeamPage() {
  const { advisors, teamMembers } = useData();
  const [selectedBatch, setSelectedBatch] = useState<string>('All');

  const allBatches = [
    'All',
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020'
  ];

  const filteredMembers = selectedBatch === 'All'
    ? teamMembers
    : teamMembers.filter(m => m.batch === selectedBatch);

  // Group team members by batch for structured section layout when 'All' is selected
  const groupedBatches = allBatches.filter(b => b !== 'All').map(batchName => ({
    batch: batchName,
    members: teamMembers.filter(m => m.batch === batchName)
  })).filter(g => g.members.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* PAGE HEADER */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
          <Users className="w-4 h-4 text-cyan-500" />
          <span>Student & Faculty Leadership</span>
        </div>
        <AnimeHeading
          text="Our"
          highlightText="Team"
          subtitle="Meet the dedicated faculty advisors and student technical leaders who drive the Data Science Club at NIST University from inception (2020) to present."
        />
      </div>

      {/* 1. ADVISORS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <GraduationCap className="w-5 h-5 text-cyan-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Faculty Advisors
          </h2>
        </div>

        <AnimeStaggerGrid className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {advisors.map((adv) => (
            <TeamMemberCard key={adv.id} member={adv} isAdvisor={true} />
          ))}
        </AnimeStaggerGrid>
      </section>

      {/* 2. BATCH MEMBERS SECTION */}
      <section className="space-y-8">

        {/* BATCH SELECTOR STRIP */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Student Batches (2020 → Present)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter by core batch year or view complete club team history.
            </p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {allBatches.map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${selectedBatch === batch
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                {batch === 'All' ? 'All Batches' : batch}
              </button>
            ))}
          </div>
        </div>

        {/* BATCH DISPLAY */}
        {selectedBatch === 'All' ? (
          <div className="space-y-12">
            {groupedBatches.map((group) => (
              <div key={group.batch} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                    Core Members {group.batch}
                  </span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                <AnimeStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {group.members.map((m) => (
                    <TeamMemberCard key={m.id} member={m} />
                  ))}
                </AnimeStaggerGrid>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {filteredMembers.length > 0 ? (
              <AnimeStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMembers.map((m) => (
                  <TeamMemberCard key={m.id} member={m} />
                ))}
              </AnimeStaggerGrid>
            ) : (
              <div className="glass-card p-12 text-center text-slate-400">
                No members found for batch {selectedBatch}.
              </div>
            )}
          </div>
        )}

      </section>

    </div>
  );
}
