import { useRef, useEffect } from 'react';
import { colors, spacing } from '../../design-system/tokens';
import {
  Stepper,
  ProjectSummaryCard,
  CheckCircleFilled,
  Edit,
  ShieldBlue,
  DocumentBlue,
  MenuLines,
} from '../../components';

type FrameworkScopingConfig = {
  entityType?: string;
  pciLevel?: string;
  assessmentPath?: string;
  description?: string;
  implementationIntent?: string[];
};

type ProjectSetupData = {
  projectName: string;
  projectKey: string;
};

type ReviewProjectsViewProps = {
  selectedComplianceGroups: string[];
  selectedFrameworks: string[];
  scopingConfig: Record<string, FrameworkScopingConfig>;
  projectSetup: Record<string, ProjectSetupData>;
  onEdit?: (step: number) => void;
};

const steps = [
  { id: 1, label: 'Select Compliance' },
  { id: 2, label: 'Select Frameworks' },
  { id: 3, label: 'Scoping' },
  { id: 4, label: 'Project setup' },
  { id: 5, label: 'Review' },
];

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },
  stepperWrapper: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
    background: colors.bg.surface.default,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
  },
  layout: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[5],
    paddingTop: '15px',
    paddingRight: spacing[6],
    marginRight: spacing[6],
    overflowY: 'auto' as const,
    borderRight: `1px solid ${colors.stroke.neutral.light}`,
  },
  sidebar: {
    width: '320px',
    flexShrink: 0,
    overflowY: 'auto' as const,
    position: 'sticky' as const,
    top: 0,
    height: 'fit-content',
    maxHeight: '100%',
    paddingTop: '15px',
  },
  header: {
    marginBottom: spacing[2],
  },
  title: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  description: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    lineHeight: '20px',
    textAlign: 'left' as const,
  },
  projectsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
  },
  projectCard: {
    padding: spacing[5],
    background: colors.bg.surface.default,
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[1],
  },
  projectName: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  projectKey: {
    fontSize: '13px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  editButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: spacing[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    color: colors.primary[500],
    transition: 'background 0.2s ease',
  },
  configSection: {
    padding: spacing[4],
    background: colors.bg.surface.gray,
    borderRadius: '8px',
  },
  configTitle: {
    fontSize: '12px',
    fontWeight: '600' as const,
    color: colors.text.neutral.soft,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: spacing[3],
    textAlign: 'left' as const,
  },
  configRow: {
    display: 'flex',
    gap: spacing[8],
    marginBottom: spacing[3],
  },
  configItem: {
    display: 'flex',
    gap: spacing[2],
  },
  configLabel: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
  },
  configValue: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
  },
  descriptionLabel: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  descriptionText: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    lineHeight: '20px',
    marginBottom: spacing[3],
    textAlign: 'left' as const,
  },
  intentContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    flexWrap: 'wrap' as const,
  },
  intentLabel: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
  },
  intentTag: {
    padding: '4px 10px',
    background: '#EFF8FF',
    color: colors.primary[600],
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500' as const,
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
  },
  stepIndicator: {
    fontSize: '12px',
    color: colors.text.neutral.soft,
  },
  readyCard: {
    padding: spacing[4],
    background: colors.bg.surface.default,
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
  },
  readyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  readyDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#12B76A',
  },
  readyTitle: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
  },
  readyText: {
    fontSize: '13px',
    color: colors.text.neutral.sub,
    lineHeight: '18px',
    textAlign: 'left' as const,
  },
};

