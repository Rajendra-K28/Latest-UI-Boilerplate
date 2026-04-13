import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import {
  SelectInput,
  Plus,
  UserPlus,
  UploadCloud,
  Download,
  Edit,
  Trash,
} from '../../../components';
import { spacing } from '../../../design-system/tokens';
import { apiService } from '../../../api/api.service';
import { complianceGroups, steps, styles } from './shared';
import type { ScanConfigurationSummary } from './shared';
import {
  APPLICATION_ROLES_API,
  createProjectFromSidebar,
  getInviteEmailValidationError,
  MAX_BULK_INVITE_ROWS,
  type InviteRecipient,
} from './api';

const MAX_CSV_FILE_BYTES = 2 * 1024 * 1024;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type MemberInvite = {
  id: string;
  email: string;
  role: string;
};

type BulkInviteRow = {
  email: string;
  role: string;
};

type TeamSetupViewProps = {
  selectedGroups: string[];
  scanSummary?: ScanConfigurationSummary | null;
  onInvitesChange?: (recipients: InviteRecipient[]) => void;
  hideChrome?: boolean;
};

export function TeamSetupView({
  selectedGroups,
  scanSummary,
  onInvitesChange,
  hideChrome,
}: TeamSetupViewProps) {
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  const [members, setMembers] = useState<MemberInvite[]>([]);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkRows, setBulkRows] = useState<BulkInviteRow[]>([]);
  const [bulkUploadError, setBulkUploadError] = useState<string | null>(null);
  const [editingBulkIndex, setEditingBulkIndex] = useState<number | null>(null);
  const [editingBulkRole, setEditingBulkRole] = useState('');
  const [editingManualIndex, setEditingManualIndex] = useState<number | null>(null);
  const [editingManualRole, setEditingManualRole] = useState('');
  const [draftEmail, setDraftEmail] = useState('');
  const [draftRole, setDraftRole] = useState('');
  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({});
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [createProjectError, setCreateProjectError] = useState<string | null>(null);
  const [createProjectSuccess, setCreateProjectSuccess] = useState<string | null>(null);
  const [roleOptions, setRoleOptions] = useState<Array<{ value: string; label: string }>>([
    { value: 'Member', label: 'Member' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Project Admin', label: 'Project Admin' },
    { value: 'Assessor', label: 'Assessor' },
  ]);
  const roleOptionsRef = useRef(roleOptions);
  roleOptionsRef.current = roleOptions;

  const mapBulkRoleToken = (raw: string) => {
    const t = raw.trim();
    if (!t) return roleOptionsRef.current[0]?.value ?? '';
    if (UUID_RE.test(t)) return t;
    const opts = roleOptionsRef.current;
    const byLabel = opts.find((o) => o.label.toLowerCase() === t.toLowerCase());
    if (byLabel) return byLabel.value;
    return opts[0]?.value ?? t;
  };

  const roleLabel = (value: string) =>
    roleOptions.find((o) => o.value === value)?.label ?? value;

  const selectedScan =
    complianceGroups.find((g) => selectedGroups.includes(g.id)) || complianceGroups[0];

  const isExternalVAProject = selectedGroups.includes('external-va-scan');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await apiService.get<{
          success: boolean;
          data: Array<{ id: string; name: string }>;
        }>(APPLICATION_ROLES_API);
        const roles = res?.data || [];
        if (cancelled) return;

        if (roles.length) {
          const mapped = roles.map((r) => ({
            value: r.id,
            label: r.name,
          }));
          setRoleOptions(mapped);
          setDraftRole((d) => {
            if (!d) return mapped[0].value;
            if (UUID_RE.test(d)) return d;
            const byLabel = mapped.find(
              (o) => o.label.toLowerCase() === String(d).trim().toLowerCase(),
            );
            return byLabel?.value ?? mapped[0].value;
          });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[Roles] Failed to load roles:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /** When application roles load, replace label-only role values with real role UUIDs on existing rows */
  useEffect(() => {
    const hasUuidOptions = roleOptions.some((o) => UUID_RE.test(o.value));
    if (!hasUuidOptions || !roleOptions.length) return;

    const toId = (raw: string) => {
      const t = raw.trim();
      if (UUID_RE.test(t)) return t;
      const byLabel = roleOptions.find(
        (o) => o.label.toLowerCase() === t.toLowerCase(),
      );
      return byLabel?.value ?? roleOptions[0]?.value ?? t;
    };

    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        role: toId(m.role),
      })),
    );
    setBulkRows((prev) =>
      prev.map((r) => ({
        ...r,
        role: toId(r.role),
      })),
    );
    setDraftRole((d) => (d ? toId(d) : roleOptions[0]?.value ?? d));
  }, [roleOptions]);

  const canTriggerCreate = () => {
    if (!selectedGroups?.length) return false;
    if (!scanSummary) return false;
    if (!scanSummary.projectName?.trim() || !scanSummary.projectKey?.trim()) return false;
    const isPCIProject = selectedGroups.includes('pci-asv-scan');
    if (isPCIProject) return Boolean(scanSummary.certificationDate);
    if (isExternalVAProject)
      return Boolean(scanSummary.scanFrequency) && Boolean(scanSummary.startDate);
    return true;
  };

  const handleCreateProjectClick = async () => {
    // eslint-disable-next-line no-console
    console.log('[Create Project] selectedGroups:', selectedGroups);
    // eslint-disable-next-line no-console
    console.log('[Create Project] scanSummary:', scanSummary);

    if (!canTriggerCreate()) {
      setCreateProjectError('Please complete the required fields before creating the project.');
      setCreateProjectSuccess(null);
      return;
    }

    setCreateProjectError(null);
    setCreateProjectSuccess(null);

    try {
      setIsCreatingProject(true);
      const result = await createProjectFromSidebar(selectedGroups, scanSummary);
      // eslint-disable-next-line no-console
      console.log('[Create Project] createProjectFromSidebar result:', result);
      setCreateProjectSuccess('Project created successfully.');
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error('[Create Project] failed:', err);
      const e = err as Error & { data?: { message?: string } };
      setCreateProjectError(e?.data?.message || e?.message || 'Failed to create project.');
    } finally {
      setIsCreatingProject(false);
    }
  };

  useEffect(() => {
    if (!onInvitesChange) return;

    /** Map dropdown value or CSV token to application role UUID for project_members.role_id */
    const resolveRoleId = (roleVal: string): string | undefined => {
      const t = roleVal.trim();
      if (!t) return undefined;
      if (UUID_RE.test(t)) return t;
      const byValue = roleOptions.find((o) => o.value === t);
      if (byValue && UUID_RE.test(byValue.value)) return byValue.value;
      const byLabel = roleOptions.find(
        (o) => o.label.toLowerCase() === t.toLowerCase(),
      );
      if (byLabel && UUID_RE.test(byLabel.value)) return byLabel.value;
      return undefined;
    };

    const toRecipient = (email: string, roleVal: string): InviteRecipient => {
      const id = resolveRoleId(roleVal);
      const raw = roleVal.trim();
      const opt = id ? roleOptions.find((o) => o.value === id) : undefined;
      const roleName =
        opt?.label ?? (!UUID_RE.test(raw) && raw ? raw : undefined);
      return { email, roleId: id, roleName };
    };

    const manualRecipients = members
      .filter((m) => m.email)
      .map((m) => toRecipient(m.email, m.role));

    const bulkRecipients = bulkRows
      .filter((r) => r.email)
      .map((r) => toRecipient(r.email, r.role));

    onInvitesChange([...manualRecipients, ...bulkRecipients]);
  }, [members, bulkRows, onInvitesChange, roleOptions]);

  const handleAddMember = () => {
    const error = getInviteEmailValidationError(draftEmail);
    if (error) {
      setEmailErrors((prev) => ({ ...prev, draft: error }));
      return;
    }

    const newMember: MemberInvite = {
      id: Date.now().toString(),
      email: draftEmail.trim(),
      role: draftRole,
    };
    setMembers([...members, newMember]);
    setDraftEmail('');
    setDraftRole(roleOptions[0]?.value ?? '');
    setEmailErrors((prev) => {
      const next = { ...prev };
      delete next.draft;
      return next;
    });
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleDraftEmailChange = (email: string) => {
    setDraftEmail(email);
    setEmailErrors((prev) => {
      const next = { ...prev };
      const error = getInviteEmailValidationError(email);
      if (error) {
        next.draft = error;
      } else {
        delete next.draft;
      }
      return next;
    });
  };

  const bulkFileInputId = 'bulk-upload-input';

  const parseBulkFile = (file: File | null) => {
    setBulkFile(file);
    setBulkUploadError(null);

    if (!file) {
      setBulkRows([]);
      return;
    }

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith('.csv')) {
      setBulkUploadError('Please upload a .csv file.');
      setBulkRows([]);
      setBulkFile(null);
      return;
    }

    if (file.size > MAX_CSV_FILE_BYTES) {
      setBulkUploadError('File is too large (max 2 MB).');
      setBulkRows([]);
      setBulkFile(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) {
        setBulkRows([]);
        setBulkUploadError('The file is empty.');
        return;
      }

      const [header, ...dataLines] = lines;
      const headerParts = header.split(',').map((h) => h.trim().toLowerCase());
      const emailIndex = headerParts.indexOf('email');
      const roleIndex = headerParts.indexOf('role');

      if (emailIndex < 0) {
        setBulkRows([]);
        setBulkUploadError('CSV must include an "email" column in the header row.');
        return;
      }

      if (dataLines.length > MAX_BULK_INVITE_ROWS) {
        setBulkRows([]);
        setBulkUploadError(
          `Too many rows (max ${MAX_BULK_INVITE_ROWS} invite rows per file).`,
        );
        return;
      }

      const parsed: BulkInviteRow[] = [];
      const seenEmails = new Set<string>();
      for (let i = 0; i < dataLines.length; i += 1) {
        const line = dataLines[i];
        const parts = line.split(',');
        const email = parts[emailIndex]?.trim() || '';
        const rawRole = (roleIndex >= 0 ? parts[roleIndex] : undefined)?.trim() || '';
        const role = mapBulkRoleToken(rawRole);
        if (!email) {
          continue;
        }
        const emailErr = getInviteEmailValidationError(email);
        if (emailErr) {
          setBulkRows([]);
          setBulkUploadError(`Row ${i + 2}: ${emailErr}`);
          return;
        }
        const key = email.toLowerCase();
        if (seenEmails.has(key)) {
          continue;
        }
        seenEmails.add(key);
        parsed.push({ email, role });
      }

      if (parsed.length === 0) {
        setBulkUploadError('No valid email rows found.');
        setBulkRows([]);
        return;
      }

      setBulkRows(parsed);
    };
    reader.readAsText(file);
  };

  const handleBulkFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    parseBulkFile(file);
  };

  const handleBulkUploadClick = () => {
    const input = document.getElementById(bulkFileInputId) as HTMLInputElement | null;
    input?.click();
  };

  const handleBulkDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    parseBulkFile(file);
  };

  const handleDownloadSampleCsv = () => {
    const csvContent = 'email,role\nalice@company.com,Admin\nbob@company.com,Member\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team-invite-sample.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const renderManualInvite = () => {
    return (
      <>
        <div>
          <div style={styles.inviteRow}>
            <div style={styles.inviteEmailInput}>
              <input
                type="email"
                style={{
                  ...styles.inviteInput,
                  ...(emailErrors.draft ? styles.inviteInputError : {}),
                }}
                placeholder="name@company.com"
                value={draftEmail}
                onChange={(e) => handleDraftEmailChange(e.target.value)}
                onBlur={(e) => handleDraftEmailChange(e.target.value)}
              />
            </div>
            <div style={styles.inviteRoleSelect}>
              <SelectInput
                value={draftRole}
                options={roleOptions}
                onChange={(value) => setDraftRole(value)}
                placeholder="Role"
                width="sm"
              />
            </div>
            <button type="button" style={styles.inviteAddButton} onClick={handleAddMember}>
              <Plus />
              Add
            </button>
          </div>
          {emailErrors.draft && <div style={styles.inviteErrorText}>{emailErrors.draft}</div>}
        </div>

        {members.length > 0 && (
          <div style={{ marginTop: spacing[4] }}>
            <div style={styles.manualTableWrapper}>
              <div style={styles.bulkTableHeader}>
                <div>Email</div>
                <div>Role</div>
                <div style={{ textAlign: 'right' }}>Actions</div>
              </div>
              {members.map((member, index) => (
                <div key={member.id} style={styles.bulkTableRow}>
                  <div>{member.email}</div>
                  <div>
                    {editingManualIndex === index ? (
                      <SelectInput
                        value={editingManualRole || member.role}
                        options={roleOptions}
                        onChange={(value) => setEditingManualRole(value)}
                        width="sm"
                      />
                    ) : (
                      roleLabel(member.role)
                    )}
                  </div>
                  <div style={styles.bulkActionCell}>
                    {editingManualIndex === index ? (
                      <button
                        type="button"
                        style={styles.bulkActionButton}
                        onClick={() => {
                          const next = [...members];
                          next[index] = {
                            ...next[index],
                            role: editingManualRole || next[index].role,
                          };
                          setMembers(next);
                          setEditingManualIndex(null);
                          setEditingManualRole('');
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          style={styles.bulkActionButton}
                          onClick={() => {
                            setEditingManualIndex(index);
                            setEditingManualRole(member.role);
                          }}
                        >
                          <Edit />
                        </button>
                        <button
                          type="button"
                          style={styles.bulkActionButton}
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderInviteMembersSection = () => {
    return (
      <>
        <div style={styles.header}>
          <h3 style={styles.title}>Invite members</h3>
          <p style={styles.description}>
            Send email invitations to new members to collaborate on this project.
          </p>
        </div>

        <div>
          <div style={styles.sectionLabel}>Invite members</div>

          <div style={styles.inviteTabs}>
            <button
              type="button"
              style={styles.inviteTab(activeTab === 'manual')}
              onClick={() => setActiveTab('manual')}
            >
              Manual Invite
            </button>
            <button
              type="button"
              style={styles.inviteTab(activeTab === 'bulk')}
              onClick={() => setActiveTab('bulk')}
            >
              Bulk Upload
            </button>
          </div>

          {activeTab === 'manual' ? (
            renderManualInvite()
          ) : (
            <div style={styles.bulkUploadArea}>
              <input
                id={bulkFileInputId}
                type="file"
                accept=".csv,text/csv"
                style={styles.bulkHiddenInput}
                onChange={handleBulkFileChange}
              />

              <div
                style={styles.bulkUploadDropzone}
                onClick={handleBulkUploadClick}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleBulkDrop}
              >
                <div style={styles.bulkUploadIcon}>
                  <UploadCloud />
                </div>
                <div style={styles.bulkUploadTitle}>
                  {bulkFile ? bulkFile.name : 'Click to upload or drag & drop'}
                </div>
                <div style={styles.bulkUploadSubtitle}>
                  CSV only (max {MAX_BULK_INVITE_ROWS} rows, 2 MB)
                </div>
              </div>

              {bulkUploadError && (
                <div style={styles.inviteErrorText}>{bulkUploadError}</div>
              )}

              <button
                type="button"
                style={styles.bulkDownloadLink}
                onClick={handleDownloadSampleCsv}
              >
                <Download />
                <span>Download sample CSV</span>
              </button>

              {bulkRows.length > 0 && (
                <div style={styles.bulkTableWrapper}>
                  <div style={styles.bulkTableHeader}>
                    <div>Email</div>
                    <div>Role</div>
                    <div style={{ textAlign: 'right' }}>Actions</div>
                  </div>
                  {bulkRows.map((row, index) => (
                    <div key={`${row.email}-${index}`} style={styles.bulkTableRow}>
                      <div>{row.email}</div>
                      <div>
                        {editingBulkIndex === index ? (
                          <SelectInput
                            value={editingBulkRole || row.role}
                            options={roleOptions}
                            onChange={(value) => setEditingBulkRole(value)}
                            width="sm"
                          />
                        ) : (
                          roleLabel(row.role)
                        )}
                      </div>
                      <div style={styles.bulkActionCell}>
                        {editingBulkIndex === index ? (
                          <button
                            type="button"
                            style={styles.bulkActionButton}
                            onClick={() => {
                              const next = [...bulkRows];
                              next[index] = {
                                ...next[index],
                                role: editingBulkRole || next[index].role,
                              };
                              setBulkRows(next);
                              setEditingBulkIndex(null);
                              setEditingBulkRole('');
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="button"
                            style={styles.bulkActionButton}
                            onClick={() => {
                              setEditingBulkIndex(index);
                              setEditingBulkRole(row.role);
                            }}
                          >
                            <Edit />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={styles.inviteHelperRow}>
                <UserPlus />
                <span>You can also invite members later from the Project Settings page.</span>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  if (hideChrome) {
    return <div>{renderInviteMembersSection()}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.stepperWrapper}>
        <div style={styles.stepsHeader}>
          {steps.map((step) => {
            const isActive = step.id <= 3;
            return (
              <div key={step.id} style={styles.stepItem}>
                <div style={styles.stepUnderline(isActive)} />
                <div style={styles.stepTopRow}>
                  <div style={styles.stepNumberCircle(isActive)}>{step.id}</div>
                  <span style={styles.stepLabel(isActive)}>{step.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.layout}>
        <div style={styles.mainContent}>
          {renderInviteMembersSection()}
        </div>

        <div style={styles.sidebar}>
          <div style={{ marginBottom: spacing[4] }}>
            <div style={styles.summaryHeader}>
              <h4 style={styles.summaryTitle}>Project Summary</h4>
              <span style={styles.stepIndicator}>Step 3 of 3</span>
            </div>
          </div>

          <div style={styles.summarySidebar}>
            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Project Type</div>
              <div style={styles.summaryValue}>{selectedScan.title}</div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Name</div>
              <div
                style={scanSummary?.projectName ? styles.summaryValue : styles.summaryValueMuted}
              >
                {scanSummary?.projectName || '—'}
              </div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Key</div>
              <div style={scanSummary?.projectKey ? styles.summaryValue : styles.summaryValueMuted}>
                {scanSummary?.projectKey || '—'}
              </div>
            </div>

            {isExternalVAProject && (
              <div style={styles.summarySection}>
                <div style={styles.summaryLabel}>Frequency</div>
                <div
                  style={
                    scanSummary?.scanFrequency ? styles.summaryValue : styles.summaryValueMuted
                  }
                >
                  {scanSummary?.scanFrequency
                    ? scanSummary.scanFrequency.charAt(0).toUpperCase() +
                      scanSummary.scanFrequency.slice(1)
                    : '—'}
                </div>
              </div>
            )}

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>
                {isExternalVAProject ? 'Start' : 'Certification Date'}
              </div>
              <div
                style={
                  (isExternalVAProject
                    ? scanSummary?.startDate
                    : scanSummary?.certificationDate)
                    ? styles.summaryValue
                    : styles.summaryValueMuted
                }
              >
                {isExternalVAProject
                  ? scanSummary?.startDate || '—'
                  : scanSummary?.certificationDate || '—'}
              </div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Invites</div>
              <div style={styles.summaryValue}>
                {(() => {
                  const manualCount = members.filter((m) => m.email).length;
                  const bulkCount = bulkRows.length;
                  const total = manualCount + bulkCount;
                  return `${total} member${total === 1 ? '' : 's'}`;
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

