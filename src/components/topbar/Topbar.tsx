import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import type { TopbarProps } from './Topbar.types';
import { topbarStyles } from './Topbar.styles';
import { Settings, Bell } from '../index';
import { AuthContext } from '../../auth/authContext';
import { OrgContext } from '../../organization/orgContext';

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Project Created',
    message: 'PCI DSS project was created successfully.',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    title: 'Evidence Uploaded',
    message: 'New evidence was uploaded for PR25001.',
    time: '15m ago',
    read: false,
  },
  {
    id: '3',
    title: 'Reminder',
    message: 'Security assessment is due tomorrow.',
    time: '1h ago',
    read: false,
  },
  {
    id: '4',
    title: 'Action Point Updated',
    message: 'A critical action point was marked complete.',
    time: '3h ago',
    read: true,
  },
  {
    id: '5',
    title: 'Weekly Summary',
    message: 'Your compliance summary is now available.',
    time: '1d ago',
    read: true,
  },
];

export function Topbar({
  breadcrumbs,
  avatarUrl,
  userName = 'User',
  onSettingsClick,
  onNotificationsClick,
  onAvatarClick,
  onBreadcrumbClick,
  notificationCount,
}: TopbarProps) {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 72, right: 24 });
  const [avatarDropdownPosition, setAvatarDropdownPosition] = useState({ top: 72, right: 24 });

  // Get user info from AuthContext
  const user = AuthContext.getUser();
  const displayName = user?.name || user?.email || userName;
  const userEmail = user?.email || '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Handle notifications dropdown
      const clickedBell = notificationRef.current?.contains(target);
      const clickedNotificationDropdown = notificationDropdownRef.current?.contains(target);
      if (!clickedBell && !clickedNotificationDropdown) {
        setIsNotificationsOpen(false);
      }

      // Handle avatar dropdown
      const clickedAvatar = avatarRef.current?.contains(target);
      const clickedAvatarDropdown = avatarDropdownRef.current?.contains(target);
      if (!clickedAvatar && !clickedAvatarDropdown) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((item) => !item.read).length;
  
  const handleIconButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = '#F9FAFB';
  };

  const handleIconButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'transparent';
  };

  const handleBreadcrumbHover = (e: React.MouseEvent<HTMLSpanElement>, isLast: boolean) => {
    if (!isLast) {
      e.currentTarget.style.color = '#2363DA';
    }
  };

  const handleBreadcrumbLeave = (e: React.MouseEvent<HTMLSpanElement>, isLast: boolean) => {
    if (!isLast) {
      e.currentTarget.style.color = '#667085';
    }
  };

  const toggleNotifications = () => {
    if (bellButtonRef.current) {
      const rect = bellButtonRef.current.getBoundingClientRect();
      const newPosition = {
        top: rect.bottom + 8,
        right: Math.max(16, window.innerWidth - rect.right),
      };
      setDropdownPosition(newPosition);
    }
    setIsNotificationsOpen((prev) => !prev);
    onNotificationsClick?.();
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const toggleAvatarMenu = () => {
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      const newPosition = {
        top: rect.bottom + 8,
        right: Math.max(16, window.innerWidth - rect.right),
      };
      setAvatarDropdownPosition(newPosition);
    }
    setIsAvatarMenuOpen((prev) => !prev);
    onAvatarClick?.();
  };

  const handleLogout = async () => {
    try {
      setIsAvatarMenuOpen(false);
      await AuthContext.logout();
    } catch (error) {
      console.error('Logout failed');
    }
  };

  const handleProfileClick = () => {
    setIsAvatarMenuOpen(false);
    navigate('/profile');
  };

  return (
    <div style={topbarStyles.container}>
      {/* Left Section - Breadcrumbs */}
      <div style={topbarStyles.leftSection}>
        {/* Home Icon */}
        <div 
          style={topbarStyles.homeIcon}
          onClick={() =>
            onBreadcrumbClick?.(
              { label: 'Security Dashboard', path: '/security-dashboard' },
              0
            )
          }
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 7L10 2L18 7V17C18 17.5304 17.7893 18.0391 17.4142 18.4142C17.0391 18.7893 16.5304 19 16 19H4C3.46957 19 2.96086 18.7893 2.58579 18.4142C2.21071 18.0391 2 17.5304 2 17V7Z"
              stroke="#667085"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Breadcrumb Items */}
        <div style={topbarStyles.breadcrumbs}>
          {/* Home label */}
          <span
            style={topbarStyles.breadcrumbHome}
            onClick={() =>
              onBreadcrumbClick?.(
                { label: 'Security Dashboard', path: '/security-dashboard' },
                0
              )
            }
            onMouseEnter={(e) => handleBreadcrumbHover(e, false)}
            onMouseLeave={(e) => handleBreadcrumbLeave(e, false)}
          >
            Home
          </span>

          {breadcrumbs.length > 0 && (
            <span style={topbarStyles.separator}>/</span>
          )}

          {breadcrumbs.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {index > 0 && (
                <span style={topbarStyles.separator}>/</span>
              )}
              <span
                style={topbarStyles.breadcrumbItem(index === breadcrumbs.length - 1)}
                onClick={() => index < breadcrumbs.length - 1 && onBreadcrumbClick?.(item, index)}
                onMouseEnter={(e) => handleBreadcrumbHover(e, index === breadcrumbs.length - 1)}
                onMouseLeave={(e) => handleBreadcrumbLeave(e, index === breadcrumbs.length - 1)}
              >
                {item.icon && (
                  <span style={{ ...topbarStyles.breadcrumbIcon, marginRight: 4 }}>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Icons & Avatar */}
      <div style={topbarStyles.rightSection}>
        {/* Settings Icon */}
        <button
          style={topbarStyles.iconButton}
          onClick={onSettingsClick}
          onMouseEnter={handleIconButtonHover}
          onMouseLeave={handleIconButtonLeave}
        >
          <div style={topbarStyles.iconButtonIcon}>
            <Settings />
          </div>
        </button>

        {/* Notifications Icon */}
        <div style={topbarStyles.notificationWrapper} ref={notificationRef}>
          <button
            ref={bellButtonRef}
            style={topbarStyles.iconButton}
            onClick={toggleNotifications}
            onMouseEnter={handleIconButtonHover}
            onMouseLeave={handleIconButtonLeave}
          >
            <div style={topbarStyles.iconButtonIcon}>
              <Bell />
            </div>
            {(unreadCount > 0 || (notificationCount && notificationCount > 0)) && (
              <span style={topbarStyles.notificationBadge}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen &&
            createPortal(
              <div
                ref={notificationDropdownRef}
                style={{
                  ...topbarStyles.notificationDropdown,
                  position: 'fixed',
                  top: `${dropdownPosition.top}px`,
                  right: `${dropdownPosition.right}px`,
                  display: 'block',
                  zIndex: 2147483647,
                }}
              >
              <div style={topbarStyles.notificationDropdownHeader}>
                <span style={topbarStyles.notificationTitle}>Notifications</span>
                <button
                  type="button"
                  style={topbarStyles.markAllReadButton}
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              </div>
              <div style={topbarStyles.notificationList}>
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    style={topbarStyles.notificationItem(!item.read)}
                    onClick={() => markNotificationAsRead(item.id)}
                  >
                    <div style={topbarStyles.notificationItemHeader}>
                      <span style={topbarStyles.notificationItemTitle}>{item.title}</span>
                      {!item.read && <span style={topbarStyles.unreadDot} />}
                    </div>
                    <span style={topbarStyles.notificationItemMessage}>{item.message}</span>
                    <span style={topbarStyles.notificationItemTime}>{item.time}</span>
                  </button>
                ))}
              </div>
              </div>,
              document.body
            )}
        </div>

        {/* Avatar with Dropdown */}
        <div ref={avatarRef} style={{ position: 'relative' }}>
          <div 
            style={{
              ...topbarStyles.avatar,
              cursor: 'pointer'
            }} 
            onClick={toggleAvatarMenu}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} style={topbarStyles.avatarImage} />
            ) : (
              <span style={topbarStyles.avatarFallback}>
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Avatar Dropdown Menu */}
          {isAvatarMenuOpen &&
            createPortal(
              <div
                ref={avatarDropdownRef}
                style={{
                  position: 'fixed',
                  top: `${avatarDropdownPosition.top}px`,
                  right: `${avatarDropdownPosition.right}px`,
                  width: '240px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 2147483647,
                  overflow: 'hidden',
                }}
              >
                {/* User Info Section */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid #E5E7EB',
                  backgroundColor: '#F9FAFB'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    {displayName}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6B7280'
                  }}>
                    {userEmail}
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ padding: '8px 0' }}>
                  {/* Profile Option */}
                  <button
                    type="button"
                    onClick={handleProfileClick}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      color: '#374151',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#6B7280"/>
                      <path d="M10 12C4.477 12 0 14.015 0 16.5C0 18.985 4.477 20 10 20C15.523 20 20 18.985 20 16.5C20 14.015 15.523 12 10 12Z" fill="#6B7280"/>
                    </svg>
                    <span>Profile</span>
                  </button>

                  {/* Logout Option */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      color: '#DC2626',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FEF2F2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 14L18 9M18 9L13 4M18 9H7M7 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2H7" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
}
