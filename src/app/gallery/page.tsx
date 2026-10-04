'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import AnimeStaggerGrid from '@/components/AnimeStaggerGrid';
import AnimeHeading from '@/components/AnimeHeading';
import { useData } from '@/context/DataContext';
import { Image as ImageIcon, Sparkles, X, Maximize2 } from 'lucide-react';

export default function GalleryPage() {
  const { gallery } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const categories = ['All', 'Events', 'Sankalp', 'Team', 'Workshops', 'Projects'];
  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  const filteredGallery = gallery.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || item.year.toString() === selectedYear;
    return matchesCategory && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Visual Media & Event Moments</span>
        </div>
        <AnimeHeading
          text="Photo"
          highlightText="Gallery"
          subtitle="Captured memories from workshops, hackathons, Sankalp tech fests, team orientations, and project exhibitions."
        />
      </div>

      {/* FILTER BAR */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* CATEGORY TABS */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* YEAR SELECTOR */}
        <div className="w-full md:w-48">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                Year: {yr}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* GALLERY GRID */}
      {filteredGallery.length > 0 ? (
        <AnimeStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.image)}
              className="glass-card shine-hover overflow-hidden group cursor-pointer relative"
            >
              <div className="relative h-60 w-full bg-slate-800">
                <SafeImage
                  src={item.image}
                  fallbackSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt={item.title}
                  fill
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-slate-900/80 text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
                <div className="flex items-center justify-between text-[11px] font-semibold text-purple-600 dark:text-purple-400 mb-1">
                  <span>{item.category}</span>
                  <span>{item.year}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </AnimeStaggerGrid>
      ) : (
        <div className="glass-card p-12 text-center space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No gallery photos found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select another category or year filter.
          </p>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <SafeImage
              src={activeImage}
              fallbackSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
              alt="Gallery Lightbox Preview"
              fill
              fit="contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
