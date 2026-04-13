import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Page, PageHeader, PageSection } from '../ui/page';
import {
  Button,
  Play,
  ToastStack,
  type ToastItem,
} from '../components';
import { LaunchScanDrawer } from './security-dashboard/LaunchScanDrawer';
import { LaunchScanStep1 } from './security-dashboard/components/launch-scan/LaunchScanStep1';
import { LaunchScanStep2 } from './security-dashboard/components/launch-scan/LaunchScanStep2';
import { LaunchScanStep3 } from './security-dashboard/components/launch-scan/LaunchScanStep3';
import { useLaunchScanTargetAssets } from './security-dashboard/components/launch-scan/useLaunchScanTargetAssets';
import { useLaunchScanComplianceWindows } from './security-dashboard/components/launch-scan/useLaunchScanComplianceWindows';
import { ScanDetailsDrawer } from './scans/ScanDetailsDrawer';
import { ScansStatsSection } from './scans/ScansStatsSection';
import { ScansTableSection } from './scans/ScansTableSection';
import { SCANS } from './scans/scansData';
import { colors } from '../design-system/tokens';

export type ScanStatus = 'completed' | 'in-progress' | 'scheduled' | 'failed';
export type ScanStatusFilter = 'all' | ScanStatus;

export type ScanRecord = {
  id: string;
  projectName: string;
  projectType: string;
  scanName: string;
  schedule: string;
  startTime: string;
  status: ScanStatus;
  progressPercent?: number;
  actionLabel?: string;
};

export const statusFilterLabels: Record<ScanStatusFilter, string> = {
  all: 'View all',
  completed: 'Completed',
  'in-progress': 'In Progress',
  scheduled: 'Scheduled',
  failed: 'Failed',
};

export const statusChipOrder: ScanStatusFilter[] = [
  'all',
  'completed',
  'in-progress',
  'scheduled',
  'failed',
];

type ScansViewProps = {
  title?: string;
  description?: string;
  showTabs?: boolean;
};

