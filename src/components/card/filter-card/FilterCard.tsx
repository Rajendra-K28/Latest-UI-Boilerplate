import { useState } from 'react';
import type { FilterCardProps } from './FilterCard.types';
import {
  filterCardStyles,
  getVariantColor,
  getVariantBackgroundColor,
} from './FilterCard.styles';

export function FilterCard({
  value,
  label,
  icon,
  variant = 'blue',
  iconColor,
  iconBackgroundColor,
  showAccentBar = true,
  footer,
  valueStyle,
  onClick,
}: FilterCardProps) {
  const accentColor = getVariantColor(variant);
  const iconBgColor = iconBackgroundColor ?? getVariantBackgroundColor(variant);
  const finalIconColor = iconColor || accentColor;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...filterCardStyles.container,
        boxShadow: isHovered
          ? '0 18px 45px rgba(15, 23, 42, 0.18)'
          : '0 1px 2px rgba(15, 23, 42, 0.06)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={filterCardStyles.header}>
        <div style={filterCardStyles.content}>
          <div style={{ ...filterCardStyles.value, ...valueStyle }}>{value}</div>
          <div style={filterCardStyles.label}>{label}</div>
          {footer && <div style={filterCardStyles.footer}>{footer}</div>}
        </div>

        <div
          style={{
            ...filterCardStyles.iconWrapper,
            backgroundColor: iconBgColor,
            color: finalIconColor,
          }}
        >
          {icon}
        </div>
      </div>

      {showAccentBar && (
        <div
          style={{
            ...filterCardStyles.bottomBorder,
            backgroundColor: accentColor,
          }}
        />
      )}
    </div>
  );
}
