export type RoadmapActivity = {
  id: string;
  date: string;
  activity: string;
  projectName: string;
  status: 'overdue' | 'in-progress' | 'scheduled';
};

export type DefenseRoadmapTableProps = {
  /** Array of roadmap activities */
  activities: RoadmapActivity[];
  
  /** Current filter tab */
  currentFilter?: 'all' | 'overdue' | 'in-progress' | 'scheduled';
  
  /** Filter change handler */
  onFilterChange?: (filter: 'all' | 'overdue' | 'in-progress' | 'scheduled') => void;
  
  /** Search value */
  searchValue?: string;
  
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  
  /** Selected project filter */
  selectedProject?: string;
  
  /** Project filter change handler */
  onProjectChange?: (project: string) => void;
  
  /** Pagination: current page */
  currentPage?: number;
  
  /** Pagination: items per page */
  itemsPerPage?: number;
  
  /** Pagination: page change handler */
  onPageChange?: (page: number) => void;
  
  /** Pagination: items per page change handler */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
};
