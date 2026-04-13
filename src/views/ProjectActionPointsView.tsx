import { useState } from 'react';
import { Page, PageHeader, PageSection, PageGrid } from '../ui/page/Page';
import {
  FilterCard,
  Button,
  SearchInput,
  ActionMenu,
  OwnerCell,
  Download,
  PaginationWithPageSize,
  Document as DocumentIcon,
  FolderOpen,
  CheckCircle,
  UploadArrow,
} from '../components';
import { ActionPointDetailsView, FileReviewView } from '../sidebarViews';
import { colors, spacing } from '../design-system/tokens';

const categoryTabs = ['Network', 'Application', 'Data', 'IT', 'Physical', 'Policy'];
const filterTabs = ['All', 'Open', 'Closed', 'Pending review'];

const actionRows = [
  { id: '1', evidenceId: 'PR25EV1', title: 'Firewall Configuration Standards', assignee: 'Anita R Reddy', dueDate: '24 Dec 2025', status: 'Open', priority: 'High' },
  { id: '2', evidenceId: 'SC25007', title: 'Upload Evidence for Requirement v3.1', assignee: 'Anita R Reddy', dueDate: '1 Jan 2025', status: 'Pending Review', priority: 'Medium' },
  { id: '3', evidenceId: 'PR25EV2', title: 'Upload Evidence for Requirement v3.1', assignee: 'Anita R Reddy', dueDate: '24 Dec 2025', status: 'Open', priority: 'Low' },
];

const actionStyles = {
  categoryTabs: {
    display: 'flex',
    gap: 0,
    marginBottom: spacing[4],
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },
  categoryTab: (active: boolean) => ({
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: '14px',
    fontWeight: '600' as const,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: active ? colors.primary[500] : colors.text.neutral.sub,
    borderBottom: active ? `2px solid ${colors.primary[500]}` : '2px solid transparent',
    marginBottom: -1,
  }),
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
  filterTabs: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    background: colors.bg.surface.gray,
    borderRadius: '8px',
    padding: '2px',
  },
  filterTab: (active: boolean) => ({
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
  searchWrapper: { minWidth: 200, flex: '1 1 200px' },
  table: { width: '100%' },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr 160px 110px 130px 90px 40px',
    gap: spacing[4],
    padding: `${spacing[4]} ${spacing[6]} ${spacing[3]}`,
    background: colors.bg.surface.gray,
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    fontSize: '12px',
    fontWeight: '500',
    color: colors.text.neutral.soft,
    textAlign: 'left' as const,
  },
  tableRow: (isLast: boolean) => ({
    display: 'grid',
    gridTemplateColumns: '100px 1fr 160px 110px 130px 90px 40px',
    gap: spacing[4],
    padding: `${spacing[4]} ${spacing[6]}`,
    alignItems: 'center',
    borderBottom: isLast ? 'none' : `1px solid ${colors.stroke.neutral.light}`,
    fontSize: '14px',
    color: colors.text.neutral.main,
  }),
  badge: (bg: string, color: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
    padding: '2px 8px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
    background: bg,
    color,
  }),
  titleLink: {
    color: colors.text.neutral.main,
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: `${spacing[2]} ${spacing[3]}`,
    paddingLeft: spacing[4],
    fontSize: '14px',
    textAlign: 'left' as const,
    borderRadius: '6px',
    transition: 'background 0.2s ease',
    width: '100%',
    display: 'block',
    margin: `-${spacing[2]} -${spacing[3]}`,
    marginLeft: `-${spacing[4]}`,
  },
};

