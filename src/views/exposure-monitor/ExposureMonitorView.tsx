import { useMemo, useState } from 'react';
import { Page, PageHeader } from '../../ui/page/Page';
import { ExposureMonitorSummarySection } from './ExposureMonitorSummarySection';
import { ExposureMonitorTableSection } from './ExposureMonitorTableSection';
import { ScanDetailsDrawer } from './ScanDetailsDrawer';
import { ExposureVulnerabilityDetailsDrawer } from './ExposureVulnerabilityDetailsDrawer';
import type { FindingRow } from '../vulnerability-management/constants';
import type { VulnAccordionId } from '../vulnerability-management/types';

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type TimelineEvent = {
  type: 'reopened' | 'closed' | 'fix-implemented' | 'detected';
  actor: string;
  role: string;
  date: string;
  mttrLabel?: string;
  description: string;
};

export type ExposureRecord = {
  id: string;
  vulnerability: string;
  occurrences?: string;
  asset: string;
  severity: Severity;
  cvss: number;
  discovered: string;
  status: string;
  category: string;
  remediationCycles: number;
  avgMttr: string;
  recurrenceCount: number;
  vulnerabilityId: string;
  endpoint: string;
  portsProtocol: string;
  scanIds: string[];
  latestScanId: string;
  timeline: TimelineEvent[];
};

const EXPOSURES: ExposureRecord[] = [
  {
    id: 'CVE-2024-1234',
    vulnerability: 'Weak SSL/TLS Cipher Suites Enabled',
    occurrences: '3x',
    asset: 'Production DMZ Network',
    severity: 'critical',
    cvss: 9.8,
    discovered: '2 days ago',
    status: 'Reopened',
    category: 'Cryptography',
    remediationCycles: 3,
    avgMttr: '14d',
    recurrenceCount: 3,
    vulnerabilityId: 'a3f7c2e1d48f90a12cd345e6789012',
    endpoint: 'https://prod-dmz.internal:443',
    portsProtocol: 'TCP/443 – TLSv1.0, RC4-SHA',
    scanIds: ['SCN-2025-00047', 'SCN-2025-00089', 'SCN-2026-00012', 'SCN-2026-00124'],
    latestScanId: 'SCN-2025-00047',
    timeline: [
      {
        type: 'reopened',
        actor: 'Scanner (Auto)',
        role: '',
        date: 'Feb 20, 2026',
        description: 'Weak cipher suites still present after patch rollback.',
      },
      {
        type: 'closed',
        actor: 'Alex Chen',
        role: '',
        date: 'Jan 18, 2026',
        mttrLabel: 'MTTR: 11d',
        description: 'Fix verified in prod. TLSv1.0 disabled.',
      },
      {
        type: 'fix-implemented',
        actor: 'Sarah Kim',
        role: '',
        date: 'Jan 14, 2026',
        description: 'Deployed cipher suite hardening config.',
      },
      {
        type: 'detected',
        actor: 'Scanner (Auto)',
        role: '',
        date: 'Jan 03, 2026',
        description: 'Legacy TLS config inherited from old load balancer template.',
      },
    ],
  },
  {
    id: 'CVE-2024-5678',
    vulnerability: 'Outdated OpenSSH Version with Known Vulnerabilities',
    occurrences: '1x',
    asset: 'Database Server Cluster',
    severity: 'high',
    cvss: 7.4,
    discovered: '5 days ago',
    status: 'Fix implemented',
    category: 'Cryptography',
    remediationCycles: 2,
    avgMttr: '9d',
    recurrenceCount: 1,
    vulnerabilityId: 'b1c2d3e4f5678901234567890abcde',
    endpoint: 'ssh://db-cluster.internal:22',
    portsProtocol: 'TCP/22 – OpenSSH 7.2p2',
    scanIds: ['SCN-2026-00210'],
    latestScanId: 'SCN-2026-00210',
    timeline: [],
  },
  {
    id: 'CVE-2024-9012',
    vulnerability: 'Unpatched Network Switch Firmware',
    occurrences: '–',
    asset: 'Corporate Network Infrastructure',
    severity: 'high',
    cvss: 7.1,
    discovered: '1 week ago',
    status: 'Rescan pending',
    category: 'Patch Management',
    remediationCycles: 1,
    avgMttr: '–',
    recurrenceCount: 0,
    vulnerabilityId: 'c4d5e6f7a8901234567890abcdef12',
    endpoint: 'switch-core-01.internal',
    portsProtocol: 'N/A – firmware',
    scanIds: ['SCN-2026-00301'],
    latestScanId: 'SCN-2026-00301',
    timeline: [],
  },
  {
    id: 'CVE-2023-3456',
    vulnerability: 'Outdated OpenSSL Version (1.0.2)',
    occurrences: '2x',
    asset: 'Corporate Network Infrastructure',
    severity: 'critical',
    cvss: 9.1,
    discovered: '3 days ago',
    status: 'Fix in progress',
    category: 'Cryptography',
    remediationCycles: 2,
    avgMttr: '12d',
    recurrenceCount: 1,
    vulnerabilityId: 'd5e6f7a8b901234567890abcde1234',
    endpoint: 'https://vpn-gateway.internal:443',
    portsProtocol: 'TCP/443 – OpenSSL 1.0.2',
    scanIds: ['SCN-2026-00411'],
    latestScanId: 'SCN-2026-00411',
    timeline: [],
  },
  {
    id: 'CVE-2024-7890',
    vulnerability: 'Open SMB Port Exposed to Internet',
    occurrences: '–',
    asset: 'Main Firewall Cluster',
    severity: 'medium',
    cvss: 5.3,
    discovered: '2 weeks ago',
    status: 'Closed',
    category: 'Configuration',
    remediationCycles: 1,
    avgMttr: '7d',
    recurrenceCount: 0,
    vulnerabilityId: 'e6f7a8b9c01234567890abcdef1234',
    endpoint: 'fw-cluster.edge.internal',
    portsProtocol: 'TCP/445 – SMB',
    scanIds: ['SCN-2025-00901'],
    latestScanId: 'SCN-2025-00901',
    timeline: [],
  },
  {
    id: 'CVE-2024-2468',
    vulnerability: 'Insufficient Transport Layer Protection',
    occurrences: '–',
    asset: 'VPN Gateway Infrastructure',
    severity: 'high',
    cvss: 7.5,
    discovered: '4 days ago',
    status: 'Detected',
    category: 'Cryptography',
    remediationCycles: 0,
    avgMttr: '–',
    recurrenceCount: 0,
    vulnerabilityId: 'f7a8b9c0d1234567890abcdef12345',
    endpoint: 'vpn.acme.inc',
    portsProtocol: 'TCP/443 – TLSv1.2',
    scanIds: ['SCN-2026-00521'],
    latestScanId: 'SCN-2026-00521',
    timeline: [],
  },
  {
    id: 'CVE-2024-1357',
    vulnerability: 'Default SNMP Community Strings in Use',
    occurrences: '–',
    asset: 'AWS Cloud Infrastructure',
    severity: 'medium',
    cvss: 4.7,
    discovered: '1 week ago',
    status: 'Fix implemented',
    category: 'Configuration',
    remediationCycles: 1,
    avgMttr: '5d',
    recurrenceCount: 0,
    vulnerabilityId: '0a1b2c3d4e567890abcdef12345678',
    endpoint: 'snmp.aws.internal',
    portsProtocol: 'UDP/161 – SNMPv2c',
    scanIds: ['SCN-2025-00811'],
    latestScanId: 'SCN-2025-00811',
    timeline: [],
  },
];

