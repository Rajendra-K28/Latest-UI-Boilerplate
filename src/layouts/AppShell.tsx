import { Sidebar, OrganizationSidebar } from '../components';
import { Topbar } from '../components/topbar/Topbar';
import type { BreadcrumbItem } from '../components/topbar/Topbar.types';
import type { SidebarNavItem } from '../components/sidebar/Sidebar.types';
import { CLIENT_NAVIGATION, PROJECT_NAVIGATION } from '../config/navigation';
import { mapNavItemsForSidebar } from '../utils/navigationMapper';
import type { Role } from '../config/roles';
import { Outlet } from 'react-router-dom';

type AppShellProps = {
  /** User's role for permission filtering */
  userRole: Role;
  
  /** Organization name */
  organizationName: string;
  
  /** Current project name (if inside a project) */
  currentProjectName?: string;
  
  /** Breadcrumb items for topbar */
  breadcrumbs: BreadcrumbItem[];
  
  /** User name */
  userName: string;
  
  /** User avatar URL */
  avatarUrl?: string;
  
  /** Notification count */
  notificationCount?: number;
  
  /** Active main nav item ID (from current route) */
  activeItemId?: string;
  /** Active project sub-nav item ID (when inside a project) */
  activeProjectItemId?: string;
  
  /** Sidebar nav item click handler (e.g. navigate to path) */
  onNavItemClick?: (item: SidebarNavItem) => void;
  
  /** Breadcrumb click handler (e.g. navigate to path) */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
  
  /** Settings gear icon click handler */
  onSettingsClick?: () => void;
  
  /** Organization settings mode flag */
  isOrgSettingsMode?: boolean;
  
  /** Active organization view */
  orgActiveView?: 'organization-details' | 'team-members' | 'billing-plans';
  
  /** Organization navigation handler */
  onOrgNavigate?: (view: 'organization-details' | 'team-members' | 'billing-plans') => void;
  
  /** Back to dashboard handler */
  onBackToDashboard?: () => void;
  
  /** Organization view to render when in org settings mode */
  orgViewContent?: React.ReactNode;
};

export function AppShell({
  userRole,
  organizationName,
  currentProjectName,
  breadcrumbs,
  userName,
  avatarUrl,
  notificationCount,
  activeItemId = 'command-center',
  activeProjectItemId,
  onNavItemClick,
  onBreadcrumbClick,
  onSettingsClick,
  isOrgSettingsMode = false,
  orgActiveView = 'organization-details',
  onOrgNavigate,
  onBackToDashboard,
  orgViewContent,
}: AppShellProps) {
  // Filter nav items by permissions
  const mainNavItems = mapNavItemsForSidebar(CLIENT_NAVIGATION, userRole);
  const projectNavItems = currentProjectName 
    ? mapNavItemsForSidebar(PROJECT_NAVIGATION, userRole)
    : [];

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'visible',
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
    }}>
      {/* Persistent Sidebar - Conditional based on mode */}
      {isOrgSettingsMode ? (
        <OrganizationSidebar
          activeView={orgActiveView}
          onNavigate={onOrgNavigate ?? (() => {})}
          onBackToDashboard={onBackToDashboard ?? (() => {})}
          organizationName={organizationName}
        />
      ) : (
        <Sidebar
          organizationName={organizationName}
          mainNavItems={mainNavItems}
          currentProjectName={currentProjectName}
          projectNavItems={projectNavItems}
          activeItemId={activeItemId}
          activeProjectItemId={activeProjectItemId}
          onNavItemClick={onNavItemClick ?? (() => {})}
          onOrganizationClick={() => {}}
        />
      )}

      {/* Main Content Area */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        overflow: 'visible',
      }}>
        {/* Persistent Topbar */}
        <Topbar
          breadcrumbs={breadcrumbs}
          userName={userName}
          avatarUrl={avatarUrl}
          notificationCount={notificationCount}
          onSettingsClick={onSettingsClick ?? (() => {})}
          onNotificationsClick={() => {}}
          onAvatarClick={() => {}}
          onBreadcrumbClick={onBreadcrumbClick}
        />

        {/* Content Outlet - Views render here */}
        <main style={{
          flex: 1,
          overflow: 'auto',
          background: '#F8FAFC',
          minHeight: 0,
        }}>
          {isOrgSettingsMode && orgViewContent ? orgViewContent : <Outlet />}
        </main>
      </div>
    </div>
  );
}
