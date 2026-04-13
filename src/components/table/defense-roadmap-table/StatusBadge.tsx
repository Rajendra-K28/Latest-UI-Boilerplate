import { statusBadgeStyles } from './DefenseRoadmapTable.styles';

type StatusBadgeProps = {
  status: 'overdue' | 'in-progress' | 'scheduled' | 'completed';
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusLabels = {
    'overdue': 'Overdue',
    'in-progress': 'In-progress',
    'scheduled': 'Scheduled',
    'completed': 'Completed',
  };

  return (
    <div style={statusBadgeStyles.badge(status)}>
      <span style={statusBadgeStyles.dot(status)} />
      <span>{statusLabels[status]}</span>
    </div>
  );
}
