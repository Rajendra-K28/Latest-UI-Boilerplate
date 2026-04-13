import { Link } from 'react-router-dom';
import { Sidebar } from '../components';
import type { SidebarNavItem as NavItem } from '../components/sidebar/Sidebar.types';
import { useState } from 'react';

export function SidebarStyleGuide() {
  const [activeItemId, setActiveItemId] = useState('security-dashboard');

  const mainNavItems: NavItem[] = [
    {
      id: 'security-dashboard',
      label: 'Security Dashboard',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="4" y="9" width="2" height="5" rx="0.5" fill="currentColor" />
          <rect x="8.5" y="7" width="2" height="7" rx="0.5" fill="currentColor" />
          <rect x="13" y="5" width="2" height="9" rx="0.5" fill="currentColor" />
          <path
            d="M3.5 10.5L7 8L10.5 9.5L14 6.5L16.5 7.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      id: 'vulnerabilities',
      label: 'Vulnerabilities',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 2L3 5.5V10C3 13.5 5.5 16.9 10 18C14.5 16.9 17 13.5 17 10V5.5L10 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 7V10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="13" r="0.9" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 8L10 5L16 8L10 11L4 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 11L10 14L16 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 14L10 17L16 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const projectNavItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      id: 'timeline',
      label: 'Timeline',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10L7 5L12 10L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16L5 12L6.5 10.5L9 13L14.5 7.5L16 9L9 16Z" fill="currentColor"/>
        </svg>
      ),
      children: [
        {
          id: 'compliance-pci',
          label: 'PCI-DSS',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" fill="#4CAF50"/>
              <path d="M8 10L9.5 11.5L12.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
        },
        {
          id: 'compliance-iso',
          label: 'ISO 27001',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" fill="#2196F3"/>
              <path d="M10 6V10L12.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
        },
        {
          id: 'compliance-gdpr',
          label: 'GDPR',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" fill="#FF9800"/>
              <path d="M10 7V10M10 13H10.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ),
        },
      ],
      isExpanded: false,
    },
    {
      id: 'vulnerability-mgmt',
      label: 'Vulnerability Mgmt',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2L3 6V10C3 14.5 6.5 18.5 10 19C13.5 18.5 17 14.5 17 10V6L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 7V11M10 13.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'project-settings',
      label: 'Project Settings',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
    }}>
      <div>
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
          Sidebar Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Navigation sidebar with organization selector
        </p>
      </div>

      {/* Interactive Example */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Interactive Example
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Full sidebar with navigation and project sections
        </p>
        <div style={{ 
          display: 'flex',
          gap: '24px',
          background: '#F9FAFB',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          minHeight: '800px',
        }}>
          <Sidebar
            organizationName="Acme Works Inc"
            mainNavItems={mainNavItems}
            currentProjectName="Annual PCI DSS Audit Q..."
            projectNavItems={projectNavItems}
            activeItemId={activeItemId}
            onNavItemClick={(item) => {
              setActiveItemId(item.id);
            }}
            onOrganizationClick={() => {}}
          />
          <div style={{ flex: 1, padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              Active Item: {activeItemId}
            </h3>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              Click on sidebar items to see the interaction. The active state is tracked and displayed here.
            </p>
          </div>
        </div>
      </section>

      {/* Design Specs */}
      <section>
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
            • Width: 272px<br />
            • Background: #0E1B35<br />
            • Padding: 16px<br />
            <br />
            <strong>Organization Selector:</strong><br />
            • Padding: 10px 12px<br />
            • Border: 1px solid #E0E7EC<br />
            • Gradient: rgba(38, 109, 240, 0.00) to rgba(38, 109, 240, 0.10)<br />
            <br />
            <strong>Navigation Items:</strong><br />
            • Hover: rgba(255, 255, 255, 0.05)<br />
            • Active: rgba(38, 109, 240, 0.15)<br />
            • Icon size: 20x20px<br />
            • Gap: 12px<br />
            <br />
            <strong>Features:</strong><br />
            • Expandable navigation items with children<br />
            • Badge support for notifications<br />
            • Organization selector with dropdown<br />
            • Current project section with divider<br />
            • Hover and active states<br />
          </p>
        </div>
      </section>
    </div>
  );
}
