import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, useParams, Outlet } from 'react-router-dom'
import { AppShell } from './layouts'
import { NavigationIcons } from './config/navigationIcons'
import { CommandCenterView, DefenceRoadmapView, ProjectsView, VulnerabilitiesView, ScanComponentsView, ScansView, AsvScansView, ProjectDashboardView, ProjectTimelineView, ProjectEvidenceView, ProjectActionPointsView, ProjectReportsView, ProjectSettingsView, OrganizationDetailsView, OrganizationTeamView, OrganizationBillingView, VulnerabilityManagementView } from './views'
import type { BreadcrumbItem } from './components/topbar/Topbar.types'
import type { SidebarNavItem } from './components/sidebar/Sidebar.types'
import { ROLES } from './config/roles'
import type { Role } from './config/roles'
import { useState, useEffect } from 'react'
import { useResolvedProjectName } from './hooks/useResolvedProjectName'
import { RequireAuth } from './auth/requireAuth'
import { SignIn } from './pages/SignIn'

// Style Guide imports (kept for reference/development)
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { StyleGuideHome } from './style-guide/StyleGuideHome'
import { ButtonStyleGuide } from './style-guide/ButtonStyleGuide'
import { FormStyleGuide } from './style-guide/FormStyleGuide'
import { CardStyleGuide } from './style-guide/CardStyleGuide'
import { ComplianceCardStyleGuide } from './style-guide/ComplianceCardStyleGuide'
import { FrameworkCardStyleGuide } from './style-guide/FrameworkCardStyleGuide'
import { ProjectSummaryCardStyleGuide } from './style-guide/ProjectSummaryCardStyleGuide'
import { ActiveProjectsTableStyleGuide } from './style-guide/ActiveProjectsTableStyleGuide'
import { DefenseRoadmapTableStyleGuide } from './style-guide/DefenseRoadmapTableStyleGuide'
import { ProjectsTableStyleGuide } from './style-guide/ProjectsTableStyleGuide'
import { TablesStyleGuide } from './style-guide/TablesStyleGuide'
import { SidebarStyleGuide } from './style-guide/SidebarStyleGuide'
import { TopbarStyleGuide } from './style-guide/TopbarStyleGuide'

