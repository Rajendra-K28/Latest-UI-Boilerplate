import { colors, spacing } from '../../../design-system/tokens';

export const projectSummaryCardStyles = {
  container: (isActive?: boolean) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[2],
    padding: '16px',
    borderRadius: '12px',
    border: isActive ? `2px solid ${colors.primary[500]}` : `1px solid ${colors.stroke.neutral.light}`,
    background: isActive ? '#EFF8FF' : colors.bg.surface.default,
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 0 0 3px rgba(33, 150, 243, 0.1)' : 'none',
  }),

  header: {
    display: 'flex',
    height: '36px',
    paddingLeft: '12px',
    alignItems: 'center' as const,
    gap: spacing[2],
    flexShrink: 0,
    alignSelf: 'stretch' as const,
  },

  headerIcon: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },

  headerText: {
    color: colors.text.neutral.dark,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    letterSpacing: '-0.15px',
  },

  itemsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[2],
    alignSelf: 'stretch' as const,
  },

  item: {
    display: 'flex',
    minHeight: '36px',
    padding: `${spacing[2]} 12px`,
    marginLeft: spacing[4],
    alignItems: 'center' as const,
    gap: spacing[2],
    flexShrink: 0,
    alignSelf: 'stretch' as const,
    borderRadius: '10px',
    background: colors.bg.surface.gray,
  },

  itemIcon: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },

  itemText: {
    color: colors.neutral[800],
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    letterSpacing: '-0.15px',
  },
};
