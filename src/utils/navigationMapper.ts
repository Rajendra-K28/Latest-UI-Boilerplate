import type { NavItem } from '../config/navigation';
import type { SidebarNavItem } from '../components/sidebar/Sidebar.types';
import type { Role } from '../config/roles';
import { can } from '../config/permissions';
import { NavigationIcons } from '../config/navigationIcons';

/**
 * Converts config NavItems to Sidebar NavItems
 * Filters by permission, resolves icon IDs to React components
 */
export function mapNavItemsForSidebar(
  items: NavItem[],
  userRole: Role | null
): SidebarNavItem[] {
  return items
    .filter(item => can(userRole, item.permission))
    .map(item => ({
      id: item.id,
      label: item.label,
      icon: NavigationIcons[item.iconId], // Resolve icon ID to component
      path: item.path,
      children: item.children 
        ? mapNavItemsForSidebar(item.children, userRole)
        : undefined,
    }));
}
