export type ProjectSettingsTabId = 'project-details' | 'team-members';

export type TeamMemberRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  lastActive: string;
  avatar: string;
};
