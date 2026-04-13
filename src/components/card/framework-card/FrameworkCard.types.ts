export type FrameworkCardProps = {
  /** The main title/name of the framework */
  title: string;
  
  /** The framework code/version */
  code: string;
  
  /** Description of the framework */
  description: string;
  
  /** Whether the card is selected */
  isSelected?: boolean;
  
  /** Callback when selection changes */
  onSelectionChange?: (selected: boolean) => void;
  
  /** Click handler */
  onClick?: () => void;
};

export type FrameworkItem = {
  id: string;
  title: string;
  code: string;
  description: string;
};

export type FrameworkListProps = {
  /** Title for the framework list */
  title: string;
  
  /** Array of framework items */
  items: FrameworkItem[];
  
  /** Array of selected framework IDs */
  selectedIds?: string[];
  
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;
  
  /** Show deselect all link */
  showDeselectAll?: boolean;
};
