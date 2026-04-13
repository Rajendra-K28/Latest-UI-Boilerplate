import { useEffect, useMemo, useState, memo } from 'react';
import type { ProjectTableItem, ProjectsTableProps } from './ProjectsTable.types';
import { projectsTableStyles } from './ProjectsTable.styles';
import { OwnerCell } from './OwnerCell';
import { SearchInput } from '../../input/SearchInput';
import { Pagination } from '../../pagination';
// Reuse subcomponents from other tables
import { ProgressBar } from '../active-projects-table/ProgressBar';
import { StatusBadge } from '../defense-roadmap-table/StatusBadge';
import { ActionMenu } from '../defense-roadmap-table/ActionMenu';
import { apiService } from '../../../api/api.service';

const SKELETON_ROWS = 5;

const skeletonBar = (width: string) =>
  ({
    height: 12,
    width,
    maxWidth: '100%',
    borderRadius: 4,
    background: '#E4E7EC',
  }) as const;

const ProjectsTableSkeletonRow = memo(function ProjectsTableSkeletonRow() {
  return (
    <div
      style={{
        ...projectsTableStyles.tableRow,
        pointerEvents: 'none' as const,
      }}
      aria-hidden
    >
      <div style={skeletonBar('72px')} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div style={skeletonBar('85%')} />
        <div style={skeletonBar('45%')} />
      </div>
      <div style={skeletonBar('120px')} />
      <div style={skeletonBar('140px')} />
      <div style={skeletonBar('160px')} />
      <div style={skeletonBar('72px')} />
      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E4E7EC' }} />
    </div>
  );
});

