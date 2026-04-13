import { SideDrawer, Shield } from '../../components';

type LaunchScanDrawerProps = {
  isOpen: boolean;
  onClose: () => void;

  scanStep: 1 | 2 | 3;
  setScanStep: (step: 1 | 2 | 3) => void;

  scanMode: string;
  /** Selected project compliance window row id. */
  selectedComplianceQuarter: string;
  passedQuarterOverride: boolean;

  projectId?: string;
  complianceWindows: Array<{ id: string; status: string }>;
  complianceWindowsLoading: boolean;
  complianceWindowsError: string | null;

  scanTargetAssets: Array<{
    id: string;
    hasPriorFinding?: boolean;
    host_alive?: boolean;
  }>;
  /** When true, step 2 blocks "Next" until assets finish loading. */
  isLaunchScanAssetsLoading?: boolean;
  /** When set, step 2 blocks "Next" (API failed; no mock fallback). */
  assetsLoadError?: string | null;
  selectedAssetIds: string[];
  setSelectedAssetIds: (ids: string[]) => void;
  setAssetSearchQuery: (q: string) => void;

  scanName: string;
  addToast: (toast: any) => void;

  /** When set, step 3 "Schedule Scan" calls this (e.g. POST /projects/:id/schedules). */
  onScheduleScan?: () => Promise<void>;
  scheduleSubmitting?: boolean;

  Step1: React.ReactNode;
  Step2: React.ReactNode;
  Step3: React.ReactNode;
};

export function LaunchScanDrawer({
  isOpen,
  onClose,
  scanStep,
  setScanStep,
  scanMode,
  selectedComplianceQuarter,
  passedQuarterOverride,
  projectId,
  complianceWindows,
  complianceWindowsLoading,
  complianceWindowsError,
  scanTargetAssets,
  isLaunchScanAssetsLoading = false,
  assetsLoadError = null,
  selectedAssetIds,
  setSelectedAssetIds,
  setAssetSearchQuery,
  scanName,
  addToast,
  onScheduleScan,
  scheduleSubmitting = false,
  Step1,
  Step2,
  Step3,
}: LaunchScanDrawerProps) {
  const selectedCw = complianceWindows.find((w) => w.id === selectedComplianceQuarter);
  const cwStatus = (selectedCw?.status || '').toUpperCase();
  const step1ComplianceBlocked =
    complianceWindowsLoading ||
    Boolean(complianceWindowsError) ||
    !projectId?.trim() ||
    (!complianceWindowsLoading &&
      Boolean(projectId?.trim()) &&
      complianceWindows.length === 0) ||
    (cwStatus === 'COMPLETED' && !passedQuarterOverride);

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Launch New Scan"
      subtitle={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span>
            {scanStep === 1
              ? 'Step 1 of 3 — Scan Configuration'
              : scanStep === 2
                ? 'Step 2 of 3 — Select Assets'
                : 'Step 3 of 3 — Schedule'}
          </span>
        </div>
      }
      icon={<Shield />}
      primaryButtonLabel={scanStep === 3 ? 'Schedule Scan' : 'Next Step'}
      secondaryButtonLabel={scanStep === 1 ? 'Cancel' : 'Back'}
      onPrimaryClick={() => {
        if (scanStep === 1) {
          if (scanMode === 'rescan' && cwStatus === 'IN_PROGRESS') {
            const failingIds = scanTargetAssets
              .filter(
                (asset) =>
                  asset.hasPriorFinding && asset.host_alive === true,
              )
              .map((asset) => asset.id);
            setSelectedAssetIds(failingIds);
          } else {
            setSelectedAssetIds([]);
          }
          setAssetSearchQuery('');
          setScanStep(2);
        } else if (scanStep === 2) {
          if (
            isLaunchScanAssetsLoading ||
            Boolean(assetsLoadError) ||
            selectedAssetIds.length === 0
          ) {
            return;
          }
          setScanStep(3);
        } else if (scanStep === 3) {
          if (scheduleSubmitting) return;
          if (onScheduleScan) {
            void (async () => {
              try {
                await onScheduleScan();
                onClose();
                addToast({
                  title: 'Scan scheduled',
                  message: `${scanName} has been scheduled.`,
                  variant: 'success',
                });
              } catch (err: unknown) {
                const message =
                  err instanceof Error ? err.message : 'Failed to schedule scan.';
                addToast({
                  title: 'Schedule failed',
                  message,
                  variant: 'error',
                });
              }
            })();
          } else {
            onClose();
            addToast({
              title: 'Schedule not saved',
              message:
                'No project is linked to this flow, so nothing was sent to the API. Open Launch Scan from a project (dashboard or ASV) to create rows in project_scan_schedules and scan_assets.',
              variant: 'warning',
            });
          }
        }
      }}
      onSecondaryClick={() => {
        if (scanStep === 1) {
          onClose();
        } else {
          setScanStep((scanStep - 1) as 1 | 2 | 3);
        }
      }}
      primaryButtonDisabled={
        (scanStep === 1 && step1ComplianceBlocked) ||
        (scanStep === 2 &&
          (isLaunchScanAssetsLoading ||
            Boolean(assetsLoadError) ||
            selectedAssetIds.length === 0)) ||
        (scanStep === 3 && scheduleSubmitting)
      }
      buttonAlignment="right"
    >
      {scanStep === 1 && Step1}
      {scanStep === 2 && Step2}
      {scanStep === 3 && Step3}
    </SideDrawer>
  );
}

