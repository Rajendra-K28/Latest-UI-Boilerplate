import { colors, spacing } from '../../../design-system/tokens';

export const frameworkCardStyles = {
  // Individual row item with comfortable padding
  row: (isSelected: boolean) => ({
    display: 'flex',
    minHeight: '72px',
    padding: `${spacing[3]} ${spacing[6]}`,
    alignItems: 'center' as const,
    gap: spacing[4],
    flexShrink: 0,
    alignSelf: 'stretch' as const,
    background: isSelected ? colors.bg.surface.blue : colors.bg.surface.default,
    transition: 'background 0.2s ease',
    cursor: 'pointer' as const,
  }),

  textContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[1],
    flex: 1,
  },

  titleRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },

  title: {
    color: colors.text.neutral.main,
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '-0.312px',
  },

  code: {
    color: colors.text.neutral.soft,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },

  description: {
    color: colors.text.neutral.sub,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },
};

// Framework List Container Styles
export const frameworkListStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    alignSelf: 'stretch' as const,
    borderRadius: '14px',
    border: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.default,
    overflow: 'hidden' as const,
  },

  header: {
    display: 'flex',
    minHeight: '72px',
    padding: `${spacing[3]} ${spacing[6]}`,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    alignSelf: 'stretch' as const,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },

  headerTitle: {
    color: colors.text.neutral.main,
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '-0.312px',
  },

  headerCount: {
    color: colors.text.neutral.soft,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },

  deselectLink: {
    color: colors.primary[600],
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    cursor: 'pointer' as const,
    textDecoration: 'none' as const,
    transition: 'opacity 0.2s ease',
  },

  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignSelf: 'stretch' as const,
  },

  divider: {
    height: '1px',
    alignSelf: 'stretch' as const,
    background: colors.stroke.neutral.light,
  },
};
