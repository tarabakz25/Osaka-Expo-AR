/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c0dfff',
          300: '#9fcfff',
          400: '#6fb8e3',
          500: '#4a80f5',
          600: '#2b4798',
          700: '#1c52b7',
          800: '#4a7ce0',
          900: '#6a9dff',
        },
        'background': '#fff',
        'text-white': '#fff',
        'text-black': '#000',
        'accent': '#4a80f5',
      },
      fontFamily: {
        'sans': ['SF Pro Text', 'sans-serif'],
        'english': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 10s ease-in-out infinite alternate',
        'dissolve': 'dissolve-in 2s ease forwards',
        'fade-in': 'fade-in 1.5s ease forwards',
        'pulse-custom': 'pulse-custom 2s infinite',
      },
      keyframes: {
        'gradient': {
          '0%': { 'background-position': '0% 0%' },
          '25%': { 'background-position': '50% 50%' },
          '50%': { 'background-position': '100% 100%' },
          '75%': { 'background-position': '50% 50%' },
          '100%': { 'background-position': '0% 0%' },
        },
        'dissolve-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-custom': {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.break-keep': {
          'word-break': 'keep-all',
          'overflow-wrap': 'break-word',
        },
        '.touch-pan-y': {
          'touch-action': 'pan-y pinch-zoom',
        },
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 