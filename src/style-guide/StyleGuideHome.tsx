import { Link } from 'react-router-dom';

export function StyleGuideHome() {
  const components = [
    {
      name: 'Buttons',
      path: '/Style-Guide/button',
      description: 'Primary, secondary, and action buttons with various states and sizes',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Forms',
      path: '/Style-Guide/forms',
      description: 'Input fields, text areas, select dropdowns, and form validation',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Tables',
      path: '/Style-Guide/tables',
      description: 'Data tables with sorting, pagination, and filtering',
      status: 'Coming Soon',
      statusColor: '#F59E0B'
    },
    {
      name: 'Filter Cards',
      path: '/Style-Guide/cards',
      description: 'Metric filter cards for dashboards with configurable colors and icons',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Compliance Cards',
      path: '/Style-Guide/compliance-cards',
      description: 'Cards for compliance standards and certifications with tags',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Framework Cards',
      path: '/Style-Guide/framework-cards',
      description: 'Selectable framework cards with checkbox and optional footer',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Project Summary Cards',
      path: '/Style-Guide/project-summary-cards',
      description: 'Compact summary cards with icon lists (36px rows)',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Active Projects Table',
      path: '/Style-Guide/active-projects-table',
      description: 'Data table with progress tracking, compliance badges, and empty state',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Defense Roadmap Table',
      path: '/Style-Guide/defense-roadmap-table',
      description: 'Activity table with filters, search, pagination, and status badges',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Projects Table',
      path: '/Style-Guide/projects-table',
      description: 'Comprehensive projects table with owner, compliance, and progress',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Sidebar',
      path: '/Style-Guide/sidebar',
      description: 'Navigation sidebar with organization selector and nested items',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Topbar',
      path: '/Style-Guide/topbar',
      description: 'Navigation topbar with breadcrumbs, icons, and avatar',
      status: 'Complete',
      statusColor: '#10B981'
    },
    {
      name: 'Modals',
      path: '/Style-Guide/modals',
      description: 'Dialog boxes and overlays for user interactions',
      status: 'Coming Soon',
      statusColor: '#F59E0B'
    },
    {
      name: 'Navigation',
      path: '/Style-Guide/navigation',
      description: 'Navigation bars, breadcrumbs, and menu components',
      status: 'Coming Soon',
      statusColor: '#F59E0B'
    }
  ];

  return (
    <div style={{ 
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '12px', color: 'white' }}>
          Design System Style Guide
        </h1>
        <p style={{ fontSize: '18px', color: '#6B7280', lineHeight: '1.6' }}>
          A comprehensive collection of reusable components, patterns, and design guidelines 
          based on our Figma design system. Use this as a reference for building consistent 
          and accessible user interfaces.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {components.map((component) => (
          <Link
            key={component.path}
            to={component.path}
            style={{ 
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <div style={{
              padding: '24px',
              background: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              transition: 'all 0.2s',
              cursor: 'pointer',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#266DF0';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(38, 109, 240, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: '#111827',
                  margin: 0
                }}>
                  {component.name}
                </h3>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'white',
                  background: component.statusColor
                }}>
                  {component.status}
                </span>
              </div>
              <p style={{ 
                fontSize: '14px', 
                color: '#6B7280',
                lineHeight: '1.5',
                margin: 0
              }}>
                {component.description}
              </p>
              <div style={{ 
                marginTop: '16px',
                fontSize: '14px',
                color: '#266DF0',
                fontWeight: 500
              }}>
                View documentation →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ 
        marginTop: '64px',
        padding: '32px',
        background: '#F9FAFB',
        borderRadius: '12px',
        border: '1px solid #E5E7EB'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: '#111827' }}>
          Design Principles
        </h2>
        <ul style={{ 
          fontSize: '14px', 
          color: '#6B7280',
          lineHeight: '1.8',
          paddingLeft: '20px'
        }}>
          <li>Consistency: Use consistent spacing, colors, and typography throughout</li>
          <li>Accessibility: All components meet WCAG 2.1 AA standards</li>
          <li>Responsive: Components adapt seamlessly to different screen sizes</li>
          <li>Performance: Optimized for fast loading and smooth interactions</li>
          <li>Developer Experience: Clear documentation and easy-to-use APIs</li>
        </ul>
      </div>
    </div>
  );
}
