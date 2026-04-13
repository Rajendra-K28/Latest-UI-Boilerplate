export const colors = {
  // Background colors
  bg: {
    surface: {
      default: '#FFFFFF',
      blue: '#EDF3FF',
      gray: '#F8FAFC',
      weak: '#F7F9FB',
      minor: '#F9FAFB',
      none: 'transparent',
    },
    sidebar: {
      main: '#0E1B35',
      navDefault: '#0E1B35',
      navSelected: '#1B2B4C',
      navHover: 'rgba(255, 255, 255, 0.05)',
    },
  },

  // Stroke/Border colors
  stroke: {
    neutral: {
      soft: '#DEE4EE',
      light: '#E2E8F0',
      lighter: '#E0E7EC',
      minor: '#D0D5DD',
      none: 'transparent',
    },
  },

  // Text colors
  text: {
    neutral: {
      main: '#111625',
      sub: '#667085',
      soft: '#8796AF',
      dark: '#1C2434',
      minor: '#344054',
    },
    sidebar: {
      default: '#C5CFDD',
      active: '#C5CFDD',
    },
    breadcrumb: '#667085',
  },

  // Primary colors
  primary: {
    50: '#E9F0FE',
    500: '#266DF0',
    600: '#2363DA',
    700: '#344054',
  },
  
  // Gradient colors
  gradient: {
    blue: {
      start: 'rgba(38, 109, 240, 0.00)',
      end: 'rgba(38, 109, 240, 0.10)',
    },
    orange: {
      start: '#F1613C',
      end: '#FF8465',
    },
  },

  // Semantic colors for card variants
  blue: {
    500: '#518AF3',
  },
  yellow: {
    500: '#F6C97F',
  },
  green: {
    50: '#EBF9F4',
    400: '#00BC7D',
    500: '#60D2A9',
  },
  red: {
    500: '#EA6780',
  },

  // Neutral colors
  neutral: {
    100: '#EFF3F8',
    400: '#8796AF',
    800: '#314158',
  },
} as const;

export type ColorToken = typeof colors;
