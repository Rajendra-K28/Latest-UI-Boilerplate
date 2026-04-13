import React from 'react';
import { Calendar, Clock, Check } from '../../../../components';
import { launchScanDrawerStyles } from '../launch-scan/launchScanDrawerStyles';

type ScanTargetAsset = {
  id: string;
  name: string;
  isWhitelisted?: boolean;
  isValidated?: boolean;
};

type TimezoneOption = {
  value: string;
  label: string;
};

type LaunchScanStep3Props = {
  scanTargetAssets: ScanTargetAsset[];
  selectedAssetIds: string[];
  projectName: string;
  /** e.g. quarter_label from project compliance window */
  complianceQuarterLabel: string;
  scanMode: 'full' | 'rescan';
  scanName: string;
  startDate: string;
  setStartDate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  timeZone: string;
  setTimeZone: (value: string) => void;
  scanWindow: 'none' | 'off-hours' | 'business-hours' | 'custom';
  setScanWindow: (value: 'none' | 'off-hours' | 'business-hours' | 'custom') => void;
};

export function LaunchScanStep3({
  scanTargetAssets,
  selectedAssetIds,
  projectName,
  complianceQuarterLabel,
  scanMode,
  scanName,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  timeZone,
  setTimeZone,
  scanWindow,
  setScanWindow,
}: LaunchScanStep3Props) {
  const timezoneOptions = React.useMemo<TimezoneOption[]>(() => {
    try {
      const supported = (Intl as unknown as { supportedValuesOf?(key: string): string[] }).supportedValuesOf;
      if (typeof supported === 'function') {
        const zones = supported.call(Intl, 'timeZone') as string[];
        return zones.map((z) => ({ value: z, label: z }));
      }
    } catch {
      // ignore
    }
    return [
      'UTC',
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Asia/Tokyo',
      'Asia/Kolkata',
      'Australia/Sydney',
    ].map((z) => ({ value: z, label: z }));
  }, []);
  const selectedAssets = scanTargetAssets.filter((asset) =>
    selectedAssetIds.includes(asset.id)
  );
  const assetsWithIncompleteReadiness = selectedAssets.filter(
    (asset) => !asset.isWhitelisted || !asset.isValidated
  );
  const incompleteCount = assetsWithIncompleteReadiness.length;

  const projectDisplayName =
    projectName.includes(' — ') ? projectName.split(' — ')[0] : projectName;
  const complianceLabel = complianceQuarterLabel.trim() || '—';
  const scheduledDateFormatted = startDate;
  const formatTime12h = (hhmm: string) => {
    const [h, m] = hhmm.split(':').map(Number);
    const h12 = h % 12 || 12;
    const ampm = h < 12 ? 'AM' : 'PM';
    return `${h12}:${(m ?? 0).toString().padStart(2, '0')} ${ampm}`;
  };
  const scheduledSummary = `${scheduledDateFormatted} at ${formatTime12h(startTime)} UTC`;

  const scanWindowLabel =
    scanWindow === 'none'
      ? 'No restriction'
      : scanWindow === 'off-hours'
        ? 'Off-hours'
        : scanWindow === 'business-hours'
          ? 'Business Hours'
          : 'Custom Window';

  return (
    <div style={launchScanDrawerStyles.wrapper}>
      <div style={launchScanDrawerStyles.stepperRow}>
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={{ ...launchScanDrawerStyles.stepCircle(false, true), color: '#FFFFFF' }}>
            <span style={{ display: 'block', width: 14, height: 14 }}><Check /></span>
          </div>
          <span style={{ ...launchScanDrawerStyles.stepLabel(true), color: '#16A34A' }}>
            Scan Configuration
          </span>
        </div>
        <div style={launchScanDrawerStyles.stepConnectorDone} />
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={{ ...launchScanDrawerStyles.stepCircle(false, true), color: '#FFFFFF' }}>
            <span style={{ display: 'block', width: 14, height: 14 }}><Check /></span>
          </div>
          <span style={{ ...launchScanDrawerStyles.stepLabel(true), color: '#16A34A' }}>
            Select Assets
          </span>
        </div>
        <div style={launchScanDrawerStyles.stepConnector} />
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={launchScanDrawerStyles.stepCircle(true)}>3</div>
          <span style={launchScanDrawerStyles.stepLabel(true)}>Schedule</span>
        </div>
      </div>

      {incompleteCount > 0 && (
        <div style={launchScanDrawerStyles.scheduleWarningBanner}>
          <span style={{ flexShrink: 0, fontSize: 16 }}>⚠</span>
          <div>
            <strong>Proceed with caution</strong>{' '}
            {incompleteCount} asset{incompleteCount !== 1 ? 's' : ''} have incomplete
            readiness — results may be incomplete.
          </div>
        </div>
      )}

      <div style={launchScanDrawerStyles.scheduleGrid}>
        <div style={launchScanDrawerStyles.scheduleField}>
          <label style={launchScanDrawerStyles.sectionLabel}>Start Date</label>
          <div
            style={launchScanDrawerStyles.scheduleInputWrap}
            onClick={() => {
              const el =
                document.getElementById('launch-scan-start-date') as
                | (HTMLInputElement & { showPicker?: () => void })
                | null;
              el?.focus();
              el?.showPicker?.();
            }}
          >
            <span style={launchScanDrawerStyles.scheduleInputIcon}>
              <Calendar />
            </span>
            <input
              id="launch-scan-start-date"
              type="date"
              style={launchScanDrawerStyles.scheduleInput}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div style={launchScanDrawerStyles.scheduleField}>
          <label style={launchScanDrawerStyles.sectionLabel}>Start Time</label>
          <div
            style={launchScanDrawerStyles.scheduleInputWrap}
            onClick={() => {
              const el =
                document.getElementById('launch-scan-start-time') as
                | (HTMLInputElement & { showPicker?: () => void })
                | null;
              el?.focus();
              el?.showPicker?.();
            }}
          >
            <span style={launchScanDrawerStyles.scheduleInputIcon}>
              <Clock />
            </span>
            <input
              id="launch-scan-start-time"
              type="time"
              style={launchScanDrawerStyles.scheduleInput}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>
        <div style={launchScanDrawerStyles.scheduleField}>
          <label style={launchScanDrawerStyles.sectionLabel}>Time Zone</label>
          <div style={launchScanDrawerStyles.scheduleInputWrap}>
            <span style={launchScanDrawerStyles.scheduleInputIcon}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="6.5" stroke="#101828" strokeWidth="1.5" />
                <path
                  d="M10 3.5C8 6 8 14 10 16.5C12 14 12 6 10 3.5Z"
                  stroke="#101828"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M4 10H16"
                  stroke="#101828"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M6.5 6.5C8 7 12 7 13.5 6.5"
                  stroke="#101828"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M6.5 13.5C8 13 12 13 13.5 13.5"
                  stroke="#101828"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <select
              style={{
                ...launchScanDrawerStyles.scheduleInput,
                cursor: 'pointer',
                appearance: 'auto',
              }}
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
            >
              {timezoneOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={launchScanDrawerStyles.scanWindowSection}>
        <div style={launchScanDrawerStyles.sectionLabel}>Scan Window</div>
        <p style={launchScanDrawerStyles.scanWindowDesc}>
          Restrict when the scanner is allowed to run, to avoid production impact.
        </p>
        <div style={launchScanDrawerStyles.scanWindowGrid}>
          <button
            type="button"
            style={launchScanDrawerStyles.scanWindowCard(scanWindow === 'none')}
            onClick={() => setScanWindow('none')}
          >
            <div style={launchScanDrawerStyles.scanWindowTitleRow}>
              <span style={launchScanDrawerStyles.scanModeTitle}>No Restriction</span>
            </div>
            <div style={launchScanDrawerStyles.scanWindowTime}>
              Scan runs continuously until complete
            </div>
          </button>
          <button
            type="button"
            style={launchScanDrawerStyles.scanWindowCard(scanWindow === 'off-hours')}
            onClick={() => setScanWindow('off-hours')}
          >
            <div style={launchScanDrawerStyles.scanWindowTitleRow}>
              <span style={launchScanDrawerStyles.scanModeTitle}>Off-hours</span>
              <span style={launchScanDrawerStyles.scanWindowRecommended}>
                Recommended
              </span>
            </div>
            <div style={launchScanDrawerStyles.scanWindowTime}>
              10:00 PM – 6:00 AM
            </div>
          </button>
          <button
            type="button"
            style={launchScanDrawerStyles.scanWindowCard(scanWindow === 'business-hours')}
            onClick={() => setScanWindow('business-hours')}
          >
            <div style={launchScanDrawerStyles.scanWindowTitleRow}>
              <span style={launchScanDrawerStyles.scanModeTitle}>Business Hours</span>
            </div>
            <div style={launchScanDrawerStyles.scanWindowTime}>
              9:00 AM – 5:00 PM
            </div>
          </button>
          <button
            type="button"
            style={launchScanDrawerStyles.scanWindowCard(scanWindow === 'custom')}
            onClick={() => setScanWindow('custom')}
          >
            <div style={launchScanDrawerStyles.scanWindowTitleRow}>
              <span style={launchScanDrawerStyles.scanModeTitle}>Custom Window</span>
            </div>
            <div style={launchScanDrawerStyles.scanWindowTime}>
              Define your own time range
            </div>
          </button>
        </div>
      </div>

      <div style={launchScanDrawerStyles.configSummaryCard}>
        <div style={launchScanDrawerStyles.sectionLabel}>Configuration Summary</div>
        <div style={{ ...launchScanDrawerStyles.configSummaryRow, borderTop: 'none', paddingTop: 4 }}>
          <span style={launchScanDrawerStyles.configSummaryLabel}>Scan Name</span>
          <span style={launchScanDrawerStyles.configSummaryValue}>{scanName}</span>
        </div>
        <div style={launchScanDrawerStyles.configSummaryRow}>
          <span style={launchScanDrawerStyles.configSummaryLabel}>Project</span>
          <span style={launchScanDrawerStyles.configSummaryValue}>{projectDisplayName}</span>
        </div>
        <div style={launchScanDrawerStyles.configSummaryRow}>
          <span style={launchScanDrawerStyles.configSummaryLabel}>Compliance</span>
          <span style={launchScanDrawerStyles.configSummaryValue}>
            {complianceLabel} · {scanMode === 'rescan' ? 'Rescan' : 'Full Scan'}
          </span>
        </div>
        <div style={launchScanDrawerStyles.configSummaryRow}>
          <span style={launchScanDrawerStyles.configSummaryLabel}>Scheduled</span>
          <span style={launchScanDrawerStyles.configSummaryValue}>{scheduledSummary}</span>
        </div>
        <div style={launchScanDrawerStyles.configSummaryRow}>
          <span style={launchScanDrawerStyles.configSummaryLabel}>Time Zone</span>
          <span style={launchScanDrawerStyles.configSummaryValue}>
            {timeZone === 'UTC' ? 'UTC (GMT+0)' : timeZone}
          </span>
        </div>
        <div style={launchScanDrawerStyles.configSummaryRow}>
          <span style={launchScanDrawerStyles.configSummaryLabel}>Scan Window</span>
          <span style={launchScanDrawerStyles.configSummaryValue}>{scanWindowLabel}</span>
        </div>
        <div style={{ ...launchScanDrawerStyles.configSummaryRow, borderBottom: 'none' }}>
          <span style={launchScanDrawerStyles.configSummaryLabel}>Targets</span>
          <span style={launchScanDrawerStyles.configSummaryValue}>
            {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div style={launchScanDrawerStyles.configSummaryAssetsHeader}>ASSETS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
          {selectedAssets.map((asset) => (
            <span key={asset.id} style={launchScanDrawerStyles.configSummaryAssetPill}>
              <span>▲</span>
              <span>{asset.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

