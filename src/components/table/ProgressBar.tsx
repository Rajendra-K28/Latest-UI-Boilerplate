import { progressBarStyles } from './ProjectsTable.styles';

type ProgressBarProps = {
  percentage: number;
  completed: number;
  total: number;
};

export function ProgressBar({ percentage, completed, total }: ProgressBarProps) {
  return (
    <div style={progressBarStyles.container}>
      <div style={progressBarStyles.barSection}>
        <div style={progressBarStyles.barWrapper}>
          <div style={progressBarStyles.bar(percentage)} />
        </div>
        <span style={progressBarStyles.tasks}>{completed} of {total} tasks</span>
      </div>
      <span style={progressBarStyles.percentage}>{percentage}%</span>
    </div>
  );
}
