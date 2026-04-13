export type Project = {
  id: string;
  projectId: string;
  projectName: string;
  compliance: {
    type: string;
    label: string;
    icon?: React.ReactNode;
  };
  progress: {
    percentage: number;
    completed: number;
    total: number;
  };
  nextMilestone: {
    title: string;
    dueDate: string;
    status: 'overdue' | 'today' | 'tomorrow' | 'upcoming';
  };
};

export type ActiveProjectsTableProps = {
  /** Title for the table (optional - can be hidden when used in custom wrapper) */
  title?: string;
  
  /** Total count to display in badge */
  totalCount?: number;
  
  /** Description text */
  description?: string;
  
  /** Show "View All" link */
  showViewAll?: boolean;
  
  /** View All click handler */
  onViewAll?: () => void;
  
  /** Array of projects */
  projects: Project[];
  
  /** Empty state configuration */
  emptyState?: {
    illustration?: React.ReactNode;
    message: string;
    buttonText?: string;
    onButtonClick?: () => void;
  };
  
  /** Show pagination controls (default: true) */
  showPagination?: boolean;
};
