import { PageSection, PageGrid } from '../../ui/page';
import { FilterCard } from '../../components';
import { colors, spacing } from '../../design-system/tokens';
import React from 'react';

type SeverityCounts = {
  critical: number;
  high: number;
  medium: number;
  low: number;
};

const CircleIcon = () => (
  <svg width="25" height="25" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CriticalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M22.6354 18.7508L14.3021 4.16747C14.1204 3.84685 13.8569 3.58017 13.5385 3.39463C13.22 3.20908 12.8581 3.11133 12.4896 3.11133C12.121 3.11133 11.7591 3.20908 11.4407 3.39463C11.1223 3.58017 10.8588 3.84685 10.6771 4.16747L2.34374 18.7508C2.16007 19.0689 2.06377 19.4299 2.06458 19.7972C2.06539 20.1645 2.1633 20.525 2.34837 20.8423C2.53344 21.1596 2.7991 21.4222 3.11842 21.6037C3.43774 21.7853 3.79937 21.8791 4.16665 21.8758H20.8333C21.1988 21.8754 21.5578 21.7789 21.8742 21.5959C22.1906 21.4129 22.4533 21.1499 22.6359 20.8332C22.8185 20.5166 22.9146 20.1575 22.9145 19.7919C22.9144 19.4264 22.8182 19.0674 22.6354 18.7508Z"
      stroke="#C0182E"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 9.375V13.5417"
      stroke="#C0182E"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 17.709H12.51"
      stroke="#C0182E"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HighIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M12.5 2.08398L22.9166 12.5007L12.5 22.9173L2.08331 12.5007L12.5 2.08398Z"
      stroke="#F2AE40"
      strokeWidth="2.08333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MediumIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M19.7917 3.125H5.20833C4.05774 3.125 3.125 4.05774 3.125 5.20833V19.7917C3.125 20.9423 4.05774 21.875 5.20833 21.875H19.7917C20.9423 21.875 21.875 20.9423 21.875 19.7917V5.20833C21.875 4.05774 20.9423 3.125 19.7917 3.125Z"
      stroke="#F2AE40"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M22.7094 10.417C23.1851 12.7516 22.8461 15.1789 21.7488 17.2938C20.6516 19.4088 18.8624 21.0837 16.6797 22.0392C14.4971 22.9947 12.0528 23.173 9.75452 22.5444C7.45626 21.9159 5.44295 20.5184 4.05033 18.5851C2.65771 16.6518 1.96996 14.2995 2.10178 11.9205C2.23359 9.54148 3.177 7.27955 4.77468 5.51193C6.37236 3.74431 8.52773 2.57783 10.8814 2.20702C13.235 1.83621 15.6446 2.28348 17.7084 3.47425"
      stroke="#266DF0"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.375 11.4577L12.5 14.5827L22.9167 4.16602"
      stroke="#266DF0"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RecurrenceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M3.125 12.5C3.125 14.3542 3.67483 16.1668 4.70497 17.7085C5.73511 19.2502 7.19929 20.4518 8.91234 21.1614C10.6254 21.8709 12.5104 22.0566 14.329 21.6949C16.1475 21.3331 17.818 20.4402 19.1291 19.1291C20.4402 17.818 21.3331 16.1475 21.6949 14.329C22.0566 12.5104 21.8709 10.6254 21.1614 8.91234C20.4518 7.19929 19.2502 5.73511 17.7085 4.70497C16.1668 3.67483 14.3542 3.125 12.5 3.125C9.87912 3.13486 7.36351 4.15752 5.47917 5.97917L3.125 8.33333"
      stroke="#667085"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.125 3.125V8.33333H8.33333"
      stroke="#667085"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function renderSimpleDeltaFooter(
  direction: 'up' | 'down',
  value: string,
  color: string,
) {
  const isUp = direction === 'up';
  const arrowSymbol = isUp ? '↗' : '↘';
  const background = isUp ? '#FEF3F2' : '#ECFDF3';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[1],
        padding: '2px 8px',
        borderRadius: '4px',
        background,
        color,
        fontSize: '12px',
        fontWeight: 500,
      }}
    >
      <span>{arrowSymbol}</span>
      <span>{value}</span>
    </span>
  );
}

type ExposureMonitorSummarySectionProps = {
  totalActiveIssues: number;
  severityCounts: SeverityCounts;
  recurrenceRate: number;
};

export function ExposureMonitorSummarySection({
  totalActiveIssues,
  severityCounts,
  recurrenceRate,
}: ExposureMonitorSummarySectionProps) {
  return (
    <PageSection>
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <PageGrid columns={6} gap={16}>
          <FilterCard
            value={totalActiveIssues}
            label="Active issues"
            icon={<CircleIcon />}
            variant="gray"
            footer={renderSimpleDeltaFooter('down', '-2', '#667085')}
          />
          <FilterCard
            value={severityCounts.critical}
            label="Critical"
            icon={<CriticalIcon />}
            variant="red"
            footer={renderSimpleDeltaFooter('down', '-1', colors.green[500])}
          />
          <FilterCard
            value={severityCounts.high}
            label="High"
            icon={<HighIcon />}
            variant="gold"
            footer={renderSimpleDeltaFooter('down', '-2', '#F2AE40')}
          />
          <FilterCard
            value={severityCounts.medium}
            label="Medium"
            icon={<MediumIcon />}
            variant="gold"
            footer={renderSimpleDeltaFooter('down', '-1', '#F2AE40')}
          />
          <FilterCard
            value={severityCounts.low}
            label="Low"
            icon={<LowIcon />}
            variant="blue"
            footer={renderSimpleDeltaFooter('down', '-2', colors.blue[500])}
          />
          <FilterCard
            value={`${recurrenceRate}%`}
            label="Recurrence"
            icon={<RecurrenceIcon />}
            variant="gray"
            footer={renderSimpleDeltaFooter('up', '+7%', '#667085')}
          />
        </PageGrid>
      </div>
    </PageSection>
  );
}

