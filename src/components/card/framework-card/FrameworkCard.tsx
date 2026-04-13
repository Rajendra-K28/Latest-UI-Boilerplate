import type { FrameworkCardProps } from './FrameworkCard.types';
import { frameworkCardStyles } from './FrameworkCard.styles';
import { Checkbox } from '../../checkbox/Checkbox';

export function FrameworkCard({
  title,
  code,
  description,
  isSelected = false,
  onSelectionChange,
  onClick,
}: FrameworkCardProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange?.(checked);
  };

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't trigger row click if clicking directly on checkbox
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT') {
      return;
    }
    onSelectionChange?.(!isSelected);
    onClick?.();
  };

  return (
    <div style={frameworkCardStyles.row(isSelected)} onClick={handleRowClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>
      
      <div style={frameworkCardStyles.textContainer}>
        <div style={frameworkCardStyles.titleRow}>
          <span style={frameworkCardStyles.title}>{title}</span>
          <span style={frameworkCardStyles.code}>{code}</span>
        </div>
        <div style={frameworkCardStyles.description}>{description}</div>
      </div>
    </div>
  );
}
