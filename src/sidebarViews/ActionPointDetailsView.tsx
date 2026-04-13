import { useState } from 'react';
import {
  Activity,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Close,
  Comment,
  Eye,
  MenuLines,
  MoreVertical,
  PDF,
  Send,
  UploadArrow,
} from '../components';
import { colors, spacing } from '../design-system/tokens';

interface EvidenceFile {
  id: string;
  name: string;
  size: string;
  status: 'pending-review' | 'approved' | 'rejected';
  statusLabel: string;
  uploadedBy: string;
  uploadedDate: string;
  rejectionReason?: string;
}

interface ActivityItem {
  id: string;
  type: 'comment' | 'activity';
  user: string;
  userInitials: string;
  text: string;
  timestamp: string;
}

interface ActionPointDetailsViewProps {
  title: string;
  requirementCode: string;
  category: string;
  description: string;
  status: string;
  priority: string;
  assignee: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  files: EvidenceFile[];
  onClose: () => void;
  onReviewFile: (fileId: string) => void;
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
    width: '900px',
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
    padding: spacing[5],
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    background: 'white',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  headerIcon: {
    width: '20px',
    height: '20px',
    color: colors.primary[500],
  },
  headerTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
  },
  closeButton: {
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
  contentWrapper: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    gap: spacing[4],
    padding: spacing[6],
  },
  leftColumn: {
    flex: 1,
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
  },
  rightColumn: {
    width: '320px',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
  },
  card: {
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    padding: spacing[5],
  },
  activityCard: {
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    padding: spacing[5],
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: 0,
  },
  descriptionCard: {
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    padding: spacing[5],
    display: 'flex',
    flexDirection: 'column' as const,
  },
  pmCard: {
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    padding: spacing[5],
    display: 'flex',
    flexDirection: 'column' as const,
  },
  titleSection: {
    marginBottom: spacing[4],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontSize: '20px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  subtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  navigationButtons: {
    display: 'flex',
    gap: spacing[2],
  },
  navButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${colors.stroke.neutral.light}`,
    background: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    color: colors.text.neutral.sub,
    transition: 'all 0.2s ease',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: '600' as const,
    color: colors.text.neutral.soft,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: spacing[3],
    textAlign: 'left' as const,
  },
  description: {
    fontSize: '14px',
    color: colors.text.neutral.main,
    lineHeight: '22px',
    textAlign: 'left' as const,
  },
  descriptionTextarea: {
    width: '100%',
    minHeight: '100px',
    maxHeight: '300px',
    fontSize: '14px',
    color: colors.text.neutral.main,
    lineHeight: '22px',
    textAlign: 'left' as const,
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    padding: spacing[3],
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
    outline: 'none',
    background: '#F9FAFB',
  },
  uploadButton: {
    width: '100%',
    padding: spacing[4],
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: spacing[4],
    position: 'relative' as const,
  },
  hiddenFileInput: {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },
  uploadIcon: {
    width: '16px',
    height: '16px',
    color: colors.primary[500],
  },
  uploadText: {
    fontSize: '14px',
    color: colors.primary[500],
    fontWeight: '500' as const,
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[3],
  },
  fileCard: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: spacing[4],
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
  },
  fileLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[3],
    flex: 1,
    minWidth: 0,
  },
  fileIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    background: '#FEE4E2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fileInfo: {
    flex: 1,
    minWidth: 0,
  },
  fileNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[1],
    flexWrap: 'wrap' as const,
  },
  fileName: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  badge: (color: string, bg: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500' as const,
    color: color,
    background: bg,
  }),
  dot: (color: string) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: color,
  }),
  fileMetadata: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
    marginBottom: spacing[2],
  },
  rejectionNote: {
    fontSize: '12px',
    color: '#B42318',
    textAlign: 'left' as const,
    marginBottom: spacing[2],
  },
  reuploadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    border: 'none',
    background: 'transparent',
    color: '#B42318',
    fontSize: '12px',
    fontWeight: '500' as const,
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
  uploadIconSmall: {
    width: '14px',
    height: '14px',
  },
  menuButton: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.text.neutral.sub,
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  fileActions: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  eyeButton: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.primary[500],
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  pmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  pmRowLast: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pmLabel: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  pmValue: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    textAlign: 'right' as const,
  },
  assigneeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: colors.primary[500],
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '600' as const,
  },
  tabs: {
    display: 'flex',
    gap: spacing[5],
    marginBottom: spacing[4],
  },
  tab: (active: boolean) => ({
    padding: 0,
    fontSize: '14px',
    fontWeight: '600' as const,
    color: active ? colors.primary[600] : colors.text.neutral.sub,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    paddingBottom: spacing[1],
  }),
  tabIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
    marginBottom: spacing[4],
    flex: 1,
    overflowY: 'auto' as const,
    minHeight: 0,
  },
  activityItem: {
    display: 'flex',
    gap: spacing[3],
  },
  activityAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: colors.primary[500],
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600' as const,
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: '13px',
    color: colors.text.neutral.main,
    marginBottom: spacing[1],
    textAlign: 'left' as const,
    lineHeight: '18px',
  },
  activityTime: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  commentSection: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[2],
    paddingTop: spacing[4],
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
  },
  commentInput: {
    flex: 1,
    padding: spacing[3],
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'none' as const,
    minHeight: '40px',
    outline: 'none',
    background: '#F9FAFB',
  },
  sendButton: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: colors.primary[500],
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s ease',
  },
  sendIcon: {
    width: '18px',
    height: '18px',
  },
};

export function ActionPointDetailsView({
  title,
  requirementCode,
  category,
  description,
  status,
  priority,
  assignee,
  dueDate,
  files,
  onClose,
  onReviewFile,
}: ActionPointDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'comments' | 'activity'>('all');
  const [comment, setComment] = useState('');
  const [editableDescription, setEditableDescription] = useState(description);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file upload logic
      alert(`File "${file.name}" selected for upload (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    }
  };

  // Dummy data
  const dummyComments: ActivityItem[] = [
    {
      id: 'c1',
      type: 'comment',
      user: 'Michael Chen',
      userInitials: 'MC',
      text: 'This action point needs to be completed before the audit next week. Please prioritize.',
      timestamp: '17 Jan 2025, 2:15 PM',
    },
    {
      id: 'c2',
      type: 'comment',
      user: 'Lisa Anderson',
      userInitials: 'LA',
      text: 'I can help with the implementation if needed. Let me know!',
      timestamp: '16 Jan 2025, 11:20 AM',
    },
  ];

  const dummyActivities: ActivityItem[] = [
    {
      id: 'a1',
      type: 'activity',
      user: 'Anita Kumar',
      userInitials: 'AK',
      text: 'uploaded the evidence updated-config-v3.pdf',
      timestamp: '17 Jan 2025, 10:00 AM',
    },
    {
      id: 'a2',
      type: 'activity',
      user: 'Anita R Reddy',
      userInitials: 'AR',
      text: 'changed the status from Pending to In Progress',
      timestamp: '16 Jan 2025, 4:30 PM',
    },
    {
      id: 'a3',
      type: 'activity',
      user: 'Rajeev R',
      userInitials: 'RR',
      text: 'assigned the action point to Anita R Reddy',
      timestamp: '16 Jan 2025, 9:00 AM',
    },
    {
      id: 'a4',
      type: 'activity',
      user: 'Rajeev R',
      userInitials: 'RR',
      text: 'created the action point',
      timestamp: '16 Jan 2025, 8:55 AM',
    },
  ];

  const allItems = [...dummyComments, ...dummyActivities].sort((a, b) => {
    // Sort by timestamp descending (newest first)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const getDisplayItems = () => {
    if (activeTab === 'comments') return dummyComments;
    if (activeTab === 'activity') return dummyActivities;
    return allItems;
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === 'open') return { color: '#175CD3', bg: '#EFF8FF', dot: '#2E90FA' };
    if (status.toLowerCase() === 'closed') return { color: '#027A48', bg: '#ECFDF3', dot: '#12B76A' };
    return { color: '#344054', bg: '#F2F4F7', dot: '#667085' };
  };

  const getPriorityColor = (priority: string) => {
    if (priority.toLowerCase() === 'high') return { color: '#B42318', bg: '#FEF3F2', dot: '#F04438' };
    if (priority.toLowerCase() === 'medium') return { color: '#B54708', bg: '#FFFAEB', dot: '#F79009' };
    return { color: '#344054', bg: '#F2F4F7', dot: '#667085' };
  };

  const statusColors = getStatusColor(status);
  const priorityColors = getPriorityColor(priority);

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose} />
      
      {/* Sidebar Container */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>
            <CheckSquare />
          </div>
          <span style={styles.headerTitle}>Action Point details</span>
        </div>
        <button
          type="button"
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.bg.surface.gray;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Close />
        </button>
      </div>

      {/* Two Column Layout */}
      <div style={styles.contentWrapper}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Title Section */}
          <div style={styles.titleSection}>
            <div style={styles.titleContent}>
              <h2 style={styles.title}>{title}</h2>
              <p style={styles.subtitle}>{requirementCode} • {category}</p>
            </div>
            <div style={styles.navigationButtons}>
              <button
                type="button"
                style={styles.navButton}
                onClick={() => {}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bg.surface.gray;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
                title="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                style={styles.navButton}
                onClick={() => {}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bg.surface.gray;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
                title="Next"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Description Card */}
          <div style={styles.descriptionCard}>
            <div style={styles.sectionLabel}>Description</div>
            <textarea
              style={styles.descriptionTextarea}
              value={editableDescription}
              onChange={(e) => setEditableDescription(e.target.value)}
              placeholder="Enter description..."
            />
          </div>

          {/* Evidences Card */}
          <div style={styles.card}>
            <div style={styles.sectionLabel}>Evidences</div>
            
            {/* Upload Button */}
            <div
              style={styles.uploadButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <input
                type="file"
                style={styles.hiddenFileInput}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              />
              <div style={styles.uploadIcon}>
                <UploadArrow />
              </div>
              <span style={styles.uploadText}>Upload file here</span>
            </div>

            {/* File List */}
            <div style={styles.fileList}>
              {files.map((file) => (
                <div key={file.id} style={styles.fileCard}>
                  <div style={styles.fileLeft}>
                    <div style={styles.fileIcon}>
                      <PDF />
                    </div>
                    <div style={styles.fileInfo}>
                      <div style={styles.fileNameRow}>
                        <span style={styles.fileName}>{file.name}</span>
                        <div style={styles.badge(
                          file.status === 'pending-review' ? '#B54708' : file.status === 'rejected' ? '#B42318' : '#027A48',
                          file.status === 'pending-review' ? '#FFFAEB' : file.status === 'rejected' ? '#FEF3F2' : '#ECFDF3'
                        )}>
                          <div style={styles.dot(
                            file.status === 'pending-review' ? '#F79009' : file.status === 'rejected' ? '#F04438' : '#12B76A'
                          )} />
                          {file.statusLabel}
                        </div>
                      </div>
                      <div style={styles.fileMetadata}>
                        {file.size} • Added by {file.uploadedBy} • {file.uploadedDate}
                      </div>
                      {file.status === 'rejected' && file.rejectionReason && (
                        <>
                          <div style={styles.rejectionNote}>{file.rejectionReason}</div>
                          <button
                            type="button"
                            style={styles.reuploadButton}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#FEF3F2';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <div style={styles.uploadIconSmall}>
                              <UploadArrow />
                            </div>
                            Re-upload
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={styles.fileActions}>
                    <button
                      type="button"
                      style={styles.eyeButton}
                      onClick={() => onReviewFile(file.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#EFF8FF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                      title="Preview file"
                    >
                      <Eye />
                    </button>
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Project Management Card */}
          <div style={styles.pmCard}>
            <div style={styles.sectionLabel}>Project Management</div>
            
            <div style={styles.pmRow}>
              <span style={styles.pmLabel}>Status</span>
              <div style={styles.badge(statusColors.color, statusColors.bg)}>
                <div style={styles.dot(statusColors.dot)} />
                {status}
              </div>
            </div>

            <div style={styles.pmRow}>
              <span style={styles.pmLabel}>Priority</span>
              <div style={styles.badge(priorityColors.color, priorityColors.bg)}>
                <div style={styles.dot(priorityColors.dot)} />
                {priority}
              </div>
            </div>

            <div style={styles.pmRow}>
              <span style={styles.pmLabel}>Assignee</span>
              <div style={styles.assigneeRow}>
                <div style={styles.avatar}>
                  {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <span style={styles.pmValue}>{assignee.name}</span>
              </div>
            </div>

            <div style={styles.pmRowLast}>
              <span style={styles.pmLabel}>Due date</span>
              <span style={styles.pmValue}>{dueDate}</span>
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div style={styles.activityCard}>
            <div style={styles.sectionLabel}>Activity Timeline</div>
            
            <div style={styles.tabs}>
              <button
                type="button"
                style={styles.tab(activeTab === 'all')}
                onClick={() => setActiveTab('all')}
              >
                <div style={styles.tabIcon}>
                  <MenuLines />
                  All
                </div>
              </button>
              <button
                type="button"
                style={styles.tab(activeTab === 'comments')}
                onClick={() => setActiveTab('comments')}
              >
                <div style={styles.tabIcon}>
                  <Comment />
                  Comments
                </div>
              </button>
              <button
                type="button"
                style={styles.tab(activeTab === 'activity')}
                onClick={() => setActiveTab('activity')}
              >
                <div style={styles.tabIcon}>
                  <Activity />
                  Activity
                </div>
              </button>
            </div>

            <div style={styles.activityList}>
              {getDisplayItems().map((item) => (
                <div key={item.id} style={styles.activityItem}>
                  <div style={styles.activityAvatar}>
                    {item.userInitials}
                  </div>
                  <div style={styles.activityContent}>
                    <p style={styles.activityText}>
                      <strong>{item.user}</strong> {item.text}
                    </p>
                    <p style={styles.activityTime}>{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div style={styles.commentSection}>
              <textarea
                style={styles.commentInput}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button
                type="button"
                style={styles.sendButton}
                onClick={() => {
                  setComment('');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.primary[600];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.primary[500];
                }}
              >
                <div style={styles.sendIcon}>
                  <Send />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
