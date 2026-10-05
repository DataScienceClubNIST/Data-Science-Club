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
  const [memberType, setMemberType] = useState<'all' | 'current' | 'alumni'>('all');

  const allBatches = [
    'All',
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020'
  ];

  // Helper to check if a member is alumni
  const isMemberAlumni = (m: (typeof teamMembers)[0]) => {
    if (typeof m.is_alumni === 'boolean') return m.is_alumni;
    // Default fallback: batches 2020..2023 are alumni
    return ['2020', '2021', '2022', '2023'].some(b => m.batch && m.batch.includes(b));
  };

  // Helper to match batch strings flexibly
  const isBatchMatch = (memberBatch: string, targetBatch: string) => {
    if (targetBatch === 'All') return true;
    if (!memberBatch) return false;
    return memberBatch === targetBatch || memberBatch.startsWith(targetBatch);
  };

  const filteredMembers = teamMembers.filter(m => {
    const matchesBatch = isBatchMatch(m.batch, selectedBatch);
    const isAlum = isMemberAlumni(m);
    if (!matchesBatch) return false;
    if (memberType === 'current') return !isAlum;
    if (memberType === 'alumni') return isAlum;
    return true;
  });

  // Group team members by batch for structured section layout when 'All' is selected
  const groupedBatches = allBatches.filter(b => b !== 'All').map(batchName => ({
    batch: batchName,
    members: teamMembers.filter(m => {
      const matchesBatch = isBatchMatch(m.batch, batchName);
      const isAlum = isMemberAlumni(m);
      if (!matchesBatch) return false;
      if (memberType === 'current') return !isAlum;
      if (memberType === 'alumni') return isAlum;
      return true;
    })
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

        {/* CONTROLS STRIP: MEMBER TYPE TABS & BATCH SELECTOR */}
        <div className="flex flex-col space-y-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Student Members & Alumni
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch between current active members, alumni network, or filter by batch year.
              </p>
            </div>

            {/* MEMBER TYPE FILTER (Current, Alumni, All) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setMemberType('all')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  memberType === 'all'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-cyan-500'
                }`}
              >
                All Members
              </button>
              <button
                onClick={() => setMemberType('current')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  memberType === 'current'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-cyan-500'
                }`}
              >
                Current Members
              </button>
              <button
                onClick={() => setMemberType('alumni')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  memberType === 'alumni'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-cyan-500'
                }`}
              >
                Alumni
              </button>
            </div>
          </div>

          {/* BATCH SELECTOR STRIP */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 pb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0 mr-1">Batch Year:</span>
            {allBatches.map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedBatch === batch
                    ? 'bg-purple-600 text-white shadow-md'
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
