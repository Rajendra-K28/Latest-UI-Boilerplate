import { progressBarStyles } from './ActiveProjectsTable.styles';

type ProgressBarProps = {
  percentage: number;
  completed: number;
  total: number;
  /** Optional: when true, hides the "x of y tasks" label */
  hideTasksLabel?: boolean;
};

export function ProgressBar({ percentage, completed, total, hideTasksLabel }: ProgressBarProps) {
  return (
    <div style={progressBarStyles.container}>
      <div style={progressBarStyles.barRow}>
        <div style={progressBarStyles.barWrapper}>
          <div style={progressBarStyles.bar(percentage)} />
        </div>
        <span style={progressBarStyles.percentage}>{percentage}%</span>
      </div>
      {!hideTasksLabel && (
        <span style={progressBarStyles.tasks}>
          {completed} of {total} tasks
        </span>
      )}
    </div>
  );
}
