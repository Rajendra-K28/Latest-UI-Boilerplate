import { useEffect, useState } from 'react';
import {
  SideDrawer,
  Database,
  Button,
  TextInput,
  SelectInput,
  Edit,
  Trash,
  Download,
  UploadCloud,
  Checkbox,
  CheckCircleFilled,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  UserPlus,
} from '../../../../components';
import { spacing, colors } from '../../../../design-system/tokens';
import type { ToastVariant } from '../../../../components/toast/ToastStack';
import {
  awsSecurityGroupSnippet,
  AzureNetworkecurityGroupSnippet,
  GCPFirewallSnippet,
  pfSenseSnippet,
  ciscoAsaSnippet,
  paloAltoSnippet,
  fortigateSnippet,
  iptablesSnippet,
  snortSuricataSnippet,
  zeekSnippet,
  qradarSnippet,
  elasticSiemSnippet,
} from './scannerWhitelistSnippets';
import { apiService } from '../../../../api/api.service';
import { AuthContext } from '../../../../auth/authContext';
import { OrgContext } from '../../../../organization/orgContext';

const addAssetsDrawerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[5],
    minWidth: 0,
    width: '100%',
    zIndex: 999,
  },
  subtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    margin: 0,
    textAlign: 'left' as const,
    marginBottom: spacing[4],
  },
  tabsWrapper: {
    background: '#F9FAFB',
    borderRadius: '8px',
    padding: 4,
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 2,
    width: '100%',
  },
  tabButton: (active: boolean) => ({
    borderRadius: '8px',
    border: 'none',
    padding: '8px 24px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    background: active ? colors.bg.surface.default : 'transparent',
    boxShadow: active ? '0 1px 2px rgba(15, 23, 42, 0.08)' : 'none',
    color: active ? colors.text.neutral.main : colors.text.neutral.sub,
    flex: 1,
    textAlign: 'center' as const,
  }),
  manualContainer: {
    marginTop: spacing[4],
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
    minWidth: 0,
    width: '100%',
    zIndex: 999,
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 200px)',
    gap: spacing[4],
    alignItems: 'flex-start' as const,
    width: '100%',
  },
  fieldCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[2],
    minWidth: 0,
    zIndex: 999,
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  required: {
    color: colors.red[500],
    marginLeft: 2,
  },
  helperText: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  addMoreRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 6,
    color: colors.primary[500],
    fontSize: '13px',
    fontWeight: 500,
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontStyle: 'normal',
    lineHeight: '19.5px',
    width: '90px',
  },
  addMoreIcon: {
    width: 16,
    height: 16,
    borderRadius: 999,
    border: `1px solid ${colors.primary[500]}`,
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  rowActions: {
    display: 'flex',
    justifyContent: 'flex-end' as const,
    marginTop: spacing[2],
  },
  deleteButton: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 6,
    borderRadius: 999,
    border: 'none',
    background: 'transparent',
    color: colors.text.neutral.sub,
    fontSize: '12px',
    cursor: 'pointer',
    padding: 0,
  },
  addMoreRowDivider: {
    height: 1,
    background: colors.stroke.neutral.soft,
    margin: `${spacing[3]} 0`,
  },
  bulkActionsRow: {
    marginTop: spacing[2],
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
    alignItems: 'stretch' as const,
  },
  bulkDropzone: {
    borderRadius: 12,
    border: '1px dashed #D0D5DD',
    background: '#F9FAFB',
    padding: spacing[8],
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: spacing[3],
    cursor: 'pointer',
  },
  bulkDropzoneInner: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: spacing[2],
    textAlign: 'center' as const,
  },
  bulkDropzoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    background: '#EEF4FF',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    color: colors.primary[600],
  },
  bulkDropzoneTitle: {
    fontSize: '13px',
    fontWeight: 500,
    color: colors.text.neutral.main,
    display: 'block',
  },
  bulkDropzoneSubtitle: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  bulkHiddenInput: {
    display: 'none',
  },
  bulkRemoveFileButton: {
    marginTop: spacing[2],
    border: 'none',
    background: 'transparent',
    color: colors.red[500],
    fontSize: '12px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  bulkDownloadButton: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 8,
    borderRadius: 8,
    border: '1px solid #D0D5DD',
    background: colors.bg.surface.default,
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
    color: colors.text.neutral.main,
  },
  bulkHelperText: {
    marginTop: spacing[3],
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  bulkHelperRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
    marginTop: spacing[1],
    padding: `${spacing[3]} ${spacing[4]}`,
    borderRadius: 8,
    background: colors.bg.surface.gray,
    color: colors.text.neutral.sub,
    fontSize: 13,
    textAlign: 'left' as const,
  },
  bulkHelperList: {
    margin: '8px 0 0',
    paddingLeft: '18px',
  },
  bulkHelperListItem: {
    marginBottom: 4,
  },
  bulkTableWrapper: {
    marginTop: spacing[4],
    borderRadius: 10,
    border: '1px solid #EAECF0',
    background: '#FFFFFF',
    // Must be visible so SelectInput dropdown isn't clipped.
    overflow: 'visible',
  },
  bulkTableHeader: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.6fr) minmax(0, 1fr) 140px',
    gap: spacing[3],
    padding: '12px 14px',
    background: '#F9FAFB',
    fontSize: '12px',
    fontWeight: 600,
    color: colors.text.neutral.sub,
  },
  bulkTableRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.6fr) minmax(0, 1fr) 140px',
    gap: spacing[3],
    padding: '12px 14px',
    borderTop: '1px solid #EAECF0',
    alignItems: 'center' as const,
    fontSize: '13px',
    color: colors.text.neutral.main,
  },
  bulkActionCell: {
    display: 'flex',
    justifyContent: 'flex-end' as const,
    alignItems: 'center' as const,
    gap: spacing[2],
  },
  bulkActionButton: {
    border: 'none',
    background: 'transparent',
    color: colors.text.neutral.sub,
    fontSize: '12px',
    cursor: 'pointer',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 6,
  },
  whitelistContainer: {
    marginTop: spacing[4],
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
  },
  whitelistAlertCard: {
    display: 'flex',
    gap: spacing[3],
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid #FEF0C7',
    background: '#FFFBEB',
  },
  whitelistAlertIcon: {
    width: 28,
    height: 28,
    borderRadius: 999,
    background: '#FEF3F2',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    color: '#F04438',
  },
  whitelistAlertContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    fontSize: '13px',
    color: '#B54708',
  },
  whitelistAlertTitle: {
    fontWeight: 600,
    margin: 0,
  },
  whitelistAlertBody: {
    margin: 0,
  },
  whitelistSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[3],
  },
  whitelistHeader: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  whitelistSectionTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: colors.text.neutral.main,
    margin: 0,
  },
  whitelistTitle: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    margin: 0,
  },
  whitelistHeaderRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },
  whitelistCard: {
    borderRadius: 12,
    border: '1px solid #E5E7EB',
    background: colors.bg.surface.default,
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  whitelistIpList: {
    fontSize: '13px',
    color: colors.text.neutral.main,
  },
  whitelistCopyButton: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 6,
    borderRadius: 999,
    border: '1px solid #D0D5DD',
    background: colors.bg.surface.default,
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
    color: colors.text.neutral.main,
  },
  whitelistGuidesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: spacing[3],
  },
  whitelistGuideCard: (active: boolean) => ({
    borderRadius: 10,
    border: active ? '1px solid #2563EB' : '1px solid #E5E7EB',
    background: active ? '#F9FAFF' : colors.bg.surface.default,
    padding: '12px 12px 10px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
    cursor: 'pointer',
    boxShadow: active ? '0 0 0 1px rgba(37, 99, 235, 0.08)' : 'none',
  }),
  whitelistGuideTitleRow: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: spacing[2],
  },
  whitelistGuideTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: colors.text.neutral.main,
  },
  whitelistGuideTag: {
    fontSize: '11px',
    color: colors.text.neutral.sub,
  },
  whitelistGuideMeta: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  whitelistGuideToggleIcon: {
    fontSize: '16px',
    color: colors.text.neutral.sub,
  },
  whitelistGuideCodeBlock: {
    marginTop: spacing[2],
    padding: '8px 10px',
    borderRadius: 8,
    background: colors.bg.surface.gray,
    fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '12px',
    lineHeight: '18px',
    whiteSpace: 'pre-wrap' as const,
    overflowX: 'auto' as const,
    color: colors.primary[700],
  },
  whitelistTabs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 8,
    padding: 4,
    borderRadius: 10,
    border: '1px solid #EAECF0',
    background: '#F9FAFB',
  },
  whitelistTabButton: (active: boolean) => ({
    border: 'none',
    borderRadius: 8,
    background: active ? '#FFFFFF' : 'transparent',
    boxShadow: active ? '0 1px 2px rgba(16, 24, 40, 0.08)' : 'none',
    padding: '8px 12px',
    color: active ? '#344054' : '#667085',
    display: 'inline-flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
  }),
  whitelistGuideList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  },
  whitelistGuideRow: {
    border: '1px solid #EAECF0',
    borderRadius: 10,
    overflow: 'hidden' as const,
    background: '#FFFFFF',
  },
  whitelistGuideHeaderButton: {
    width: '100%',
    border: 'none',
    background: '#FFFFFF',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    cursor: 'pointer',
  },
  whitelistGuideHeaderLeft: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 10,
  },
  whitelistGuideVendorBadge: {
    minWidth: 44,
    height: 24,
    borderRadius: 999,
    border: '1px solid #E4E7EC',
    background: '#F9FAFB',
    color: '#667085',
    fontSize: 11,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '0 8px',
  },
  whitelistGuideLabel: {
    color: '#101828',
    fontSize: 14,
    fontWeight: 500,
  },
  whitelistGuideBody: {
    borderTop: '1px solid #EAECF0',
    background: '#FCFCFD',
    padding: 12,
  },
  whitelistConfirmCard: {
    borderRadius: 12,
    border: '1px solid #FDE68A',
    background: '#FFFBEB',
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  whitelistConfirmTitle: {
    margin: 0,
    color: '#92400E',
    fontSize: 13,
    fontWeight: 600,
  },
  whitelistConfirmText: {
    margin: 0,
    color: '#B45309',
    fontSize: 12,
  },
  validationFooterNote: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
} as const;

