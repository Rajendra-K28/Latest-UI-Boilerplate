import { Link } from 'react-router-dom';
import { FrameworkList } from '../components';
import { useState } from 'react';
import type { FrameworkItem } from '../components';

export function FrameworkCardStyleGuide() {
  const frameworks: FrameworkItem[] = [
    {
      id: '1',
      title: 'ISO/IEC 27001',
      code: 'ISO/IEC 27001:2022',
      description: 'Information Security Management',
    },
    {
      id: '2',
      title: 'ISO/IEC 27002',
      code: 'ISO/IEC 27002:2022',
      description: 'Code of Practice for Information Security Controls',
    },
    {
      id: '3',
      title: 'ISO/IEC 27017',
      code: 'ISO/IEC 27017:2015',
      description: 'Cloud Services Information Security',
    },
    {
      id: '4',
      title: 'ISO/IEC 27018',
      code: 'ISO/IEC 27018:2019',
      description: 'Protection of PII in Public Cloud',
    },
    {
      id: '5',
      title: 'ISO 9001',
      code: 'ISO 9001:2015',
      description: 'Quality Management Systems',
    },
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>(['1']);

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
          Framework List Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Multi-select framework list with header
        </p>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <p style={{ color: '#344054', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Design Specifications:</strong><br />
            • Border radius: 14px<br />
            • Border: 1px solid #E2E8F0<br />
            • Header height: 81px<br />
            • Row height: 81px per item<br />
            • Selected row background: #EDF3FF<br />
            • Built using design tokens only
          </p>
        </div>
      </div>

      {/* Full List Example */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          ISO Frameworks List
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Complete framework list with header, selection count, and deselect all functionality
        </p>
        <div style={{ maxWidth: '700px', marginBottom: '16px' }}>
          <FrameworkList
            title="ISO Frameworks"
            items={frameworks}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            showDeselectAll={true}
          />
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px',
          whiteSpace: 'pre-wrap'
        }}>
          <code style={{ color: '#344054' }}>
{`const frameworks = [
  {
    id: '1',
    title: 'ISO/IEC 27001',
    code: 'ISO/IEC 27001:2022',
    description: 'Information Security Management',
  },
  // ... more items
];

<FrameworkList
  title="ISO Frameworks"
  items={frameworks}
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
  showDeselectAll={true}
/>`}
          </code>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Key Features
        </h2>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#475467', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>Dynamic Row Count:</strong> Automatically adjusts height based on number of items (81px per row)</li>
            <li><strong>Header with Counter:</strong> Shows "X of Y selected" count automatically</li>
            <li><strong>Deselect All:</strong> Appears only when items are selected</li>
            <li><strong>Row Selection:</strong> Click anywhere on row to toggle selection</li>
            <li><strong>Visual Feedback:</strong> Selected rows have blue background (#EDF3FF)</li>
            <li><strong>Dividers:</strong> Subtle dividers between rows for clarity</li>
          </ul>
        </div>
      </section>

      {/* Props Reference */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Props Reference
        </h2>
        
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', marginTop: '16px' }}>
          FrameworkList Props
        </h3>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD',
          marginBottom: '16px'
        }}>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #D0D5DD' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Default</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>title</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Title for the framework list</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>items</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>FrameworkItem[]</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Array of framework items</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>selectedIds</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string[]</td>
                <td style={{ padding: '8px', color: '#475467' }}>[]</td>
                <td style={{ padding: '8px', color: '#475467' }}>Array of selected framework IDs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>onSelectionChange</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>{'(ids: string[]) => void'}</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Callback when selection changes</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', color: '#475467' }}>showDeselectAll</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '8px', color: '#475467' }}>true</td>
                <td style={{ padding: '8px', color: '#475467' }}>Show deselect all link</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
          FrameworkItem Type
        </h3>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px',
          whiteSpace: 'pre-wrap'
        }}>
          <code style={{ color: '#344054' }}>
{`type FrameworkItem = {
  id: string;           // Unique identifier
  title: string;        // Framework name
  code: string;         // Framework code/version
  description: string;  // Framework description
}`}
          </code>
        </div>

        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD',
          marginTop: '16px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Design Tokens Used</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#475467', fontSize: '14px' }}>
            <li>Colors: <code>colors.stroke.neutral.light</code> (#E2E8F0), <code>colors.bg.surface.blue</code> (#EDF3FF)</li>
            <li>Spacing: <code>spacing[4]</code> (16px), <code>spacing[6]</code> (24px)</li>
            <li>Border radius: 14px</li>
            <li>Row height: 81px (header + each item)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
