'use client';

import React, { useEffect, useRef } from 'react';
import { animate, stagger, random } from 'animejs';

export default function AnimeHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    // 1. Anime.js v4 entrance stagger for nodes & circles
    animate('.anime-node', {
      scale: [0, 1],
      opacity: [0, 0.9],
      translateY: [20, 0],
      delay: stagger(120, { start: 200 }),
      duration: 1200,
      ease: 'outElastic(1, .6)'
    });

    // 2. Animated SVG connecting lines
    animate('.anime-line', {
      strokeDashoffset: [400, 0],
      ease: 'inOutSine',
      duration: 1800,
      delay: stagger(150, { start: 400 }),
      alternate: true,
      loop: true
    });

    // 3. Continuous floating orbit animation for neural nodes
    animate('.anime-float', {
      translateY: () => random(-15, 15),
      translateX: () => random(-15, 15),
      duration: () => random(3000, 5000),
      ease: 'inOutQuad',
      alternate: true,
      loop: true
    });

    // 4. Pulsing aura ring
    animate('.anime-pulse-ring', {
      scale: [0.9, 1.15],
      opacity: [0.3, 0.8],
      duration: 2500,
      ease: 'inOutSine',
      alternate: true,
      loop: true
    });

    // 5. Interactive magnetic mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;

      animate('.anime-interactive-layer', {
        translateX: x,
        translateY: y,
        duration: 800,
        ease: 'outQuad'
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center select-none"
    >
      {/* Background Glowing Aura Ring */}
      <div className="anime-pulse-ring absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl" />

      {/* SVG Connecting Neural Lines */}
      <svg 
        ref={svgRef} 
        className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/40 dark:stroke-cyan-400/40"
      >
        <path className="anime-line" d="M 60,80 Q 200,40 340,120 T 450,300" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" fill="none" />
        <path className="anime-line" d="M 80,320 Q 220,240 320,360 T 480,100" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" fill="none" />
        <path className="anime-line" d="M 150,50 L 300,220 L 420,80" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </svg>

      {/* Interactive Layer of Anime.js Nodes */}
      <div className="anime-interactive-layer relative w-full h-full flex items-center justify-center">
        
        {/* Center Main Node */}
        <div className="anime-node anime-float absolute w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-slate-900/90 dark:bg-slate-900/90 border border-cyan-500/50 shadow-2xl shadow-cyan-500/30 flex flex-col items-center justify-center text-center p-3 backdrop-blur-xl z-20">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg mb-1">
            DS
          </div>
          <span className="text-[11px] font-extrabold text-white tracking-wider uppercase">NIST DSC</span>
          <span className="text-[9px] text-cyan-400 font-mono">EST. 2020</span>
        </div>

        {/* Orbit Node 1: Data Science */}
        <div className="anime-node anime-float absolute -top-2 left-6 sm:left-12 px-3 py-2 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Data Science</span>
        </div>

        {/* Orbit Node 2: Machine Learning */}
        <div className="anime-node anime-float absolute top-12 right-4 sm:right-10 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/40 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span>Machine Learning</span>
        </div>

        {/* Orbit Node 3: Deep Learning */}
        <div className="anime-node anime-float absolute bottom-8 left-8 sm:left-16 px-3 py-2 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/40 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <span>Deep Learning</span>
        </div>

        {/* Orbit Node 4: OpenCV */}
        <div className="anime-node anime-float absolute -bottom-4 right-8 sm:right-20 px-3 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>OpenCV</span>
        </div>

        {/* Orbit Node 5: Web Dev */}
        <div className="anime-node anime-float absolute top-1/2 -right-2 transform -translate-y-1/2 px-3 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Web Dev</span>
        </div>

      </div>
    </div>
  );
}
