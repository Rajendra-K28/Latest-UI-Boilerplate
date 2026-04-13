import { Button, FilterCard } from '../../components';
import { colors } from '../../design-system/tokens';
import { PageGrid } from '../../ui/page';
import {
  AcknowledgedIcon,
  AssetsScannedIcon,
  BackToHistoryIcon,
  DownloadReportIcon,
  FixImplementedIcon,
  InitiatedByIcon,
  ScannedStatusIcon,
  SeverityCountCell,
  TableReattemptStatusIcon,
  TotalFindingsIcon,
  ViewFindingsChevronIcon,
} from './asvScanResultShared';

type AsvFailScanResultPageProps = {
  scanId: string;
  quarter: string;
  date: string;
  onBack: () => void;
};

const scannedAssets = [
  { ip: '203.0.113.1', hostname: 'fw-perimeter-01', type: 'Firewall', os: 'FortiOS 7.2.5', status: 'Scanned', critical: '-', high: '1', medium: '1', low: '-' },
  { ip: '203.0.113.10', hostname: 'web-server-01', type: 'Web Server', os: 'Ubuntu 22.04 LTS', status: 'Scanned', critical: '1', high: '1', medium: '3', low: '8' },
  { ip: '203.0.113.20', hostname: 'mail-server-01', type: 'Mail Server', os: 'CentOS Stream 9', status: 'Scanned', critical: '1', high: '-', medium: '2', low: '2' },
  { ip: '203.0.113.30', hostname: 'db-primary-01', type: 'Database Server', os: 'RHEL 8.9', status: 'Scanned', critical: '1', high: '-', medium: '2', low: '2' },
  { ip: '203.0.113.40', hostname: 'ci-server-01', type: 'Build Server', os: 'Ubuntu 20.04 LTS', status: 'Scanned', critical: '-', high: '1', medium: '1', low: '-' },
  { ip: '203.0.113.50', hostname: 'ftp-server-01', type: 'File Transfer', os: 'Windows Server 2019', status: 'Scanned', critical: '-', high: '1', medium: '-', low: '1' },
  { ip: '203.0.113.60', hostname: 'vpn-gateway-01', type: 'VPN Gateway', os: 'PAN-OS 11.0.3', status: 'Re-attempt', critical: '-', high: '1', medium: '-', low: '1' },
  { ip: '203.0.113.70', hostname: 'mft-server-01', type: 'MFT Server', os: 'Windows Server 2022', status: 'Re-attempt', critical: '-', high: '1', medium: '1', low: '1' },
];

const CriticalSeverityShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M15 9.75034C15 13.5003 12.375 15.3753 9.255 16.4628C9.09162 16.5182 8.91415 16.5156 8.7525 16.4553C5.625 15.3753 3 13.5003 3 9.75034V4.50034C3 4.30142 3.07902 4.11066 3.21967 3.97001C3.36032 3.82936 3.55109 3.75034 3.75 3.75034C5.25 3.75034 7.125 2.85034 8.43 1.71034C8.58889 1.57459 8.79102 1.5 9 1.5C9.20898 1.5 9.41111 1.57459 9.57 1.71034C10.8825 2.85784 12.75 3.75034 14.25 3.75034C14.4489 3.75034 14.6397 3.82936 14.7803 3.97001C14.921 4.11066 15 4.30142 15 4.50034V9.75034Z"
      stroke="#F04438"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HostUnreachableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M8.5 14.166H8.50708" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.02148 11.6374C6.68352 10.9885 7.57361 10.625 8.50065 10.625C9.42769 10.625 10.3178 10.9885 10.9798 11.6374" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.54102 9.10854C4.54545 8.12389 5.8203 7.46058 7.2031 7.20312" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.4587 9.10809C13.0322 8.69 12.5546 8.32752 12.0371 8.0293" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.41602 6.24712C2.29194 5.46376 3.29175 4.83113 4.37472 4.375" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5836 6.24839C14.5032 5.2821 13.2365 4.54708 11.8614 4.08857C10.4863 3.63005 9.03202 3.45774 7.58789 3.58223" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.41602 1.41602L15.5827 15.5827" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RetryFailedHostsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.625 6.5C1.625 5.20707 2.13861 3.96709 3.05285 3.05285C3.96709 2.13861 5.20707 1.625 6.5 1.625C7.86286 1.63013 9.17098 2.16191 10.1508 3.10917L11.375 4.33333" stroke="white" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.3743 1.625V4.33333H8.66602" stroke="white" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.375 6.5C11.375 7.79293 10.8614 9.03291 9.94715 9.94715C9.03291 10.8614 7.79293 11.375 6.5 11.375C5.13714 11.3699 3.82903 10.8381 2.84917 9.89083L1.625 8.66667" stroke="white" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.33333 8.66602H1.625V11.3743" stroke="white" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LaunchRescanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M1.875 7.5C1.875 6.00816 2.46763 4.57742 3.52252 3.52252C4.57742 2.46763 6.00816 1.875 7.5 1.875C9.07253 1.88092 10.5819 2.49451 11.7125 3.5875L13.125 5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.125 1.875V5H10" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.125 7.5C13.125 8.99184 12.5324 10.4226 11.4775 11.4775C10.4226 12.5324 8.99184 13.125 7.5 13.125C5.92747 13.1191 4.41811 12.5055 3.2875 11.4125L1.875 10" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10H1.875V13.125" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function AsvFailScanResultPage({
  scanId,
  quarter,
  date,
  onBack,
}: AsvFailScanResultPageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#101828', lineHeight: 1 }}>{scanId}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderRadius: 999, background: '#FEF3F2', color: '#B42318', fontSize: 11, fontWeight: 600 }}>FAIL</span>
            <span style={{ color: '#667085', fontSize: 13 }}>Initial Scan</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#667085', fontSize: 12 }}>
            <span>{quarter}</span>
            <span>{date}</span>
            <span>2h 18m duration</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button label="Back to History" hierarchy="secondary-gray" size="sm" icon={<BackToHistoryIcon />} onClick={onBack} />
          <Button label="Download Report" hierarchy="secondary-gray" size="sm" icon={<DownloadReportIcon />} onClick={() => undefined} />
          <Button label="Launch Rescan" variant="primary" size="sm" icon={<LaunchRescanIcon />} onClick={() => undefined} />
        </div>
      </div>

      <div
        style={{
          border: '1px solid #FECACA',
          background: '#FEF3F2',
          color: '#B42318',
          borderRadius: 8,
          padding: '10px 12px',
          fontSize: 13,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: '#FEE4E2',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CriticalSeverityShieldIcon />
        </span>
        <span style={{ marginTop: 1 }}>
          Critical and High severity findings must be remediated or formally disputed before this quarter can achieve a compliant result. A rescan is required after remediation.
        </span>
      </div>

      <div
        style={{
          border: '1px solid #FDE68A',
          background: '#FFFAEB',
          color: '#92400E',
          borderRadius: 8,
          padding: '10px 12px',
          fontSize: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: '#FEF0C7',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <HostUnreachableIcon />
          </span>
          <div style={{ fontWeight: 600, marginBottom: 0, fontSize: 14 }}>2 hosts could not be reached — Compliance Attestation Blocked</div>
        </div>
        <div style={{ color: '#B45309', fontSize: 13 }}>
          6 of 8 hosts were scanned. The following hosts timed out or refused connection and must be resolved before this scan can be submitted for PCI ASV attestation.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6, background: '#DC6803', color: '#FFFFFF', fontSize: 13, fontWeight: 500 }}>
            <RetryFailedHostsIcon />
            Retry Failed Hosts
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: 6, background: '#FEF0C7', color: '#B54708', fontFamily: 'Menlo', fontSize: 11, border: '1px solid #F9C784' }}>
            203.0.113.60 - <span style={{ color: '#B54708', fontSize: 11 }}> vpn-gateway-01</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: 6, background: '#FEF0C7', color: '#B54708', fontFamily: 'Menlo', fontSize: 11, border: '1px solid #F9C784' }}>
            203.0.113.70 - <span style={{ color: '#B54708', fontSize: 11 }}> mft-server-01</span>
          </span>
        </div>
      </div>

      <PageGrid columns={5} gap={10}>
        <FilterCard
          value="System"
          label="Initiated By"
          icon={<InitiatedByIcon />}
          variant="gray"
          valueStyle={{ fontSize: 24, lineHeight: '32px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="24 hosts"
          label="Assets Scanned"
          icon={<AssetsScannedIcon />}
          variant="blue"
          valueStyle={{ fontSize: 18, lineHeight: '28px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="21"
          label="Total Findings"
          icon={<TotalFindingsIcon />}
          variant="red"
          iconBackgroundColor="#FEF3F2"
          valueStyle={{ fontSize: 32, lineHeight: '40px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="3"
          label="Acknowledged"
          icon={<AcknowledgedIcon />}
          variant="yellow"
          valueStyle={{ fontSize: 32, lineHeight: '40px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="2"
          label="Fix Implemented"
          icon={<FixImplementedIcon />}
          variant="green"
          valueStyle={{ fontSize: 32, lineHeight: '40px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
      </PageGrid>

      <div
        style={{
          border: '1px solid #EAECF0',
          borderRadius: 12,
          background: '#FFFFFF',
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: '#FEF3F2',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <TotalFindingsIcon />
          </span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Vulnerability Management</div>
            <div style={{ fontSize: 13, color: '#667085' }}>21 findings detected across 24 scanned hosts · Q4 2025</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#B42318' }}>
            <span style={{ width: 18, height: 18, borderRadius: 2, background: '#F04438', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>2</span>
            Critical
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#B45309' }}>
            <span style={{ width: 18, height: 18, borderRadius: 2, background: '#F79009', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>5</span>
            High
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#B45309' }}>
            <span style={{ width: 18, height: 18, borderRadius: 2, background: '#FDB022', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>8</span>
            Medium
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#1D4ED8' }}>
            <span style={{ width: 18, height: 18, borderRadius: 2, background: '#3B82F6', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>6</span>
            Low
          </span>
          <button
            type="button"
            style={{
              border: 'none',
              background: 'transparent',
              padding: 0,
              color: '#175CD3',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              View findings
              <ViewFindingsChevronIcon />
            </span>
          </button>
        </div>
      </div>

      <div style={{ border: '1px solid #EAECF0', borderRadius: 12, overflow: 'hidden', background: '#FFFFFF' }}>
        <div style={{ padding: '12px 14px 8px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Scanned Assets</div>
          <div style={{ marginTop: 4, fontSize: 12 }}>
            <span style={{ color: '#667085' }}>6 of 8 hosts scanned · </span>
            <span style={{ color: '#B54708' }}>2 require re-attempt</span>
          </div>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['IP Address', 'Hostname', 'Type', 'OS / Version', 'Status', 'Critical', 'High', 'Medium', 'Low'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 11, color: '#667085', fontWeight: 500, padding: '10px 14px', borderBottom: '1px solid #EAECF0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scannedAssets.map((row) => (
                <tr key={row.ip}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#175CD3', fontSize: 13, fontFamily: 'Menlo' }}>{row.ip}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#101828', fontSize: 13 }}>{row.hostname}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#667085', fontSize: 13 }}>{row.type}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#667085', fontSize: 13, fontFamily: 'Menlo' }}>{row.os}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', fontSize: 11 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        borderRadius: 999,
                        padding: '2px 8px',
                        background: row.status === 'Scanned' ? '#ECFDF3' : '#FFF4E6',
                        color: row.status === 'Scanned' ? '#027A48' : '#B45309',
                        fontWeight: 500,
                      }}
                    >
                      {row.status === 'Scanned' ? <ScannedStatusIcon /> : <TableReattemptStatusIcon />}
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', fontSize: 12 }}>
                    <SeverityCountCell value={row.critical} kind="critical" />
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', fontSize: 12 }}>
                    <SeverityCountCell value={row.high} kind="high" />
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', fontSize: 12 }}>
                    <SeverityCountCell value={row.medium} kind="medium" />
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', fontSize: 12 }}>
                    <SeverityCountCell value={row.low} kind="low" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
