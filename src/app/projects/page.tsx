'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import AnimeStaggerGrid from '@/components/AnimeStaggerGrid';
import AnimeHeading from '@/components/AnimeHeading';
import { useData } from '@/context/DataContext';
import { DomainType } from '@/types';
import { FolderGit2, Search, Filter } from 'lucide-react';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialDomain = searchParams.get('domain') || 'All';
  
  const { projects } = useData();
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const domainQuery = searchParams.get('domain');
    if (domainQuery) {
      setSelectedDomain(domainQuery);
    }
  }, [searchParams]);

  const domainOptions = [
    'All',
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'OpenCV',
    'Web Development'
  ];

  const filteredProjects = projects.filter((proj) => {
    const matchesDomain = selectedDomain === 'All' || proj.domain === selectedDomain;
    const matchesSearch = searchQuery === '' || 
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-10">
      {/* FILTER & SEARCH */}
      <div className="glass-card p-6 space-y-6">
        {/* DOMAIN FILTER PILLS */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Filter by Domain:
          </label>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {domainOptions.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedDomain === dom
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {dom === 'All' ? 'All 5 Domains' : dom}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-7 text-slate-400" />
          <input
            type="text"
            placeholder="Search project title or technology keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* GRID */}
      {filteredProjects.length > 0 ? (
        <AnimeStaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </AnimeStaggerGrid>
      ) : (
        <div className="glass-card p-12 text-center space-y-3">
          <FolderGit2 className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No projects found matching selection
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select another domain filter or reset your search query.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* HEADER */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
          <FolderGit2 className="w-4 h-4 text-cyan-500" />
          <span>Student Innovations</span>
        </div>
        <AnimeHeading
          text="Project"
          highlightText="Showcase"
          subtitle="Explore real-world technical builds, machine learning systems, computer vision tools, and full-stack web platforms built by Data Science Club members at NIST University."
        />
      </div>

      <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading projects showcase...</div>}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}
