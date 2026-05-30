'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hammer, ShieldCheck, Gem } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: 'Builder',
    description: 'I ship real products — from architecture to deploy. Not prototypes. Not demos. Systems that serve real users.',
    icon: <Hammer size={40} strokeWidth={1.5} color="var(--color-glow)" />,
  },
  {
    title: 'Security',
    description: 'Security is in my architecture, not an afterthought. Zero-trust, threat modeling, hardened-by-default.',
    icon: <ShieldCheck size={40} strokeWidth={1.5} color="var(--color-glow)" />,
  },
  {
    title: 'Product',
    description: 'Engineering is meaningless without impact. I think from the user backward to the code.',
    icon: <Gem size={40} strokeWidth={1.5} color="var(--color-glow)" />,
  },
];

export default function Identity() {
  const orbRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.fromTo(
          orb,
          { opacity: 0, y: 50, scale: 0.85 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: orb,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="identity" className="section section-identity">
      <div className="identity-content">
        <h2 className="section-heading">Who I Am</h2>
        <div className="identity-grid">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              ref={(el) => { if (el) orbRefs.current[i] = el; }}
              className="identity-orb"
            >
              <div className="identity-orb-glow" />
              <span className="identity-orb-icon">{pillar.icon}</span>
              <h3 className="identity-orb-title">{pillar.title}</h3>
              <p className="identity-orb-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
