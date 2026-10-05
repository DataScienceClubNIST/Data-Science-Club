'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from '@/components/SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group inline-flex">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-1 border border-cyan-500/40">
                <Image
                  src="/images/logo.png"
                  alt="DSC Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-bold text-xl text-white block">
                  Data Science Club
                </span>
                <span className="text-xs font-semibold text-cyan-400 tracking-wider">
                  NIST UNIVERSITY
                </span>
              </div>
            </Link>

            <p className="text-sm font-semibold text-cyan-400/90 tracking-wide uppercase pt-1">
              Learn. Build. Present. Compete.
            </p>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A student-led technical community at NIST University dedicated to empowering future innovators through practical learning, real-world engineering, and national competitions.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/dsc_nist/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://in.linkedin.com/company/data-science-club-nist-university"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/DataScienceClubNIST"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Sankalp Tech Fest', path: '/sankalp' },
                { name: 'Events Archive', path: '/events' },
                { name: 'Achievements', path: '/achievements' },
                { name: 'Our Team', path: '/team' },
                { name: 'Projects', path: '/projects' },
                { name: 'Recruitment', path: '/recruitment' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="hover:text-cyan-400 transition-colors duration-200 inline-flex items-center space-x-1"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DOMAINS */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2.5">
              Domains
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                'Data Science',
                'Machine Learning',
                'Deep Learning',
                'OpenCV',
                'Web Development'
              ].map((domain) => (
                <li key={domain}>
                  <Link
                    href={`/projects?domain=${encodeURIComponent(domain)}`}
                    className="hover:text-purple-400 transition-colors duration-200"
                  >
                    {domain}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONNECT & LOCATION */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Contact NIST
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span>NIST University Campus, Palur Hills, Berhampur, Odisha 761008</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:data.science.club@nist.edu" className="hover:text-white transition-colors">
                  data.science.club@nist.edu
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>Send Message via Gmail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* COPYRIGHT BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} Data Science Club, NIST University. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>Official Student Organization • NIST University</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
