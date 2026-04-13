import { Link } from 'react-router-dom';
import { ActiveProjectsTable, PCIBadge, ISOBadge, SOCBadge, EmptyStateIllustration } from '../components';
import type { Project } from '../components';

export function ActiveProjectsTableStyleGuide() {
  const sampleProjects: Project[] = [
    {
      id: '1',
      projectId: 'PR25001',
      projectName: 'Annual PCI DSS Audit Q1 20 Project ',
      compliance: {
        type: 'pci',
        label: 'PCI DSS v4.0',
        icon: <PCIBadge size={20} />,
      },
      progress: {
        percentage: 60,
        completed: 12,
        total: 20,
      },
      nextMilestone: {
        title: 'Upload Evidence for Requirement v3.1',
        dueDate: '2 Days ago',
        status: 'overdue',
      },
    },
    {
      id: '2',
      projectId: 'PR25002',
      projectName: 'Enterprise-wide Access Control Policy',
      compliance: {
        type: 'iso',
        label: 'ISO 27001:2022',
        icon: <ISOBadge />,
      },
      progress: {
        percentage: 72,
        completed: 34,
        total: 42,
      },
      nextMilestone: {
        title: 'Upload Evidence for Requirement v3.1',
        dueDate: 'Tomorrow',
        status: 'tomorrow',
      },
    },
    {
      id: '3',
      projectId: 'PR25003',
      projectName: 'SOC 2 Type II Observation Engineerin...',
      compliance: {
        type: 'soc',
        label: 'SOC 2 Type II',
        icon: <SOCBadge size={20} />,
      },
      progress: {
        percentage: 78,
        completed: 15,
        total: 20,
      },
      nextMilestone: {
        title: 'Upload Evidence for Requirement v3.1',
        dueDate: 'FRI, 27 Dec',
        status: 'upcoming',
      },
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
          Active Projects Table Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Table with empty and filled states
        </p>
      </div>

      {/* Filled State */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Filled State
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Table showing active projects with progress tracking
        </p>
        <div style={{ marginBottom: '16px', overflow: 'auto' }}>
          <ActiveProjectsTable
            title="Active Projects"
            totalCount={8}
            description="Track progress, status and upcoming deadlines across all projects."
            showViewAll={true}
            projects={sampleProjects}
            onViewAll={() => {}}
          />
        </div>
      </section>

      {/* Empty State */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Empty State
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Displayed when no projects exist
        </p>
        <div style={{ marginBottom: '16px', overflow: 'auto' }}>
          <ActiveProjectsTable
            title="Active Projects"
            description="Track progress, status and upcoming deadlines across all project."
            showViewAll={true}
            projects={[]}
            emptyState={{
              illustration: <EmptyStateIllustration />,
              message: "You don't have any active projects yet, create a project using one of our templates for ISO 27001, SOC 2, or GDPR.",
              buttonText: 'Create Project',
              onButtonClick: () => {},
            }}
          />
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
            • Width: 1118px<br />
            • Border radius: 16px<br />
            • Border: 1px solid #DEE4EE<br />
            • Background: #FFF<br />
            <br />
            <strong>Grid Layout:</strong><br />
            • Columns: 90px | 1fr | 140px | 200px | 260px<br />
            • Gap: 16px<br />
            <br />
            <strong>Features:</strong><br />
            • Progress bars with percentage<br />
            • Compliance badges with icons<br />
            • Status-based milestone colors<br />
            • Truncated project names with ellipsis<br />
            • Empty state with illustration<br />
            • Auto-count badge based on projects<br />
          </p>
        </div>
      </section>
    </div>
  );
}
