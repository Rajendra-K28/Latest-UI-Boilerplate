import { useRef } from 'react';
import { colors, spacing } from '../../design-system/tokens';
import { 
  Stepper, 
  ProjectSummaryCard, 
  CollapsibleSection, 
  SelectInput, 
  TextArea, 
  Toggle, 
  TagGroup,
  CheckCircleFilled,
  ShieldBlue,
  DocumentBlue,
} from '../../components';

type FrameworkScopingConfig = {
  entityType?: string;
  pciLevel?: string;
  assessmentPath?: string;
  description?: string;
  implementationIntent?: string[];
};

type ConfigureScopingViewProps = {
  selectedComplianceGroups: string[];
  selectedFrameworks: string[];
  scopingConfig: Record<string, FrameworkScopingConfig>;
  onScopingConfigChange: (frameworkId: string, config: FrameworkScopingConfig) => void;
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
  frameworksContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
    maxWidth: '600px',
  },
  formRow: {
    display: 'flex',
    gap: spacing[4],
    marginBottom: spacing[4],
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
  sublabel: {
    fontSize: '13px',
    color: colors.text.neutral.sub,
    marginTop: '2px',
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

const entityTypeOptions = [
  { value: 'merchant', label: 'Merchant' },
  { value: 'service-provider', label: 'Service Provider' },
];

const pciLevelOptions = [
  { value: 'level-1', label: 'Level 1' },
  { value: 'level-2', label: 'Level 2' },
  { value: 'level-3', label: 'Level 3' },
  { value: 'level-4', label: 'Level 4' },
];

const assessmentPathOptions = [
  { value: 'saq', label: 'SAQ' },
  { value: 'roc', label: 'ROC' },
];

const implementationIntentOptions = [
  { value: 'certification', label: 'Certification' },
  { value: 'internal-use', label: 'Internal Use' },
  { value: 'client-requirement', label: 'Client Requirement' },
  { value: 'best-practice', label: 'Best Practice' },
];

export function ConfigureScopingView({
  selectedComplianceGroups,
  selectedFrameworks,
  scopingConfig,
  onScopingConfigChange,
}: ConfigureScopingViewProps) {
  // Refs for auto-scrolling
  const complianceGroupsRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const scopingRef = useRef<HTMLDivElement>(null);

  const handleStepClick = () => {};

  const updateConfig = (frameworkId: string, field: string, value: any) => {
    const currentConfig = scopingConfig[frameworkId] || {};
    onScopingConfigChange(frameworkId, {
      ...currentConfig,
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

  const scopingItems = selectedFrameworks
    .filter(frameworkId => {
      const config = scopingConfig[frameworkId];
      return config && (
        config.entityType || 
        config.pciLevel || 
        config.assessmentPath || 
        config.description || 
        (config.implementationIntent && config.implementationIntent.length > 0)
      );
    })
    .map((frameworkId) => {
      const framework = frameworkDetails[frameworkId];
      return {
        id: `scoping-${frameworkId}`,
        label: `${framework?.code || frameworkId} - Configured`,
        icon: <CheckCircleFilled />,
      };
    });

  const renderPCIDSS = (frameworkId: string) => {
    const config = scopingConfig[frameworkId] || {};
    
    return (
      <CollapsibleSection title="PCI DSS 4.0">
        <div style={styles.formRow}>
          <div style={styles.formField}>
            <label style={styles.label}>Entity Type</label>
            <SelectInput
              placeholder="Select entity type"
              value={config.entityType || ''}
              onChange={(value: string) => updateConfig(frameworkId, 'entityType', value)}
              options={entityTypeOptions}
              width="md"
            />
          </div>
          
          <div style={styles.formField}>
            <label style={styles.label}>PCI level</label>
            <SelectInput
              placeholder="Select level"
              value={config.pciLevel || ''}
              onChange={(value: string) => updateConfig(frameworkId, 'pciLevel', value)}
              options={pciLevelOptions}
              width="md"
            />
          </div>
        </div>

        <div style={{ ...styles.formField, marginBottom: 0 }}>
          <label style={styles.label}>Assessment Path</label>
          <div style={styles.sublabel}>Self-Assessment Questionnaire (SAQ)</div>
          <Toggle
            options={assessmentPathOptions}
            value={config.assessmentPath || 'saq'}
            onChange={(value: string) => updateConfig(frameworkId, 'assessmentPath', value)}
          />
        </div>
      </CollapsibleSection>
    );
  };

  const renderISOFramework = (frameworkId: string) => {
    const framework = frameworkDetails[frameworkId];
    const config = scopingConfig[frameworkId] || {};
    
    return (
      <CollapsibleSection title={framework?.code || frameworkId}>
        <div style={styles.formField}>
          <label style={styles.label}>Description</label>
          <TextArea
            placeholder="Describe the organizational scope for this ISO standard (e.g., departments, locations, processes covered)..."
            value={config.description || ''}
            onChange={(value: string) => updateConfig(frameworkId, 'description', value)}
            rows={4}
            width="lg"
          />
        </div>

        <div style={{ ...styles.formField, marginTop: spacing[4] }}>
          <label style={styles.label}>Implementation Intent</label>
          <TagGroup
            options={implementationIntentOptions}
            selectedValues={config.implementationIntent || []}
            onChange={(values: string[]) => updateConfig(frameworkId, 'implementationIntent', values)}
          />
        </div>
      </CollapsibleSection>
    );
  };

  const renderFramework = (frameworkId: string) => {
    // PCI DSS has specific fields
    if (frameworkId === 'pci-dss-40') {
      return renderPCIDSS(frameworkId);
    }
    
    // All other frameworks use the generic ISO format
    return renderISOFramework(frameworkId);
  };

  return (
    <div style={styles.container}>
      <div style={styles.stepperWrapper}>
        <Stepper steps={steps} currentStep={3} onStepClick={handleStepClick} />
      </div>
      
      <div style={styles.layout}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h3 style={styles.title}>Configure Scoping</h3>
            <p style={styles.description}>
              Define the scope and configuration for each selected framework. These settings will help tailor the compliance requirements.
            </p>
          </div>

          <div style={styles.frameworksContainer}>
            {selectedFrameworks.map((frameworkId) => (
              <div key={frameworkId}>
                {renderFramework(frameworkId)}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={{ marginBottom: spacing[4] }}>
            <div style={styles.summaryHeader}>
              <h4 style={styles.summaryTitle}>Project Summary</h4>
              <span style={styles.stepIndicator}>Step 3 of 5</span>
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
              items={scopingItems.length > 0 ? scopingItems : [
                {
                  id: 'no-scoping',
                  label: 'No scoping configured',
                },
              ]}
              isActive={true}
              scrollRef={scopingRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
