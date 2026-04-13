export const typography = {
  // Font family is set globally to 'Inter' in globals.css
  // All components inherit from :root
  fontFamily: {
    base: 'Inter',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.32px',
    normal: '0',
    wide: '0.05em',
  },
} as const;

export type TypographyToken = typeof typography;
