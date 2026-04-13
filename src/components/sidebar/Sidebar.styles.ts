import { colors, spacing } from '../../design-system/tokens';

export const sidebarStyles = {
  container: {
    display: 'flex',
    width: '240px',
    height: '100vh',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    background: colors.bg.sidebar.main,
    padding: `${spacing[4]} ${spacing[3]}`,
    gap: spacing[4],
    overflow: 'auto' as const,
    flexShrink: 0,
  },

  logo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: `${spacing[4]} 0`,
  },

  logoImage: {
    maxWidth: '140px',
    height: 'auto',
  },

  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[1],
  },

  sectionLabel: {
    color: '#8796AF',
    fontSize: '11px',
    fontWeight: '500',
    lineHeight: '14px',
    letterSpacing: '0.72px',
    textAlign: 'left' as const,
    marginBottom: spacing[1],
    textTransform: 'uppercase' as const,
  },

  projectName: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    textAlign: 'left' as const,
    padding: `${spacing[2]} 0`,
  },

  divider: {
    width: '100%',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
    margin: `${spacing[2]} 0`,
  },
};

// Organization selector styles
export const organizationStyles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[2],
  },

  label: {
    color: '#8796AF',
    fontSize: '11px',
    fontWeight: '500',
    lineHeight: '14px',
    letterSpacing: '0.72px',
    textAlign: 'left' as const,
    textTransform: 'uppercase' as const,
  },

  container: {
    display: 'flex',
    padding: '8px 10px',
    alignItems: 'center' as const,
    gap: '10px',
    alignSelf: 'stretch' as const,
    borderRadius: '6px',
    border: `1px solid ${colors.stroke.neutral.lighter}`,
    background: `linear-gradient(92deg, ${colors.gradient.blue.start} 1.74%, ${colors.gradient.blue.end} 79.83%), ${colors.bg.surface.default}`,
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
  },

  iconWrapper: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    background: '#FF6B4A',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },

  icon: {
    width: '20px',
    height: '20px',
    color: colors.bg.surface.default,
  },

  content: {
    display: 'flex',
    alignItems: 'center' as const,
    flex: 1,
  },

  name: {
    color: colors.text.neutral.main,
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '18px',
    textAlign: 'left' as const,
    flex: 1,
  },

  arrows: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },

  arrow: {
    width: '16px',
    height: '16px',
    color: colors.neutral[400],
    cursor: 'pointer' as const,
    flexShrink: 0,
  },
};

// Navigation item styles
export const navItemStyles = {
  container: (isActive: boolean, _hasChildren: boolean, level: number = 0) => ({
    display: 'flex',
    padding: '6px 10px',
    alignItems: 'center' as const,
    gap: '8px',
    flex: '1 0 0' as const,
    alignSelf: 'stretch' as const,
    borderRadius: '6px',
    background: isActive ? colors.bg.sidebar.navSelected : colors.bg.sidebar.navDefault,
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
    marginLeft: level > 0 ? spacing[3] : '0',
    position: 'relative' as const,
  }),

  icon: (_isActive: boolean) => ({
    width: '20px',
    height: '20px',
    color: colors.text.sidebar.default,
    flexShrink: 0,
    transition: 'color 0.2s ease',
  }),

  label: (_isActive: boolean) => ({
    color: colors.text.sidebar.default,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    flex: 1,
    textAlign: 'left' as const,
    transition: 'all 0.2s ease',
  }),

  badge: {
    display: 'flex',
    padding: '2px 8px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '12px',
    background: '#FF6B4A',
    color: colors.bg.surface.default,
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    minWidth: '20px',
  },

  chevron: (isExpanded: boolean) => ({
    width: '16px',
    height: '16px',
    color: colors.text.sidebar.default,
    flexShrink: 0,
    transition: 'transform 0.2s ease',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
};
