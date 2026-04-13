import type { SidebarProps } from './Sidebar.types';
import { sidebarStyles, organizationStyles } from './Sidebar.styles';
import { NavItemComponent } from './NavItem';
import { ChevronUp, ChevronDown, Shield } from '../icons';

export function Sidebar({
  organizationName,
  organizationIcon,
  mainNavItems,
  currentProjectName,
  projectNavItems,
  activeItemId,
  activeProjectItemId,
  onNavItemClick,
  onOrganizationClick,
}: SidebarProps) {
  const handleNavItemClick = onNavItemClick ?? (() => {});
  
  return (
    <div style={sidebarStyles.container}>
      {/* Logo */}
      <div style={sidebarStyles.logo}>
        <svg width="190" height="40" viewBox="0 0 190 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          <text x="10" y="25" fill="#FFFFFF" fontSize="16" fontWeight="600" fontFamily="Inter">
            Logo Comes Here
            
          </text>
          {/* <path d="M125 10L135 20L125 30" stroke="#518AF3" strokeWidth="2" fill="none"/> */}
        </svg>
      </div>

      {/* Organization Selector */}
      <div style={organizationStyles.wrapper}>
        <span style={organizationStyles.label}>Organisation</span>
        <div 
          style={organizationStyles.container}
          onClick={onOrganizationClick}
        >
          <div style={organizationStyles.iconWrapper}>
            {organizationIcon || <Shield />}
          </div>
          <div style={organizationStyles.content}>
            <span style={organizationStyles.name}>{organizationName}</span>
            <div style={organizationStyles.arrows}>
              <div
                style={organizationStyles.arrow}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ChevronUp />
              </div>
              <div
                style={organizationStyles.arrow}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ChevronDown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div style={sidebarStyles.section}>
        {mainNavItems.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            isActive={activeItemId === item.id}
            onClick={handleNavItemClick}
            activeItemId={activeItemId}
          />
        ))}
      </div>

      {/* Divider */}
      {currentProjectName && projectNavItems && (
        <>
          <div style={sidebarStyles.divider} />

          {/* Current Project Section */}
          <div style={sidebarStyles.section}>
            <span style={sidebarStyles.sectionLabel}>Current Project</span>
            <span style={sidebarStyles.projectName}>
              {currentProjectName}
            </span>
            {projectNavItems.map((item) => (
              <NavItemComponent
                key={item.id}
                item={item}
                isActive={(activeProjectItemId ?? activeItemId) === item.id}
                onClick={handleNavItemClick}
                activeItemId={activeProjectItemId ?? activeItemId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
