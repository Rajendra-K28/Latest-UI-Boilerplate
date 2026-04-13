import type { Permission } from './permissions';

export type RouteConfig = {
  path: string;
  permission: Permission;
  element: React.ComponentType;
};

// Routes will be populated as we create Views
export const ROUTES: RouteConfig[] = [
  // Will be populated with actual routes
  // Example:
  // {
  //   path: '/command-center',
  //   permission: PERMISSIONS.CLIENT_VIEW_PROJECTS,
  //   element: CommandCenterView,
  // },
];
