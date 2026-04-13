import React from 'react';
import { colors } from '../../../../design-system/tokens';
import { Check, Checkbox } from '../../../../components';
import { launchScanDrawerStyles } from '../launch-scan/launchScanDrawerStyles';
import type { ScanTargetAsset } from './scanTargetAsset.types';

type LaunchScanStep2Props = {
  scanMode: 'full' | 'rescan';
  /** Status of the selected compliance window (e.g. IN_PROGRESS). */
  selectedComplianceWindowStatus: string | null;
  scanTargetAssets: ScanTargetAsset[];
  assetSearchQuery: string;
  setAssetSearchQuery: (value: string) => void;
  selectedAssetIds: string[];
  setSelectedAssetIds: (ids: string[]) => void;
  isAssetSearchFocused: boolean;
  setIsAssetSearchFocused: (value: boolean) => void;
  /** While true, asset list area shows a loading state (org assets are fetching). */
  isLoadingAssets?: boolean;
  /** Set when the assets API request fails (no mock data). */
  assetsLoadError?: string | null;
};

export function LaunchScanStep2({
  scanMode,
  selectedComplianceWindowStatus,
  scanTargetAssets,
  assetSearchQuery,
  setAssetSearchQuery,
  selectedAssetIds,
  setSelectedAssetIds,
  isAssetSearchFocused,
  setIsAssetSearchFocused,
  isLoadingAssets = false,
  assetsLoadError = null,
}: LaunchScanStep2Props) {
  const isRescanActiveWindow =
    scanMode === 'rescan' &&
    (selectedComplianceWindowStatus || '').toUpperCase() === 'IN_PROGRESS';

  /** Step 2: only hosts confirmed alive (API alive_status / host_alive). */
  const aliveAssets = scanTargetAssets.filter((asset) => asset.host_alive === true);

  const showLoadError = Boolean(assetsLoadError) && !isLoadingAssets;
  const showNoAssetsAtAll =
    !isLoadingAssets && !showLoadError && scanTargetAssets.length === 0;
  const showNoAliveOnly =
    !isLoadingAssets &&
    !showLoadError &&
    scanTargetAssets.length > 0 &&
    aliveAssets.length === 0;

  const search = assetSearchQuery.trim().toLowerCase();
  const visibleAssets = aliveAssets.filter((asset) => {
    if (!search) return true;
    return (
      asset.name.toLowerCase().includes(search) ||
      asset.ip.toLowerCase().includes(search)
    );
  });

  const allVisibleSelected =
    visibleAssets.length > 0 &&
    visibleAssets.every((asset) => selectedAssetIds.includes(asset.id));

  const totalSelected = selectedAssetIds.length;
  const totalAssets = aliveAssets.length;

  const selectedAssets = aliveAssets.filter((asset) =>
    selectedAssetIds.includes(asset.id)
  );
  const assetsWithIncompleteReadiness = selectedAssets.filter(
    (asset) => !asset.isWhitelisted || !asset.isValidated
  );
  const incompleteCount = assetsWithIncompleteReadiness.length;
  const incompleteNames = assetsWithIncompleteReadiness
    .map((asset) => asset.name)
    .join(', ');

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      const visibleIds = new Set(visibleAssets.map((asset) => asset.id));
      setSelectedAssetIds(selectedAssetIds.filter((id) => !visibleIds.has(id)));
    } else {
      const ids = new Set(selectedAssetIds);
      visibleAssets.forEach((asset) => ids.add(asset.id));
      setSelectedAssetIds(Array.from(ids));
    }
  };

  const toggleAsset = (id: string) => {
    if (selectedAssetIds.includes(id)) {
      setSelectedAssetIds(selectedAssetIds.filter((x) => x !== id));
    } else {
      setSelectedAssetIds([...selectedAssetIds, id]);
    }
  };

  return (
    <div style={launchScanDrawerStyles.wrapper}>
      <div style={launchScanDrawerStyles.stepperRow}>
        <div style={launchScanDrawerStyles.stepItem}>
          <div
            style={{
              ...launchScanDrawerStyles.stepCircle(false, true),
              color: '#FFFFFF',
            }}
          >
            <span style={{ display: 'block', width: 14, height: 14 }}>
              <Check />
            </span>
          </div>
          <span
            style={{
              ...launchScanDrawerStyles.stepLabel(true),
              color: '#16A34A',
            }}
          >
            Scan Configuration
          </span>
        </div>
        <div style={launchScanDrawerStyles.stepConnectorDone} />
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={launchScanDrawerStyles.stepCircle(true)}>2</div>
          <span style={launchScanDrawerStyles.stepLabel(true)}>Select Assets</span>
        </div>
        <div style={launchScanDrawerStyles.stepConnector} />
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={launchScanDrawerStyles.stepCircle(false)}>3</div>
          <span style={launchScanDrawerStyles.stepLabel(false)}>Schedule</span>
        </div>
      </div>

      <div style={launchScanDrawerStyles.contentStack}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 0,
          }}
        >
          <div style={launchScanDrawerStyles.sectionLabel}>
            Target Assets (host alive only)
          </div>
          <button
            type="button"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              color: colors.primary[600],
            }}
          >
            + Add Asset
          </button>
        </div>

        {isRescanActiveWindow && (
          <div style={launchScanDrawerStyles.orangeStrip}>
            <p><span>⟳</span> <strong>Rescan mode — failing assets pre-selected.</strong></p>
            <p>
              Assets with prior findings in the full scan are pre-selected. You can change the
              selection before continuing.
            </p>
          </div>
        )}

        {incompleteCount > 0 && (
          <div style={launchScanDrawerStyles.readinessStrip}>
            <div>
              <span style={{ paddingRight: 4 }}>⚠</span>
              <strong>
                {incompleteCount} selected asset{incompleteCount > 1 ? 's' : ''} have
                {' '}incomplete readiness
              </strong>
            </div>
            <div>
              {incompleteNames} — whitelist or validation pending. Scans may fail or
              {' '}produce incomplete results.
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: 12,
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <input
            style={{
              flex: 1,
              borderRadius: 8,
              border: isAssetSearchFocused ? `1px solid ${colors.primary[500]}` : '1px solid #D0D5DD',
              padding: '9px 12px',
              fontSize: 13,
              background: 'transparent',
            }}
            placeholder="Filter by name or IP..."
            value={assetSearchQuery}
            onChange={(event) => {
              setAssetSearchQuery((event.target as HTMLInputElement).value);
            }}
            onFocus={() => setIsAssetSearchFocused(true)}
            onBlur={() => setIsAssetSearchFocused(false)}
          />
        </div>

        <div
          style={{
            marginTop: 4,
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            height: 320,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px',
              background: colors.bg.surface.default,
              borderBottom: '1px solid #E5E7EB',
              fontSize: 12,
              color: '#4B5563',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: isLoadingAssets ? 'default' : 'pointer',
              }}
            >
              <Checkbox
                checked={allVisibleSelected}
                onChange={toggleSelectAllVisible}
                disabled={isLoadingAssets || visibleAssets.length === 0}
              />
              <span>
                Select all {visibleAssets.length} visible asset
                {visibleAssets.length !== 1 ? 's' : ''}
              </span>
            </label>
            <span>
              {totalSelected} of {totalAssets} selected
            </span>
          </div>

          <div>
            {isLoadingAssets ? (
              <div
                style={{
                  padding: 48,
                  textAlign: 'center',
                  fontSize: 13,
                  color: '#6B7280',
                }}
              >
                Loading organization assets…
              </div>
            ) : null}
            {showLoadError ? (
              <div
                style={{
                  padding: 48,
                  textAlign: 'center',
                  fontSize: 13,
                  color: '#B42318',
                }}
              >
                {assetsLoadError}
              </div>
            ) : null}
            {showNoAssetsAtAll ? (
              <div
                style={{
                  padding: 48,
                  textAlign: 'center',
                  fontSize: 13,
                  color: '#6B7280',
                }}
              >
                No assets found for this organization. Add assets to continue.
              </div>
            ) : null}
            {showNoAliveOnly ? (
              <div
                style={{
                  padding: 48,
                  textAlign: 'center',
                  fontSize: 13,
                  color: '#6B7280',
                }}
              >
                No alive hosts found for this organization. Run a host-alive check, then try
                again.
              </div>
            ) : null}
            {!isLoadingAssets &&
              aliveAssets.length > 0 &&
              visibleAssets.length === 0 && (
                <div
                  style={{
                    padding: 32,
                    textAlign: 'center',
                    fontSize: 13,
                    color: '#6B7280',
                  }}
                >
                  No assets match your filter.
                </div>
              )}
            {!isLoadingAssets &&
              visibleAssets.map((asset) => {
              const selected = selectedAssetIds.includes(asset.id);
              return (
                <label
                  key={asset.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    gap: 12,
                    cursor: 'pointer',
                    borderBottom: '1px solid #E5E7EB',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <Checkbox
                      checked={selected}
                      onChange={() => toggleAsset(asset.id)}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#111827',
                        }}
                      >
                        {asset.name}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: '#6B7280',
                        }}
                      >
                        {asset.ip}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 11,
                    }}
                  >
                    {asset.hasPriorFinding && (
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: '#FEF2F2',
                          color: '#B91C1C',
                          fontWeight: 500,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <span>⚠</span>
                        <span>Prior finding</span>
                      </span>
                    )}
                    {asset.isWhitelisted && (
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: '#ECFDF3',
                          color: '#027A48',
                          fontWeight: 500,
                        }}
                      >
                        Whitelisted
                      </span>
                    )}
                    {asset.isValidated && (
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: '#EEF2FF',
                          color: '#4F46E5',
                          fontWeight: 500,
                        }}
                      >
                        Validated
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

