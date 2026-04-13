import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Page } from '../ui/page/Page';
import { ToastStack, Clock, Calendar, Check, Checkbox } from '../components';
import type { ToastItem } from '../components';
import { spacing, colors } from '../design-system/tokens';
import { Header as SecurityDashboardHeader } from './security-dashboard/Header';
import { FilterCardsSection } from './security-dashboard/FilterCardsSection';
import { CriticalAssetsSection } from './security-dashboard/CriticalAssetsSection';
import { VulnerabilityAndScansSection } from './security-dashboard/VulnerabilityAndScansSection';
import { UpcomingScheduleSection } from './security-dashboard/UpcomingScheduleSection';
import { SecurityDashboardAssetDetailsDrawer } from './security-dashboard/SecurityDashboardAssetDetailsDrawer';
import { LaunchScanDrawer } from './security-dashboard/LaunchScanDrawer';
import { AddAssetDrawer } from './security-dashboard/components/add-asset';
import {
  getFilterCards,
  criticalAssets,
  assetVulnerabilities,
  vulnerabilityOverview,
  scanActivities,
  upcomingSchedules,
} from './security-dashboard/securityDashboardData';
import { useLaunchScanTargetAssets } from './security-dashboard/components/launch-scan/useLaunchScanTargetAssets';
import { useLaunchScanComplianceWindows } from './security-dashboard/components/launch-scan/useLaunchScanComplianceWindows';
import {
  criticalAssetsStyles,
  vulnerabilityScanStyles,
} from './security-dashboard/securityDashboardStyles';
import { LaunchScanStep1 } from './security-dashboard/components/launch-scan/LaunchScanStep1';
import { LaunchScanStep2 } from './security-dashboard/components/launch-scan/LaunchScanStep2';
import { LaunchScanStep3 } from './security-dashboard/components/launch-scan/LaunchScanStep3';

type FrameworkScopingConfig = {
  entityType?: string;
  pciLevel?: string;
  assessmentPath?: string;
  description?: string;
  implementationIntent?: string[];
};

type ProjectSetupData = {
  projectName: string;
  projectKey: string;
};

type AssetRow = {
  id: string;
  assetName: string;
  endpoint: string;
  assetType: string;
};

