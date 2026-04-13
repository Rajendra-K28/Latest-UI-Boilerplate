/**
 * Authentication Context
 * Local development auth mode without external IAM dependency.
 */

import type { AuthUser } from '../types/auth.types';
import { STORAGE_KEYS } from '../config/constants';
import { apiService } from '../api/api.service';

class AuthenticationService {
  private static instance: AuthenticationService;
  private readonly mockToken = 'local-dev-token';
  private readonly mockUser: AuthUser = {
    userId: 'local-dev-user',
    dbUserId: 'local-dev-user',
    email: 'dev.user@local',
    name: 'Local Dev User',
    preferredUsername: 'local-dev-user',
    firstName: 'Local',
    lastName: 'User',
  };

  private constructor() {}

  static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  async initAuth(): Promise<boolean> {
    this.storeTokens();
    await this.enrichAndStoreUser();
    return true;
  }

  /**
   * Store token in sessionStorage
   */
  private storeTokens(): void {
    sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, this.mockToken);
  }

  /**
   * Enrich local auth user with CVM DB user id from backend `/api/users/me`
   * and store in sessionStorage. Falls back to mock user if API is unavailable.
   */
  private async enrichAndStoreUser(): Promise<void> {
    const baseUser = this.mockUser;

    let dbUserId: string | undefined;
    try {
      const me = await apiService.get<{ currentUser?: { id?: string } }>('/api/users/me');
      dbUserId = me?.currentUser?.id;
    } catch {
      // Ignore API errors in local auth mode.
    }

    const enriched: AuthUser = {
      ...baseUser,
      dbUserId: dbUserId || baseUser.userId,
    };

    sessionStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(enriched));
  }
  /**
   * Ensure user is authenticated
   */
  async ensureAuth(): Promise<boolean> {
    if (this.isAuthenticated()) {
      return true;
    }

    try {
      await this.login();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Login entrypoint for local mode
   */
  async login(redirectUri?: string): Promise<void> {
    this.storeTokens();
    await this.enrichAndStoreUser();

    if (redirectUri) {
      window.location.assign(redirectUri);
    }
  }

  /**
   * Logout
   */
  async logout(redirectUri?: string): Promise<void> {
    this.clearSession();

    if (redirectUri) {
      window.location.assign(redirectUri);
      return;
    }

    window.location.assign(window.location.origin);
  }

  /**
   * Clear session data
   */
  private clearSession(): void {
    sessionStorage.clear();
    localStorage.removeItem(STORAGE_KEYS.SELECTED_ORG_ID);
  }

  /**
   * Get current token
   */
  getToken(): string | undefined {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || undefined;
  }

  /**
   * Get user information
   */
  getUser(): AuthUser | null {
    const userStr = sessionStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  /**
   * Refresh token manually
   */
  async refreshToken(): Promise<boolean> {
    this.storeTokens();
    return true;
  }
}

// Export singleton instance
export const AuthContext = AuthenticationService.getInstance();
