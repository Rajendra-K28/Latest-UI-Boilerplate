import { Link } from 'react-router-dom';
import { FilterCard } from '../components';
import { Plus, Trash, Upload, Download } from '../components';

export function CardStyleGuide() {
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
          Filter Card Component Style Guide
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Metric filter cards for dashboards
        </p>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <p style={{ color: '#344054', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Design Specifications:</strong><br />
            • Width: 268px<br />
            • Border radius: 16px<br />
            • Border: 1px solid #DEE4EE<br />
            • Gap: 16px<br />
            • Bottom accent bar: 4px height<br />
            • Built using design tokens only - no hardcoded values
          </p>
        </div>
      </div>

      {/* All Variants */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          All Variants
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Four color variants available: blue, yellow, green, and red
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap',
          marginBottom: '16px' 
        }}>
          <FilterCard
            value={12}
            label="Open tasks"
            icon={<Plus />}
            variant="blue"
          />
          <FilterCard
            value={4}
            label="Deliverables"
            icon={<Upload />}
            variant="yellow"
          />
          <FilterCard
            value={4}
            label="Milestones"
            icon={<Download />}
            variant="green"
          />
          <FilterCard
            value={2}
            label="Overdue tasks"
            icon={<Trash />}
            variant="red"
          />
        </div>
      </section>

      {/* Blue Variant */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Blue Variant
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Default variant with blue accent
        </p>
        <div style={{ marginBottom: '16px' }}>
          <FilterCard
            value={12}
            label="Open tasks"
            icon={<Plus />}
            variant="blue"
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
{`<FilterCard
  value={12}
  label="Open tasks"
  icon={<Plus />}
  variant="blue"
/>`}
          </code>
        </div>
      </section>

      {/* Yellow Variant */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Yellow Variant
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Yellow accent for deliverables or important items
        </p>
        <div style={{ marginBottom: '16px' }}>
          <FilterCard
            value={4}
            label="Deliverables"
            icon={<Upload />}
            variant="yellow"
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
{`<FilterCard
  value={4}
  label="Deliverables"
  icon={<Upload />}
  variant="yellow"
/>`}
          </code>
        </div>
      </section>

      {/* Green Variant */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Green Variant
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Green accent for success or completed items
        </p>
        <div style={{ marginBottom: '16px' }}>
          <FilterCard
            value={4}
            label="Milestones"
            icon={<Download />}
            variant="green"
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
{`<FilterCard
  value={4}
  label="Milestones"
  icon={<Download />}
  variant="green"
/>`}
          </code>
        </div>
      </section>

      {/* Red Variant */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Red Variant
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Red accent for critical or overdue items
        </p>
        <div style={{ marginBottom: '16px' }}>
          <FilterCard
            value={2}
            label="Overdue tasks"
            icon={<Trash />}
            variant="red"
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
{`<FilterCard
  value={2}
  label="Overdue tasks"
  icon={<Trash />}
  variant="red"
/>`}
          </code>
        </div>
      </section>

      {/* Custom Icon Color */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Custom Icon Color
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Override the default icon color with a custom color
        </p>
        <div style={{ marginBottom: '16px' }}>
          <FilterCard
            value={25}
            label="Custom color"
            icon={<Plus />}
            variant="blue"
            iconColor="#8B5CF6"
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
{`<FilterCard
  value={25}
  label="Custom color"
  icon={<Plus />}
  variant="blue"
  iconColor="#8B5CF6"
/>`}
          </code>
        </div>
      </section>

      {/* Without Accent Bar */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Without Accent Bar
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Hide the bottom accent bar by setting showAccentBar to false
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap',
          marginBottom: '16px' 
        }}>
          <FilterCard
            value={8}
            label="Clean card"
            icon={<Plus />}
            variant="blue"
            showAccentBar={false}
          />
          <FilterCard
            value={15}
            label="Minimal style"
            icon={<Upload />}
            variant="green"
            showAccentBar={false}
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
{`<FilterCard
  value={8}
  label="Clean card"
  icon={<Plus />}
  variant="blue"
  showAccentBar={false}
/>`}
          </code>
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
                <td style={{ padding: '8px', color: '#475467' }}>value</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string | number</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>The main number or count to display</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>label</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>The label text below the value</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>icon</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>ReactNode</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>The icon to display in the top right</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>variant</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>blue | yellow | green | red</td>
                <td style={{ padding: '8px', color: '#475467' }}>blue</td>
                <td style={{ padding: '8px', color: '#475467' }}>The color variant (affects bottom border)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>iconColor</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>variant color</td>
                <td style={{ padding: '8px', color: '#475467' }}>Custom icon color (overrides variant)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>showAccentBar</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '8px', color: '#475467' }}>true</td>
                <td style={{ padding: '8px', color: '#475467' }}>Show the bottom accent bar</td>
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
            <li>Colors: <code>colors.stroke.neutral.soft</code>, <code>colors.bg.surface.default</code></li>
            <li>Spacing: <code>spacing[4]</code> (16px gap)</li>
            <li>Radius: <code>radius.xl</code> (16px)</li>
            <li>Typography: Custom values for value (32px) and label (14px)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
