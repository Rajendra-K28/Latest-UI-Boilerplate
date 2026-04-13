import { colors, spacing } from '../../design-system/tokens';

export const projectsTableStyles = {
  container: {
    display: 'flex',
    width: '1118px',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    borderRadius: '16px',
    border: `1px solid ${colors.stroke.neutral.soft}`,
    background: colors.bg.surface.default,
  },

  header: {
    display: 'flex',
    padding: '20px 24px 19px 24px',
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    alignSelf: 'stretch' as const,
    gap: spacing[4],
  },

  headerLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[1],
  },

  headerTitleRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },

  title: {
    color: colors.text.neutral.main,
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '24px',
  },

  countBadge: {
    display: 'inline-flex',
    padding: '2px 8px',
    alignItems: 'center' as const,
    borderRadius: '12px',
    background: colors.primary[50],
    color: colors.primary[600],
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
  },

  description: {
    color: colors.text.neutral.sub,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },


  // Table styles
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },

  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr 140px 200px 260px',
    columnGap: '16px',
    height: '44px',
    padding: '12px 24px',
    alignItems: 'center' as const,
    alignSelf: 'stretch' as const,
    borderTop: '1px solid #EAECF0',
    borderBottom: '1px solid #EAECF0',
    background: '#F9FAFB',
  },

  tableHeaderCell: {
    color: colors.text.neutral.soft,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    textAlign: 'left' as const,
  },

  tableRow: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr 140px 200px 260px',
    columnGap: '16px',
    padding: '16px 24px',
    alignItems: 'center' as const,
    alignSelf: 'stretch' as const,
    borderBottom: '1px solid #EAECF0',
    transition: 'background 0.2s ease',
    minHeight: '72px',
  },

  projectId: {
    color: colors.text.neutral.sub,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center' as const,
  },

  projectName: {
    color: colors.text.neutral.main,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const,
    display: 'flex',
    alignItems: 'center' as const,
  },

  tableCell: {
    display: 'flex',
    alignItems: 'center' as const,
  },

  // Empty state styles
  emptyState: {
    display: 'flex',
    padding: `${spacing[12]} ${spacing[6]}`,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    gap: spacing[6],
    alignSelf: 'stretch' as const,
  },

  emptyMessage: {
    color: colors.text.neutral.soft,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    textAlign: 'center' as const,
    maxWidth: '400px',
  },
};

// Compliance badge styles
export const complianceBadgeStyles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },

  icon: {
    flexShrink: 0,
  },

  label: {
    color: colors.neutral[800],
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
  },
};

// Progress bar styles
export const progressBarStyles = {
  container: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
    width: '100%',
  },

  barSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[1],
    flex: 1,
  },

  barWrapper: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: colors.stroke.neutral.light,
    overflow: 'hidden' as const,
  },

  bar: (percentage: number) => ({
    height: '100%',
    width: `${percentage}%`,
    background: colors.primary[600],
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  }),

  tasks: {
    color: colors.text.neutral.soft,
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '16px',
  },

  percentage: {
    color: colors.text.neutral.main,
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px',
    minWidth: '45px',
    textAlign: 'right' as const,
  },
};

// Milestone styles
export const milestoneStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: spacing[1],
  },

  title: {
    color: colors.text.neutral.main,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },

  date: (status: string) => {
    const statusColors: Record<string, string> = {
      overdue: '#EA6780',
      today: '#F6C97F',
      tomorrow: '#F6C97F',
      upcoming: colors.text.neutral.soft,
    };

    const statusBackgrounds: Record<string, string> = {
      overdue: '#FFF1F0',
      today: '#FFFBF0',
      tomorrow: '#FFFBF0',
      upcoming: 'transparent',
    };

    return {
      display: 'inline-flex',
      alignItems: 'center' as const,
      gap: spacing[1],
      padding: '4px 12px',
      borderRadius: '100px',
      background: statusBackgrounds[status] || 'transparent',
      color: statusColors[status] || colors.text.neutral.soft,
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '16px',
    };
  },

  dot: (status: string) => {
    const statusColors: Record<string, string> = {
      overdue: '#EA6780',
      today: '#F6C97F',
      tomorrow: '#F6C97F',
      upcoming: colors.text.neutral.soft,
    };

    return {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: statusColors[status] || colors.text.neutral.soft,
      flexShrink: 0,
    };
  },
};
