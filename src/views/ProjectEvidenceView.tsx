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
  Document,
  Clock,
  CheckCircle,
} from '../components';
import { EvidenceDetailsView, FileReviewView } from '../sidebarViews';
import { colors, spacing } from '../design-system/tokens';

const categoryTabs = ['Network', 'Application', 'Data', 'IT', 'Physical', 'Policy'];
const filterTabs = ['All', 'Open', 'Closed', 'Pending review'];

const evidenceRows = [
  { id: '1', evidenceId: 'PR25EV1', title: 'Firewall Configuration Standards', assignee: 'Anita R Reddy', dueDate: '24 Dec 2025', status: 'Open', priority: 'High' },
  { id: '2', evidenceId: 'PR25EV2', title: 'Upload Evidence for Requirement v3.1', assignee: 'Anita R Reddy', dueDate: '1 Jan 2025', status: 'Pending Review', priority: 'Medium' },
  { id: '3', evidenceId: 'SC25007', title: 'Upload Evidence for Requirement v3.1', assignee: 'Anita R Reddy', dueDate: '24 Dec 2025', status: 'Open', priority: 'Low' },
];

const evidenceStyles = {
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

export function ProjectEvidenceView() {
  const [category, setCategory] = useState('Network');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<typeof evidenceRows[0] | null>(null);
  const [isFileReviewOpen, setIsFileReviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string } | null>(null);

  // Filter rows based on search
  const filteredRows = evidenceRows.filter(row => {
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

  const handleOpenDetails = (row: typeof evidenceRows[0]) => {
    setSelectedEvidence(row);
    setIsDetailsSidebarOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsSidebarOpen(false);
    setSelectedEvidence(null);
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
    { icon: <Document />, value: 12, label: 'Total', variant: 'blue' as const },
    { icon: <Clock />, value: 4, label: 'Open', variant: 'yellow' as const },
    { icon: <CheckCircle />, value: 4, label: 'Closed', variant: 'green' as const },
    { icon: <Document />, value: 4, label: 'Pending review', variant: 'red' as const },
  ];

  const statusStyle = (s: string) => {
    if (s === 'Open') return evidenceStyles.badge('#EFF8FF', '#175CD3');
    if (s === 'Pending Review') return evidenceStyles.badge('#F4F3FF', '#5925DC');
    return evidenceStyles.badge('#F2F4F7', '#344054');
  };
  const priorityStyle = (p: string) => {
    if (p === 'High') return evidenceStyles.badge('#FEF3F2', '#B42318');
    if (p === 'Medium') return evidenceStyles.badge('#FFFBF0', '#B54708');
    return evidenceStyles.badge('#F2F4F7', '#344054');
  };

  return (
    <Page>
      <PageHeader
        title="Evidence"
        description="Manage and track evidence documentation across all domains."
      />
      <PageSection>
        <div style={evidenceStyles.categoryTabs}>
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              style={evidenceStyles.categoryTab(category === tab)}
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
        <div style={evidenceStyles.filterAndTableWrapper}>
          <div style={evidenceStyles.filterBar}>
            <div style={evidenceStyles.filterTabs}>
              {filterTabs.map((tab) => (
                <button key={tab} type="button" style={evidenceStyles.filterTab(statusFilter === tab)} onClick={() => setStatusFilter(tab)}>{tab}</button>
              ))}
            </div>
            <div style={evidenceStyles.searchWrapper}>
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
          <div style={evidenceStyles.table}>
            <div style={evidenceStyles.tableHeader}>
              <div>Evidence ID</div>
              <div>Title</div>
              <div>Assignee</div>
              <div>Due Date</div>
              <div>Status</div>
              <div>Priority</div>
              <div></div>
            </div>
            {paginatedRows.map((row, i) => (
              <div key={row.id} style={evidenceStyles.tableRow(i === paginatedRows.length - 1)}>
                <div>{row.evidenceId}</div>
                <div>
                  <button 
                    type="button" 
                    style={evidenceStyles.titleLink}
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

        {/* Evidence Details Sidebar */}
        {isDetailsSidebarOpen && selectedEvidence && (
            <EvidenceDetailsView
              title={selectedEvidence.title}
              requirementCode="PR25EV1"
              category="Network"
              description="This evidence document contains the current firewall configuration standards for all network perimeter devices. The configuration must comply with PCI DSS requirements 1.1, 1.2, and 1.3.Documentation of firewall rules and configuration settings for perimeter network security. Must include all active rules, change logs, and administrative approval signatures."
              status={selectedEvidence.status}
              priority={selectedEvidence.priority}
              assignee={{ name: selectedEvidence.assignee }}
              dueDate={selectedEvidence.dueDate}
              files={[
                {
                  id: '1',
                  name: 'fw-config-v3.pdf',
                  size: '3.4 MB',
                  status: 'pending-review',
                  statusLabel: 'Pending review',
                  uploadedBy: 'Anita Kumar',
                  uploadedDate: '24 Jan 26',
                },
                {
                  id: '2',
                  name: 'fw-config-v3.pdf',
                  size: '3.4 MB',
                  status: 'pending-review',
                  statusLabel: 'Pending review',
                  uploadedBy: 'Anita Kumar',
                  uploadedDate: '24 Jan 26',
                },
                {
                  id: '3',
                  name: 'fw-config-v1.pdf',
                  size: '2.4 MB',
                  status: 'rejected',
                  statusLabel: 'Rejected',
                  uploadedBy: 'Anita Kumar',
                  uploadedDate: '24 Jan 26',
                  rejectionReason: 'Missing admin signature page',
                },
                {
                  id: '4',
                  name: 'network-topology-diagram.pdf',
                  size: '1.8 MB',
                  status: 'approved',
                  statusLabel: 'Approved',
                  uploadedBy: 'Rajeev R',
                  uploadedDate: '23 Jan 26',
                },
                {
                  id: '5',
                  name: 'firewall-rules-audit.pdf',
                  size: '4.2 MB',
                  status: 'pending-review',
                  statusLabel: 'Pending review',
                  uploadedBy: 'Anita Kumar',
                  uploadedDate: '25 Jan 26',
                },
              ]}
              onClose={handleCloseDetails}
              onReviewFile={(fileId) => {
                const fileName = [
                  { id: '1', name: 'fw-config-v3.pdf' },
                  { id: '2', name: 'fw-config-v3.pdf' },
                  { id: '3', name: 'fw-config-v1.pdf' },
                  { id: '4', name: 'network-topology-diagram.pdf' },
                  { id: '5', name: 'firewall-rules-audit.pdf' },
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
                text: 'Please verify section 3.2 compliance requirements.',
                timestamp: '23 Jan 2025, 2:30 PM',
              },
              {
                id: '2',
                author: 'Sarah Johnson',
                text: 'The firewall configuration looks correct. Approved pending final review.',
                timestamp: '23 Jan 2025, 4:15 PM',
              },
            ]}
            totalPages={12}
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
