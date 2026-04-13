/**
 * Organization Onboarding Guard
 * Ensures user has organization context before accessing the app
 * Handles: No orgs, Single org, Multiple orgs
 */

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { OrgContext } from '../orgContext';
import { orgService } from '../orgService';
import { OrgOnboardingModal } from './orgOnboardModal';
import { OrgSelector } from './orgSelector';
import type { Organization } from '../../types/organization.types';

type GuardState = 'loading' | 'no-org' | 'select-org' | 'ready';

export const OrgOnboardingGuard = () => {
  const [state, setState] = useState<GuardState>('loading');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeOrganization();
  }, []);

  const initializeOrganization = async () => {
    try {
      console.log('🏢 Initializing organization context...');

      // Try to initialize from API
      const initialized = await orgService.initialize();
      
      // Get organizations from service
      const orgs = orgService.getUserOrganizations();
      setOrganizations(orgs);

      console.log(`📊 Found ${orgs.length} organization(s)`);

      // Handle based on number of organizations
      if (orgs.length === 0) {
        // NO ORGANIZATIONS - Show creation modal
        console.log('❌ No organizations found - showing creation modal');
        setState('no-org');
        return;
      }

      if (orgs.length === 1) {
        // SINGLE ORGANIZATION - Auto-select and proceed
        console.log(`✅ Auto-selecting organization: ${orgs[0].name}`);
        await orgService.switchOrganization(orgs[0], true);
        setState('ready');
        return;
      }

      // MULTIPLE ORGANIZATIONS - Check if already selected
      const currentOrgId = OrgContext.getCurrentOrganization();
      
      if (currentOrgId && orgs.find(o => o._id === currentOrgId)) {
        // Already has valid selection - proceed
        console.log(`✅ Using existing organization selection: ${currentOrgId}`);
        setState('ready');
      } else {
        // Show selector for user to choose
        console.log(`🔍 Multiple organizations - showing selector`);
        setState('select-org');
      }
    } catch (err) {
      console.error('❌ Failed to initialize organization:', err);
      setError('Failed to load organization data');
      setState('no-org'); // Fallback to creation modal
    }
  };

  const handleOrganizationCreated = async () => {
    try {
      // Re-initialize after organization creation
      const success = await orgService.initialize();
      
      if (success) {
        const orgs = orgService.getUserOrganizations();
        setOrganizations(orgs);
        
        if (orgs.length > 0) {
          // Auto-select the newly created organization
          const newOrg = orgs.find(o => o.isPrimary) || orgs[0];
          await orgService.switchOrganization(newOrg, true);
          setState('ready');
        } else {
          setState('no-org');
        }
      }
    } catch (err) {
      console.error('Failed to initialize after org creation');
      setError('Organization created but failed to initialize');
    }
  };

  const handleOrganizationSelected = async (orgId: string) => {
    try {
      const org = organizations.find(o => o._id === orgId);
      if (org) {
        await orgService.switchOrganization(org);
        setState('ready');
      }
    } catch (err) {
      console.error('Failed to select organization');
      setError('Failed to select organization');
    }
  };

  // Loading state
  if (state === 'loading') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <div>Initializing organization...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // No organizations - show creation modal
  if (state === 'no-org') {
    const user = AuthContext.getUser();
    return (
      <OrgOnboardingModal
        userEmail={user?.email || ''}
        onComplete={handleOrganizationCreated}
      />
    );
  }

  // Multiple organizations - show selector
  if (state === 'select-org') {
    const user = AuthContext.getUser();
    return (
      <OrgSelector
        organizations={organizations}
        currentOrgId={OrgContext.getCurrentOrganization()}
        userEmail={user?.email || ''}
        onSelectOrganization={handleOrganizationSelected}
        onCreateNew={() => setState('no-org')}
      />
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '20px'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e53e3e' }}>
          Organization Error
        </div>
        <div style={{ fontSize: '16px', color: '#4a5568' }}>
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Ready - render app
  return <Outlet />;
};
