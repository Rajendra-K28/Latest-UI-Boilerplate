import { colors, spacing, radius } from '../../../design-system/tokens';
import type { FilterCardVariant } from './FilterCard.types';

export const filterCardStyles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[4],
    flexShrink: 1,
    minWidth: 0,
    borderRadius: radius.xl,
    background: colors.bg.surface.default,
    padding: '28px 24px 36px 24px',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    width: '100%',
  },

  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[1],
  },

  value: {
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '40px',
    letterSpacing: '-0.32px',
    color: colors.text.neutral.main,
  },

  label: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    letterSpacing: '-0.084px',
    color: colors.text.neutral.sub,
  },

  footer: {
    marginTop: spacing[2],
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },

  iconWrapper: {
    display: 'flex',
    width: 40,
    height: 40,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 12,
    flexShrink: 0,
  },

  bottomBorder: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '11px',
    alignSelf: 'stretch' as const,
  },
};

export const getVariantColor = (variant: FilterCardVariant): string => {
  const variantColors: Record<FilterCardVariant, string> = {
    blue: colors.blue[500],
    yellow: colors.yellow[500],
    green: colors.green[500],
    red: colors.red[500],
    gray: '#667085',
    gold: '#F2AE40',
  };

  return variantColors[variant];
};

export const getVariantBackgroundColor = (variant: FilterCardVariant): string => {
  // Use the same color as the variant but with 15% opacity for light background
  const baseColor = getVariantColor(variant);

  // Convert hex to rgba with 15% opacity
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, 0.15)`;
};
