import type { DefenseRoadmapTableProps } from './DefenseRoadmapTable.types';
import { defenseRoadmapTableStyles } from './DefenseRoadmapTable.styles';
import { StatusBadge } from './StatusBadge';
import { ActionMenu } from './ActionMenu';
import { SearchInput } from '../../input/SearchInput';
import { SelectInput } from '../../input/SelectInput';
import { PaginationWithPageSize } from '../../pagination';

export function DefenseRoadmapTable({
  activities,
  currentFilter = 'all',
  onFilterChange,
  searchValue = '',
  onSearchChange,
  selectedProject = 'All projects',
  onProjectChange,
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange,
  onItemsPerPageChange,
}: DefenseRoadmapTableProps) {
  const filters = [
    { id: 'all', label: 'View all' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'in-progress', label: 'In-progress' },
    { id: 'scheduled', label: 'Scheduled' },
  ] as const;

  // Filter activities based on search
  const filteredActivities = activities.filter(activity => {
    const searchLower = searchValue.toLowerCase();
    return (
      activity.activity.toLowerCase().includes(searchLower) ||
      activity.projectName.toLowerCase().includes(searchLower) ||
      activity.date.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={defenseRoadmapTableStyles.container}>
      {/* Filter Bar */}
      <div style={defenseRoadmapTableStyles.filterBar}>
        <div style={defenseRoadmapTableStyles.filterTabs}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              style={defenseRoadmapTableStyles.filterTab(currentFilter === filter.id)}
              onClick={() => onFilterChange?.(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div style={defenseRoadmapTableStyles.filterActions}>
          <div style={defenseRoadmapTableStyles.searchWrapper}>
            <SearchInput
              value={searchValue}
              onChange={(value) => {
                onSearchChange?.(value);
                onPageChange?.(1); // Reset to first page on search
              }}
              placeholder="Search"
              width="sm"
            />
          </div>
          <div style={defenseRoadmapTableStyles.dropdownWrapper}>
            <SelectInput
              value={selectedProject}
              onChange={onProjectChange}
              options={[
                { value: 'All projects', label: 'All projects' },
                { value: 'Project 1', label: 'Project 1' },
                { value: 'Project 2', label: 'Project 2' }
              ]}
              width="sm"
            />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div style={defenseRoadmapTableStyles.tableHeader}>
        <div style={defenseRoadmapTableStyles.tableHeaderCell}>Date</div>
        <div style={defenseRoadmapTableStyles.tableHeaderCell}>Activity</div>
        <div style={defenseRoadmapTableStyles.tableHeaderCell}>Project name</div>
        <div style={defenseRoadmapTableStyles.tableHeaderCell}>Status</div>
        <div style={defenseRoadmapTableStyles.tableHeaderCell}></div>
      </div>

      {/* Table Rows */}
      {paginatedActivities.map((activity) => (
        <div key={activity.id} style={defenseRoadmapTableStyles.tableRow}>
          <div style={defenseRoadmapTableStyles.date}>{activity.date}</div>
          <div style={defenseRoadmapTableStyles.tableCell}>{activity.activity}</div>
          <div style={defenseRoadmapTableStyles.projectName} title={activity.projectName}>
            {activity.projectName}
          </div>
          <div style={defenseRoadmapTableStyles.tableCell}>
            <StatusBadge status={activity.status} />
          </div>
          <ActionMenu
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      ))}

      {/* Pagination */}
      <PaginationWithPageSize
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredActivities.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => onPageChange?.(page)}
        onItemsPerPageChange={(items) => onItemsPerPageChange?.(items)}
      />
    </div>
  );
}
