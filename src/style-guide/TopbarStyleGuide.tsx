import { Link } from 'react-router-dom';
import { Topbar } from '../components';
import type { BreadcrumbItem } from '../components';
import { useState } from 'react';

export function TopbarStyleGuide() {
  const [notificationCount] = useState(3);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Projects',
      path: '/projects',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M2 7L10 2L18 7V17C18 17.5304 17.7893 18.0391 17.4142 18.4142C17.0391 18.7893 16.5304 19 16 19H4C3.46957 19 2.96086 18.7893 2.58579 18.4142C2.21071 18.0391 2 17.5304 2 17V7Z" 
            stroke="#667085" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'Annual PCI DSS Audit Q1 2025',
      path: '/projects/annual-pci-dss-audit',
    },
    {
      label: 'Vulnerability Management',
      path: '/projects/annual-pci-dss-audit/vulnerability',
    },
  ];

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
    }}>
      <div style={{ padding: '40px' }}>
        <Link 
          to="/Style-Guide" 
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6B7280',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '24px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#266DF0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
        >
          <span>←</span> Back to Style Guide
        </Link>
        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '8px' }}>
          Topbar Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Navigation topbar with breadcrumbs
        </p>
      </div>

      {/* Interactive Example */}
      <section style={{ width: '100%' }}>
        <div style={{ padding: '0 40px 40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
            Interactive Example
          </h2>
          <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
            Topbar with breadcrumbs, settings, notifications, and avatar
          </p>
        </div>
        
        <Topbar
          breadcrumbs={breadcrumbs}
          userName="Anita R Reddy"
          notificationCount={notificationCount}
          onSettingsClick={() => {}}
          onNotificationsClick={() => {}}
          onAvatarClick={() => {}}
          onBreadcrumbClick={() => {}}
        />

        <div style={{ padding: '40px', background: '#F9FAFB' }}>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            Click on breadcrumb items, icons, or the avatar to see interactions in the console.
          </p>
        </div>
      </section>

      {/* Design Specs */}
      <section style={{ padding: '0 40px 40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Design Specifications
        </h2>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <p style={{ color: '#344054', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Container:</strong><br />
            • Height: 64px<br />
            • Padding: 0 24px<br />
            • Border bottom: 1px solid #E2E8F0<br />
            <br />
            <strong>Breadcrumbs:</strong><br />
            • Text color: #667085<br />
            • Active color: #2363DA<br />
            • Hover: Darker blue<br />
            • Font size: 14px<br />
            <br />
            <strong>Icons:</strong><br />
            • Size: 40x40px container<br />
            • Icon: 20x20px<br />
            • Hover: Light gray background<br />
            • Notification badge support<br />
            <br />
            <strong>Avatar:</strong><br />
            • Size: 40x40px<br />
            • Border radius: 1000px<br />
            • Background: #F7F9FB (fallback)<br />
            • Text: First letter of name<br />
            <br />
            <strong>Features:</strong><br />
            • Clickable breadcrumb navigation<br />
            • Home/folder icon support<br />
            • Settings and notifications icons<br />
            • Notification count badge<br />
            • Avatar with image or fallback<br />
          </p>
        </div>
      </section>
    </div>
  );
}
