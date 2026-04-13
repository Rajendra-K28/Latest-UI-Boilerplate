import { SideDrawer, Database } from '../../components';
import { colors } from '../../design-system/tokens';

type AssetVulnerability = {
  id: string;
  title: string;
  cveId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvss: number;
  status: 'Open' | 'In Progress' | 'Accepted';
  portProtocol: string;
  discoveredDate: string;
};

type ActiveAsset = {
  id: string;
  name: string;
  ipAddress: string;
  typeLabel: string;
  lastScanned: string;
} | null;

type VulnTab = 'all' | 'critical' | 'high' | 'medium' | 'low';

type SecurityDashboardAssetDetailsDrawerProps = {
  activeAsset: ActiveAsset;
  assetVulnerabilities: Record<string, AssetVulnerability[]>;
  activeVulnTab: VulnTab;
  onChangeTab: (tab: VulnTab) => void;
  onClose: () => void;
};

export function SecurityDashboardAssetDetailsDrawer({
  activeAsset,
  assetVulnerabilities,
  activeVulnTab,
  onChangeTab,
  onClose,
}: SecurityDashboardAssetDetailsDrawerProps) {
  if (!activeAsset) return null;

  const allVulns = assetVulnerabilities[activeAsset.id] ?? [];
  const filtered =
    activeVulnTab === 'all'
      ? allVulns
      : allVulns.filter((v) => v.severity === activeVulnTab);

  const counts = {
    all: allVulns.length,
    critical: allVulns.filter((v) => v.severity === 'critical').length,
    high: allVulns.filter((v) => v.severity === 'high').length,
    medium: allVulns.filter((v) => v.severity === 'medium').length,
    low: allVulns.filter((v) => v.severity === 'low').length,
  };

  const footerText = `Showing ${filtered.length} of ${allVulns.length} vulnerabilities`;

  const tabLabels: { key: VulnTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low' },
  ];

  const severityColor: Record<
    AssetVulnerability['severity'],
    { dot: string; badgeBg: string; badgeText: string }
  > = {
    critical: {
      dot: '#F04438',
      badgeBg: '#FEF3F2',
      badgeText: '#B42318',
    },
    high: {
      dot: '#F79009',
      badgeBg: '#FFFAEB',
      badgeText: '#B54708',
    },
    medium: {
      dot: '#2E90FA',
      badgeBg: '#EFF8FF',
      badgeText: '#175CD3',
    },
    low: {
      dot: '#12B76A',
      badgeBg: '#ECFDF3',
      badgeText: '#027A48',
    },
  };

  const statusBadge: Record<
    AssetVulnerability['status'],
    { bg: string; text: string }
  > = {
    Open: { bg: '#FEF3F2', text: '#B42318' },
    'In Progress': { bg: '#EFF8FF', text: '#175CD3' },
    Accepted: { bg: '#EEF4FF', text: '#344054' },
  };

  return (
    <SideDrawer
      isOpen
      onClose={onClose}
      title={activeAsset.name}
      subtitle={`${activeAsset.ipAddress} · ${activeAsset.typeLabel} · Last scanned ${activeAsset.lastScanned}`}
      icon={<Database />}
      showPrimaryButton={false}
      showSecondaryButton
      secondaryButtonLabel="Close"
      buttonAlignment="right"
      onSecondaryClick={onClose}
      footerNote={footerText}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingTop: 4,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            borderRadius: 10,
            background: 'transparent',
            padding: 4,
            width: '100%',
            overflowX: 'auto',
          }}
        >
          {tabLabels.map((tab) => {
            const isActive = activeVulnTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onChangeTab(tab.key)}
                style={{
                  flex: 1,
                  minWidth: 80,
                  padding: '24px 10px',
                  borderRadius: 10,
                  border: isActive ? '1px solid #266DF0' : '1px solid #E4E7EC',
                  background: isActive ? '#E9F0FE' : '#F9FAFB',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: isActive ? '#266DF0' : '#101828',
                    lineHeight: '33px',
                  }}
                >
                  {counts[tab.key]}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: '#667085',
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginTop: 8,
          }}
        >
          {filtered.map((vuln) => {
            const sev = severityColor[vuln.severity];
            const status = statusBadge[vuln.status];
            return (
              <div
                key={vuln.id}
                style={{
                  borderRadius: 12,
                  border: '1px solid #EAECF0',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  background: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    minWidth: 0,
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
                        backgroundColor: sev.dot,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#111827',
                      }}
                    >
                      {vuln.title}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      fontSize: 12,
                      color: '#667085',
                    }}
                  >
                    <span>{vuln.cveId}</span>
                    <span>• {vuln.portProtocol}</span>
                    <span>• {vuln.discoveredDate}</span>
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 500,
                        background: sev.badgeBg,
                        color: sev.badgeText,
                      }}
                    >
                      {vuln.severity.charAt(0).toUpperCase() + vuln.severity.slice(1)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      background: sev.badgeBg,
                      color: sev.badgeText,
                    }}
                  >
                    CVSS {vuln.cvss.toFixed(1)}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 500,
                      background: status.bg,
                      color: status.text,
                    }}
                  >
                    {vuln.status}
                  </span>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div
              style={{
                padding: 16,
                fontSize: 13,
                color: colors.text.neutral.sub,
              }}
            >
              No vulnerabilities in this category.
            </div>
          )}
        </div>
      </div>
    </SideDrawer>
  );
}

