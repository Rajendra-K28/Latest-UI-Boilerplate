import { spacing, colors } from '../../design-system/tokens';

export const riskPillColors: Record<
  string,
  { text: string; bg: string; border: string }
> = {
  Critical: {
    text: colors.red[500],
    bg: '#FEF3F2',
    border: '#FECDCA',
  },
  High: {
    text: '#B54708',
    bg: '#FFFAEB',
    border: '#FEDF89',
  },
  Medium: {
    text: '#7A5AF8',
    bg: '#F4EBFF',
    border: '#D9E0FF',
  },
  Low: {
    text: colors.primary[600],
    bg: colors.primary[50],
    border: colors.primary[50],
  },
};

export const criticalAssetsStyles = {
  wrapper: {
    overflow: 'hidden' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: `${spacing[0]} ${spacing[0]} ${spacing[5]} ${spacing[0]}`,
  },
  leftContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[1],
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: colors.text.neutral.main,
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    margin: 0,
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0, 1.8fr) 120px 110px 80px 80px 90px 80px 130px 110px',
    columnGap: '16px',
    padding: '12px 24px',
    borderBottom: '1px solid #EAECF0',
    borderRight: '1px solid #EAECF0',
    borderLeft: '1px solid #EAECF0',
    borderTop: '1px solid #EAECF0',
    borderRadius: '12px 12px 0 0',
    background: '#F9FAFB',
    alignItems: 'center' as const,
  },
  tableHeaderCell: {
    fontSize: '12px',
    fontWeight: 500,
    color: colors.text.neutral.soft,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0, 1.8fr) 120px 110px 80px 80px 90px 80px 130px 110px',
    columnGap: '16px',
    padding: '16px 24px',
    alignItems: 'center' as const,
    borderBottom: '1px solid #EAECF0',
    borderRight: '1px solid #EAECF0',
    borderLeft: '1px solid #EAECF0',
    background: colors.bg.surface.default,
  },
  assetCell: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[3],
  },
  assetIcon: {
    width: 32,
    height: 32,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontSize: '18px',
    fontWeight: 600,
    flexShrink: 0,
  },
  assetText: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
    minWidth: 0,
    zIndex: 999,
  },
  assetName: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.text.neutral.main,
    whiteSpace: 'nowrap' as const,
    textOverflow: 'ellipsis' as const,
    overflow: 'hidden' as const,
  },
  assetIp: {
    color: '#667085',
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px',
    textAlign: 'left' as const,
  },
  typeCell: {
    fontSize: '14px',
    color: colors.text.neutral.main,
  },
  riskPill: (risk: string) => {
    const palette = riskPillColors[risk] || riskPillColors.Medium;
    return {
      display: 'inline-flex',
      alignItems: 'center' as const,
      padding: '4px 10px',
      borderRadius: '4px',
      border: `1px solid ${palette.border}`,
      background: palette.bg,
      color: palette.text,
      fontSize: '12px',
      fontWeight: 500,
    };
  },
  countBadge: (color: string, bg: string) => ({
    display: 'inline-flex',
    minWidth: 28,
    padding: '2px 8px',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '4px',
    background: bg,
    color,
    fontSize: '13px',
    fontWeight: 500,
  }),
  lastScanned: {
    fontSize: '13px',
    color: colors.text.neutral.main,
  },
};

