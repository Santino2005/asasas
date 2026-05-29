// Color and animation constants for Cognitive Assessment

export const COLORS = {
  // Dark mode base
  background: '#0a0a0a',
  foreground: '#f5f5f5',
  
  // Primary section colors with gradients
  purple: {
    light: '#a78bfa',
    base: '#8b5cf6',
    dark: '#6d28d9',
  },
  yellow: {
    light: '#facc15',
    base: '#eab308',
    dark: '#b8860b',
  },
  green: {
    light: '#4ade80',
    base: '#22c55e',
    dark: '#15803d',
  },
  blue: {
    light: '#60a5fa',
    base: '#3b82f6',
    dark: '#1d4ed8',
  },
  
  // Neutrals
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    900: '#111827',
  },
};

export const ANIMATION_CONFIG = {
  // Standard transition durations
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  
  // Easing functions
  easeInOut: 'easeInOut',
  easeOut: 'easeOut',
  easeIn: 'easeIn',
  
  // Stagger
  staggerDelay: 0.05,
};

export const GLOW_SHADOW = (color: string) => {
  return `0 0 30px rgba(${color}, 0.5), 0 0 60px rgba(${color}, 0.3)`;
};

// Purple RGB (139, 92, 246)
export const PURPLE_RGB = '139, 92, 246';
// Yellow RGB (234, 179, 8)
export const YELLOW_RGB = '234, 179, 8';
// Green RGB (34, 197, 94)
export const GREEN_RGB = '34, 197, 94';
// Blue RGB (59, 130, 246)
export const BLUE_RGB = '59, 130, 246';
