import { useCallback, useEffect, useState } from 'react';
import { Button, ToastStack, type ToastItem } from '../../components';
import { LaunchScanDrawer } from '../security-dashboard/LaunchScanDrawer';
import { LaunchScanStep1 } from '../security-dashboard/components/launch-scan/LaunchScanStep1';
import { LaunchScanStep2 } from '../security-dashboard/components/launch-scan/LaunchScanStep2';
import { LaunchScanStep3 } from '../security-dashboard/components/launch-scan/LaunchScanStep3';
import { useLaunchScanTargetAssets } from '../security-dashboard/components/launch-scan/useLaunchScanTargetAssets';
import { useLaunchScanComplianceWindows } from '../security-dashboard/components/launch-scan/useLaunchScanComplianceWindows';
import {
  buildCreateScanSchedulePayload,
  createProjectScanSchedule,
} from '../security-dashboard/components/launch-scan/launchScanScheduleApi';

type LaunchScanButtonProps = {
  projectName: string;
  /** Route or API project id/key — required for compliance windows on step 1. */
  projectId?: string;
};

type ScanStep = 1 | 2 | 3;
type ScanMode = 'full' | 'rescan';
type ScanWindow = 'none' | 'off-hours' | 'business-hours' | 'custom';

function syncScanModeToWindow(
  w: { status: string } | null | undefined,
  setScanMode: (m: ScanMode) => void,
  setPassedQuarterOverride: (v: boolean) => void,
  setScanName: (updater: (prev: string) => string) => void,
) {
  if (!w) return;
  const st = (w.status || '').toUpperCase();
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
}

export function LaunchScanButton({ projectName, projectId }: LaunchScanButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scanStep, setScanStep] = useState<ScanStep>(1);

  const [scanMode, setScanMode] = useState<ScanMode>('full');
  const [passedQuarterOverride, setPassedQuarterOverride] = useState(false);

  const [localProjectName, setLocalProjectName] = useState(projectName);
  const [scanName, setScanName] = useState('ASV Scan');

  const {
    complianceWindows,
    complianceWindowsLoading,
    complianceWindowsError,
    selectedComplianceWindowId,
    setSelectedComplianceWindowId,
    selectedComplianceWindow,
  } = useLaunchScanComplianceWindows(projectId, isOpen);

  const {
    assets: scanTargetAssets,
    loading: launchScanAssetsLoading,
    error: launchScanAssetsError,
  } = useLaunchScanTargetAssets(isOpen);

  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [isAssetSearchFocused, setIsAssetSearchFocused] = useState(false);

  const [startDate, setStartDate] = useState('2026-03-15');
  const [startTime, setStartTime] = useState('02:00');
  const [timeZone, setTimeZone] = useState('UTC');
  const [scanWindow, setScanWindow] = useState<ScanWindow>('off-hours');
  const [scheduleSubmitting, setScheduleSubmitting] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    setLocalProjectName(projectName);
  }, [projectName]);

  useEffect(() => {
    if (!isOpen || !selectedComplianceWindow) return;
    syncScanModeToWindow(
      selectedComplianceWindow,
      setScanMode,
      setPassedQuarterOverride,
      setScanName,
    );
  }, [isOpen, selectedComplianceWindow?.id, selectedComplianceWindow?.status]);

  const complianceWindowsForDrawer = complianceWindows.map(({ id, status }) => ({
    id,
    status,
  }));

  const handleScheduleScan = useCallback(async () => {
    const pid = projectId?.trim();
    if (!pid) {
      throw new Error('Project is required to schedule a scan.');
    }
    if (!selectedComplianceWindowId) {
      throw new Error('Select a compliance window.');
    }
    if (selectedAssetIds.length === 0) {
      throw new Error('Select at least one asset.');
    }
    setScheduleSubmitting(true);
    try {
      const payload = buildCreateScanSchedulePayload({
        complianceWindowId: selectedComplianceWindowId,
        scanName: scanName.trim() || 'ASV Scan',
        scanMode,
        scheduledDate: startDate,
        scheduledTime: startTime,
        timezone: timeZone,
        scanWindow,
        assetIds: selectedAssetIds,
      });
      await createProjectScanSchedule(pid, payload);
    } finally {
      setScheduleSubmitting(false);
    }
  }, [
    projectId,
    selectedComplianceWindowId,
    selectedAssetIds,
    scanName,
    scanMode,
    startDate,
    startTime,
    timeZone,
    scanWindow,
  ]);

  return (
    <>
      <Button
        label="Launch Scan"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M2.25 5.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H5.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V5.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.75 12.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H12.75"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V12.75"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 9H12.75"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        iconPosition="left"
        variant="primary"
        size="md"
        onClick={() => {
          setScanStep(1);
          setIsOpen(true);
        }}
      />

      <LaunchScanDrawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setScanStep(1);
        }}
        scanStep={scanStep}
        setScanStep={setScanStep}
        scanMode={scanMode}
        selectedComplianceQuarter={selectedComplianceWindowId}
        passedQuarterOverride={passedQuarterOverride}
        projectId={projectId}
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
        addToast={pushToast}
        onScheduleScan={projectId?.trim() ? handleScheduleScan : undefined}
        scheduleSubmitting={scheduleSubmitting}
        Step1={
          <LaunchScanStep1
            projectName={localProjectName}
            setProjectName={setLocalProjectName}
            scanName={scanName}
            setScanName={setScanName}
            selectedComplianceWindowId={selectedComplianceWindowId}
            setSelectedComplianceWindowId={setSelectedComplianceWindowId}
            scanMode={scanMode}
            setScanMode={setScanMode}
            passedQuarterOverride={passedQuarterOverride}
            setPassedQuarterOverride={setPassedQuarterOverride}
            projectId={projectId}
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
            projectName={localProjectName}
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
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
