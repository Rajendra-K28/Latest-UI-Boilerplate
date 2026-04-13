import type { ScanTargetAsset } from './scanTargetAsset.types';

type ApiAssetRow = {
  id: string;
  name: string;
  endpoint: string;
  alive_status?: boolean | null;
};

export function mapApiAssetsToScanTargets(rows: unknown[]): ScanTargetAsset[] {
  return rows
    .filter(
      (r): r is ApiAssetRow =>
        typeof r === 'object' &&
        r !== null &&
        typeof (r as ApiAssetRow).id === 'string' &&
        typeof (r as ApiAssetRow).name === 'string' &&
        typeof (r as ApiAssetRow).endpoint === 'string',
    )
    .map((row) => ({
      id: row.id,
      name: row.name,
      ip: row.endpoint,
      host_alive: row.alive_status === true,
      hasPriorFinding: false,
      isWhitelisted: true,
      isValidated: true,
    }));
}
