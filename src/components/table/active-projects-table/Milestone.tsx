import { milestoneStyles } from './ActiveProjectsTable.styles';

type MilestoneProps = {
  title: string;
  dueDate: string;
  status: 'overdue' | 'today' | 'tomorrow' | 'upcoming';
};

export function Milestone({ title, dueDate, status }: MilestoneProps) {
  return (
    <div style={milestoneStyles.container}>
      <div style={milestoneStyles.title}>{title}</div>
      <div style={milestoneStyles.date(status)}>
        <span style={milestoneStyles.dot(status)} />
        <span>{dueDate}</span>
      </div>
    </div>
  );
}