export function ProjectsTable({
  projects,
  isLoading: isLoadingProp = false,
  currentFilter = 'all',
  onFilterChange,
  searchValue = '',
  onSearchChange,
  onProjectClick,
}: Readonly<ProjectsTableProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [remoteProjects, setRemoteProjects] = useState<ProjectTableItem[]>([]);
  const [isRemoteLoading, setIsRemoteLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const effectiveProjects = projects ?? remoteProjects;
  const isLoading = isLoadingProp || isRemoteLoading;

  useEffect(() => {
    /** Parent supplies `projects` (including `[]`) — skip duplicate fetch */
    if (projects !== undefined) return;

    let cancelled = false;
    (async () => {
      setIsRemoteLoading(true);
      setLoadError(null);
      try {
        const res = await apiService.get<
          Array<{
            id: string;
            project_type_id: string;
            name: string;
            key: string;
            status: string;
            created_by_user_id: string;
            created_at: string | Date;
            updated_at: string | Date;
          }>
        >('/api/projects');
        const now = Date.now();
        const toUpdatedLabel = (d: string | Date) => {
          const dt = typeof d === 'string' ? new Date(d) : d;
          const ms = dt instanceof Date ? dt.getTime() : Number.NaN;
          if (Number.isNaN(ms)) return 'Updated recently';
          const diffMins = Math.max(0, Math.round((now - ms) / 60000));
          if (diffMins < 60) return `Updated ${diffMins} min ago`;
          const diffHours = Math.round(diffMins / 60);
          if (diffHours < 24) return `Updated ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
          const diffDays = Math.round(diffHours / 24);
          return `Updated ${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
        };

        const mapped: ProjectTableItem[] = (res || []).map((p) => {
          const upperKey = String(p.key || '').toUpperCase();
          const upperName = String(p.name || '').toUpperCase();
          const isPCI = upperKey.includes('PCI') || upperName.includes('PCI');
          const typeLabel = isPCI ? 'PCI ASV Scans' : 'External VA Scans';
          const typeColor = isPCI ? '#155EEF' : '#16A34A';
          const typeBg = isPCI ? '#EEF4FF' : '#ECFDF3';
          const rawStatus = String(p.status || '').toUpperCase();
          let status: ProjectTableItem['status'] = 'in-progress';
          if (rawStatus === 'COMPLETED') status = 'completed';
          else if (rawStatus === 'SCHEDULED') status = 'scheduled';

          const uuidLast =
            String(p.id || '').split('-').pop() || String(p.id || '');
          return {
            id: p.id,
            projectKey: p.key,
            projectId: `PR-${uuidLast.toUpperCase()}`,
            projectName: p.name,
            updatedAtLabel: toUpdatedLabel(p.updated_at ?? p.created_at),
            type: { label: typeLabel, color: typeColor, background: typeBg },
            owner: { name: p.created_by_user_id },
            progress: {
              percentage: 0,
              completed: 0,
              total: 0,
              ...(isPCI
                ? { windowsCompleted: 0, windowsTotal: 4 }
                : { scansTotal: 12, scanTenure: 'Monthly' }),
            },
            status,
          };
        });

        if (cancelled) return;
        setRemoteProjects(mapped);
      } catch (e: any) {
        if (cancelled) return;
        const message = e?.data?.message || e?.message || 'Failed to load projects';
        setLoadError(message);
      } finally {
        if (!cancelled) setIsRemoteLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projects]);

  // Filter projects based on search and compliance
  const filteredProjects = useMemo(() => {
    const search = searchValue.toLowerCase();
    return effectiveProjects.filter((project) => {
      const matchesSearch =
        search === '' ||
        project.projectId.toLowerCase().includes(search) ||
        project.projectName.toLowerCase().includes(search) ||
        project.owner.name.toLowerCase().includes(search);

      let matchesFilter = true;
      if (currentFilter === 'completed') matchesFilter = project.status === 'completed';
      else if (currentFilter === 'active') matchesFilter = project.status !== 'completed';

      return matchesSearch && matchesFilter;
    });
  }, [effectiveProjects, searchValue, currentFilter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filters = [
    { id: 'all', label: 'All projects' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ] as const;

  return (
    <div style={projectsTableStyles.container}>
      {/* Filter Bar */}
      <div style={projectsTableStyles.filterBar}>
        <div style={projectsTableStyles.filterTabs}>
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              style={projectsTableStyles.filterTab(
                currentFilter === filter.id,
                index === filters.length - 1,
              )}
              onClick={() => {
                onFilterChange?.(filter.id);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div style={projectsTableStyles.filterActions}>
          <div style={projectsTableStyles.searchWrapper}>
            <SearchInput
              value={searchValue}
              onChange={(value) => {
                onSearchChange?.(value);
                setCurrentPage(1); // Reset to first page on search
              }}
              placeholder="Search"
              width="sm"
            />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div style={projectsTableStyles.tableHeader}>
        <div style={projectsTableStyles.tableHeaderCell}>Project ID</div>
        <div style={projectsTableStyles.tableHeaderCell}>Project Name</div>
        <div style={projectsTableStyles.tableHeaderCell}>Type</div>
        <div style={projectsTableStyles.tableHeaderCell}>Owner</div>
        <div style={projectsTableStyles.tableHeaderCell}>Progress</div>
        <div style={projectsTableStyles.tableHeaderCell}>Status</div>
        <div style={projectsTableStyles.tableHeaderCell}></div>
      </div>

      {/* Table Rows */}
      {!isLoading && loadError ? (
        <div style={{ padding: 16, color: '#B42318', fontSize: 14 }}>{loadError}</div>
      ) : null}

      {isLoading
        ? Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <ProjectsTableSkeletonRow key={`skeleton-${i}`} />
          ))
        : null}

      {!isLoading &&
        paginatedProjects.map((project) => (
        <div key={project.id} style={projectsTableStyles.tableRow}>
          <div style={projectsTableStyles.projectId}>
            {onProjectClick ? (
              <button
                type="button"
                onClick={() => onProjectClick(project)}
                style={{
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  background: 'transparent',
                  color: '#266DF0',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                {project.projectId}
              </button>
            ) : (
              project.projectId
            )}
          </div>
          <div style={projectsTableStyles.projectName} title={project.projectName}>
            {onProjectClick ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 4,
                  minWidth: 0,
                }}
              >
                <button
                  type="button"
                  onClick={() => onProjectClick(project)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    cursor: 'pointer',
                    color: '#111827',
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: 'left',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {project.projectName}
                </button>
                <span
                  style={{
                    fontSize: 12,
                    color: '#667085',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {project.updatedAtLabel}
                </span>
              </div>
            ) : (
              <>
                <span>{project.projectName}</span>
                <span>{project.updatedAtLabel}</span>
              </>
            )}
          </div>
          <div style={projectsTableStyles.tableCell}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 10px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 500,
                backgroundColor: project.type.background,
                color: project.type.color,
                whiteSpace: 'nowrap',
              }}
            >
              {project.type.label}
            </span>
          </div>
          <div style={projectsTableStyles.tableCell}>
            <OwnerCell
              name={project.owner.name}
              avatar={project.owner.avatar}
            />
          </div>
          <div style={projectsTableStyles.tableCell}>
            {project.type.label === 'PCI ASV Scans' &&
            typeof project.progress.windowsCompleted === 'number' &&
            (project.progress.windowsTotal ?? 4) > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {Array.from({
                    length: project.progress.windowsTotal ?? 4,
                  }).map((_, index) => {
                    const isFilled =
                      index < (project.progress.windowsCompleted ?? 0);
                    return (
                      <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        style={{
                          width: 18,
                          height: 4,
                          borderRadius: 999,
                          backgroundColor: isFilled ? '#16A34A' : '#E5E7EB',
                        }}
                      />
                    );
                  })}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: '#667085',
                  }}
                >
                  {project.progress.windowsCompleted} of{' '}
                  {project.progress.windowsTotal ?? 4} windows
                  {project.progress.windowsCompleted ===
                    (project.progress.windowsTotal ?? 4) && ' · Passed'}
                </span>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 4,
                }}
              >
                <ProgressBar
                  percentage={project.progress.percentage}
                  completed={project.progress.completed}
                  total={project.progress.total}
                  hideTasksLabel
                />
                {project.type.label === 'External VA Scans' &&
                typeof project.progress.scansTotal === 'number' ? (
                  <span
                    style={{
                      fontSize: 12,
                      color: '#667085',
                    }}
                  >
                    {project.progress.completed} of {project.progress.scansTotal}{' '}
                    scans
                    {project.progress.scanTenure
                      ? `. ${project.progress.scanTenure}`
                      : ''}
                  </span>
                ) : null}
              </div>
            )}
          </div>
          <div style={projectsTableStyles.tableCell}>
            <StatusBadge
              status={
                project.type.label === 'PCI ASV Scans' &&
                project.progress.windowsCompleted ===
                  (project.progress.windowsTotal ?? 4)
                  ? 'completed'
                  : project.status
              }
            />
          </div>
          <ActionMenu
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
        ))}

      {!isLoading && !loadError && paginatedProjects.length === 0 ? (
        <div style={{ padding: 24, color: '#667085', fontSize: 14, textAlign: 'center' as const }}>
          No projects match your filters.
        </div>
      ) : null}

      {/* Pagination */}
      {!isLoading && filteredProjects.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, totalPages)}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
}
