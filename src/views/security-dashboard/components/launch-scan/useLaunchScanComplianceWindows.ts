import { useEffect, useState } from 'react';
import { apiService } from '../../../../api/api.service';
import type { ProjectComplianceWindowDto } from './launchScanCompliance.types';

/**
 * Loads compliance windows for a project when the launch-scan drawer is open.
 * Org scope comes from x-organization-id on the API client.
 */
export function useLaunchScanComplianceWindows(
  projectId: string | undefined,
  drawerOpen: boolean,
) {
  const [windows, setWindows] = useState<ProjectComplianceWindowDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedWindowId, setSelectedWindowId] = useState('');

  useEffect(() => {
    if (!drawerOpen) {
      setWindows([]);
      setSelectedWindowId('');
      setError(null);
      setLoading(false);
      return;
    }

    if (!projectId?.trim()) {
      setWindows([]);
      setSelectedWindowId('');
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await apiService.get<{
          success?: boolean;
          data?: ProjectComplianceWindowDto[];
        }>(`/api/projects/${encodeURIComponent(projectId.trim())}/compliance-windows`);
        const rows = Array.isArray(res?.data) ? res.data : [];
        if (!cancelled) {
          setWindows(rows);
        }
      } catch {
        if (!cancelled) {
          setWindows([]);
          setError('Could not load compliance windows for this project.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [drawerOpen, projectId]);

  useEffect(() => {
    if (windows.length === 0) {
      setSelectedWindowId('');
      return;
    }
    setSelectedWindowId((prev) => {
      if (prev && windows.some((w) => w.id === prev)) return prev;
      const current = windows.find((w) => w.is_current);
      return current?.id ?? windows[0].id;
    });
  }, [windows]);

  const selectedWindow =
    windows.find((w) => w.id === selectedWindowId) ?? null;

  return {
    complianceWindows: windows,
    complianceWindowsLoading: loading,
    complianceWindowsError: error,
    selectedComplianceWindowId: selectedWindowId,
    setSelectedComplianceWindowId: setSelectedWindowId,
    selectedComplianceWindow: selectedWindow,
  };
}
