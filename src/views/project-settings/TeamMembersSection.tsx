import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  SearchInput,
  OwnerCell,
  ActionMenu,
  PaginationWithPageSize,
  SelectInput,
  Button,
} from '../../components';
import { apiService } from '../../api/api.service';
import type { ScanConfigurationSummary } from '../../sidebarViews/createProjectSidebarViews';
import { APPLICATION_ROLES_API } from '../../sidebarViews/createProjectSidebarViews/create-project/api';
import { InviteTeamButton } from '../project-dashboard/InviteTeamButton';
import { colors, spacing } from '../../design-system/tokens';
import { projectSettingsStyles } from './projectSettingsStyles';
import {
  fetchProjectMembers,
  removeProjectMember,
  updateProjectMemberRole,
  formatMemberLastActive,
  roleLabelToBadgeColor,
  type ProjectMemberApiRow,
} from './projectMembersApi';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type TeamMembersSectionProps = Readonly<{
  projectId: string;
  selectedGroups: string[];
  scanSummary: ScanConfigurationSummary;
  onNotify?: (toast: { title: string; message: string; variant: 'success' | 'error' | 'warning' }) => void;
}>;

export function TeamMembersSection({
  projectId,
  selectedGroups,
  scanSummary,
  onNotify,
}: TeamMembersSectionProps) {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [members, setMembers] = useState<ProjectMemberApiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [roleOptions, setRoleOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editRoleId, setEditRoleId] = useState('');
  const [savingRole, setSavingRole] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    const pid = projectId?.trim();
    if (!pid) {
      setMembers([]);
      setLoading(false);
      setLoadError('Missing project id');
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const rows = await fetchProjectMembers(pid);
      setMembers(rows);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to load team members';
      setLoadError(msg);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    void loadMembers();
  }, [loadMembers]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiService.get<{
          success: boolean;
          data: Array<{ id: string; name: string }>;
        }>(APPLICATION_ROLES_API);
        const roles = res?.data || [];
        if (cancelled || !roles.length) return;
        setRoleOptions(
          roles.map((r) => ({
            value: r.id,
            label: r.name,
          })),
        );
      } catch {
        if (!cancelled) setRoleOptions([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTeamMembers = useMemo(() => {
    const searchLower = searchValue.toLowerCase().trim();
    if (!searchLower) return members;
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower),
    );
  }, [searchValue, members]);

  const totalPages = Math.max(1, Math.ceil(filteredTeamMembers.length / itemsPerPage));
  const paginatedTeamMembers = filteredTeamMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const beginEdit = (m: ProjectMemberApiRow) => {
    setEditingMemberId(m.id);
    const match = roleOptions.find((o) => o.value === m.role_id);
    setEditRoleId(match?.value || m.role_id || roleOptions[0]?.value || '');
  };

  const cancelEdit = () => {
    setEditingMemberId(null);
    setEditRoleId('');
  };

  const saveRole = async (memberId: string) => {
    const pid = projectId.trim();
    const nextRole = editRoleId.trim();
    if (!pid || !UUID_RE.test(nextRole)) {
      onNotify?.({
        title: 'Cannot update role',
        message: 'Choose a valid role or wait for roles to load.',
        variant: 'warning',
      });
      return;
    }
    setSavingRole(true);
    try {
      await updateProjectMemberRole(pid, memberId, nextRole);
      onNotify?.({ title: 'Role updated', message: 'Member role was saved.', variant: 'success' });
      cancelEdit();
      await loadMembers();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to update role';
      onNotify?.({ title: 'Update failed', message: msg, variant: 'error' });
    } finally {
      setSavingRole(false);
    }
  };

  const handleDelete = async (m: ProjectMemberApiRow) => {
    const pid = projectId.trim();
    if (!pid) return;
    const ok = globalThis.confirm(`Remove ${m.name || m.email} from this project?`);
    if (!ok) return;
    setRemovingId(m.id);
    try {
      await removeProjectMember(pid, m.id);
      onNotify?.({
        title: 'Member removed',
        message: `${m.email} was removed from the project.`,
        variant: 'success',
      });
      await loadMembers();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to remove member';
      onNotify?.({ title: 'Remove failed', message: msg, variant: 'error' });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div
      style={{
        ...projectSettingsStyles.section,
        maxWidth: '100%',
      }}
    >
      <div style={projectSettingsStyles.teamHeader}>
        <div style={projectSettingsStyles.searchWrapper}>
          <SearchInput
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value);
              setCurrentPage(1);
            }}
            placeholder="Search Team Members..."
            width="sm"
          />
        </div>
        <InviteTeamButton
          selectedGroups={selectedGroups}
          scanSummary={scanSummary}
          label="Invite Members"
          variant="primary"
        />
      </div>

      {loadError && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: 8,
            background: '#FEF3F2',
            color: '#B42318',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap' as const,
          }}
        >
          <span>{loadError}</span>
          <Button label="Retry" variant="secondary" size="sm" onClick={() => void loadMembers()} />
        </div>
      )}

      {loading ? (
        <div style={{ padding: 24, color: colors.text.neutral.sub, fontSize: 14 }}>
          Loading team members…
        </div>
      ) : (
        <>
          <div style={projectSettingsStyles.table}>
            <div style={projectSettingsStyles.tableHeader}>
              <div>Name</div>
              <div>Email ID</div>
              <div>Role</div>
              <div>Last active</div>
              <div></div>
            </div>
            {paginatedTeamMembers.length === 0 ? (
              <div
                style={{
                  padding: spacing[6],
                  fontSize: 14,
                  color: colors.text.neutral.sub,
                  textAlign: 'center',
                }}
              >
                {members.length === 0
                  ? 'No team members yet. Invite people to collaborate.'
                  : 'No team members match your search.'}
              </div>
            ) : (
              paginatedTeamMembers.map((member, index) => (
                <div
                  key={member.id}
                  style={projectSettingsStyles.tableRow(index === paginatedTeamMembers.length - 1)}
                >
                  <div>
                    <OwnerCell name={member.name} />
                  </div>
                  <div style={{ fontSize: '14px', color: colors.text.neutral.sub }}>{member.email}</div>
                  <div>
                    {editingMemberId === member.id ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <SelectInput
                          value={editRoleId}
                          options={roleOptions.length ? roleOptions : [{ value: member.role_id, label: member.role }]}
                          onChange={(v) => setEditRoleId(v)}
                          placeholder="Role"
                          width="sm"
                        />
                        <button
                          type="button"
                          disabled={savingRole}
                          style={inlineBtn}
                          onClick={() => void saveRole(member.id)}
                        >
                          Save
                        </button>
                        <button type="button" disabled={savingRole} style={inlineBtnMuted} onClick={cancelEdit}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span style={projectSettingsStyles.roleBadge(roleLabelToBadgeColor(member.role))}>
                        • {member.role}
                      </span>
                    )}
                  </div>
                  <div style={projectSettingsStyles.lastActive}>
                    {formatMemberLastActive(member.last_login_at)}
                  </div>
                  <div style={{ opacity: removingId === member.id ? 0.5 : 1 }}>
                    <ActionMenu
                      onEdit={() => beginEdit(member)}
                      onDelete={() => void handleDelete(member)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <PaginationWithPageSize
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredTeamMembers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(n) => {
              setItemsPerPage(n);
              setCurrentPage(1);
            }}
          />
        </>
      )}
    </div>
  );
}

const inlineBtn: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  padding: '4px 10px',
  borderRadius: 6,
  border: '1px solid #D0D5DD',
  background: '#fff',
  cursor: 'pointer',
};

const inlineBtnMuted: CSSProperties = {
  ...inlineBtn,
  color: '#667085',
};
