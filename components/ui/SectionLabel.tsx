'use client';

import { useEffect, useState } from 'react';
import { SECTIONS } from '@/lib/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionLabel() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Create a ScrollTrigger for each section to track current section
    SECTIONS.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentSection(index),
        onEnterBack: () => setCurrentSection(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (SECTIONS.some((s) => st.trigger === document.getElementById(s.id))) {
          st.kill();
        }
      });
    };
  }, []);

  const section = SECTIONS[currentSection];

  return (
    <div className="section-label">
      <span className="section-label-number">{section.number}</span>
      <span className="section-label-divider">/</span>
      <span className="section-label-text">{section.label}</span>
    </div>
  );
}
