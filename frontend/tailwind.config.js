/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0066FF',  // Main brand blue
          600: '#0044CC',
          700: '#003399',
          800: '#002266',
          900: '#001133',
        },
        // Dark theme background colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#08080c',  // Main background
        },
        // Accent colors
        accent: {
          red: '#ff4757',
          green: '#2ed573',
          yellow: '#ffa502',
          purple: '#5352ed',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'serif': ['Source Serif 4', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-slide-in': 'fadeSlideIn 0.5s ease-out',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
