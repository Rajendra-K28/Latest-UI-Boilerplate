export type BreadcrumbItem = {
  label: string;
  path?: string;
  icon?: React.ReactNode;
};

export type TopbarProps = {
  /** Breadcrumb navigation items */
  breadcrumbs: BreadcrumbItem[];
  
  /** User avatar URL */
  avatarUrl?: string;
  
  /** User name for avatar fallback */
  userName?: string;
  
  /** Settings icon click handler */
  onSettingsClick?: () => void;
  
  /** Notifications icon click handler */
  onNotificationsClick?: () => void;
  
  /** Avatar click handler */
  onAvatarClick?: () => void;
  
  /** Breadcrumb item click handler */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
  
  /** Notification badge count */
  notificationCount?: number;
};
