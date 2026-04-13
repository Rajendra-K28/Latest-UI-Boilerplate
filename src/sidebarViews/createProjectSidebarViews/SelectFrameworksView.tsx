import { useRef } from 'react';
import { colors, spacing } from '../../design-system/tokens';
import {
  CheckCircleFilled,
  DocumentBlue,
  FrameworkList,
  ProjectSummaryCard,
  ShieldBlue,
  Stepper,
} from '../../components';
import type { FrameworkItem } from '../../components';

type SelectFrameworksViewProps = {
  selectedComplianceGroups: string[];
  selectedFrameworks: string[];
  onToggleFramework: (frameworkId: string) => void;
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
    gap: spacing[5],
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

// Framework data based on selected compliance groups
const pciFrameworks: FrameworkItem[] = [
  {
    id: 'pci-dss-40',
    title: 'PCI DSS',
    code: 'PCI DSS 4.0',
    description: 'Payment Card Industry Data Security Standard',
  },
];

const isoFrameworks: FrameworkItem[] = [
  {
    id: 'iso-27001',
    title: 'ISO/IEC 27001',
    code: 'ISO/IEC 27001:2022',
    description: 'Information Security Management',
  },
  {
    id: 'iso-27002',
    title: 'ISO/IEC 27002',
    code: 'ISO/IEC 27002:2022',
    description: 'Code of Practice for Information Security Controls',
  },
  {
    id: 'iso-27017',
    title: 'ISO/IEC 27017',
    code: 'ISO/IEC 27017:2015',
    description: 'Cloud Services Information Security',
  },
  {
    id: 'iso-27018',
    title: 'ISO/IEC 27018',
    code: 'ISO/IEC 27018:2019',
    description: 'Protection of PII in Public Cloud',
  },
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    code: 'ISO 9001:2015',
    description: 'Quality Management Systems',
  },
];

const privacyFrameworks: FrameworkItem[] = [
  {
    id: 'gdpr',
    title: 'GDPR',
    code: 'EU 2016/679',
    description: 'General Data Protection Regulation',
  },
  {
    id: 'hipaa',
    title: 'HIPAA',
    code: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
  },
  {
    id: 'ccpa',
    title: 'CCPA',
    code: 'CCPA',
    description: 'California Consumer Privacy Act',
  },
];

const trustFrameworks: FrameworkItem[] = [
  {
    id: 'soc1',
    title: 'SOC 1',
    code: 'SOC 1',
    description: 'Service Organization Control Reports',
  },
  {
    id: 'soc2',
    title: 'SOC 2',
    code: 'SOC 2',
    description: 'Trust Services Criteria',
  },
  {
    id: 'soc3',
    title: 'SOC 3',
    code: 'SOC 3',
    description: 'Trust Services Report for Service Organizations',
  },
];

export function SelectFrameworksView({
  selectedComplianceGroups,
  selectedFrameworks,
  onToggleFramework,
}: SelectFrameworksViewProps) {
  // Refs for auto-scrolling
  const complianceGroupsRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);

  const handleStepClick = () => {};

  const handleFrameworkSelectionChange = (groupId: string, frameworkIds: string[]) => {
    // Get all frameworks for this group
    const allFrameworks = [...pciFrameworks, ...isoFrameworks, ...privacyFrameworks, ...trustFrameworks];
    const groupFrameworkIds = allFrameworks
      .filter(f => {
        if (groupId === 'pci') return pciFrameworks.some(pf => pf.id === f.id);
        if (groupId === 'iso') return isoFrameworks.some(pf => pf.id === f.id);
        if (groupId === 'privacy') return privacyFrameworks.some(pf => pf.id === f.id);
        if (groupId === 'trust') return trustFrameworks.some(pf => pf.id === f.id);
        return false;
      })
      .map(f => f.id);
    
    // Get currently selected frameworks from this group
    const currentGroupSelections = selectedFrameworks.filter(id => groupFrameworkIds.includes(id));
    
    // Find what changed
    const addedFrameworks = frameworkIds.filter(id => !currentGroupSelections.includes(id));
    const removedFrameworks = currentGroupSelections.filter(id => !frameworkIds.includes(id));
    
    // Handle bulk add
    if (addedFrameworks.length > 0) {
      addedFrameworks.forEach(id => onToggleFramework(id));
    }
    
    // Handle bulk remove (Deselect All)
    if (removedFrameworks.length > 0) {
      removedFrameworks.forEach(id => onToggleFramework(id));
    }
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

  const standardsItems = selectedFrameworks.length > 0
    ? selectedFrameworks.map((frameworkId) => {
        // Find the framework in all lists
        const allFrameworks = [...pciFrameworks, ...isoFrameworks, ...privacyFrameworks, ...trustFrameworks];
        const framework = allFrameworks.find(f => f.id === frameworkId);
        
        return {
          id: frameworkId,
          label: framework ? `${framework.title}` : frameworkId,
          icon: <CheckCircleFilled />,
        };
      })
    : [
        {
          id: 'no-standards',
          label: 'No standards/frameworks/regulations selected',
        },
      ];

  return (
    <div style={styles.container}>
      <div style={styles.stepperWrapper}>
        <Stepper steps={steps} currentStep={2} onStepClick={handleStepClick} />
      </div>
      
      <div style={styles.layout}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h3 style={styles.title}>Select Standards / Frameworks / Regulations</h3>
            <p style={styles.description}>
              Choose the specific compliance standards, frameworks, and regulations you want to implement. These are grouped by the categories you selected.
            </p>
          </div>

          <div style={styles.frameworksContainer}>
            {selectedComplianceGroups.includes('pci') && (
              <FrameworkList
                title="PCI Compliance"
                items={pciFrameworks}
                selectedIds={selectedFrameworks.filter(id => pciFrameworks.some(f => f.id === id))}
                onSelectionChange={(ids: string[]) => handleFrameworkSelectionChange('pci', ids)}
              />
            )}

            {selectedComplianceGroups.includes('iso') && (
              <FrameworkList
                title="ISO Frameworks"
                items={isoFrameworks}
                selectedIds={selectedFrameworks.filter(id => isoFrameworks.some(f => f.id === id))}
                onSelectionChange={(ids: string[]) => handleFrameworkSelectionChange('iso', ids)}
              />
            )}

            {selectedComplianceGroups.includes('privacy') && (
              <FrameworkList
                title="Privacy & Data Protection"
                items={privacyFrameworks}
                selectedIds={selectedFrameworks.filter(id => privacyFrameworks.some(f => f.id === id))}
                onSelectionChange={(ids: string[]) => handleFrameworkSelectionChange('privacy', ids)}
              />
            )}

            {selectedComplianceGroups.includes('trust') && (
              <FrameworkList
                title="Trust, Assurance & Audit"
                items={trustFrameworks}
                selectedIds={selectedFrameworks.filter(id => trustFrameworks.some(f => f.id === id))}
                onSelectionChange={(ids: string[]) => handleFrameworkSelectionChange('trust', ids)}
              />
            )}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={{ marginBottom: spacing[4] }}>
            <div style={styles.summaryHeader}>
              <h4 style={styles.summaryTitle}>Project Summary</h4>
              <span style={styles.stepIndicator}>Step 2 of 5</span>
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
              isActive={true}
              scrollRef={standardsRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
