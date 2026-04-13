import { FilterCard } from '../../components';
import { colors } from '../../design-system/tokens';
import { PageGrid } from '../../ui/page';

const TimelineQuarterPassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <g clipPath="url(#clip0_timeline_pass_quarter)">
      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#12B76A" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 6L5.5 7L7.5 5" stroke="#12B76A" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_timeline_pass_quarter">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const TimelineQuarterFailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <g clipPath="url(#clip0_timeline_q4)">
      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 4.5L4.5 7.5" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 4.5L7.5 7.5" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_timeline_q4">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const PassBadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
    <g clipPath="url(#clip0_pass_badge)">
      <path d="M5.49935 10.0827C8.03065 10.0827 10.0827 8.03065 10.0827 5.49935C10.0827 2.96804 8.03065 0.916016 5.49935 0.916016C2.96804 0.916016 0.916016 2.96804 0.916016 5.49935C0.916016 8.03065 2.96804 10.0827 5.49935 10.0827Z" stroke="#12B76A" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.125 5.50065L5.04167 6.41732L6.875 4.58398" stroke="#12B76A" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_pass_badge">
        <rect width="11" height="11" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const FailBadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <g clipPath="url(#clip0_fail_badge)">
      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 4.5L4.5 7.5" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 4.5L7.5 7.5" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_fail_badge">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const UrgentArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M3.20898 3.20898L7.79232 7.79232" stroke="#B42318" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.79232 3.20898V7.79232H3.20898" stroke="#B42318" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function AsvScansTimelineTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageGrid columns={4} gap={16}>
        <FilterCard
          value="3/4"
          label="Quarters Compliant"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z" stroke="#288D68" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.375 12.4993L11.4583 14.5827L15.625 10.416" stroke="#288D68" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          variant="green"
          footer={
            <span style={{ fontSize: 12, color: '#12B76A', fontWeight: 500 }}>
              ↑ 75% compliance rate
            </span>
          }
        />
        <FilterCard
          value="Mar 15, 2025"
          label="License Start"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M8.33301 2.08398V6.25065" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.667 2.08398V6.25065" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.7917 4.16602H5.20833C4.05774 4.16602 3.125 5.09876 3.125 6.24935V20.8327C3.125 21.9833 4.05774 22.916 5.20833 22.916H19.7917C20.9423 22.916 21.875 21.9833 21.875 20.8327V6.24935C21.875 5.09876 20.9423 4.16602 19.7917 4.16602Z" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.125 10.416H21.875" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          variant="gray"
          valueStyle={{ fontSize: 18 }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="353d"
          label="Days Elapsed"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M12.5 22.916C18.2529 22.916 22.9167 18.2523 22.9167 12.4993C22.9167 6.74635 18.2529 2.08268 12.5 2.08268C6.74703 2.08268 2.08334 6.74635 2.08334 12.4993C2.08334 18.2523 6.74703 22.916 12.5 22.916Z" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.5 6.25V12.5L16.6667 14.5833" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          variant="blue"
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="11d"
          label="Days Until Expiry"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M12.4993 8.33398V12.5007" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.4993 16.666H12.5097" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.93786 20.834H20.0608C20.399 20.8342 20.7313 20.7447 21.0237 20.5747C21.3162 20.4047 21.5587 20.1601 21.7262 19.8662C21.8938 19.5724 21.9806 19.2393 21.9778 18.9011C21.975 18.5628 21.8828 18.2312 21.7103 17.9402L14.1499 5.2319C13.9748 4.94942 13.7304 4.71658 13.4399 4.55625C13.1494 4.39593 12.8227 4.31348 12.4909 4.31689C12.1591 4.32031 11.8341 4.40946 11.5469 4.57574C11.2598 4.74201 11.0202 4.97985 10.851 5.2659L3.29057 17.9742C3.12254 18.2652 3.03387 18.5951 3.0332 18.9312C3.03253 19.2672 3.11988 19.5975 3.28675 19.8891C3.45362 20.1808 3.69408 20.4235 3.9842 20.5929C4.27431 20.7624 4.60397 20.8525 4.93995 20.8548L4.93786 20.834Z" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          variant="yellow"
          footer={
            <span style={{ fontSize: 12, color: '#F79009', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: '#FEF3F2',
                  color: '#B42318',
                  borderRadius: 999,
                  padding: '2px 8px',
                }}
              >
                <UrgentArrowIcon />
                Urgent
              </span>
              <span style={{ color: '#98A2B3' }}>renew soon</span>
            </span>
          }
        />
      </PageGrid>

      <div
        style={{
          borderRadius: 12,
          border: '1px solid #E4E7EC',
          background: '#FFFFFF',
          padding: 16,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>12-Month Compliance Timeline</div>
        <div style={{ marginTop: 4, fontSize: 13, color: '#667085' }}>
          PCI Certification Date: Mar 15, 2025 · License ends: Mar 14, 2026
        </div>

        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
            }}
          >
            <div style={{ background: '#ECFDF3', padding: '8px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#027A48', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span>Quarter 1</span>
              <TimelineQuarterPassIcon />
            </div>
            <div style={{ background: '#ECFDF3', padding: '8px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#027A48', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span>Quarter 2</span>
              <TimelineQuarterPassIcon />
            </div>
            <div style={{ background: '#ECFDF3', padding: '8px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#027A48', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span>Quarter 3</span>
              <TimelineQuarterPassIcon />
            </div>
            <div style={{ background: '#FEF3F2', padding: '8px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#B42318', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span>Quarter 4</span>
              <TimelineQuarterFailIcon />
            </div>
          </div>

          <div style={{ marginTop: 12, position: 'relative', height: 56 }}>
            <div style={{ position: 'absolute', top: 18, left: 0, right: 0, height: 2, background: '#EAECF0' }} />
            {[
              { left: '0%', color: '#12B76A' },
              { left: '24%', color: '#12B76A' },
              { left: '49%', color: '#12B76A' },
              { left: '68%', color: '#F04438' },
              { left: '74%', color: '#12B76A' },
              { left: '92%', color: '#F04438' },
            ].map((dot, idx) => (
              <span
                key={idx}
                style={{
                  position: 'absolute',
                  left: dot.left,
                  top: 14,
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: dot.color,
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 0 0 1px rgba(16,24,40,0.08)',
                  transform: 'translateX(-50%)',
                }}
              />
            ))}
            <span
              style={{
                position: 'absolute',
                left: '98%',
                top: 7,
                width: 2,
                height: 24,
                background: '#155EEF',
                transform: 'translateX(-50%)',
              }}
            />
            <span style={{ position: 'absolute', left: '98%', top: 34, transform: 'translateX(-50%)', fontSize: 11, color: '#344054', fontWeight: 500 }}>
              Today
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#98A2B3' }}>
            <span>Mar 15</span>
            <span>Jun 13</span>
            <span>Sep 11</span>
            <span>Dec 10</span>
            <span>Mar 14</span>
          </div>

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: '#667085' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#12B76A' }} />
              Passing scan
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#F04438' }} />
              Failing scan
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 2, background: '#155EEF' }} />
              Today
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
        {[
          {
            quarter: 'Quarter 1',
            dates: 'Mar 15, 2025 to Jun 12, 2025',
            summary: [{ id: 'ASV-W1-2025', result: 'PASS' as const }],
            highlight: false,
          },
          {
            quarter: 'Quarter 2',
            dates: 'Jun 13, 2025 to Sep 10, 2025',
            summary: [{ id: 'ASV-W2-2025', result: 'PASS' as const }],
            highlight: false,
          },
          {
            quarter: 'Quarter 3',
            dates: 'Sep 11, 2025 to Dec 9, 2025',
            summary: [
              { id: 'ASV-W3-2025', result: 'FAIL' as const },
              { id: 'ASV-W3-2025-R1', result: 'PASS' as const },
            ],
            highlight: false,
          },
          {
            quarter: 'Quarter 4',
            dates: 'Dec 10, 2025 to Mar 14, 2026',
            summary: [{ id: 'ASV-W4-2025', result: 'FAIL' as const }],
            highlight: true,
          },
        ].map((item) => (
          <div
            key={item.quarter}
            style={{
              borderRadius: 12,
              border: item.highlight ? '1px solid #266DF0' : '1px solid #E4E7EC',
              background: '#FFFFFF',
              padding: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>{item.quarter}</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  borderRadius: 999,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 600,
                  color: item.summary.every((x) => x.result === 'PASS') ? '#027A48' : '#B42318',
                  background: item.summary.every((x) => x.result === 'PASS') ? '#ECFDF3' : '#FEF3F2',
                }}
              >
                {item.summary.every((x) => x.result === 'PASS') ? <PassBadgeIcon /> : <FailBadgeIcon />}
                {item.summary.every((x) => x.result === 'PASS') ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: '#667085', whiteSpace: 'pre-line' }}>{item.dates.replace(' to ', '\nto ')}</div>

            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {item.summary.map((scan) => (
                <div key={scan.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: '#266DF0', fontWeight: 500 }}>{scan.id}</span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      borderRadius: 999,
                      padding: '2px 8px',
                      fontSize: 11,
                      fontWeight: 600,
                      color: scan.result === 'PASS' ? '#027A48' : '#B42318',
                      background: scan.result === 'PASS' ? '#ECFDF3' : '#FEF3F2',
                    }}
                  >
                    {scan.result === 'PASS' ? <PassBadgeIcon /> : <FailBadgeIcon />}
                    {scan.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

