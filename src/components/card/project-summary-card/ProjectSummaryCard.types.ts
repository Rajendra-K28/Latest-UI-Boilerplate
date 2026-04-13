import type { ReactNode } from 'react';

export type ProjectSummaryItem = {
  id: string;
  label: string;
  icon?: ReactNode;
};

export type ProjectSummaryCardProps = {
  /** Title/header for the card */
  title: string;
  
  /** Icon for the title */
  titleIcon?: ReactNode;
  
  /** Array of items to display */
  items: ProjectSummaryItem[];
  
  /** Click handler */
  onClick?: () => void;
  
  /** Highlight as active/current step */
  isActive?: boolean;
  
  /** Reference for scrolling */
  scrollRef?: React.RefObject<HTMLDivElement | null>;
};
