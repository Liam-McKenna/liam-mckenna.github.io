/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0b16',
        surface: '#151327',
        surface2: '#1e1a3a',
        accent: {
          DEFAULT: '#7c3aed',
          soft: '#a78bfa',
          bright: '#c4b5fd',
        },
        highlight: '#ff9f5a',
        border: '#2c2650',
        muted: '#8b86ab',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

