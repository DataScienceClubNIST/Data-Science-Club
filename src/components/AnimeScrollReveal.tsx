'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface AnimeScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip-up';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function AnimeScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.15
}: AnimeScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Determine initial transform & animation params based on variant
            let initialParams: Record<string, any> = { opacity: [0, 1] };

            switch (variant) {
              case 'fade-up':
                initialParams.translateY = [40, 0];
                break;
              case 'fade-down':
                initialParams.translateY = [-40, 0];
                break;
              case 'fade-left':
                initialParams.translateX = [-50, 0];
                break;
              case 'fade-right':
                initialParams.translateX = [50, 0];
                break;
              case 'zoom-in':
                initialParams.scale = [0.85, 1];
                break;
              case 'flip-up':
                initialParams.rotateX = [30, 0];
                initialParams.translateY = [30, 0];
                break;
              default:
                initialParams.translateY = [40, 0];
            }

            animate(el, {
              ...initialParams,
              duration,
              delay,
              ease: 'outCubic'
            });

            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [variant, delay, duration, threshold, hasAnimated]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}