export const vulnerabilityScanStyles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.8fr)',
    gap: spacing[5],
    alignItems: 'flex-start' as const,
  },
  card: {
    background: colors.bg.surface.default,
    border: `1px solid ${colors.stroke.neutral.soft}`,
    borderRadius: '16px',
    padding: '20px 24px 20px 24px',
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start' as const,
    justifyContent: 'space-between' as const,
    marginBottom: spacing[4],
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: colors.text.neutral.main,
    margin: 0,
  },
  totalRowBgarea: {
    background: colors.bg.surface.default,
    border: `1px solid ${colors.stroke.neutral.soft}`,
    borderRadius: '16px',
    padding: '20px 24px 20px 24px',
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
  },
  headerMeta: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  linkButton: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 6,
    border: 'none',
    background: 'transparent',
    padding: 0,
    cursor: 'pointer',
    color: colors.primary[500],
    fontSize: '13px',
    fontWeight: 600,
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontStyle: 'normal',
    lineHeight: '19.5px',
  },
  totalRow: {
    display: 'flex',
    alignItems: 'flex-start' as const,
    justifyContent: 'space-between' as const,
    marginBottom: spacing[4],
  },
  totalLabel: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: '32px',
    fontWeight: 700,
    color: colors.text.neutral.main,
  },
  trendWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end' as const,
    gap: 8,
  },
  trendChip: (direction: 'up' | 'down') => {
    const isUp = direction === 'up';
    return {
      display: 'inline-flex',
      alignItems: 'center' as const,
      gap: 6,
      padding: '2px 8px',
      borderRadius: '4px',
      color: isUp ? '#027A48' : '#B42318',
      fontSize: '12px',
      fontWeight: 500,
    };
  },
  trendArrow: {
    fontSize: '12px',
  },
  trendSparkline: (direction: 'up' | 'down') => {
    const isUp = direction === 'up';
    const color = isUp ? '#16A34A' : '#F04438';
    return {
      width: 44,
      height: 14,
      borderRadius: 4,
      borderBottom: `2px solid ${color}`,
    };
  },
  severities: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  severityRow: {
    alignItems: 'center' as const,
    marginBottom: 18,
  },
  severityLabel: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 8,
    width: '100%',
  },
  severityDot: (color: string) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    background: color,
    flexShrink: 0,
  }),
  severityName: {
    fontSize: '13px',
    fontWeight: 500,
    color: colors.text.neutral.main,
  },
  severityPercent: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  severityBarTrack: {
    width: '100%',
    height: 6,
    borderRadius: 4,
    background: '#F2F4F7',
    overflow: 'hidden' as const,
  },
  severityBarFill: (color: string, percentage: number) => ({
    width: `${percentage}%`,
    maxWidth: '100%',
    height: '100%',
    background: color,
    borderRadius: 4,
  }),
  severityTrendChip: (direction: 'up' | 'down') => {
    const isUp = direction === 'up';
    return {
      display: 'inline-flex',
      alignItems: 'center' as const,
      gap: 6,
      fontSize: '12px',
      fontWeight: 500,
      color: isUp ? '#027A48' : '#B42318',
    };
  },
  severitySparkline: (direction: 'up' | 'down') => {
    const isUp = direction === 'up';
    const color = isUp ? '#16A34A' : '#F04438';
    return {
      width: 32,
      height: 12,
      borderRadius: 4,
      borderBottom: `2px solid ${color}`,
    };
  },
  severityCount: {
    fontSize: '13px',
    fontWeight: 500,
    color: colors.text.neutral.main,
    textAlign: 'right' as const,
  },
  severityRowfirst: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
    height: '28px',
    alignSelf: 'stretch' as const,
    flexShrink: 0,
  },
  scanCardHeader: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: spacing[3],
  },
  scanItem: {
    border: '1px solid #EAECF0',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.8fr) 180px',
    columnGap: 16,
    alignItems: 'center' as const,
    background: colors.bg.surface.default,
    borderRadius: '16px',
    margin: '10px 0px 10px 0px',
    padding: '17px 21px 17px 21px',
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
  },
  scanMain: {
    display: 'flex',
    alignItems: 'flex-start' as const,
    gap: spacing[3],
    minWidth: 0,
  },
  scanIcon: {
    width: 40,
    height: 40,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },
  scanText: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    minWidth: 0,
  },
  scanTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.text.neutral.main,
    whiteSpace: 'nowrap' as const,
    textOverflow: 'ellipsis' as const,
    overflow: 'hidden' as const,
  },
  scanMetaRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center' as const,
    gap: 8,
    fontSize: '12px',
  },
  scanMetaMuted: {
    color: colors.text.neutral.sub,
  },
  statusChip: (color: string, bg: string) => ({
    display: 'inline-flex',
    alignItems: 'center' as const,
    padding: '2px 8px',
    borderRadius: '4px',
    background: bg,
    color,
    fontSize: '11px',
    fontWeight: 500,
  }),
  typeTag: (bg: string, color: string) => ({
    display: 'inline-flex',
    alignItems: 'center' as const,
    padding: '2px 8px',
    borderRadius: '4px',
    background: bg,
    color,
    fontSize: '11px',
    fontWeight: 500,
  }),
  scanRight: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end' as const,
    gap: 8,
  },
  scanCountsRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 6,
  },
  scanCountBadge: (bg: string, color: string) => ({
    minWidth: 26,
    padding: '2px 8px',
    borderRadius: '4px',
    background: bg,
    color,
    fontSize: '11px',
    fontWeight: 500,
    textAlign: 'center' as const,
  }),
  progressRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 8,
    minWidth: 0,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 4,
    background: '#F2F4F7',
    overflow: 'hidden' as const,
  },
  progressFill: (color: string, percentage: number) => ({
    width: `${percentage}%`,
    maxWidth: '100%',
    height: '100%',
    background: color,
    borderRadius: 4,
  }),
  progressLabel: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    whiteSpace: 'nowrap' as const,
  },
  scanBottomProgressContainer: {
    gridColumn: '1 / -1',
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
    marginTop: spacing[3],
  },
  scanBottomProgressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    background: '#F2F4F7',
    overflow: 'hidden' as const,
  },
  scanBottomProgressFill: (color: string, percentage: number) => ({
    width: `${percentage}%`,
    maxWidth: '100%',
    height: '100%',
    background: color,
    borderRadius: 999,
  }),
  scanBottomProgressLabel: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    whiteSpace: 'nowrap' as const,
  },
};

