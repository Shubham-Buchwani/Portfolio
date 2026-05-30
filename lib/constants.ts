// ─── Color Palette ─────────────────────────────────────────
export const COLORS = {
  base: '#06040F',
  surface: '#0D0A1A',
  primary: '#7C3AED',
  accent: '#A855F7',
  glow: '#C084FC',
  text: '#F3F0FF',
  muted: '#6B7280',
} as const;

// ─── Sections ──────────────────────────────────────────────
export const SECTIONS = [
  { id: 'hero', label: 'HERO', number: '01' },
  { id: 'identity', label: 'IDENTITY', number: '02' },
  { id: 'capabilities', label: 'CAPABILITIES', number: '03' },
  { id: 'differentiator', label: 'DIFFERENTIATOR', number: '04' },
  { id: 'projects', label: 'PROJECTS', number: '05' },
  { id: 'mindset', label: 'MINDSET', number: '06' },
  { id: 'journey', label: 'JOURNEY', number: '07' },
  { id: 'focus', label: 'FOCUS', number: '08' },
  { id: 'contact', label: 'CONTACT', number: '09' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

// ─── Camera Waypoints (Three.js world coordinates) ────────
// Each waypoint: [position, lookAt]
export const CAMERA_WAYPOINTS: Record<
  SectionId,
  { position: [number, number, number]; lookAt: [number, number, number] }
> = {
  hero: { position: [0, 1.5, 8], lookAt: [0, 1.2, 0] },
  identity: { position: [-3, 2, 5], lookAt: [0, 1.5, 0] },
  capabilities: { position: [0, 1.5, 2], lookAt: [0, 1.5, -1] },
  differentiator: { position: [0, 2, 12], lookAt: [0, 1.5, 0] },
  projects: { position: [0, 1.5, -2], lookAt: [0, 1.5, -10] },
  mindset: { position: [0, 1.5, -6], lookAt: [0, 1.5, -8] },
  journey: { position: [0, 5, -8], lookAt: [0, 0, -8] },
  focus: { position: [0, 1.5, -12], lookAt: [0, 1.5, -14] },
  contact: { position: [0, 1, -15], lookAt: [0, 1, -18] },
};

// ─── Animation Timing ──────────────────────────────────────
export const TIMING = {
  sectionTransition: 0.8,
  letterStagger: 0.04,
  fadeIn: 0.6,
  fadeOut: 0.4,
  cursorSpring: 0.15,
  dissolveSpeed: 1.5,
} as const;

// ─── Breakpoints ───────────────────────────────────────────
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ─── GPU Quality Tiers ─────────────────────────────────────
export const GPU_TIERS = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  FALLBACK: 0,
} as const;

export type GPUTier = (typeof GPU_TIERS)[keyof typeof GPU_TIERS];

export const PARTICLE_COUNTS: Record<GPUTier, number> = {
  [GPU_TIERS.HIGH]: 10000,
  [GPU_TIERS.MEDIUM]: 5000,
  [GPU_TIERS.LOW]: 2000,
  [GPU_TIERS.FALLBACK]: 0,
};

// ─── Profile ───────────────────────────────────────────────
export const PROFILE = {
  name: 'SHUBHAM BUCHWANI',
  tagline: 'Full-Stack Software Engineer building AI assistants, custom web platforms, and intelligent systems.',
  email: 'shbuchwani@gmail.com',
  github: 'https://github.com/Shubham-Buchwani',
} as const;
