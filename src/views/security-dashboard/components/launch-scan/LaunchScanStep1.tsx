import React from 'react';
import { Checkbox } from '../../../../components';
import { launchScanDrawerStyles } from '../launch-scan/launchScanDrawerStyles';
import type { ProjectComplianceWindowDto } from './launchScanCompliance.types';

function formatWindowRange(start: string, end: string): string {
  try {
    const a = new Date(`${start}T12:00:00`);
    const b = new Date(`${end}T12:00:00`);
    const opts: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return `${a.toLocaleDateString(undefined, opts)} – ${b.toLocaleDateString(undefined, opts)}`;
  } catch {
    return `${start} – ${end}`;
  }
}

function formatDeadline(dateStr: string): string {
  try {
    const d = new Date(`${dateStr}T12:00:00`);
    return d.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function statusPillFor(status: string): { bg: string; fg: string; label: string } {
  const s = (status || '').toUpperCase();
  if (s === 'COMPLETED') {
    return { bg: '#ECFDF3', fg: '#027A48', label: 'Completed' };
  }
  if (s === 'IN_PROGRESS') {
    return { bg: '#FFFAEB', fg: '#B54708', label: 'In progress' };
  }
  return { bg: '#F9FAFB', fg: '#667085', label: 'Upcoming' };
}

type LaunchScanStep1Props = {
  projectName: string;
  setProjectName: (value: string) => void;
  scanName: string;
  setScanName: (value: string) => void;
  /** Selected compliance window row id (UUID). */
  selectedComplianceWindowId: string;
  setSelectedComplianceWindowId: (id: string) => void;
  scanMode: 'full' | 'rescan';
  setScanMode: (mode: 'full' | 'rescan') => void;
  passedQuarterOverride: boolean;
  setPassedQuarterOverride: (value: boolean) => void;
  projectId?: string;
  complianceWindows: ProjectComplianceWindowDto[];
  complianceWindowsLoading: boolean;
  complianceWindowsError: string | null;
};

export function LaunchScanStep1({
  projectName,
  setProjectName,
  scanName,
  setScanName,
  selectedComplianceWindowId,
  setSelectedComplianceWindowId,
  scanMode: _scanMode,
  setScanMode,
  passedQuarterOverride,
  setPassedQuarterOverride,
  projectId,
  complianceWindows,
  complianceWindowsLoading,
  complianceWindowsError,
}: LaunchScanStep1Props) {
  const selectedWindow =
    complianceWindows.find((w) => w.id === selectedComplianceWindowId) ?? null;
  const statusUpper = (selectedWindow?.status || '').toUpperCase();
  const isCompletedWindow = statusUpper === 'COMPLETED';
  const isInProgressWindow = statusUpper === 'IN_PROGRESS';
  const isPendingWindow = statusUpper === 'PENDING';

  const handleWindowClick = (w: ProjectComplianceWindowDto) => {
    setSelectedComplianceWindowId(w.id);
    const st = (w.status || '').toUpperCase();
    if (st === 'COMPLETED') {
      setScanMode('full');
      setPassedQuarterOverride(false);
      if (scanName.includes('Rescan')) {
        setScanName(scanName.replace(/Rescan/g, 'Scan'));
      }
    } else if (st === 'IN_PROGRESS') {
      setScanMode('rescan');
      setPassedQuarterOverride(false);
      if (scanName.includes('Rescan')) {
        setScanName(scanName);
      } else if (scanName.includes('Scan')) {
        setScanName(scanName.replace(/Scan/g, 'Rescan'));
      } else {
        setScanName(`${scanName} Rescan`);
      }
    } else {
      setScanMode('full');
      setPassedQuarterOverride(false);
      if (scanName.includes('Rescan')) {
        setScanName(scanName.replace(/Rescan/g, 'Scan'));
      }
    }
  };

  const handleScanModeChange = (mode: 'full' | 'rescan') => {
    setScanMode(mode);
    if (mode === 'rescan') {
      if (scanName.includes('Rescan')) {
        setScanName(scanName);
      } else if (scanName.includes('Scan')) {
        setScanName(scanName.replace(/Scan/g, 'Rescan'));
      } else {
        setScanName(`${scanName} Rescan`);
      }
    } else if (scanName.includes('Rescan')) {
      setScanName(scanName.replace(/Rescan/g, 'Scan'));
    }
  };

  return (
    <div style={launchScanDrawerStyles.wrapper}>
      <div style={launchScanDrawerStyles.stepperRow}>
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={launchScanDrawerStyles.stepCircle(true)}>1</div>
          <span style={launchScanDrawerStyles.stepLabel(true)}>Scan Configuration</span>
        </div>
        <div style={launchScanDrawerStyles.stepConnector} />
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={launchScanDrawerStyles.stepCircle(false)}>2</div>
          <span style={launchScanDrawerStyles.stepLabel(false)}>Select Assets</span>
        </div>
        <div style={launchScanDrawerStyles.stepConnector} />
        <div style={launchScanDrawerStyles.stepItem}>
          <div style={launchScanDrawerStyles.stepCircle(false)}>3</div>
          <span style={launchScanDrawerStyles.stepLabel(false)}>Schedule</span>
        </div>
      </div>

      <div style={launchScanDrawerStyles.contentStack}>
        <div style={{ marginBottom: 24 }}>
          <div style={launchScanDrawerStyles.sectionLabel}>Project</div>
          <input
            style={launchScanDrawerStyles.textInput}
            value={projectName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setProjectName(event.target.value)
            }
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={launchScanDrawerStyles.fieldLabelRow}>
            <span style={launchScanDrawerStyles.sectionLabel}>Scan Name</span>
            <span style={launchScanDrawerStyles.autoFilledTag}>
              <span>◆</span>
              <span>Auto-filled</span>
            </span>
          </div>
          <input
            style={launchScanDrawerStyles.textInput}
            value={scanName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setScanName(event.target.value)
            }
          />
        </div>

        <div style={launchScanDrawerStyles.sectionLabel}>Compliance quarter</div>
        {!projectId?.trim() ? (
          <div
            style={{
              marginTop: 8,
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              background: '#F9FAFB',
              fontSize: 13,
              color: '#4B5563',
            }}
          >
            Open <strong>Launch Scan</strong> from a project dashboard to load this
            organization&apos;s compliance windows for that project.
          </div>
        ) : null}
        {complianceWindowsError ? (
          <div
            style={{
              marginTop: 8,
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid #FECDCA',
              background: '#FEF3F2',
              fontSize: 13,
              color: '#B42318',
            }}
          >
            {complianceWindowsError}
          </div>
        ) : null}
        {complianceWindowsLoading ? (
          <div
            style={{
              marginTop: 12,
              padding: 32,
              textAlign: 'center',
              fontSize: 13,
              color: '#6B7280',
            }}
          >
            Loading compliance windows…
          </div>
        ) : null}
        {!complianceWindowsLoading &&
        !complianceWindowsError &&
        projectId?.trim() &&
        complianceWindows.length === 0 ? (
          <div
            style={{
              marginTop: 8,
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px dashed #D0D5DD',
              background: '#FAFAFA',
              fontSize: 13,
              color: '#667085',
            }}
          >
            No compliance windows found for this project. Ensure PCI anniversary is set when
            the project was created.
          </div>
        ) : null}

        {!complianceWindowsLoading && complianceWindows.length > 0 ? (
          <div style={launchScanDrawerStyles.complianceGrid}>
            {complianceWindows.map((w) => {
              const pill = statusPillFor(w.status);
              const selected = selectedComplianceWindowId === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  style={launchScanDrawerStyles.quarterCard(selected)}
                  onClick={() => handleWindowClick(w)}
                >
                  <div style={launchScanDrawerStyles.quarterHeaderRow}>
                    <span style={launchScanDrawerStyles.quarterTitle}>
                      {w.quarter_label}
                    </span>
                    <span
                      style={launchScanDrawerStyles.statusPill(pill.bg, pill.fg)}
                    >
                      <span>{pill.label}</span>
                      {pill.label === 'Completed' ? <span>✓</span> : null}
                    </span>
                  </div>
                  <div style={launchScanDrawerStyles.quarterDates}>
                    {formatWindowRange(w.window_start_date, w.window_end_date)}
                  </div>
                  {w.is_current ? (
                    <div style={launchScanDrawerStyles.quarterAlert}>
                      <span>◆</span>
                      <span>Current window</span>
                    </div>
                  ) : null}
                  <div style={launchScanDrawerStyles.quarterSub}>
                    ASV report deadline: {formatDeadline(w.asv_deadline_date)}
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}

        {isCompletedWindow && (
          <div
            style={{
              marginTop: 12,
              borderRadius: 12,
              border: '1px solid #A7F3D0',
              background: '#ECFDF3',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#047857',
                fontWeight: 600,
              }}
            >
              <span>ℹ</span>
              <span>
                {selectedWindow?.quarter_label ?? 'This quarter'} is already completed
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#047857',
              }}
            >
              Launching another scan will not change historical compliance for this window,
              but may generate a new report.
            </div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                color: '#047857',
                marginTop: 4,
                cursor: 'pointer',
              }}
            >
              <Checkbox
                checked={passedQuarterOverride}
                onChange={setPassedQuarterOverride}
              />
              <span>I understand — launch a new scan for this window anyway</span>
            </label>
          </div>
        )}

        {isInProgressWindow && (
          <div style={launchScanDrawerStyles.orangeStrip}>
            <span style={{ paddingRight: 4 }}>⚠</span>
            <span>
              Active compliance window — plan scans before the ASV deadline (
              {selectedWindow ? formatDeadline(selectedWindow.asv_deadline_date) : '—'}).
            </span>
          </div>
        )}

        <div style={launchScanDrawerStyles.sectionLabel}>Scan mode</div>

        <div style={launchScanDrawerStyles.scanModeRow}>
          <button
            type="button"
            style={launchScanDrawerStyles.scanModeCard(_scanMode === 'full')}
            onClick={() => handleScanModeChange('full')}
          >
            <div style={launchScanDrawerStyles.scanModeTitleRow}>
              <div style={launchScanDrawerStyles.radioIcon(_scanMode === 'full')} />
              <span style={launchScanDrawerStyles.scanModeTitle}>Full Scan</span>
            </div>
            <div style={launchScanDrawerStyles.scanModeDescription}>
              Scan all selected assets for this compliance window.
            </div>
          </button>

          {isPendingWindow ? (
            <div style={launchScanDrawerStyles.scanModeCardDisabled}>
              <div style={launchScanDrawerStyles.scanModeTitleRow}>
                <div style={launchScanDrawerStyles.radioIconDisabled} />
                <span style={launchScanDrawerStyles.scanModeTitleDisabled}>
                  Rescan 🔒
                </span>
              </div>
              <div style={launchScanDrawerStyles.scanModeDescriptionDisabled}>
                Available during the active window after a full scan.
              </div>
            </div>
          ) : (
            <button
              type="button"
              style={launchScanDrawerStyles.scanModeCard(_scanMode === 'rescan')}
              onClick={() => handleScanModeChange('rescan')}
            >
              <div style={launchScanDrawerStyles.scanModeTitleRow}>
                <div style={launchScanDrawerStyles.radioIcon(_scanMode === 'rescan')} />
                <span style={launchScanDrawerStyles.scanModeTitle}>Rescan</span>
              </div>
              <div style={launchScanDrawerStyles.scanModeDescription}>
                {isCompletedWindow
                  ? 'Re-test assets that had findings in the prior full scan.'
                  : 'Re-test assets that had findings in the full scan for this window.'}
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
