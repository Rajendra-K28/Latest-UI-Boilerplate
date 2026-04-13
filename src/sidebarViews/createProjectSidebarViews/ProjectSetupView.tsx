import { useRef, useEffect } from 'react';
import { colors, spacing } from '../../design-system/tokens';
import { Stepper, ProjectSummaryCard, TextInput, CheckCircleFilled, ShieldBlue, DocumentBlue, MenuLines } from '../../components';

type ProjectSetupData = {
  projectName: string;
  projectKey: string;
};

type ProjectSetupViewProps = {
  selectedComplianceGroups: string[];
  selectedFrameworks: string[];
  projectSetup: Record<string, ProjectSetupData>;
  onProjectSetupChange: (frameworkId: string, data: ProjectSetupData) => void;
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
    gap: spacing[5],
  },
  projectSection: {
    padding: 0,
  },
  projectTitle: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[4],
    textAlign: 'left' as const,
  },
  formRow: {
    display: 'flex',
    gap: spacing[4],
  },
  formField: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[2],
  },
  label: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    textAlign: 'left' as const,
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
  projectCountText: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
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

export function ProjectSetupView({
  selectedComplianceGroups,
  selectedFrameworks,
  projectSetup,
  onProjectSetupChange,
}: ProjectSetupViewProps) {
  // Refs for auto-scrolling
  const complianceGroupsRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const scopingRef = useRef<HTMLDivElement>(null);
  const projectSetupRef = useRef<HTMLDivElement>(null);

  const handleStepClick = () => {};

  // Auto-scroll to Project Setup section on mount
  useEffect(() => {
    if (projectSetupRef?.current) {
      setTimeout(() => {
        projectSetupRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  }, []);

  const updateProjectSetup = (frameworkId: string, field: keyof ProjectSetupData, value: string) => {
    const currentSetup = projectSetup[frameworkId] || { projectName: '', projectKey: '' };
    onProjectSetupChange(frameworkId, {
      ...currentSetup,
      [field]: value,
    });
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

  // Count total projects
  const totalProjectsCount = selectedFrameworks.length;

  return (
    <div style={styles.container}>
      <div style={styles.stepperWrapper}>
        <Stepper steps={steps} currentStep={4} onStepClick={handleStepClick} />
      </div>
      
      <div style={styles.layout}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h3 style={styles.title}>Project Setup</h3>
            <p style={styles.description}>
              Each framework will have its own dedicated compliance project for independent tracking and management.
            </p>
          </div>

          <div style={styles.projectsContainer}>
            {selectedFrameworks.map((frameworkId) => {
              const framework = frameworkDetails[frameworkId];
              const setup = projectSetup[frameworkId] || { projectName: '', projectKey: '' };
              
              return (
                <div key={frameworkId} style={styles.projectSection}>
                  <h4 style={styles.projectTitle}>{framework?.code || frameworkId}</h4>
                  
                  <div style={styles.formRow}>
                    <div style={styles.formField}>
                      <label style={styles.label}>Project name</label>
                      <TextInput
                        placeholder="Enter project name"
                        value={setup.projectName}
                        onChange={(value: string) => updateProjectSetup(frameworkId, 'projectName', value)}
                        width="lg"
                      />
                    </div>
                    
                    <div style={styles.formField}>
                      <label style={styles.label}>Project key</label>
                      <TextInput
                        placeholder="Enter key"
                        value={setup.projectKey}
                        onChange={(value: string) => updateProjectSetup(frameworkId, 'projectKey', value)}
                        width="lg"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={{ marginBottom: spacing[4] }}>
            <div style={styles.summaryHeader}>
              <h4 style={styles.summaryTitle}>Project Summary</h4>
              <span style={styles.stepIndicator}>Step 4 of 5</span>
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
              background: '#EFF8FF',
              border: `2px solid ${colors.primary[500]}`,
              borderRadius: '12px',
              boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
                <MenuLines />
                <span style={{ fontSize: '14px', fontWeight: '500', color: colors.text.neutral.dark }}>
                  Project Setup
                </span>
              </div>
              <p style={styles.projectCountText}>
                Total Projects: {totalProjectsCount} {totalProjectsCount === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