// Framework data
const frameworkDetails: Record<string, { title: string; code: string }> = {
  'pci-dss-40': { title: 'PCI DSS', code: 'PCI DSS 4.0' },
  'iso-27001': { title: 'ISO/IEC 27001', code: 'ISO/IEC 27001:2022' },
  'iso-27002': { title: 'ISO/IEC 27002', code: 'ISO/IEC 27002:2022' },
  'iso-27017': { title: 'ISO/IEC 27017', code: 'ISO/IEC 27017:2015' },
  'iso-27018': { title: 'ISO/IEC 27018', code: 'ISO/IEC 27018:2019' },
  'iso-9001': { title: 'ISO 9001', code: 'ISO 9001:2015' },
  'gdpr': { title: 'GDPR', code: 'EU 2016/679' },
  'hipaa': { title: 'HIPAA', code: 'HIPAA' },
  'ccpa': { title: 'CCPA', code: 'CCPA' },
  'soc1': { title: 'SOC 1', code: 'SOC 1' },
  'soc2': { title: 'SOC 2', code: 'SOC 2' },
  'soc3': { title: 'SOC 3', code: 'SOC 3' },
};

const intentLabels: Record<string, string> = {
  'certification': 'Certification',
  'internal-use': 'Internal Use',
  'client-requirement': 'Client Requirement',
  'best-practice': 'Best Practice',
};

