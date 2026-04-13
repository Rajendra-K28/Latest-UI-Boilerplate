import { spacing } from '../../design-system/tokens';
import { ArrowLeft, ChevronDown, Building, Users, CreditCard } from '../index';

interface OrganizationSidebarProps {
  activeView: 'organization-details' | 'team-members' | 'billing-plans';
  onNavigate: (view: 'organization-details' | 'team-members' | 'billing-plans') => void;
  onBackToDashboard: () => void;
  organizationName: string;
}

const styles = {
  container: {
    width: '240px',
    height: '100vh',
    background: '#0E1B35',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: spacing[4],
  },
  logo: {
    padding: `${spacing[4]} 0`,
    marginBottom: spacing[6],
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700' as const,
    color: 'white',
  },
  orgSection: {
    marginBottom: spacing[6],
  },
  orgLabel: {
    fontSize: '11px',
    fontWeight: '600' as const,
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: spacing[3],
    paddingLeft: spacing[2],
    textAlign: 'left' as const,
  },
  orgCard: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[3],
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  orgIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#F97066',
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  orgIconText: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: 'white',
  },
  orgName: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: 'white',
    flex: 1,
    textAlign: 'left' as const,
  },
  orgChevron: {
    width: '16px',
    height: '16px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[2]} ${spacing[3]}`,
    background: 'rgba(255, 255, 255, 0.08)',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500' as const,
    cursor: 'pointer',
    marginBottom: spacing[6],
    transition: 'all 0.2s ease',
    width: '100%',
    textAlign: 'left' as const,
  },
  backIcon: {
    width: '16px',
    height: '16px',
  },
  navSection: {
    flex: 1,
  },
  navLabel: {
    fontSize: '11px',
    fontWeight: '600' as const,
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: spacing[3],
    paddingLeft: spacing[2],
    textAlign: 'left' as const,
  },
  navItem: (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[2]} ${spacing[3]}`,
    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'none',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500' as const,
    cursor: 'pointer',
    marginBottom: spacing[1],
    transition: 'all 0.2s ease',
    width: '100%',
    textAlign: 'left' as const,
  }),
  navIcon: {
    width: '20px',
    height: '20px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
};

export function OrganizationSidebar({
  activeView,
  onNavigate,
  onBackToDashboard,
  organizationName,
}: OrganizationSidebarProps) {
  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logo}>
        <div style={styles.logoText}>Logo Comes Here</div>
      </div>

      {/* Organization */}
      <div style={styles.orgSection}>
        <div style={styles.orgLabel}>Organisation</div>
        <div style={styles.orgCard}>
          <div style={styles.orgIcon}>
            <span style={styles.orgIconText}>{organizationName.charAt(0)}</span>
          </div>
          <span style={styles.orgName}>{organizationName}</span>
          <div style={styles.orgChevron}>
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Back to Dashboard */}
      <button
        type="button"
        style={styles.backButton}
        onClick={onBackToDashboard}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        }}
      >
          <div style={styles.backIcon}>
            <ArrowLeft />
          </div>
        Back to Dashboard
      </button>

      {/* Navigation */}
      <div style={styles.navSection}>
        <div style={styles.navLabel}>Organisation settings</div>
        
        <button
          type="button"
          style={styles.navItem(activeView === 'organization-details')}
          onClick={() => onNavigate('organization-details')}
          onMouseEnter={(e) => {
            if (activeView !== 'organization-details') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeView !== 'organization-details') {
              e.currentTarget.style.background = 'none';
            }
          }}
        >
          <div style={styles.navIcon}>
            <Building />
          </div>
          Organization Details
        </button>

        <button
          type="button"
          style={styles.navItem(activeView === 'team-members')}
          onClick={() => onNavigate('team-members')}
          onMouseEnter={(e) => {
            if (activeView !== 'team-members') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeView !== 'team-members') {
              e.currentTarget.style.background = 'none';
            }
          }}
        >
          <div style={styles.navIcon}>
            <Users />
          </div>
          Team Members
        </button>

        <button
          type="button"
          style={styles.navItem(activeView === 'billing-plans')}
          onClick={() => onNavigate('billing-plans')}
          onMouseEnter={(e) => {
            if (activeView !== 'billing-plans') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeView !== 'billing-plans') {
              e.currentTarget.style.background = 'none';
            }
          }}
        >
          <div style={styles.navIcon}>
            <CreditCard />
          </div>
          Billing & Plans
        </button>
      </div>
    </div>
  );
}
