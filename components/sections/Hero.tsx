'use client';

import { ArrowRight, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE } from '@/lib/constants';
import { openContactModal } from '@/components/ui/ContactModal';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current || !taglineRef.current) return;

    const mm = gsap.matchMedia();
    
    mm.add('(min-width: 769px)', () => {
      const chars = nameRef.current!.querySelectorAll('.hero-char');
      const tl = gsap.timeline({ delay: 0.5 });

      // Name assembly — letters slide up and fade in
      tl.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -60 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.2)',
        }
      );

      // Tagline fades in
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
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
    });

    return () => mm.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const { left, top, width, height } = panelRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(panelRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section id="hero" ref={sectionRef} className="section stitch-hero">
      <div className="stitch-glow-blob stitch-blob-1"></div>
      <div className="stitch-glow-blob stitch-blob-2"></div>
      
      <div className="stitch-hero-content">
        <div className="stitch-typography-section">
          <h1 ref={nameRef} className="stitch-headline" aria-label={PROFILE.name}>
            {PROFILE.name.split(' ').map((word, wIdx) => (
              <div key={wIdx} className="hero-word" style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.25em' }}>
                {word.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char"
                    style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                    aria-hidden="true"
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </h1>
          
          <p ref={taglineRef} className="stitch-tagline" style={{ willChange: 'opacity' }}>
            {PROFILE.tagline}
          </p>
          
          <div className="stitch-actions">
            <button 
              className="stitch-primary-btn" 
              data-cursor-hover
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Work <ArrowRight size={20} />
            </button>
            <button 
              onClick={openContactModal}
              className="stitch-ghost-btn"
              data-cursor-hover
            >
              Contact Me <Mail size={20} />
            </button>
          </div>
        </div>

        <div className="stitch-photo-section">
          <div className="stitch-photo-glow"></div>
          <div 
            ref={panelRef}
            className="stitch-photo-glass-panel"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="stitch-photo-img-wrapper">
              <Image 
                src="/images/profile.jpg" 
                alt={PROFILE.name} 
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                quality={100}
                style={{ objectFit: 'cover' }}
                className="stitch-photo-img" 
                priority
                draggable={false}
              />
            </div>
            <div className="stitch-photo-overlay">
              <div>
                <p className="stitch-overlay-label">Based in</p>
                <p className="stitch-overlay-text">Punjab, India</p>
              </div>
              <div className="stitch-overlay-icon">
                <MapPin size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
