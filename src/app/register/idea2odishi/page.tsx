'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { EligibleYear } from '@/types';
import { 
  Sparkles, 
  Download, 
  User, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Send, 
  FileText, 
  Calendar, 
  MapPin, 
  Trophy, 
  ShieldCheck,
  Printer
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

const PROBLEM_THEMES = [
  'Digital Governance & Citizen Services for Odisha',
  'AI & Tech in Agriculture (AgriTech Odisha)',
  'Smart Healthcare Access in Rural Regions',
  'Disaster Management & Cyclone Resilience',
  'Smart Tourism, Heritage & Handloom Promotion',
  'Clean Energy, Waste & Water Management',
  'Open Innovation / Student Startup Idea'
];

export default function Idea2OdishiRegistrationPage() {
  const { submitIdea2OdishiRegistration } = useData();

  // Form State
  const [participationType, setParticipationType] = useState<'Solo' | 'Team'>('Solo');

  // Solo / Leader Details
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [streamBranch, setStreamBranch] = useState(COMMON_BRANCHES[0]);
  const [customBranch, setCustomBranch] = useState('');
  const [year, setYear] = useState<EligibleYear>('1st Year');
  const [phone, setPhone] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(PROBLEM_THEMES[0]);
  const [problemStatement, setProblemStatement] = useState('');
  const [pptUrl, setPptUrl] = useState('');

  // Team Member 2 Details
  const [member2Name, setMember2Name] = useState('');
  const [member2Roll, setMember2Roll] = useState('');
  const [member2StreamBranch, setMember2StreamBranch] = useState(COMMON_BRANCHES[0]);
  const [member2CustomBranch, setMember2CustomBranch] = useState('');
  const [member2Year, setMember2Year] = useState<EligibleYear>('1st Year');
  const [member2Phone, setMember2Phone] = useState('');

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePhone = (num: string) => {
    const cleaned = num.trim().replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Constraint 1: Validate Leader / Solo required fields
    if (!name.trim()) {
      setErrorMessage('Please enter participant name.');
      return;
    }
    if (!roll.trim()) {
      setErrorMessage('Please enter your NIST Roll Number.');
      return;
    }
    if (!validatePhone(phone)) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number for the primary participant.');
      return;
    }
    if (!problemStatement.trim()) {
      setErrorMessage('Please provide your problem statement or idea overview.');
      return;
    }

    // Constraint 2: Year constraint check (1st or 2nd year only)
    if (year !== '1st Year' && year !== '2nd Year') {
      setErrorMessage('Participation is strictly restricted to 1st Year and 2nd Year students.');
      return;
    }

    const resolvedBranch = streamBranch === 'Other Stream / Department' && customBranch.trim()
      ? customBranch.trim()
      : streamBranch;

    // Constraint 3: Validate Team Member 2 if team
    let resolvedMember2Branch = '';
    if (participationType === 'Team') {
      if (!member2Name.trim()) {
        setErrorMessage('Please enter Team Member 2 name.');
        return;
      }
      if (!member2Roll.trim()) {
        setErrorMessage('Please enter Team Member 2 roll number.');
        return;
      }
      if (member2Roll.trim().toUpperCase() === roll.trim().toUpperCase()) {
        setErrorMessage('Team Member 2 roll number cannot be the same as the team leader.');
        return;
      }
      if (!validatePhone(member2Phone)) {
        setErrorMessage('Please enter a valid 10-digit phone number for Team Member 2.');
        return;
      }
      if (member2Phone.trim() === phone.trim()) {
        setErrorMessage('Team Member 2 phone number must be different from team leader.');
        return;
      }
      if (member2Year !== '1st Year' && member2Year !== '2nd Year') {
        setErrorMessage('Team Member 2 must also be in 1st Year or 2nd Year.');
        return;
      }

      resolvedMember2Branch = member2StreamBranch === 'Other Stream / Department' && member2CustomBranch.trim()
        ? member2CustomBranch.trim()
        : member2StreamBranch;
    }

    setIsSubmitting(true);
    try {
      const regId = await submitIdea2OdishiRegistration({
        participation_type: participationType,
        name: name.trim(),
        roll: roll.trim().toUpperCase(),
        stream_branch: resolvedBranch,
        year,
        phone: phone.trim(),
        problem_statement: `[${selectedTheme}] ${problemStatement.trim()}`,
        ppt_url: pptUrl.trim() || undefined,
        ...(participationType === 'Team' ? {
          member2_name: member2Name.trim(),
          member2_roll: member2Roll.trim().toUpperCase(),
          member2_stream_branch: resolvedMember2Branch,
          member2_year: member2Year,
          member2_phone: member2Phone.trim()
        } : {})
      });

      setRegistrationId(regId);
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage('Registration failed. Please check your network and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* TOP NAVIGATION LINK */}
        <div className="flex items-center justify-between">
          <Link
            href="/sankalp"
            className="inline-flex items-center space-x-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sankalp Tech Fest</span>
          </Link>
          <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 font-bold">
            Sankalp 2026 Official Form
          </span>
        </div>

        {/* HEADER HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-slate-900 p-6 sm:p-10 text-white shadow-2xl">
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Flagship Ideathon</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                1st &amp; 2nd Year Students Only
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Solo or Team (2 Members)
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Idea2Odishi <span className="text-cyan-400">2026</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Pitch your breakthrough technological or business solutions for Odisha&apos;s digital revolution. Compete before industry judges at <strong>Sankalp 2026 Tech Fest</strong>, NIST University.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400 pt-2">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>March 28, 2026</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>NIST Seminar Hall 1</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Cash Prizes &amp; Incubation Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* DOWNLOAD PPT TEMPLATE SECTION */}
        <div className="glass-card p-6 border-2 border-purple-500/30 bg-purple-500/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
              <FileText className="w-4 h-4" />
              <span>Official Pitch Deck Template Required</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Download the official 5-slide PowerPoint deck template for Idea2Odishi. Prepare your problem statement, technical solution, and roadmap using this standardized structure.
            </p>
          </div>
          <a
            href="/templates/Idea2Odishi_Pitch_Template.pptx"
            download="Idea2Odishi_Pitch_Template.pptx"
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center space-x-2 shrink-0 shadow-lg shadow-purple-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PPT Template (.pptx)</span>
          </a>
        </div>

        {/* REGISTRATION FORM OR SUCCESS SCREEN */}
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
                You&apos;re Registered for Idea2Odishi 2026!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                Your entry has been recorded in the Sankalp 2026 event register. Please save your unique Registration ID below.
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
                <div><strong className="text-slate-700 dark:text-slate-300">Participation:</strong> {participationType}</div>
                <div><strong className="text-slate-700 dark:text-slate-300">Lead Participant:</strong> {name} ({roll})</div>
                <div><strong className="text-slate-700 dark:text-slate-300">Year &amp; Branch:</strong> {year} • {streamBranch}</div>
                {participationType === 'Team' && (
                  <div><strong className="text-slate-700 dark:text-slate-300">Team Member 2:</strong> {member2Name} ({member2Roll})</div>
                )}
                <div><strong className="text-slate-700 dark:text-slate-300">Theme:</strong> {selectedTheme}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Receipt</span>
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
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 space-y-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            
            {/* ERROR ALERT */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* PARTICIPATION TYPE SELECTOR */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                Select Participation Mode *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setParticipationType('Solo')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-3 ${
                    participationType === 'Solo'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-2 ring-cyan-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <User className="w-5 h-5 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Solo Participant</div>
                    <div className="text-[11px] opacity-80">Individual pitch (1 member)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setParticipationType('Team')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-3 ${
                    participationType === 'Team'
                      ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-2 ring-purple-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <Users className="w-5 h-5 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Team (2 Members)</div>
                    <div className="text-[11px] opacity-80">Lead + 1 Team Member</div>
                  </div>
                </button>
              </div>
            </div>

            {/* SECTION 1: LEAD / SOLO PARTICIPANT */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                <User className="w-4 h-4" />
                <span>
                  {participationType === 'Team' ? '1. Team Leader / Primary Contact' : '1. Participant Information'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    NIST Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2401201045"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white uppercase font-mono"
                  />
                </div>
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
                    placeholder="Specify your stream and branch..."
                    value={customBranch}
                    onChange={(e) => setCustomBranch(e.target.value)}
                    className="mt-2 w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* YEAR (1ST OR 2ND YEAR CONSTRAINT) */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Academic Year * (Eligibility Constraint)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['1st Year', '2nd Year'] as EligibleYear[]).map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setYear(yr)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          year === yr
                            ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-amber-500 mt-1 block">
                    Strictly 1st and 2nd Year students only.
                  </span>
                </div>

                {/* PHONE NUMBER (10 DIGIT CONSTRAINT) */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Phone Number * (10 Digits)
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
              </div>
            </div>

            {/* SECTION 2: TEAM MEMBER 2 (IF TEAM PARTICIPATION) */}
            {participationType === 'Team' && (
              <div className="space-y-4 pt-4 border-t border-purple-500/20 bg-purple-500/5 p-4 sm:p-6 rounded-2xl border">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>2. Team Member 2 Information (Co-Participant)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Team Member Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter team member name"
                      value={member2Name}
                      onChange={(e) => setMember2Name(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-purple-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Team Member Roll Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2401201088"
                      value={member2Roll}
                      onChange={(e) => setMember2Roll(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-purple-500 text-slate-900 dark:text-white uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Team Member Stream and Branch *
                  </label>
                  <select
                    value={member2StreamBranch}
                    onChange={(e) => setMember2StreamBranch(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-purple-500 text-slate-900 dark:text-white cursor-pointer"
                  >
                    {COMMON_BRANCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  {member2StreamBranch === 'Other Stream / Department' && (
                    <input
                      type="text"
                      required
                      placeholder="Specify stream and branch..."
                      value={member2CustomBranch}
                      onChange={(e) => setMember2CustomBranch(e.target.value)}
                      className="mt-2 w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-purple-500 text-slate-900 dark:text-white"
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Team Member Year * (1st or 2nd Year)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['1st Year', '2nd Year'] as EligibleYear[]).map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setMember2Year(yr)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            member2Year === yr
                              ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Team Member Phone Number * (10 Digits)
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={member2Phone}
                      onChange={(e) => setMember2Phone(e.target.value.replace(/\D/g, ''))}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-purple-500 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: PROBLEM STATEMENT & SUBMISSION */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>3. Problem Statement &amp; Presentation Pitch</span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Focus Theme / Domain *
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white cursor-pointer"
                >
                  {PROBLEM_THEMES.map((theme) => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Problem Statement Summary &amp; Proposed Idea *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Summarize the core problem you are tackling, who it benefits in Odisha, and your proposed technological or business innovation..."
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  PPT Slide Deck Link (Google Drive / OneDrive - Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={pptUrl}
                  onChange={(e) => setPptUrl(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  You can also bring your downloaded PPT template deck directly to the live event on March 28.
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-purple-500/20 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    <span>Submitting Idea2Odishi Registration...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Complete Idea2Odishi Registration</span>
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

