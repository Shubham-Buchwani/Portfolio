'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  'Ship before perfect.',
  'Systems over scripts.',
  'Curiosity is a strategy.',
  'Complexity is debt.',
  'Build for the next engineer.',
];

export default function Mindset() {
  const principleRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    principleRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section id="mindset" className="section section-mindset">
      <div className="mindset-content">
        <h2 className="section-heading">How I Think</h2>
        <div className="mindset-principles">
          {PRINCIPLES.map((principle, i) => (
            <div
              key={i}
              ref={(el) => { if (el) principleRefs.current[i] = el; }}
              className="mindset-principle"
            >
              {principle}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