export function ProjectActionPointsView() {
  const [category, setCategory] = useState('Network');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedActionPoint, setSelectedActionPoint] = useState<typeof actionRows[0] | null>(null);
  const [isFileReviewOpen, setIsFileReviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string } | null>(null);

  // Filter rows based on search
  const filteredRows = actionRows.filter(row => {
    const searchLower = searchValue.toLowerCase();
    return (
      row.evidenceId.toLowerCase().includes(searchLower) ||
      row.title.toLowerCase().includes(searchLower) ||
      row.assignee.toLowerCase().includes(searchLower) ||
      row.status.toLowerCase().includes(searchLower) ||
      row.priority.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenDetails = (row: typeof actionRows[0]) => {
    setSelectedActionPoint(row);
    setIsDetailsSidebarOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsSidebarOpen(false);
    setSelectedActionPoint(null);
  };

  const handleReviewFile = (fileId: string, fileName: string) => {
    setSelectedFile({ id: fileId, name: fileName });
    setIsFileReviewOpen(true);
  };

  const handleCloseFileReview = () => {
    setIsFileReviewOpen(false);
    setSelectedFile(null);
  };

  const summaryCards = [
    { icon: <DocumentIcon />, value: 12, label: 'Total', variant: 'blue' as const },
    { icon: <FolderOpen />, value: 4, label: 'Open', variant: 'yellow' as const },
    { icon: <CheckCircle />, value: 4, label: 'Closed', variant: 'green' as const },
    { icon: <UploadArrow />, value: 4, label: 'Pending review', variant: 'red' as const },
  ];

  const statusStyle = (s: string) => {
    if (s === 'Open') return actionStyles.badge('#EFF8FF', '#175CD3');
    if (s === 'Pending Review') return actionStyles.badge('#F4F3FF', '#5925DC');
    return actionStyles.badge('#F2F4F7', '#344054');
  };
  const priorityStyle = (p: string) => {
    if (p === 'High') return actionStyles.badge('#FEF3F2', '#B42318');
    if (p === 'Medium') return actionStyles.badge('#FFFBF0', '#B54708');
    return actionStyles.badge('#F2F4F7', '#344054');
  };

  return (
    <Page>
      <PageHeader
        title="Action Points"
        description="Track and resolve remediation tasks and compliance gaps."
      />
      <PageSection>
        <div style={actionStyles.categoryTabs}>
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              style={actionStyles.categoryTab(category === tab)}
              onClick={() => setCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <PageGrid columns={4} gap={spacing[5]}>
          {summaryCards.map((card, i) => (
            <FilterCard key={i} icon={card.icon} value={card.value} label={card.label} variant={card.variant} showAccentBar onClick={() => {}} />
          ))}
        </PageGrid>
        <div style={actionStyles.filterAndTableWrapper}>
          <div style={actionStyles.filterBar}>
            <div style={actionStyles.filterTabs}>
              {filterTabs.map((tab) => (
                <button key={tab} type="button" style={actionStyles.filterTab(statusFilter === tab)} onClick={() => setStatusFilter(tab)}>{tab}</button>
              ))}
            </div>
            <div style={actionStyles.searchWrapper}>
              <SearchInput 
                value={searchValue} 
                onChange={(value) => {
                  setSearchValue(value);
                  setCurrentPage(1); // Reset to first page on search
                }} 
                placeholder="Search" 
                width="sm" 
              />
            </div>
            <Button label="Download Report" icon={<Download />} iconPosition="left" variant="secondary" onClick={() => {}} />
          </div>
          <div style={actionStyles.table}>
            <div style={actionStyles.tableHeader}>
              <div>Evidence ID</div>
              <div>Title</div>
              <div>Assignee</div>
              <div>Due Date</div>
              <div>Status</div>
              <div>Priority</div>
              <div></div>
            </div>
            {paginatedRows.map((row, i) => (
              <div key={row.id} style={actionStyles.tableRow(i === paginatedRows.length - 1)}>
                <div>{row.evidenceId}</div>
                <div>
                  <button 
                    type="button" 
                    style={actionStyles.titleLink}
                    onClick={() => handleOpenDetails(row)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#EFF8FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                    }}
                  >
                    {row.title}
                  </button>
                </div>
                <div><OwnerCell name={row.assignee} /></div>
                <div>{row.dueDate}</div>
                <div><span style={statusStyle(row.status)}>• {row.status}</span></div>
                <div><span style={priorityStyle(row.priority)}>• {row.priority}</span></div>
                <div><ActionMenu onEdit={() => {}} onDelete={() => {}} /></div>
              </div>
            ))}
          </div>
          <PaginationWithPageSize
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredRows.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        {/* Action Point Details Sidebar */}
        {isDetailsSidebarOpen && selectedActionPoint && (
            <ActionPointDetailsView
              title={selectedActionPoint.title}
              requirementCode="PR25AP1"
              category="Network"
              description="Update firewall configuration to comply with latest security requirements. Ensure all rules are documented and approved by security team."
              status={selectedActionPoint.status}
              priority={selectedActionPoint.priority}
              assignee={{ name: selectedActionPoint.assignee }}
              dueDate={selectedActionPoint.dueDate}
              files={[
                {
                  id: '1',
                  name: 'updated-config-v3.pdf',
                  size: '2.1 MB',
                  status: 'pending-review',
                  statusLabel: 'Pending review',
                  uploadedBy: 'Anita Kumar',
                  uploadedDate: '24 Jan 26',
                },
                {
                  id: '2',
                  name: 'security-policy-update.pdf',
                  size: '1.5 MB',
                  status: 'approved',
                  statusLabel: 'Approved',
                  uploadedBy: 'Rajeev R',
                  uploadedDate: '23 Jan 26',
                },
                {
                  id: '3',
                  name: 'compliance-checklist.pdf',
                  size: '900 KB',
                  status: 'pending-review',
                  statusLabel: 'Pending review',
                  uploadedBy: 'Anita Kumar',
                  uploadedDate: '25 Jan 26',
                },
              ]}
              onClose={handleCloseDetails}
              onReviewFile={(fileId) => {
                const fileName = [
                  { id: '1', name: 'updated-config-v3.pdf' },
                  { id: '2', name: 'security-policy-update.pdf' },
                  { id: '3', name: 'compliance-checklist.pdf' },
                ].find(f => f.id === fileId)?.name || 'document.pdf';
                handleReviewFile(fileId, fileName);
              }}
            />
        )}

        {/* File Review View */}
        {isFileReviewOpen && selectedFile && (
          <FileReviewView
            fileName={selectedFile.name}
            fileUrl=""
            status="pending-review"
            statusLabel="Pending review"
            uploadedBy="Anita Kumar"
            uploadedDate="24 Jan 26"
            comments={[
              {
                id: '1',
                author: 'John Smith',
                text: 'Please verify all configuration changes are documented.',
                timestamp: '23 Jan 2025, 2:30 PM',
              },
              {
                id: '2',
                author: 'Sarah Johnson',
                text: 'Looks good. Ready for final approval.',
                timestamp: '23 Jan 2025, 4:15 PM',
              },
            ]}
            totalPages={8}
            onBack={handleCloseFileReview}
            onApprove={() => {
              handleCloseFileReview();
            }}
            onReject={() => {
              handleCloseFileReview();
            }}
          />
        )}
      </PageSection>
    </Page>
  );
}
