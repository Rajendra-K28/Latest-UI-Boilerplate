import type { ComplianceCardProps } from './ComplianceCard.types';
import { complianceCardStyles } from './ComplianceCard.styles';

export function ComplianceCard({
  icon,
  iconBackgroundColor,
  title,
  description,
  tags,
  badgeLabel,
  badgeBackgroundColor = '#EFF4FF',
  badgeTextColor = '#266DF0',
  usedSlots,
  maxSlots,
  showCheckBadge = false,
  onClick,
}: ComplianceCardProps) {
  const hasSlots =
    typeof usedSlots === 'number' &&
    typeof maxSlots === 'number' &&
    maxSlots > 0;

  const slotsPercentage = hasSlots ? (usedSlots! / maxSlots!) * 100 : 0;

  return (
    <div style={complianceCardStyles.container(showCheckBadge)} onClick={onClick}>
      <div style={complianceCardStyles.header}>
        <div style={complianceCardStyles.iconWrapper(iconBackgroundColor)}>
          {icon}
        </div>

        {badgeLabel && (
          <div style={complianceCardStyles.badgePill(badgeBackgroundColor, badgeTextColor)}>
            {badgeLabel}
          </div>
        )}
      </div>

      <div style={complianceCardStyles.content}>
        <div style={complianceCardStyles.title(showCheckBadge)}>{title}</div>
        <div style={complianceCardStyles.description}>{description}</div>
      </div>

      <div style={complianceCardStyles.tags}>
        {tags.map((tag, index) => (
          <div key={index} style={complianceCardStyles.tag}>
            {tag}
          </div>
        ))}
      </div>

      {hasSlots && (
        <div style={complianceCardStyles.projectSlotsSection}>
          <div style={complianceCardStyles.projectSlotsHeader}>
            <span style={complianceCardStyles.projectSlotsLabel}>Project slots</span>
            <span style={complianceCardStyles.projectSlotsValue}>
              {usedSlots} / {maxSlots} used
            </span>
          </div>
          <div style={complianceCardStyles.projectSlotsTrack}>
            <div
              style={complianceCardStyles.projectSlotsFill(
                slotsPercentage,
                showCheckBadge,
              )}
            />
          </div>
        </div>
      )}

      {showCheckBadge && (
        <div style={complianceCardStyles.selectedRow}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="8" fill="#266DF0" />
            <path
              d="M5 8.2L7 10L11 6"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Selected</span>
        </div>
      )}
    </div>
  );
}
