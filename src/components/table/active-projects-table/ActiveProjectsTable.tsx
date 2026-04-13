import { useState } from 'react';
import type { ActiveProjectsTableProps } from './ActiveProjectsTable.types';
import { activeProjectsTableStyles } from './ActiveProjectsTable.styles';
import { ProgressBar } from './ProgressBar';
import { ComplianceBadge } from './ComplianceBadge';
import { Milestone } from './Milestone';
import { Button } from '../../button/button';
import { PaginationWithPageSize } from '../../pagination';
import { ArrowUpRight, FilePlus } from '../../icons';

export function ActiveProjectsTable({
  title,
  totalCount,
  description,
  showViewAll = true,
  onViewAll,
  projects,
  emptyState,
  showPagination = true,
}: ActiveProjectsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const isEmpty = projects.length === 0;
  const hasViewAll = showViewAll && !isEmpty;
  const projectCount = totalCount !== undefined ? totalCount : projects.length;
  
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = showPagination 
    ? projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : projects;

  return (
    <div style={activeProjectsTableStyles.container}>
      {/* Header - only show if title is provided */}
      {title && (
        <div style={activeProjectsTableStyles.header}>
          <div style={activeProjectsTableStyles.headerLeft}>
            <div style={activeProjectsTableStyles.headerTitleRow}>
              <h2 style={activeProjectsTableStyles.title}>{title}</h2>
              {!isEmpty && (
                <span style={activeProjectsTableStyles.countBadge}>
                  {projectCount} {projectCount === 1 ? 'project' : 'projects'}
                </span>
              )}
            </div>
            {description && (
              <p style={activeProjectsTableStyles.description}>{description}</p>
            )}
          </div>

          {showViewAll && (
            <Button
              label="View All"
              hierarchy="secondary-white"
              size="md"
              iconConfig="right"
              icon={<ArrowUpRight />}
              disabled={isEmpty}
              onClick={hasViewAll ? onViewAll : undefined}
            />
          )}
        </div>
      )}

      {/* Table or Empty State */}
      {isEmpty ? (
        <div style={activeProjectsTableStyles.emptyState}>
          {emptyState?.illustration}
          {emptyState?.message && (
            <p style={activeProjectsTableStyles.emptyMessage}>{emptyState.message}</p>
          )}
          {emptyState?.buttonText && emptyState?.onButtonClick && (
            <Button
              label={emptyState.buttonText}
              hierarchy="primary"
              size="md"
              iconConfig="left"
              icon={<FilePlus />}
              onClick={emptyState.onButtonClick}
            />
          )}
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          {/* Table Header */}
          <div style={activeProjectsTableStyles.tableHeader}>
            <div style={activeProjectsTableStyles.tableHeaderCell}>Project ID</div>
            <div style={activeProjectsTableStyles.tableHeaderCell}>Project name</div>
            <div style={activeProjectsTableStyles.tableHeaderCell}>Compliance</div>
            <div style={activeProjectsTableStyles.tableHeaderCell}>Progress</div>
            <div style={activeProjectsTableStyles.tableHeaderCell}>Next Milestone</div>
          </div>

          {/* Table Rows */}
          {paginatedProjects.map((project) => (
            <div key={project.id} style={activeProjectsTableStyles.tableRow}>
              <div style={activeProjectsTableStyles.projectId}>{project.projectId}</div>
              <div style={activeProjectsTableStyles.projectName} title={project.projectName}>
                {project.projectName}
              </div>
              <div style={activeProjectsTableStyles.tableCell}>
                <ComplianceBadge
                  icon={project.compliance.icon}
                  label={project.compliance.label}
                />
              </div>
              <div style={activeProjectsTableStyles.tableCell}>
                <ProgressBar
                  percentage={project.progress.percentage}
                  completed={project.progress.completed}
                  total={project.progress.total}
                  hideTasksLabel={false}
                />
              </div>
              <div style={activeProjectsTableStyles.tableCell}>
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
      
      {/* Pagination */}
      {showPagination && !isEmpty && (
        <PaginationWithPageSize
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={projects.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}
