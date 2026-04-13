/**
 * Organization Service - Advanced Organization Management
 * Handles organization switching and event management
 */

import type { Organization } from '../types/organization.types';
import { OrgContext } from './orgContext';
import { apiService } from '../api/api.service';

type OrganizationChangeListener = (organization: Organization) => void;

class OrganizationService {
  private static instance: OrganizationService;
  private listeners: OrganizationChangeListener[] = [];
  private currentOrganization: Organization | null = null;
  private userOrganizations: Organization[] = [];
  private primaryOrganization: Organization | null = null;

  private constructor() {}

  static getInstance(): OrganizationService {
    if (!OrganizationService.instance) {
      OrganizationService.instance = new OrganizationService();
    }
    return OrganizationService.instance;
  }

  /**
   * Initialize organization data
   */
  async initialize(): Promise<boolean> {
    try {
      const response = await apiService.get<{ organizations: Organization[] }>('/api/users/organizations');
      this.userOrganizations = response.organizations || [];
      this.primaryOrganization = this.userOrganizations.find(org => org.isPrimary) || null;

      const currentOrgId = OrgContext.getCurrentOrganization();
      if (currentOrgId) {
        this.currentOrganization = this.userOrganizations.find(org => org._id === currentOrgId) || null;
      }

      if (!this.currentOrganization && this.userOrganizations.length > 0) {
        const orgToSelect = this.primaryOrganization || this.userOrganizations[0];
        await this.switchOrganization(orgToSelect, true);
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize organization service');
      return false;
    }
  }

  /**
   * Switch to a different organization
   */
  async switchOrganization(organization: Organization, skipApiCall = false): Promise<boolean> {
    try {
      // Validate organization is accessible
      if (!this.userOrganizations.find(org => org._id === organization._id)) {
        throw new Error('Organization not accessible');
      }

      // Update backend context (unless skipping)
      if (!skipApiCall) {
        await apiService.patch('/api/users/switch-organization', {
          orgId: organization._id,
        });
      }

      // Update local context
      OrgContext.selectOrganization(organization._id, organization);
      this.currentOrganization = organization;

      // Notify listeners
      this.notifyListeners(organization);

      return true;
    } catch (error) {
      console.error('Failed to switch organization');
      return false;
    }
  }

  /**
   * Get current organization
   */
  getCurrentOrganization(): Organization | null {
    return this.currentOrganization;
  }

  /**
   * Get all user organizations
   */
  getUserOrganizations(): Organization[] {
    return this.userOrganizations;
  }

  /**
   * Get primary organization
   */
  getPrimaryOrganization(): Organization | null {
    return this.primaryOrganization;
  }

  /**
   * Add organization change listener
   */
  addListener(listener: OrganizationChangeListener): void {
    this.listeners.push(listener);
  }

  /**
   * Remove organization change listener
   */
  removeListener(listener: OrganizationChangeListener): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Notify all listeners of organization change
   */
  private notifyListeners(organization: Organization): void {
    this.listeners.forEach(listener => {
      try {
        listener(organization);
      } catch (error) {
        console.error('Error in organization change listener');
      }
    });
  }

  /**
   * Clear organization data
   */
  clear(): void {
    this.currentOrganization = null;
    this.userOrganizations = [];
    this.primaryOrganization = null;
    this.listeners = [];
    OrgContext.clear();
  }
}

// Export singleton instance
export const orgService = OrganizationService.getInstance();
