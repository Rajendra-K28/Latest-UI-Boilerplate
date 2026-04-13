/** Row from GET /projects/:id/compliance-windows */
export type ProjectComplianceWindowDto = {
  id: string;
  quarter_label: string;
  window_start_date: string;
  window_end_date: string;
  asv_deadline_date: string;
  is_current: boolean;
  status: string;
};
