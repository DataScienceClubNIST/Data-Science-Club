'use client';

import React from 'react';
import SafeImage from '@/components/SafeImage';
import { Project } from '@/types';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass-card shine-hover overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
          <SafeImage
            src={project.image}
            fallbackSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
            alt={project.name}
            fill
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/90 text-white shadow-md">
              {project.domain}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white flex items-center space-x-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {project.name}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center space-x-2">
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center justify-center space-x-1.5 shadow-md"
          >
            <span>View Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-cyan-500 border border-slate-200 dark:border-slate-700 transition-colors"
            aria-label="GitHub Repository"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
