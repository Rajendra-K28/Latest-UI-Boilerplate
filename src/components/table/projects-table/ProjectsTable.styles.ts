import { colors, spacing } from '../../../design-system/tokens';

export const projectsTableStyles = {
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

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    alignSelf: 'stretch' as const,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },

  headerTitle: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    lineHeight: '28px',
    margin: 0,
  },

  countBadge: {
    display: 'flex',
    padding: '2px 8px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    background: colors.primary[50],
    color: colors.primary[600],
    fontSize: '12px',
    fontWeight: '500' as const,
    lineHeight: '18px',
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
    display: 'inline-flex',
    alignItems: 'stretch' as const,
    background: '#F2F4F7',
    borderRadius: '6px',
    border: '1px solid #E4E7EC',
    overflow: 'hidden' as const,
    flexShrink: 0,
  },

  filterTab: (isActive: boolean, isLast: boolean) => ({
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: isActive ? ('600' as const) : ('500' as const),
    border: 'none',
    cursor: 'pointer' as const,
    background: isActive ? '#F9FAFB' : 'transparent',
    color: isActive ? '#344054' : '#667085',
    boxShadow: 'none',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.2s ease',
    borderRight: isLast ? 'none' : '1px solid #E4E7EC',
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
    gridTemplateColumns: '180px 1fr 200px 200px 200px 140px 40px',
    columnGap: '4px',
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
    gridTemplateColumns: '180px 1fr 200px 200px 200px 140px 40px',
    columnGap: '4px',
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
    whiteSpace: 'nowrap' as const,
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
};

// Owner cell styles
export const ownerStyles = {
  container: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },

  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    overflow: 'hidden' as const,
    flexShrink: 0,
    background: colors.neutral[100],
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },

  name: {
    color: colors.text.neutral.main,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const,
  },
};
