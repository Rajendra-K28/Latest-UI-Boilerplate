import { apiService } from '../../../api/api.service';
import { AuthContext } from '../../../auth/authContext';
import { OrgContext } from '../../../organization/orgContext';
import type { ScanConfigurationSummary } from './shared';

const PROJECT_KEY_RE = /^[A-Z0-9-]+$/;
const INVITE_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_BULK_INVITE_ROWS = 500;

/** Postgres `roles` for project_members — NOT `GET /api/roles` (that is org user-roles). */
export const APPLICATION_ROLES_API = '/api/rolesdata';

/** Empty string if valid; otherwise user-facing error */
export function getInviteEmailValidationError(email: string): string {
  const t = email.trim();
  if (!t) return 'Enter an email address';
  if (t.length > 254) return 'Email is too long';
  if (!INVITE_EMAIL_PATTERN.test(t)) return 'Enter a valid email address';
  return '';
}

function validateCreateProjectScanSummary(scanSummary: ScanConfigurationSummary): void {
  const name = scanSummary.projectName?.trim() ?? '';
  if (name.length < 3) {
    throw new Error('Project name must be at least 3 characters.');
  }
  if (name.length > 255) {
    throw new Error('Project name must be at most 255 characters.');
  }
  const rawKey = scanSummary.projectKey?.trim() ?? '';
  const key = rawKey.toUpperCase().replaceAll(/[^A-Z0-9-]/g, '-');
  if (key.length < 3) {
    throw new Error('Project key must be at least 3 characters.');
  }
  if (key.length > 50) {
    throw new Error('Project key must be at most 50 characters.');
  }
  if (!PROJECT_KEY_RE.test(key)) {
    throw new Error('Project key may only contain A–Z, 0–9, and dashes.');
  }
}

function splitNameFromEmail(email: string): { firstName: string; lastName: string } {
  const localPart = email.split('@')[0] || '';
  const [firstNameRaw, lastNameRaw] = localPart.split(/[._-]/);
  const firstName = firstNameRaw
    ? firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1)
    : '';
  const lastName = lastNameRaw
    ? lastNameRaw.charAt(0).toUpperCase() + lastNameRaw.slice(1)
    : '';
  return { firstName, lastName };
}

type CreateProjectPayload = {
  organization_id: string;
  project_type_id: string;
  name: string;
  key: string;
  pci_anniversary_month?: number | null;
  pci_anniversary_day?: number | null;
  standard?: string | null;
  created_by_user_id: string;
  /** FK to roles.id for creator row in project_members */
  creator_role_id?: string;
};

