import { useState } from 'react';
import { colors, spacing } from '../design-system/tokens';
import { Button, ConfirmationDialog, ChevronLeft, MoreVertical, ZoomIn, ZoomOut } from '../components';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
}

interface FileReviewViewProps {
  fileName: string;
  fileUrl: string;
  status: 'pending-review' | 'approved' | 'rejected';
  statusLabel: string;
  uploadedBy: string;
  uploadedDate: string;
  comments: Comment[];
  totalPages: number;
  onBack: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  container: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    background: '#FFFFFF',
    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    background: '#FFFFFF',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.sub,
    background: 'none',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  fileName: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
  },
  menuButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.text.neutral.sub,
    transition: 'all 0.2s ease',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  viewerArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    background: '#F5F5F5',
  },
  pdfContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    padding: spacing[6],
  },
  pdfPage: (zoom: number) => ({
    background: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    width: `${800 * (zoom / 100)}px`,
    minHeight: `${1000 * (zoom / 100)}px`,
    padding: spacing[8],
    transition: 'all 0.2s ease',
  }),
  documentTitle: {
    fontSize: '24px',
    fontWeight: '700' as const,
    color: colors.text.neutral.main,
    textAlign: 'center' as const,
    marginBottom: spacing[2],
  },
  documentSubtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    textAlign: 'center' as const,
    marginBottom: spacing[6],
  },
  documentSection: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[3],
    textAlign: 'left' as const,
  },
  sectionText: {
    fontSize: '14px',
    color: colors.text.neutral.main,
    lineHeight: '22px',
    marginBottom: spacing[3],
    textAlign: 'left' as const,
  },
  listItem: {
    fontSize: '14px',
    color: colors.text.neutral.main,
    lineHeight: '22px',
    marginBottom: spacing[2],
    paddingLeft: spacing[4],
    textAlign: 'left' as const,
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.default,
  },
  paginationButtons: {
    display: 'flex',
    gap: spacing[2],
  },
  paginationButton: {
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  zoomControls: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  zoomButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${colors.stroke.neutral.light}`,
    background: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#000000',
  },
  zoomLevel: {
    fontSize: '14px',
    color: '#000000',
    minWidth: '50px',
    textAlign: 'center' as const,
    fontWeight: '500' as const,
  },
  pageNumber: {
    fontSize: '14px',
    color: '#000000',
    fontWeight: '500' as const,
  },
  sidebar: {
    width: '320px',
    display: 'flex',
    flexDirection: 'column' as const,
    borderLeft: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.default,
    overflow: 'hidden',
  },
  sidebarContent: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: spacing[5],
  },
  reviewSection: {
    marginBottom: spacing[6],
  },
  reviewTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[4],
    textAlign: 'left' as const,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[1],
    marginBottom: spacing[3],
  },
  infoLabel: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  infoValue: {
    fontSize: '14px',
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  statusBadge: (status: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500' as const,
    color: status === 'pending-review' ? '#DC6803' : status === 'rejected' ? '#B42318' : '#027A48',
    background: status === 'pending-review' ? '#FFFAEB' : status === 'rejected' ? '#FEF3F2' : '#ECFDF3',
    width: 'fit-content',
  }),
  commentsSection: {
    marginBottom: spacing[4],
  },
  commentsTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[4],
    textAlign: 'left' as const,
  },
  commentCard: {
    marginBottom: spacing[4],
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  commentAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: colors.primary[500],
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600' as const,
    flexShrink: 0,
  },
  commentAuthor: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  commentText: {
    fontSize: '14px',
    color: colors.text.neutral.main,
    lineHeight: '20px',
    marginBottom: spacing[1],
    textAlign: 'left' as const,
  },
  commentTime: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  actionButtons: {
    padding: spacing[4],
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[2],
  },
};

export function FileReviewView({
  fileName,
  status,
  statusLabel,
  uploadedBy,
  uploadedDate,
  comments,
  totalPages,
  onBack,
  onApprove,
  onReject,
}: FileReviewViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleApproveClick = () => {
    setShowApproveDialog(true);
  };

  const handleRejectClick = () => {
    setShowRejectDialog(true);
  };

  const handleConfirmApprove = () => {
    setShowApproveDialog(false);
    onApprove?.();
  };

  const handleConfirmReject = () => {
    setShowRejectDialog(false);
    onReject?.();
  };

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={onBack} />
      
      {/* Sidebar Container */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button
            type="button"
            style={styles.backButton}
            onClick={onBack}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.bg.surface.gray;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <ChevronLeft />
            Back to Evidence Details
          </button>
        </div>
        <div style={styles.fileName}>{fileName}</div>
        <button
          type="button"
          style={styles.menuButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.bg.surface.gray;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <MoreVertical />
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* PDF Viewer Area */}
        <div style={styles.viewerArea}>
          <div style={styles.pdfContainer}>
            <div style={styles.pdfPage(zoom)}>
              {/* Mock PDF Content */}
              <h1 style={styles.documentTitle}>Firewall Configuration Standards</h1>
              <p style={styles.documentSubtitle}>Network Security Policy Document</p>

              <div style={styles.documentSection}>
                <h2 style={styles.sectionTitle}>1. Overview</h2>
                <p style={styles.sectionText}>
                  This document outlines the standard firewall configuration policies and procedures for all network
                  security devices within the organization. All firewall administrators must adhere to these guidelines to
                  ensure consistent security posture.
                </p>
              </div>

              <div style={styles.documentSection}>
                <h2 style={styles.sectionTitle}>2. Configuration Rules</h2>
                <p style={styles.listItem}>• All inbound traffic must be denied by default</p>
                <p style={styles.listItem}>• Only explicitly approved services are permitted</p>
                <p style={styles.listItem}>• Logging must be enabled for all denied connections</p>
                <p style={styles.listItem}>• Regular review of firewall rules every 90 days is required</p>
              </div>

              <div style={styles.documentSection}>
                <h2 style={styles.sectionTitle}>3. Access Control</h2>
                <p style={styles.sectionText}>
                  Access to firewall management interfaces must be restricted to authorized personnel only. Multi-factor
                  authentication is required for all administrative access.
                </p>
                <p style={styles.sectionText}>
                  This document outlines the standard firewall configuration policies and procedures for all network
                  security devices within the organization. All firewall administrators must adhere to these guidelines to
                  ensure consistent security posture.
                </p>
                <p style={styles.sectionText}>
                  This document outlines the standard firewall configuration policies and procedures for all network
                  security devices within the organization. All firewall administrators must adhere to these guidelines to
                  ensure consistent security posture.
                </p>
                <p style={styles.sectionText}>
                  This document outlines the standard firewall configuration policies and procedures for all network
                  security devices within the organization. All firewall administrators must adhere to these guidelines to
                  ensure consistent security posture.
                </p>
                <p style={styles.sectionText}>
                  This document outlines the standard firewall configuration policies and procedures for all network
                  security devices within the organization. All firewall administrators must adhere to these guidelines to
                  ensure consistent security posture.
                </p>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div style={styles.pagination}>
            <div style={styles.zoomControls}>
              <button
                type="button"
                style={styles.zoomButton}
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                disabled={zoom <= 50}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bg.surface.gray;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                <ZoomOut />
              </button>
              <span style={styles.zoomLevel}>{zoom}%</span>
              <button
                type="button"
                style={styles.zoomButton}
                onClick={() => setZoom(Math.min(150, zoom + 10))}
                disabled={zoom >= 150}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bg.surface.gray;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                <ZoomIn />
              </button>
            </div>

            <div style={styles.pageNumber}>Page {currentPage} of {totalPages}</div>

            <div style={styles.paginationButtons}>
              <button
                type="button"
                style={styles.paginationButton}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                onMouseEnter={(e) => {
                  if (currentPage > 1) {
                    e.currentTarget.style.background = colors.bg.surface.gray;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Previous
              </button>
              <button
                type="button"
                style={styles.paginationButton}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                onMouseEnter={(e) => {
                  if (currentPage < totalPages) {
                    e.currentTarget.style.background = colors.bg.surface.gray;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarContent}>
            {/* Review File Section */}
            <div style={styles.reviewSection}>
              <h3 style={styles.reviewTitle}>Review File</h3>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Uploaded by {uploadedBy} on {uploadedDate}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Status</span>
                <span style={styles.statusBadge(status)}>{statusLabel}</span>
              </div>
            </div>

            {/* Assessor Comments Section */}
            {comments.length > 0 && (
              <div style={styles.commentsSection}>
                <h3 style={styles.commentsTitle}>Assessor Comments</h3>
                {comments.map((comment) => (
                  <div key={comment.id} style={styles.commentCard}>
                    <div style={styles.commentHeader}>
                      <div style={styles.commentAvatar}>
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span style={styles.commentAuthor}>{comment.author}</span>
                    </div>
                    <p style={styles.commentText}>{comment.text}</p>
                    <p style={styles.commentTime}>{comment.timestamp}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {status === 'pending-review' && (
            <div style={styles.actionButtons}>
              <Button
                label="Approve"
                variant="primary"
                onClick={handleApproveClick}
              />
              <Button
                label="Reject"
                variant="secondary"
                onClick={handleRejectClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Confirmation Dialogs */}
    <ConfirmationDialog
      isOpen={showApproveDialog}
      title="Approve Evidence"
      message="Are you sure you want to approve this evidence? This action will mark the evidence as approved and notify the relevant team members."
      confirmLabel="Approve"
      cancelLabel="Cancel"
      variant="info"
      onConfirm={handleConfirmApprove}
      onCancel={() => setShowApproveDialog(false)}
    />

    <ConfirmationDialog
      isOpen={showRejectDialog}
      title="Reject Evidence"
      message="Are you sure you want to reject this evidence? This action will require the uploader to revise and resubmit the document."
      confirmLabel="Reject"
      cancelLabel="Cancel"
      variant="danger"
      onConfirm={handleConfirmReject}
      onCancel={() => setShowRejectDialog(false)}
    />
    </>
  );
}
