/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec3ff',
          400: '#599fff',
          500: '#0052ff', // Electric Blue
          600: '#0043d9',
          700: '#0035ad',
          800: '#002c8c',
          900: '#001a54',
          accent: '#00D2FF',
        },
        dark: {
          bg: '#080C14',
          surface: '#0F1626',
          card: '#141C2E',
          border: '#1E293B',
          text: '#F1F5F9',
          muted: '#94A3B8',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(0, 82, 255, 0.08) 1px, transparent 1px)",
        'tech-glow': "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 82, 255, 0.15), transparent)",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
