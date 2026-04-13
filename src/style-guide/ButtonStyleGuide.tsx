import { Link } from 'react-router-dom';
import { Button } from '../components/button/button';
import { Plus } from '../components/icons/Plus';
import { Trash } from '../components/icons/Trash';
import { Upload } from '../components/icons/Upload';
import { Download } from '../components/icons/Download';
import { UserPlus } from '../components/icons/UserPlus';
import { LogOut } from '../components/icons/LogOut';

export function ButtonStyleGuide() {
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
          Button Component Style Guide
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - A comprehensive guide for developers
        </p>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <p style={{ color: '#344054', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Design Specifications:</strong><br />
            • Height: 40px (md), 32px (sm), 48px (lg)<br />
            • Padding: 8px 12px (md), 6px 10px (sm), 10px 16px (lg)<br />
            • Gap: 8px between icon and text<br />
            • Border radius: 8px<br />
            • Primary color: #266DF0 with gradient overlay
          </p>
        </div>
      </div>

      {/* Requested Examples */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          Requested Examples
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          These match the exact snippets you shared.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button label="Save" variant="primary" />
          <Button label="Add User" icon={<Plus />} variant="secondary" />
          <Button label="Delete" icon={<Trash />} variant="danger" />
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <code style={{ color: '#111625' }}>
{`<Button label="Save" variant="primary" />

<Button
  label="Add User"
  icon={<Plus />}
  variant="secondary"
/>

<Button
  label="Delete"
  icon={<Trash />}
  variant="danger"
/>`}
          </code>
        </div>
      </section>
      
      {/* Type 1: Text Only Buttons */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          1. Text Only Buttons
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Use when you need a simple button without icons
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button label="Primary" hierarchy="primary" iconConfig="none" />
          <Button label="Secondary" hierarchy="secondary-gray" iconConfig="none" />
          <Button label="Secondary White" hierarchy="secondary-white" iconConfig="none" />
          <Button label="Tertiary" hierarchy="tertiary-gray" iconConfig="none" />
          <Button label="Link" hierarchy="link-gray" iconConfig="none" />
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <code style={{ color: '#344054' }}>
            {'<Button label="Primary" hierarchy="primary" iconConfig="none" />'}
          </code>
        </div>
      </section>

      {/* Type 2: Icon Left + Text */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          2. Icon Left + Button Text
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Use when the icon helps identify the action (recommended for most cases)
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button 
            label="Add User" 
            icon={<Plus />} 
            iconConfig="left"
            hierarchy="primary" 
          />
          <Button 
            label="Invite Team" 
            icon={<Plus />} 
            iconConfig="left"
            hierarchy="secondary-white"
            size="sm"
          />
          <Button 
            label="Upload File" 
            icon={<Upload />} 
            iconConfig="left"
            hierarchy="secondary-gray" 
          />
          <Button 
            label="Download" 
            icon={<Download />} 
            iconConfig="left"
            hierarchy="tertiary-gray" 
          />
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <code style={{ color: '#344054' }}>
            {'<Button label="Invite Team" icon={<Plus />} iconConfig="left" hierarchy="secondary-white" size="sm" />'}
          </code>
        </div>
      </section>

      {/* Type 3: Text + Icon Right */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          3. Button Text + Icon Right
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Use when the icon indicates direction or next action
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button 
            label="Invite Team" 
            icon={<UserPlus />} 
            iconConfig="right"
            hierarchy="primary" 
          />
          <Button 
            label="Export Data" 
            icon={<Download />} 
            iconConfig="right"
            hierarchy="secondary-gray" 
          />
          <Button 
            label="Delete" 
            icon={<Trash />} 
            iconConfig="right"
            hierarchy="secondary-gray"
            destructive 
          />
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <code style={{ color: '#344054' }}>
            {'<Button label="Delete" icon={<Trash />} iconConfig="right" hierarchy="secondary-gray" destructive />'}
          </code>
        </div>
      </section>

      {/* Type 4: Standard Action Buttons */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          4. Standard Action Buttons
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Common patterns for file operations and user actions
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button 
            label="Upload File Here" 
            icon={<Upload />} 
            iconConfig="left"
            hierarchy="primary"
            size="md"
          />
          <Button 
            label="Download Report" 
            icon={<Download />} 
            iconConfig="left"
            hierarchy="secondary-gray"
            size="md"
          />
          <Button 
            label="Invite Team" 
            icon={<UserPlus />} 
            iconConfig="left"
            hierarchy="secondary-gray"
            size="md"
          />
          <Button 
            label="Logout" 
            icon={<LogOut />} 
            iconConfig="left"
            hierarchy="tertiary-gray"
            size="md"
          />
        </div>
      </section>

      {/* Size Variations */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          5. Size Variations
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Small (32px), Medium (40px), Large (48px)
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button label="Small" size="sm" hierarchy="primary" iconConfig="none" />
          <Button label="Medium" size="md" hierarchy="primary" iconConfig="none" />
          <Button label="Large" size="lg" hierarchy="primary" iconConfig="none" />
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <code style={{ color: '#344054' }}>
            {'<Button label="Medium" size="md" hierarchy="primary" iconConfig="none" />'}
          </code>
        </div>
      </section>

      {/* Icon Only */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          6. Icon Only Buttons
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Use for compact spaces or when the icon is universally understood
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button icon={<Plus />} iconConfig="only" hierarchy="primary" size="md" />
          <Button icon={<Upload />} iconConfig="only" hierarchy="secondary-gray" size="md" />
          <Button icon={<Trash />} iconConfig="only" hierarchy="secondary-gray" destructive size="md" />
          <Button icon={<LogOut />} iconConfig="only" hierarchy="tertiary-gray" size="md" />
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <code style={{ color: '#344054' }}>
            {'<Button icon={<Plus />} iconConfig="only" hierarchy="primary" size="md" />'}
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
                <td style={{ padding: '8px', color: '#475467' }}>label</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Button text</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>hierarchy</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>primary | secondary-gray | secondary-white | tertiary-gray | link-gray</td>
                <td style={{ padding: '8px', color: '#475467' }}>primary</td>
                <td style={{ padding: '8px', color: '#475467' }}>Button style hierarchy</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>size</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>sm | md | lg</td>
                <td style={{ padding: '8px', color: '#475467' }}>md</td>
                <td style={{ padding: '8px', color: '#475467' }}>Button size</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>iconConfig</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>none | left | right | only</td>
                <td style={{ padding: '8px', color: '#475467' }}>none</td>
                <td style={{ padding: '8px', color: '#475467' }}>Icon position</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>icon</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>React.ReactNode</td>
                <td style={{ padding: '8px', color: '#475467' }}>-</td>
                <td style={{ padding: '8px', color: '#475467' }}>Icon element</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>destructive</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '8px', color: '#475467' }}>false</td>
                <td style={{ padding: '8px', color: '#475467' }}>Red variant for delete actions</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', color: '#475467' }}>disabled</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '8px', color: '#475467' }}>false</td>
                <td style={{ padding: '8px', color: '#475467' }}>Disable button interaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
