import { useEffect } from 'react';
import type { ProjectSummaryCardProps } from './ProjectSummaryCard.types';
import { projectSummaryCardStyles } from './ProjectSummaryCard.styles';

export function ProjectSummaryCard({
  title,
  titleIcon,
  items,
  onClick,
  isActive = false,
  scrollRef,
}: ProjectSummaryCardProps) {
  // Auto-scroll into view when active
  useEffect(() => {
    if (isActive && scrollRef?.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isActive, scrollRef]);

  return (
    <div ref={scrollRef} style={projectSummaryCardStyles.container(isActive)} onClick={onClick}>
      {/* Header */}
      <div style={projectSummaryCardStyles.header}>
        {titleIcon && (
          <div style={projectSummaryCardStyles.headerIcon}>
            {titleIcon}
          </div>
        )}
        <span style={projectSummaryCardStyles.headerText}>{title}</span>
      </div>

      {/* Items List */}
      <div style={projectSummaryCardStyles.itemsList}>
        {items.map((item) => (
          <div key={item.id} style={projectSummaryCardStyles.item}>
            {item.icon && (
              <div style={projectSummaryCardStyles.itemIcon}>
                {item.icon}
              </div>
            )}
            <span style={projectSummaryCardStyles.itemText}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
