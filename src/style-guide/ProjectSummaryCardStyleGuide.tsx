import { Link } from 'react-router-dom';
import { ProjectSummaryCard, CheckCircle, Shield } from '../components';

export function ProjectSummaryCardStyleGuide() {
  const complianceItems = [
    { id: '1', label: 'PCI Compliance', icon: <CheckCircle color="#00BC7D" size={14} /> },
    { id: '2', label: 'ISO Frameworks', icon: <CheckCircle color="#00BC7D" size={14} /> },
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
          Project Summary Card Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Compact summary cards with icon lists
        </p>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <p style={{ color: '#344054', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Design Specifications:</strong><br />
            • Row height: 36px<br />
            • Padding left: 12px<br />
            • Gap: 8px<br />
            • Border radius: 10px<br />
            • Background: #F8FAFC<br />
            • Icon size: 14×14px<br />
            • Built using design tokens only
          </p>
        </div>
      </div>

      {/* Example */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Compliance Groups Example
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Compact card showing grouped items with checkmark icons
        </p>
        <div style={{ maxWidth: '400px', marginBottom: '16px' }}>
          <ProjectSummaryCard
            title="Compliance Groups"
            titleIcon={<Shield color="#518AF3" size={16} />}
            items={complianceItems}
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
{`<ProjectSummaryCard
  title="Compliance Groups"
  titleIcon={<Shield color="#518AF3" size={16} />}
  items={[
    { 
      id: '1', 
      label: 'PCI Compliance', 
      icon: <CheckCircle color="#00BC7D" size={14} /> 
    },
    { 
      id: '2', 
      label: 'ISO Frameworks', 
      icon: <CheckCircle color="#00BC7D" size={14} /> 
    },
  ]}
/>`}
          </code>
        </div>
      </section>

      {/* More Examples */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Different Content
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Cards can contain various types of content
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <ProjectSummaryCard
            title="Team Members"
            items={[
              { id: '1', label: 'John Doe', icon: <CheckCircle color="#00BC7D" size={14} /> },
              { id: '2', label: 'Jane Smith', icon: <CheckCircle color="#00BC7D" size={14} /> },
              { id: '3', label: 'Mike Johnson', icon: <CheckCircle color="#00BC7D" size={14} /> },
            ]}
          />
          <ProjectSummaryCard
            title="Status"
            items={[
              { id: '1', label: 'Active Projects', icon: <CheckCircle color="#00BC7D" size={14} /> },
              { id: '2', label: 'Completed Tasks', icon: <CheckCircle color="#00BC7D" size={14} /> },
            ]}
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
          border: '1px solid #D0D5DD'
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
                <td style={{ padding: '8px', color: '#475467' }}>Title/header for the card</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>titleIcon</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>ReactNode</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Icon for the title</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>items</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>ProjectSummaryItem[]</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Array of items to display</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', color: '#475467' }}>onClick</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>{'() => void'}</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Click handler</td>
              </tr>
            </tbody>
          </table>
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
            <li>Colors: <code>colors.bg.surface.gray</code> (#F8FAFC), <code>colors.text.neutral.dark</code> (#1C2434)</li>
            <li>Colors: <code>colors.green[400]</code> (#00BC7D) for check icons</li>
            <li>Spacing: <code>spacing[2]</code> (8px gap)</li>
            <li>Typography: 14px, weight 500, line-height 20px, letter-spacing -0.15px</li>
            <li>Row height: 36px (header and items)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
