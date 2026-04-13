import { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Page, PageSection } from '../ui/page';
import { Button, Plus, Tag, TextInput, UploadCloud, Download, Checkbox, Trash, Info, AlertTriangle, CheckCircleFilled, ChevronUp, ChevronDown, ChevronRight, ToastStack, type ToastItem, type TableColumn, type TagVariant, CheckCircle, Shield, SideDrawer, Eye, Database, Clock, Calendar } from '../components';
import { colors, spacing } from '../design-system/tokens';
import { AddAssetDrawer } from './security-dashboard/components/add-asset';
import { ScanComponentsHeader } from './scan-components/ScanComponentsHeader';
import { FilterCardsSection } from './scan-components/FilterCardsSection';
import { AssetsTableSection } from './scan-components/AssetsTableSection';
import { ScanProgressDrawer } from './scan-components/ScanProgressDrawer';
import { ScanQueuedDrawer } from './scan-components/ScanQueuedDrawer';
import { FailedValidationDrawer } from './scan-components/FailedValidationDrawer';
import { AssetSummaryDrawer } from './scan-components/AssetSummaryDrawer';
import { AssetVulnerabilitiesDrawer } from './scan-components/AssetVulnerabilitiesDrawer';
import { NeverScannedAssetDrawer } from './scan-components/NeverScannedAssetDrawer';
import { ASSETS } from './scan-components/scanComponentsData';

type AssetReachability = 'validated' | 'setup-required' | 'failed';
type AssetScanStatus = 'completed' | 'scanning' | 'queued' | 'failed' | 'never-scanned';
export type AssetStatusFilter = 'all' | AssetScanStatus;

type VulnerabilityCounts = {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
};

type AssetType =
  | 'web-server'
  | 'firewall'
  | 'load-balancer'
  | 'router'
  | 'application-server'
  | 'vm-cluster'
  | 'database';

export type AssetRecord = {
  id: string;
  name: string;
  ipAddress: string;
  type: AssetType;
  typeLabel: string;
  reachability: AssetReachability;
  scanStatus: AssetScanStatus;
  vulnerabilities: VulnerabilityCounts;
  lastScanned: string;
  scanId?: string;
  actionLabel?: string;
  actionDisabled?: boolean;
  scanProgress?: number;
};

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

type AssetRow = {
  id: string;
  assetName: string;
  endpoint: string;
  assetType: string;
};

const assetTypeOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'All types' },
  { value: 'web-server', label: 'Web Server' },
  { value: 'firewall', label: 'Firewall' },
  { value: 'load-balancer', label: 'Load Balancer' },
  { value: 'router', label: 'Router' },
  { value: 'application-server', label: 'Application Server' },
  { value: 'vm-cluster', label: 'VM Cluster' },
  { value: 'database', label: 'Database Server' },
];

const statusFilterLabels: Record<AssetStatusFilter, string> = {
  all: 'View all',
  completed: 'Completed',
  scanning: 'Scanning',
  queued: 'Queued',
  failed: 'Failed',
  'never-scanned': 'Never Scanned',
};

// legacy helpers unused in new UI kept for potential reuse

const severityDotColors: Record<keyof VulnerabilityCounts, string> = {
  critical: '#F04438',
  high: '#F79009',
  medium: '#2E90FA',
  low: '#12B76A',
  info: '#667085',
};

const severityDotLabels: Record<keyof VulnerabilityCounts, string> = {
  critical: 'C',
  high: 'H',
  medium: 'M',
  low: 'L',
  info: 'I',
};

const statusChipOrder: AssetStatusFilter[] = [
  'all',
  'completed',
  'scanning',
  'queued',
  'failed',
  'never-scanned',
];

const assetTypeVariantMap: Record<AssetType, TagVariant> = {
  'web-server': 'blue',
  firewall: 'purple',
  'load-balancer': 'gray',
  router: 'green',
  'application-server': 'yellow',
  'vm-cluster': 'purple',
  database: 'red',
};

