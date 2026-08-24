/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0e18',
          850: '#0e1320',
          800: '#121829',
          700: '#1a2238',
          600: '#283150',
        },
        cyan: { glow: '#00F0FF' },
        violet: { glow: '#8B5CF6' },
        emerald: { glow: '#10B981' },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0,0,0,0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0,0,0,0.25)',
        glow: '0 0 24px 0 rgba(0,240,255,0.35)',
        'glow-violet': '0 0 24px 0 rgba(139,92,246,0.35)',
        'glow-emerald': '0 0 24px 0 rgba(16,185,129,0.35)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%': { transform: 'scale(1.25)', opacity: '0' },
          '100%': { transform: 'scale(1.25)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4,0,0.6,1) infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
};