export async function createProjectFromSidebar(
  selectedGroups: string[],
  scanSummary: ScanConfigurationSummary | null | undefined,
) {
  if (!scanSummary) {
    throw new Error('Missing scan configuration summary');
  }

  validateCreateProjectScanSummary(scanSummary);

  const user = AuthContext.getUser();
  const orgData = OrgContext.getOrganizationData();

  if (!user?.dbUserId) {
    throw new Error('User not authenticated');
  }

  if (!orgData?._id) {
    throw new Error('Organization not selected');
  }

  const isPCIProject = selectedGroups.includes('pci-asv-scan');
  const isExternalVAProject = selectedGroups.includes('external-va-scan');

  if (!isPCIProject && !isExternalVAProject) {
    throw new Error('Project type not selected');
  }

  const projectTypesRes = await apiService.get<{
    success: boolean;
    data: Array<{ id: string; code: string; name: string; standard?: string | null; is_active?: boolean }>;
  }>('/api/project-types');
  const projectTypes = projectTypesRes?.data || [];
  // eslint-disable-next-line no-console
  console.log(projectTypes, 'projectTypes');

  const wanted = isPCIProject ? 'PCI' : 'EXT_VA';
  const matched =
    projectTypes.find((pt) => (pt.is_active ?? true) && pt.code?.toUpperCase().includes(wanted)) ||
    projectTypes.find((pt) => pt.is_active ?? true);

  if (!matched?.id) {
    throw new Error('No project types available from API');
  }

  const project_type_id = matched.id;

  let pci_anniversary_month: number | null = null;
  let pci_anniversary_day: number | null = null;
  let standard: string | null = matched.standard ?? null;

  if (isPCIProject && scanSummary.certificationDate) {
    const certDate = new Date(scanSummary.certificationDate);
    if (!Number.isNaN(certDate.getTime())) {
      pci_anniversary_month = certDate.getMonth() + 1;
      pci_anniversary_day = certDate.getDate();
      standard = 'PCI DSS v4.0';
    }
  }

  if (!standard) {
    // Backend requires `standard` (non-empty)
    standard = isExternalVAProject ? 'OWASP' : 'PCI DSS v4.0';
  }
  standard = standard.trim();
  if (standard.length > 200) {
    throw new Error('Standard / compliance label must be at most 200 characters.');
  }

  const key = scanSummary.projectKey
    .trim()
    .toUpperCase()
    .replaceAll(/[^A-Z0-9-]/g, '-');

  let creator_role_id: string | undefined;
  try {
    const rolesRes = await apiService.get<{
      success: boolean;
      data: Array<{ id: string; name: string }>;
    }>(APPLICATION_ROLES_API);
    const roles = rolesRes?.data || [];
    creator_role_id =
      roles.find((r) => r.name === 'Project Admin')?.id ||
      roles.find((r) => r.name === 'Admin')?.id ||
      roles.find((r) => r.name === 'Member')?.id ||
      roles[0]?.id;
  } catch {
    /* backend will resolve default role from DB */
  }

  const payload: CreateProjectPayload = {
    organization_id: orgData._id,
    project_type_id,
    name: scanSummary.projectName.trim(),
    key,
    pci_anniversary_month,
    pci_anniversary_day,
    standard,
    created_by_user_id: user.dbUserId,
    ...(creator_role_id ? { creator_role_id } : {}),
  };
  // eslint-disable-next-line no-console
  console.log('Create Project payload:', payload);

  const response = await apiService.post('/api/projects', payload);
  // eslint-disable-next-line no-console
  console.log('✅ Create Project response:', response);

  return response;
}

export type InviteRecipient = {
  email: string;
  roleId?: string;
  /** `roles.name` — sent as `role_name` if UUID missing or invalid */
  roleName?: string;
};

