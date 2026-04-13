import { apiService } from '../../api/api.service';

/** Matches GET /api/projects/:projectId/members `data[]` */
export type ProjectMemberApiRow = {
  id: string;
  project_id: string;
  user_id: string;
  role_id: string;
  role: string;
  email: string;
  name: string;
  last_login_at: string | null;
  joined_at: string;
};

type MembersListResponse = {
  success?: boolean;
  data?: ProjectMemberApiRow[];
};

export async function fetchProjectMembers(projectId: string): Promise<ProjectMemberApiRow[]> {
  const res = await apiService.get<MembersListResponse>(
    `/api/projects/${encodeURIComponent(projectId.trim())}/members`,
  );
  return Array.isArray(res?.data) ? res.data : [];
}

export async function removeProjectMember(
  projectId: string,
  memberId: string,
): Promise<void> {
  await apiService.delete(
    `/api/projects/${encodeURIComponent(projectId.trim())}/members/${encodeURIComponent(memberId.trim())}`,
  );
}

export async function updateProjectMemberRole(
  projectId: string,
  memberId: string,
  roleId: string,
): Promise<void> {
  await apiService.put(
    `/api/projects/${encodeURIComponent(projectId.trim())}/members/${encodeURIComponent(memberId.trim())}`,
    { role_id: roleId.trim() },
  );
}

export function formatMemberLastActive(iso: string | null | undefined): string {
  if (!iso) return 'Never';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function roleLabelToBadgeColor(role: string): string {
  const r = (role || '').toLowerCase();
  if (r.includes('owner')) return '#6941C6';
  if (r.includes('project admin')) return '#6941C6';
  if (r.includes('admin')) return '#175CD3';
  if (r.includes('assessor')) return '#DC6803';
  if (r.includes('member')) return '#175CD3';
  return '#344054';
}
