'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE } from '@/lib/constants';
import { useGPU } from '@/components/providers/GPUProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { is3DEnabled } = useGPU();

  useEffect(() => {
    if (!nameRef.current || !taglineRef.current) return;

    const chars = nameRef.current.querySelectorAll('.hero-char');
    const tl = gsap.timeline({ delay: 1.5 });

    // Name assembly — letters slide up and fade in
    tl.fromTo(
      chars,
      { opacity: 0, y: 60, rotateX: -60 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'back.out(1.4)',
      }
    );

    // Tagline fades in
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );



    // Fade out on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '60% top',
      scrub: true,
      onUpdate: (self) => {
        if (nameRef.current) {
          gsap.set(nameRef.current, { opacity: 1 - self.progress });
        }
        if (taglineRef.current) {
          gsap.set(taglineRef.current, { opacity: 1 - self.progress });
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  const nameChars = PROFILE.name.split('');

  return (
    <section id="hero" ref={sectionRef} className="section section-hero">
      <div className="hero-content">
        {/* Space for the 3D avatar (rendered in the Three.js canvas behind) */}
        <div className="hero-avatar-space" aria-hidden="true">
          {!is3DEnabled && (
            <div className="hero-avatar-fallback">
              <div className="hero-avatar-fallback-inner">
                {/* Fallback initials or simple silhouette */}
                <span>SB</span>
              </div>
            </div>
          )}
        </div>

        <h1 ref={nameRef} className="hero-name" aria-label={PROFILE.name}>
          {PROFILE.name.split(' ').map((word, wIdx) => (
            <div key={wIdx} className="hero-word" style={{ overflow: 'hidden', display: 'block' }}>
              {word.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ display: 'inline-block' }}
                  aria-hidden="true"
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <p ref={taglineRef} className="hero-tagline">
          {PROFILE.tagline}
        </p>

        {/* Added Interactive Actions to make Hero less boring */}
        <div className="hero-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', opacity: 0 }} ref={(el) => {
          if (el && taglineRef.current) {
            // Animate buttons in along with tagline
            gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.2, ease: 'power3.out' });
            // Fade out on scroll
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: 'top top',
              end: '60% top',
              scrub: true,
              onUpdate: (self) => { gsap.set(el, { opacity: 1 - self.progress }); }
            });
          }
        }}>
          <button 
            className="btn-primary" 
            data-cursor-hover 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', background: 'var(--color-primary)', color: 'white', fontWeight: 600, border: 'none', cursor: 'none' }}
          >
            View Work
          </button>
          <a 
            href={`mailto:${PROFILE.email}`}
            className="btn-secondary" 
            data-cursor-hover 
            style={{ display: 'inline-block', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', background: 'transparent', color: 'var(--color-text)', fontWeight: 600, border: '1px solid var(--color-muted)', cursor: 'none' }}
          >
            Contact Me
          </a>
        </div>


      </div>
    </section>
  );
}
