import type { ReactNode } from 'react';

export type ComplianceCardProps = {
  /** The icon to display at the top */
  icon: ReactNode;
  
  /** Background color for the icon wrapper */
  iconBackgroundColor: string;
  
  /** The title of the compliance standard */
  title: string;
  
  /** Description text below the title */
  description: string;
  
  /** Array of tag labels to display at the bottom */
  tags: string[];
  
  /** Optional small badge label in the top-right (e.g. "PCI", "VA") */
  badgeLabel?: string;
  /** Background color for the badge pill */
  badgeBackgroundColor?: string;
  /** Text color for the badge pill */
  badgeTextColor?: string;

  /** Number of used project slots (e.g. 1 in "1 / 2 used") */
  usedSlots?: number;
  /** Total project slots available (e.g. 2 in "1 / 2 used") */
  maxSlots?: number;
  
  /** Show check badge in top right (default: false) */
  showCheckBadge?: boolean;
  
  /** Click handler */
  onClick?: () => void;
};
