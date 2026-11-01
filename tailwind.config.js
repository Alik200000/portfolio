/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          void: '#05060A',
          base: '#090B10',
          surface: '#0F131D',
          elevated: '#161C2C',
          active: '#1E263C',
        },
        brand: {
          violet: '#8B5CF6',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
        aura: {
          bg: {
            light: '#F8FAFC',
            dark: '#090D16',
          },
          surface: {
            light: '#FFFFFF',
            dark: '#111827',
            secondaryDark: '#1F2937',
            tertiaryDark: '#374151',
          },
          brand: {
            DEFAULT: '#6366F1',
            hover: '#4F46E5',
            active: '#4338CA',
            subtleLight: '#EEF2FF',
            subtleDark: 'rgba(99, 102, 241, 0.12)',
            glow: 'rgba(99, 102, 241, 0.25)',
          },
          emerald: {
            DEFAULT: '#10B981',
            neon: '#00D533',
            glow: 'rgba(16, 185, 129, 0.2)',
            light: '#ECFDF5',
            darkGlow: 'rgba(16, 185, 129, 0.15)',
          },
          rose: {
            DEFAULT: '#F43F5E',
            glow: 'rgba(244, 63, 94, 0.2)',
            light: '#FFF1F2',
            darkGlow: 'rgba(244, 63, 94, 0.15)',
          },
          warning: {
            DEFAULT: '#F59E0B',
            light: '#FFFBEB',
            darkGlow: 'rgba(245, 158, 11, 0.15)',
          },
        },
      },
      borderRadius: {
        'bento': '1.75rem',  // 28px
        'sheet': '2rem',     // 32px
        'card': '1.25rem',   // 20px
      },
      boxShadow: {
        'aura-glow': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'rose-glow': '0 0 25px -5px rgba(244, 63, 94, 0.3)',
        'card-elevated': '0 12px 32px -8px rgba(0, 0, 0, 0.15)',
        'floating-sheet': '0 20px 48px -12px rgba(0, 0, 0, 0.25), 0 -4px 20px 0 rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
