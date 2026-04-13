// UI-level nav item (used by Sidebar component)
export type SidebarNavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: string | number;
  children?: SidebarNavItem[];
  isExpanded?: boolean;
};

export type SidebarProps = {
  /** Organization name */
  organizationName: string;
  
  /** Organization logo/icon */
  organizationIcon?: React.ReactNode;
  
  /** Main navigation items */
  mainNavItems: SidebarNavItem[];
  
  /** Current project name */
  currentProjectName?: string;
  
  /** Project navigation items */
  projectNavItems?: SidebarNavItem[];
  
  /** Currently active main nav item ID */
  activeItemId?: string;
  /** Currently active project sub-nav item ID (when inside a project) */
  activeProjectItemId?: string;
  
  /** Navigation item click handler */
  onNavItemClick?: (item: SidebarNavItem) => void;
  
  /** Organization selector click handler */
  onOrganizationClick?: () => void;
};
