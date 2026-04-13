import { spacing, colors } from '../../design-system/tokens';
import {
  AlertTriangle,
  Clock,
  Database,
  Shield,
  ShieldFilled,
} from '../../components';

export type AssetVulnerability = {
  id: string;
  title: string;
  cveId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvss: number;
  status: 'Open' | 'In Progress' | 'Accepted';
  portProtocol: string;
  discoveredDate: string;
};

export const renderDeltaFooter = (
  direction: 'up' | 'down',
  value: string,
  caption: string,
  color: string,
) => {
  const isUp = direction === 'up';
  const arrowSymbol = isUp ? '↗' : '↘';
  const background = isUp ? '#FEF3F2' : '#ECFDF3';

  return (
    <>
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
      <span
        style={{
          fontSize: '12px',
          color: colors.text.neutral.sub,
        }}
      >
        {caption}
      </span>
    </>
  );
};

export const getFilterCards = (hasProjects: boolean) =>
  hasProjects
    ? [
        {
          icon: <ShieldFilled />,
          value: 23,
          label: 'Critical assets at risk',
          variant: 'red' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('up', '+3', 'vs. 30-day avg', colors.red[500]),
        },
        {
          icon: <AlertTriangle />,
          value: 237,
          label: 'Total vulnerabilities',
          variant: 'yellow' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('down', '-18', 'vs. 30-day avg', colors.green[400]),
        },
        {
          icon: <Clock />,
          value: '4.2d',
          label: 'Avg. remediation time',
          variant: 'green' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('down', '-0.8d', 'vs. 30-day avg', colors.green[400]),
        },
        {
          icon: <Database />,
          value: 147,
          label: 'Total assets',
          variant: 'blue' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('up', '+12', 'vs. 30-day avg', colors.green[400]),
        },
      ]
    : [
        {
          icon: <ShieldFilled />,
          value: 0,
          label: 'Critical assets at risk',
          variant: 'red' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('up', '0', 'vs. 30-day avg', colors.text.neutral.sub),
        },
        {
          icon: <AlertTriangle />,
          value: 0,
          label: 'Total vulnerabilities',
          variant: 'yellow' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('down', '0', 'vs. 30-day avg', colors.text.neutral.sub),
        },
        {
          icon: <Clock />,
          value: '0.0d',
          label: 'Avg. remediation time',
          variant: 'green' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('down', '0.0d', 'vs. 30-day avg', colors.text.neutral.sub),
        },
        {
          icon: <Database />,
          value: 0,
          label: 'Total assets',
          variant: 'blue' as const,
          showAccentBar: true,
          footer: renderDeltaFooter('up', '0', 'vs. 30-day avg', colors.text.neutral.sub),
        },
      ];

export const criticalAssets = [
  {
    id: 'asset-1',
    name: 'prod-web-server-01',
    ipAddress: '203.0.113.45',
    type: 'Server',
    riskScore: 'Critical',
    icon: <Database />,
    iconBg: '#EEF4FF',
    iconColor: '#266DF0',
    critical: 3,
    high: 7,
    medium: 12,
    low: 8,
    lastScanned: 'Feb 14, 2026',
  },
  {
    id: 'asset-2',
    name: 'payment-gateway-01',
    ipAddress: '203.0.113.50',
    type: 'Server',
    riskScore: 'Critical',
    icon: <ShieldFilled />,
    iconBg: '#FFF4ED',
    iconColor: '#F97316',
    critical: 2,
    high: 5,
    medium: 9,
    low: 4,
    lastScanned: 'Feb 13, 2026',
  },
  {
    id: 'asset-3',
    name: 'aws-load-balancer',
    ipAddress: '203.0.113.100',
    type: 'Cloud',
    riskScore: 'High',
    icon: <ShieldFilled />,
    iconBg: '#F4EBFF',
    iconColor: '#7A5AF8',
    critical: 2,
    high: 4,
    medium: 7,
    low: 11,
    lastScanned: 'Feb 15, 2026',
  },
  {
    id: 'asset-4',
    name: 'core-firewall-01',
    ipAddress: '10.0.0.1',
    type: 'Firewall',
    riskScore: 'Critical',
    icon: <Shield />,
    iconBg: '#FEF3F2',
    iconColor: '#F04438',
    critical: 1,
    high: 6,
    medium: 5,
    low: 2,
    lastScanned: 'Feb 12, 2026',
  },
  {
    id: 'asset-5',
    name: 'vpn-gateway-ext',
    ipAddress: '203.0.113.21',
    type: 'Network',
    riskScore: 'High',
    icon: <ShieldFilled />,
    iconBg: '#ECFDF3',
    iconColor: '#12B76A',
    critical: 1,
    high: 3,
    medium: 8,
    low: 6,
    lastScanned: 'Feb 10, 2026',
  },
];

export const assetVulnerabilities: Record<string, AssetVulnerability[]> = {
  'asset-1': [
    {
      id: 'vuln-1',
      title: 'XZ Utils backdoor — remote code execution via liblzma',
      cveId: 'CVE-2024-3094',
      severity: 'critical',
      cvss: 10.0,
      status: 'Open',
      portProtocol: '22/tcp / SSH',
      discoveredDate: 'Feb 14, 2026',
    },
    {
      id: 'vuln-2',
      title: 'OpenSSL heap buffer overflow in X.509 certificate parsing',
      cveId: 'CVE-2024-1234',
      severity: 'critical',
      cvss: 9.8,
      status: 'In Progress',
      portProtocol: '443/tcp / HTTPS',
      discoveredDate: 'Feb 13, 2026',
    },
    {
      id: 'vuln-3',
      title: 'HTTP/2 Rapid Reset Attack (denial of service)',
      cveId: 'CVE-2023-44487',
      severity: 'high',
      cvss: 7.5,
      status: 'Open',
      portProtocol: '443/tcp / HTTPS',
      discoveredDate: 'Feb 14, 2026',
    },
    {
      id: 'vuln-4',
      title: 'Apache HTTP Server path traversal via mod_rewrite',
      cveId: 'CVE-2022-31813',
      severity: 'medium',
      cvss: 5.3,
      status: 'Accepted',
      portProtocol: '80/tcp / HTTP',
      discoveredDate: 'Feb 10, 2026',
    },
    {
      id: 'vuln-5',
      title: 'Outdated OpenSSH version with multiple low-severity issues',
      cveId: 'Multiple',
      severity: 'low',
      cvss: 3.1,
      status: 'In Progress',
      portProtocol: '22/tcp / SSH',
      discoveredDate: 'Feb 9, 2026',
    },
  ],
};

