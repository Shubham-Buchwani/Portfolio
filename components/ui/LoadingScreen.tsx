'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { PROFILE } from '@/lib/constants';

type LoadingScreenProps = {
  onComplete: () => void;
  progress?: number;
};

export default function LoadingScreen({ onComplete, progress = 0 }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  // Letter-by-letter name reveal
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    lettersRef.current.forEach((letter, i) => {
      if (letter) {
        tl.fromTo(
          letter,
          { opacity: 0, y: 40, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          i * 0.04
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Update progress bar
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [progress]);

  // Show tagline at 80%
  useEffect(() => {
    if (progress >= 80 && taglineRef.current) {
      gsap.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [progress]);

  // Exit animation at 100%
  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      setIsExiting(true);
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tl.to(containerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.5,
      });
    }
  }, [progress, isExiting, onComplete]);

  const nameChars = PROFILE.name.split('');

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      {/* Name reveal */}
      <div className="loading-name">
        {nameChars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) lettersRef.current[i] = el;
            }}
            className="loading-letter"
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="loading-progress-track">
        <div ref={progressBarRef} className="loading-progress-bar" />
      </div>

      {/* Tagline */}
      <div ref={taglineRef} className="loading-tagline">
        {PROFILE.tagline}
      </div>
    </div>
  );
}
