import { colors, spacing } from '../../../design-system/tokens';

export const complianceGroups = [
  {
    id: 'pci-asv-scan',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#266df0"
        aria-hidden="true"
      >
        <path
          d="M9 12L11 14L15 9.99999M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z"
          stroke="#266df0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg: '#EFF8FF',
    title: 'PCI ASV Scan',
    description:
      'Payment Card Industry Data Security Standard scanning for cardholder data protection.',
    tags: ['PCI DSS 4.0', 'ASV Scanning', 'Quartely'],
    badgeLabel: 'PCI',
    badgeBackgroundColor: '#EFF4FF',
    badgeTextColor: '#266DF0',
    usedSlots: 1,
    maxSlots: 2,
  },
  {
    id: 'external-va-scan',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ color: 'rgb(18, 183, 106)' }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    iconBg: '#EFF8FF',
    title: 'External VA Scan',
    description: 'Ad-hoc or recurring external vulnerability assessments across your network perimeter.',
    tags: ['Network', 'Infrastructure', 'Flexible'],
    badgeLabel: 'VA',
    badgeBackgroundColor: '#ECFDF3',
    badgeTextColor: '#027A48',
    usedSlots: 2,
    maxSlots: 3,
  },
];

export const steps = [
  { id: 1, label: 'Select Project Type' },
  { id: 2, label: 'Scan Configuration' },
  { id: 3, label: 'Team' },
];

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },
  stepperWrapper: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
    background: colors.bg.surface.default,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },
  stepsHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: spacing[5],
    padding: `${spacing[4]} ${spacing[6]}`,
    alignItems: 'flex-end' as const,
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[1],
  },
  stepTopRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },
  stepNumberCircle: (isActive: boolean) => ({
    width: 24,
    height: 24,
    borderRadius: 999,
    border: `1px solid ${isActive ? colors.primary[500] : colors.stroke.neutral.light}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 600 as const,
    color: isActive ? colors.primary[500] : colors.text.neutral.soft,
    background: isActive ? '#EFF4FF' : '#FFFFFF',
  }),
  stepLabel: (isActive: boolean) => ({
    fontSize: 14,
    fontWeight: isActive ? (600 as const) : (500 as const),
    color: isActive ? colors.primary[500] : colors.text.neutral.soft,
    whiteSpace: 'nowrap' as const,
  }),
  stepUnderline: (isActive: boolean) => ({
    marginBottom: 4,
    height: 2,
    borderRadius: 999,
    background: isActive ? colors.primary[500] : colors.stroke.neutral.light,
  }),
  layout: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[5],
    paddingTop: '15px',
    paddingRight: spacing[3],
    marginRight: spacing[6],
    overflowY: 'auto' as const,
    borderRight: `1px solid ${colors.stroke.neutral.light}`,
  },
  sidebar: {
    width: '320px',
    flexShrink: 0,
    overflowY: 'auto' as const,
    position: 'sticky' as const,
    top: 0,
    height: 'fit-content',
    maxHeight: '100%',
    paddingTop: '15px',
  },
  header: {
    marginBottom: spacing[2],
  },
  title: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  description: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    lineHeight: '20px',
    textAlign: 'left' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[2],
    rowGap: spacing[2],
  },
  infoBox: {
    padding: spacing[4],
    background: '#EFF8FF',
    border: `1px solid #B2DDFF`,
    borderRadius: '8px',
    marginTop: spacing[4],
  },
  infoTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.primary[600],
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  infoText: {
    fontSize: '13px',
    color: colors.primary[600],
    lineHeight: '18px',
    textAlign: 'left' as const,
  },
  summaryCard: {
    padding: spacing[5],
    background: colors.bg.surface.gray,
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  stepIndicator: {
    fontSize: '12px',
    color: colors.text.neutral.soft,
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  summaryItemIcon: {
    marginTop: '2px',
  },
  summaryItemText: {
    fontSize: '14px',
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  summaryEmpty: {
    fontSize: '13px',
    color: colors.text.neutral.soft,
    fontStyle: 'italic' as const,
    textAlign: 'left' as const,
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: 600 as const,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    color: colors.text.neutral.soft,
    marginBottom: spacing[3],
    textAlign: 'left' as const,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[3],
    marginBottom: spacing[0],
  },
  fieldLabel: {
    fontSize: '14px',
    fontWeight: 400 as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    display: 'block',
    textAlign: 'left' as const,
  },
  fieldDescription: {
    fontSize: '12px',
    fontWeight: 400 as const,
    color: colors.text.neutral.sub,
    marginBottom: spacing[1],
    marginTop: spacing[1],
    textAlign: 'left' as const,
  },
  twoColumnRow: {
    display: 'block',
  },
  column: {
    display: 'block',
    marginBottom: spacing[4],
  },
  pciCallout: {
    borderRadius: 12,
    border: '1px solid #FEDF89',
    background: '#FFFAEB',
    padding: spacing[4],
    marginBottom: spacing[5],
  },
  pciCalloutHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[3],
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  pciIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 999,
    background: '#FEF0C7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#B54708',
    flexShrink: 0,
  },
  pciCalloutTitle: {
    fontSize: 14,
    fontWeight: 600 as const,
    color: '#B54708',
    marginBottom: 2,
  },
  pciCalloutBody: {
    fontSize: 13,
    lineHeight: '18px',
    color: '#B54708',
  },
  pciDateField: {
    marginTop: spacing[3],
    width: '100%',
  },
  pciDateLabel: {
    fontSize: 13,
    fontWeight: 500 as const,
    color: '#B54708',
    marginBottom: spacing[1],
    textAlign: 'left' as const,
  },
  quartersPlaceholder: {
    borderRadius: 12,
    border: '1px dashed #D0D5DD',
    background: '#F9FAFB',
    padding: spacing[5],
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    textAlign: 'center' as const,
  },
  quartersIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    background: '#EEF4FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4F46E5',
    marginBottom: spacing[1],
  },
  quartersTitle: {
    fontSize: 14,
    fontWeight: 500 as const,
    color: colors.text.neutral.main,
  },
  quartersSubtitle: {
    fontSize: 13,
    color: colors.text.neutral.sub,
    maxWidth: 320,
  },
  complianceWindowsSection: {
    marginTop: spacing[4],
  },
  complianceWindowsHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  complianceWindowsTitleBlock: {
    textAlign: 'left' as const,
  },
  complianceWindowsTitle: {
    fontSize: 12,
    fontWeight: 600 as const,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    color: colors.text.neutral.soft,
    marginBottom: spacing[1],
  },
  complianceWindowsSubtitle: {
    fontSize: 13,
    color: colors.text.neutral.sub,
  },
  standardBadge: {
    alignSelf: 'flex-start',
    padding: '4px 10px',
    borderRadius: 999,
    background: '#EEF4FF',
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: 500 as const,
  },
  complianceWindowsTable: {
    borderRadius: 12,
    border: `1px solid ${colors.stroke.neutral.light}`,
    overflow: 'hidden',
  },
  complianceWindowsHeader: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 2.5fr 1.5fr 0.8fr',
    padding: `${spacing[2]} ${spacing[4]}`,
    background: colors.bg.surface.gray,
    fontSize: 12,
    fontWeight: 500 as const,
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  complianceWindowsRow: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 2.5fr 1.5fr 0.8fr',
    padding: `${spacing[3]} ${spacing[4]}`,
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    alignItems: 'center',
    fontSize: 13,
  },
  complianceWindowsRowCurrent: {
    background: '#EEF4FF',
  },
  quarterNameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  quarterPill: {
    fontSize: 12,
    padding: '2px 8px',
    borderRadius: 999,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    color: colors.text.neutral.main,
  },
  currentPill: {
    fontSize: 11,
    padding: '2px 6px',
    borderRadius: 999,
    background: '#FEF0C7',
    color: '#B54708',
    fontWeight: 500 as const,
  },
  windowDatesCell: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  },
  windowDateRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: colors.text.neutral.sub,
  },
  windowDot: (color: string) => ({
    width: 8,
    height: 8,
    borderRadius: 999,
    background: color,
  }),
  asvDeadlineCell: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    color: colors.text.neutral.main,
  },
  asvDeadlineIcon: {
    width: 18,
    height: 18,
    borderRadius: 999,
    border: `1px solid ${colors.stroke.neutral.light}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.text.neutral.sub,
  },
  daysLeftCell: {
    fontSize: 13,
    fontWeight: 500 as const,
    color: colors.text.neutral.main,
    textAlign: 'right' as const,
  },
  inviteTabs: {
    display: 'flex',
    gap: spacing[8],
    borderBottom: `none`,
    marginBottom: spacing[4],
    marginTop: spacing[4],
    background: '#f9fafb',
    padding: spacing[1],
    borderRadius: '8px',
  },
  inviteTab: (active: boolean) => ({
    borderRadius: '8px',
    border: 'none',
    padding: '8px 24px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    background: active ? colors.bg.surface.default : 'transparent',
    boxShadow: active ? '0 1px 2px rgba(15, 23, 42, 0.08)' : 'none',
    color: active ? colors.text.neutral.main : colors.text.neutral.sub,
    flex: 1,
    textAlign: 'center' as const,
  }),
  inviteRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  inviteEmailInput: {
    width: '100%',
  },
  inviteRoleSelect: {
    flexShrink: 0,
    minWidth: 0,
  },
  inviteInput: {
    width: '100%',
    height: '40px',
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: '14px',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    color: colors.text.neutral.main,
    background: 'white',
    boxSizing: 'border-box' as const,
  },
  inviteDeleteButton: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${colors.stroke.neutral.light}`,
    background: '#FFFFFF',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.text.neutral.sub,
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  inviteAddButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[2]} 0`,
    fontSize: '14px',
    fontWeight: 600 as const,
    color: colors.primary[600],
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    marginTop: spacing[2],
  },
  inviteHelperRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    marginTop: spacing[5],
    padding: `${spacing[3]} ${spacing[4]}`,
    borderRadius: '8px',
    background: colors.bg.surface.gray,
    color: colors.text.neutral.sub,
    fontSize: 13,
    textAlign: 'left' as const,
  },
  bulkUploadArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
    marginTop: spacing[2],
  },
  bulkUploadDropzone: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
    borderRadius: 12,
    border: `1px dashed ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.gray,
    cursor: 'pointer',
  },
  bulkUploadIcon: {
    marginBottom: spacing[3],
    color: colors.primary[500],
  },
  bulkUploadTitle: {
    fontSize: 14,
    fontWeight: 600 as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[1],
  },
  bulkUploadSubtitle: {
    fontSize: 12,
    color: colors.text.neutral.sub,
  },
  bulkUploadOrText: {
    fontSize: 13,
    color: colors.text.neutral.sub,
  },
  bulkTextareaWrapper: {
    marginTop: spacing[1],
  },
  bulkDefaultRoleRow: {
    marginTop: spacing[4],
    padding: `${spacing[3]} ${spacing[4]}`,
    borderRadius: 8,
    border: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  bulkDefaultRoleLabel: {
    fontSize: 14,
    color: colors.text.neutral.main,
  },
  bulkDownloadLink: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: spacing[2],
    padding: '8px 16px',
    borderRadius: '8px',
    border: `1px solid ${colors.stroke.neutral.soft}`,
    background: colors.bg.surface.default,
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    color: colors.text.neutral.main,
    justifyContent: 'center',
  },
  bulkHiddenInput: {
    display: 'none',
  },
  bulkTableWrapper: {
    marginTop: spacing[4],
    borderRadius: 12,
    border: `1px solid ${colors.stroke.neutral.light}`,
    maxHeight: 260,
    overflowY: 'auto' as const,
  },
  manualTableWrapper: {
    marginTop: spacing[4],
    borderRadius: 12,
    border: `1px solid ${colors.stroke.neutral.light}`,
    overflow: 'visible' as const,
  },
  bulkTableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 0.7fr',
    padding: `${spacing[2]} ${spacing[4]}`,
    background: colors.bg.surface.gray,
    fontSize: 12,
    fontWeight: 500 as const,
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  bulkTableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 0.7fr',
    padding: `${spacing[2]} ${spacing[4]}`,
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    fontSize: 13,
    color: colors.text.neutral.main,
    alignItems: 'center',
  },
  inviteInputError: {
    borderColor: colors.red[500],
  },
  inviteErrorText: {
    marginTop: spacing[1],
    fontSize: 12,
    color: colors.red[500],
    textAlign: 'left' as const,
  },
  bulkActionCell: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  bulkActionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: 12,
    borderRadius: 999,
    border: `none`,
    background: '#FFFFFF',
    cursor: 'pointer',
    color: colors.text.neutral.sub,
  },
  summarySidebar: {
    paddingTop: '15px',
  },
  summarySection: {
    marginBottom: spacing[4],
  },
  summaryLabel: {
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: colors.text.neutral.soft,
    marginBottom: spacing[1],
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text.neutral.main,
  },
  summaryValueMuted: {
    fontSize: 14,
    color: colors.text.neutral.sub,
  },
};

