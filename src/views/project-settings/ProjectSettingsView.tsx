import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { Page, PageHeader, PageSection } from '../../ui/page/Page';
import { ToastStack, type ToastItem } from '../../components';
import { apiService } from '../../api/api.service';
import type { ScanConfigurationSummary } from '../../sidebarViews/createProjectSidebarViews';
import { DangerZoneSection } from './DangerZoneSection';
import { GeneralSettingsSection } from './GeneralSettingsSection';
import { ProjectSettingsTabs } from './ProjectSettingsTabs';
import { TeamMembersSection } from './TeamMembersSection';
import { projectSettingsStyles } from './projectSettingsStyles';
import type { ProjectSettingsTabId } from './types';

const TEAM_SELECTED_GROUPS = ['pci-asv-scan'];

export function ProjectSettingsView() {
  const { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const projectId = projectIdParam?.trim() ?? '';

  const [activeTab, setActiveTab] = useState<ProjectSettingsTabId>('project-details');
  const [projectName, setProjectName] = useState('Q1 2026 PCI ASV Compliance Scan');
  const [projectKey, setProjectKey] = useState('PCI-Q1-2026');
  const [description, setDescription] = useState(
    'Quarterly PCI ASV compliance scanning project to maintain payment card security standards and ensure network vulnerability assessment across all external-facing systems.'
  );
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    (async () => {
      try {
        const p = await apiService.get<{ name?: string; key?: string }>(
          `/api/projects/${encodeURIComponent(projectId)}`,
        );
        if (cancelled || !p) return;
        if (typeof p.name === 'string' && p.name.trim()) setProjectName(p.name.trim());
        if (typeof p.key === 'string' && p.key.trim()) setProjectKey(p.key.trim());
      } catch {
        /* keep placeholders if API fails */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const teamScanSummary: ScanConfigurationSummary = {
    projectName,
    projectKey,
    certificationDate: 'Mar 15, 2025',
  };

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <Page>
      <PageHeader
        title="Project settings"
        description="Configure project metadata, scoping details, and team access permissions."
      />
      <PageSection>
        <div style={projectSettingsStyles.container}>
          <ProjectSettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'project-details' && (
            <>
              <GeneralSettingsSection
                projectName={projectName}
                onProjectNameChange={setProjectName}
                projectKey={projectKey}
                description={description}
                onDescriptionChange={setDescription}
                onSave={() =>
                  addToast({
                    title: 'Project settings updated',
                    message: 'Project Settings save Successfullly.',
                    variant: 'success',
                  })
                }
              />
              <DangerZoneSection
                onDeleteClick={() =>
                  addToast({
                    title: 'Project deletion requires confirmation',
                    message: 'Please contact your admin to delete this project',
                    variant: 'warning',
                  })
                }
              />
            </>
          )}

          {activeTab === 'team-members' &&
            (projectId ? (
              <TeamMembersSection
                projectId={projectId}
                selectedGroups={TEAM_SELECTED_GROUPS}
                scanSummary={teamScanSummary}
                onNotify={addToast}
              />
            ) : (
              <div style={{ ...projectSettingsStyles.section, color: '#667085', fontSize: 14 }}>
                Open project settings from a project to manage team members.
              </div>
            ))}
        </div>
      </PageSection>
      {typeof document !== 'undefined' &&
        createPortal(<ToastStack toasts={toasts} onDismiss={dismissToast} />, document.body)}
    </Page>
  );
}
