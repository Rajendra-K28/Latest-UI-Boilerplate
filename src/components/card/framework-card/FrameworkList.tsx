import type { FrameworkListProps } from './FrameworkCard.types';
import { frameworkListStyles } from './FrameworkCard.styles';
import { FrameworkCard } from './FrameworkCard';

export function FrameworkList({
  title,
  items,
  selectedIds = [],
  onSelectionChange,
  showDeselectAll = true,
}: FrameworkListProps) {
  const selectedCount = selectedIds.length;
  const totalCount = items.length;

  const handleItemToggle = (itemId: string, isSelected: boolean) => {
    if (!onSelectionChange) return;

    if (isSelected) {
      onSelectionChange([...selectedIds, itemId]);
    } else {
      onSelectionChange(selectedIds.filter(id => id !== itemId));
    }
  };

  const handleDeselectAll = () => {
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  return (
    <div style={frameworkListStyles.container}>
      {/* Header */}
      <div style={frameworkListStyles.header}>
        <div style={frameworkListStyles.headerLeft}>
          <span style={frameworkListStyles.headerTitle}>{title}</span>
          {totalCount > 0 && (
            <span style={frameworkListStyles.headerCount}>
              ({selectedCount} of {totalCount} selected)
            </span>
          )}
        </div>
        
        {showDeselectAll && selectedCount > 0 && (
          <span
            style={frameworkListStyles.deselectLink}
            onClick={handleDeselectAll}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Deselect All
          </span>
        )}
      </div>

      {/* List Items */}
      <div style={frameworkListStyles.list}>
        {items.map((item, index) => (
          <div key={item.id}>
            {index > 0 && <div style={frameworkListStyles.divider} />}
            <FrameworkCard
              title={item.title}
              code={item.code}
              description={item.description}
              isSelected={selectedIds.includes(item.id)}
              onSelectionChange={(selected) => handleItemToggle(item.id, selected)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
