/**
 * Aura Fintech Design System Tokens
 * Extracted & Synthesized from Copilot Money, Revolut, Apple Wallet & Cash App
 * Google Stitch Protocol Implementation
 */

export const designTokens = {
  colors: {
    // Brand & Dominant Accents
    brand: {
      primary: '#6366F1', // indigo-500
      primaryHover: '#4F46E5', // indigo-600
      primaryActive: '#4338CA', // indigo-700
      primarySubtleLight: '#EEF2FF', // indigo-50
      primarySubtleDark: 'rgba(99, 102, 241, 0.12)',
      glow: 'rgba(99, 102, 241, 0.25)',
    },
    // Cash App / Copilot Green (Wealth accumulation, positive yield, income)
    positive: {
      DEFAULT: '#10B981', // emerald-500
      neon: '#00D533', // Cash App vibrant green
      light: '#ECFDF5', // emerald-50
      darkGlow: 'rgba(16, 185, 129, 0.15)',
      textLight: '#047857', // emerald-700
      textDark: '#34D399', // emerald-400
    },
    // Revolut / Apple Wallet Rose (Expenses, budget warning, negative yield)
    negative: {
      DEFAULT: '#F43F5E', // rose-500
      light: '#FFF1F2', // rose-50
      darkGlow: 'rgba(244, 63, 94, 0.15)',
      textLight: '#BE123C', // rose-700
      textDark: '#FB7185', // rose-400
    },
    // Warning & Budget Thresholds
    warning: {
      DEFAULT: '#F59E0B', // amber-500
      light: '#FFFBEB',
      darkGlow: 'rgba(245, 158, 11, 0.15)',
    },
    // Foundations: Light Mode
    light: {
      canvas: '#F8FAFC', // slate-50
      surface: '#FFFFFF', // pure card white
      surfaceSecondary: '#F1F5F9', // slate-100
      surfaceTertiary: '#E2E8F0', // slate-200
      border: 'rgba(226, 232, 240, 0.8)', // slate-200 / 80
      borderHover: '#CBD5E1', // slate-300
      textPrimary: '#0F172A', // slate-900
      textSecondary: '#64748B', // slate-500
      textMuted: '#94A3B8', // slate-400
    },
    // Foundations: Dark Mode (Deep OLED Black & Slate)
    dark: {
      canvas: '#090D16', // Deep Obsidian
      surface: '#111827', // slate-900 / dark zinc card
      surfaceSecondary: '#1F2937', // slate-800
      surfaceTertiary: '#374151', // slate-700
      surfaceGlass: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.08)',
      borderHover: 'rgba(255, 255, 255, 0.16)',
      textPrimary: '#F9FAFB', // slate-50
      textSecondary: '#9CA3AF', // slate-400
      textMuted: '#6B7280', // slate-500
    },
    // Card Gradients (Inspired by Apple Wallet & Revolut Metal)
    gradients: {
      cardTitanium: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      cardObsidianEmerald: 'linear-gradient(135deg, #064e3b 0%, #022c22 60%, #0f172a 100%)',
      cardCyberViolet: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)',
      cardSunsetRose: 'linear-gradient(135deg, #e11d48 0%, #f97316 100%)',
      glassShine: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)',
    }
  },
  typography: {
    fontSans: 'Plus Jakarta Sans, Inter, -apple-system, sans-serif',
    fontMono: 'JetBrains Mono, SF Mono, Consolas, monospace',
    // Always use tabular figures for currency to eliminate number shifting
    fontFeatureSettings: '"tnum", "cv02", "cv03", "cv04"',
    scale: {
      balanceHero: {
        fontSize: '2.75rem', // 44px
        lineHeight: '1.1',
        fontWeight: '800',
        letterSpacing: '-0.03em',
      },
      numpadValue: {
        fontSize: '3.25rem', // 52px
        lineHeight: '1',
        fontWeight: '700',
        letterSpacing: '-0.02em',
      },
      screenTitle: {
        fontSize: '1.5rem', // 24px
        lineHeight: '1.25',
        fontWeight: '700',
        letterSpacing: '-0.02em',
      },
      cardTitle: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.35',
        fontWeight: '600',
        letterSpacing: '-0.01em',
      },
      body: {
        fontSize: '0.9375rem', // 15px
        lineHeight: '1.4',
        fontWeight: '500',
      },
      caption: {
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.35',
        fontWeight: '500',
      },
      micro: {
        fontSize: '0.6875rem', // 11px
        lineHeight: '1.2',
        fontWeight: '600',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }
    }
  },
  geometry: {
    radii: {
      screenContainer: '2.5rem', // 40px (Mobile frame / mock)
      bentoCard: '1.75rem', // 28px (rounded-3xl)
      modalSheet: '2rem', // 32px (rounded-t-[32px])
      cardMedium: '1.25rem', // 20px (rounded-2xl)
      buttonPill: '9999px', // rounded-full (Cash App & Apple style)
      buttonRegular: '0.875rem', // 14px (rounded-xl)
      tagBadge: '0.625rem', // 10px (rounded-lg)
      numpadKey: '1.25rem', // 20px
    },
    spacing: {
      screenPaddingX: '1.25rem', // 20px (px-5)
      bentoGap: '0.875rem', // 14px (gap-3.5)
      cardPadding: '1.25rem', // 20px (p-5)
      pillGap: '0.625rem', // 10px (gap-2.5)
    },
    elevation: {
      subtle: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
      medium: '0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      floatingSheet: '0 20px 48px -12px rgba(0, 0, 0, 0.25), 0 -4px 20px 0 rgba(0, 0, 0, 0.08)',
      neonGlow: '0 0 24px 0 rgba(16, 185, 129, 0.35)',
      violetGlow: '0 0 24px 0 rgba(99, 102, 241, 0.35)',
    }
  },
  motion: {
    // Spring physics calibrated for frictionless, physical feel
    springs: {
      // For bottom-sheets, full dialogs, sliding views
      sheet: {
        type: 'spring' as const,
        stiffness: 340,
        damping: 32,
        mass: 0.85,
      },
      // For quick-snapping buttons, badges, micro-interactions
      bouncy: {
        type: 'spring' as const,
        stiffness: 450,
        damping: 26,
      },
      // For balance counter numbers & progress bars
      smooth: {
        type: 'spring' as const,
        stiffness: 180,
        damping: 24,
      },
      // Tab switcher indicator & layout transitions
      layoutSnappy: {
        type: 'spring' as const,
        stiffness: 500,
        damping: 38,
      }
    },
    durations: {
      instant: 0.1,
      fast: 0.2,
      base: 0.3,
      slow: 0.5,
    }
  }
};
