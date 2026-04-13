import { useState, useRef } from 'react';
import { colors, spacing } from '../design-system/tokens';
import { SelectInput, Trash, Plus, UploadCloud, FileCheck, Download } from '../components';

interface MemberInvite {
  id: string;
  email: string;
  role: string;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: spacing[6],
    display: 'flex',
    flexDirection: 'column' as const,
  },
  sectionHeader: {
    marginBottom: spacing[5],
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
    lineHeight: '20px',
  },
  tabs: {
    display: 'flex',
    gap: spacing[8],
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    marginBottom: spacing[6],
  },
  tab: (active: boolean) => ({
    padding: `0 0 ${spacing[3]}`,
    fontSize: '14px',
    fontWeight: '500' as const,
    color: active ? colors.primary[600] : colors.text.neutral.sub,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    borderBottom: active ? `2px solid ${colors.primary[600]}` : '2px solid transparent',
    marginBottom: '-1px',
  }),
  inviteRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  emailInput: {
    flex: 2,
    minWidth: 0,
  },
  roleSelect: {
    width: '150px',
    flexShrink: 0,
    minWidth: 0,
  },
  input: {
    width: '100%',
    height: '40px',
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: '14px',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    color: colors.text.neutral.main,
    background: 'white',
    boxSizing: 'border-box' as const,
  },
  deleteButton: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.text.neutral.main,
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  addButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[2]} 0`,
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.primary[600],
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    marginTop: spacing[3],
  },
  uploadArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
    border: `2px dashed ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    background: colors.bg.surface.gray,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: spacing[4],
  },
  uploadIcon: {
    width: '48px',
    height: '48px',
    marginBottom: spacing[3],
    color: colors.primary[500],
  },
  uploadTitle: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[1],
  },
  uploadSubtitle: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
    marginBottom: spacing[3],
  },
  uploadLink: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.primary[600],
    textDecoration: 'none',
  },
  filePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    marginBottom: spacing[4],
  },
  fileIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    background: '#D1FADF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[1],
  },
  fileSize: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  progressBar: {
    width: '100%',
    height: '4px',
    background: colors.bg.surface.gray,
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: spacing[1],
  },
  progressFill: (progress: number) => ({
    width: `${progress}%`,
    height: '100%',
    background: colors.primary[500],
    transition: 'width 0.3s ease',
  }),
  progressText: {
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  downloadLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.primary[600],
    textDecoration: 'none',
    cursor: 'pointer',
  },
  hiddenInput: {
    display: 'none',
  },
};


export function AddTeamMembersSidebarView() {
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  const [members, setMembers] = useState<MemberInvite[]>([
    { id: '1', email: '', role: 'User' },
  ]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
    { value: 'Project Admin', label: 'Project Admin' },
    { value: 'Assessor', label: 'Assessor' },
  ];

  const handleAddMember = () => {
    const newMember: MemberInvite = {
      id: Date.now().toString(),
      email: '',
      role: 'User',
    };
    setMembers([...members, newMember]);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleEmailChange = (id: string, email: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, email } : m));
  };

  const handleRoleChange = (id: string, role: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, role } : m));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadSample = () => {
    // Create sample CSV content
    const csvContent = 'email,role\njohn.doe@example.com,Admin\njane.smith@example.com,User\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Team member list.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Section Header */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Invite members</h2>
          <p style={styles.sectionSubtitle}>Send email invitations to new members to join Acme Works Inc.</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            type="button"
            style={styles.tab(activeTab === 'manual')}
            onClick={() => setActiveTab('manual')}
          >
            Manual Invite
          </button>
          <button
            type="button"
            style={styles.tab(activeTab === 'bulk')}
            onClick={() => setActiveTab('bulk')}
          >
            Bulk Upload
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1 }}>
        {activeTab === 'manual' ? (
          <>
            {members.map((member) => (
              <div key={member.id} style={styles.inviteRow}>
                <div style={styles.emailInput}>
                  <input
                    type="email"
                    style={styles.input}
                    placeholder="name@company.com"
                    value={member.email}
                    onChange={(e) => handleEmailChange(member.id, e.target.value)}
                  />
                </div>
                <div style={styles.roleSelect}>
                  <SelectInput
                    value={member.role}
                    options={roleOptions}
                    onChange={(value) => handleRoleChange(member.id, value)}
                    placeholder="Select role"
                    width="sm"
                  />
                </div>
                <button
                  type="button"
                  style={styles.deleteButton}
                  onClick={() => handleDeleteMember(member.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.bg.surface.gray;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Trash />
                </button>
              </div>
            ))}

            <button
              type="button"
              style={styles.addButton}
              onClick={handleAddMember}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.bg.surface.blue;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Plus />
              Add another user
            </button>
          </>
        ) : (
          <>
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              style={styles.hiddenInput}
              onChange={handleFileSelect}
            />
            
            {!uploadedFile ? (
              <div
                style={styles.uploadArea}
                onClick={handleUploadClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary[500];
                  e.currentTarget.style.background = colors.bg.surface.blue;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.stroke.neutral.light;
                  e.currentTarget.style.background = colors.bg.surface.gray;
                }}
              >
                <div style={styles.uploadIcon}>
                  <UploadCloud />
                </div>
                <p style={styles.uploadTitle}>Upload file here</p>
                <p style={styles.uploadSubtitle}>CSV file (1MB)</p>
              </div>
            ) : (
              <div style={styles.filePreview}>
                <div style={styles.fileIcon}>
                  <FileCheck />
                </div>
                <div style={styles.fileInfo}>
                  <p style={styles.fileName}>{uploadedFile.name}</p>
                  <p style={styles.fileSize}>{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                  {uploadProgress < 100 ? (
                    <>
                      <div style={styles.progressBar}>
                        <div style={styles.progressFill(uploadProgress)} />
                      </div>
                      <p style={styles.progressText}>{uploadProgress}%</p>
                    </>
                  ) : null}
                </div>
                {uploadProgress === 100 && (
                  <button
                    type="button"
                    style={styles.deleteButton}
                    onClick={() => {
                      setUploadedFile(null);
                      setUploadProgress(0);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.bg.surface.gray;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Trash />
                  </button>
                )}
              </div>
            )}

            <a
              style={styles.downloadLink}
              onClick={handleDownloadSample}
            >
              <Download />
              Download Sample CSV
            </a>
          </>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
