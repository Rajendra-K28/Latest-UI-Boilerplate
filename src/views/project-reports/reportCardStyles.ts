import { colors, spacing } from '../../design-system/tokens';

export const reportCardStyles = {
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[5],
    padding: spacing[6],
    background: colors.bg.surface.default,
    border: `1px solid ${colors.stroke.neutral.soft}`,
    borderRadius: '16px',
    transition: 'all 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
  },
  iconWrapper: (bg: string, color: string) => ({
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    background: bg,
    color: color,
  }),
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  title: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    margin: 0,
    textAlign: 'left' as const,
  },
  formatBadge: {
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500' as const,
    background: colors.bg.surface.gray,
    color: colors.text.neutral.sub,
  },
  description: {
    fontSize: '14px',
    lineHeight: '20px',
    color: colors.text.neutral.sub,
    margin: 0,
    textAlign: 'left' as const,
  },
  buttonWrapper: {
    marginTop: 'auto',
  },
};
