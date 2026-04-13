import { ActionMenu, OwnerCell, StatusBadge } from '../../components';
import { projectDetailStyles } from './projectDetailStyles';

export function ProjectDetailsCardSection() {
  return (
    <div style={projectDetailStyles.card}>
      <div style={projectDetailStyles.cardHeader}>
        <div style={projectDetailStyles.cardHeaderLeft}>
          <h2 style={projectDetailStyles.cardTitle}>Project Details</h2>
          <p style={projectDetailStyles.cardSubtitle}>
            PCI ASV project — powered by 4 rolling 90-day scan quarters
          </p>
        </div>
        <ActionMenu onEdit={() => {}} onDelete={() => {}} />
      </div>

      <div style={projectDetailStyles.cardBody}>
        <div style={projectDetailStyles.detailsRow}>
          <div style={projectDetailStyles.detailsColumn}>
            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>Status</span>
              </div>
              <StatusBadge status="in-progress" />
            </div>

            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>Scan Type</span>
              </div>
              <span style={projectDetailStyles.detailValue}>PCI ASV</span>
            </div>

            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>Owner</span>
              </div>
              <OwnerCell name="Sarah Chen" />
            </div>

            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>Quarters Passed</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={projectDetailStyles.detailValue}>3 of 4 quarters</span>
                <div style={{ display: 'flex', gap: 4, width: '25%' }}>
                  <div style={{ height: 8, borderRadius: 2, background: '#16A34A', flex: 1 }} />
                  <div style={{ height: 8, borderRadius: 2, background: '#16A34A', flex: 1 }} />
                  <div style={{ height: 8, borderRadius: 2, background: '#16A34A', flex: 1 }} />
                  <div style={{ height: 8, borderRadius: 2, background: '#F04438', flex: 1 }} />
                </div>
              </div>
            </div>
          </div>

          <div style={projectDetailStyles.detailsColumn}>
            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>Scan Credits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={projectDetailStyles.detailValue}>6 total</span>
                <span
                  style={{
                    ...projectDetailStyles.pill,
                    background: '#ECFDF3',
                    color: '#166534',
                  }}
                >
                  2 remaining
                </span>
              </div>
            </div>

            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>Current Quarter</span>
              </div>
              <span style={projectDetailStyles.detailValue}>Quarter 4</span>
            </div>
          </div>

          <div style={projectDetailStyles.detailsColumn}>
            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>PCI Certification Date</span>
              </div>
              <span style={projectDetailStyles.detailValue}>Mar 15, 2025</span>
            </div>

            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>License End</span>
              </div>
              <span style={{ ...projectDetailStyles.detailValue, color: '#B91C1C' }}>
                • Mar 14, 2026
              </span>
            </div>

            <div>
              <div style={projectDetailStyles.detailLabelTop}>
                <span>Description</span>
              </div>
              <p style={projectDetailStyles.descriptionText}>
                Annual PCI ASV compliance project. 4 rolling 90-day scan quarters anchored to Mar 15
                anniversary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