export function CommandCenterView() {
  // Set to true to show empty state, false to show with projects
  const hasProjects = true;

  const navigate = useNavigate();
  const location = useLocation();
  // State for Side Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedComplianceGroups, setSelectedComplianceGroups] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [scopingConfig, setScopingConfig] = useState<Record<string, FrameworkScopingConfig>>({});
  const [projectSetup, setProjectSetup] = useState<Record<string, ProjectSetupData>>({});
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeAssetForDetails, setActiveAssetForDetails] = useState<{
    id: string;
    name: string;
    ipAddress: string;
    typeLabel: string;
    lastScanned: string;
  } | null>(null);
  const [activeVulnTab, setActiveVulnTab] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [scanStep, setScanStep] = useState<1 | 2 | 3>(1);
  const [scanMode, setScanMode] = useState<'full' | 'rescan'>('full');
  const [passedQuarterOverride, setPassedQuarterOverride] = useState(false);
  const [projectName, setProjectName] = useState(
    'Q-Series PCI ASV Compliance — PCI ASV Scan'
  );
  const [scanName, setScanName] = useState('ASV Scan');
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [isAssetSearchFocused, setIsAssetSearchFocused] = useState(false);
  const [isAddAssetDrawerOpen, setIsAddAssetDrawerOpen] = useState(false);
  const [startDate, setStartDate] = useState('2026-03-15');
  const [startTime, setStartTime] = useState('02:00');
  const [timeZone, setTimeZone] = useState('UTC');
  const [scanWindow, setScanWindow] = useState<
    'none' | 'off-hours' | 'business-hours' | 'custom'
  >('off-hours');

  const {
    assets: scanTargetAssets,
    loading: launchScanAssetsLoading,
    error: launchScanAssetsError,
  } = useLaunchScanTargetAssets(isDrawerOpen);

  const {
    complianceWindows,
    complianceWindowsLoading,
    complianceWindowsError,
    selectedComplianceWindowId,
    setSelectedComplianceWindowId,
    selectedComplianceWindow,
  } = useLaunchScanComplianceWindows(undefined, isDrawerOpen);

  const complianceWindowsForDrawer = complianceWindows.map(({ id, status }) => ({
    id,
    status,
  }));

  useEffect(() => {
    if (!isDrawerOpen || !selectedComplianceWindow) return;
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
  }, [isDrawerOpen, selectedComplianceWindow?.id, selectedComplianceWindow?.status]);

  useEffect(() => {
    const state = location.state as { openLaunchScan?: boolean } | null;
    if (state?.openLaunchScan) {
      handleCreateProject();
    }
  }, [location.state]);

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleCreateProject = () => {
    setIsDrawerOpen(true);
    setCurrentStep(1);
    setScanStep(1);
    setScanMode('full');
    setPassedQuarterOverride(false);
    setProjectName('Q-Series PCI ASV Compliance — PCI ASV Scan');
    setScanName('ASV Scan');
    setSelectedAssetIds([]);
    setAssetSearchQuery('');
    setStartDate('2026-03-15');
    setStartTime('02:00');
    setTimeZone('UTC');
    setScanWindow('off-hours');
  };

  const handleOpenAddAssetDrawer = () => {
    setIsAddAssetDrawerOpen(true);
  };

  const handleCloseAddAssetDrawer = () => {
    setIsAddAssetDrawerOpen(false);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentStep(1);
    setSelectedComplianceGroups([]);
    setSelectedFrameworks([]);
    setScopingConfig({});
    setProjectSetup({});
  };

  useEffect(() => {
    const state = location.state as {
      openLaunchScan?: boolean;
    } | null;

    if (state?.openLaunchScan) {
      handleCreateProject();
    }
  }, [location.state]);

  const handleToggleCompliance = (groupId: string) => {
    setSelectedComplianceGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleToggleFramework = (frameworkId: string) => {
    setSelectedFrameworks((prev) =>
      prev.includes(frameworkId)
        ? prev.filter((id) => id !== frameworkId)
        : [...prev, frameworkId]
    );
  };

  const handleScopingConfigChange = (frameworkId: string, config: FrameworkScopingConfig) => {
    setScopingConfig((prev) => ({
      ...prev,
      [frameworkId]: config,
    }));
  };

  const handleProjectSetupChange = (frameworkId: string, data: ProjectSetupData) => {
    setProjectSetup((prev) => ({
      ...prev,
      [frameworkId]: data,
    }));
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      addToast({
        title: 'Compliance Groups Saved',
        message: 'Step 1 completed successfully.',
        variant: 'info',
      });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      addToast({
        title: 'Frameworks Selected',
        message: 'Step 2 completed successfully.',
        variant: 'success',
      });
      setCurrentStep(3);
    } else if (currentStep === 3) {
      addToast({
        title: 'Scoping Configured',
        message: 'Step 3 completed successfully.',
        variant: 'warning',
      });
      setCurrentStep(4);
    } else if (currentStep === 4) {
      addToast({
        title: 'Project Setup Saved',
        message: 'Step 4 completed successfully.',
        variant: 'success',
      });
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Create projects
      handleCreateProjects();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditFromReview = (step: number) => {
    setCurrentStep(step);
  };

  const handleCreateProjects = () => {
    // TODO: Implement API call to create projects
    // For now, just close the drawer and show success
    handleCloseDrawer();
    addToast({
      title: 'Projects Created',
      message: 'All configured projects were created successfully.',
      variant: 'success',
    });
  };

  // Determine if continue button should be disabled
  const isContinueDisabled = () => {
    if (currentStep === 1) {
      return selectedComplianceGroups.length === 0;
    }
    if (currentStep === 2) {
      return selectedFrameworks.length === 0;
    }
    if (currentStep === 3) {
      // Check if at least one framework has some configuration
      return !selectedFrameworks.some(frameworkId => {
        const config = scopingConfig[frameworkId];
        return config && (
          config.entityType ||
          config.pciLevel ||
          config.assessmentPath ||
          config.description ||
          (config.implementationIntent && config.implementationIntent.length > 0)
        );
      });
    }
    if (currentStep === 4) {
      // Check if all frameworks have project name and key
      console.log('🔍 Validating Step 4:');
      console.log('  Selected Frameworks:', selectedFrameworks);
      console.log('  Project Setup Data:', projectSetup);

      const isValid = selectedFrameworks.every(frameworkId => {
        const setup = projectSetup[frameworkId];
        const hasData = setup && setup.projectName && setup.projectKey;
        console.log(`  Framework ${frameworkId}:`, {
          hasSetup: !!setup,
          projectName: setup?.projectName || '(empty)',
          projectKey: setup?.projectKey || '(empty)',
          isValid: hasData
        });
        return hasData;
      });

      console.log('  Overall Valid:', isValid);
      console.log('  Button Disabled:', !isValid);
      return !isValid;
    }
    return false;
  };

  const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="5" y="3" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="3" y="5" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
  const filterCards = getFilterCards(hasProjects);

  const renderSparkline = (
    direction: 'up' | 'down',
    color: string,
    idSuffix: string,
    width = 56,
    height = 18
  ) => {
    const path =
      direction === 'up'
        ? `M1 ${height - 5} L14 ${height - 7} L28 ${height - 9} L42 ${height - 11} L${width - 1} ${height - 13
        }`
        : `M1 ${height - 13} L14 ${height - 11} L28 ${height - 9} L42 ${height - 7} L${width - 1
        } ${height - 5}`;

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`sparklineGradient-${idSuffix}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y={height / 2}
          width={width}
          height={height / 2}
          fill={`url(#sparklineGradient-${idSuffix})`}
        />
        <path
          d={path}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  };


  return (
    <Page>
      <SecurityDashboardHeader
        onAddAsset={handleOpenAddAssetDrawer}
        onLaunchScan={handleCreateProject}
      />

      <FilterCardsSection cards={filterCards as any} />

      <CriticalAssetsSection
        assets={criticalAssets as any}
        styles={criticalAssetsStyles}
        onManageAssets={() => navigate('/scan-components')}
        onSelectAsset={(asset: any) => {
          setActiveAssetForDetails({
            id: asset.id,
            name: asset.name,
            ipAddress: asset.ipAddress,
            typeLabel: asset.type,
            lastScanned: asset.lastScanned,
          });
          setActiveVulnTab('all');
        }}
      />

      <VulnerabilityAndScansSection
        overview={vulnerabilityOverview as any}
        scanActivities={scanActivities as any}
        styles={vulnerabilityScanStyles}
        onViewAllVulns={() => {}}
        onViewAllScans={() => navigate('/scans')}
        renderSparkline={renderSparkline}
      />

      <UpcomingScheduleSection
        items={upcomingSchedules as any}
        onViewAll={() => navigate('/scan-components')}
      />

      <SecurityDashboardAssetDetailsDrawer
        activeAsset={activeAssetForDetails}
        assetVulnerabilities={assetVulnerabilities}
        activeVulnTab={activeVulnTab}
        onChangeTab={setActiveVulnTab}
        onClose={() => setActiveAssetForDetails(null)}
      />

      <LaunchScanDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        scanStep={scanStep}
        setScanStep={setScanStep}
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

      <AddAssetDrawer
        isOpen={isAddAssetDrawerOpen}
        onClose={handleCloseAddAssetDrawer}
      />

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </Page>
  );
}