export type InviteSendResult = {
  email: string;
  ok: boolean;
  userId?: string;
  error?: string;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Parse invitee user UUID from account-service response.
 * Avoids generic `id` (often invitation or inviter). Rejects value equal to inviter DB id.
 */
function extractInvitedUserId(
  body: unknown,
  rejectIfMatchesInviterId?: string,
): string | undefined {
  if (body == null) return undefined;
  if (typeof body === 'string' && UUID_RE.test(body)) return body;
  if (typeof body !== 'object') return undefined;
  const o = body as Record<string, unknown>;
  const pick = (v: unknown) => (typeof v === 'string' && UUID_RE.test(v) ? v : undefined);
  const ok = (id: string | undefined) =>
    id && (!rejectIfMatchesInviterId || id !== rejectIfMatchesInviterId) ? id : undefined;

  const nested =
    o.data && typeof o.data === 'object' ? (o.data as Record<string, unknown>) : null;
  const nestedUser =
    nested?.user && typeof nested.user === 'object'
      ? (nested.user as Record<string, unknown>)
      : null;

  const ordered: Array<string | undefined> = [
    pick(o.invitedUserId),
    pick(o.inviteeUserId),
    pick(o.targetUserId),
    pick(o.newUserId),
    pick(o.userId),
    pick(o.user_id),
    nested ? pick(nested.invitedUserId) : undefined,
    nested ? pick(nested.inviteeUserId) : undefined,
    nested ? pick(nested.userId) : undefined,
    nested ? pick(nested.user_id) : undefined,
    nestedUser ? pick(nestedUser.id) : undefined,
    nestedUser ? pick(nestedUser.userId) : undefined,
  ];

  for (const id of ordered) {
    const v = ok(id);
    if (v) return v;
  }
  return undefined;
}

export async function sendProjectInvites(
  recipients: Array<string | InviteRecipient>,
  options?: {
    redirectUrl?: string;
    frontendUrl?: string;
    addedByUserId?: string;
    /** When set, CVM creates project_members from users.id (lookup by invite email) after invite */
    projectId?: string;
  },
): Promise<InviteSendResult[]> {
  if (!recipients.length) return [];

  const frontendUrl = options?.frontendUrl || globalThis.location.origin;
  const redirectUrl = options?.redirectUrl || `${frontendUrl}/accept-invite`;
  const addedByUserId = options?.addedByUserId || AuthContext.getUser()?.dbUserId;
  const inviter = AuthContext.getUser();
  const invited_by =
    inviter?.email?.trim() ||
    inviter?.preferredUsername?.trim() ||
    undefined;
  if (!invited_by) {
    throw new Error(
      'invited_by is required: sign in with an email (or username) so invites can be attributed',
    );
  }

  let defaultRoleId: string | undefined;
  try {
    const rolesRes = await apiService.get<{
      success: boolean;
      data: Array<{ id: string; name: string }>;
    }>(APPLICATION_ROLES_API);
    // eslint-disable-next-line no-console
    console.log(rolesRes, 'rolesRes');

    const roles = rolesRes?.data || [];
    const preferred =
      roles.find((r) => r.name === 'Member') ||
      roles.find((r) => r.name === 'Admin') ||
      roles[0];
    defaultRoleId = preferred?.id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Invites] Failed to resolve roleId from application roles API:', err);
  }

  return Promise.all(
    recipients.map(async (recipient) => {
      const email = typeof recipient === 'string' ? recipient.trim() : recipient.email.trim();
      const emailErr = getInviteEmailValidationError(email);
      if (emailErr) {
        return { email: email || '', ok: false, error: emailErr };
      }
      const rec = typeof recipient === 'string' ? undefined : recipient;
      const recipientRoleId =
        typeof recipient === 'string' ? defaultRoleId : recipient.roleId || defaultRoleId;

      const { firstName, lastName } = splitNameFromEmail(email);

      const payload = {
        email,
        firstName,
        lastName,
        redirectUrl,
        frontendUrl,
        invited_by,
        ...(recipientRoleId ? { roleId: recipientRoleId, role_id: recipientRoleId } : {}),
        ...(rec?.roleName ? { role_name: rec.roleName } : {}),
        added_by_user_id: addedByUserId,
        ...(options?.projectId ? { project_id: options.projectId } : {}),
      };

      // eslint-disable-next-line no-console
      console.log('📤 Invite Payload:\n', JSON.stringify(payload, null, 2));

      try {
        const response = await apiService.post<unknown>('/api/invite/users', payload);
        const userId = extractInvitedUserId(response, addedByUserId);
        // eslint-disable-next-line no-console
        console.log('✅ Invite Success:', { email, userId });
        return { email, ok: true, userId };
      } catch (error: unknown) {
        const err = error as Error & { data?: { message?: string }; message?: string };
        // eslint-disable-next-line no-console
        console.error('❌ Invite Failed:', {
          email,
          error: err?.data?.message || err?.message,
        });
        return {
          email,
          ok: false,
          error: err?.data?.message || err?.message || 'Invite failed',
        };
      }
    }),
  );
}

type BulkInviteApiRow = { email: string; ok: boolean; error?: string };

function mapBulkInviteResponseToResults(
  recipients: InviteRecipient[],
  response: unknown,
): InviteSendResult[] {
  const o = response as { projectMembers?: BulkInviteApiRow[] } | null;
  const byEmail = new Map<string, BulkInviteApiRow>();
  for (const m of o?.projectMembers ?? []) {
    byEmail.set(m.email.trim().toLowerCase(), m);
  }
  return recipients.map((r) => {
    const trimmed = r.email.trim();
    const pm = byEmail.get(trimmed.toLowerCase());
    if (pm) {
      return {
        email: trimmed,
        ok: pm.ok,
        error: pm.ok ? undefined : pm.error,
      };
    }
    return { email: trimmed, ok: true };
  });
}

/**
 * Bulk path: one account-service call + server adds each invitee to project_members (same as N× single).
 */
