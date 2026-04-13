import { useEffect, useState } from 'react';
import { apiService } from '../../../../api/api.service';
import type { ScanTargetAsset } from './scanTargetAsset.types';
import { mapApiAssetsToScanTargets } from './launchScanAssetsApi';

/**
 * When the launch-scan drawer opens, loads active assets for the current org
 * (x-organization-id). No mock fallback — step 2 uses API data only.
 */
export function useLaunchScanTargetAssets(fetchEnabled: boolean) {
  const [assets, setAssets] = useState<ScanTargetAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fetchEnabled) {
      setAssets([]);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await apiService.get<{ success?: boolean; data?: unknown[] }>(
          '/api/assets',
        );
        const rows = Array.isArray(res?.data) ? res.data : [];
        const mapped = mapApiAssetsToScanTargets(rows);
        if (!cancelled) {
          setAssets(mapped);
        }
      } catch {
        if (!cancelled) {
          setAssets([]);
          setError('Could not load assets. Check your connection and try again.');
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
  }, [fetchEnabled]);

  return { assets, loading, error };
}
