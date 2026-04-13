import type { ProjectsTableProps } from './ProjectsTable.types';
import { projectsTableStyles } from './ProjectsTable.styles';
import { ProgressBar } from './ProgressBar';
import { ComplianceBadge } from './ComplianceBadge';
import { Milestone } from './Milestone';
import { Button } from '../button/button';

export function ProjectsTable({
  title,
  totalCount,
  description,
  showViewAll = true,
  onViewAll,
  projects,
  emptyState,
}: ProjectsTableProps) {
  const isEmpty = projects.length === 0;
  const hasViewAll = showViewAll && !isEmpty;

  return (
    <div style={projectsTableStyles.container}>
      {/* Header */}
      <div style={projectsTableStyles.header}>
        <div style={projectsTableStyles.headerLeft}>
          <div style={projectsTableStyles.headerTitleRow}>
            <h2 style={projectsTableStyles.title}>{title}</h2>
            {totalCount !== undefined && (
              <span style={projectsTableStyles.countBadge}>
                {totalCount} {totalCount === 1 ? 'project' : 'projects'}
              </span>
            )}
          </div>
          {description && (
            <p style={projectsTableStyles.description}>{description}</p>
          )}
        </div>

        {showViewAll && (
          <Button
            label="View All"
            hierarchy="secondary-white"
            size="md"
            iconConfig="right"
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5.83301 14.1667L14.1663 5.83337M14.1663 5.83337H5.83301M14.1663 5.83337V14.1667"
                  stroke="currentColor"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            disabled={isEmpty}
            onClick={hasViewAll ? onViewAll : undefined}
          />
        )}
      </div>

      {/* Table or Empty State */}
      {isEmpty ? (
        <div style={projectsTableStyles.emptyState}>
          {emptyState?.illustration}
          {emptyState?.message && (
            <p style={projectsTableStyles.emptyMessage}>{emptyState.message}</p>
          )}
          {emptyState?.buttonText && emptyState?.onButtonClick && (
            <Button
              label={emptyState.buttonText}
              hierarchy="primary"
              size="md"
              iconConfig="left"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.6667 1.66675H5.00004C4.55801 1.66675 4.13409 1.84234 3.82153 2.1549C3.50897 2.46746 3.33337 2.89139 3.33337 3.33341V16.6667C3.33337 17.1088 3.50897 17.5327 3.82153 17.8453C4.13409 18.1578 4.55801 18.3334 5.00004 18.3334H15C15.4421 18.3334 15.866 18.1578 16.1786 17.8453C16.4911 17.5327 16.6667 17.1088 16.6667 16.6667V6.66675L11.6667 1.66675Z"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6667 1.66675V6.66675H16.6667"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 9.16675V13.3334"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.91663 11.25H12.0833"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              onClick={emptyState.onButtonClick}
            />
          )}
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          {/* Table Header */}
          <div style={projectsTableStyles.tableHeader}>
            <div style={projectsTableStyles.tableHeaderCell}>Project ID</div>
            <div style={projectsTableStyles.tableHeaderCell}>Project name</div>
            <div style={projectsTableStyles.tableHeaderCell}>Compliance</div>
            <div style={projectsTableStyles.tableHeaderCell}>Progress</div>
            <div style={projectsTableStyles.tableHeaderCell}>Next Milestone</div>
          </div>

          {/* Table Rows */}
          {projects.map((project) => (
            <div key={project.id} style={projectsTableStyles.tableRow}>
              <div style={projectsTableStyles.projectId}>{project.projectId}</div>
              <div style={projectsTableStyles.projectName} title={project.projectName}>
                {project.projectName}
              </div>
              <div style={projectsTableStyles.tableCell}>
                <ComplianceBadge
                  icon={project.compliance.icon}
                  label={project.compliance.label}
                />
              </div>
              <div style={projectsTableStyles.tableCell}>
                <ProgressBar
                  percentage={project.progress.percentage}
                  completed={project.progress.completed}
                  total={project.progress.total}
                  hideTasksLabel={false}
                />
              </div>
              <div style={projectsTableStyles.tableCell}>
                <Milestone
                  title={project.nextMilestone.title}
                  dueDate={project.nextMilestone.dueDate}
                  status={project.nextMilestone.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
