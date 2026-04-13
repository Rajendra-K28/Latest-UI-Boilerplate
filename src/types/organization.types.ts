/**
 * Organization Types
 */

export interface Organization {
  _id: string;
  name: string;
  imageUrl?: string;
  role?: string;
  isPrimary?: boolean;
}

export interface OrganizationData {
  _id: string;
  name: string;
  imageUrl?: string;
  role: string;
  timestamp: string;
}

export interface UserOrganizationsResponse {
  organizations: Organization[];
}

export interface CurrentUserResponse {
  currentUser: any;
  company: any;
  organizations: Organization[];
}
