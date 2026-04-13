import { ArrowUpRight } from '../../components';
import { colors } from '../../design-system/tokens';
import { projectDetailStyles } from './projectDetailStyles';
import { useNavigate, useParams } from 'react-router-dom';

export function CurrentQuarterSection() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const handleVulnerabilityBoardClick = () => {
    if (!projectId) return;
    navigate(`/projects/${projectId}/vulnerability-management`);
  };

  return (
    <div style={projectDetailStyles.currentQuarterContainer}>
      <div style={projectDetailStyles.currentQuarterLayout}>
        <div style={projectDetailStyles.currentQuarterCard}>
          <div style={projectDetailStyles.currentQuarterHeaderRow}>
            <span>Current Quarter — Quarter 4</span>
            <span style={projectDetailStyles.actionRequiredPill}>Action Required</span>
          </div>

          <div style={projectDetailStyles.currentQuarterStatusRow}>
            <span style={{ fontSize: 18 }}>✖</span>
            <span>FAIL</span>
          </div>

          <div style={projectDetailStyles.currentQuarterMetaGrid}>
            <div style={projectDetailStyles.currentQuarterMetaRow(false)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Quarter period</div>
              </span>
              <span>Dec 10, 2025 – Mar 14, 2026</span>
            </div>

            <div style={projectDetailStyles.currentQuarterMetaRow(false)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Last scan</div>
              </span>
              <span>Feb 12, 2026</span>
            </div>

            <div style={projectDetailStyles.currentQuarterMetaRow(false)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Scan ID</div>
              </span>
              <span
                style={{
                  color: colors.primary[600],
                  fontWeight: 500,
                  fontFamily: 'Menlo, monospace',
                }}
              >
                ASV-W4-2025
              </span>
            </div>

            <div style={projectDetailStyles.currentQuarterMetaRow(true)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Days remaining</div>
              </span>
              <span style={projectDetailStyles.currentQuarterMetaValueHighlight}>11 days</span>
            </div>

            <div style={projectDetailStyles.currentQuarterMetaRow(false)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Next scheduled scan</div>
              </span>
              <span style={{ color: '#b54708' }}>
                <span style={{ color: '#b54708', fontSize: 22, lineHeight: '28px' }}>•</span>{' '}
                Mar 5, 2026 · 2:00 AM EST
              </span>
            </div>

            <div style={projectDetailStyles.currentQuarterMetaRow(false)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Upcoming scan ID</div>
              </span>
              <span
                style={{
                  color: colors.primary[600],
                  fontWeight: 500,
                  fontFamily: 'Menlo, monospace',
                }}
              >
                ASV-W4-2025-R1
              </span>
            </div>

            <div style={projectDetailStyles.currentQuarterMetaRow(false)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Assets in scope</div>
              </span>
              <span>24 assets</span>
            </div>

            <div style={projectDetailStyles.currentQuarterMetaRow(false)}>
              <span>
                <div style={projectDetailStyles.currentQuarterMetaLabel}>Credits remaining</div>
              </span>
              <span>2</span>
            </div>
          </div>
        </div>

        <div style={projectDetailStyles.blockersCard}>
          <div style={projectDetailStyles.blockersHeaderRow}>
            <div>
              <div style={projectDetailStyles.blockersTitle}>Are we on track this quarter?</div>
              <div style={{ fontSize: 13, color: colors.text.neutral.sub }}>
                PCI-relevant open findings blocking Quarter 4
              </div>
            </div>
            <div style={projectDetailStyles.blockersBadgesRow}>
              <span style={projectDetailStyles.blockersBadgeCritical}>2 High</span>
              <span style={projectDetailStyles.blockersBadgeMedium}>5 Medium</span>
            </div>
          </div>

          <div style={projectDetailStyles.blockersList}>
            <div style={projectDetailStyles.blockerRow}>
              <div>
                <span style={projectDetailStyles.blockerLink}>
                  <span style={{ color: '#F04438', fontSize: 22, lineHeight: '28px' }}>•</span> CVE-2024-12345
                </span>
                <span style={projectDetailStyles.blockerLinkText}> — Remote Code Execution in Apache Struts</span>
              </div>
              <span style={projectDetailStyles.blockerSeverityCritical}>CRITICAL</span>
            </div>

            <div style={projectDetailStyles.blockerRow}>
              <div>
                <span style={projectDetailStyles.blockerLink}>
                  <span style={{ color: '#F04438', fontSize: 22, lineHeight: '28px' }}>•</span> CVE-2024-67890
                </span>
                <span style={projectDetailStyles.blockerLinkText}> — SQL Injection in Web Application</span>
              </div>
              <span style={projectDetailStyles.blockerSeverityCritical}>CRITICAL</span>
            </div>

            <div style={projectDetailStyles.blockerRow}>
              <div>
                <span style={projectDetailStyles.blockerLink}>
                  <span style={{ color: '#F04438', fontSize: 22, lineHeight: '28px' }}>•</span> CVE-2024-11111
                </span>
                <span style={projectDetailStyles.blockerLinkText}>
                  {' '}
                  — Cross-Site Scripting (XSS) Vulnerability
                </span>
              </div>
              <span style={projectDetailStyles.blockerSeverityHigh}>HIGH</span>
            </div>
          </div>

          <div
            style={projectDetailStyles.blockersFooterLink}
            role="button"
            tabIndex={0}
            onClick={handleVulnerabilityBoardClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleVulnerabilityBoardClick();
              }
            }}
          >
            <span>View full Vulnerability board</span>
            <ArrowUpRight />
          </div>
        </div>
      </div>
    </div>
  );
}

