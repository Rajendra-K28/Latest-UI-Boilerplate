import { FilterCard } from '../../components';
import { PageGrid } from '../../ui/page/Page';
import { spacing } from '../../design-system/tokens';

const metricCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path
          d="M22.6353 18.7508L14.3019 4.16747C14.1202 3.84685 13.8567 3.58017 13.5383 3.39463C13.2199 3.20908 12.858 3.11133 12.4894 3.11133C12.1209 3.11133 11.759 3.20908 11.4406 3.39463C11.1222 3.58017 10.8587 3.84685 10.6769 4.16747L2.34362 18.7508C2.15995 19.0689 2.06364 19.4299 2.06446 19.7972C2.06527 20.1645 2.16318 20.525 2.34825 20.8423C2.53332 21.1596 2.79898 21.4222 3.1183 21.6037C3.43762 21.7853 3.79925 21.8791 4.16653 21.8758H20.8332C21.1987 21.8754 21.5577 21.7789 21.8741 21.5959C22.1905 21.4129 22.4532 21.1499 22.6358 20.8332C22.8184 20.5166 22.9145 20.1575 22.9144 19.7919C22.9143 19.4264 22.818 19.0674 22.6353 18.7508Z"
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
    ),
    value: 21,
    label: 'Total open findings across all quarters',
    variant: 'red' as const,
    footer: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 10px',
          borderRadius: 2,
          background: '#FEF2F2',
          color: '#C0182E',
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        2 critical, 5 high
      </span>
    ),
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path
          d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z"
          stroke="#F2AE40"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 8.33398V12.5007"
          stroke="#F2AE40"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 16.666H12.51"
          stroke="#F2AE40"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    value: 3,
    label: 'ASV-blocking vulns',
    variant: 'yellow' as const,
    footer: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 10px',
          borderRadius: 2,
          background: '#FFFAEB',
          color: '#B54708',
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        Q4 remediation needed
      </span>
    ),
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path
          d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z"
          stroke="#F2AE40"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 6.25V12.5L16.6667 14.5833"
          stroke="#F2AE40"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    value: 11,
    label: 'Days until Q4 closes',
    variant: 'blue' as const,
    footer: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 10px',
          borderRadius: 999,
          background: '#FEF2F2',
          color: '#C0182E',
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        Mar 14, 2026
      </span>
    ),
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path
          d="M15.6253 2.08398H6.25033C5.69779 2.08398 5.16789 2.30348 4.77719 2.69418C4.38649 3.08488 4.16699 3.61478 4.16699 4.16732V20.834C4.16699 21.3865 4.38649 21.9164 4.77719 22.3071C5.16789 22.6978 5.69779 22.9173 6.25033 22.9173H18.7503C19.3029 22.6978 19.8328 22.6978 20.2235 22.3071C20.6142 21.9164 20.8337 21.3865 20.8337 20.834V7.29232L15.6253 2.08398Z"
          stroke="#667085"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.583 2.08398V6.25065C14.583 6.80319 14.8025 7.33309 15.1932 7.72379C15.5839 8.11449 16.1138 8.33398 16.6663 8.33398H20.833"
          stroke="#667085"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.375 15.6243L11.4583 17.7077L15.625 13.541"
          stroke="#667085"
          strokeWidth="1.95312"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    value: 0,
    label: 'Open disputes',
    variant: 'green' as const,
    footer: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 10px',
          borderRadius: 999,
          background: '#ECFDF3',
          color: '#027A48',
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        No active disputes
      </span>
    ),
  },
] as const;

export function KeyMetricsSection() {
  return (
    <PageGrid columns={4} gap={spacing[5]}>
      {metricCards.map((card, index) => (
        <FilterCard
          // FilterCard is presentational; keep stable keys.
          key={index}
          icon={card.icon}
          value={card.value}
          label={card.label}
          variant={card.variant}
          footer={card.footer}
          showAccentBar
          onClick={() => {}}
        />
      ))}
    </PageGrid>
  );
}

