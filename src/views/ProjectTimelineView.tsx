import { useState } from 'react';
import { Page, PageHeader, PageSection, PageGrid } from '../ui/page/Page';
import {
  FilterCard,
  Button,
  Plus,
  StatusBadge,
  ActionMenu,
  SearchInput,
  SelectInput,
  PaginationWithPageSize,
  Document,
  Clock,
  CheckCircle,
  UsersGroup,
} from '../components';
import { colors, spacing } from '../design-system/tokens';

const timelineActivities = [
  { id: '1', activity: 'Upload Evidence for Requirement v3.1', date: '24 Dec 2025', status: 'overdue' as const },
  { id: '2', activity: 'Upload Evidence for Requirement v3.1', date: '25 Dec 2025', status: 'in-progress' as const },
  { id: '3', activity: 'Upload Evidence for Requirement v3.1', date: '29 Dec 2025', status: 'scheduled' as const },
  { id: '4', activity: 'Upload Evidence for Requirement v3.1', date: '29 Dec 2025', status: 'scheduled' as const },
  { id: '5', activity: 'Upload Evidence for Requirement v3.1', date: '1 Jan 2025', status: 'scheduled' as const },
];

const timelineStyles = {
  filterAndTableWrapper: {
    width: '100%',
    background: colors.bg.surface.default,
    borderRadius: '16px',
    border: `1px solid ${colors.stroke.neutral.soft}`,
    overflow: 'hidden',
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[4],
    background: colors.bg.surface.default,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },
  timePeriodTabs: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    background: colors.bg.surface.gray,
    borderRadius: '8px',
    padding: '2px',
  },
  timePeriodTab: (active: boolean) => ({
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: '14px',
    fontWeight: '500' as const,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    background: active ? colors.bg.surface.default : 'transparent',
    color: active ? colors.text.neutral.main : colors.text.neutral.sub,
    boxShadow: active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
  }),
  filterActions: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    flex: 1,
    minWidth: 0,
  },
  searchWrapper: { minWidth: 200, flex: '1 1 200px' },
  dropdownWrapper: { minWidth: 140 },
  table: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 120px 140px 40px',
    gap: spacing[4],
    padding: `${spacing[4]} ${spacing[6]} ${spacing[3]}`,
    background: colors.bg.surface.gray,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    fontSize: '12px',
    fontWeight: '500',
    color: colors.text.neutral.soft,
  },
  tableHeaderActivity: { textAlign: 'left' as const },
  tableHeaderDate: { textAlign: 'left' as const },
  tableHeaderStatus: { textAlign: 'right' as const },
  tableRow: (isLast: boolean) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 120px 140px 40px',
    gap: spacing[4],
    padding: `${spacing[4]} ${spacing[6]}`,
    alignItems: 'center',
    borderBottom: isLast ? 'none' : `1px solid ${colors.stroke.neutral.light}`,
    fontSize: '14px',
    color: colors.text.neutral.main,
  }),
  activityCell: {
    textAlign: 'left' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

export function ProjectTimelineView() {
  const [timePeriod, setTimePeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [monthFilter, setMonthFilter] = useState('December');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Filter activities based on search
  const filteredActivities = timelineActivities.filter(activity => {
    const searchLower = searchValue.toLowerCase();
    return (
      activity.activity.toLowerCase().includes(searchLower) ||
      activity.date.toLowerCase().includes(searchLower)
    );
  });
  
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summaryCards = [
    { icon: <Document />, value: 12, label: 'Total', variant: 'blue' as const },
    { icon: <Clock />, value: 4, label: 'In-progress', variant: 'yellow' as const },
    { icon: <CheckCircle />, value: 4, label: 'Completed', variant: 'green' as const },
    { icon: <UsersGroup />, value: 2, label: 'Overdue tasks', variant: 'red' as const },
  ];

  return (
    <Page>
      <PageHeader
        title="Timeline"
        description="Schedule of all compliance activities and milestones."
        actions={
          <Button
            label="New Milestone"
            icon={<Plus />}
            iconPosition="left"
            variant="primary"
            onClick={() => {}}
          />
        }
      />

      <PageSection>
        {/* Summary cards */}
        <PageGrid columns={4} gap={spacing[5]}>
          {summaryCards.map((card, index) => (
            <FilterCard
              key={index}
              icon={card.icon}
              value={card.value}
              label={card.label}
              variant={card.variant}
              showAccentBar={true}
              onClick={() => {}}
            />
          ))}
        </PageGrid>

        {/* Filter bar and table attached in one card */}
        <div style={timelineStyles.filterAndTableWrapper}>
          <div style={timelineStyles.filterBar}>
            <div style={timelineStyles.timePeriodTabs}>
              {(['month', 'quarter', 'year'] as const).map((period) => (
                <button
                  key={period}
                  type="button"
                  style={timelineStyles.timePeriodTab(timePeriod === period)}
                  onClick={() => setTimePeriod(period)}
                >
                  {period === 'month' ? 'Month' : period === 'quarter' ? 'Quarter' : 'Year'}
                </button>
              ))}
            </div>
            <div style={timelineStyles.filterActions}>
              <div style={timelineStyles.searchWrapper}>
              <SearchInput
                value={searchValue}
                onChange={(value) => {
                  setSearchValue(value);
                  setCurrentPage(1);
                }}
                placeholder="Search"
                width="sm"
              />
              </div>
              <div style={timelineStyles.dropdownWrapper}>
                <SelectInput
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: 'All Status', label: 'All Status' },
                    { value: 'Overdue', label: 'Overdue' },
                    { value: 'In-progress', label: 'In-progress' },
                    { value: 'Scheduled', label: 'Scheduled' },
                    { value: 'Completed', label: 'Completed' },
                  ]}
                  width="sm"
                />
              </div>
              <div style={timelineStyles.dropdownWrapper}>
                <SelectInput
                  value={monthFilter}
                  onChange={setMonthFilter}
                  options={[
                    { value: 'December', label: 'December' },
                    { value: 'November', label: 'November' },
                    { value: 'January', label: 'January' },
                  ]}
                  width="sm"
                />
              </div>
            </div>
          </div>

          {/* Data table - directly below filter bar */}
          <div style={timelineStyles.table}>
            <div style={timelineStyles.tableHeader}>
              <div style={timelineStyles.tableHeaderActivity}>Activity</div>
              <div style={timelineStyles.tableHeaderDate}>Date</div>
              <div style={timelineStyles.tableHeaderStatus}>Status</div>
              <div></div>
            </div>
            {paginatedActivities.map((row, index) => (
              <div
                key={row.id}
                style={timelineStyles.tableRow(index === paginatedActivities.length - 1)}
              >
                <div style={timelineStyles.activityCell}>{row.activity}</div>
                <div style={{ textAlign: 'left' }}>{row.date}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <StatusBadge status={row.status} />
                </div>
                <div>
                  <ActionMenu
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
          <PaginationWithPageSize
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredActivities.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </PageSection>
    </Page>
  );
}
