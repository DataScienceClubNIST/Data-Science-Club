'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  ArrowUpRight, 
  ExternalLink
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from '@/components/SocialIcons';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const clubEmail = 'datascienceclub@nist.edu';

  const handleGmailRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !userEmail || !subject || !message) return;

    const emailSubject = encodeURIComponent(`Website Contact: ${subject}`);
    const emailBody = encodeURIComponent(
      `Name: ${name}\nSender Email: ${userEmail}\n\nMessage:\n--------------------------------\n${message}\n--------------------------------\n`
    );

    // Primary: Web Gmail Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${clubEmail}&su=${emailSubject}&body=${emailBody}`;

    // Open Gmail web compose tab
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          <Mail className="w-4 h-4 text-emerald-500" />
          <span>Connect with NIST Data Science Club</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Us
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Have queries about workshops, events, Sankalp tech fest, or club sponsorship? Send us a message directly via Gmail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 1. CONTACT INFORMATION PANEL */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 space-y-6 border-emerald-500/30">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
              Club Contact Information
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Campus Location</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Data Science Club, Dept. of CSE, NIST University, Palur Hills, Berhampur, Odisha 761008
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Official Email</h4>
                  <a href={`mailto:${clubEmail}`} className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline mt-0.5 block">
                    {clubEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Official Social Media Channels
              </h4>
              <div className="flex items-center space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-bold hover:text-pink-500 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-500" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-bold hover:text-blue-500 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-bold hover:text-cyan-500 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FORM PREPARER -> GMAIL REDIRECT */}
        <div className="lg:col-span-7">
          <form onSubmit={handleGmailRedirect} className="glass-card p-8 sm:p-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Send a Message
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Filling this form generates a formatted email and opens your Gmail client to send directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Your Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Subject *</label>
              <input
                type="text"
                required
                placeholder="Inquiry regarding Sankalp Hackathon / Recruitment"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Message Content *</label>
              <textarea
                rows={5}
                required
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* CRITICAL UX DETAIL SPECIFIED BY SRS SECTION 27 */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Continue to Gmail</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              Clicking &ldquo;Continue to Gmail&rdquo; launches a pre-filled compose window addressed to <strong className="text-slate-700 dark:text-slate-300">{clubEmail}</strong>.
            </p>
          </form>
        </div>

      </div>

    </div>
  );
}
