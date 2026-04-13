import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, PageHeader, PageSection, PageGrid } from '../ui/page/Page';
import {
  ProjectsTable,
  Button,
  FilterCard,
  Folder,
  SideDrawer,
  ToastStack,
  CheckCircle,
  TrustShield,
  Plus,
} from '../components';
import type { ProjectTableItem, ToastItem } from '../components';
import {
  SelectComplianceView,
  SelectFrameworksView,
  ConfigureScopingView,
  ProjectSetupView,
  ReviewProjectsView,
} from '../sidebarViews';
import {
  ScanConfigurationView,
  TeamSetupView,
  createProjectFromSidebar,
  inviteAndAddProjectMembers,
  type InviteRecipient,
  type ScanConfigurationSummary,
} from '../sidebarViews/createProjectSidebarViews';
import { colors } from '../design-system/tokens';

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

type ApiProjectRow = {
  id: string;
  name: string;
  key: string;
  status?: string;
  created_by_user_id?: string;
  owner_name?: string | null;
  created_at?: string | Date;
  updated_at?: string | Date;
};

const MOCK_PROJECTS: ApiProjectRow[] = [
  {
    id: 'f0a6a34b-72f6-4e4d-a5c0-9d71f0e79001',
    name: 'Annual PCI DSS Audit Q1 2026',
    key: 'PCI-2026-Q1',
    status: 'IN_PROGRESS',
    created_by_user_id: 'local-dev-user',
    owner_name: 'Local Dev User',
    created_at: '2026-01-12T10:00:00.000Z',
    updated_at: '2026-03-20T09:15:00.000Z',
  },
  {
    id: '8cb3e6fd-63fc-4aab-a115-e2ab5f13a002',
    name: 'External VA Scan Program',
    key: 'EVA-2026',
    status: 'SCHEDULED',
    created_by_user_id: 'local-dev-user',
    owner_name: 'Local Dev User',
    created_at: '2026-02-02T08:00:00.000Z',
    updated_at: '2026-03-18T14:30:00.000Z',
  },
  {
    id: '11fcae8f-c8d8-4f50-8fbe-7f49c4b2a003',
    name: 'SOC 2 Type II Readiness',
    key: 'SOC2-READINESS',
    status: 'COMPLETED',
    created_by_user_id: 'local-dev-user',
    owner_name: 'Local Dev User',
    created_at: '2025-11-10T11:00:00.000Z',
    updated_at: '2026-03-10T16:00:00.000Z',
  },
];

