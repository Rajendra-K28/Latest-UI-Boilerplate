/**
 * Authentication Types
 */

export interface AuthUser {
  userId: string;
  dbUserId?: string;
  email?: string;
  name?: string;
  preferredUsername?: string;
  firstName?: string;
  lastName?: string;
}
