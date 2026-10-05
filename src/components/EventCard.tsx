'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import { ClubEvent, SankalpEvent } from '@/types';
import { Calendar, MapPin, ExternalLink, Trophy, X } from 'lucide-react';

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
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
          <SafeImage
            src={event.image}
            fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
            alt={event.title}
            fill
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/90 text-white shadow-md">
              {event.year}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-slate-200 border border-slate-700/60">
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

            <div className="flex items-center space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-center"
              >
                View Details
              </button>

              {event.status === 'Registration Closed' ? (
                <button
                  disabled
                  className="py-2 px-3 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-800 cursor-not-allowed"
                >
                  Closed
                </button>
              ) : event.status === 'Coming soon...' ? (
                <button
                  disabled
                  className="py-2 px-3 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 cursor-not-allowed"
                >
                  Soon
                </button>
              ) : (
                event.registration_link && (
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center justify-center space-x-1"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 w-full bg-slate-950">
              <SafeImage
                src={event.image}
                fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                alt={event.title}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-white">
                    Year {event.year}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-200 border border-slate-700">
                    {category}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">{event.title}</h2>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
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

              {event.registration_link && (
                <div className="pt-2">
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Proceed to Official Registration</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
