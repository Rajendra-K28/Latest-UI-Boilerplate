// Role definitions - immutable and normalized
export const ROLES = {
  // Client roles
  CLIENT_ADMIN: 'CLIENT_ADMIN',
  CLIENT_PROJECT_MANAGER: 'CLIENT_PROJECT_MANAGER',
  CLIENT_PROJECT_USER: 'CLIENT_PROJECT_USER',
  
  // Tribal roles
  TRIBAL_ADMIN: 'TRIBAL_ADMIN',
  TRIBAL_CONSULTANT_MANAGER: 'TRIBAL_CONSULTANT_MANAGER',
  TRIBAL_CONSULTANT_USER: 'TRIBAL_CONSULTANT_USER',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const CLIENT_ROLES: Role[] = [
  ROLES.CLIENT_ADMIN,
  ROLES.CLIENT_PROJECT_MANAGER,
  ROLES.CLIENT_PROJECT_USER,
];

export const TRIBAL_ROLES: Role[] = [
  ROLES.TRIBAL_ADMIN,
  ROLES.TRIBAL_CONSULTANT_MANAGER,
  ROLES.TRIBAL_CONSULTANT_USER,
];

export const isClientRole = (role: Role): boolean => {
  return CLIENT_ROLES.includes(role);
};

export const isTribalRole = (role: Role): boolean => {
  return TRIBAL_ROLES.includes(role);
};
