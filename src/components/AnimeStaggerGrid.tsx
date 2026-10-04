'use client';

import React, { useEffect, useRef } from 'react';
import { animate, stagger, set } from 'animejs';

interface AnimeStaggerGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function AnimeStaggerGrid({ 
  children, 
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  staggerDelay = 90 
}: AnimeStaggerGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const childrenElements = Array.from(gridEl.children);
    if (childrenElements.length === 0) return;

    // Set initial hidden state for elements
    set(childrenElements, { opacity: 0, translateY: 35, scale: 0.95 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Anime.js v4 Stagger entrance on scroll
            animate(childrenElements, {
              opacity: [0, 1],
              translateY: [35, 0],
              scale: [0.95, 1],
              duration: 750,
              delay: stagger(staggerDelay, { start: 80 }),
              ease: 'outCubic'
            });

            observer.unobserve(gridEl);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(gridEl);

    return () => {
      if (gridEl) observer.unobserve(gridEl);
    };
  }, [children, staggerDelay]);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
}
