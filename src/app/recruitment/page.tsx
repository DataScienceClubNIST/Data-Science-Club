'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { DomainType } from '@/types';
import { 
  UserPlus, 
  CheckCircle2, 
  Send, 
  Calendar, 
  AlertCircle, 
  FileText, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from '@/components/SocialIcons';

export default function RecruitmentPage() {
  const { recruitmentSettings, submitApplication } = useData();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [batch, setBatch] = useState('2027');
  const [primaryDomain, setPrimaryDomain] = useState<DomainType>('Data Science');
  const [secondaryDomain, setSecondaryDomain] = useState<DomainType>('Machine Learning');
  const [skills, setSkills] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [motivation, setMotivation] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !phone || !skills || !motivation) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplication({
        full_name: fullName,
        email,
        phone,
        department,
        batch,
        primary_domain: primaryDomain,
        secondary_domain: secondaryDomain,
        skills,
        linkedin,
        github,
        portfolio,
        motivation,
        resume_url: resumeUrl
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset
      setFullName('');
      setEmail('');
      setPhone('');
      setSkills('');
      setMotivation('');
      setResumeUrl('');
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
          <UserPlus className="w-4 h-4 text-cyan-500" />
          <span>NIST University Student Recruitment</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Join Data Science Club
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Become part of NIST University&apos;s leading technical team. Build projects, present research, and compete nationwide.
        </p>
      </div>

      {/* STATE 1: RECRUITMENT OPEN */}
      {recruitmentSettings.is_open ? (
        <div className="space-y-8">
          
          {/* BANNER INFO */}
          <div className="glass-card p-6 border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                RECRUITMENT {recruitmentSettings.year} — APPLICATIONS NOW OPEN
              </span>
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start space-x-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span>Application Deadline: {recruitmentSettings.closing_date}</span>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 shrink-0">
              Active Selection Cycle
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          {submitSuccess && (
            <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Application Submitted Successfully!</span>
              </div>
              <p className="text-xs leading-relaxed">
                Thank you for applying to the Data Science Club at NIST University. Our core board will review your profile and contact you via email for interview slots.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 underline cursor-pointer"
              >
                Submit another response
              </button>
            </div>
          )}

          {/* RECRUITMENT FORM */}
          {!submitSuccess && (
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-8">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. PERSONAL INFO */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-l-3 border-cyan-500 pl-3">
                  1. Personal & Academic Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Kumar Sahoo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">NIST Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul.24cse@nist.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Department *</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                      <option value="Computer Science & Technology">Computer Science & Technology (CST)</option>
                      <option value="Electronics & Comm. Engg">Electronics & Comm. Engg (ECE)</option>
                      <option value="Electrical & Electronics Engg">Electrical & Electronics Engg (EEE)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="MCA / IT">MCA / IT Department</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Passing Batch *</label>
                    <select
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="2028">2028 (1st Year)</option>
                      <option value="2027">2027 (2nd Year)</option>
                      <option value="2026">2026 (3rd Year)</option>
                      <option value="2025">2025 (4th Year)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. DOMAIN SELECTION */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-l-3 border-purple-500 pl-3">
                  2. Technical Domain Choices
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Primary Domain Interest *</label>
                    <select
                      value={primaryDomain}
                      onChange={(e) => setPrimaryDomain(e.target.value as DomainType)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Data Science">Data Science</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Deep Learning">Deep Learning</option>
                      <option value="OpenCV">OpenCV</option>
                      <option value="Web Development">Web Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Secondary Domain Interest</label>
                    <select
                      value={secondaryDomain}
                      onChange={(e) => setSecondaryDomain(e.target.value as DomainType)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Data Science">Data Science</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Deep Learning">Deep Learning</option>
                      <option value="OpenCV">OpenCV</option>
                      <option value="Web Development">Web Development</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. SKILLS & LINKS */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-l-3 border-amber-500 pl-3">
                  3. Technical Skills & Portfolio Links
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      Programming Languages & Frameworks *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Python, C++, TensorFlow, PyTorch, OpenCV, React, SQL"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">GitHub Profile URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Portfolio / Resume Link</label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. MOTIVATION */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-l-3 border-emerald-500 pl-3">
                  4. Statement of Interest
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    Why do you want to join the Data Science Club at NIST University? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your goals, previous technical projects, and what you hope to contribute..."
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Application to Supabase...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Recruitment Application</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      ) : (
        /* STATE 2: RECRUITMENT CLOSED */
        <div className="glass-card p-10 sm:p-14 text-center space-y-6 max-w-2xl mx-auto border-rose-500/30">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-500">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Recruitment Currently Closed
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Applications for the Data Science Club at NIST University are currently closed. Follow our official social media channels for future recruitment announcements and upcoming workshops.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold hover:text-cyan-500 flex items-center space-x-2 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500" />
              <span>Instagram</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold hover:text-cyan-500 flex items-center space-x-2 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-500" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold hover:text-cyan-500 flex items-center space-x-2 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
