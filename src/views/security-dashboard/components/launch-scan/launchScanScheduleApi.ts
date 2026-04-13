import { apiService } from '../../../../api/api.service';

/**
 * POST /api/projects/:projectId/schedules
 *
 * Maps to DB (backend create logic):
 * - project_scan_schedules: project_id (from URL), compliance_window_id, scan_name, scan_mode,
 *   scheduled_date, scheduled_time, timezone, scan_window_type, window_*, status SCHEDULED
 * - scan_assets: one row per asset_ids[] → scan_run_id = new schedule id, asset_id, PENDING
 */
export type CreateScanSchedulePayload = {
  compliance_window_id: string;
  scan_name: string;
  scan_mode: 'FULL' | 'RESCAN';
  scheduled_date: string;
  scheduled_time: string;
  timezone: string;
  scan_window_type: 'OFF_HOURS' | 'NONE';
  window_start_time?: string;
  window_end_time?: string;
  asset_ids: string[];
};

export type LaunchScanScheduleUiParams = {
  complianceWindowId: string;
  scanName: string;
  scanMode: 'full' | 'rescan';
  scheduledDate: string;
  scheduledTime: string;
  timezone: string;
  scanWindow: 'none' | 'off-hours' | 'business-hours' | 'custom';
  assetIds: string[];
};

function toApiTimeHHmm(value: string): string {
  const s = value.trim();
  const m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (m) {
    return `${m[1].padStart(2, '0')}:${m[2]}`;
  }
  return s.length >= 5 ? s.slice(0, 5) : s;
}

/**
 * Maps UI launch-scan state to API payload. Backend allows scan_window_type NONE | OFF_HOURS only.
 */
export function buildCreateScanSchedulePayload(
  params: LaunchScanScheduleUiParams,
): CreateScanSchedulePayload {
  const scan_mode: 'FULL' | 'RESCAN' =
    params.scanMode === 'rescan' ? 'RESCAN' : 'FULL';

  let scan_window_type: 'NONE' | 'OFF_HOURS' = 'NONE';
  let window_start_time: string | undefined;
  let window_end_time: string | undefined;

  if (params.scanWindow === 'none') {
    scan_window_type = 'NONE';
  } else if (params.scanWindow === 'off-hours') {
    scan_window_type = 'OFF_HOURS';
    window_start_time = '22:00';
    window_end_time = '06:00';
  } else if (params.scanWindow === 'business-hours') {
    scan_window_type = 'OFF_HOURS';
    window_start_time = '09:00';
    window_end_time = '17:00';
  } else {
    scan_window_type = 'OFF_HOURS';
    window_start_time = '22:00';
    window_end_time = '06:00';
  }

  const scheduled_time = toApiTimeHHmm(params.scheduledTime);

  const base: CreateScanSchedulePayload = {
    compliance_window_id: params.complianceWindowId.trim(),
    scan_name: params.scanName.trim() || 'ASV Scan',
    scan_mode,
    scheduled_date: params.scheduledDate.trim(),
    scheduled_time,
    timezone: params.timezone.trim(),
    scan_window_type,
    asset_ids: params.assetIds.map((id) => id.trim()).filter(Boolean),
  };

  if (scan_window_type === 'OFF_HOURS' && window_start_time && window_end_time) {
    base.window_start_time = window_start_time;
    base.window_end_time = window_end_time;
  }

  return base;
}

export async function createProjectScanSchedule(
  projectId: string,
  payload: CreateScanSchedulePayload,
): Promise<unknown> {
  return apiService.post(
    `/api/projects/${encodeURIComponent(projectId.trim())}/schedules`,
    payload,
  );
}
