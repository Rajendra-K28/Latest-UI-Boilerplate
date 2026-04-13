import { ArrowUpRight, Button } from '../../components';
import { colors, spacing } from '../../design-system/tokens';
import { projectDetailStyles } from './projectDetailStyles';
import { useNavigate, useParams } from 'react-router-dom';

const scanHistoryRows = [
  {
    id: 'ASV-W4-2025',
    description: 'Quarter 4 — Initial Scan',
    date: 'Feb 12, 2026',
    findings: { critical: 2, high: 5, medium: 8, low: 6 },
    result: 'fail' as const,
  },
  {
    id: 'ASV-W3-2025-R1',
    description: 'Quarter 3 — Rescan 1',
    date: 'Dec 7, 2025',
    findings: { critical: 1, high: 3, medium: 8, low: 9 },
    result: 'pass' as const,
  },
  {
    id: 'ASV-W3-2025',
    description: 'Quarter 3 — Initial Scan',
    date: 'Nov 14, 2025',
    findings: { critical: 1, high: 2, medium: 7, low: 12 },
    result: 'fail' as const,
  },
  {
    id: 'ASV-W2-2025',
    description: 'Quarter 2 — Initial Scan',
    date: 'Sep 8, 2025',
    findings: { critical: 1, high: 4, medium: 9, low: 0 },
    result: 'pass' as const,
  },
  {
    id: 'ASV-W1-2025',
    description: 'Quarter 1 — Initial Scan',
    date: 'Jun 10, 2025',
    findings: { critical: 2, high: 6, medium: 8, low: 11 },
    result: 'pass' as const,
  },
];

export function ScanHistorySection() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const handleAsvScansClick = () => {
    if (!projectId) return;
    navigate(`/projects/${projectId}/asv-scans`);
  };

  return (
    <div style={{ marginTop: spacing[6] }}>
      <div style={projectDetailStyles.milestonesTable}>
        <div style={projectDetailStyles.milestonesTitleRow}>
          <div style={projectDetailStyles.milestonesTitleLeft}>
            <h2 style={projectDetailStyles.milestonesTitleText}>Scan History</h2>
            <p style={projectDetailStyles.milestonesTitleSubtitle}>
              All ASV scans for this project, across all quarters
            </p>
          </div>
          <div style={projectDetailStyles.milestonesTitleRight}>
            <Button
              label="View all in ASV Scans"
              hierarchy="link-gray"
              size="md"
              iconConfig="right"
              icon={<ArrowUpRight />}
              onClick={handleAsvScansClick}
            />
          </div>
        </div>

        <div style={projectDetailStyles.milestonesColumnHeaders}>
          <div>Scan ID</div>
          <div>Description</div>
          <div style={{ textAlign: 'left' }}>Date</div>
          <div>Findings</div>
          <div>Result</div>
        </div>

        {scanHistoryRows.map((row, index, arr) => (
          <div
            key={row.id}
            style={projectDetailStyles.milestoneRow(index === arr.length - 1)}
          >
            <div>
              <a
                href="#"
                style={{
                  color: colors.primary[600],
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'Menlo, monospace',
                }}
              >
                {row.id}
              </a>
            </div>
            <div style={projectDetailStyles.milestoneActivityCell}>{row.description}</div>
            <div style={{ fontSize: 13, color: colors.text.neutral.main }}>{row.date}</div>

            <div style={projectDetailStyles.scanHistoryFindingsCell}>
              <span
                style={projectDetailStyles.scanHistoryFindingPill('#FEF2F2', '#B91C1C')}
              >
                {row.findings.critical}
              </span>
              <span
                style={projectDetailStyles.scanHistoryFindingPill('#FFFBEB', '#B45309')}
              >
                {row.findings.high}
              </span>
              <span
                style={projectDetailStyles.scanHistoryFindingPill('#EFF6FF', '#1D4ED8')}
              >
                {row.findings.medium}
              </span>
              <span
                style={projectDetailStyles.scanHistoryFindingPill('#F4F4FF', '#4C1D95')}
              >
                {row.findings.low}
              </span>
            </div>

            <div>
              {row.result === 'pass' ? (
                <span style={projectDetailStyles.scanHistoryResultPass}>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: '#DCFCE7',
                      border: '1px solid #22C55E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                    }}
                  >
                    ✓
                  </span>
                  PASS
                </span>
              ) : (
                <span style={projectDetailStyles.scanHistoryResultFail}>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: '#FEE2E2',
                      border: '1px solid #EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                    }}
                  >
                    ✕
                  </span>
                  FAIL
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

