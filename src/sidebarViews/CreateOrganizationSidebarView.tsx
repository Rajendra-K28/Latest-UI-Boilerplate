import { useState } from 'react';
import { colors, spacing } from '../design-system/tokens';
import { SelectInput } from '../components';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: spacing[6],
    display: 'flex',
    flexDirection: 'column' as const,
  },
  sectionHeader: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
    lineHeight: '20px',
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[5],
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  fieldLabel: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  input: {
    width: '100%',
    height: '44px',
    padding: `${spacing[3]} ${spacing[3]}`,
    fontSize: '14px',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    color: colors.text.neutral.main,
    background: 'white',
    boxSizing: 'border-box' as const,
  },
};

export function CreateOrganizationSidebarView() {
  const [companyName, setCompanyName] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');

  const employeeRangeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '10-50', label: '10-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Section Header */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Create New Organization</h2>
          <p style={styles.sectionSubtitle}>Enter your organization details to get started.</p>
        </div>

        {/* Form Fields */}
        <div style={styles.formGrid}>
          <div style={styles.formRow}>
            <label style={styles.fieldLabel}>Company Name</label>
            <input
              type="text"
              style={styles.input}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.fieldLabel}>Number of Employees</label>
            <SelectInput
              value={numberOfEmployees}
              onChange={setNumberOfEmployees}
              options={employeeRangeOptions}
              placeholder="Select employee range"
              width="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
