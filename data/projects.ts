export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 'forensiq',
    name: 'ForensIQ',
    description: 'An AI integrated anti-malware solution for real-time threat detection and forensic analysis.',
    tech: ['Python', 'Next.js', 'Electron', 'React'],
    links: [
      { label: 'View Project', url: '#' },
    ],
    featured: true,
  },
  {
    id: 'ender',
    name: 'Ender',
    description: 'Full Desktop AI Assistant like Jarvis. Does everything on your PC via voice and automation.',
    tech: ['Python', 'AI/ML', 'Automation', 'Voice Recognition'],
    links: [
      { label: 'View Project', url: '#' },
    ],
    featured: true,
  },
  {
    id: 'codecanvas',
    name: 'CodeCanvas',
    description: 'Intelligent codebase visualizer that maps repository architecture using LLMs and interactive WebGL graphs.',
    tech: ['React', 'Three.js', 'Python', 'OpenAI API'],
    links: [
      { label: 'GitHub', url: '#' },
    ],
    featured: true,
  },
  {
    id: 'saarthi-ai',
    name: 'Saarthi AI',
    description: 'A Bhagavad Gita-based AI chatbot to guide you through your problems by being your Krishna.',
    tech: ['LLMs', 'NLP', 'Python', 'React'],
    links: [
      { label: 'View Project', url: '#' },
    ],
    featured: true,
  },
  {
    id: 'hooligan',
    name: 'Hooligan',
    description: 'Modern, high-performance website for Hooligan drinks with a slick digital experience.',
    tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    links: [
      { label: 'Live Site', url: '#' },
    ],
    featured: true,
  },
  {
    id: 'squadforge',
    name: 'SquadForge',
    description: 'Platform for uniting gamers and helping users find new game buddies and build communities.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'View Project', url: '#' },
    ],
    featured: true,
  },
  {
    id: 'bakery-freelance',
    name: 'Bakery Websites',
    description: 'Custom-built websites for local bakeries to establish their online presence and drive sales.',
    tech: ['Web Design', 'Freelance', 'CMS'],
    links: [
      { label: 'View Project', url: '#' },
    ],
    featured: true,
  },
];
