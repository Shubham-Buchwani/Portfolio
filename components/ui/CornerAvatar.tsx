'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A pure HTML/CSS avatar that animates from the top-right corner
 * when the user scrolls past the hero section.
 * Completely decoupled from Three.js — no camera math, no jitter.
 * Desktop only.
 */
export default function CornerAvatar() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    const onScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      // Show corner avatar after hero is 40% scrolled past
      const heroBottom = hero.getBoundingClientRect().bottom;
      const threshold = window.innerHeight * 0.6;
      setVisible(heroBottom < threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.5rem',
        zIndex: 45,
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid rgba(124, 58, 237, 0.4)',
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(-20px)',
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        pointerEvents: 'none',
        background: 'rgba(6, 4, 15, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <img
        src="/images/avatar.png"
        alt="Shubham Buchwani"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
        }}
      />
    </div>
  );
}