export const vulnerabilityOverview = {
  totalOpen: 237,
  trendDirection: 'down',
  trendLabel: '-18 this month',
  timeRange: 'Last 180 days',
  severities: [
    {
      id: 'critical',
      label: 'Critical',
      percent: 5,
      change: '-33%',
      changeDirection: 'down' as const,
      count: 12,
      barColor: '#F04438',
    },
    {
      id: 'high',
      label: 'High',
      percent: 14,
      change: '+17%',
      changeDirection: 'up' as const,
      count: 34,
      barColor: '#F97316',
    },
    {
      id: 'medium',
      label: 'Medium',
      percent: 28,
      change: '-7%',
      changeDirection: 'down' as const,
      count: 67,
      barColor: '#FDB022',
    },
    {
      id: 'low',
      label: 'Low',
      percent: 52,
      change: '+15%',
      changeDirection: 'up' as const,
      count: 124,
      barColor: '#3366FF',
    },
  ],
};

export const scanActivities = [
  {
    id: 'scan-1',
    name: 'Q1 2026 PCI ASV Compliance Scan',
    icon: <Shield />,
    iconBg: '#ECFDF3',
    iconColor: '#027A48',
    assetsLabel: '13 assets',
    status: {
      label: 'Completed',
      color: '#027A48',
      bg: '#ECFDF3',
    },
    timeLabel: '2 hours ago',
    type: {
      label: 'PCI ASV',
      color: '#7A5AF8',
      bg: '#F4EBFF',
    },
    counts: {
      critical: 2,
      high: 5,
      medium: 12,
      low: 18,
    },
    progress: {
      percentage: 100,
      color: '#027A48',
      label: 'Completed',
    },
  },
  {
    id: 'scan-2',
    name: 'Production Network External Scan',
    icon: <ShieldFilled />,
    iconBg: '#FFF4ED',
    iconColor: '#F97316',
    assetsLabel: '65 assets',
    status: {
      label: 'Running',
      color: '#B54708',
      bg: '#FFFAEB',
    },
    timeLabel: 'Scanning in progress…',
    type: {
      label: 'External VA',
      color: '#3366FF',
      bg: '#EFF4FF',
    },
    counts: {
      critical: 1,
      high: 8,
      medium: 12,
      low: 18,
    },
    progress: {
      percentage: 47,
      color: '#F97316',
      label: '47%',
    },
  },
  {
    id: 'scan-3',
    name: 'DMZ Network External VA',
    icon: <ShieldFilled />,
    iconBg: '#EEF4FF',
    iconColor: '#266DF0',
    assetsLabel: '24 assets',
    status: {
      label: 'Completed',
      color: '#027A48',
      bg: '#ECFDF3',
    },
    timeLabel: '5 hours ago',
    type: {
      label: 'External VA',
      color: '#3366FF',
      bg: '#EFF4FF',
    },
    counts: {
      critical: 1,
      high: 3,
      medium: 8,
      low: 14,
    },
    progress: {
      percentage: 100,
      color: '#027A48',
      label: 'Completed',
    },
  },
  {
    id: 'scan-4',
    name: 'Cloud Infrastructure Assessment',
    icon: <Shield />,
    iconBg: '#FEF3F2',
    iconColor: '#F04438',
    assetsLabel: '18 assets',
    status: {
      label: 'Failed',
      color: '#B42318',
      bg: '#FEF3F2',
    },
    timeLabel: 'Yesterday',
    type: {
      label: 'External VA',
      color: '#3366FF',
      bg: '#EFF4FF',
    },
    counts: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 14,
    },
    progress: {
      percentage: 100,
      color: '#B42318',
      label: 'Failed',
    },
  },
];

export const upcomingSchedules = [
  {
    id: 'schedule-1',
    type: {
      label: 'PCI ASV',
      bg: '#F4EBFF',
      color: '#7A5AF8',
    },
    name: 'PCI ASV Compliance Scan',
    date: 'Mar 1, 2026',
    assets: '24 assets',
  },
  {
    id: 'schedule-2',
    type: {
      label: 'External VA',
      bg: '#E0F2FE',
      color: '#0EA5E9',
    },
    name: 'Cloud Infrastructure Assessment',
    date: 'Mar 8, 2026',
    assets: '32 assets',
  },
  {
    id: 'schedule-3',
    type: {
      label: 'External VA',
      bg: '#E0F2FE',
      color: '#0EA5E9',
    },
    name: 'Quarterly Perimeter Scan',
    date: 'Mar 15, 2026',
    assets: '58 assets',
  },
  {
    id: 'schedule-4',
    type: {
      label: 'PCI ASV',
      bg: '#F4EBFF',
      color: '#7A5AF8',
    },
    name: 'Q2 2026 PCI ASV Submission Scan',
    date: 'Apr 2, 2026',
    assets: '24 assets',
  },
];