function App() {
  // TODO: Get from auth context
  const userRole: Role = ROLES.CLIENT_ADMIN;
  const userName = 'Anita R Reddy';
  const organizationName = 'Acme Works Inc';

  const AppShellWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [isOrgSettingsMode, setIsOrgSettingsMode] = useState(false);
    const [orgActiveView, setOrgActiveView] = useState<'organization-details' | 'team-members' | 'billing-plans'>('organization-details');
    const [previousRoute, setPreviousRoute] = useState<string>('/security-dashboard');
    const projectMatch = pathname.match(/^\/projects\/([^/]+)(?:\/(.*))?/);
    const projectId = projectMatch?.[1];
    const projectSubPath = projectMatch?.[2] ?? 'overview';
    const resolvedProjectName = useResolvedProjectName(projectId);

    const activeItemId =
      pathname === '/security-dashboard' || pathname === '/command-center'
        ? 'security-dashboard'
        : pathname === '/exposure-monitor'
          ? 'exposureMonitor'
          : pathname === '/scan-components'
            ? 'scan-components'
            : pathname === '/scans'
              ? 'scans'
              : pathname.startsWith('/projects')
                ? 'projects'
                : 'security-dashboard';
    const pathToProjectNavId: Record<string, string> = {
      '': 'overview',
      overview: 'overview',
      'asv-scans': 'asv-scans',
      assets: 'assets',
      'vulnerability-management': 'vulnerability-management',
      timeline: 'timeline',
      compliance: 'compliance',
      'compliance/evidence': 'evidence',
      'compliance/action-points': 'action-points',
      reports: 'reports',
      settings: 'project-settings',
    };
    const activeProjectItemId = projectId ? pathToProjectNavId[projectSubPath] ?? undefined : undefined;

    const homeIcon = (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 7L10 2L18 7V17C18 17.5304 17.7893 18.0391 17.4142 18.4142C17.0391 18.7893 16.5304 19 16 19H4C3.46957 19 2.96086 18.7893 2.58579 18.4142C2.21071 18.0391 2 17.5304 2 17V7Z"
          stroke="#667085"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const breadcrumbs: BreadcrumbItem[] = isOrgSettingsMode
      ? (() => {
          const base: BreadcrumbItem[] = [
            { label: 'Organization settings', path: '/organization/details', icon: NavigationIcons.settings },
          ];
          if (orgActiveView === 'team-members') {
            return [...base, { label: 'Team Members', path: '/organization/details' }];
          }
          if (orgActiveView === 'billing-plans') {
            return [...base, { label: 'Billing & Plans', path: '/organization/details' }];
          }
          return [...base, { label: 'Company Details', path: '/organization/details' }];
        })()
      : pathname === '/exposure-monitor'
        ? [
            {
              label: 'Exposure Monitor',
              path: '/exposure-monitor',
              icon: NavigationIcons.exposureMonitor,
            },
          ]
          : pathname === '/scan-components'
          ? [
              {
                label: 'Scan Components',
                path: '/scan-components',
                icon: NavigationIcons.scanComponents,
              },
            ]
          : pathname === '/scans'
            ? [
                {
                  label: 'Scans',
                  path: '/scans',
                  icon: NavigationIcons.scans,
                },
              ]
            : projectId
          ? (() => {
              const base: BreadcrumbItem[] = [
                { label: 'Projects', path: '/projects', icon: NavigationIcons.projects },
                { label: resolvedProjectName, path: `/projects/${projectId}/overview`, icon: NavigationIcons.overview },
              ];
              if (projectSubPath === 'asv-scans') {
                return [
                  ...base,
                  {
                    label: 'ASV Scans',
                    path: `/projects/${projectId}/asv-scans`,
                    icon: NavigationIcons.scans,
                  },
                ];
              }
              if (projectSubPath === 'vulnerability-management') {
                return [
                  ...base,
                  {
                    label: 'Vulnerability Management',
                    path: `/projects/${projectId}/vulnerability-management`,
                    icon: NavigationIcons.vulnerabilityMgmt,
                  },
                ];
              }
              if (projectSubPath === 'compliance/evidence') {
                return [
                  ...base,
                  {
                    label: 'Evidence',
                    path: `/projects/${projectId}/compliance/evidence`,
                    icon: NavigationIcons.evidence,
                  },
                ];
              }
              if (projectSubPath === 'compliance/action-points') {
                return [
                  ...base,
                  {
                    label: 'Action Points',
                    path: `/projects/${projectId}/compliance/action-points`,
                    icon: NavigationIcons.actionPoints,
                  },
                ];
              }
              return base;
            })()
          : pathname.startsWith('/projects')
            ? [
                {
                  label: 'Projects',
                  path: '/projects',
                  icon: NavigationIcons.projects,
                },
              ]
            : [
                {
                  label: 'Security Dashboard',
                  path: '/security-dashboard',
                  icon: NavigationIcons.securityDashboard,
                },
              ];

    const handleNavItemClick = (item: SidebarNavItem) => {
      if (!item.path) return;
      if (item.path.startsWith('/')) {
        navigate(item.path);
      } else if (projectId) {
        navigate(`/projects/${projectId}/${item.path}`);
      } else {
        navigate(item.path);
      }
    };

    const handleBreadcrumbClick = (item: BreadcrumbItem) => {
      if (item.path) navigate(item.path);
    };

    const handleOpenOrgSettings = () => {
      setPreviousRoute(pathname);
      setIsOrgSettingsMode(true);
      setOrgActiveView('organization-details');
    };

    const handleBackToDashboard = () => {
      setIsOrgSettingsMode(false);
      navigate(previousRoute);
    };

    const handleOrgNavigate = (view: 'organization-details' | 'team-members' | 'billing-plans') => {
      setOrgActiveView(view);
    };

    // Render organization view based on active view
    const renderOrgView = () => {
      switch (orgActiveView) {
        case 'team-members':
          return <OrganizationTeamView />;
        case 'billing-plans':
          return <OrganizationBillingView />;
        case 'organization-details':
        default:
          return <OrganizationDetailsView />;
      }
    };

    return (
      <AppShell
        userRole={userRole}
        organizationName={organizationName}
        currentProjectName={projectId ? resolvedProjectName : undefined}
        breadcrumbs={breadcrumbs}
        userName={userName}
        notificationCount={3}
        activeItemId={activeItemId}
        activeProjectItemId={activeProjectItemId}
        onNavItemClick={handleNavItemClick}
        onBreadcrumbClick={handleBreadcrumbClick}
        onSettingsClick={handleOpenOrgSettings}
        isOrgSettingsMode={isOrgSettingsMode}
        orgActiveView={orgActiveView}
        onOrgNavigate={handleOrgNavigate}
        onBackToDashboard={handleBackToDashboard}
        orgViewContent={renderOrgView()}
      />
    );
  };

  /** Renders project sub-routes (Overview, Timeline, Evidence, Action Points, etc.) */
  function ProjectSubRoutes() {
    return <Outlet />;
  }

  /** Redirects /projects/:projectId to /projects/:projectId/overview (Admin Project Dashboard) */
  function RedirectToProjectOverview() {
    const { projectId } = useParams<{ projectId: string }>();
    return <Navigate to={projectId ? `/projects/${projectId}/overview` : '/projects'} replace />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/signin" element={<SignIn />} />

        {/* Protected Routes - Require Authentication */}
        <Route element={<RequireAuth />}>
          {/* Main Application Routes with AppShell */}
          <Route element={<AppShellWrapper />}>
            <Route index element={<Navigate to="/security-dashboard" replace />} />
            {/* Keep legacy route for now, but point to Security Dashboard */}
            <Route path="command-center" element={<CommandCenterView />} />
            <Route path="security-dashboard" element={<CommandCenterView />} />
            <Route path="defense-roadmap" element={<DefenceRoadmapView />} />
            <Route path="exposure-monitor" element={<VulnerabilitiesView />} />
            <Route path="scan-components" element={<ScanComponentsView />} />
            <Route path="scans" element={<ScansView />} />
            <Route path="projects" element={<ProjectsView />} />
            <Route path="profile" element={<Profile />} />
            <Route path="organization/details" element={<OrganizationDetailsView />} />
            <Route path="projects/:projectId" element={<ProjectSubRoutes />}>
              <Route index element={<RedirectToProjectOverview />} />
              <Route path="overview" element={<ProjectDashboardView />} />
              <Route path="asv-scans" element={<AsvScansView />} />
              <Route path="assets" element={<ScanComponentsView />} />
              <Route path="vulnerability-management" element={<VulnerabilityManagementView />} />
              <Route path="timeline" element={<ProjectTimelineView />} />
              <Route path="compliance/evidence" element={<ProjectEvidenceView />} />
              <Route path="compliance/action-points" element={<ProjectActionPointsView />} />
              <Route path="reports" element={<ProjectReportsView />} />
              <Route path="settings" element={<ProjectSettingsView />} />
            </Route>

            {/* Style Guide Routes (also protected) */}
            <Route path="/dev" element={<Home />} />
            <Route path="/Style-Guide" element={<StyleGuideHome />} />
            <Route path="/Style-Guide/button" element={<ButtonStyleGuide />} />
            <Route path="/Style-Guide/forms" element={<FormStyleGuide />} />
            <Route path="/Style-Guide/tables" element={<TablesStyleGuide />} />
            <Route path="/Style-Guide/cards" element={<CardStyleGuide />} />
            <Route path="/Style-Guide/compliance-cards" element={<ComplianceCardStyleGuide />} />
            <Route path="/Style-Guide/framework-cards" element={<FrameworkCardStyleGuide />} />
            <Route path="/Style-Guide/project-summary-cards" element={<ProjectSummaryCardStyleGuide />} />
            <Route path="/Style-Guide/active-projects-table" element={<ActiveProjectsTableStyleGuide />} />
            <Route path="/Style-Guide/defense-roadmap-table" element={<DefenseRoadmapTableStyleGuide />} />
            <Route path="/Style-Guide/projects-table" element={<ProjectsTableStyleGuide />} />
            <Route path="/Style-Guide/sidebar" element={<SidebarStyleGuide />} />
            <Route path="/Style-Guide/topbar" element={<TopbarStyleGuide />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
