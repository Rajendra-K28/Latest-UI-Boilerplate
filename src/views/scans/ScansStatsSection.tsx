import { PageGrid } from '../../ui/page';
import { FilterCard } from '../../components';
import { colors, spacing } from '../../design-system/tokens';

const CompletedScansIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z"
      stroke="#288D68"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.375 12.4993L11.4583 14.5827L15.625 10.416"
      stroke="#288D68"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InProgressScansIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M22.9163 12.5007H20.333C19.8778 12.4997 19.4347 12.6478 19.0717 12.9225C18.7086 13.1971 18.4455 13.5831 18.3226 14.0215L15.8747 22.7298C15.8589 22.7839 15.826 22.8314 15.7809 22.8652C15.7358 22.899 15.681 22.9173 15.6247 22.9173C15.5683 22.9173 15.5135 22.899 15.4684 22.8652C15.4233 22.8314 15.3905 22.7839 15.3747 22.7298L9.62467 2.27148C9.6089 2.21739 9.576 2.16988 9.53092 2.13607C9.48585 2.10226 9.43102 2.08398 9.37467 2.08398C9.31833 2.08398 9.2635 2.10226 9.21842 2.13607C9.17335 2.16988 9.14045 2.21739 9.12467 2.27148L6.67676 10.9798C6.55433 11.4164 6.29278 11.8012 5.93182 12.0757C5.57087 12.3501 5.13022 12.4994 4.67676 12.5007H2.08301"
      stroke="#F2AE40"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ScheduledScansIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8.33301 2.08398V6.25065"
      stroke="#266DF0"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.667 2.08398V6.25065"
      stroke="#266DF0"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.7917 4.16602H5.20833C4.05774 4.16602 3.125 5.09876 3.125 6.24935V20.8327C3.125 21.9833 4.05774 22.916 5.20833 22.916H19.7917C20.9423 22.916 21.875 21.9833 21.875 20.8327V6.24935C21.875 5.09876 20.9423 4.16602 19.7917 4.16602Z"
      stroke="#266DF0"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.125 10.416H21.875"
      stroke="#266DF0"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FailedScansIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z"
      stroke="#C0182E"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 8.33398V12.5007"
      stroke="#C0182E"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 16.666H12.51"
      stroke="#C0182E"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const renderSimpleDeltaFooter = (
  direction: 'up' | 'down',
  value: string,
  color: string,
) => {
  const isUp = direction === 'up';
  const arrowSymbol = isUp ? '↗' : '↘';
  const background = isUp ? '#ECFDF3' : '#FEF3F2';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[1],
        padding: '2px 8px',
        borderRadius: 4,
        background,
        color,
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      <span>{arrowSymbol}</span>
      <span>{value}</span>
    </span>
  );
};

const renderPlainFooter = (value: string) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 0',
      color: colors.text.neutral.sub,
      fontSize: 12,
    }}
  >
    {value}
  </span>
);

type ScansStatsSectionProps = {
  completedScans: number;
  inProgressScans: number;
  scheduledScans: number;
  failedScans: number;
};

export function ScansStatsSection({
  completedScans,
  inProgressScans,
  scheduledScans,
  failedScans,
}: ScansStatsSectionProps) {
  return (
    <PageGrid columns={4} gap={16}>
      <FilterCard
        value={completedScans}
        label="Completed scans"
        icon={<CompletedScansIcon />}
        variant="green"
        footer={renderSimpleDeltaFooter('up', '+2 this month', colors.green[500])}
      />
      <FilterCard
        value={inProgressScans}
        label="Scans in progress"
        icon={<InProgressScansIcon />}
        variant="yellow"
        footer={renderPlainFooter('3 scanning now')}
      />
      <FilterCard
        value={scheduledScans}
        label="Scheduled scans"
        icon={<ScheduledScansIcon />}
        variant="blue"
        footer={renderPlainFooter('Next run Mar 1')}
      />
      <FilterCard
        value={failedScans}
        label="Failed scans"
        icon={<FailedScansIcon />}
        variant="red"
        footer={renderSimpleDeltaFooter('down', '-1 vs last month', colors.red[500])}
      />
    </PageGrid>
  );
}

