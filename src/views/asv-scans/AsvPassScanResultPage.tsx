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
  TotalFindingsIcon,
  ViewFindingsChevronIcon,
} from './asvScanResultShared';

export type AsvPassScanResultPageProps = {
  scanId: string;
  quarter: string;
  date: string;
  duration?: string;
  /** e.g. "Rescan 1" when scan is a rescan */
  rescanBadgeLabel?: string | null;
  scanTypeLabel?: string;
  initiatedBy?: string;
  hostsScannedLabel?: string;
  totalFindings?: string;
  acknowledged?: string;
  fixImplemented?: string;
  /** Subtitle quarter label for VM banner, e.g. "Q3 2025" */
  vmQuarterLabel?: string;
  mediumCount?: number;
  lowCount?: number;
  onBack: () => void;
};

const passScannedAssets = [
  { ip: '203.0.113.1', hostname: 'fw-perimeter-01', type: 'Firewall', os: 'FortiOS 7.2.5', critical: '-', high: '-', medium: '1', low: '-' },
  { ip: '203.0.113.10', hostname: 'web-server-01', type: 'Web Server', os: 'Ubuntu 22.04 LTS', critical: '-', high: '-', medium: '2', low: '3' },
  { ip: '203.0.113.20', hostname: 'mail-server-01', type: 'Mail Server', os: 'CentOS Stream 9', critical: '-', high: '-', medium: '-', low: '2' },
  { ip: '203.0.113.30', hostname: 'db-primary-01', type: 'Database Server', os: 'RHEL 8.9', critical: '-', high: '-', medium: '1', low: '1' },
  { ip: '203.0.113.40', hostname: 'ci-server-01', type: 'Build Server', os: 'Ubuntu 20.04 LTS', critical: '-', high: '-', medium: '-', low: '1' },
  { ip: '203.0.113.50', hostname: 'ftp-server-01', type: 'File Transfer', os: 'Windows Server 2019', critical: '-', high: '-', medium: '-', low: '1' },
];

const ComplianceShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M15 9.75034C15 13.5003 12.375 15.3753 9.255 16.4628C9.09162 16.5182 8.91415 16.5156 8.7525 16.4553C5.625 15.3753 3 13.5003 3 9.75034V4.50034C3 4.30142 3.07902 4.11066 3.21967 3.97001C3.36032 3.82936 3.55109 3.75034 3.75 3.75034C5.25 3.75034 7.125 2.85034 8.43 1.71034C8.58889 1.57459 8.79102 1.5 9 1.5C9.20898 1.5 9.41111 1.57459 9.57 1.71034C10.8825 2.85784 12.75 3.75034 14.25 3.75034C14.4489 3.75034 14.6397 3.82936 14.7803 3.97001C14.921 4.11066 15 4.30142 15 4.50034V9.75034Z"
      stroke="#12B76A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ValidatedCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path
      d="M7 12.25C9.89949 12.25 12.25 9.89949 12.25 7C12.25 4.10051 9.89949 1.75 7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.89949 4.10051 12.25 7 12.25Z"
      stroke="#266DF0"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4.5 7L6.25 8.75L9.5 5.5" stroke="#266DF0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Green shield with exclamation for pass VM banner */
const VmPassShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M15 9.75034C15 13.5003 12.375 15.3753 9.255 16.4628C9.09162 16.5182 8.91415 16.5156 8.7525 16.4553C5.625 15.3753 3 13.5003 3 9.75034V4.50034C3 4.30142 3.07902 4.11066 3.21967 3.97001C3.36032 3.82936 3.55109 3.75034 3.75 3.75034C5.25 3.75034 7.125 2.85034 8.43 1.71034C8.58889 1.57459 8.79102 1.5 9 1.5C9.20898 1.5 9.41111 1.57459 9.57 1.71034C10.8825 2.85784 12.75 3.75034 14.25 3.75034C14.4489 3.75034 14.6397 3.82936 14.7803 3.97001C14.921 4.11066 15 4.30142 15 4.50034V9.75034Z"
      stroke="#039855"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 7.5V9.75" stroke="#039855" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12H9.006" stroke="#039855" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function AsvPassScanResultPage({
  scanId,
  quarter,
  date,
  duration = '2h 05m duration',
  rescanBadgeLabel = null,
  scanTypeLabel = 'Compliance Scan',
  initiatedBy = 'Sarah Chen',
  hostsScannedLabel = '22 hosts',
  totalFindings = '11',
  acknowledged = '1',
  fixImplemented = '0',
  vmQuarterLabel = 'Q3 2025',
  mediumCount = 3,
  lowCount = 8,
  onBack,
}: AsvPassScanResultPageProps) {
  const findingsLine = `${totalFindings} findings detected across ${hostsScannedLabel.replace(/\s*hosts?\s*/i, '')} scanned hosts · ${vmQuarterLabel}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#101828', lineHeight: 1 }}>{scanId}</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 8px',
                borderRadius: 999,
                background: '#ECFDF3',
                color: '#027A48',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              PASS
            </span>
            {rescanBadgeLabel ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: '#EFF8FF',
                  color: '#175CD3',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {rescanBadgeLabel}
              </span>
            ) : null}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#027A48', fontSize: 13, fontWeight: 500 }}>
              <ComplianceShieldIcon />
              {scanTypeLabel}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#175CD3', fontSize: 13, fontWeight: 500 }}>
              <ValidatedCheckIcon />
              Validated
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#667085', fontSize: 12 }}>
            <span>{quarter}</span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button label="Back to History" hierarchy="secondary-gray" size="sm" icon={<BackToHistoryIcon />} onClick={onBack} />
          <Button label="Download Report" hierarchy="secondary-gray" size="sm" icon={<DownloadReportIcon />} onClick={() => undefined} />
        </div>
      </div>

      <PageGrid columns={5} gap={10}>
        <FilterCard
          value={initiatedBy}
          label="Initiated By"
          icon={<InitiatedByIcon />}
          variant="gray"
          valueStyle={{ fontSize: 24, lineHeight: '32px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value={hostsScannedLabel}
          label="Assets Scanned"
          icon={<AssetsScannedIcon />}
          variant="blue"
          valueStyle={{ fontSize: 18, lineHeight: '28px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value={totalFindings}
          label="Total Findings"
          icon={<TotalFindingsIcon />}
          variant="red"
          iconBackgroundColor="#FEF3F2"
          valueStyle={{ fontSize: 32, lineHeight: '40px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value={acknowledged}
          label="Acknowledged"
          icon={<AcknowledgedIcon />}
          variant="yellow"
          valueStyle={{ fontSize: 32, lineHeight: '40px' }}
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value={fixImplemented}
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
              background: '#ECFDF3',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <VmPassShieldIcon />
          </span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Vulnerability Management</div>
            <div style={{ fontSize: 13, color: '#667085' }}>{findingsLine}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#B45309' }}>
            <span
              style={{
                minWidth: 22,
                height: 22,
                borderRadius: 999,
                padding: '0 6px',
                background: '#FFFAEB',
                color: '#B54708',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {mediumCount}
            </span>
            Medium
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#1D4ED8' }}>
            <span
              style={{
                minWidth: 22,
                height: 22,
                borderRadius: 999,
                padding: '0 6px',
                background: '#E9F0FE',
                color: '#1849A9',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {lowCount}
            </span>
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
          <div style={{ marginTop: 4, fontSize: 12, color: '#667085' }}>6 hosts in scope</div>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['IP Address', 'Hostname', 'Type', 'OS / Version', 'Status', 'Critical', 'High', 'Medium', 'Low'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      fontSize: 11,
                      color: '#667085',
                      fontWeight: 500,
                      padding: '10px 14px',
                      borderBottom: '1px solid #EAECF0',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {passScannedAssets.map((row) => (
                <tr key={row.ip}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#175CD3', fontSize: 13, fontFamily: 'Menlo, monospace' }}>{row.ip}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#101828', fontSize: 13 }}>{row.hostname}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#667085', fontSize: 13 }}>{row.type}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', color: '#667085', fontSize: 13, fontFamily: 'Menlo, monospace' }}>{row.os}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #F2F4F7', fontSize: 11 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        borderRadius: 999,
                        padding: '2px 8px',
                        background: '#ECFDF3',
                        color: '#027A48',
                        fontWeight: 500,
                      }}
                    >
                      <ScannedStatusIcon />
                      Scanned
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
