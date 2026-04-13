import { navItemStyles } from './Sidebar.styles';
import type { SidebarNavItem } from './Sidebar.types';
import { useState, useEffect } from 'react';
import { ChevronDown } from '../icons';

type NavItemComponentProps = {
  item: SidebarNavItem;
  isActive: boolean;
  level?: number;
  onClick: (item: SidebarNavItem) => void;
  activeItemId?: string;
};

export function NavItemComponent({ item, isActive, level = 0, onClick, activeItemId }: NavItemComponentProps) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isChildActive = hasChildren && item.children?.some((c) => c.id === activeItemId);
  const [isExpanded, setIsExpanded] = useState<boolean>(item.isExpanded ?? isChildActive ?? false);

  useEffect(() => {
    if (isChildActive) setIsExpanded(true);
  }, [isChildActive]);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation for parent items that only toggle expansion
    if (hasChildren && !item.path) {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
      return;
    }
    
    // For items with paths (including children), navigate
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onClick(item);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) {
      e.currentTarget.style.background = '#0E1B35';
    }
  };

  const labelStyle = {
    ...navItemStyles.label(isActive),
    ...(item.id === 'vulnerability-management' ? { fontSize: '13px' } : {}),
  };

  return (
    <>
      <div
        style={navItemStyles.container(isActive, hasChildren, level)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={navItemStyles.icon(isActive)}>
          {item.icon}
        </div>
        <span style={labelStyle}>
          {item.label}
        </span>
        {item.badge && (
          <div style={navItemStyles.badge}>
            {item.badge}
          </div>
        )}
        {hasChildren && (
          <div style={navItemStyles.chevron(isExpanded)}>
            <ChevronDown />
          </div>
        )}
      </div>
      {hasChildren && isExpanded && item.children?.map((child) => (
        <NavItemComponent
          key={child.id}
          item={child}
          isActive={activeItemId === child.id}
          level={level + 1}
          onClick={onClick}
          activeItemId={activeItemId}
        />
      ))}
    </>
  );
}
