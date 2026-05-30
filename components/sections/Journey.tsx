'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '@/data/timeline';

gsap.registerPlugin(ScrollTrigger);

const TYPE_COLORS: Record<string, string> = {
  learning: '#7C3AED',
  cybersecurity: '#A855F7',
  product: '#C084FC',
  current: '#F3F0FF',
  startup: '#F3F0FF',
};

export default function Journey() {
  const nodeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.8,
            delay: i * 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
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
    <section id="journey" className="section section-journey">
      <div className="journey-content">
        <h2 className="section-heading">The Journey</h2>
        <div className="timeline">
          <div className="timeline-line" />
          {timeline.map((event, i) => (
            <div
              key={`${event.year}-${event.title}`}
              ref={(el) => { if (el) nodeRefs.current[i] = el; }}
              className={`timeline-node ${i % 2 === 0 ? 'timeline-node-left' : 'timeline-node-right'}`}
            >
              <div className="timeline-dot" style={{ backgroundColor: TYPE_COLORS[event.type] }} />
              <div className="timeline-card">
                <div className="timeline-year">{event.year}</div>
                <span
                  className="timeline-type"
                  style={{ color: TYPE_COLORS[event.type], borderColor: TYPE_COLORS[event.type] }}
                >
                  {event.type}
                </span>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
