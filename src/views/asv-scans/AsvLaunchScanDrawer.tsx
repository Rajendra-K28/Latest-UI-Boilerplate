import type { ToastItem } from '../../components';
import { LaunchScanDrawer } from '../security-dashboard/LaunchScanDrawer';
import { LaunchScanStep1 } from '../security-dashboard/components/launch-scan/LaunchScanStep1';
import { LaunchScanStep2 } from '../security-dashboard/components/launch-scan/LaunchScanStep2';
import { LaunchScanStep3 } from '../security-dashboard/components/launch-scan/LaunchScanStep3';
import type { ProjectComplianceWindowDto } from '../security-dashboard/components/launch-scan/launchScanCompliance.types';

type ScanMode = 'full' | 'rescan';
type ScanWindow = 'none' | 'off-hours' | 'business-hours' | 'custom';

export type AsvLaunchScanDrawerProps = {
  isOpen: boolean;
  onClose: () => void;

  scanStep: 1 | 2 | 3;
  setScanStep: (step: 1 | 2 | 3) => void;

  scanMode: ScanMode;
  selectedComplianceWindowId: string;
  passedQuarterOverride: boolean;

  projectId?: string;
  complianceWindows: ProjectComplianceWindowDto[];
  complianceWindowsLoading: boolean;
  complianceWindowsError: string | null;
  setSelectedComplianceWindowId: (id: string) => void;
  selectedComplianceWindow: ProjectComplianceWindowDto | null;

  scanTargetAssets: Array<{
    id: string;
    name: string;
    ip: string;
    isWhitelisted?: boolean;
    isValidated?: boolean;
    hasPriorFinding?: boolean;
    host_alive?: boolean;
  }>;
  isLaunchScanAssetsLoading?: boolean;
  assetsLoadError?: string | null;
  selectedAssetIds: string[];

  projectName: string;
  setProjectName: (name: string) => void;

  scanName: string;
  setScanName: (name: string) => void;

  setPassedQuarterOverride: (value: boolean) => void;

  setSelectedAssetIds: (ids: string[]) => void;
  assetSearchQuery: string;
  setAssetSearchQuery: (q: string) => void;

  isAssetSearchFocused: boolean;
  setIsAssetSearchFocused: (value: boolean) => void;

  startDate: string;
  setStartDate: (date: string) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  timeZone: string;
  setTimeZone: (tz: string) => void;
  scanWindow: ScanWindow;
  setScanWindow: (window: ScanWindow) => void;

  setScanMode: (mode: ScanMode) => void;

  onScheduleScan?: () => Promise<void>;
  scheduleSubmitting?: boolean;
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
};

export function AsvLaunchScanDrawer({
  isOpen,
  onClose,
  scanStep,
  setScanStep,
  scanMode,
  selectedComplianceWindowId,
  passedQuarterOverride,
  projectId,
  complianceWindows,
  complianceWindowsLoading,
  complianceWindowsError,
  setSelectedComplianceWindowId,
  selectedComplianceWindow,
  scanTargetAssets,
  isLaunchScanAssetsLoading = false,
  assetsLoadError = null,
  selectedAssetIds,
  setSelectedAssetIds,
  setAssetSearchQuery,
  scanName,
  setScanName,
  projectName,
  setProjectName,
  setPassedQuarterOverride,
  assetSearchQuery,
  isAssetSearchFocused,
  setIsAssetSearchFocused,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  timeZone,
  setTimeZone,
  scanWindow,
  setScanWindow,
  setScanMode,
  onScheduleScan,
  scheduleSubmitting = false,
  addToast,
}: AsvLaunchScanDrawerProps) {
  const complianceWindowsForDrawer = complianceWindows.map(({ id, status }) => ({
    id,
    status,
  }));

  return (
    <LaunchScanDrawer
      isOpen={isOpen}
      onClose={onClose}
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
      isLaunchScanAssetsLoading={isLaunchScanAssetsLoading}
      assetsLoadError={assetsLoadError}
      selectedAssetIds={selectedAssetIds}
      setSelectedAssetIds={setSelectedAssetIds}
      setAssetSearchQuery={setAssetSearchQuery}
      scanName={scanName}
      addToast={addToast}
      onScheduleScan={onScheduleScan}
      scheduleSubmitting={scheduleSubmitting}
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
          isLoadingAssets={isLaunchScanAssetsLoading}
          assetsLoadError={assetsLoadError}
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
  );
}
