import { ComplianceCard, CheckCircleFilled } from '../../../components';
import { spacing } from '../../../design-system/tokens';
import { complianceGroups, steps, styles } from './shared';

type SelectComplianceViewProps = {
  selectedGroups: string[];
  onToggleGroup: (groupId: string) => void;
};

export function SelectComplianceView({ selectedGroups, onToggleGroup }: SelectComplianceViewProps) {
  const complianceGroupItems =
    selectedGroups.length > 0
      ? selectedGroups.map((groupId) => {
          const group = complianceGroups.find((g) => g.id === groupId);
          return {
            id: groupId,
            label: group?.title || groupId,
            icon: <CheckCircleFilled />,
          };
        })
      : [
          {
            id: 'no-groups',
            label: 'No compliance groups selected',
          },
        ];

  return (
    <div style={styles.container}>
      <div style={styles.stepperWrapper}>
        <div style={styles.stepsHeader}>
          {steps.map((step) => {
            const isActive = step.id <= 1;
            return (
              <div key={step.id} style={styles.stepItem}>
                <div style={styles.stepUnderline(isActive)} />
                <div style={styles.stepTopRow}>
                  <div style={styles.stepNumberCircle(isActive)}>{step.id}</div>
                  <span style={styles.stepLabel(isActive)}>{step.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.layout}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h3 style={styles.title}>Select Project Type</h3>
            <p style={styles.description}>
              Choose the type of security project. This determines the scan workflow and compliance tracking.
            </p>
          </div>

          <div style={styles.grid}>
            {complianceGroups.map((group) => (
              <ComplianceCard
                key={group.id}
                icon={group.icon}
                iconBackgroundColor={group.iconBg}
                title={group.title}
                description={group.description}
                tags={group.tags}
                badgeLabel={group.badgeLabel}
                badgeBackgroundColor={group.badgeBackgroundColor}
                badgeTextColor={group.badgeTextColor}
                usedSlots={group.usedSlots}
                maxSlots={group.maxSlots}
                showCheckBadge={selectedGroups.includes(group.id)}
                onClick={() => onToggleGroup(group.id)}
              />
            ))}
          </div>

          <div style={styles.infoBox}>
            <h4 style={styles.infoTitle}>What happens next?</h4>
            <p style={styles.infoText}>
              After selecting a project type you'll configure the scan schedule, compliance quarter or recurrence, and
              then invite your team members.
            </p>
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={{ marginBottom: spacing[4] }}>
            <div style={styles.summaryHeader}>
              <h4 style={styles.summaryTitle}>Project Summary</h4>
              <span style={styles.stepIndicator}>Step 1 of 3</span>
            </div>
          </div>

          <div style={styles.summarySidebar}>
            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Project Type</div>
              <div
                style={
                  complianceGroupItems[0]?.label ? styles.summaryValue : styles.summaryValueMuted
                }
              >
                {complianceGroupItems[0]?.label || 'Not selected'}
              </div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Name</div>
              <div style={styles.summaryValueMuted}>—</div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Key</div>
              <div style={styles.summaryValueMuted}>—</div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Frequency</div>
              <div style={styles.summaryValueMuted}>—</div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Start</div>
              <div style={styles.summaryValueMuted}>—</div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Invites</div>
              <div style={styles.summaryValueMuted}>0 members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