export async function sendBulkProjectInvites(
  recipients: InviteRecipient[],
  options?: {
    redirectUrl?: string;
    frontendUrl?: string;
    addedByUserId?: string;
    projectId?: string;
  },
): Promise<InviteSendResult[]> {
  if (!recipients.length) return [];

  const frontendUrl = options?.frontendUrl || globalThis.location.origin;
  const redirectUrl = options?.redirectUrl || `${frontendUrl}/accept-invite`;
  const addedByUserId = options?.addedByUserId || AuthContext.getUser()?.dbUserId;
  const inviter = AuthContext.getUser();
  const invited_by =
    inviter?.email?.trim() ||
    inviter?.preferredUsername?.trim() ||
    undefined;
  if (!invited_by) {
    throw new Error(
      'invited_by is required: sign in with an email (or username) so invites can be attributed',
    );
  }
  if (!addedByUserId) {
    throw new Error('User not authenticated');
  }
  if (!options?.projectId) {
    throw new Error('projectId is required for bulk project invites');
  }

  const prep: InviteSendResult[] = [];
  const valid: InviteRecipient[] = [];
  for (const r of recipients) {
    const err = getInviteEmailValidationError(r.email);
    if (err) {
      prep.push({ email: r.email.trim(), ok: false, error: err });
    } else {
      valid.push({ ...r, email: r.email.trim() });
    }
  }
  if (valid.length === 0) {
    return prep;
  }
  if (valid.length > MAX_BULK_INVITE_ROWS) {
    throw new Error(`You can invite at most ${MAX_BULK_INVITE_ROWS} people at once.`);
  }

  let defaultRoleId: string | undefined;
  try {
    const rolesRes = await apiService.get<{
      success: boolean;
      data: Array<{ id: string; name: string }>;
    }>(APPLICATION_ROLES_API);
    const roles = rolesRes?.data || [];
    defaultRoleId =
      roles.find((role) => role.name === 'Member')?.id ||
      roles.find((role) => role.name === 'Admin')?.id ||
      roles[0]?.id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Invites] Failed to resolve roleId from application roles API:', err);
  }

  const invites = valid.map((recipient) => {
    const roleId = recipient.roleId || defaultRoleId;
    const { firstName, lastName } = splitNameFromEmail(recipient.email);
    return {
      email: recipient.email,
      firstName,
      lastName,
      ...(roleId ? { roleId, role_id: roleId } : {}),
      ...(recipient.roleName ? { role_name: recipient.roleName } : {}),
    };
  });

  const payload = {
    invites,
    invited_by,
    frontendUrl,
    redirectUrl,
    added_by_user_id: addedByUserId,
    project_id: options.projectId,
  };

  try {
    const response = await apiService.post<unknown>('/api/invite/bulk', payload);
    const bulkResults = mapBulkInviteResponseToResults(valid, response);
    return [...prep, ...bulkResults];
  } catch (error: unknown) {
    const err = error as Error & { data?: { message?: string } };
    const msg = err?.data?.message || err?.message || 'Bulk invite failed';
    return [
      ...prep,
      ...valid.map((r) => ({ email: r.email, ok: false, error: msg })),
    ];
  }
}

/**
 * Invites users and adds them to project_members: server looks up `users.id` by invitee email
 * and sets `project_members.user_id` (see POST /api/invite/users with project_id).
 */
export async function inviteAndAddProjectMembers(
  projectUuid: string,
  recipients: InviteRecipient[],
  options?: { redirectUrl?: string; frontendUrl?: string; addedByUserId?: string },
): Promise<InviteSendResult[]> {
  if (!recipients.length) return [];

  const addedBy =
    options?.addedByUserId || AuthContext.getUser()?.dbUserId;
  if (!addedBy) {
    throw new Error('User not authenticated');
  }

  if (recipients.length > MAX_BULK_INVITE_ROWS) {
    throw new Error(`You can invite at most ${MAX_BULK_INVITE_ROWS} people at once.`);
  }

  const normalized = recipients.map((r) => ({
    ...r,
    email: r.email.trim(),
  }));

  /**
   * Bulk account invite sends one payload; CVM still applies per-row roleId to project_members.
   * Use bulk only when every recipient has the **same** explicit roleId (or none — server default).
   * If invitees have **different** roleIds, use parallel single invites so each request carries the right role.
   */
  if (normalized.length > 1) {
    const keys = normalized.map((r) => (r.roleId || '').trim());
    const nonEmpty = keys.filter((k) => k.length > 0);
    const uniqueIds = new Set(nonEmpty);
    const allHaveRole = keys.every((k) => k.length > 0);
    const singleSharedRole = allHaveRole && uniqueIds.size === 1;
    const noneHaveRole = nonEmpty.length === 0;

    if (singleSharedRole || noneHaveRole) {
      return sendBulkProjectInvites(normalized, {
        ...options,
        addedByUserId: addedBy,
        projectId: projectUuid,
      });
    }
  }

  return sendProjectInvites(normalized, {
    ...options,
    addedByUserId: addedBy,
    projectId: projectUuid,
  });
}

