import { Link } from 'react-router-dom';
import { DefenseRoadmapTable } from '../components';
import type { RoadmapActivity } from '../components';
import { useState } from 'react';

export function DefenseRoadmapTableStyleGuide() {
  const [currentFilter, setCurrentFilter] = useState<'all' | 'overdue' | 'in-progress' | 'scheduled'>('all');
  const [searchValue, setSearchValue] = useState('');
  const [selectedProject, setSelectedProject] = useState('All projects');
  const [currentPage, setCurrentPage] = useState(1);

  const sampleActivities: RoadmapActivity[] = [
    {
      id: '1',
      date: '24 Dec 2025',
      activity: 'Upload Evidence for Requirement v3.1',
      projectName: 'PCI DSS - Q4 Audit 2025',
      status: 'overdue',
    },
    {
      id: '2',
      date: '25 Dec 2025',
      activity: 'Upload Evidence for Requirement v3.1',
      projectName: 'Enterprise-wide Access Control Policy',
      status: 'in-progress',
    },
    {
      id: '3',
      date: '29 Dec 2025',
      activity: 'Upload Evidence for Requirement v3.1',
      projectName: 'SOC 2 Type II Observation Engineerin...',
      status: 'scheduled',
    },
    {
      id: '4',
      date: '29 Dec 2025',
      activity: 'Upload Evidence for Requirement v3.1',
      projectName: 'Annual GDPR Data Mapping Accredita...',
      status: 'scheduled',
    },
    {
      id: '5',
      date: '29 Dec 2025',
      activity: 'Upload Evidence for Requirement v3.1',
      projectName: 'HIPAA Security Rule Risk Assessment',
      status: 'scheduled',
    },
    {
      id: '6',
      date: '29 Dec 2025',
      activity: 'Upload Evidence for Requirement v3.1',
      projectName: 'Vendor Audit Q1',
      status: 'scheduled',
    },
    {
      id: '7',
      date: '1 Jan 2025',
      activity: 'Upload Evidence for Requirement v3.1',
      projectName: 'Vendor Audit Q1',
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
          Defense Roadmap Table Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Table with filters, search, and pagination
        </p>
      </div>

      {/* Interactive Example */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Interactive Example
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Table with filter tabs, search, project dropdown, and pagination
        </p>
        <div style={{ marginBottom: '16px', overflow: 'auto' }}>
          <DefenseRoadmapTable
            activities={sampleActivities}
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedProject={selectedProject}
            onProjectChange={setSelectedProject}
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {/* Props Reference */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Props Reference
        </h2>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD',
          fontFamily: 'monospace',
          fontSize: '13px',
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#000000' }}>{`<DefenseRoadmapTable
  activities={RoadmapActivity[]}
  currentFilter="all" | "overdue" | "in-progress" | "scheduled"
  onFilterChange={(filter) => void}
  searchValue={string}
  onSearchChange={(value) => void}
  selectedProject={string}
  onProjectChange={(project) => void}
  currentPage={number}
  totalPages={number}
  onPageChange={(page) => void}
/>

type RoadmapActivity = {
  id: string;
  date: string;
  activity: string;
  projectName: string;
  status: 'overdue' | 'in-progress' | 'scheduled';
};`}</pre>
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
            • Columns: 140px | 1fr | 1fr | 180px<br />
            • Gap: 16px<br />
            <br />
            <strong>Pagination:</strong><br />
            • Padding: 12px 24px 16px 24px<br />
            • Border top: 1px solid #EAECF0<br />
            <br />
            <strong>Features:</strong><br />
            • Filter tabs (View all, Overdue, In-progress, Scheduled)<br />
            • Search input<br />
            • Project dropdown filter<br />
            • Status badges with dots<br />
            • Smart pagination with ellipsis<br />
            • Previous/Next navigation buttons<br />
          </p>
        </div>
      </section>
    </div>
  );
}
