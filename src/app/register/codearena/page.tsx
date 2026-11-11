'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { EligibleYear } from '@/types';
import { 
  Code2, 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Send, 
  Calendar, 
  MapPin, 
  Trophy, 
  ShieldCheck, 
  Printer,
  ExternalLink
} from 'lucide-react';

const COMMON_BRANCHES = [
  'B.Tech - Computer Science & Engineering (CSE)',
  'B.Tech - CSE (AI & Machine Learning)',
  'B.Tech - CSE (Data Science)',
  'B.Tech - Electronics & Communication (ECE)',
  'B.Tech - Electrical & Electronics (EEE)',
  'B.Tech - Mechanical Engineering',
  'B.Tech - Civil Engineering',
  'Master of Computer Applications (MCA)',
  'B.Sc / BCA Computer Science',
  'Other Stream / Department'
];

export default function CodeArenaRegistrationPage() {
  const { submitCodeArenaRegistration } = useData();

  // Form State
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [year, setYear] = useState<EligibleYear>('1st Year');
  const [phone, setPhone] = useState('');
  const [streamBranch, setStreamBranch] = useState(COMMON_BRANCHES[0]);
  const [customBranch, setCustomBranch] = useState('');
  const [email, setEmail] = useState('');

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePhone = (num: string) => {
    const cleaned = num.trim().replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  };

  const validateEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field 1: Name validation
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    // Field 2: Roll number validation
    if (!roll.trim()) {
      setErrorMessage('Please enter your NIST Roll Number.');
      return;
    }

    // Field 3: Year constraint validation (1st or 2nd year only)
    if (year !== '1st Year' && year !== '2nd Year') {
      setErrorMessage('Code Arena 2.0 is strictly for 1st Year and 2nd Year students.');
      return;
    }

    // Field 4: Phone number validation (10 digits)
    if (!validatePhone(phone)) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    // Field 5: Email ID validation
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const resolvedBranch = streamBranch === 'Other Stream / Department' && customBranch.trim()
      ? customBranch.trim()
      : streamBranch;

    setIsSubmitting(true);
    try {
      const regId = await submitCodeArenaRegistration({
        name: name.trim(),
        roll: roll.trim().toUpperCase(),
        year,
        phone: phone.trim(),
        stream_branch: resolvedBranch,
        email: email.trim().toLowerCase()
      });

      setRegistrationId(regId);
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage('Registration failed. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* TOP NAVIGATION LINK */}
        <div className="flex items-center justify-between">
          <Link
            href="/sankalp"
            className="inline-flex items-center space-x-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sankalp Tech Fest</span>
          </Link>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 font-bold">
            Sankalp 2026 Coding Arena
          </span>
        </div>

        {/* HEADER HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900 p-6 sm:p-10 text-white shadow-2xl">
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Speed Coding Clash</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                1st &amp; 2nd Year Students Only
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Solo Battle
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Code Arena <span className="text-cyan-400">2.0</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Test your algorithmic speed, dynamic programming prowess, and problem-solving grit in a high-octane 2-hour competitive showdown during <strong>Sankalp 2026 Tech Fest</strong>.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400 pt-2">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>March 29, 2026</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>NIST Computer Center (Lab 1 &amp; 2)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Certificates &amp; Prize Pool</span>
              </div>
            </div>
          </div>
        </div>

        {/* ARENA CONTEST BRIEF BANNER */}
        <div className="glass-card p-5 border border-cyan-500/20 bg-cyan-500/5 rounded-2xl flex items-center justify-between gap-4">
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span>Contest Rules &amp; Supported Languages</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              C++, Python, Java &amp; C supported. Platform test instructions will be emailed prior to the fest.
            </p>
          </div>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-lg shrink-0">
            2 Hours Live
          </span>
        </div>

        {/* REGISTRATION FORM OR CONFIRMATION */}
        {registrationId ? (
          <div className="glass-card p-8 sm:p-12 text-center space-y-6 border border-emerald-500/30 bg-emerald-500/5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Registration Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                You&apos;re In the Arena!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                Your entry for Code Arena 2.0 has been successfully recorded. Save your registration number for entry to NIST Computer Center.
              </p>
            </div>

            {/* CONFIRMATION TICKET */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-3 shadow-md">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 font-semibold">Registration ID</span>
                <span className="font-mono font-extrabold text-cyan-600 dark:text-cyan-400 text-sm">
                  {registrationId}
                </span>
              </div>
              <div className="text-xs space-y-1">
                <div><strong className="text-slate-700 dark:text-slate-300">Name:</strong> {name} ({roll})</div>
                <div><strong className="text-slate-700 dark:text-slate-300">Year:</strong> {year}</div>
                <div><strong className="text-slate-700 dark:text-slate-300">Stream &amp; Branch:</strong> {streamBranch}</div>
                <div><strong className="text-slate-700 dark:text-slate-300">Phone:</strong> {phone}</div>
                <div><strong className="text-slate-700 dark:text-slate-300">Email:</strong> {email}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Registration Slip</span>
              </button>
              <Link
                href="/sankalp"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-md"
              >
                Return to Sankalp Fest
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 space-y-6 border border-slate-200 dark:border-slate-800 shadow-xl">
            
            {/* ERROR ALERT */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* FIELD 1: NAME */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                1. Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* FIELD 2: ROLL */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                2. NIST Roll Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2401201102"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white uppercase font-mono"
              />
            </div>

            {/* FIELD 3: YEAR (STRICT 1ST OR 2ND YR CONSTRAINT) */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                3. Year of Study * (Eligibility Constraint)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['1st Year', '2nd Year'] as EligibleYear[]).map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setYear(yr)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      year === yr
                        ? 'bg-cyan-600 text-white border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-amber-500 mt-1 block">
                Exclusively for 1st Year and 2nd Year students.
              </span>
            </div>

            {/* STREAM AND BRANCH */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Stream and Branch *
              </label>
              <select
                value={streamBranch}
                onChange={(e) => setStreamBranch(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white cursor-pointer"
              >
                {COMMON_BRANCHES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {streamBranch === 'Other Stream / Department' && (
                <input
                  type="text"
                  required
                  placeholder="Specify stream and branch..."
                  value={customBranch}
                  onChange={(e) => setCustomBranch(e.target.value)}
                  className="mt-2 w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                />
              )}
            </div>

            {/* FIELD 4: PHONE NUMBER */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                4. Phone Number * (10 Digits)
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white font-mono"
              />
            </div>

            {/* FIELD 5: EMAIL ID */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                5. Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. yourname@nist.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Contest access credentials will be delivered to this email address.
              </span>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    <span>Confirming Registration...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Register for Code Arena 2.0</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

