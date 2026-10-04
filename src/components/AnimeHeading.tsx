'use client';

import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface AnimeHeadingProps {
  text: string;
  highlightText?: string;
  className?: string;
  subtitle?: string;
}

export default function AnimeHeading({ text, highlightText, className = "text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white", subtitle }: AnimeHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const letters = headingRef.current.querySelectorAll('.anime-letter');
    if (letters.length > 0) {
      animate(Array.from(letters), {
        translateY: [20, 0],
        opacity: [0, 1],
        rotateZ: [10, 0],
        delay: stagger(25, { start: 150 }),
        duration: 750,
        ease: 'outQuad'
      });
    }

    const subtitleEl = headingRef.current.querySelector('.anime-subtitle');
    if (subtitleEl && subtitle) {
      animate(subtitleEl, {
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 800,
        delay: 400,
        ease: 'outCubic'
      });
    }
  }, [text, highlightText, subtitle]);

  return (
    <div ref={headingRef} className="space-y-2">
      <h2 className={className}>
        {text.split('').map((char, index) => (
          <span key={`t-${index}`} className="anime-letter inline-block opacity-0">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {highlightText && (
          <span className="gradient-text ml-2">
            {highlightText.split('').map((char, index) => (
              <span key={`h-${index}`} className="anime-letter inline-block opacity-0">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="anime-subtitle opacity-0 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
