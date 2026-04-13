/**
 * Launch-scan target row: org assets from API (or mock) for steps 2–3.
 * Step 2 only lists rows where host_alive === true (API alive_status === true).
 */
export type ScanTargetAsset = {
  id: string;
  name: string;
  ip: string;
  type?: string;
  hasPriorFinding?: boolean;
  isWhitelisted?: boolean;
  isValidated?: boolean;
  /** When true, asset is shown in step 2. Mirrors backend alive_status. */
  host_alive?: boolean;
};