export type ScanConfigurationSummary = {
  projectName: string;
  projectKey: string;
  certificationDate?: string;
  scanFrequency?: 'one-time' | 'weekly' | 'monthly' | 'quarterly';
  startDate?: string;
};

export type ComplianceWindow = {
  id: string;
  label: string;
  start: Date;
  end: Date;
  asvDeadline: Date;
  isCurrent: boolean;
  daysLeft?: number;
};

const addMonths = (date: Date, months: number) => {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);

  if (d.getDate() < day) {
    d.setDate(0);
  }

  return d;
};

const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getQuarterLabel = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const quarter = month < 3 ? 'Q1' : month < 6 ? 'Q2' : month < 9 ? 'Q3' : 'Q4';

  return `${quarter} ${year}`;
};

export const formatWindowDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const getComplianceWindows = (certificationDateStr: string): ComplianceWindow[] => {
  if (!certificationDateStr) return [];

  const base = new Date(certificationDateStr);
  const today = startOfDay(new Date());

  const windows: { start: Date; end: Date }[] = [];

  const prevStart = addMonths(base, -3);
  const prevEnd = new Date(base);
  prevEnd.setDate(prevEnd.getDate() - 1);
  windows.push({ start: prevStart, end: prevEnd });

  let cursorStart = new Date(base);
  for (let i = 0; i < 3; i += 1) {
    const cursorEnd = addMonths(cursorStart, 3);
    cursorEnd.setDate(cursorEnd.getDate() - 1);
    windows.push({ start: cursorStart, end: cursorEnd });
    cursorStart = addMonths(cursorStart, 3);
  }

  return windows.map((window, index) => {
    const asvDeadline = window.end;
    const isCurrent =
      today.getTime() >= startOfDay(window.start).getTime() &&
      today.getTime() <= startOfDay(window.end).getTime();

    const daysLeft = isCurrent
      ? Math.max(
          0,
          Math.ceil(
            (startOfDay(asvDeadline).getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          ),
        )
      : undefined;

    return {
      id: `q-${index}`,
      label: getQuarterLabel(window.start),
      start: window.start,
      end: window.end,
      asvDeadline,
      isCurrent,
      daysLeft,
    };
  });
};

