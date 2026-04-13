import { colors, spacing } from '../../design-system/tokens';

export const sideDrawerStyles = {
  overlay: (isOpen: boolean, overlayBackground?: string, zIndexBase = 1000) => ({
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: overlayBackground ?? 'rgba(0, 0, 0, 0.5)',
    zIndex: zIndexBase,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? ('visible' as const) : ('hidden' as const),
    transition: 'opacity 0.4s ease-in-out, visibility 0.4s',
    backdropFilter: 'blur(3px)',
  }),
  
  drawer: (isOpen: boolean, width: string, zIndexBase = 1000) => ({
    position: 'fixed' as const,
    top: 0,
    right: 0,
    bottom: 0,
    width: width,
    maxWidth: '100%',
    background: colors.bg.surface.default,
    boxShadow: isOpen ? '-8px 0 32px rgba(0, 0, 0, 0.2)' : '-4px 0 24px rgba(0, 0, 0, 0.15)',
    zIndex: zIndexBase + 1,
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    willChange: 'transform',
  }),
  
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing[5]} ${spacing[6]}`,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    minHeight: '72px',
  },
  
  headerLeft: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: spacing[3],
    flex: 1,
  },
  
  iconWrapper: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary[600],
    background: '#EFF4FF',
    borderRadius: '8px',
  },
  
  title: {
    fontSize: '20px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    margin: 0,
  },
  
  headerTextWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    width: '100%',
  },
  
  subtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    margin: 0,
  },
  
  closeButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.text.neutral.sub,
    transition: 'all 0.2s ease',
  },
  
  body: {
    flex: 1,
    overflow: 'auto',
    padding: spacing[6],
    textAlign: 'left' as const,
  },
  
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing[3],
    padding: `${spacing[4]} ${spacing[6]}`,
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.gray,
  },
};
