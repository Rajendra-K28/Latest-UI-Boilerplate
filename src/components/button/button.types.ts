import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonHierarchy =
  | 'primary'
  | 'secondary-gray'
  | 'secondary-white'
  | 'tertiary-gray'
  | 'link-gray';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonIconConfig =
  | 'none'        // Text only
  | 'left'        // Icon left + text
  | 'right'       // Icon right + text
  | 'only';       // Icon only

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Button text.
   * Optional to allow icon-only buttons.
   */
  label?: string;

  /**
   * Preferred API (matches Figma docs).
   * Maps internally to `hierarchy` + `destructive`.
   */
  variant?: ButtonVariant;

  /** Preferred API for icon placement (left/right). */
  iconPosition?: 'left' | 'right';

  /**
   * Legacy API (kept for backwards compatibility in existing screens).
   * Prefer `variant` + `iconPosition`.
   */
  hierarchy?: ButtonHierarchy;
  iconConfig?: ButtonIconConfig;
  destructive?: boolean;

  /** Size variant */
  size?: ButtonSize;

  /** Optional icon */
  icon?: ReactNode;

  /** Disabled state */
  disabled?: boolean;

  /** Click handler */
  onClick?: () => void;
};
