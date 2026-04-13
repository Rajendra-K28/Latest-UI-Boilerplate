import { useEffect, useState } from 'react';
import { TextInput, DatePicker, PCIShield, Calendar } from '../../../components';
import { spacing } from '../../../design-system/tokens';
import { complianceGroups, steps, styles, getComplianceWindows, formatWindowDate } from './shared';
import type { ScanConfigurationSummary } from './shared';

type ScanConfigurationViewProps = {
  selectedGroups: string[];
  onValidityChange?: (valid: boolean) => void;
  initialSummary?: ScanConfigurationSummary;
  onSummaryChange?: (summary: ScanConfigurationSummary) => void;
};

export function ScanConfigurationView({
  selectedGroups,
  onValidityChange,
  initialSummary,
  onSummaryChange,
}: ScanConfigurationViewProps) {
  const [projectName, setProjectName] = useState(initialSummary?.projectName || '');
  const [projectKey, setProjectKey] = useState(initialSummary?.projectKey || '');
  const [projectKeyTouched, setProjectKeyTouched] = useState(Boolean(initialSummary?.projectKey));
  const [certificationDate, setCertificationDate] = useState<string | undefined>(
    initialSummary?.certificationDate,
  );
  const [scanFrequency, setScanFrequency] = useState<
    'one-time' | 'weekly' | 'monthly' | 'quarterly' | ''
  >(initialSummary?.scanFrequency || '');
  const [startDate, setStartDate] = useState<string | undefined>(initialSummary?.startDate);

  const isPCIProject = selectedGroups.includes('pci-asv-scan');
  const isExternalVAProject = selectedGroups.includes('external-va-scan');
  const selectedScan =
    complianceGroups.find((g) => selectedGroups.includes(g.id)) || complianceGroups[0];

  useEffect(() => {
    if (isPCIProject) {
      setProjectName((prev) => prev || 'Q1 2026 PCI ASV Compliance');
      setProjectKey((prev) => prev || 'PCI-Q1-2026');
    } else if (isExternalVAProject) {
      setProjectName((prev) => prev || 'Production Network External Scan');
      setProjectKey((prev) => prev || 'VA-PRD-NET');
      setScanFrequency((prev) => prev || 'weekly');
    }
  }, [isPCIProject, isExternalVAProject]);

  const generateProjectKey = (name: string) => {
    const normalized = name
      .trim()
      .toUpperCase()
      .replaceAll(/[^A-Z0-9]+/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/^-|-$/g, '');
    return normalized.slice(0, 50);
  };

  useEffect(() => {
    if (projectKeyTouched) return;
    const next = generateProjectKey(projectName);
    setProjectKey(next);
  }, [projectName, projectKeyTouched]);

  useEffect(() => {
    onSummaryChange?.({
      projectName,
      projectKey,
      certificationDate,
      scanFrequency: scanFrequency || undefined,
      startDate,
    });
  }, [projectName, projectKey, certificationDate, scanFrequency, startDate, onSummaryChange]);

  useEffect(() => {
    const pciValid =
      isPCIProject &&
      projectName.trim().length > 0 &&
      projectKey.trim().length > 0 &&
      Boolean(certificationDate);

    const externalValid =
      isExternalVAProject &&
      projectName.trim().length > 0 &&
      projectKey.trim().length > 0 &&
      scanFrequency !== '' &&
      Boolean(startDate);

    onValidityChange?.(Boolean(pciValid || externalValid));
  }, [
    isPCIProject,
    isExternalVAProject,
    projectName,
    projectKey,
    certificationDate,
    scanFrequency,
    startDate,
    onValidityChange,
  ]);

  return (
    <div style={styles.container}>
      <div style={styles.stepperWrapper}>
        <div style={styles.stepsHeader}>
          {steps.map((step) => {
            const isActive = step.id <= 2;
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
          {isExternalVAProject ? (
            <>
              <div style={styles.header}>
                <h3 style={styles.title}>Scan Configuration</h3>
                <p style={styles.description}>
                  Set the project name and configure the scan frequency and depth for this project.
                </p>
              </div>

              <div>
                <div style={styles.sectionLabel}>Project Identity</div>

                <div style={styles.formGroup}>
                  <div style={styles.twoColumnRow}>
                    <div style={styles.column}>
                      <label style={styles.fieldLabel}>Project Name</label>
                      <TextInput
                        placeholder="e.g., Production Network External Scan"
                        value={projectName}
                        onChange={setProjectName}
                        width="full"
                      />
                    </div>
                    <div style={styles.column}>
                      <label style={styles.fieldLabel}>Project Key</label>
                      <TextInput
                        placeholder="VA-PRD-NET"
                        value={projectKey}
                        onChange={(v) => {
                          setProjectKeyTouched(true);
                          setProjectKey(v);
                        }}
                        width="full"
                      />
                      <p style={styles.fieldDescription}>
                        Short identifier for reports &amp; exports. Auto-generated from the project
                        name.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: spacing[5] }}>
                <div style={styles.sectionLabel}>Scan Frequency (Optional)</div>
                <div style={styles.grid}>
                  {[
                    { id: 'one-time', label: 'One-time', description: 'Run a single scan' },
                    { id: 'weekly', label: 'Weekly', description: 'Every 7 days' },
                    { id: 'monthly', label: 'Monthly', description: 'Once per month' },
                    { id: 'quarterly', label: 'Quarterly', description: 'Every 3 months' },
                  ].map((option) => {
                    const active = scanFrequency === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setScanFrequency(
                            option.id as 'one-time' | 'weekly' | 'monthly' | 'quarterly',
                          )
                        }
                        style={{
                          textAlign: 'left',
                          padding: spacing[4],
                          borderRadius: 12,
                          border: `1px solid ${
                            active ? styles.stepUnderline(true).background : styles.summaryCard.border
                          }`,
                          background: active ? '#EEF4FF' : '#FFFFFF',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: spacing[1],
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {option.label}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                          }}
                        >
                          {option.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: spacing[5] }}>
                <label style={styles.fieldLabel}>Start Date</label>
                <DatePicker
                  placeholder="dd/mm/yyyy"
                  value={startDate}
                  onChange={setStartDate}
                  width="full"
                />
              </div>
            </>
          ) : (
            <>
              <div style={styles.header}>
                <h3 style={styles.title}>Scan Configuration</h3>
                <p style={styles.description}>
                  Name your project, set your PCI DSS certification date — the system will calculate
                  your compliance quarters from it.
                </p>
              </div>

              <div>
                <div style={styles.sectionLabel}>Project Identity</div>

                <div style={styles.formGroup}>
                  <div style={styles.twoColumnRow}>
                    <div style={styles.column}>
                      <label style={styles.fieldLabel}>Project Name</label>
                      <TextInput
                        placeholder="e.g., Q1 2026 PCI ASV Compliance"
                        value={projectName}
                        onChange={setProjectName}
                        width="full"
                      />
                    </div>
                    <div style={styles.column}>
                      <label style={styles.fieldLabel}>Project Key</label>
                      <TextInput
                        placeholder="PCI-Q1-2026"
                        value={projectKey}
                        onChange={(v) => {
                          setProjectKeyTouched(true);
                          setProjectKey(v);
                        }}
                        width="full"
                      />
                      <p style={styles.fieldDescription}>
                        Short identifier for reports &amp; exports. Auto-generated from the project
                        name.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.pciCallout}>
                <div style={styles.pciCalloutHeader}>
                  <div style={styles.pciIconWrapper}>
                    <PCIShield />
                  </div>
                  <div>
                    <div style={styles.pciCalloutTitle}>PCI DSS Certification Date</div>
                    <div style={styles.pciCalloutBody}>
                      The date your PCI compliance cycle renews each year (e.g. the date you first
                      passed a PCI audit). The system uses only the month &amp; day — the year is
                      ignored. Your 4 rolling 90-day compliance windows are calculated from this.
                    </div>
                  </div>
                </div>

                <div style={styles.pciDateField}>
                  <DatePicker
                    placeholder="dd/mm/yyyy"
                    value={certificationDate}
                    onChange={setCertificationDate}
                    width="full"
                  />
                </div>
              </div>

              {certificationDate ? (
                <div style={styles.complianceWindowsSection}>
                  <div style={styles.complianceWindowsHeaderRow}>
                    <div style={styles.complianceWindowsTitleBlock}>
                      <div style={styles.complianceWindowsTitle}>Compliance Windows</div>
                      <div style={styles.complianceWindowsSubtitle}>
                        Your 4 rolling 90-day windows derived from the anniversary date above.
                      </div>
                    </div>
                    <div style={styles.standardBadge}>PCI DSS v4.0</div>
                  </div>

                  <div style={styles.complianceWindowsTable}>
                    <div style={styles.complianceWindowsHeader}>
                      <div>Quarter</div>
                      <div>Window</div>
                      <div>ASV Deadline</div>
                      <div style={{ textAlign: 'right' }}>Days Left</div>
                    </div>
                    {getComplianceWindows(certificationDate).map((window) => (
                      <div
                        key={window.id}
                        style={{
                          ...styles.complianceWindowsRow,
                          ...(window.isCurrent ? styles.complianceWindowsRowCurrent : {}),
                        }}
                      >
                        <div style={styles.quarterNameCell}>
                          <span style={styles.quarterPill}>{window.label}</span>
                          {window.isCurrent && <span style={styles.currentPill}>Current</span>}
                        </div>
                        <div style={styles.windowDatesCell}>
                          <div style={styles.windowDateRow}>
                            <span style={styles.windowDot('#16A34A')} />
                            <span>{formatWindowDate(window.start)}</span>
                          </div>
                          <div style={styles.windowDateRow}>
                            <span style={styles.windowDot('#DC2626')} />
                            <span>{formatWindowDate(window.end)}</span>
                          </div>
                        </div>
                        <div style={styles.asvDeadlineCell}>
                          <div style={styles.asvDeadlineIcon}>
                            <Calendar />
                          </div>
                          <span>{formatWindowDate(window.asvDeadline)}</span>
                        </div>
                        <div style={styles.daysLeftCell}>
                          {window.daysLeft !== undefined ? `${window.daysLeft}d` : '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={styles.quartersPlaceholder}>
                  <div style={styles.quartersIcon}>
                    <Calendar />
                  </div>
                  <div style={styles.quartersTitle}>No quarters yet</div>
                  <div style={styles.quartersSubtitle}>
                    Enter your PCI DSS anniversary date above to generate the 4 compliance windows.
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div style={styles.sidebar}>
          <div style={{ marginBottom: spacing[4] }}>
            <div style={styles.summaryHeader}>
              <h4 style={styles.summaryTitle}>Project Summary</h4>
              <span style={styles.stepIndicator}>Step 2 of 3</span>
            </div>
          </div>

          <div style={styles.summarySidebar}>
            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Project Type</div>
              <div style={styles.summaryValue}>{selectedScan.title}</div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Name</div>
              <div style={projectName ? styles.summaryValue : styles.summaryValueMuted}>
                {projectName || '—'}
              </div>
            </div>

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>Key</div>
              <div style={projectKey ? styles.summaryValue : styles.summaryValueMuted}>
                {projectKey || '—'}
              </div>
            </div>

            {isExternalVAProject && (
              <div style={styles.summarySection}>
                <div style={styles.summaryLabel}>Frequency</div>
                <div style={scanFrequency ? styles.summaryValue : styles.summaryValueMuted}>
                  {scanFrequency
                    ? scanFrequency.charAt(0).toUpperCase() + scanFrequency.slice(1)
                    : '—'}
                </div>
              </div>
            )}

            <div style={styles.summarySection}>
              <div style={styles.summaryLabel}>
                {isExternalVAProject ? 'Start' : 'Certification Date'}
              </div>
              <div
                style={
                  (isExternalVAProject ? startDate : certificationDate)
                    ? styles.summaryValue
                    : styles.summaryValueMuted
                }
              >
                {isExternalVAProject ? startDate || '—' : certificationDate || '—'}
              </div>
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

