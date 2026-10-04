'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Theme"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      className="px-3.5 py-2 rounded-full transition-all duration-300 bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-cyan-400 border border-slate-300 dark:border-cyan-500/30 shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2 select-none"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="text-xs font-bold text-slate-200">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-800">Dark Mode</span>
        </>
      )}
    </button>
  );
}