export function ScansView({
  title = 'Security Scans',
  description = 'View completed, in-progress, scheduled, and failed security scans.',
  showTabs = false,
}: ScansViewProps = {}) {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState<'scans' | 'history' | 'timeline' | 'disputes'>('scans');
  const [statusFilter, setStatusFilter] = useState<ScanStatusFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLaunchScanOpen, setIsLaunchScanOpen] = useState(false);
  const [launchScanStep, setLaunchScanStep] = useState<1 | 2 | 3>(1);
  const [scanMode, setScanMode] = useState<'full' | 'rescan'>('full');
  const [passedQuarterOverride, setPassedQuarterOverride] = useState(false);
  const [projectName, setProjectName] = useState(
    'Q-Series PCI ASV Compliance — PCI ASV Scan'
  );
  const [scanName, setScanName] = useState('ASV Scan');
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [isAssetSearchFocused, setIsAssetSearchFocused] = useState(false);
  const [startDate, setStartDate] = useState('2026-03-15');
  const [startTime, setStartTime] = useState('02:00');
  const [timeZone, setTimeZone] = useState('UTC');
  const [scanWindow, setScanWindow] = useState<
    'none' | 'off-hours' | 'business-hours' | 'custom'
  >('off-hours');
  const [selectedScanForDetails, setSelectedScanForDetails] = useState<ScanRecord | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const pageSize = 7;


  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const {
    assets: scanTargetAssets,
    loading: launchScanAssetsLoading,
    error: launchScanAssetsError,
  } = useLaunchScanTargetAssets(isLaunchScanOpen);

  const {
    complianceWindows,
    complianceWindowsLoading,
    complianceWindowsError,
    selectedComplianceWindowId,
    setSelectedComplianceWindowId,
    selectedComplianceWindow,
  } = useLaunchScanComplianceWindows(undefined, isLaunchScanOpen);

  const complianceWindowsForDrawer = complianceWindows.map(({ id, status }) => ({
    id,
    status,
  }));

  useEffect(() => {
    if (!isLaunchScanOpen || !selectedComplianceWindow) return;
    const st = (selectedComplianceWindow.status || '').toUpperCase();
    if (st === 'COMPLETED') {
      setScanMode('full');
      setPassedQuarterOverride(false);
      setScanName((prev) =>
        prev.includes('Rescan') ? prev.replace(/Rescan/g, 'Scan') : prev,
      );
    } else if (st === 'IN_PROGRESS') {
      setScanMode('rescan');
      setPassedQuarterOverride(false);
      setScanName((prev) => {
        if (prev.includes('Rescan')) return prev;
        if (prev.includes('Scan')) return prev.replace(/Scan/g, 'Rescan');
        return `${prev} Rescan`;
      });
    } else {
      setScanMode('full');
      setPassedQuarterOverride(false);
      setScanName((prev) =>
        prev.includes('Rescan') ? prev.replace(/Rescan/g, 'Scan') : prev,
      );
    }
  }, [isLaunchScanOpen, selectedComplianceWindow?.id, selectedComplianceWindow?.status]);

  const filteredScans = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return SCANS.filter((scan) => {
      if (statusFilter !== 'all' && scan.status !== statusFilter) {
        return false;
      }

      if (!normalizedSearch) return true;

      return (
        scan.id.toLowerCase().includes(normalizedSearch) ||
        scan.projectName.toLowerCase().includes(normalizedSearch) ||
        scan.projectType.toLowerCase().includes(normalizedSearch) ||
        scan.scanName.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchValue, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredScans.length / pageSize));

  const paginatedScans = useMemo(
    () =>
      filteredScans.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredScans, currentPage, pageSize],
  );

  const completedScans = SCANS.filter((scan) => scan.status === 'completed').length;
  const inProgressScans = SCANS.filter((scan) => scan.status === 'in-progress').length;
  const scheduledScans = SCANS.filter((scan) => scan.status === 'scheduled').length;
  const failedScans = SCANS.filter((scan) => scan.status === 'failed').length;

  return (
    <Page>
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button
            label="New Scan"
            icon={<Play />}
            iconPosition="left"
            hierarchy="primary"
            size="md"
            onClick={() => {
              setLaunchScanStep(1);
              setIsLaunchScanOpen(true);
            }}
          />
        }
      />

      <PageSection>
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Optional top tabs: used in ASV Scans view only */}
          {showTabs && (
            <div
              style={{
                display: 'flex',
                gap: 24,
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              {[
                { id: 'scans', label: 'Scans' },
                { id: 'history', label: 'History' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'disputes', label: 'Disputes' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    style={{
                      position: 'relative',
                      padding: '8px 4px 10px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#155EEF' : '#667085',
                    }}
                  >
                    {tab.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 3,
                          borderRadius: 999,
                          background: '#155EEF',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {(!showTabs || activeTab === 'scans') && (
            <>
              <ScansStatsSection
                completedScans={completedScans}
                inProgressScans={inProgressScans}
                scheduledScans={scheduledScans}
                failedScans={failedScans}
              />

              <ScansTableSection
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                paginatedScans={paginatedScans}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                onSelectScanForDetails={setSelectedScanForDetails}
                onActionClick={(scan) => {
                  if (scan.actionLabel === 'Rescan') {
                    addToast({
                      title: '⟳ Rescan initiated',
                      message: `A new rescan has been queued for ${scan.id}`,
                      variant: 'info',
                    });
                  } else if (scan.actionLabel === 'Retry Scan') {
                    setSelectedScanForDetails(scan);
                  }
                }}
              />
            </>
          )}

          {showTabs && activeTab !== 'scans' && (
            <div
              style={{
                borderRadius: 16,
                border: '1px dashed #E5E7EB',
                background: '#F9FAFB',
                padding: 32,
                fontSize: 14,
                color: colors.text.neutral.sub,
                textAlign: 'center',
              }}
            >
              {activeTab === 'history' && 'History view will show past scans in detail.'}
              {activeTab === 'timeline' && 'Timeline view will show scan activity over time.'}
              {activeTab === 'disputes' && 'Disputes view will show ASV disputes and statuses.'}
            </div>
          )}
        </div>
      </PageSection>
      <LaunchScanDrawer
        isOpen={isLaunchScanOpen}
        onClose={() => {
          setIsLaunchScanOpen(false);
          setLaunchScanStep(1);
        }}
        scanStep={launchScanStep}
        setScanStep={setLaunchScanStep}
        scanMode={scanMode}
        selectedComplianceQuarter={selectedComplianceWindowId}
        passedQuarterOverride={passedQuarterOverride}
        projectId={undefined}
        complianceWindows={complianceWindowsForDrawer}
        complianceWindowsLoading={complianceWindowsLoading}
        complianceWindowsError={complianceWindowsError}
        scanTargetAssets={scanTargetAssets}
        isLaunchScanAssetsLoading={launchScanAssetsLoading}
        assetsLoadError={launchScanAssetsError}
        selectedAssetIds={selectedAssetIds}
        setSelectedAssetIds={setSelectedAssetIds}
        setAssetSearchQuery={setAssetSearchQuery}
        scanName={scanName}
        addToast={addToast as any}
        Step1={
          <LaunchScanStep1
            projectName={projectName}
            setProjectName={setProjectName}
            scanName={scanName}
            setScanName={setScanName}
            selectedComplianceWindowId={selectedComplianceWindowId}
            setSelectedComplianceWindowId={setSelectedComplianceWindowId}
            scanMode={scanMode}
            setScanMode={setScanMode}
            passedQuarterOverride={passedQuarterOverride}
            setPassedQuarterOverride={setPassedQuarterOverride}
            projectId={undefined}
            complianceWindows={complianceWindows}
            complianceWindowsLoading={complianceWindowsLoading}
            complianceWindowsError={complianceWindowsError}
          />
        }
        Step2={
          <LaunchScanStep2
            scanMode={scanMode}
            selectedComplianceWindowStatus={selectedComplianceWindow?.status ?? null}
            scanTargetAssets={scanTargetAssets}
            assetSearchQuery={assetSearchQuery}
            setAssetSearchQuery={setAssetSearchQuery}
            selectedAssetIds={selectedAssetIds}
            setSelectedAssetIds={setSelectedAssetIds}
            isAssetSearchFocused={isAssetSearchFocused}
            setIsAssetSearchFocused={setIsAssetSearchFocused}
            isLoadingAssets={launchScanAssetsLoading}
            assetsLoadError={launchScanAssetsError}
          />
        }
        Step3={
          <LaunchScanStep3
            scanTargetAssets={scanTargetAssets}
            selectedAssetIds={selectedAssetIds}
            projectName={projectName}
            complianceQuarterLabel={selectedComplianceWindow?.quarter_label ?? '—'}
            scanMode={scanMode}
            scanName={scanName}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            timeZone={timeZone}
            setTimeZone={setTimeZone}
            scanWindow={scanWindow}
            setScanWindow={setScanWindow}
          />
        }
      />
      {selectedScanForDetails && (
        <ScanDetailsDrawer
          scan={selectedScanForDetails}
          onClose={() => setSelectedScanForDetails(null)}
          onRescan={(scan) => {
            if (scan.status === 'scheduled') {
              addToast({
                title: 'Scan started now',
                message: `${scan.id} has been moved to immediate execution`,
                variant: 'info',
              });
            } else if (scan.status === 'failed') {
              addToast({
                title: 'Scan retry started',
                message: `${scan.id} has been requeued`,
                variant: 'warning',
              });
            } else {
              addToast({
                title: 'Rescan queued',
                message: `A new rescan has been queued for ${scan.id}`,
                variant: 'info',
              });
            }
            setSelectedScanForDetails(null);
          }}
          onDownloadReport={(scan) => {
            try {
              if (typeof document !== 'undefined') {
                const blob = new Blob(
                  [
                    `Report for ${scan.id}\n\n` +
                      `Project: ${scan.projectName}\n` +
                      `Scan name: ${scan.scanName}\n` +
                      `Schedule: ${scan.schedule}\n`,
                  ],
                  { type: 'application/pdf' },
                );
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${scan.id}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }
            } catch {
              // best-effort download; ignore errors
            }

            addToast({
              title: 'Report downloaded',
              message: `${scan.id} — PDF report saved`,
              variant: 'success',
            });
          }}
        />
      )}
      {typeof document !== 'undefined' &&
        createPortal(
          <ToastStack toasts={toasts} onDismiss={dismissToast} />,
          document.body
        )}
    </Page>
  );
}