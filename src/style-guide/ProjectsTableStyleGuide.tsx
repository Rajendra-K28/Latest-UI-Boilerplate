import { Link } from 'react-router-dom';
import { ProjectsTable, PCIBadge, ISOBadge, SOCBadge, GDPRBadge, HIPAABadge } from '../components';
import type { ProjectTableItem } from '../components';
import { useState } from 'react';

export function ProjectsTableStyleGuide() {
  const [currentFilter, setCurrentFilter] = useState<'all' | 'in-progress' | 'completed' | 'scheduled'>('all');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCompliance, setSelectedCompliance] = useState('All Compliance type');

  const sampleProjects: ProjectTableItem[] = [
    {
      id: '1',
      projectId: 'PR25001',
      projectName: 'Annual PCI DSS Audit Q1 20...',
      compliance: {
        type: 'pci',
        label: 'PCI DSS v4.0',
        icon: <PCIBadge size={20} />,
      },
      owner: {
        name: 'Anita R Reddy',
        avatar: undefined,
      },
      progress: {
        percentage: 60,
        completed: 12,
        total: 20,
      },
      status: 'in-progress',
    },
    {
      id: '2',
      projectId: 'PR25002',
      projectName: 'Enterprise-wide Access Con...',
      compliance: {
        type: 'iso',
        label: 'ISO 27001:2022',
        icon: <ISOBadge size={20} />,
      },
      owner: {
        name: 'Anita R Reddy',
        avatar: undefined,
      },
      progress: {
        percentage: 72,
        completed: 34,
        total: 42,
      },
      status: 'in-progress',
    },
    {
      id: '3',
      projectId: 'PR25003',
      projectName: 'SOC 2 Type II Observation E...',
      compliance: {
        type: 'soc',
        label: 'SOC 2 Type II',
        icon: <SOCBadge size={20} />,
      },
      owner: {
        name: 'Anita R Reddy',
        avatar: undefined,
      },
      progress: {
        percentage: 78,
        completed: 15,
        total: 20,
      },
      status: 'scheduled',
    },
    {
      id: '4',
      projectId: 'PR25004',
      projectName: 'Annual GDPR Data Map...',
      compliance: {
        type: 'gdpr',
        label: 'GDPR (EU)',
        icon: <GDPRBadge size={20} />,
      },
      owner: {
        name: 'Anita R Reddy',
        avatar: undefined,
      },
      progress: {
        percentage: 38,
        completed: 9,
        total: 24,
      },
      status: 'scheduled',
    },
    {
      id: '5',
      projectId: 'PR25005',
      projectName: 'HIPAA Security Rule Ri...',
      compliance: {
        type: 'hipaa',
        label: 'HIPAA',
        icon: <HIPAABadge size={20} />,
      },
      owner: {
        name: 'Anita R Reddy',
        avatar: undefined,
      },
      progress: {
        percentage: 42,
        completed: 9,
        total: 20,
      },
      status: 'scheduled',
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
          Projects Table Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Comprehensive projects table
        </p>
      </div>

      {/* Interactive Example */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Interactive Example
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Table with filter tabs, search, compliance filter, owner info, and actions
        </p>
        <div style={{ marginBottom: '16px', overflow: 'auto' }}>
          <ProjectsTable
            projects={sampleProjects}
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedCompliance={selectedCompliance}
            onComplianceChange={setSelectedCompliance}
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
            <br />
            <strong>Grid Layout:</strong><br />
            • Columns: 90px | 1fr | 180px | 180px | 180px | 140px | 40px<br />
            • Gap: 16px<br />
            <br />
            <strong>Reused Components:</strong><br />
            • ProgressBar (from Active Projects Table)<br />
            • ComplianceBadge (from Active Projects Table)<br />
            • StatusBadge (from Defense Roadmap Table)<br />
            • ActionMenu (from Defense Roadmap Table)<br />
            • New: OwnerCell with avatar support<br />
          </p>
        </div>
      </section>
    </div>
  );
}
