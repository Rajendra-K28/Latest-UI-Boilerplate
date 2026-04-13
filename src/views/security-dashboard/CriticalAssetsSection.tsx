import { PageSection } from '../../ui/page/Page';
import { Button, Eye, ArrowUpRight } from '../../components';
import { colors } from '../../design-system/tokens';

type CriticalAsset = {
  id: string;
  name: string;
  ipAddress: string;
  type: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  riskScore: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  lastScanned: string;
};

type CriticalAssetsSectionProps = {
  assets: CriticalAsset[];
  styles: any;
  onManageAssets: () => void;
  onSelectAsset: (asset: CriticalAsset) => void;
};

export function CriticalAssetsSection({
  assets,
  styles,
  onManageAssets,
  onSelectAsset,
}: CriticalAssetsSectionProps) {
  return (
    <PageSection>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.leftContent}>
            <h2 style={styles.title}>Critical Assets Requiring Attention</h2>
            <p style={styles.subtitle}>
              Focus on high-risk assets with unresolved vulnerabilities.
            </p>
          </div>
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              color: colors.primary[500],
              fontSize: '13px',
              fontWeight: 600,
              fontFamily:
                'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontStyle: 'normal',
              lineHeight: '19.5px',
            }}
            onClick={onManageAssets}
          >
            <span>Manage Assets</span>
            <ArrowUpRight />
          </button>
        </div>

        <div style={styles.tableHeader}>
          <div style={styles.tableHeaderCell}>ASSET / IP ADDRESS</div>
          <div style={styles.tableHeaderCell}>TYPE</div>
          <div style={styles.tableHeaderCell}>RISK SCORE</div>
          <div style={{ ...styles.tableHeaderCell, color: '#F04438' }}>CRITICAL</div>
          <div style={{ ...styles.tableHeaderCell, color: '#B54708' }}>HIGH</div>
          <div style={{ ...styles.tableHeaderCell, color: '#DC6803' }}>MEDIUM</div>
          <div style={{ ...styles.tableHeaderCell, color: '#3366FF' }}>LOW</div>
          <div style={styles.tableHeaderCell}>LAST SCANNED</div>
          <div style={{ ...styles.tableHeaderCell, textAlign: 'right' }}> </div>
        </div>

        {assets.map((asset) => (
          <div key={asset.id} style={styles.tableRow}>
            <button
              type="button"
              style={{
                ...styles.assetCell,
                border: 'none',
                background: 'transparent',
                padding: 0,
                margin: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onClick={() => onSelectAsset(asset)}
            >
              <div
                style={{
                  ...styles.assetIcon,
                  background: asset.iconBg,
                  color: asset.iconColor,
                }}
              >
                {asset.icon}
              </div>
              <div style={styles.assetText}>
                <span style={styles.assetName} title={asset.name}>
                  {asset.name}
                </span>
                <span style={styles.assetIp}>{asset.ipAddress}</span>
              </div>
            </button>
            <div style={styles.typeCell}>{asset.type}</div>
            <div>
              <span style={styles.riskPill(asset.riskScore)}>{asset.riskScore}</span>
            </div>
            <div>
              <span style={styles.countBadge(colors.red[500], '#FEF3F2')}>{asset.critical}</span>
            </div>
            <div>
              <span style={styles.countBadge('#B54708', '#FFFAEB')}>{asset.high}</span>
            </div>
            <div>
              <span style={styles.countBadge('#7A5AF8', '#F4EBFF')}>{asset.medium}</span>
            </div>
            <div>
              <span style={styles.countBadge(colors.primary[600], colors.primary[50])}>
                {asset.low}
              </span>
            </div>
            <div style={styles.lastScanned}>{asset.lastScanned}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                style={{
                  display: 'flex',
                  padding: '6.5px 10.797px 5px 11px',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: '4px',
                  borderRadius: '6px',
                  border: '1px solid #D0D5DD',
                  background: '#FFF',
                  cursor: 'pointer',
                  color: '#344054',
                  fontFamily:
                    'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontSize: '11px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '16.5px',
                }}
                label="Review"
                hierarchy="secondary-white"
                size="sm"
                iconConfig="left"
                icon={<Eye />}
                onClick={() => onSelectAsset(asset)}
              />
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

