'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { ChevronDown, Menu, X, Sparkles, UserCheck, FolderGit2, Calendar, ShieldCheck } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function Navbar() {
  const pathname = usePathname();
  const { isAdminLoggedIn, adminUser } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOthersOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOthersOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sankalp', path: '/sankalp' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Our Team', path: '/team' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const dropdownLinks = [
    { name: 'Events', path: '/events', icon: Calendar, desc: 'Historical events & workshops' },
    { name: 'Recruitment', path: '/recruitment', icon: UserCheck, desc: 'Join the Data Science Club' },
    { name: 'Projects', path: '/projects', icon: FolderGit2, desc: 'Student technical builds' },
    { name: 'Gallery', path: '/gallery', icon: Sparkles, desc: 'Photo archives & memories' },
  ];

  const isOthersActive = dropdownLinks.some(link => pathname === link.path);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO & BRANDING */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white p-1 border border-cyan-500/40 group-hover:border-cyan-400 transition-all duration-300 shadow-md group-hover:shadow-cyan-500/20">
              <Image
                src="/images/logo.png"
                alt="Data Science Club Logo"
                fill
                className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Data Science Club
              </span>
              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400/90 tracking-wide">
                NIST University
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* OTHERS DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOthersOpen(!isOthersOpen)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isOthersActive || isOthersOpen
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Others</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOthersOpen ? 'rotate-180 text-cyan-500' : ''}`} />
              </button>

              {/* DROPDOWN MENU */}
              {isOthersOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-1">
                    {dropdownLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsOthersOpen(false)}
                          className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400'
                          }`}
                        >
                          <Icon className="w-5 h-5 mt-0.5 text-cyan-500 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold">{item.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT ACTIONS: ADMIN LINK & THEME TOGGLE */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/admin"
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-cyan-600 dark:hover:text-cyan-400'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{isAdminLoggedIn ? (adminUser?.role || 'Admin Portal') : 'Admin Portal'}</span>
            </Link>
            
            <ThemeToggle />
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex lg:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-cyan-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-300">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                  pathname === link.path
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mb-4">
            <div className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Others
            </div>
            <div className="space-y-1">
              {dropdownLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                      pathname === item.path
                        ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-cyan-500" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex items-center justify-between px-2">
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/30"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
