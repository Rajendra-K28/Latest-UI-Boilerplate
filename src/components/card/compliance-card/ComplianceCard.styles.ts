import { colors, spacing, radius } from '../../../design-system/tokens';

export const complianceCardStyles = {
  container: (isChecked: boolean) => ({
    display: 'flex',
    width: '370px',
    height: '318px',
    padding: spacing[6],
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[5],
    borderRadius: radius.xl,
    border: isChecked 
      ? `2px solid ${colors.primary[600]}`
      : `1px solid ${colors.stroke.neutral.soft}`,
    background: colors.bg.surface.default,
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
    position: 'relative' as const,
  }),

  header: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    width: '100%',
  },

  badgePill: (backgroundColor: string, textColor: string) => ({
    display: 'inline-flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '4px 10px',
    borderRadius: 999,
    background: backgroundColor,
    color: textColor,
    fontSize: '12px',
    fontWeight: 600 as const,
    lineHeight: '16px',
  }),

  iconWrapper: (backgroundColor: string) => ({
    display: 'flex',
    width: '48px',
    height: '48px',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    flexShrink: 0,
    borderRadius: '24px',
    background: backgroundColor,
  }),

  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[2],
    alignSelf: 'stretch' as const,
  },

  title: (isChecked: boolean) => ({
    color: isChecked ? colors.primary[600] : colors.text.neutral.main,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '18px',
    letterSpacing: '-0.449px',
    alignSelf: 'stretch' as const,
    textAlign: 'left' as const,
  }),

  description: {
    color: colors.text.neutral.soft,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    letterSpacing: '-0.15px',
    textAlign: 'left' as const,
  },

  tags: {
    display: 'flex',
    alignItems: 'flex-start' as const,
    alignContent: 'flex-start' as const,
    gap: spacing[2],
    flexWrap: 'wrap' as const,
    alignSelf: 'stretch' as const,
  },

  tag: {
    display: 'inline-flex' as const,
    padding: '4px 10.445px 4px 10px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '16777200px',
    background: colors.neutral[100],
    color: colors.neutral[400],
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
  },

  selectedRow: {
    marginTop: spacing[0],
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[1],
    color: colors.primary[600],
    fontSize: '13px',
    fontWeight: 500 as const,
  },

  selectedDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: colors.primary[600],
  },

  projectSlotsSection: {
    marginTop: spacing[0],
    width: '100%',
  },

  projectSlotsHeader: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    fontSize: '12px',
    color: colors.text.neutral.soft,
  },

  projectSlotsLabel: {
    fontWeight: 500 as const,
  },

  projectSlotsValue: {
    fontWeight: 500 as const,
    color: colors.text.neutral.main,
  },

  projectSlotsTrack: {
    marginTop: 6,
    width: '100%',
    height: 4,
    borderRadius: 999,
    background: colors.neutral[100],
    overflow: 'hidden',
  },

  projectSlotsFill: (percentage: number, isChecked: boolean) => ({
    width: `${Math.max(0, Math.min(100, percentage))}%`,
    height: '100%',
    borderRadius: 'inherit',
    background: isChecked ? colors.primary[600] : colors.primary[50],
    transition: 'width 0.2s ease',
  }),
};
