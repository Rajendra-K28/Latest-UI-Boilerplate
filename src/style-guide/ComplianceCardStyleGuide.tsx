import { Link } from 'react-router-dom';
import { ComplianceCard } from '../components';
import { PCIIcon, ISOIcon } from '../components';

export function ComplianceCardStyleGuide() {
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
          Compliance Card Component
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - Cards for compliance and certification frameworks
        </p>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <p style={{ color: '#344054', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Design Specifications:</strong><br />
            • Width: 291px<br />
            • Height: 273px<br />
            • Padding: 24px<br />
            • Gap: 20px<br />
            • Border radius: 16px<br />
            • Border: 1px solid #DEE4EE<br />
            • Built using design tokens only
          </p>
        </div>
      </div>

      {/* Default Examples */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Compliance Cards
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Cards for displaying compliance standards and certifications
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap',
          marginBottom: '16px' 
        }}>
          <ComplianceCard
            icon={<PCIIcon />}
            iconBackgroundColor="#EBF9F4"
            title="PCI Compliance"
            description="Payment Card Industry Data Security Standards for protecting cardholder data"
            tags={['PCI DSS 4.0', 'Payment Security', 'Card Processing']}
            showCheckBadge={true}
          />
          <ComplianceCard
            icon={<ISOIcon />}
            iconBackgroundColor="#E9F0FE"
            title="ISO Frameworks"
            description="International standards for information security management systems"
            tags={['ISO 27001', 'ISO 27002', 'ISO 27017']}
            showCheckBadge={true}
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
{`<ComplianceCard
  icon={<PCIIcon />}
  iconBackgroundColor="#EBF9F4"
  title="PCI Compliance"
  description="Payment Card Industry Data Security Standards for protecting cardholder data"
  tags={['PCI DSS 4.0', 'Payment Security', 'Card Processing']}
  showCheckBadge={true}
/>`}
          </code>
        </div>
      </section>

      {/* Without Check Badge */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Without Check Badge
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Cards can be displayed without the check badge indicator
        </p>
        <div style={{ marginBottom: '16px' }}>
          <ComplianceCard
            icon={<PCIIcon />}
            iconBackgroundColor="#EBF9F4"
            title="PCI Compliance"
            description="Payment Card Industry Data Security Standards for protecting cardholder data"
            tags={['PCI DSS 4.0', 'Payment Security']}
            showCheckBadge={false}
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
{`<ComplianceCard
  icon={<PCIIcon />}
  iconBackgroundColor="#EBF9F4"
  title="PCI Compliance"
  description="Payment Card Industry Data Security Standards for protecting cardholder data"
  tags={['PCI DSS 4.0', 'Payment Security']}
  showCheckBadge={false}
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
                <td style={{ padding: '8px', color: '#475467' }}>icon</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>ReactNode</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>The icon to display at the top</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>iconBackgroundColor</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Background color for the icon wrapper (e.g., #EBF9F4)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>title</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>The title of the compliance standard</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>description</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Description text below the title</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>tags</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string[]</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Array of tag labels to display at the bottom</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>showCheckBadge</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '8px', color: '#475467' }}>false</td>
                <td style={{ padding: '8px', color: '#475467' }}>Show check badge in top right</td>
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
            <li>Colors: <code>colors.text.neutral.main</code> (#111625), <code>colors.text.neutral.soft</code> (#8796AF), <code>colors.neutral[100]</code> (#EFF3F8), <code>colors.neutral[400]</code> (#8796AF)</li>
            <li>Spacing: <code>spacing[6]</code> (24px padding), <code>spacing[5]</code> (20px gap)</li>
            <li>Radius: <code>radius.xl</code> (16px), 24px for icon, fully rounded (16777200px) for tags</li>
            <li>Typography: Custom letter-spacing for title and description, font-weight 500 for tags</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
