'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import { ClubEvent, SankalpEvent } from '@/types';
import { Calendar, MapPin, ExternalLink, Trophy, X } from 'lucide-react';
import { formatExternalUrl } from '@/lib/urlUtils';

interface EventCardProps {
  event: ClubEvent | SankalpEvent;
  isSankalp?: boolean;
}

export default function EventCard({ event, isSankalp = false }: EventCardProps) {
  const [showModal, setShowModal] = useState(false);
  const category = 'category' in event ? event.category : 'Sankalp Tech Fest';

  return (
    <>
      <div className="glass-card shine-hover overflow-hidden flex flex-col justify-between group">
        {/* POSTER DISPLAY CONTAINER - Flexible aspect ratio with dual-layer contain */}
        <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          {/* Layer 1: Ambient Backdrop Blur (fills letterboxing naturally with poster colors) */}
          <div className="absolute inset-0 overflow-hidden filter blur-xl scale-110 opacity-35 dark:opacity-40 pointer-events-none">
            <SafeImage
              src={event.image}
              fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
              alt=""
              fill
              fit="cover"
            />
          </div>

          {/* Layer 2: Full Crisp Poster (fit="contain" ensures 100% of event poster text/dates/graphics are visible) */}
          <div className="relative z-10 w-full h-full p-2 flex items-center justify-center">
            <SafeImage
              src={event.image}
              fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
              alt={event.title}
              fill
              fit="contain"
              className="group-hover:scale-[1.03] transition-transform duration-500 drop-shadow-md"
            />
          </div>

          {/* Subtle gradient vignette at top and bottom edges so badges and content blend elegantly */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none z-10" />
          
          {/* Top badges floating with z-20 */}
          <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 items-center">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/90 text-white shadow-md">
              {event.year}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/85 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow-sm">
              {category}
            </span>
            {event.status && (
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${
                  event.status === 'Register Now'
                    ? 'bg-emerald-500/90 text-white border-emerald-400/50'
                    : event.status === 'Coming soon...'
                    ? 'bg-amber-500/90 text-slate-950 border-amber-400/50 font-extrabold'
                    : 'bg-rose-500/90 text-white border-rose-400/50'
                }`}
              >
                {event.status}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>{event.date}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {event.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4">
              <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-slate-400" />
              <span className="truncate">{event.venue}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 min-w-[90px] py-2 px-3 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-center"
              >
                View Details
              </button>

              {event.contest_link && (
                <a
                  href={formatExternalUrl(event.contest_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center space-x-1 shrink-0 shadow-sm hover:shadow-purple-500/20"
                  title="Open Contest Arena / Platform"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>Contest</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {event.status === 'Registration Closed' ? (
                <button
                  disabled
                  className="py-2 px-2.5 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-800 cursor-not-allowed shrink-0"
                >
                  Closed
                </button>
              ) : event.status === 'Coming soon...' ? (
                <button
                  disabled
                  className="py-2 px-2.5 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 cursor-not-allowed shrink-0"
                >
                  Soon
                </button>
              ) : (
                event.registration_link && (
                  <a
                    href={formatExternalUrl(event.registration_link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center justify-center space-x-1 shrink-0 shadow-sm hover:shadow-cyan-500/20"
                    title="Open Registration Portal"
                  >
                    <span>Register</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EVENT DETAIL MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-900/85 text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60 shadow-lg"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* MODAL POSTER SHOWCASE - Dual Layer Contain with Ambient Backlight */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] min-h-[220px] max-h-[460px] w-full bg-slate-950 flex items-center justify-center overflow-hidden shrink-0">
              {/* Layer 1: Ambient background blur */}
              <div className="absolute inset-0 overflow-hidden filter blur-2xl scale-110 opacity-35 dark:opacity-40 pointer-events-none">
                <SafeImage
                  src={event.image}
                  fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  fill
                  fit="cover"
                />
              </div>

              {/* Layer 2: Full crisp uncropped poster */}
              <div className="relative z-10 w-full h-full p-3 flex items-center justify-center">
                <SafeImage
                  src={event.image}
                  fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt={event.title}
                  fill
                  fit="contain"
                  className="drop-shadow-2xl"
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-white shadow-sm">
                    Year {event.year}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {category}
                  </span>
                  {event.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        event.status === 'Register Now'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : event.status === 'Coming soon...'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {event.status}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {event.title}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-medium bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  <span className="text-slate-700 dark:text-slate-300">{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span className="text-slate-700 dark:text-slate-300">{event.venue}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Event Overview</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {event.result && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-1">
                    <Trophy className="w-4 h-4" />
                    <span>Outcome / Highlights</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {event.result}
                  </p>
                </div>
              )}

              {event.contest_link && (
                <div className="pt-2">
                  <a
                    href={formatExternalUrl(event.contest_link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>Enter Contest Arena / Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-1">
                    Opens separate contest challenge link in a new tab
                  </p>
                </div>
              )}

              {event.registration_link && (
                <div className="pt-2">
                  <a
                    href={formatExternalUrl(event.registration_link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
                  >
                    <span>Proceed to Official Registration</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-1">
                    Opens external registration portal in a new tab
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
