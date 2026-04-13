import { colors, spacing } from '../../design-system/tokens';

export const pageStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    minHeight: '100%',
    background: colors.bg.surface.gray,
  },
};

export const pageHeaderStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[6],
    background: colors.bg.surface.default,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },

  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[1],
    alignItems: 'flex-start',
  },

  title: {
    color: colors.text.neutral.main,
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '32px',
    margin: 0,
    textAlign: 'left' as const,
  },

  description: {
    color: colors.text.neutral.sub,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    margin: 0,
    textAlign: 'left' as const,
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    flexShrink: 0,
  },
};

export const pageSectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'stretch' as const,
    gap: spacing[4],
    padding: `${spacing[6]} ${spacing[6]} 24px ${spacing[6]}`,
    width: '100%',
  },

  title: {
    color: colors.text.neutral.main,
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '24px',
  },
};

export const pageGridStyles = {
  container: (columns: number = 3, gap: number | string = spacing[6]) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    width: '100%',
  }),
};
