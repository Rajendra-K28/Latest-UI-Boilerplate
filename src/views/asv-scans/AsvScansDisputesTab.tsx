import { useState } from 'react';
import { Button, FilterCard } from '../../components';
import { colors } from '../../design-system/tokens';
import { PageGrid } from '../../ui/page';
import { AsvRaiseDisputeDrawer, type RaiseDisputeFinding } from './AsvRaiseDisputeDrawer';

type DisputePriority = 'critical' | 'high';
type DisputeStatus = 'under-review' | 'accepted';

type DisputeItem = {
  id: string;
  cve: string;
  priority: DisputePriority;
  cvss: string;
  title: string;
  disputeId: string;
  linkedScan: string;
  quarter: string;
  raised: string;
  reasonTitle: string;
  reasonLines: string[];
  status: DisputeStatus;
};

const disputes: DisputeItem[] = [
  {
    id: 'd-001',
    cve: 'CVE-2024-12345',
    priority: 'critical',
    cvss: '9.8',
    title: 'Remote Code Execution in Apache Struts',
    disputeId: 'D-001',
    linkedScan: 'ASV-W4-2025',
    quarter: 'Quarter 4',
    raised: 'Feb 15, 2026',
    reasonTitle: 'Compensating Controls in Place',
    reasonLines: ['WAF rules block this attack vector. Evidence submitted.'],
    status: 'under-review',
  },
  {
    id: 'd-002',
    cve: 'CVE-2024-11111',
    priority: 'high',
    cvss: '8.2',
    title: 'Cross-Site Scripting (XSS) Vulnerability',
    disputeId: 'D-002',
    linkedScan: 'ASV-W3-2025',
    quarter: 'Quarter 3',
    raised: 'Nov 20, 2025',
    reasonTitle: 'False Positive',
    reasonLines: [
      'Vulnerability does not exist',
      'ASV vendor confirmed false positive. Finding removed from scope.',
      'Resolved: Nov 26, 2025',
    ],
    status: 'accepted',
  },
];

const TotalDisputesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M16.666 16.6673L19.791 8.33398L22.916 16.6673C22.0098 17.3444 20.916 17.709 19.791 17.709C18.666 17.709 17.5723 17.3444 16.666 16.6673Z" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.08398 16.6673L5.20898 8.33398L8.33398 16.6673C7.42773 17.3444 6.33398 17.709 5.20898 17.709C4.08398 17.709 2.99023 17.3444 2.08398 16.6673Z" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.29102 21.875H17.7077" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 3.125V21.875" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.125 7.29232H5.20833C7.29167 7.29232 10.4167 6.25065 12.5 5.20898C14.5833 6.25065 17.7083 7.29232 19.7917 7.29232H21.875" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UnderReviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M12.5 22.916C18.2529 22.916 22.9167 18.2523 22.9167 12.4993C22.9167 6.74635 18.2529 2.08268 12.5 2.08268C6.74703 2.08268 2.08334 6.74635 2.08334 12.4993C2.08334 18.2523 6.74703 22.916 12.5 22.916Z" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 6.25V12.5L16.6667 14.5833" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AcceptedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z" stroke="#288D68" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.375 12.4993L11.4583 14.5827L15.625 10.416" stroke="#288D68" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RejectedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.625 9.375L9.375 15.625" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.375 9.375L15.625 15.625" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2.91602V11.0827M2.91667 6.99935H11.0833" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function AsvScansDisputesTab() {
  const [raiseDisputeFinding, setRaiseDisputeFinding] = useState<RaiseDisputeFinding | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageGrid columns={4} gap={16}>
        <FilterCard
          value="2"
          label="Total Disputes"
          icon={<TotalDisputesIcon />}
          variant="gray"
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="1"
          label="Under Review"
          icon={<UnderReviewIcon />}
          variant="yellow"
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="1"
          label="Accepted"
          icon={<AcceptedIcon />}
          variant="green"
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="0"
          label="Rejected"
          icon={<RejectedIcon />}
          variant="red"
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
      </PageGrid>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          style={{
            padding: '4px 0 2px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            rowGap: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>Active Disputes</span>
            <span style={{ fontSize: 12, color: '#667085' }}>
              Disputes are formally reviewed by the ASV vendor. Accepted disputes can unblock a quarter&apos;s compliance result.
            </span>
          </div>
          <Button
            label="Raise Dispute"
            variant="primary"
            size="sm"
            icon={<PlusIcon />}
            iconPosition="left"
            onClick={() =>
              setRaiseDisputeFinding({
                cve: disputes[0].cve,
                finding: disputes[0].title,
                severity: 'Critical',
                cvss: disputes[0].cvss,
              })
            }
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {disputes.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #EAECF0',
                borderRadius: 12,
                background: '#FFFFFF',
                padding: '14px 14px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: item.priority === 'critical' ? '#F04438' : '#F79009', marginTop: 1 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{item.cve}</span>
                      <span
                        style={{
                          borderRadius: 999,
                          padding: '1px 7px',
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          color: item.priority === 'critical' ? '#B42318' : '#B54708',
                          background: item.priority === 'critical' ? '#FEF3F2' : '#FFFAEB',
                        }}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#667085' }}>{item.title}</span>
                  </div>
                </div>

                <span
                  style={{
                    borderRadius: 999,
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: item.status === 'accepted' ? '#027A48' : '#B54708',
                    background: item.status === 'accepted' ? '#ECFDF3' : '#FFFAEB',
                  }}
                >
                  {item.status === 'accepted' ? 'Accepted' : 'Under Review'}
                </span>
              </div>

              <div
                style={{
                  marginTop: 12,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Dispute ID</span>
                  <span style={{ fontSize: 13, color: '#344054' }}>{item.disputeId}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Linked Scan</span>
                  <span style={{ fontSize: 13, color: '#175CD3', fontWeight: 500 }}>{item.linkedScan}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Quarter</span>
                  <span style={{ fontSize: 13, color: '#344054' }}>{item.quarter}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Raised</span>
                  <span style={{ fontSize: 13, color: '#344054' }}>{item.raised}</span>
                </div>
              </div>

              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 3, borderTop: '1px solid #EAECF0', borderRadius: 0, padding: '10px 12px' }}>
                <span style={{ fontSize: 11, color: '#98A2B3' }}>Reason</span>
                <span style={{ fontSize: 13, color: '#344054' }}>
                  {item.reasonTitle}
                  {item.reasonLines.length > 0 ? ' — ' : ''}
                  {item.reasonLines[0] ?? ''}
                </span>
                {item.reasonLines.slice(1).map((line) => (
                  <span key={line} style={{ fontSize: 12, color: '#667085' }}>
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AsvRaiseDisputeDrawer
        isOpen={Boolean(raiseDisputeFinding)}
        finding={raiseDisputeFinding}
        onClose={() => setRaiseDisputeFinding(null)}
      />
    </div>
  );
}
