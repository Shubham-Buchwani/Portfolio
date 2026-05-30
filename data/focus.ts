export type FocusArea = {
  label: string;
  description: string;
  icon: string;
};

export const focusAreas: FocusArea[] = [
  {
    label: 'Systems Architecture',
    description: 'Designing distributed systems that scale without breaking.',
    icon: '⚡',
  },
  {
    label: 'Security Engineering',
    description: 'Building security into the architecture, not bolting it on after.',
    icon: '🛡️',
  },
  {
    label: 'Product Thinking',
    description: 'Bridging the gap between technical possibility and user value.',
    icon: '💎',
  },
  {
    label: 'AI Infrastructure',
    description: 'Exploring LLM toolchains, agent systems, and inference at scale.',
    icon: '🧠',
  },
];
