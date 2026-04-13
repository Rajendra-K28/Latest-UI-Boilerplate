/**
 * Organization Context - Session Storage Management
 * Manages organization state and caching
 */

import type { OrganizationData, Organization } from '../types/organization.types';
import { STORAGE_KEYS, CACHE_CONFIG } from '../config/constants';
import { apiService } from '../api/api.service';

class OrganizationContext {
  private static instance: OrganizationContext;

  private constructor() {}

  static getInstance(): OrganizationContext {
    if (!OrganizationContext.instance) {
      OrganizationContext.instance = new OrganizationContext();
    }
    return OrganizationContext.instance;
  }

  /**
   * Get current organization ID
   */
  getCurrentOrganization(): string | null {
    return sessionStorage.getItem(STORAGE_KEYS.ORG_ID);
  }

  /**
   * Select an organization
   */
  selectOrganization(orgId: string, orgData?: Organization): void {
    sessionStorage.setItem(STORAGE_KEYS.ORG_ID, orgId);
    
    if (orgData) {
      const data: OrganizationData = {
        _id: orgData._id,
        name: orgData.name,
        imageUrl: orgData.imageUrl,
        role: orgData.role || 'user',
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem(STORAGE_KEYS.ORG_DATA, JSON.stringify(data));
      sessionStorage.setItem(STORAGE_KEYS.ORG_ROLE, data.role);
    }

    // Persist selection in localStorage for UX
    localStorage.setItem(STORAGE_KEYS.SELECTED_ORG_ID, orgId);
  }

  /**
   * Get organization data
   */
  getOrganizationData(): OrganizationData | null {
    const dataStr = sessionStorage.getItem(STORAGE_KEYS.ORG_DATA);
    if (!dataStr) return null;

    try {
      return JSON.parse(dataStr);
    } catch {
      return null;
    }
  }

  /**
   * Get available organizations
   */
  getAvailableOrganizations(): Organization[] {
    const orgsStr = sessionStorage.getItem(STORAGE_KEYS.ORG_AVAILABLE);
    if (!orgsStr) return [];

    try {
      return JSON.parse(orgsStr);
    } catch {
      return [];
    }
  }

  /**
   * Set available organizations
   */
  setAvailableOrganizations(orgs: Organization[]): void {
    sessionStorage.setItem(STORAGE_KEYS.ORG_AVAILABLE, JSON.stringify(orgs));
  }

  /**
   * Check if cache is stale
   */
  isCacheStale(): boolean {
    const data = this.getOrganizationData();
    if (!data || !data.timestamp) return true;

    const age = Date.now() - new Date(data.timestamp).getTime();
    return age > CACHE_CONFIG.ORG_MAX_AGE;
  }

  /**
   * Initialize organization data from API
   */
  async initializeFromAPI(): Promise<boolean> {
    try {
      // Fetch user organizations
      const response = await apiService.get<{ organizations: Organization[] }>('/api/users/organizations');
      const organizations = response.organizations || [];

      if (organizations.length === 0) {
        return false;
      }

      this.setAvailableOrganizations(organizations);

      // Try to restore last selected org
      const lastSelectedId = localStorage.getItem(STORAGE_KEYS.SELECTED_ORG_ID);
      const lastSelected = organizations.find(org => org._id === lastSelectedId);

      // Select primary org or first available
      const primaryOrg = organizations.find(org => org.isPrimary);
      const orgToSelect = lastSelected || primaryOrg || organizations[0];

      this.selectOrganization(orgToSelect._id, orgToSelect);

      return true;
    } catch (error) {
      console.error('Failed to initialize organization data');
      return false;
    }
  }

  /**
   * Verify organization context is valid
   */
  async verify(): Promise<boolean> {
    const orgId = this.getCurrentOrganization();
    
    if (!orgId) {
      return await this.initializeFromAPI();
    }

    if (this.isCacheStale()) {
      return await this.initializeFromAPI();
    }

    return true;
  }

  /**
   * Clear organization data
   */
  clear(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ORG_ID);
    sessionStorage.removeItem(STORAGE_KEYS.ORG_ROLE);
    sessionStorage.removeItem(STORAGE_KEYS.ORG_DATA);
    sessionStorage.removeItem(STORAGE_KEYS.ORG_USER);
    sessionStorage.removeItem(STORAGE_KEYS.ORG_AVAILABLE);
  }

  /**
   * Get user role in current organization
   */
  getCurrentRole(): string | null {
    return sessionStorage.getItem(STORAGE_KEYS.ORG_ROLE);
  }
}

// Export singleton instance
export const OrgContext = OrganizationContext.getInstance();
