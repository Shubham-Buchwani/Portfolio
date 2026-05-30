'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  { label: 'Full-Stack Engineering', detail: 'React, Next.js, Node, Go, Python' },
  { label: 'Systems Design', detail: 'Distributed systems, event-driven architectures' },
  { label: 'Security Engineering', detail: 'Zero-trust, pentesting, threat modeling' },
  { label: 'Cloud & DevOps', detail: 'AWS, GCP, Kubernetes, Terraform, CI/CD' },
  { label: 'Product Development', detail: 'User research, roadmaps, shipping v1s' },
  { label: 'API Design', detail: 'REST, gRPC, GraphQL, real-time protocols' },
];

export default function Capabilities() {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: i * 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section id="capabilities" className="section section-capabilities">
      <div className="capabilities-content">
        <h2 className="section-heading">What I Do</h2>
        <div className="capabilities-grid">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.label}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              className="capability-card"
            >
              <h3 className="capability-label">{cap.label}</h3>
              <p className="capability-detail">{cap.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
