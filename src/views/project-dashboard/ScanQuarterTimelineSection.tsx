import { projectDetailStyles } from './projectDetailStyles';

export function ScanQuarterTimelineSection() {
  return (
    <div style={projectDetailStyles.timelineContainer}>
      <div style={projectDetailStyles.timelineSection}>
        <h2 style={projectDetailStyles.timelineTitle}>Scan Quarter Timeline</h2>

        <div style={projectDetailStyles.timelineGrid}>
          <div style={projectDetailStyles.timelineCard}>
            <div style={projectDetailStyles.timelineCardHeaderRow}>
              <span style={projectDetailStyles.timelineQuarterLabel}>Quarter 1</span>
              <span style={projectDetailStyles.timelineStatusPill('pass')}>PASS</span>
            </div>
            <div style={projectDetailStyles.timelineMeta}>Mar 15 – Jun 12, 2025</div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Scans run</span>
              <span style={projectDetailStyles.timelineMetaValue}>2</span>
            </div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Last scan</span>
              <span style={projectDetailStyles.timelineMetaValue}>Jun 10, 2025</span>
            </div>
          </div>

          <div style={projectDetailStyles.timelineCard}>
            <div style={projectDetailStyles.timelineCardHeaderRow}>
              <span style={projectDetailStyles.timelineQuarterLabel}>Quarter 2</span>
              <span style={projectDetailStyles.timelineStatusPill('pass')}>PASS</span>
            </div>
            <div style={projectDetailStyles.timelineMeta}>Jun 13 – Sep 10, 2025</div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Scans run</span>
              <span style={projectDetailStyles.timelineMetaValue}>2</span>
            </div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Last scan</span>
              <span style={projectDetailStyles.timelineMetaValue}>Sep 8, 2025</span>
            </div>
          </div>

          <div style={projectDetailStyles.timelineCard}>
            <div style={projectDetailStyles.timelineCardHeaderRow}>
              <span style={projectDetailStyles.timelineQuarterLabel}>Quarter 3</span>
              <span style={projectDetailStyles.timelineStatusPill('pass')}>PASS</span>
            </div>
            <div style={projectDetailStyles.timelineMeta}>Sep 11 – Dec 9, 2025</div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Scans run</span>
              <span style={projectDetailStyles.timelineMetaValue}>3</span>
            </div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Last scan</span>
              <span style={projectDetailStyles.timelineMetaValue}>Dec 7, 2025</span>
            </div>
          </div>

          <div
            style={{
              ...projectDetailStyles.timelineCard,
              border: '1px solid #BFDBFE',
              background: '#EFF6FF',
            }}
          >
            <div style={projectDetailStyles.timelineCardHeaderRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={projectDetailStyles.timelineQuarterLabel}>Quarter 4</span>
                <span style={projectDetailStyles.timelineStatusPill('current')}>Current</span>
              </div>
              <span style={projectDetailStyles.timelineStatusPill('fail')}>FAIL</span>
            </div>
            <div style={projectDetailStyles.timelineMeta}>Dec 10, 2025 – Mar 14, 2026</div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Scans run</span>
              <span style={projectDetailStyles.timelineMetaValue}>3</span>
            </div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Last scan</span>
              <span style={projectDetailStyles.timelineMetaValue}>Feb 12, 2026</span>
            </div>
            <div style={projectDetailStyles.timelineMetaRow}>
              <span>Days remaining</span>
              <span
                style={{
                  ...projectDetailStyles.timelineMetaValue,
                  color: '#F04438',
                }}
              >
                11
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

