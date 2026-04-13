import type { ReactNode, CSSProperties } from 'react';
import type { ButtonVariant } from '../button/button.types';

export type SideDrawerProps = {
  /** Whether the drawer is open */
  isOpen: boolean;
  
  /** Callback when drawer should close */
  onClose: () => void;
  
  /** Title text in the header */
  title: string;
  
  /** Optional subtitle text below the title */
  subtitle?: ReactNode;
  
  /** Optional icon to show in the header (left side) */
  icon?: ReactNode;
  
  /** Content to render in the drawer body */
  children?: ReactNode;
  
  /** Primary button label (default: "Continue") */
  primaryButtonLabel?: string;
  
  /** Secondary button label (default: "Cancel") */
  secondaryButtonLabel?: string;
  
  /** Primary button click handler */
  onPrimaryClick?: () => void;
  
  /** Secondary button click handler */
  onSecondaryClick?: () => void;
  
  /** Width of the drawer (default: "600px") */
  width?: string;

  /** Optional overlay background color */
  overlayBackground?: string;

  /** Base z-index (overlay uses this, drawer uses +1) */
  zIndexBase?: number;
  
  /** Disable primary button */
  primaryButtonDisabled?: boolean;
  
  /** Loading state for primary button */
  primaryButtonLoading?: boolean;

  /** Variant for the primary button (default: 'primary') */
  primaryButtonVariant?: ButtonVariant;

  /** Optional text/content on the left side of the footer */
  footerNote?: ReactNode;

  /** Control visibility of primary footer button (default: true) */
  showPrimaryButton?: boolean;

  /** Control visibility of secondary footer button (default: true) */
  showSecondaryButton?: boolean;

  /** Alignment of footer buttons (default: "space-between") */
  buttonAlignment?: 'space-between' | 'right';

  /** Optional inline style for the secondary footer button */
  secondaryButtonStyle?: CSSProperties;

  /** Optional inline style for the primary footer button */
  primaryButtonStyle?: CSSProperties;

  /** Optional content to render in the header (e.g. back/forward) between title and close */
  headerRightContent?: ReactNode;
};
