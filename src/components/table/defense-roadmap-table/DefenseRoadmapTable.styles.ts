import { colors, spacing } from '../../../design-system/tokens';

export const defenseRoadmapTableStyles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    borderRadius: '16px',
    border: `1px solid ${colors.stroke.neutral.soft}`,
    background: colors.bg.surface.default,
    overflow: 'hidden' as const,
  },

  filterBar: {
    display: 'flex',
    padding: '16px 24px',
    alignItems: 'center' as const,
    alignSelf: 'stretch' as const,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    justifyContent: 'space-between' as const,
  },

  filterTabs: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 0,
    background: colors.bg.surface.gray,
    borderRadius: '8px',
    padding: '2px',
    flexShrink: 0,
  },

  filterTab: (isActive: boolean) => ({
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: '14px',
    fontWeight: '500' as const,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer' as const,
    background: isActive ? colors.bg.surface.default : 'transparent',
    color: isActive ? colors.text.neutral.main : colors.text.neutral.sub,
    boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.2s ease',
  }),

  filterActions: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[3],
    flexShrink: 0,
    flexWrap: 'nowrap' as const,
  },

  searchWrapper: {
    flexShrink: 0,
  },

  dropdownWrapper: {
    flexShrink: 0,
  },

  // Table styles
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr 1fr 180px 40px',
    columnGap: '16px',
    height: '44px',
    padding: '12px 24px',
    alignItems: 'center' as const,
    alignSelf: 'stretch' as const,
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
    gridTemplateColumns: '140px 1fr 1fr 180px 40px',
    columnGap: '16px',
    padding: '16px 24px',
    alignItems: 'center' as const,
    alignSelf: 'stretch' as const,
    borderBottom: '1px solid #EAECF0',
    transition: 'background 0.2s ease',
    minHeight: '64px',
  },

  date: {
    color: colors.text.neutral.sub,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center' as const,
  },

  tableCell: {
    color: colors.text.neutral.main,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center' as const,
  },

  projectName: {
    color: colors.text.neutral.sub,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const,
    display: 'flex',
    alignItems: 'center' as const,
  },

  actionButton: {
    display: 'flex',
    width: '32px',
    height: '32px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '8px',
    border: 'none' as const,
    background: colors.bg.surface.default,
    cursor: 'pointer' as const,
    color: '#344054',
    transition: 'background 0.2s ease',
    position: 'relative' as const,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  },

  actionMenu: {
    position: 'absolute' as const,
    top: '36px',
    right: '0',
    display: 'flex',
    minWidth: '160px',
    padding: '4px',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    borderRadius: '8px',
    border: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.default,
    boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
    zIndex: 10,
  },

  actionMenuItem: {
    display: 'flex',
    padding: '8px 12px',
    alignItems: 'center' as const,
    gap: spacing[2],
    alignSelf: 'stretch' as const,
    borderRadius: '6px',
    border: 'none' as const,
    background: 'transparent',
    cursor: 'pointer' as const,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
    transition: 'background 0.2s ease',
    width: '100%',
  },

  // Pagination styles
  pagination: {
    display: 'flex',
    padding: '12px 24px 16px 24px',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    alignSelf: 'stretch' as const,
    borderTop: '1px solid #EAECF0',
  },

  paginationButton: (isDisabled: boolean) => ({
    display: 'flex',
    padding: '8px 14px',
    alignItems: 'center' as const,
    gap: spacing[2],
    borderRadius: '8px',
    border: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.default,
    color: isDisabled ? colors.text.neutral.soft : colors.text.neutral.main,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
  }),

  paginationNumbers: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[1],
  },

  paginationNumber: (isActive: boolean) => ({
    display: 'flex',
    width: '40px',
    height: '40px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '8px',
    background: isActive ? colors.primary[50] : 'transparent',
    color: isActive ? colors.primary[600] : colors.text.neutral.main,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    cursor: 'pointer' as const,
    border: isActive ? `1px solid ${colors.primary[600]}` : 'none',
    transition: 'all 0.2s ease',
  }),
};

// Status badge styles
export const statusBadgeStyles = {
  badge: (status: 'overdue' | 'in-progress' | 'scheduled' | 'completed') => {
    const statusConfig = {
      overdue: {
        color: '#B42318',
        background: '#FEF3F2',
        dotColor: '#F04438',
      },
      'in-progress': {
        color: '#175CD3',
        background: '#EFF8FF',
        dotColor: '#2E90FA',
      },
      scheduled: {
        color: '#344054',
        background: '#F2F4F7',
        dotColor: '#667085',
      },
      completed: {
        color: '#027A48',
        background: '#ECFDF3',
        dotColor: '#12B76A',
      },
    };

    const config = statusConfig[status];

    return {
      display: 'inline-flex',
      padding: '2px 8px 2px 6px',
      alignItems: 'center' as const,
      gap: spacing[1],
      borderRadius: '16px',
      background: config.background,
      color: config.color,
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '18px',
    };
  },

  dot: (status: 'overdue' | 'in-progress' | 'scheduled' | 'completed') => {
    const dotColors = {
      overdue: '#F04438',
      'in-progress': '#2E90FA',
      scheduled: '#667085',
      completed: '#12B76A',
    };

    return {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: dotColors[status],
      flexShrink: 0,
    };
  },
};
