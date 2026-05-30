'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { focusAreas } from '@/data/focus';

gsap.registerPlugin(ScrollTrigger);

export default function Focus() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      // Radar pulse
      if (radarRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          onEnter: () => radarRef.current?.classList.add('radar-active'),
        });
      }

      // Items
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: item,
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
    <section id="focus" ref={sectionRef} className="section section-focus">
      <div className="focus-content">
        <h2 className="section-heading">Current Focus</h2>
        <div className="focus-radar-container">
          <div ref={radarRef} className="radar">
            <div className="radar-ring radar-ring-1" />
            <div className="radar-ring radar-ring-2" />
            <div className="radar-ring radar-ring-3" />
            <div className="radar-center" />
          </div>
          <div className="focus-items">
            {focusAreas.map((area, i) => (
              <div
                key={area.label}
                ref={(el) => { if (el) itemRefs.current[i] = el; }}
                className={`focus-item focus-item-${i}`}
              >
                <span className="focus-icon">{area.icon}</span>
                <h3 className="focus-label">{area.label}</h3>
                <p className="focus-desc">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
