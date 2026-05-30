'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  { text: "I don't build features.", accent: 'I build products.' },
  { text: "Security isn't an afterthought.", accent: "It's the architecture." },
  { text: "I don't chase trends.", accent: 'I solve problems.' },
  { text: 'Code is a means.', accent: 'Impact is the end.' },
];

export default function Differentiator() {
  const lineRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0, y: 50, skewY: 2 },
          {
            opacity: 1, y: 0, skewY: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: line,
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
    <section id="differentiator" className="section section-differentiator">
      <div className="differentiator-content">
        {STATEMENTS.map((statement, i) => (
          <div
            key={i}
            ref={(el) => { if (el) lineRefs.current[i] = el; }}
            className="differentiator-line"
          >
            <span className="differentiator-text">{statement.text}</span>
            <span className="differentiator-accent">{statement.accent}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
