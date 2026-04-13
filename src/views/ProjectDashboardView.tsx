import { useLocation } from 'react-router-dom';
import { Page, PageSection } from '../ui/page/Page';
import type { ScanConfigurationSummary } from '../sidebarViews/createProjectSidebarViews';
import { CurrentQuarterSection } from './project-dashboard/CurrentQuarterSection';
import { KeyMetricsSection } from './project-dashboard/KeyMetricsSection';
import { ProjectDashboardHeaderSection } from './project-dashboard/ProjectDashboardHeaderSection';
import { ProjectDetailsCardSection } from './project-dashboard/ProjectDetailsCardSection';
import { ScanHistorySection } from './project-dashboard/ScanHistorySection';
import { ScanQuarterTimelineSection } from './project-dashboard/ScanQuarterTimelineSection';


export function ProjectDashboardView() {
  const location = useLocation();
  const projectFromState = (location.state as any)?.project as
    | { projectName?: string; projectId?: string; id?: string; projectKey?: string }
    | undefined;

  const projectName = projectFromState?.projectName || 'Annual PCI DSS Audit Q1 2025';
  const projectId =
    projectFromState?.projectId ||
    projectFromState?.projectKey ||
    projectFromState?.id ||
    'Unknown Project';
  const teamMembers = ['A', 'B', 'C', 'D'];

  const teamSelectedGroups = ['pci-asv-scan'];
  const teamScanSummary: ScanConfigurationSummary = {
    projectName,
    projectKey: 'PCI-Q1-2025',
    certificationDate: 'Mar 15, 2025',
  };


  return (
    <Page>
      <PageSection>
        <ProjectDashboardHeaderSection
          projectName={projectName}
          projectId={projectId}
          teamMembers={teamMembers}
          selectedGroups={teamSelectedGroups}
          scanSummary={teamScanSummary}
        />
        <ProjectDetailsCardSection />
        <KeyMetricsSection />
        <ScanQuarterTimelineSection />
        <CurrentQuarterSection />
        <ScanHistorySection />
       </PageSection>
    </Page>
  );
}