type WhitelistCategory = 'cloud' | 'firewall' | 'ids-ips';

type WhitelistGuide = {
  id: string;
  category: WhitelistCategory;
  badge: string;
  label: string;
  snippet: string;
};

const SCANNER_IPS = [
  '52.54.123.45',
  '54.123.67.89',
  '34.56.78.90',
  '18.185.44.12',
  '13.212.99.77',
  '54.249.31.102',
];

const WHITELIST_GUIDES: WhitelistGuide[] = [
  {
    id: 'aws',
    category: 'cloud',
    badge: 'AWS',
    label: 'AWS Security Group',
    snippet: awsSecurityGroupSnippet,
  },
  {
    id: 'azure',
    category: 'cloud',
    badge: 'Azure',
    label: 'Azure Network Security Group',
    snippet: AzureNetworkecurityGroupSnippet,
  },
  {
    id: 'gcp',
    category: 'cloud',
    badge: 'GCP',
    label: 'GCP Firewall Rule',
    snippet: GCPFirewallSnippet,
  },
  {
    id: 'pfsense',
    category: 'firewall',
    badge: 'pfSense',
    label: 'pfSense Firewall Rule',
    snippet: pfSenseSnippet,
  },
  {
    id: 'cisco-asa',
    category: 'firewall',
    badge: 'Cisco',
    label: 'Cisco ASA',
    snippet: ciscoAsaSnippet,
  },
  {
    id: 'palo-alto',
    category: 'firewall',
    badge: 'Palo Alto',
    label: 'Palo Alto Security Policy',
    snippet: paloAltoSnippet,
  },
  {
    id: 'fortigate',
    category: 'firewall',
    badge: 'FortiGate',
    label: 'FortiGate Firewall Policy',
    snippet: fortigateSnippet,
  },
  {
    id: 'iptables',
    category: 'firewall',
    badge: 'Linux',
    label: 'iptables',
    snippet: iptablesSnippet,
  },
  {
    id: 'snort-suricata',
    category: 'ids-ips',
    badge: 'Snort',
    label: 'Snort / Suricata',
    snippet: snortSuricataSnippet,
  },
  {
    id: 'zeek',
    category: 'ids-ips',
    badge: 'Zeek',
    label: 'Zeek',
    snippet: zeekSnippet,
  },
  {
    id: 'qradar',
    category: 'ids-ips',
    badge: 'QRadar',
    label: 'QRadar',
    snippet: qradarSnippet,
  },
  {
    id: 'elastic-siem',
    category: 'ids-ips',
    badge: 'Elastic',
    label: 'Elastic SIEM',
    snippet: elasticSiemSnippet,
  },
];

type AddAssetDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onToast?: (toast: { title: string; message: string; variant: ToastVariant }) => void;
  initialStep?: 1 | 2 | 3;
};

// NOTE: This AddAssetDrawer is self-contained for the security dashboard use case.
export function AddAssetDrawer({
  isOpen,
  onClose,
  onToast,
  initialStep = 1,
}: AddAssetDrawerProps) {
  const [addAssetStep, setAddAssetStep] = useState<1 | 2 | 3>(1);
  const [assetEntryMode, setAssetEntryMode] = useState<'manual' | 'bulk'>('manual');
  const [assetRows, setAssetRows] = useState<
    Array<{ id: string; assetName: string; endpoint: string; assetType: string }>
  >([
    {
      id: 'asset-row-1',
      assetName: '',
      endpoint: '',
      assetType: '',
    },
  ]);
  const [bulkUploadFileName, setBulkUploadFileName] = useState<string | null>(null);
  const [editingBulkIndex, setEditingBulkIndex] = useState<number | null>(null);
  const [editingBulkAssetName, setEditingBulkAssetName] = useState('');
  const [editingBulkEndpoint, setEditingBulkEndpoint] = useState('');
  const [editingBulkType, setEditingBulkType] = useState('');
  const [scannerIpsConfirmed, setScannerIpsConfirmed] = useState(false);
  const [assetTypeOptions, setAssetTypeOptions] = useState<Array<{ value: string; label: string }>>(
    [],
  );
  const [isStartingValidation, setIsStartingValidation] = useState(false);
  const [activeWhitelistCategory, setActiveWhitelistCategory] =
    useState<WhitelistCategory>('cloud');
  const [expandedWhitelistGuideId, setExpandedWhitelistGuideId] =
    useState<string>('aws');

  // validation / timer state kept internal for now
  const [validationElapsedSeconds, setValidationElapsedSeconds] = useState(0);
  // Each validation stage (DNS, TLS, Port scan, Banner grab) gets 3 minutes.
  const VALIDATION_STEP_DURATION_SECONDS = 3 * 60;
  const VALIDATION_TOTAL_DURATION_SECONDS =
    VALIDATION_STEP_DURATION_SECONDS * 4;

  const scannerIpsForWhitelist = (() => {
    const userTargets = assetRows
      .map((row) => row.endpoint.trim())
      .filter(Boolean)
      .map((endpoint) => {
        try {
          if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
            return new URL(endpoint).hostname;
          }
          return endpoint;
        } catch {
          return endpoint;
        }
      });

    const uniqueTargets = Array.from(new Set(userTargets));
    return uniqueTargets.length ? uniqueTargets : SCANNER_IPS;
  })();

  const bulkFileInputId = 'add-asset-bulk-upload-input';

  const resetAssets = () => {
    setAssetRows([
      {
        id: 'asset-row-1',
        assetName: '',
        endpoint: '',
        assetType: '',
      },
    ]);
  };

  const handleClose = () => {
    onClose();
    setAddAssetStep(1);
    setScannerIpsConfirmed(false);
    setValidationElapsedSeconds(0);
    setActiveWhitelistCategory('cloud');
    setExpandedWhitelistGuideId('aws');
    setAssetEntryMode('manual');
    setBulkUploadFileName(null);
    setEditingBulkIndex(null);
    setEditingBulkAssetName('');
    setEditingBulkEndpoint('');
    setEditingBulkType('');
    resetAssets();
  };

  useEffect(() => {
    if (isOpen) {
      setAddAssetStep(initialStep);
    }
  }, [isOpen, initialStep]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await apiService.get<{
          success: boolean;
          data: Array<{ id: number; name: string }>;
        }>('/api/asset-types');

        const types = res?.data || [];
        const mapped = types.map((t) => ({ value: String(t.id), label: t.name }));
        if (!cancelled) setAssetTypeOptions(mapped);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[AddAssetDrawer] Failed to load asset types:', err);
        if (!cancelled) setAssetTypeOptions([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleAssetRowChange = (
    id: string,
    field: 'assetName' | 'endpoint' | 'assetType',
    value: string,
  ) => {
    setAssetRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row,
      ),
    );
  };

  const handleAddMoreAssetRow = () => {
    setAssetRows((prev) => [
      ...prev,
      {
        id: `asset-row-${prev.length + 1}`,
        assetName: '',
        endpoint: '',
        assetType: '',
      },
    ]);
  };

  const handleRemoveAssetRow = (id: string) => {
    setAssetRows((prev) => {
      if (prev.length === 1) {
        return [
          {
            ...prev[0],
            assetName: '',
            endpoint: '',
            assetType: '',
          },
        ];
      }
      return prev.filter((row) => row.id !== id);
    });
  };

  const parseBulkAssetsFile = (file: File | null) => {
    if (!file) {
      setBulkUploadFileName(null);
      setAssetEntryMode('bulk');
      resetAssets();
      return;
    }

    setBulkUploadFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

      if (lines.length === 0) {
        setAssetEntryMode('bulk');
        resetAssets();
        return;
      }

      const [header, ...dataLines] = lines;
      const headerParts = header.split(',').map((h) => h.trim().toLowerCase());
      const normalizedHeaderParts = headerParts.map((h) => h.replace(/\s+/g, ''));

      // Expecting: Asset Name,Endpoint,Type
      let assetNameIndex = normalizedHeaderParts.indexOf('assetname');
      let endpointIndex = normalizedHeaderParts.indexOf('endpoint');
      let assetTypeIndex = normalizedHeaderParts.indexOf('type');

      // Fallback if header names don't match exactly
      if (assetNameIndex < 0 || endpointIndex < 0 || assetTypeIndex < 0) {
        assetNameIndex = 0;
        endpointIndex = 1;
        assetTypeIndex = 2;
      }

      const parsed = dataLines
        .map((line) => line.split(',').map((p) => p.trim()))
        .map((parts) => ({
          assetName: parts[assetNameIndex] ?? '',
          endpoint: parts[endpointIndex] ?? '',
          assetType: parts[assetTypeIndex] ?? '',
        }))
        .filter((row) => row.assetName && row.endpoint);

      if (parsed.length === 0) {
        setAssetEntryMode('bulk');
        resetAssets();
        return;
      }

      setAssetRows(
        parsed.map((row, index) => ({
          id: `asset-row-${index + 1}`,
          assetName: row.assetName,
          endpoint: row.endpoint,
          assetType: row.assetType,
        })),
      );

      // Keep the user in bulk mode and show an editable preview table.
      setAssetEntryMode('bulk');
      setEditingBulkIndex(null);
      setEditingBulkAssetName('');
      setEditingBulkEndpoint('');
      setEditingBulkType('');
    };

    reader.readAsText(file);
  };

  const handleBulkFileChange = (event: { target: { files?: FileList | null } }) => {
    const file = event.target.files?.[0] || null;
    parseBulkAssetsFile(file);
  };

  const handleBulkUploadClick = () => {
    const input = document.getElementById(bulkFileInputId) as HTMLInputElement | null;
    input?.click();
  };

  const handleStartBulkRowEditing = (
    index: number,
    row: { id: string; assetName: string; endpoint: string; assetType: string },
  ) => {
    setEditingBulkIndex(index);
    setEditingBulkAssetName(row.assetName);
    setEditingBulkEndpoint(row.endpoint);
    setEditingBulkType(row.assetType);
  };

  const handleSaveBulkRowEditing = (rowId: string) => {
    setAssetRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              assetName: editingBulkAssetName,
              endpoint: editingBulkEndpoint,
              assetType: editingBulkType,
            }
          : row,
      ),
    );

    setEditingBulkIndex(null);
    setEditingBulkAssetName('');
    setEditingBulkEndpoint('');
    setEditingBulkType('');
  };

  const handleBulkRowDelete = (rowId: string) => {
    if (editingBulkIndex !== null) {
      setEditingBulkIndex(null);
      setEditingBulkAssetName('');
      setEditingBulkEndpoint('');
      setEditingBulkType('');
    }
    handleRemoveAssetRow(rowId);
  };

  const handleSaveAssets = async () => {
    if (addAssetStep === 1) {
      const user = AuthContext.getUser();
      const createdBy = user?.dbUserId;
      const orgData = OrgContext.getOrganizationData();
      const organizationId = orgData?._id;

      if (!createdBy || !organizationId) {
        if (onToast) {
          onToast({
            title: 'Cannot save assets',
            message: !createdBy
              ? 'User session not ready. Please sign out and sign in again.'
              : 'Organization not selected. Please pick an organization.',
            variant: 'error',
          });
        }
        return;
      }

      const assets = assetRows
        .map((row) => ({
          org_id: organizationId,
          name: row.assetName.trim(),
          endpoint: row.endpoint.trim(),
          asset_type_id: Number(row.assetType) || 0,
        }))
        .filter((a) => a.name && a.endpoint && a.asset_type_id > 0);

      if (!assets.length) {
        if (onToast) {
          onToast({
            title: 'Add at least one asset',
            message: 'Please enter Asset Name, Endpoint, and Asset Type for at least one row.',
            variant: 'error',
          });
        }
        return;
      }

      try {
        const data = await apiService.post('/api/assets/manual', {
          created_by: createdBy,
          assets,
        });
        // eslint-disable-next-line no-console
        console.log(data, 'data');
        if (onToast) {
          onToast({
            title: 'Assets saved',
            message: 'Assets were created successfully.',
            variant: 'success',
          });
        }

        setAddAssetStep(2);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('[AddAssetDrawer] Failed to save assets:', err);
        const statusCode = err?.status ?? err?.response?.status;
        const raw = err?.data?.message ?? err?.message;
        const message =
          typeof raw === 'string'
            ? raw
            : Array.isArray(raw)
              ? raw.join(', ')
              : raw
                ? JSON.stringify(raw)
                : 'Failed to save assets.';
        if (onToast) {
          const isConflict = statusCode === 409 || message.toLowerCase().includes('already exists');
          onToast({
            title: isConflict ? 'Asset already exists' : 'Failed to save assets',
            message: isConflict
              ? 'This asset endpoint already exists in your organization. Please use a different endpoint or skip duplicates.'
              : message,
            variant: 'error',
          });
        }
      }

      return;
    }

    // Step 2: move to validation-running state
    if (addAssetStep === 2) {
      // Move to next step immediately on click
      setValidationElapsedSeconds(0);
      setAddAssetStep(3);

      const orgData = OrgContext.getOrganizationData();
      const rawOrganizationId = orgData?._id ?? (orgData as any)?.id;
      const organizationId =
        typeof rawOrganizationId === 'string' ? rawOrganizationId : String(rawOrganizationId ?? '');
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          organizationId,
        );

      if (!organizationId || !isUuid) {
        if (onToast) {
          onToast({
            title: 'Cannot start validation',
            message: 'Organization id is missing or invalid UUID.',
            variant: 'error',
          });
        }
        return;
      }

      try {
        setIsStartingValidation(true);
        const res = await apiService.post<{
          org_id: string;
          total_assets: number;
          checked_assets: number;
          alive: number;
          not_alive: number;
        }>('/api/assets/check-alive', {
          org_id: organizationId,
        });

        if (onToast) {
          onToast({
            title: 'Validation started',
            message: `Alive: ${res.alive}, Not alive: ${res.not_alive} (out of ${res.total_assets})`,
            variant: 'info',
          });
        }

      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('[AddAssetDrawer] Failed to start host-alive check:', err);
        const raw = err?.data?.message ?? err?.message;
        const message =
          typeof raw === 'string'
            ? raw
            : Array.isArray(raw)
              ? raw.join(', ')
              : raw
                ? JSON.stringify(raw)
                : 'Failed to start validation.';
        if (onToast) {
          onToast({
            title: 'Failed to start validation',
            message,
            variant: 'error',
          });
        }
      } finally {
        setIsStartingValidation(false);
      }
      return;
    }

    // Step 3: close drawer
    handleClose();
    setBulkUploadFileName(null);
  };

  useEffect(() => {
    if (addAssetStep !== 3) {
      return;
    }

    setValidationElapsedSeconds(0);

    const intervalId = window.setInterval(() => {
      setValidationElapsedSeconds((prev) => {
        if (prev >= VALIDATION_TOTAL_DURATION_SECONDS) {
          window.clearInterval(intervalId);
          if (onToast) {
            onToast({
              title: 'Validation completed',
              message: 'Asset validation finished successfully.',
              variant: 'success',
            });
          }
          handleClose();
          return VALIDATION_TOTAL_DURATION_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [addAssetStep, VALIDATION_TOTAL_DURATION_SECONDS]);

  const validationSteps = [
    { id: 'dns', label: 'Resolving DNS...' },
    { id: 'tls', label: 'TCP/TLS handshake' },
    { id: 'port', label: 'Port scan' },
    { id: 'banner', label: 'Banner grab' },
  ] as const;

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={handleClose}
      title={
        addAssetStep === 1
          ? 'Add Assets'
          : addAssetStep === 2
            ? 'Whitelist Scanner IPs'
            : 'Validating Assets...'
      }
      subtitle={
        addAssetStep === 1
          ? 'Add assets for vulnerability scanning.'
          : addAssetStep === 2
            ? 'Allow inbound access from our scanner nodes to reach your new asset.'
            : 'Running host alive checks and verifying public exposure. This may take several minutes.'
      }
      icon={<Database />}
      primaryButtonLabel={
        addAssetStep === 1
          ? 'Add Assets'
          : addAssetStep === 2
            ? isStartingValidation
              ? 'Starting Validation...'
              : 'Proceed to Validation'
            : 'Close'
      }
      secondaryButtonLabel={
        addAssetStep === 1 ? 'Cancel' : addAssetStep === 2 ? "I'll do this later" : 'Close'
      }
      onPrimaryClick={handleSaveAssets}
      onSecondaryClick={
        addAssetStep === 1
          ? handleClose
          : addAssetStep === 2
            ? () => setAddAssetStep(1)
            : handleClose
      }
      primaryButtonDisabled={(addAssetStep === 2 && (!scannerIpsConfirmed || isStartingValidation)) || (addAssetStep === 1 && isStartingValidation)}
      showPrimaryButton={addAssetStep !== 3}
      showSecondaryButton
      buttonAlignment="right"
      secondaryButtonStyle={
        addAssetStep === 2 || addAssetStep === 3 ? { color: '#344054' } : undefined
      }
      footerNote={
        addAssetStep === 2 ? (
          <span style={addAssetsDrawerStyles.validationFooterNote}>
            All {scannerIpsForWhitelist.length} scanner nodes must be whitelisted before validation.
          </span>
        ) : addAssetStep === 3 ? (
          <span style={addAssetsDrawerStyles.validationFooterNote}>
            Validation running in background. You can close this and check status later.
          </span>
        ) : undefined
      }
    >
      <div style={addAssetsDrawerStyles.container}>
        {addAssetStep === 1 && (
          <>
            <div style={addAssetsDrawerStyles.tabsWrapper}>
              <button
                type="button"
                style={addAssetsDrawerStyles.tabButton(assetEntryMode === 'manual')}
                onClick={() => setAssetEntryMode('manual')}
              >
                Manual Entry
              </button>
              <button
                type="button"
                style={addAssetsDrawerStyles.tabButton(assetEntryMode === 'bulk')}
                onClick={() => setAssetEntryMode('bulk')}
              >
                Bulk Upload
              </button>
            </div>

            {assetEntryMode === 'manual' && (
              <div style={addAssetsDrawerStyles.manualContainer}>
                {assetRows.map((row, index) => (
                  <div
                    key={row.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: spacing[1],
                      minWidth: 0,
                      width: '100%',
                      position: 'relative',
                      zIndex: assetRows.length - index,
                    }}
                  >
                    <div style={addAssetsDrawerStyles.fieldRow}>
                      <div style={addAssetsDrawerStyles.fieldCol}>
                        <label style={addAssetsDrawerStyles.label}>
                          Asset Name
                          <span style={addAssetsDrawerStyles.required}>*</span>
                        </label>
                        <TextInput
                          value={row.assetName}
                          onChange={(value) => handleAssetRowChange(row.id, 'assetName', value)}
                          placeholder="Enter the Asset Name"
                          width="full"
                        />
                        <p style={addAssetsDrawerStyles.helperText}>e.g., Production Web Server</p>
                      </div>

                      <div style={addAssetsDrawerStyles.fieldCol}>
                        <label style={addAssetsDrawerStyles.label}>
                          Endpoint
                          <span style={addAssetsDrawerStyles.required}>*</span>
                        </label>
                        <TextInput
                          value={row.endpoint}
                          onChange={(value) => handleAssetRowChange(row.id, 'endpoint', value)}
                          placeholder="Enter the Endpoint"
                          width="full"
                        />
                        <p style={addAssetsDrawerStyles.helperText}>
                          e.g., 203.0.113.45 or example.com
                        </p>
                      </div>

                      <div style={addAssetsDrawerStyles.fieldCol}>
                        <label style={addAssetsDrawerStyles.label}>Select type...</label>
                        <SelectInput
                          value={row.assetType}
                          onChange={(value) => handleAssetRowChange(row.id, 'assetType', value)}
                          placeholder="Select the Asset Type"
                          options={assetTypeOptions}
                          width="full"
                        />
                      </div>
                    </div>
                    {index > 0 && (
                      <div style={addAssetsDrawerStyles.rowActions}>
                        <button
                          type="button"
                          style={addAssetsDrawerStyles.deleteButton}
                          onClick={() => handleRemoveAssetRow(row.id)}
                        >
                          <Trash />
                          <span>Delete row</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  style={addAssetsDrawerStyles.addMoreRow}
                  onClick={handleAddMoreAssetRow}
                >
                  <span style={addAssetsDrawerStyles.addMoreIcon}>+</span>
                  <span>Add More</span>
                </button>
              </div>
            )}

            {assetEntryMode === 'bulk' && (
              <div style={addAssetsDrawerStyles.bulkActionsRow}>
                <div
                  style={addAssetsDrawerStyles.bulkDropzone}
                  onClick={handleBulkUploadClick}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0] || null;
                    parseBulkAssetsFile(file);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div style={addAssetsDrawerStyles.bulkDropzoneInner}>
                    <div style={addAssetsDrawerStyles.bulkDropzoneIcon}>
                      <UploadCloud />
                    </div>
                    <div>
                      <span style={addAssetsDrawerStyles.bulkDropzoneTitle}>
                        {bulkUploadFileName ? bulkUploadFileName : 'Click to upload or drag & drop'}
                      </span>
                      <span style={addAssetsDrawerStyles.bulkDropzoneSubtitle}>
                        {bulkUploadFileName
                          ? 'CSV file selected (click to replace)'
                          : 'CSV file (max 500 emails)'}
                      </span>
                      {bulkUploadFileName && (
                        <button
                          type="button"
                          style={addAssetsDrawerStyles.bulkRemoveFileButton}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setBulkUploadFileName(null);
                            resetAssets();
                            setAssetEntryMode('bulk');
                            setEditingBulkIndex(null);
                            setEditingBulkAssetName('');
                            setEditingBulkEndpoint('');
                            setEditingBulkType('');
                          }}
                        >
                          Remove file
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    style={addAssetsDrawerStyles.bulkHiddenInput}
                    id={bulkFileInputId}
                    onChange={handleBulkFileChange}
                  />
                </div>

                <button
                  type="button"
                  style={{
                    ...addAssetsDrawerStyles.bulkDownloadButton,
                    width: '100%',
                    justifyContent: 'center',
                  }}
                  onClick={() => {
                    const header = 'Asset Name,Endpoint,Type\n';
                    const blob = new Blob([header], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'assets-template.csv';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download />
                  <span>Download sample CSV</span>
                </button>

                <div style={addAssetsDrawerStyles.bulkHelperRow}>
                  <UserPlus />
                  <span>You can also add assets later from the Assets page.</span>
                </div>

                {bulkUploadFileName &&
                  assetRows.some(
                    (r) => Boolean(r.assetName.trim()) && Boolean(r.endpoint.trim()),
                  ) && (
                    <div style={addAssetsDrawerStyles.bulkTableWrapper}>
                      <div style={addAssetsDrawerStyles.bulkTableHeader}>
                        <div>Asset Name</div>
                        <div>Endpoint</div>
                        <div>Type</div>
                        <div style={{ textAlign: 'right' }}>Actions</div>
                      </div>

                      {assetRows.map((row, index) => (
                        <div key={row.id} style={addAssetsDrawerStyles.bulkTableRow}>
                          <div>
                            {editingBulkIndex === index ? (
                              <TextInput
                                value={editingBulkAssetName}
                                onChange={(value) => setEditingBulkAssetName(value)}
                                placeholder="Enter the Asset Name"
                                width="full"
                              />
                            ) : (
                              row.assetName
                            )}
                          </div>

                          <div>
                            {editingBulkIndex === index ? (
                              <TextInput
                                value={editingBulkEndpoint}
                                onChange={(value) => setEditingBulkEndpoint(value)}
                                placeholder="Enter the Endpoint"
                                width="full"
                              />
                            ) : (
                              row.endpoint
                            )}
                          </div>

                          <div>
                            {editingBulkIndex === index ? (
                              <SelectInput
                                value={editingBulkType || row.assetType}
                                options={assetTypeOptions}
                                onChange={(value) => setEditingBulkType(value)}
                                placeholder="Select the Asset Type"
                                width="full"
                              />
                            ) : (
                              row.assetType
                            )}
                          </div>

                          <div style={addAssetsDrawerStyles.bulkActionCell}>
                            {editingBulkIndex === index ? (
                              <button
                                type="button"
                                style={addAssetsDrawerStyles.bulkActionButton}
                                onClick={() => handleSaveBulkRowEditing(row.id)}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                type="button"
                                style={addAssetsDrawerStyles.bulkActionButton}
                                onClick={() => handleStartBulkRowEditing(index, row)}
                              >
                                <Edit />
                              </button>
                            )}

                            <button
                              type="button"
                              style={addAssetsDrawerStyles.bulkActionButton}
                              onClick={() => handleBulkRowDelete(row.id)}
                            >
                              <Trash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}
          </>
        )}

        {addAssetStep === 2 && (
          <div style={addAssetsDrawerStyles.whitelistContainer}>
            <div style={addAssetsDrawerStyles.whitelistAlertCard}>
              <div style={addAssetsDrawerStyles.whitelistAlertIcon}>
                <AlertTriangle />
              </div>
              <div style={addAssetsDrawerStyles.whitelistAlertContent}>
                <p style={addAssetsDrawerStyles.whitelistAlertTitle}>
                  Action Required — Configure Your Security Controls
                </p>
                <p style={addAssetsDrawerStyles.whitelistAlertBody}>
                  You must allow inbound TCP traffic from all scanner nodes in every applicable
                  layer of your network security stack — including cloud security groups,
                  perimeter firewalls, and any inline IDS/IPS rules. Omitting even one layer
                  may cause validation to fail.
                </p>
              </div>
            </div>

            <div style={addAssetsDrawerStyles.whitelistSection}>
              <div style={addAssetsDrawerStyles.whitelistHeader}>
                <div>
                  <p style={addAssetsDrawerStyles.whitelistSectionTitle}>Scanner IP Addresses</p>
                  <p style={addAssetsDrawerStyles.whitelistTitle}>
                    {scannerIpsForWhitelist.length} global nodes - all must be whitelisted
                  </p>
                </div>
                <Button
                  label="Copy All"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (navigator?.clipboard?.writeText) {
                      navigator.clipboard.writeText(scannerIpsForWhitelist.join(', '));
                    }
                  }}
                />
              </div>

              <div style={addAssetsDrawerStyles.whitelistCard}>
                <span style={addAssetsDrawerStyles.whitelistIpList}>
                  {scannerIpsForWhitelist.join(', ')}
                </span>
              </div>

              <div style={addAssetsDrawerStyles.whitelistSection}>
                <p style={addAssetsDrawerStyles.whitelistSectionTitle}>Configuration Guides</p>
                <p style={addAssetsDrawerStyles.whitelistTitle}>
                  Select your security control type to view step-by-step whitelisting instructions
                </p>

                <div style={addAssetsDrawerStyles.whitelistTabs}>
                  <button
                    type="button"
                    style={addAssetsDrawerStyles.whitelistTabButton(
                      activeWhitelistCategory === 'cloud',
                    )}
                    onClick={() => {
                      setActiveWhitelistCategory('cloud');
                      setExpandedWhitelistGuideId('aws');
                    }}
                  >
                    Cloud <span style={addAssetsDrawerStyles.whitelistGuideTag}>3</span>
                  </button>
                  <button
                    type="button"
                    style={addAssetsDrawerStyles.whitelistTabButton(
                      activeWhitelistCategory === 'firewall',
                    )}
                    onClick={() => {
                      setActiveWhitelistCategory('firewall');
                      setExpandedWhitelistGuideId('pfsense');
                    }}
                  >
                    Firewall <span style={addAssetsDrawerStyles.whitelistGuideTag}>5</span>
                  </button>
                  <button
                    type="button"
                    style={addAssetsDrawerStyles.whitelistTabButton(
                      activeWhitelistCategory === 'ids-ips',
                    )}
                    onClick={() => {
                      setActiveWhitelistCategory('ids-ips');
                      setExpandedWhitelistGuideId('snort-suricata');
                    }}
                  >
                    IDS / IPS <span style={addAssetsDrawerStyles.whitelistGuideTag}>4</span>
                  </button>
                </div>

                <p style={addAssetsDrawerStyles.whitelistTitle}>
                  {activeWhitelistCategory === 'cloud'
                    ? "Configure inbound security rules in your cloud provider's native controls."
                    : activeWhitelistCategory === 'firewall'
                      ? 'Configure perimeter and host firewall controls to allow scanner traffic.'
                      : 'Configure IDS/IPS and monitoring tools to avoid blocking scanner traffic.'}
                </p>

                <div style={addAssetsDrawerStyles.whitelistGuideList}>
                  {WHITELIST_GUIDES.filter(
                    (guide) => guide.category === activeWhitelistCategory,
                  ).map((guide) => {
                    const isOpen = expandedWhitelistGuideId === guide.id;
                    return (
                      <div key={guide.id} style={addAssetsDrawerStyles.whitelistGuideRow}>
                        <button
                          type="button"
                          style={addAssetsDrawerStyles.whitelistGuideHeaderButton}
                          onClick={() =>
                            setExpandedWhitelistGuideId((prev) =>
                              prev === guide.id ? '' : guide.id,
                            )
                          }
                        >
                          <div style={addAssetsDrawerStyles.whitelistGuideHeaderLeft}>
                            <span style={addAssetsDrawerStyles.whitelistGuideVendorBadge}>
                              {guide.badge}
                            </span>
                            <span style={addAssetsDrawerStyles.whitelistGuideLabel}>
                              {guide.label}
                            </span>
                          </div>
                          <span style={addAssetsDrawerStyles.whitelistGuideToggleIcon}>
                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                          </span>
                        </button>
                        {isOpen && (
                          <div style={addAssetsDrawerStyles.whitelistGuideBody}>
                            <pre style={addAssetsDrawerStyles.whitelistGuideCodeBlock}>
                              {guide.snippet}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={addAssetsDrawerStyles.whitelistConfirmCard}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <Checkbox
                    checked={scannerIpsConfirmed}
                    onChange={(checked) => setScannerIpsConfirmed(checked)}
                  />
                  <span style={addAssetsDrawerStyles.whitelistConfirmTitle}>
                    I confirm I have whitelisted all scanner IPs
                  </span>
                </label>
                <p style={addAssetsDrawerStyles.whitelistConfirmText}>
                  All {scannerIpsForWhitelist.length} scanner IPs must be whitelisted in your cloud security
                  groups, firewalls, and IDS/IPS rules. Validation will fail if any are blocked.
                </p>
              </div>
            </div>
          </div>
        )}

        {addAssetStep === 3 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[4],
            }}
          >
            {/* Header row with spinner and description (center aligned) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 12,
              }}
            >
              <span
                className="validation-spinner"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '3px solid #E5E7EB',
                  borderTopColor: colors.primary[500],
                }}
                aria-hidden="true"
              />
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.text.neutral.main,
                    marginBottom: 4,
                  }}
                >
                  Validating Assets...
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: colors.text.neutral.sub,
                    margin: 0,
                  }}
                >
                  Running host alive checks and verifying public exposure. This may take several
                  minutes.
                </p>
              </div>
            </div>

            {/* Progress bar and ETA */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                  color: colors.text.neutral.sub,
                }}
              >
                <span>Progress</span>
                <span>
                  {Math.round(
                    (validationElapsedSeconds / VALIDATION_TOTAL_DURATION_SECONDS) * 100,
                  )}
                  %
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 6,
                  borderRadius: 999,
                  background: '#E5E7EB',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.min(
                      100,
                      (validationElapsedSeconds / VALIDATION_TOTAL_DURATION_SECONDS) * 100,
                    )}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: colors.primary[500],
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: colors.text.neutral.sub,
                  textAlign: 'center' as const,
                }}
              >
                Estimated time:{' '}
                {(() => {
                  const remaining = Math.max(
                    0,
                    VALIDATION_TOTAL_DURATION_SECONDS - validationElapsedSeconds,
                  );
                  const minutes = Math.floor(remaining / 60)
                    .toString()
                    .padStart(2, '0');
                  const seconds = (remaining % 60).toString().padStart(2, '0');
                  return `${minutes}:${seconds} remaining`;
                })()}
              </div>
            </div>

            {/* Validation steps list */}
            <div
              style={{
                marginTop: spacing[2],
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontSize: 13,
              }}
            >
              {validationSteps.map((step, index) => {
                const stepStart = index * VALIDATION_STEP_DURATION_SECONDS;
                const stepEnd = (index + 1) * VALIDATION_STEP_DURATION_SECONDS;
                const isCompleted = validationElapsedSeconds >= stepEnd;
                const isActive =
                  validationElapsedSeconds >= stepStart &&
                  validationElapsedSeconds < stepEnd;

                const circleStyle = isCompleted
                  ? {
                      backgroundColor: colors.primary[500],
                      borderColor: colors.primary[500],
                    }
                  : isActive
                    ? {
                        borderColor: colors.primary[500],
                      }
                    : {
                        borderColor: '#D0D5DD',
                      };

                let timeLabel = '';
                if (isActive) {
                  const elapsedForStep = validationElapsedSeconds - stepStart;
                  const mm = Math.floor(elapsedForStep / 60)
                    .toString()
                    .padStart(1, '0');
                  const ss = (elapsedForStep % 60).toString().padStart(2, '0');
                  timeLabel = `${mm}:${ss}`;
                } else if (isCompleted) {
                  // Completed steps stay at 3:00
                  timeLabel = '3:00';
                }

                return (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      color: isCompleted || isActive ? '#111827' : '#9CA3AF',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          borderWidth: 2,
                          borderStyle: 'solid',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          ...circleStyle,
                        }}
                      >
                        {isCompleted ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 10,
                              color: '#FFFFFF',
                            }}
                          >
                            <CheckCircleFilled />
                          </span>
                        ) : null}
                      </span>
                      <span>{step.label}</span>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: colors.text.neutral.sub,
                        minWidth: 40,
                        textAlign: 'right',
                      }}
                    >
                      {timeLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SideDrawer>
  );
}

