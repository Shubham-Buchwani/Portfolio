export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  type: 'learning' | 'cybersecurity' | 'product' | 'current';
};

export const timeline: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Foundation & Security',
    description: 'Learned programming fundamentals with a strong focus on cybersecurity, ethical hacking, and the core mechanics of modern software.',
    type: 'learning',
  },
  {
    year: '2025',
    title: 'Hackathons & Applied OSINT',
    description: 'Moved beyond theory into OSINT, CTFs, and competitive hackathons, shipping my first real-world full-stack products under pressure.',
    type: 'cybersecurity',
  },
  {
    year: '2026',
    title: 'Product Architecture & AI',
    description: 'Shifted focus from isolated code to full product architecture. Began integrating LLMs and designing intelligent, scalable systems for end users.',
    type: 'product',
  },
  {
    year: 'Present',
    title: 'Building Intelligent Systems',
    description: 'Currently building scalable AI-powered platforms, refining my security expertise, and turning complex ideas into production-ready software.',
    type: 'current',
  },
];