export function VulnerabilitiesView() {
  const [selectedExposure, setSelectedExposure] = useState<ExposureRecord | null>(null);
  const [scanDetailsExposure, setScanDetailsExposure] = useState<ExposureRecord | null>(null);
  const [openVulnAccordion, setOpenVulnAccordion] = useState<VulnAccordionId>('threat');

  const activeExposures = useMemo(
    () => EXPOSURES.filter((item) => item.status.toLowerCase() !== 'closed'),
    [],
  );

  const severityCounts = useMemo(() => {
    return activeExposures.reduce(
      (acc, item) => {
        acc[item.severity] += 1;
        return acc;
      },
      {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      } as Record<Severity, number>,
    );
  }, [activeExposures]);

  const totalActiveIssues = activeExposures.length;
  const recurrenceRate = 50;

  const toFindingRow = (exposure: ExposureRecord): FindingRow => {
    const severity: FindingRow['severity'] = exposure.severity === 'critical'
      ? 'Critical'
      : exposure.severity === 'high'
        ? 'High'
        : exposure.severity === 'medium'
          ? 'Medium'
          : 'Low';
    const normalizedStatus = exposure.status.toLowerCase();
    const complianceStatus = normalizedStatus === 'closed' || normalizedStatus === 'fix implemented' ? 'PASS' : 'FAIL';

    return {
      id: exposure.id,
      finding: exposure.vulnerability,
      cve: exposure.id,
      cvss: exposure.cvss.toFixed(1),
      severity,
      severityColor: severity === 'Critical' ? '#F04438' : severity === 'High' ? '#F79009' : severity === 'Medium' ? '#FDB022' : '#2563EB',
      ip: exposure.endpoint,
      hostname: exposure.asset,
      port: exposure.portsProtocol,
      complianceStatus,
      complianceReason: exposure.timeline[0]?.description ?? 'Detected during exposure monitoring workflow.',
      currentStatus: exposure.status,
    };
  };

  const selectedFinding = selectedExposure ? toFindingRow(selectedExposure) : null;
  const activeExposureIndex = selectedExposure ? EXPOSURES.findIndex((item) => item.id === selectedExposure.id) : -1;
  const canPreviousExposure = activeExposureIndex > 0;
  const canNextExposure = activeExposureIndex >= 0 && activeExposureIndex < EXPOSURES.length - 1;

  return (
    <Page>
      <PageHeader
        title="Exposure Monitor"
        description="Monitor vulnerability exposure across Acme Works Inc assets. QSA / ASV employee view."
      />

      <ExposureMonitorSummarySection
        totalActiveIssues={totalActiveIssues}
        severityCounts={severityCounts}
        recurrenceRate={recurrenceRate}
      />

      <ExposureMonitorTableSection
        exposures={EXPOSURES}
        onSelectExposure={(exposure) => setSelectedExposure(exposure)}
      />

      {selectedExposure && selectedFinding && (
        <ExposureVulnerabilityDetailsDrawer
          finding={selectedFinding}
          onClose={() => setSelectedExposure(null)}
          openVulnAccordion={openVulnAccordion}
          onOpenVulnAccordion={setOpenVulnAccordion}
          onPrevious={() => {
            if (!canPreviousExposure) return;
            setSelectedExposure(EXPOSURES[activeExposureIndex - 1]);
          }}
          onNext={() => {
            if (!canNextExposure) return;
            setSelectedExposure(EXPOSURES[activeExposureIndex + 1]);
          }}
          canPrevious={canPreviousExposure}
          canNext={canNextExposure}
        />
      )}

      {scanDetailsExposure && (
        <ScanDetailsDrawer
          exposure={scanDetailsExposure}
          onClose={() => setScanDetailsExposure(null)}
        />
      )}
    </Page>
  );
}

