/**
 * API Service - Axios Configuration with Token Management
 * Handles automatic token injection, organization headers, and token refresh
 */

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { AuthContext } from '../auth/authContext';
import { OrgContext } from '../organization/orgContext';
import { ENV } from '../config/constants';

class ApiService {
  private readonly axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - inject token and organization header
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Inject auth token
        const token = AuthContext.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Inject organization header
        const orgId = OrgContext.getCurrentOrganization();
        if (orgId) {
          config.headers['x-organization-id'] = orgId;
        }

        return config;
      },
      (error) => {
        throw error;
      }
    );

    // Response interceptor - handle token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue request while refreshing
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => {
                throw err;
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Attempt token refresh
            const refreshed = await AuthContext.refreshToken();

            if (refreshed) {
              // Process queued requests
              this.failedQueue.forEach((prom) => prom.resolve());
              this.failedQueue = [];

              // Retry original request
              return this.axiosInstance(originalRequest);
            } else {
              // Refresh failed - logout
              this.failedQueue.forEach((prom) => prom.reject(error));
              this.failedQueue = [];
              await AuthContext.logout();
              throw error;
            }
          } catch (refreshError) {
            this.failedQueue.forEach((prom) => prom.reject(refreshError));
            this.failedQueue = [];
            await AuthContext.logout();
            throw refreshError;
          } finally {
            this.isRefreshing = false;
          }
        }

        throw this.sanitizeError(error);
      }
    );
  }

  /**
   * Sanitize error to prevent information leakage
   */
  private sanitizeError(error: AxiosError): Error {
    const responseMessage = (error.response?.data as any)?.message;
    const message =
      typeof responseMessage === 'string'
        ? responseMessage
        : Array.isArray(responseMessage)
          ? responseMessage.join(', ')
          : responseMessage
            ? JSON.stringify(responseMessage)
            : error.response?.statusText || 'Request failed';
    const sanitizedError = new Error(message);
    (sanitizedError as any).status = error.response?.status;
    (sanitizedError as any).data = {
      message,
    };
    return sanitizedError;
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  /**
   * Get axios instance for custom requests
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Export singleton instance
export const apiService = new ApiService();
