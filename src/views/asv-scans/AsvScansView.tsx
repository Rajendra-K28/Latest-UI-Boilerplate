import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, PageSection } from '../../ui/page';
import { ToastStack, type ToastItem } from '../../components';
import { AsvLaunchScanDrawer } from './AsvLaunchScanDrawer';
import { AsvScansHeader } from './AsvScansHeader';
import { AsvScansHistoryTab } from './AsvScansHistoryTab';
import { AsvScansScansTab } from './AsvScansScansTab';
import { AsvScansTabs } from './AsvScansTabs';
import { AsvScansTimelineTab } from './AsvScansTimelineTab';
import { AsvScansDisputesTab } from './AsvScansDisputesTab';
import { useLaunchScanTargetAssets } from '../security-dashboard/components/launch-scan/useLaunchScanTargetAssets';
import { useLaunchScanComplianceWindows } from '../security-dashboard/components/launch-scan/useLaunchScanComplianceWindows';
import {
  buildCreateScanSchedulePayload,
  createProjectScanSchedule,
} from '../security-dashboard/components/launch-scan/launchScanScheduleApi';

type AsvTabId = 'scans' | 'history' | 'timeline' | 'disputes';
type ExpandedQuarterId = 'q4' | 'q3' | 'q2' | 'q1' | null;
type ScanMode = 'full' | 'rescan';
type ScanWindow = 'none' | 'off-hours' | 'business-hours' | 'custom';

export function AsvScansView() {
  const { projectId } = useParams<{ projectId: string }>();

  const [activeTab, setActiveTab] = useState<AsvTabId>('scans');
  const [expandedQuarterId, setExpandedQuarterId] =
    useState<ExpandedQuarterId>('q4');

  const [isLaunchScanOpen, setIsLaunchScanOpen] = useState(false);
  const [launchScanStep, setLaunchScanStep] = useState<1 | 2 | 3>(1);

  const [scanMode, setScanMode] = useState<ScanMode>('full');
  const [passedQuarterOverride, setPassedQuarterOverride] = useState(false);

  const [projectName, setProjectName] = useState(
    'Q-Series PCI ASV Compliance — PCI ASV Scan'
  );
  const [scanName, setScanName] = useState('ASV Scan');

  const {
    complianceWindows,
    complianceWindowsLoading,
    complianceWindowsError,
    selectedComplianceWindowId,
    setSelectedComplianceWindowId,
    selectedComplianceWindow,
  } = useLaunchScanComplianceWindows(projectId, isLaunchScanOpen);

  const {
    assets: scanTargetAssets,
    loading: launchScanAssetsLoading,
    error: launchScanAssetsError,
  } = useLaunchScanTargetAssets(isLaunchScanOpen);

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

  const handleLaunchNewScan = () => {
    setScanMode('full');
    setPassedQuarterOverride(false);
    setScanName('ASV Scan');
    setLaunchScanStep(1);
    setIsLaunchScanOpen(true);
  };

  const handleLaunchRescan = () => {
    setScanMode('rescan');
    setPassedQuarterOverride(false);
    setScanName((prev) => {
      if (prev.includes('Rescan')) return prev;
      if (prev.includes('Scan')) return prev.replace(/Scan/g, 'Rescan');
      return `${prev} Rescan`;
    });
    setLaunchScanStep(1);
    setIsLaunchScanOpen(true);
  };

  return (
    <Page>
      <AsvScansHeader onLaunchNewScan={handleLaunchNewScan} />

      <PageSection>
        <AsvScansTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          scansTab={
            <AsvScansScansTab
              expandedQuarterId={expandedQuarterId}
              setExpandedQuarterId={setExpandedQuarterId}
              onLaunchRescan={handleLaunchRescan}
            />
          }
          historyTab={<AsvScansHistoryTab />}
          timelineTab={<AsvScansTimelineTab />}
          disputesTab={<AsvScansDisputesTab />}
        />
      </PageSection>

      <AsvLaunchScanDrawer
        isOpen={isLaunchScanOpen}
        onClose={() => {
          setIsLaunchScanOpen(false);
          setLaunchScanStep(1);
        }}
        scanStep={launchScanStep}
        setScanStep={setLaunchScanStep}
        scanMode={scanMode}
        selectedComplianceWindowId={selectedComplianceWindowId}
        passedQuarterOverride={passedQuarterOverride}
        projectId={projectId}
        complianceWindows={complianceWindows}
        complianceWindowsLoading={complianceWindowsLoading}
        complianceWindowsError={complianceWindowsError}
        setSelectedComplianceWindowId={setSelectedComplianceWindowId}
        selectedComplianceWindow={selectedComplianceWindow}
        scanTargetAssets={scanTargetAssets}
        isLaunchScanAssetsLoading={launchScanAssetsLoading}
        assetsLoadError={launchScanAssetsError}
        selectedAssetIds={selectedAssetIds}
        setSelectedAssetIds={setSelectedAssetIds}
        assetSearchQuery={assetSearchQuery}
        setAssetSearchQuery={setAssetSearchQuery}
        isAssetSearchFocused={isAssetSearchFocused}
        setIsAssetSearchFocused={setIsAssetSearchFocused}
        projectName={projectName}
        setProjectName={setProjectName}
        scanName={scanName}
        setScanName={setScanName}
        setPassedQuarterOverride={setPassedQuarterOverride}
        setScanMode={setScanMode}
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        timeZone={timeZone}
        setTimeZone={setTimeZone}
        scanWindow={scanWindow}
        setScanWindow={setScanWindow}
        onScheduleScan={projectId?.trim() ? handleScheduleScan : undefined}
        scheduleSubmitting={scheduleSubmitting}
        addToast={pushToast}
      />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </Page>
  );
}
