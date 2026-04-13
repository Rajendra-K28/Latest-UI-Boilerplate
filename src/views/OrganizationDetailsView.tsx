import { useState } from 'react';
import { colors, spacing } from '../design-system/tokens';
import { TextInput, SelectInput, Button, SideDrawer, Edit, Plus, Camera } from '../components';
import { CreateOrganizationSidebarView } from '../sidebarViews';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    background: colors.bg.surface.default,
  },
  newOrgButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  newOrgIcon: {
    width: '16px',
    height: '16px',
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: `${spacing[6]} ${spacing[8]}`,
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[6],
  },
  title: {
    fontSize: '24px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
  },
  subtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    textAlign: 'left' as const,
  },
  section: {
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    padding: spacing[6],
    marginBottom: spacing[6],
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[1],
    textAlign: 'left' as const,
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    marginBottom: spacing[5],
    textAlign: 'left' as const,
  },
  editButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '6px',
    color: colors.primary[500],
    transition: 'all 0.2s ease',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[4],
    marginBottom: spacing[4],
  },
  formRow: {
    gridColumn: '1 / -1',
  },
  fieldLabel: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    textAlign: 'left' as const,
    display: 'block',
  },
  logoUpload: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
    marginBottom: spacing[4],
  },
  logoPreview: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#F97066',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    color: 'white',
  },
  uploadIconButton: {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'white',
    border: `2px solid ${colors.stroke.neutral.light}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  uploadIconSvg: {
    width: '12px',
    height: '12px',
    color: colors.text.neutral.main,
  },
};

export function OrganizationDetailsView() {
  const [companyName, setCompanyName] = useState('Acme Works Inc');
  const [email, setEmail] = useState('name@acmeworks.com');
  const [phoneCountry, setPhoneCountry] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('9998883331');
  const [website, setWebsite] = useState('https://acmeworks.com');
  const [country, setCountry] = useState('United States of America');
  const [stateProvince, setStateProvince] = useState('Acme Works Inc');
  const [legalEntity, setLegalEntity] = useState('Acme works Pvt Ltd');
  const [taxId, setTaxId] = useState('12-3456789');
  const [billingAddress, setBillingAddress] = useState('https://acmeworks.com');
  const [zipCode, setZipCode] = useState('90210');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCreateOrganization = () => {
    // TODO: Implement organization creation logic
    // When implemented, get orgData from form state
    setIsDrawerOpen(false);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div style={styles.container}>
      {/* Content */}
      <div style={styles.content}>
        <div style={styles.titleSection}>
          <div>
            <h1 style={styles.title}>Organization Details</h1>
            <p style={styles.subtitle}>Manage your organization profile, branding, and contact information.</p>
          </div>
          <Button
            label="New Organization"
            variant="primary"
            onClick={() => setIsDrawerOpen(true)}
            icon={<div style={styles.newOrgIcon}><Plus /></div>}
            iconPosition="left"
          />
        </div>

        {/* Basic Info Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Basic Info</h2>
              <p style={styles.sectionSubtitle}>Manage your org info here.</p>
            </div>
            <button
              type="button"
              style={styles.editButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EFF8FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Edit />
            </button>
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.fieldLabel}>Company Name</label>
              <TextInput
                value={companyName}
                onChange={setCompanyName}
                width="lg"
              />
            </div>

            <div style={styles.formRow}>
              <label style={styles.fieldLabel}>Company Logo</label>
              <div style={styles.logoUpload}>
                <div style={styles.logoPreview}>
                  <div style={styles.logoIcon}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="white" opacity="0.3"/>
                    </svg>
                  </div>
                  <div style={styles.uploadIconButton}>
                    <div style={styles.uploadIconSvg}>
                      <Camera />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label style={styles.fieldLabel}>Email address</label>
              <TextInput
                value={email}
                onChange={setEmail}
                width="lg"
              />
            </div>

            <div>
              <label style={styles.fieldLabel}>Phone number</label>
              <div style={{ display: 'flex', gap: spacing[2] }}>
                <div style={{ width: '100px' }}>
                  <SelectInput
                    value={phoneCountry}
                    onChange={setPhoneCountry}
                    options={[
                      { value: '+1', label: '🇺🇸 +1' },
                      { value: '+91', label: '🇮🇳 +91' },
                      { value: '+44', label: '🇬🇧 +44' },
                    ]}
                    width="sm"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <TextInput
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    width="lg"
                  />
                </div>
              </div>
            </div>

            <div style={styles.formRow}>
              <label style={styles.fieldLabel}>Website</label>
              <TextInput
                value={website}
                onChange={setWebsite}
                width="lg"
              />
            </div>
          </div>
        </div>

        {/* Billing & Tax Details Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Billing & Tax Details</h2>
              <p style={styles.sectionSubtitle}>Manage your registered business address and tax identification numbers for invoicing.</p>
            </div>
            <button
              type="button"
              style={styles.editButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EFF8FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Edit />
            </button>
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.fieldLabel}>Country</label>
              <SelectInput
                value={country}
                onChange={setCountry}
                options={[
                  { value: 'United States of America', label: 'United States of America' },
                  { value: 'India', label: 'India' },
                  { value: 'United Kingdom', label: 'United Kingdom' },
                ]}
                width="lg"
              />
            </div>

            <div style={styles.formRow}>
              <label style={styles.fieldLabel}>State/Province</label>
              <TextInput
                value={stateProvince}
                onChange={setStateProvince}
                width="lg"
              />
            </div>

            <div>
              <label style={styles.fieldLabel}>Legal entity name</label>
              <TextInput
                value={legalEntity}
                onChange={setLegalEntity}
                width="lg"
              />
            </div>

            <div>
              <label style={styles.fieldLabel}>EIN / Tax ID</label>
              <TextInput
                value={taxId}
                onChange={setTaxId}
                width="lg"
              />
            </div>

            <div style={styles.formRow}>
              <label style={styles.fieldLabel}>Billing address</label>
              <TextInput
                value={billingAddress}
                onChange={setBillingAddress}
                width="lg"
              />
            </div>

            <div style={styles.formRow}>
              <label style={styles.fieldLabel}>Zip code</label>
              <TextInput
                value={zipCode}
                onChange={setZipCode}
                width="lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Side Drawer for New Organization */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Create new organization"
        primaryButtonLabel="Create Organization"
        secondaryButtonLabel="Cancel"
        onPrimaryClick={handleCreateOrganization}
        onSecondaryClick={handleCloseDrawer}
      >
        <CreateOrganizationSidebarView />
      </SideDrawer>
    </div>
  );
}
