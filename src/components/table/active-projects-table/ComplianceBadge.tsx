import { complianceBadgeStyles } from './ActiveProjectsTable.styles';

type ComplianceBadgeProps = {
  icon?: React.ReactNode;
  label: string;
};

export function ComplianceBadge({ icon, label }: ComplianceBadgeProps) {
  return (
    <div style={complianceBadgeStyles.badge}>
      {icon && <div style={complianceBadgeStyles.icon}>{icon}</div>}
      <span style={complianceBadgeStyles.label}>{label}</span>
    </div>
  );
}