function toUpdatedLabel(d: string | Date) {
  const now = Date.now();
  const dt = typeof d === 'string' ? new Date(d) : d;
  const ms = dt instanceof Date ? dt.getTime() : Number.NaN;
  if (Number.isNaN(ms)) return 'Updated recently';
  const diffMins = Math.max(0, Math.round((now - ms) / 60000));
  if (diffMins < 60) return `Updated ${diffMins} min ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `Updated ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  const diffDays = Math.round(diffHours / 24);
  return `Updated ${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}

function mapApiProjectToTableItem(p: ApiProjectRow): ProjectTableItem {
  const upperKey = String(p.key || '').toUpperCase();
  const upperName = String(p.name || '').toUpperCase();
  const isPCI = upperKey.includes('PCI') || upperName.includes('PCI');
  const typeLabel = isPCI ? 'PCI ASV Scans' : 'External VA Scans';
  const typeColor = isPCI ? '#155EEF' : '#16A34A';
  const typeBg = isPCI ? '#EEF4FF' : '#ECFDF3';

  const rawStatus = String(p.status || '').toUpperCase();
  let status: ProjectTableItem['status'] = 'in-progress';
  if (rawStatus === 'COMPLETED') status = 'completed';
  else if (rawStatus === 'SCHEDULED') status = 'scheduled';

  const uuidLastSegment = String(p.id || '').split('-').pop() || String(p.id || '');
  const displayProjectId = `PR-${uuidLastSegment.toUpperCase()}`;

  return {
    id: p.id,
    projectId: displayProjectId,
    projectKey: p.key,
    projectName: p.name,
    updatedAtLabel: toUpdatedLabel(p.updated_at ?? p.created_at ?? new Date()),
    type: { label: typeLabel, color: typeColor, background: typeBg },
    owner: { name: p.owner_name?.trim() || p.created_by_user_id || 'Unknown' },
    progress: {
      percentage: 0,
      completed: 0,
      total: 0,
      ...(isPCI
        ? { windowsCompleted: 0, windowsTotal: 4 }
        : { scansTotal: 12, scanTenure: 'Monthly' }),
    },
    status,
  };
}

const renderDeltaPill = (
  direction: 'up' | 'down',
  label: string,
  color: string,
) => {
  const isUp = direction === 'up';
  const arrowSymbol = isUp ? '↗' : '↘';
  const background = isUp ? '#ECFDF3' : '#FEF3F2';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 8px',
        borderRadius: 999,
        background,
        color,
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      <span>{arrowSymbol}</span>
      <span>{label}</span>
    </span>
  );
};

export function ProjectsView() {
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');
  const [searchValue, setSearchValue] = useState('');

  const [projectsFromApi, setProjectsFromApi] = useState<ProjectTableItem[]>(
    () => MOCK_PROJECTS.map((p) => mapApiProjectToTableItem(p)),
  );
  const projectsLoading = false;
  
  // State for Create Project Side Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedComplianceGroups, setSelectedComplianceGroups] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [scopingConfig, setScopingConfig] = useState<Record<string, FrameworkScopingConfig>>({});
  const [projectSetup, setProjectSetup] = useState<Record<string, ProjectSetupData>>({});
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [scanConfigValid, setScanConfigValid] = useState(false);
  const [scanConfigSummary, setScanConfigSummary] = useState<ScanConfigurationSummary | null>(null);
  const [inviteRecipients, setInviteRecipients] = useState<InviteRecipient[]>([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const projectsForTable = projectsFromApi ?? [];

  const { totalProjects, activeProjects, completedProjects } = useMemo(() => {
    const total = projectsForTable.length;
    const completed = projectsForTable.filter((p) => p.status === 'completed').length;
    const active = total - completed;
    return { totalProjects: total, activeProjects: active, completedProjects: completed };
  }, [projectsForTable]);
  const criticalVulnerabilities = 16;

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
  };
  
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentStep(1);
    setSelectedComplianceGroups([]);
    setSelectedFrameworks([]);
    setScopingConfig({});
    setProjectSetup({});
    setScanConfigSummary(null);
    setInviteRecipients([]);
    setIsCreatingProject(false);
  };
  
  const handleToggleCompliance = (groupId: string) => {
    setSelectedComplianceGroups((prev) =>
      prev.length === 1 && prev[0] === groupId ? prev : [groupId],
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

  const isPCIProjectFlow =
    selectedComplianceGroups.length === 1 &&
    (selectedComplianceGroups[0] === 'pci-asv-scan' ||
      selectedComplianceGroups[0] === 'external-va-scan');

  const handleContinue = async () => {
    if (isPCIProjectFlow) {
      if (currentStep === 1) {
        addToast({
          title: 'Scan Type Selected',
          message: 'Step 1 completed successfully.',
          variant: 'info',
        });
        setCurrentStep(2);
      } else if (currentStep === 2) {
        addToast({
          title: 'Scan Configuration Saved',
          message: 'Step 2 completed successfully.',
          variant: 'success',
        });
        setCurrentStep(3);
      } else if (currentStep === 3) {
        // EXISTING "Create Project" button in SideDrawer triggers here
        console.log('[Create Project] selectedGroups:', selectedComplianceGroups);
        console.log('[Create Project] scanSummary:', scanConfigSummary);

        try {
          setIsCreatingProject(true);
          const result = await createProjectFromSidebar(selectedComplianceGroups, scanConfigSummary);
          console.log('[Create Project] createProjectFromSidebar result:', result);

          const createdProject = result as {
            id: string;
            name: string;
            key: string;
            status?: string;
            created_by_user_id?: string;
            owner_name?: string | null;
            created_at?: string | Date;
            updated_at?: string | Date;
          };
          if (createdProject?.id && createdProject?.key) {
            setProjectsFromApi((prev) => {
              const next = prev ? [...prev] : [];
              const existsIndex = next.findIndex((p) => p.id === createdProject.id);
              const mapped = mapApiProjectToTableItem(createdProject);
              if (existsIndex >= 0) next[existsIndex] = mapped;
              else next.unshift(mapped);
              return next;
            });
          }

          if (inviteRecipients.length && createdProject?.id) {
            console.log('[Create Project] inviteRecipients:', inviteRecipients);
            await inviteAndAddProjectMembers(createdProject.id, inviteRecipients);
            console.log('[Create Project] invites sent and members linked');
          }

          handleCloseDrawer();
          addToast({
            title: 'Project Created',
            message: 'Project created successfully.',
            variant: 'success',
          });
        } catch (err: unknown) {
          console.error('[Create Project] failed:', err);
          const e = err as Error & { data?: { message?: string } };
          addToast({
            title: 'Create Project Failed',
            message: e?.data?.message || e?.message || 'Failed to create project.',
            variant: 'error',
          });
        } finally {
          setIsCreatingProject(false);
        }
      }
      return;
    }

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
    // Data available:
    // - complianceGroups: selectedComplianceGroups
    // - frameworks: selectedFrameworks
    // - scoping: scopingConfig
    // - setup: projectSetup
    
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
    if (isCreatingProject) return true;
    if (isPCIProjectFlow) {
      if (currentStep === 1) {
        return selectedComplianceGroups.length === 0;
      }
      if (currentStep === 2) {
        return !scanConfigValid;
      }
      if (currentStep === 3) {
        return !scanConfigValid || !scanConfigSummary;
      }
      return false;
    }

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

  return (
    <Page>
      <PageHeader
        title="Projects"
        description="Manage and track all your active compliance initiatives and security audits."
        actions={
          <Button
          style={{ cursor: 'pointer' }}
            label="New project"
            icon={<Plus/>}
            iconPosition="left"
            variant="primary"
            onClick={handleCreateProject}
          />
        }
      />

      <PageSection>
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <PageGrid columns={4} gap={16}>
            <FilterCard
              value={projectsLoading ? '—' : totalProjects}
              label="Total projects"
              icon={<Folder />}
              variant="gray"
              footer={renderDeltaPill('up', '+2 vs last month', colors.green[500])}
            />
          <FilterCard
            value={projectsLoading ? '—' : activeProjects}
            label="Active projects"
            icon={
              <svg
              width="24"
              height="24"
                fill="#518af3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M22.78,10.37A1,1,0,0,0,22,10H20V9a3,3,0,0,0-3-3H10.72l-.32-1A3,3,0,0,0,7.56,3H4A3,3,0,0,0,1,6V18a3,3,0,0,0,3,3H18.4a3,3,0,0,0,2.92-2.35L23,11.22A1,1,0,0,0,22.78,10.37ZM5.37,18.22a1,1,0,0,1-1,.78H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5H7.56a1,1,0,0,1,1,.68l.54,1.64A1,1,0,0,0,10,8h7a1,1,0,0,1,1,1v1H8a1,1,0,0,0-1,.78Zm14,0a1,1,0,0,1-1,.78H7.21a1.42,1.42,0,0,0,.11-.35L8.8,12h12Z" />
              </svg>
            }
            variant="blue"
            footer={renderDeltaPill('up', '+3 this week', colors.green[500])}
          />
            <FilterCard
              value={projectsLoading ? '—' : completedProjects}
              label="Completed projects"
              icon={<CheckCircle size={20} />}
              variant="green"
              footer={renderDeltaPill('up', '+1 this quarter', colors.green[500])}
            />
            <FilterCard
              value={criticalVulnerabilities}
              label="Critical vulnerabilities"
              icon={<TrustShield />}
              variant="red"
              footer={renderDeltaPill('up', '+4 vs last month', colors.red[500])}
            />
          </PageGrid>

          <ProjectsTable
            projects={projectsForTable}
            isLoading={projectsLoading}
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onProjectClick={(project) =>
              navigate(`/projects/${encodeURIComponent(project.projectKey || project.id)}/overview`, {
                state: { project },
              })
            }
          />
        </div>
      </PageSection>

      {/* Create Project Side Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Create new project"
        icon={<Folder />}
        primaryButtonLabel={
          isPCIProjectFlow
            ? currentStep === 3
              ? (isCreatingProject ? 'Creating…' : 'Create Project')
              : 'Continue'
            : currentStep === 5
              ? 'Create Projects'
              : 'Continue'
        }
        secondaryButtonLabel={currentStep === 1 ? 'Cancel' : 'Back'}
        onPrimaryClick={handleContinue}
        onSecondaryClick={currentStep === 1 ? handleCloseDrawer : handleBack}
        primaryButtonDisabled={isContinueDisabled()}
      >
        {isPCIProjectFlow ? (
          <>
            {currentStep === 1 && (
              <SelectComplianceView
                selectedGroups={selectedComplianceGroups}
                onToggleGroup={handleToggleCompliance}
              />
            )}

            {currentStep === 2 && (
              <ScanConfigurationView
                selectedGroups={selectedComplianceGroups}
                onValidityChange={setScanConfigValid}
                initialSummary={scanConfigSummary || undefined}
                onSummaryChange={setScanConfigSummary}
              />
            )}

            {currentStep === 3 && (
              <TeamSetupView
                selectedGroups={selectedComplianceGroups}
                scanSummary={scanConfigSummary}
                onInvitesChange={setInviteRecipients}
              />
            )}
          </>
        ) : (
          <>
            {currentStep === 1 && (
              <SelectComplianceView
                selectedGroups={selectedComplianceGroups}
                onToggleGroup={handleToggleCompliance}
              />
            )}

            {currentStep === 2 && (
              <SelectFrameworksView
                selectedComplianceGroups={selectedComplianceGroups}
                selectedFrameworks={selectedFrameworks}
                onToggleFramework={handleToggleFramework}
              />
            )}

            {currentStep === 3 && (
              <ConfigureScopingView
                selectedComplianceGroups={selectedComplianceGroups}
                selectedFrameworks={selectedFrameworks}
                scopingConfig={scopingConfig}
                onScopingConfigChange={handleScopingConfigChange}
              />
            )}

            {currentStep === 4 && (
              <ProjectSetupView
                selectedComplianceGroups={selectedComplianceGroups}
                selectedFrameworks={selectedFrameworks}
                projectSetup={projectSetup}
                onProjectSetupChange={handleProjectSetupChange}
              />
            )}

            {currentStep === 5 && (
              <ReviewProjectsView
                selectedComplianceGroups={selectedComplianceGroups}
                selectedFrameworks={selectedFrameworks}
                scopingConfig={scopingConfig}
                projectSetup={projectSetup}
                onEdit={handleEditFromReview}
              />
            )}
          </>
        )}
      </SideDrawer>
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </Page>
  );
}
