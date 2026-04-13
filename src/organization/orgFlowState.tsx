import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { orgService } from './orgService'; 
import { AuthContext } from '../auth/authContext';
import type { Organization } from '../types/organization.types';

interface OrganizationFlowState {
  currentOrganization: Organization | null;
  organizations: Organization[];
  primaryOrganization: Organization | null;
  isLoading: boolean;
  hasNoOrganizations: boolean;
  error: string | null;
  flowAction: 'no-orgs' | 'single-org' | 'multi-org-existing' | 'multi-org-new' | null;
  message?: string;
}

interface OrganizationFlowContextType extends OrganizationFlowState {
  initializeOrganizations: (forceRefresh?: boolean) => Promise<void>;
  switchOrganization: (organization: Organization) => Promise<boolean>;
  refreshOrganizations: () => Promise<void>;
  clearError: () => void;
}

const OrganizationFlowContext = createContext<OrganizationFlowContextType | undefined>(undefined);

interface OrganizationFlowProviderProps {
  children: React.ReactNode;
}

export const OrganizationFlowProvider: React.FC<OrganizationFlowProviderProps> = ({ children }) => {
  const [state, setState] = useState<OrganizationFlowState>({
    currentOrganization: null,
    organizations: [],
    primaryOrganization: null,
    isLoading: true,
    hasNoOrganizations: false,
    error: null,
    flowAction: null,
    message: undefined
  });

  const initializeOrganizations = useCallback(async (forceRefresh = false) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = AuthContext.getUser();
      if (!user?.email) {
        throw new Error('No authenticated user found');
      }

      const authToken = AuthContext.getToken();
      if (!authToken) {
        throw new Error('No authentication token available');
      }

      const success = await orgService.initialize();

      if (success) {
        const current = orgService.getCurrentOrganization();
        const orgs = orgService.getUserOrganizations();
        const primary = orgService.getPrimaryOrganization();

        setState({
          currentOrganization: current,
          organizations: orgs,
          primaryOrganization: primary,
          isLoading: false,
          hasNoOrganizations: orgs.length === 0,
          error: null,
          flowAction: orgs.length === 0 ? 'no-orgs' : orgs.length === 1 ? 'single-org' : 'multi-org-existing',
          message: undefined
        });
      } else {
        throw new Error('Failed to initialize organizations');
      }

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize organizations',
        hasNoOrganizations: true
      }));
    }
  }, []);

  const switchOrganization = useCallback(async (organization: Organization): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const success = await orgService.switchOrganization(organization);
      
      if (success) {
        // The page will reload, so this state update may not be seen
        setState(prev => ({
          ...prev,
          currentOrganization: organization,
          isLoading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to switch organization'
        }));
      }
      
      return success;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to switch organization'
      }));
      return false;
    }
  }, []);

  const refreshOrganizations = useCallback(async () => {
    await initializeOrganizations(true);
  }, [initializeOrganizations]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

useEffect(() => {
  const initializeOnAuth = async () => {
    // Wait for auth to be fully initialized
    if (AuthContext.getUser() && AuthContext.getToken()) {
      try {
        // Add a small delay to ensure auth is fully ready
        await new Promise(resolve => setTimeout(resolve, 100));
        await initializeOrganizations();
      } catch (error) {
        // Silent error handling
      }
    }
  };

  initializeOnAuth();
}, [initializeOrganizations]);


  const contextValue: OrganizationFlowContextType = {
    ...state,
    initializeOrganizations,
    switchOrganization,
    refreshOrganizations,
    clearError
  };

  return (
    <OrganizationFlowContext.Provider value={contextValue}>
      {children}
    </OrganizationFlowContext.Provider>
  );
};

// Hook to use the organization flow context
export const useOrganizationFlow = (): OrganizationFlowContextType => {
  const context = useContext(OrganizationFlowContext);
  if (!context) {
    throw new Error('useOrganizationFlow must be used within an OrganizationFlowProvider');
  }
  return context;
};

// Component for handling organization initialization messages
export const OrganizationFlowMessage: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const { message, hasNoOrganizations, error, clearError } = useOrganizationFlow();

  if (!message && !error) return null;

  return (
    <div className={`${className}`}>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Organization Error
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {message && !error && (
        <div className={`${
          hasNoOrganizations 
            ? 'bg-yellow-50 border-yellow-200' 
            : 'bg-blue-50 border-blue-200'
        } border rounded-lg p-4`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg 
                className={`h-5 w-5 ${
                  hasNoOrganizations ? 'text-yellow-400' : 'text-blue-400'
                }`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className={`text-sm ${
                hasNoOrganizations ? 'text-yellow-700' : 'text-blue-700'
              }`}>
                {message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// HOC for components that require organization context
export const withOrganizationFlow = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function WithOrganizationFlowComponent(props: P) {
    const orgFlow = useOrganizationFlow();
    
    if (orgFlow.isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600">Loading organization data...</span>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};