export type ProjectTableItem = {
  id: string;
  /** Backend unique key (projects.key) used for URLs */
  projectKey?: string;
  projectId: string;
  projectName: string;
  /** Human‑readable last updated label, e.g. "Updated 3 days ago" */
  updatedAtLabel: string;
  type: {
    label: string;
    /** Text color for the type badge */
    color: string;
    /** Background color for the type badge */
    background: string;
  };
  owner: {
    name: string;
    avatar?: string;
  };
  progress: {
    percentage: number;
    completed: number;
    total: number;
    /** Optional: number of PCI ASV windows completed (0‑4) */
    windowsCompleted?: number;
    /** Optional: total PCI ASV windows (defaults to 4 when provided) */
    windowsTotal?: number;
    /** Optional: total scans for External VA Scans (usually 12) */
    scansTotal?: number;
    /** Optional: human label for scan tenure, e.g. "Monthly" */
    scanTenure?: string;
  };
  status: 'in-progress' | 'scheduled' | 'completed';
};

export type ProjectsTableProps = {
  /** Array of projects */
  projects?: ProjectTableItem[];

  /** When true, shows skeleton rows (use while parent fetch is in flight) */
  isLoading?: boolean;
  
  /** Current filter tab */
  currentFilter?: 'all' | 'active' | 'completed';
  
  /** Filter change handler */
  onFilterChange?: (filter: 'all' | 'active' | 'completed') => void;
  
  /** Search value */
  searchValue?: string;
  
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  
  /** Optional: when provided, project name is clickable and navigates to project overview */
  onProjectClick?: (project: ProjectTableItem) => void;
};
