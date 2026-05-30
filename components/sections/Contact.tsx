'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import { PROFILE } from '@/lib/constants';
import { openContactModal } from '@/components/ui/ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      if (!contentRef.current) return;
      const children = Array.from(contentRef.current.children);
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="contact" className="section section-contact">
      <div ref={contentRef} className="contact-content">
        <h2 className="contact-heading">Let&apos;s Build Something</h2>

        <p className="contact-subtext">
          Have a project, an idea, or just want to talk systems?
        </p>

        <div className="contact-links">
          <MagneticButton onClick={openContactModal} className="contact-btn contact-btn-primary">
            <span className="contact-btn-text">Get in Touch</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>

          <div className="contact-social">
            <MagneticButton href={PROFILE.github} className="contact-social-link">GitHub</MagneticButton>
            <MagneticButton onClick={openContactModal} className="contact-social-link">Contact</MagneticButton>
          </div>
        </div>

        <footer className="contact-footer">
          <p>Designed & built by <span className="text-primary">{PROFILE.name}</span></p>
          <p className="contact-footer-year">© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </section>
  );
}
