export interface ProjectData {
  id: string;
  projectId: string;
  projectName: string;
}

export const PROJECTS_DATA: Record<string, ProjectData> = {
  '1': {
    id: '1',
    projectId: 'PR25001',
    projectName: 'Annual PCI DSS Audit Q1 2025',
  },
  '2': {
    id: '2',
    projectId: 'PR25002',
    projectName: 'Enterprise-wide Access Control Assessment',
  },
  '3': {
    id: '3',
    projectId: 'PR25003',
    projectName: 'SOC 2 Type II Observation Examination',
  },
  '4': {
    id: '4',
    projectId: 'PR25004',
    projectName: 'Annual GDPR Data Mapping Review',
  },
  '5': {
    id: '5',
    projectId: 'PR25005',
    projectName: 'HIPAA Security Rule Risk Assessment',
  },
};

export const getProjectById = (id: string | undefined): ProjectData | undefined => {
  if (!id) return undefined;
  return PROJECTS_DATA[id];
};

export const getProjectName = (id: string | undefined): string => {
  const project = getProjectById(id);
  return project?.projectName ?? 'Unknown Project';
};
