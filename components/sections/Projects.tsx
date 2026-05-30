'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
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
    <section id="projects" className="section section-projects">
      <div className="projects-content">
        <h2 className="section-heading">What I&apos;ve Built</h2>
        <div className="projects-corridor">
          {projects.filter(p => p.featured).map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              className="project-card"
            >
              <div className="project-card-inner">
                <div className="project-card-header">
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-links">
                    {project.links.map((link) => {
                      if (link.url === '#') {
                        return (
                          <span
                            key={link.label}
                            className="project-link-private"
                          >
                            🔒 {link.label}
                          </span>
                        );
                      }
                      return (
                        <a
                          key={link.label}
                          href={link.url}
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                        >
                          {link.label} →
                        </a>
                      );
                    })}
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="project-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