const reachabilityDotColor: Record<AssetReachability, string> = {
  validated: '#12B76A',
  'setup-required': '#F79009',
  failed: '#F04438',
};

const scanStatusDotColor: Record<AssetScanStatus, string> = {
  completed: '#12B76A',
  scanning: '#2E90FA',
  queued: '#F79009',
  failed: '#F04438',
  'never-scanned': '#667085',
};

export const AssetIcon = ({ type }: { type: AssetType }) => {
  const bg =
    type === 'web-server'
      ? '#EEF4FF'
      : type === 'firewall'
        ? '#FEF3F2'
        : type === 'load-balancer'
          ? '#ECFDF3'
          : type === 'router'
            ? '#F2F4F7'
            : type === 'application-server'
              ? '#F9F5FF'
              : type === 'vm-cluster'
                ? '#FFF1F3'
                : '#FFF7ED';
  const color =
    type === 'web-server'
      ? '#155EEF'
      : type === 'firewall'
        ? '#D92D20'
        : type === 'load-balancer'
          ? '#039855'
          : type === 'router'
            ? '#344054'
            : type === 'application-server'
              ? '#7F56D9'
              : type === 'vm-cluster'
                ? '#C01048'
                : '#B54708';

  let glyph: React.ReactNode;

  if (type === 'web-server' || type === 'application-server') {
    // stacked server icon
    glyph = (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <rect
          x="3"
          y="4"
          width="14"
          height="4"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="3"
          y="9"
          width="14"
          height="4"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="3"
          y="14"
          width="14"
          height="4"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="6" cy="6" r="0.9" fill="currentColor" />
        <circle cx="6" cy="11" r="0.9" fill="currentColor" />
        <circle cx="6" cy="16" r="0.9" fill="currentColor" />
      </svg>
    );
  } else if (type === 'firewall') {
    // shield icon
    glyph = (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 2L4 5V10C4 13.8 6.7 17.1 10 18C13.3 17.1 16 13.8 16 10V5L10 2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  } else if (type === 'router' || type === 'vm-cluster') {
    // network nodes icon
    glyph = (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="5" cy="5" r="2" fill="currentColor" />
        <circle cx="15" cy="5" r="2" fill="currentColor" />
        <circle cx="10" cy="14" r="2" fill="currentColor" />
        <path
          d="M6.6 6.2L9 12M13.4 6.2L11 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M7 5H13"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  } else if (type === 'load-balancer') {
    // load balancer / traffic icon
    glyph = (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="4" r="1.6" fill="currentColor" />
        <circle cx="5" cy="15" r="1.6" fill="currentColor" />
        <circle cx="15" cy="15" r="1.6" fill="currentColor" />
        <path
          d="M10 6v3.5M10 9.5l-4 3M10 9.5l4 3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else if (type === 'database') {
    // database cylinder
    glyph = (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <ellipse
          cx="10"
          cy="4"
          rx="5"
          ry="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M5 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M5 8c0 1.1 2.2 2 5 2s5-.9 5-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    );
  } else {
    // generic fallback
    glyph = (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <rect
          x="4"
          y="4"
          width="12"
          height="12"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        flexShrink: 0,
        fontSize: 14,
      }}
    >
      {glyph}
    </span>
  );
};

export const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 30 30"
    aria-hidden="true"
  >
    <path
      d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"
      fill="currentColor"
    />
  </svg>
);

export const renderSimpleDeltaFooter = (direction: 'up' | 'down', value: string, color: string) => {
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
};

const MetricsIcon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    aria-hidden="true"
    fill="none"
  >
    {children}
  </svg>
);

const AssetsIcon = () => (
  <MetricsIcon>
    <path
      d="M20.8333 2.08398H4.16659C3.01599 2.08398 2.08325 3.01672 2.08325 4.16732V8.33398C2.08325 9.48458 3.01599 10.4173 4.16659 10.4173H20.8333C21.9838 10.4173 22.9166 9.48458 22.9166 8.33398V4.16732C22.9166 3.01672 21.9838 2.08398 20.8333 2.08398Z"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.8333 14.584H4.16659C3.01599 14.584 2.08325 15.5167 2.08325 16.6673V20.834C2.08325 21.9846 3.01599 22.9173 4.16659 22.9173H20.8333C21.9838 22.9173 22.9166 21.9846 22.9166 20.834V16.6673C22.9166 15.5167 21.9838 14.584 20.8333 14.584Z"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 6.25H6.26"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 18.75H6.26"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MetricsIcon>
);

const ActiveScansIcon = () => (
  <MetricsIcon>
    <path
      d="M22.9166 12.5007H20.3333C19.878 12.4997 19.435 12.6478 19.0719 12.9225C18.7089 13.1971 18.4457 13.5831 18.3228 14.0215L15.8749 22.7298C15.8591 22.7839 15.8262 22.8314 15.7812 22.8652C15.7361 22.899 15.6813 22.9173 15.6249 22.9173C15.5686 22.9173 15.5137 22.899 15.4687 22.8652C15.4236 22.8314 15.3907 22.7839 15.3749 22.7298L9.62492 2.27148C9.60914 2.21739 9.57625 2.16988 9.53117 2.13607C9.48609 2.10226 9.43126 2.08398 9.37492 2.08398C9.31857 2.08398 9.26375 2.10226 9.21867 2.13607C9.17359 2.16988 9.1407 2.21739 9.12492 2.27148L6.677 10.9798C6.55457 11.4164 6.29302 11.8012 5.93207 12.0757C5.57111 12.3501 5.13046 12.4994 4.677 12.5007H2.08325"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MetricsIcon>
);

const ScanReadyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M12.4999 22.9173C18.2529 22.9173 22.9166 18.2536 22.9166 12.5007C22.9166 6.74768 18.2529 2.08398 12.4999 2.08398C6.74695 2.08398 2.08325 6.74768 2.08325 12.5007C2.08325 18.2536 6.74695 22.9173 12.4999 22.9173Z"
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

const VulnerabilitiesIcon = () => (
  <MetricsIcon>
    <path
      d="M20.8334 13.5408C20.8334 18.7492 17.1876 21.3533 12.8542 22.8638C12.6273 22.9406 12.3808 22.937 12.1563 22.8533C7.81258 21.3533 4.16675 18.7492 4.16675 13.5408V6.24917C4.16675 5.9729 4.27649 5.70795 4.47185 5.5126C4.6672 5.31725 4.93215 5.2075 5.20841 5.2075C7.29175 5.2075 9.89591 3.9575 11.7084 2.37417C11.9291 2.18562 12.2098 2.08203 12.5001 2.08203C12.7903 2.08203 13.0711 2.18562 13.2917 2.37417C15.1147 3.96792 17.7084 5.2075 19.7917 5.2075C20.068 5.2075 20.333 5.31725 20.5283 5.5126C20.7237 5.70795 20.8334 5.9729 20.8334 6.24917V13.5408Z"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 8.33398V12.5007"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 16.666H12.51"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MetricsIcon>
);

const CriticalIssuesIcon = () => (
  <MetricsIcon>
    <circle
      cx="12.5"
      cy="12.5"
      r="10.4167"
      stroke="currentColor"
      strokeWidth="1.95312"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 8.33398V12.5007"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 16.666H12.51"
      stroke="currentColor"
      strokeWidth="1.95312"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MetricsIcon>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="5" y="3" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <rect
      x="3"
      y="5"
      width="6"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.6"
    />
  </svg>
);


export function ScanComponentsView() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<AssetStatusFilter>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isAddAssetDrawerOpen, setIsAddAssetDrawerOpen] = useState(false);
  const [activeAssetForDetails, setActiveAssetForDetails] = useState<AssetRecord | null>(null);
  const [activeAssetForSummary, setActiveAssetForSummary] = useState<AssetRecord | null>(null);
  const [activeVulnTab, setActiveVulnTab] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [activeAssetForScanProgress, setActiveAssetForScanProgress] = useState<AssetRecord | null>(null);
  const [activeAssetForQueued, setActiveAssetForQueued] = useState<AssetRecord | null>(null);
  const [activeAssetForFailedValidation, setActiveAssetForFailedValidation] =
    useState<AssetRecord | null>(null);
  const [activeAssetForNeverScanned, setActiveAssetForNeverScanned] = useState<AssetRecord | null>(
    null,
  );
  const [addAssetInitialStep, setAddAssetInitialStep] = useState<1 | 2 | 3>(1);

  const filteredAssets = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return ASSETS.filter((asset) => {
      if (statusFilter !== 'all' && asset.scanStatus !== statusFilter) {
        return false;
      }

      if (selectedType !== 'all' && asset.type !== selectedType) {
        return false;
      }

      if (!normalizedSearch) return true;

      return (
        asset.name.toLowerCase().includes(normalizedSearch) ||
        asset.ipAddress.toLowerCase().includes(normalizedSearch) ||
        asset.typeLabel.toLowerCase().includes(normalizedSearch) ||
        (asset.scanId && asset.scanId.toLowerCase().includes(normalizedSearch))
      );
    });
  }, [searchValue, statusFilter, selectedType]);

  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / pageSize));

  const paginatedAssets = useMemo(
    () =>
      filteredAssets.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredAssets, currentPage, pageSize],
  );

  const totalAssets = ASSETS.length;
  const activeScans = ASSETS.filter((asset) =>
    ['scanning', 'queued'].includes(asset.scanStatus),
  ).length;
  const scanReadyAssets = ASSETS.filter(
    (asset) => asset.reachability === 'validated' && asset.scanStatus === 'never-scanned',
  ).length;
  const totalVulnerabilities = ASSETS.reduce(
    (sum, asset) =>
      sum +
      asset.vulnerabilities.critical +
      asset.vulnerabilities.high +
      asset.vulnerabilities.medium +
      asset.vulnerabilities.low +
      asset.vulnerabilities.info,
    0,
  );
  const criticalIssues = ASSETS.reduce(
    (sum, asset) => sum + asset.vulnerabilities.critical,
    0,
  );

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    setToasts((prev) => [
      ...prev,
      {
        id: `scan-components-${Date.now()}-${prev.length + 1}`,
        ...toast,
      },
    ]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const assetVulnerabilities: Record<string, AssetVulnerability[]> = {
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
        cveId: 'CVE-2024-2188',
        severity: 'high',
        cvss: 7.2,
        status: 'Open',
        portProtocol: '80/tcp / HTTP',
        discoveredDate: 'Feb 12, 2026',
      },
      {
        id: 'vuln-5',
        title: 'OpenSSH remote code execution via ssh-agent forwarding',
        cveId: 'CVE-2023-38408',
        severity: 'high',
        cvss: 9.0,
        status: 'Accepted',
        portProtocol: '22/tcp / SSH',
        discoveredDate: 'Feb 11, 2026',
      },
      {
        id: 'vuln-6',
        title: 'OpenSSL use-after-free in SSL_free_buffers()',
        cveId: 'CVE-2024-4741',
        severity: 'medium',
        cvss: 7.5,
        status: 'In Progress',
        portProtocol: '443/tcp / TLS',
        discoveredDate: 'Feb 10, 2026',
      },
    ],
  };

  const columns: TableColumn<AssetRecord>[] = [
    {
      key: 'name',
      header: 'Asset Name',
      width: '1.6fr',
      align: 'left',
      render: (item) => (
        <button
          type="button"
          onClick={() => {
            if (item.scanStatus === 'scanning') {
              setActiveAssetForScanProgress(item);
            } else if (item.scanStatus === 'queued') {
              setActiveAssetForQueued(item);
            } else if (item.scanStatus === 'never-scanned') {
              setActiveAssetForNeverScanned(item);
            } else if (item.scanStatus === 'failed' && item.actionLabel === 'Retry Validation') {
              setActiveAssetForFailedValidation(item);
            } else {
              setActiveAssetForSummary(item);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 0,
            margin: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <AssetIcon type={item.type} />
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
            <span style={{ color: colors.text.neutral.main, fontWeight: 500 }}>
              {item.name}
            </span>
          </div>
        </button>
      ),
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      width: '1.2fr',
      align: 'left',
      render: (item) => (
        <span
          style={{
            color: colors.text.neutral.sub,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {item.ipAddress}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      width: '1.1fr',
      align: 'left',
      render: (item) => (
        <Tag label={item.typeLabel} variant={assetTypeVariantMap[item.type]} size="sm" />
      ),
    },
    {
      key: 'reachability',
      header: 'Reachability',
      width: '1.1fr',
      align: 'left',
      render: (item) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: colors.text.neutral.main,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: reachabilityDotColor[item.reachability],
            }}
          />
          <span>
            {item.reachability === 'validated'
              ? 'Validated'
              : item.reachability === 'failed'
                ? 'Failed'
                : 'Setup Required'}
          </span>
        </span>
      ),
    },
    {
      key: 'scanStatus',
      header: 'Scan Status',
      width: '1.1fr',
      align: 'left',
      render: (item) => {
        const label =
          item.scanStatus === 'never-scanned'
            ? 'Never Scanned'
            : item.scanStatus.charAt(0).toUpperCase() + item.scanStatus.slice(1);

        const showProgress = item.scanStatus === 'scanning' && item.scanProgress !== undefined;

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                color: colors.text.neutral.main,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: scanStatusDotColor[item.scanStatus],
                }}
              />
              <span>{label}</span>
            </span>
            {showProgress && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    maxWidth: 120,
                    height: 4,
                    borderRadius: 999,
                    background: '#E5E7EB',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${item.scanProgress}%`,
                      height: '100%',
                      borderRadius: 999,
                      background: '#2563EB',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: colors.text.neutral.sub,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.scanProgress}%
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'vulnerabilities',
      header: 'Vulnerabilities',
      width: '1.4fr',
      align: 'left',
      render: (item) => {
        const nonZeroKeys = (Object.keys(
          item.vulnerabilities,
        ) as (keyof VulnerabilityCounts)[]).filter(
          (key) => item.vulnerabilities[key] > 0,
        );

        if (nonZeroKeys.length === 0) {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                color: colors.text.neutral.sub,
                fontSize: 12,
              }}
            >
              —
            </div>
          );
        }

        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {nonZeroKeys.map((key) => (
              <span
                key={key}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  color: colors.text.neutral.main,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: severityDotColors[key],
                  }}
                />
                <span
                  aria-label={`${severityDotLabels[key]} severity count`}
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {item.vulnerabilities[key]}
                </span>
              </span>
            ))}
          </div>
        );
      },
    },
    {
      key: 'lastScanned',
      header: 'Last Scanned',
      width: '140px',
      align: 'left',
      render: (item) => (
        <span style={{ color: colors.text.neutral.sub }}>
          {item.lastScanned}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '1fr',
      align: 'left',
      render: (item) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 4,
          }}
        >
          {item.actionLabel &&
            item.scanStatus !== 'scanning' &&
            item.scanStatus !== 'queued' && (
            <button
              type="button"
              disabled={item.actionDisabled}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: item.actionDisabled
                  ? `1px solid ${colors.stroke.neutral.soft}`
                  : item.actionLabel === 'Retry Validation'
                    ? '1px solid #FDEAD7'
                    : '1px solid #266DF0',
                background: item.actionDisabled
                  ? '#F9FAFB'
                  : item.actionLabel === 'Retry Validation'
                    ? '#FFF6ED'
                    : '#266DF0',
                color: item.actionDisabled
                  ? '#667085'
                  : item.actionLabel === 'Retry Validation'
                    ? '#FB6514'
                    : '#FFFFFF',
                fontSize: 13,
                fontWeight: 500,
                cursor: item.actionDisabled ? 'default' : 'pointer',
                minWidth: 140,
                width: 140,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
              onClick={() => {
                if (item.actionDisabled) return;
                if (item.actionLabel === 'Review') {
                  setActiveAssetForDetails(item);
                  setActiveVulnTab('all');
                } else if (
                  item.actionLabel === 'Retry Validation' &&
                  item.scanStatus === 'failed'
                ) {
                  setActiveAssetForFailedValidation(item);
                } else if (
                  item.actionLabel === 'Complete Setup' &&
                  item.scanStatus === 'never-scanned'
                ) {
                  setActiveAssetForNeverScanned(item);
                }
              }}
            >
              {item.actionDisabled && item.actionLabel?.includes('Validating') && (
                <span
                  className="validation-spinner"
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: '2px solid #D0D5DD',
                    borderTopColor: '#266DF0',
                  }}
                  aria-hidden="true"
                />
              )}
              {!item.actionDisabled && item.actionLabel === 'Review' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  <Eye />
                </span>
              )}
              {!item.actionDisabled &&
                (item.actionLabel === 'Complete Setup' ||
                  item.actionLabel === 'Retry Validation') && <RefreshIcon />}
              <span>{item.actionLabel}</span>
            </button>
          )}
          {(item.scanStatus === 'scanning' || item.scanStatus === 'queued') && item.scanId && (
            <button
              type="button"
              onClick={() => {
                if (item.scanStatus === 'scanning') {
                  setActiveAssetForScanProgress(item);
                }
              }}
              style={{
                fontSize: 12,
                color: colors.text.neutral.sub,
                fontVariantNumeric: 'tabular-nums',
                border: 'none',
                background: 'transparent',
                padding: 0,
                margin: 0,
                cursor: item.scanStatus === 'scanning' ? 'pointer' : 'default',
                textDecoration: item.scanStatus === 'scanning' ? 'none' : 'none',
              }}
            >
              {item.scanId}
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleOpenAddAssetDrawer = () => {
    setAddAssetInitialStep(1);
    setIsAddAssetDrawerOpen(true);
  };

  const handleCloseAddAssetDrawer = () => {
    setIsAddAssetDrawerOpen(false);
  };

  return (
    <Page>
      <ScanComponentsHeader onOpenAddAssetDrawer={handleOpenAddAssetDrawer} />

      <PageSection>
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <FilterCardsSection
            totalAssets={totalAssets}
            activeScans={activeScans}
            scanReadyAssets={scanReadyAssets}
            totalVulnerabilities={totalVulnerabilities}
            criticalIssues={criticalIssues}
            renderSimpleDeltaFooter={renderSimpleDeltaFooter}
            AssetsIcon={AssetsIcon}
            ActiveScansIcon={ActiveScansIcon}
            ScanReadyIcon={ScanReadyIcon}
            VulnerabilitiesIcon={VulnerabilitiesIcon}
            CriticalIssuesIcon={CriticalIssuesIcon}
          />

          <AssetsTableSection
            statusFilter={statusFilter}
            onStatusFilterChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
            selectedType={selectedType}
            onSelectedTypeChange={(value) => {
              setSelectedType(value);
              setCurrentPage(1);
            }}
            searchValue={searchValue}
            onSearchValueChange={(value) => {
              setSearchValue(value);
              setCurrentPage(1);
            }}
            assetTypeOptions={assetTypeOptions}
            statusChipOrder={statusChipOrder}
            statusFilterLabels={statusFilterLabels}
            columns={columns}
            paginatedAssets={paginatedAssets}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </PageSection>

      {activeAssetForScanProgress && (
        <ScanProgressDrawer
          asset={activeAssetForScanProgress}
          onClose={() => setActiveAssetForScanProgress(null)}
        />
      )}

      {activeAssetForQueued && (
        <ScanQueuedDrawer asset={activeAssetForQueued} onClose={() => setActiveAssetForQueued(null)} />
      )}

      {activeAssetForNeverScanned && (
        <NeverScannedAssetDrawer
          asset={activeAssetForNeverScanned}
          onClose={() => setActiveAssetForNeverScanned(null)}
          onOpenWhitelistStep={() => {
            setActiveAssetForNeverScanned(null);
            setAddAssetInitialStep(2);
            setIsAddAssetDrawerOpen(true);
          }}
        />
      )}

      {activeAssetForFailedValidation && (
        <FailedValidationDrawer
          asset={activeAssetForFailedValidation}
          onClose={() => setActiveAssetForFailedValidation(null)}
          onRetryValidation={() => {
            setActiveAssetForFailedValidation(null);
            setAddAssetInitialStep(3);
            setIsAddAssetDrawerOpen(true);
          }}
        />
      )}

      {activeAssetForSummary && (
        <SideDrawer
          isOpen
          onClose={() => setActiveAssetForSummary(null)}
          title={activeAssetForSummary.name}
          subtitle={`${activeAssetForSummary.ipAddress}`}
          icon={<AssetIcon type={activeAssetForSummary.type} />}
          showPrimaryButton={false}
          showSecondaryButton
          secondaryButtonLabel="Close"
          onSecondaryClick={() => setActiveAssetForSummary(null)}
          buttonAlignment="right"
          footerNote={
            <Button
              label="Review Vulnerabilities"
              icon={
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 0,
                  }}
                >
                  <Eye />
                </span>
              }
              iconPosition="left"
              variant="primary"
              size="md"
              onClick={() => {
                setActiveAssetForSummary(null);
                setActiveAssetForDetails(activeAssetForSummary);
                setActiveVulnTab('all');
              }}
              style={{ cursor: 'pointer' }}
            />
          }
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              paddingTop: 8,
            }}
          >
            {/* Scan status banner */}
            <div
              style={{
                borderRadius: 12,
                background: '#ECFDF3',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#027A48',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: '#12B76A',
                  color: '#FFFFFF',
                  fontSize: 14,
                }}
              >
                <CheckCircleFilled />
              </span>
              <span>Scan Completed</span>
            </div>

            {/* Asset details title */}
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#101828',
              }}
            >
              ASSET DETAILS
            </div>

            {/* Asset details grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                rowGap: 16,
                columnGap: 32,
                fontSize: 12,
              }}
            >
              <div>
                <div
                  style={{
                    color: '#667085',
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 14, display: 'inline-flex' }}>
                    <Database />
                  </span>
                  <span>Type</span>
                </div>
                <div style={{ color: '#101828', fontWeight: 500 }}>
                  {activeAssetForSummary.typeLabel}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: '#667085',
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 14, display: 'inline-flex' }}>
                    <Clock />
                  </span>
                  <span>Reachability</span>
                </div>
                <div style={{ color: '#027A48', fontWeight: 500 }}>Validated</div>
              </div>
              <div>
                <div
                  style={{
                    color: '#667085',
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 14, display: 'inline-flex' }}>
                    <Clock />
                  </span>
                  <span>Duration</span>
                </div>
                <div style={{ color: '#101828' }}>42m 15s</div>
              </div>
              <div>
                <div
                  style={{
                    color: '#667085',
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      border: '1px solid #98A2B3',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: '#98A2B3',
                    }}
                  >
                    #
                  </span>
                  <span>Project</span>
                </div>
                <div style={{ color: '#101828' }}>Production Infrastructure</div>
              </div>
              <div>
                <div
                  style={{
                    color: '#667085',
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 14, display: 'inline-flex' }}>
                    <Calendar />
                  </span>
                  <span>Last scanned</span>
                </div>
                <div style={{ color: '#101828' }}>{activeAssetForSummary.lastScanned}</div>
              </div>
              <div>
                <div
                  style={{
                    color: '#667085',
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 14, display: 'inline-flex' }}>
                    <Calendar />
                  </span>
                  <span>Next scan</span>
                </div>
                <div style={{ color: '#101828' }}>Feb 21, 2026</div>
              </div>
            </div>

            {/* Vulnerabilities bar summary */}
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#101828',
                  marginBottom: 12,
                }}
              >
                VULNERABILITIES
              </div>
              {(['critical', 'high', 'medium', 'low'] as const).map((sev) => {
                const counts = activeAssetForSummary.vulnerabilities;
                const value = counts[sev];
                const total =
                  counts.critical + counts.high + counts.medium + counts.low;
                const widthPct =
                  total > 0 ? Math.max(4, (value / total) * 100) : 0;

                const color =
                  sev === 'critical'
                    ? '#F04438'
                    : sev === 'high'
                      ? '#F79009'
                      : sev === 'medium'
                        ? '#FDB022'
                        : '#266DF0';

                const label =
                  sev.charAt(0).toUpperCase() + sev.slice(1);

                return (
                  <div
                    key={sev}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 8,
                      fontSize: 12,
                    }}
                  >
                    <div style={{ width: 70, color: '#667085' }}>{label}</div>
                    <div
                      style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 999,
                        background: '#F2F4F7',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${widthPct}%`,
                          height: '100%',
                          background: color,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: 24,
                        textAlign: 'right',
                        color: '#101828',
                      }}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: 8,
                  textAlign: 'right',
                  fontSize: 12,
                  color: '#667085',
                }}
              >
                Total findings{' '}
                <span style={{ color: '#101828', fontWeight: 500 }}>
                  {activeAssetForSummary.vulnerabilities.critical +
                    activeAssetForSummary.vulnerabilities.high +
                    activeAssetForSummary.vulnerabilities.medium +
                    activeAssetForSummary.vulnerabilities.low}
                </span>
              </div>
            </div>

            {/* Scan history list (static demo data) */}
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#101828',
                  marginBottom: 12,
                }}
              >
                SCAN HISTORY
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  fontSize: 12,
                }}
              >
                {[
                  {
                    date: 'Feb 14, 2026',
                    statusColor: '#12B76A',
                    statusLabel: 'Completed',
                    scanId: 'SCN-20260214-039',
                  },
                  {
                    date: 'Feb 07, 2026',
                    statusColor: '#12B76A',
                    statusLabel: 'Completed',
                    scanId: 'SCN-20260207-028',
                  },
                  {
                    date: 'Jan 31, 2026',
                    statusColor: '#F04438',
                    statusLabel: 'Failed',
                    scanId: 'SCN-20260131-019',
                  },
                  {
                    date: 'Jan 24, 2026',
                    statusColor: '#12B76A',
                    statusLabel: 'Completed',
                    scanId: 'SCN-20260124-011',
                  },
                ].map((entry, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: entry.statusColor,
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        <span style={{ color: '#101828' }}>{entry.date}</span>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: '#667085',
                          }}
                        >
                          <span>{entry.scanId}</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (navigator?.clipboard?.writeText) {
                                navigator.clipboard.writeText(entry.scanId);
                              }
                            }}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              padding: 0,
                              margin: 0,
                              display: 'inline-flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              color: '#667085',
                            }}
                          >
                            <CopyIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        color:
                          entry.statusColor === '#F04438'
                            ? '#F04438'
                            : '#667085',
                        fontWeight:
                          entry.statusColor === '#F04438' ? 500 : 400,
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        cursor: 'pointer',
                      }}
                    >
                      {entry.statusLabel}
                      <span style={{ fontSize: 14, display: 'inline-flex' }}>
                        <ChevronRight />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SideDrawer>
      )}

      {activeAssetForDetails && (
        <AssetVulnerabilitiesDrawer
          asset={activeAssetForDetails}
          vulnerabilities={assetVulnerabilities[activeAssetForDetails.id] ?? []}
          activeTab={activeVulnTab}
          onTabChange={setActiveVulnTab}
          onClose={() => setActiveAssetForDetails(null)}
        />
      )}

      <AddAssetDrawer
        isOpen={isAddAssetDrawerOpen}
        onClose={handleCloseAddAssetDrawer}
        initialStep={addAssetInitialStep}
        onToast={(toast) => addToast(toast)}
      />

      {typeof document !== 'undefined' &&
        createPortal(
          <ToastStack toasts={toasts} onDismiss={dismissToast} />,
          document.body,
        )}
    </Page>
  );
}