export function ReviewProjectsView({
  selectedComplianceGroups,
  selectedFrameworks,
  scopingConfig,
  projectSetup,
  onEdit,
}: ReviewProjectsViewProps) {
  // Refs for auto-scrolling
  const complianceGroupsRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const scopingRef = useRef<HTMLDivElement>(null);
  const projectSetupRef = useRef<HTMLDivElement>(null);
  const readyToCreateRef = useRef<HTMLDivElement>(null);

  const handleStepClick = (stepId: number) => {
    onEdit?.(stepId);
  };

  // Auto-scroll to "Ready to Create" section on mount
  useEffect(() => {
    if (readyToCreateRef?.current) {
      setTimeout(() => {
        readyToCreateRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  }, []);

  const handleEditProject = (step: number) => {
    onEdit?.(step);
  };

  // Build summary items
  const complianceGroupItems = selectedComplianceGroups.map((groupId) => {
    const groupNames: Record<string, string> = {
      pci: 'PCI Compliance',
      iso: 'ISO Frameworks',
      privacy: 'Privacy & Data Protection',
      trust: 'Trust, Assurance & Audit',
    };
    
    return {
      id: groupId,
      label: groupNames[groupId] || groupId,
      icon: <CheckCircleFilled />,
    };
  });

  const standardsItems = selectedFrameworks.map((frameworkId) => {
    const framework = frameworkDetails[frameworkId];
    return {
      id: frameworkId,
      label: framework ? framework.title : frameworkId,
      icon: <CheckCircleFilled />,
    };
  });

  const scopingItems = selectedFrameworks.map((frameworkId) => {
    const framework = frameworkDetails[frameworkId];
    return {
      id: `scoping-${frameworkId}`,
      label: `${framework?.code || frameworkId} - Configured`,
      icon: <CheckCircleFilled />,
    };
  });

  const totalProjectsCount = selectedFrameworks.length;

  const renderPCIConfiguration = (frameworkId: string) => {
    const config = scopingConfig[frameworkId];
    if (!config) return null;

    return (
      <div style={styles.configSection}>
        <div style={styles.configTitle}>CONFIGURATION (PCI DSS 4.0)</div>
        <div style={styles.configRow}>
          <div style={styles.configItem}>
            <span style={styles.configLabel}>Scope:</span>
            <span style={styles.configValue}>
              {config.entityType === 'merchant' ? 'Merchant' : 'Service Provider'}
            </span>
          </div>
          <div style={styles.configItem}>
            <span style={styles.configLabel}>Assessment:</span>
            <span style={styles.configValue}>
              {config.assessmentPath?.toUpperCase() || 'SAQ'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderISOConfiguration = (frameworkId: string) => {
    const config = scopingConfig[frameworkId];
    const framework = frameworkDetails[frameworkId];
    if (!config) return null;

    return (
      <div style={styles.configSection}>
        <div style={styles.configTitle}>
          CONFIGURATION ({framework?.code || frameworkId})
        </div>
        
        {config.description && (
          <>
            <div style={styles.descriptionLabel}>Description:</div>
            <div style={styles.descriptionText}>{config.description}</div>
          </>
        )}

        {config.implementationIntent && config.implementationIntent.length > 0 && (
          <div style={styles.intentContainer}>
            <span style={styles.intentLabel}>Intent:</span>
            {config.implementationIntent.map((intent) => (
              <span key={intent} style={styles.intentTag}>
                {intentLabels[intent] || intent}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.stepperWrapper}>
        <Stepper steps={steps} currentStep={5} onStepClick={handleStepClick} />
      </div>
      
      <div style={styles.layout}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h3 style={styles.title}>Review Projects</h3>
            <p style={styles.description}>
              You are about to create {totalProjectsCount} new {totalProjectsCount === 1 ? 'project' : 'projects'}. Please review the details below.
            </p>
          </div>

          <div style={styles.projectsContainer}>
            {selectedFrameworks.map((frameworkId) => {
              const setup = projectSetup[frameworkId];
              
              return (
                <div key={frameworkId} style={styles.projectCard}>
                  <div style={styles.projectHeader}>
                    <div style={styles.projectInfo}>
                      <div style={styles.projectName}>{setup?.projectName || 'Untitled Project'}</div>
                      <div style={styles.projectKey}>key: {setup?.projectKey || 'no_key'}</div>
                    </div>
                    <button
                      type="button"
                      style={styles.editButton}
                      onClick={() => handleEditProject(4)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.bg.surface.gray;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                      aria-label="Edit project"
                    >
                      <Edit />
                    </button>
                  </div>

                  {frameworkId === 'pci-dss-40' 
                    ? renderPCIConfiguration(frameworkId)
                    : renderISOConfiguration(frameworkId)
                  }
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={{ marginBottom: spacing[4] }}>
            <div style={styles.summaryHeader}>
              <h4 style={styles.summaryTitle}>Project Summary</h4>
              <span style={styles.stepIndicator}>Step 5 of 5</span>
            </div>
          </div>
          
          <ProjectSummaryCard
            title="Compliance Groups"
            titleIcon={<ShieldBlue />}
            items={complianceGroupItems}
            isActive={false}
            scrollRef={complianceGroupsRef}
          />
          
          <div style={{ marginTop: spacing[4] }}>
            <ProjectSummaryCard
              title="Standards / Frameworks / Regulations"
              titleIcon={<DocumentBlue />}
              items={standardsItems}
              isActive={false}
              scrollRef={standardsRef}
            />
          </div>

          <div style={{ marginTop: spacing[4] }}>
            <ProjectSummaryCard
              title="Scoping"
              titleIcon={<ShieldBlue />}
              items={scopingItems}
              isActive={false}
              scrollRef={scopingRef}
            />
          </div>

          <div ref={projectSetupRef} style={{ marginTop: spacing[4] }}>
            <div style={{
              padding: spacing[4],
              background: colors.bg.surface.default,
              border: `1px solid ${colors.stroke.neutral.light}`,
              borderRadius: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
                <MenuLines />
                <span style={{ fontSize: '14px', fontWeight: '500', color: colors.text.neutral.dark }}>
                  Project Setup
                </span>
              </div>
              <p style={{ fontSize: '14px', color: colors.text.neutral.sub, textAlign: 'left' as const }}>
                Total Projects: {totalProjectsCount} {totalProjectsCount === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>

          <div ref={readyToCreateRef} style={{ marginTop: spacing[4] }}>
            <div style={{
              ...styles.readyCard,
              border: `2px solid ${colors.primary[500]}`,
              background: '#EFF8FF',
              boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)',
            }}>
              <div style={styles.readyHeader}>
                <div style={styles.readyDot} />
                <span style={styles.readyTitle}>Ready to Create</span>
              </div>
              <p style={styles.readyText}>
                All validations passed. You can now create your compliance projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
