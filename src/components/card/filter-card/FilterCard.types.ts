import type { CSSProperties, ReactNode } from 'react';

export type FilterCardVariant = 'blue' | 'yellow' | 'green' | 'red' | 'gray' | 'gold';

export type FilterCardProps = {
  /** The main number or count to display */
  value: string | number;
  
  /** The label text below the value */
  label: string;
  
  /** The icon to display in the top right */
  icon: ReactNode;
  
  /** The color variant of the card (affects the bottom border) */
  variant?: FilterCardVariant;
  
  /** Custom icon color (overrides variant color) */
  iconColor?: string;

  /** Optional override for the icon container background (e.g. design token match) */
  iconBackgroundColor?: string;
  
  /** Show the bottom accent bar (default: true) */
  showAccentBar?: boolean;
  
  /** Optional footer content (e.g. trend, comparison text) */
  footer?: ReactNode;

  /** Optional inline style override for value text */
  valueStyle?: CSSProperties;
  
  /** Click handler */
  onClick?: () => void;
};
