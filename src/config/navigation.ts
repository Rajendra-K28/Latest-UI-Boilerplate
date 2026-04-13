import type { Permission } from './permissions';
import { PERMISSIONS } from './permissions';
import type { NavigationIconId } from './navigationIcons';

// Config-level NavItem - pure data, no JSX
export type NavItem = {
  id: string;
  label: string;
  iconId: NavigationIconId;  // Just a string ID, not a component!
  path?: string;
  permission: Permission;
  children?: NavItem[];
};

// Client navigation configuration
export const CLIENT_NAVIGATION: NavItem[] = [
  {
    id: 'security-dashboard',
    label: 'Security Dashboard',
    path: '/security-dashboard',
    permission: PERMISSIONS.CLIENT_VIEW_PROJECTS,
    iconId: 'securityDashboard',
  },
  {
    id: 'exposureMonitor',
    label: 'Exposure Monitor',
    path: '/exposure-monitor',
    permission: PERMISSIONS.VIEW_VULNERABILITIES,
    iconId: 'exposureMonitor',
  },
  {
    id: 'scan-components',
    label: 'Scan Components',
    path: '/scan-components',
    permission: PERMISSIONS.VIEW_VULNERABILITIES,
    iconId: 'scanComponents',
  },
  {
    id: 'scans',
    label: 'Scans',
    path: '/scans',
    permission: PERMISSIONS.VIEW_VULNERABILITIES,
    iconId: 'scans',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    permission: PERMISSIONS.CLIENT_VIEW_PROJECTS,
    iconId: 'projects',
  },
];

// Tribal navigation configuration
export const TRIBAL_NAVIGATION: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    permission: PERMISSIONS.TRIBAL_VIEW_ALL_PROJECTS,
    iconId: 'dashboard',
  },
  {
    id: 'all-projects',
    label: 'All Projects',
    path: '/all-projects',
    permission: PERMISSIONS.TRIBAL_VIEW_ALL_PROJECTS,
    iconId: 'projects',
  },
  {
    id: 'consultants',
    label: 'Consultants',
    path: '/consultants',
    permission: PERMISSIONS.TRIBAL_MANAGE_CONSULTANTS,
    iconId: 'consultants',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    permission: PERMISSIONS.TRIBAL_VIEW_ANALYTICS,
    iconId: 'analytics',
  },
];

// Project-specific navigation (shown when inside a project)
export const PROJECT_NAVIGATION: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    path: 'overview',
    permission: PERMISSIONS.CLIENT_VIEW_PROJECTS,
    iconId: 'overview',
  },
  {
    id: 'asv-scans',
    label: 'ASV Scans',
    path: 'asv-scans',
    permission: PERMISSIONS.CLIENT_VIEW_PROJECTS,
    iconId: 'scans',
  },
  {
    id: 'assets',
    label: 'Assets',
    path: 'assets',
    permission: PERMISSIONS.CLIENT_VIEW_PROJECTS,
    iconId: 'scanComponents',
  },
  {
    id: 'vulnerability-management',
    label: 'Vulnerability Management',
    path: 'vulnerability-management',
    permission: PERMISSIONS.CLIENT_VIEW_PROJECTS,
    iconId: 'vulnerabilityMgmt',
  },
  {
    id: 'reports',
    label: 'Reports',
    path: 'reports',
    permission: PERMISSIONS.CLIENT_VIEW_REPORTS,
    iconId: 'reports',
  },
  {
    id: 'project-settings',
    label: 'Project Settings',
    path: 'settings',
    permission: PERMISSIONS.CLIENT_MANAGE_PROJECTS,
    iconId: 'settings',
  },
];
