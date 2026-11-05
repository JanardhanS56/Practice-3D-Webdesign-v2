/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60% Black / Obsidian base
        obsidian: {
          950: '#040605',
          900: '#070A08',
          850: '#0C100D',
          800: '#111712',
          700: '#1A211B',
        },
        // 30% Botanical secondary (charcoal slate, moss, herbal amber)
        botanical: {
          deep: '#121C15',
          surface: '#18251C',
          card: '#1D2E23',
          border: 'rgba(56, 239, 125, 0.15)',
          muted: '#8EA798',
          amber: '#D9943B',
          gold: '#C5A059',
        },
        // 10% Neon / Lime Green accent
        lime: {
          neon: '#38EF7D',
          electric: '#00FF66',
          bright: '#22C55E',
          soft: '#4ADE80',
          dark: '#15803D',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        syne: ['"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'neon-glow': '0 0 25px rgba(56, 239, 125, 0.35)',
        'neon-subtle': '0 0 15px rgba(56, 239, 125, 0.15)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
