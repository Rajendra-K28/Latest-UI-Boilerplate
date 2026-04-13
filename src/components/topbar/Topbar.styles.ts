import { colors, spacing } from '../../design-system/tokens';

export const topbarStyles = {
  container: {
    display: 'flex',
    width: '100%',
    minWidth: 0,
    height: '64px',
    padding: `0 ${spacing[6]}`,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    background: colors.bg.surface.default,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    flexShrink: 0,
    position: 'relative' as const,
    zIndex: 50,
    overflow: 'visible' as const,
  },

  leftSection: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: '10px',
    flex: 1,
    minWidth: 0,
  },

  homeIcon: {
    display: 'flex',
    width: '20px',
    height: '20px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    color: colors.text.breadcrumb,
    cursor: 'pointer' as const,
    flexShrink: 0,
  },

  breadcrumbs: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: '6px',
  },

  breadcrumbHome: {
    display: 'flex',
    alignItems: 'center' as const,
    color: colors.text.breadcrumb,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    cursor: 'pointer' as const,
    transition: 'color 0.2s ease',
  },

  breadcrumbIcon: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    width: 16,
    height: 16,
  },

  breadcrumbItem: (isLast: boolean) => ({
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    color: isLast ? colors.primary[500] : colors.text.breadcrumb,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    cursor: isLast ? 'default' : 'pointer',
    transition: 'color 0.2s ease',
  }),

  separator: {
    display: 'flex',
    alignItems: 'center' as const,
    color: colors.text.breadcrumb,
    fontSize: '14px',
    userSelect: 'none' as const,
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[4],
    flexShrink: 0,
  },

  iconButton: {
    display: 'flex',
    width: '40px',
    height: '40px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    gap: '4px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer' as const,
    transition: 'background 0.2s ease',
    position: 'relative' as const,
  },

  iconButtonIcon: {
    width: '20px',
    height: '20px',
    color: colors.text.neutral.sub,
  },

  notificationBadge: {
    position: 'absolute' as const,
    top: '8px',
    right: '8px',
    display: 'flex',
    minWidth: '16px',
    height: '16px',
    padding: '0 4px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '8px',
    background: '#F04438',
    color: colors.bg.surface.default,
    fontSize: '10px',
    fontWeight: '600',
    lineHeight: '12px',
  },

  notificationWrapper: {
    position: 'relative' as const,
  },

  notificationDropdown: {
    position: 'absolute' as const,
    top: '48px',
    right: 0,
    width: '360px',
    background: colors.bg.surface.default,
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    boxShadow: '0 12px 20px -4px rgba(16, 24, 40, 0.12)',
    zIndex: 1000,
    overflow: 'hidden' as const,
  },

  notificationDropdownHeader: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: '12px 14px',
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },

  notificationTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
  },

  markAllReadButton: {
    border: 'none',
    background: 'transparent',
    color: colors.primary[600],
    fontSize: '12px',
    fontWeight: '600' as const,
    cursor: 'pointer' as const,
  },

  notificationList: {
    maxHeight: '320px',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  },

  notificationItem: (isUnread: boolean) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    gap: '4px',
    padding: '12px 14px',
    border: 'none',
    borderBottom: `1px solid ${colors.stroke.neutral.soft}`,
    background: isUnread ? '#EAF2FF' : colors.bg.surface.default,
    cursor: 'pointer' as const,
    textAlign: 'left' as const,
  }),

  notificationItemHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },

  notificationItemTitle: {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
  },

  notificationItemMessage: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    lineHeight: '18px',
  },

  notificationItemTime: {
    fontSize: '11px',
    color: colors.text.neutral.soft,
  },

  unreadDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: colors.primary[600],
    flexShrink: 0,
  },

  avatar: {
    display: 'flex',
    width: '40px',
    height: '40px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '1000px',
    background: colors.bg.surface.weak,
    cursor: 'pointer' as const,
    overflow: 'hidden' as const,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },

  avatarFallback: {
    color: colors.primary[600],
    fontSize: '14px',
    fontWeight: '600',
  },
};
