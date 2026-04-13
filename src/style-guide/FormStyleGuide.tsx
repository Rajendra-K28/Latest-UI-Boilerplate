import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TextInput } from '../components/input/TextInput';
import { SearchInput } from '../components/input/SearchInput';
import { PhoneInput } from '../components/input/PhoneInput';
import { SelectInput } from '../components/input/SelectInput';
import { TextArea } from '../components/input/TextArea';
import { DatePicker } from '../components/input/DatePicker';
import { TimePicker } from '../components/input/TimePicker';

export function FormStyleGuide() {
  const [textValue, setTextValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const selectOptions = [
    { value: 'network-scan', label: 'Network Scan' },
    { value: 'security-audit', label: 'Security Audit' },
    { value: 'performance-test', label: 'Performance Test' },
    { value: 'vulnerability-scan', label: 'Vulnerability Scan' },
    { value: 'compliance-check', label: 'Compliance Check' },
    { value: 'penetration-test', label: 'Penetration Test' },
    { value: 'code-review', label: 'Code Review' },
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
          Form Input Components Style Guide
        </h1>
        <p style={{ color: '#475467', fontSize: '16px', marginBottom: '16px' }}>
          Based on Figma design system - A comprehensive guide for form inputs
        </p>
        <div style={{ 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '8px',
          border: '1px solid #D0D5DD'
        }}>
          <p style={{ color: '#344054', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Design Specifications:</strong><br />
            • Height: 40px<br />
            • Border radius: 10px<br />
            • Border: 1px solid #DEE4EE<br />
            • Padding: 12px<br />
            • Focus state: Blue border with subtle shadow
          </p>
        </div>
      </div>
      
      {/* Plain Text Input */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          1. Text Input
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Standard text input field. Height: 40px, supports various input types (text, email, password, number, etc.)
        </p>
        <div style={{ marginBottom: '16px' }}>
          <TextInput
            placeholder="Enter your name"
            value={textValue}
            onChange={setTextValue}
            width="md"
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
{`<TextInput
  placeholder="Enter your name"
  value={textValue}
  onChange={setTextValue}
  type="text"
  width="md"
  maxLength={100}
  disabled={false}
/>`}
          </code>
        </div>
      </section>
      
      {/* Search Input */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          2. Search Input
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Use for search functionality with icon. Width: 248px, Height: 40px
        </p>
        <div style={{ marginBottom: '16px' }}>
          <SearchInput
            placeholder="Search"
            value={searchValue}
            onChange={setSearchValue}
            onSearch={() => {}}
            width="sm"
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
{`<SearchInput
  placeholder="Search"
  value={searchValue}
  onChange={setSearchValue}
  onSearch={() => {}}
  width="sm"
  disabled={false}
/>`}
          </code>
        </div>
      </section>

      {/* Phone Input */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          3. Phone Number Input with Country Code
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Combined input with country code selector and phone number field
        </p>
        <div style={{ marginBottom: '16px' }}>
          <PhoneInput
            placeholder="9998883331"
            value={phoneValue}
            onChange={setPhoneValue}
            countryCode="+91"
            onCountryCodeChange={() => {}}
            width="md"
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
{`<PhoneInput
  placeholder="9998883331"
  value={phoneValue}
  onChange={setPhoneValue}
  countryCode="+91"
  onCountryCodeChange={() => {}}
  width="md"
  disabled={false}
/>`}
          </code>
        </div>
      </section>

      {/* Select/Dropdown */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          4. Select/Dropdown
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Custom dropdown with chevron icon. Height: 40px. Shows max 4 items, scrolls if more options available.
        </p>
        <div style={{ marginBottom: '16px' }}>
          <SelectInput
            placeholder="Select an option"
            value={selectValue}
            onChange={setSelectValue}
            onSelect={() => {}}
            options={selectOptions}
            width="md"
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
{`<SelectInput
  placeholder="Select an option"
  value={selectValue}
  onChange={setSelectValue}
  onSelect={() => {}}
  options={[
    { value: 'network-scan', label: 'Network Scan' },
    { value: 'security-audit', label: 'Security Audit' }
  ]}
  width="md"
  disabled={false}
/>`}
          </code>
        </div>
      </section>

      {/* Text Area */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          5. Text Area
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Multi-line text input for longer content. Min height: 120px
        </p>
        <div style={{ marginBottom: '16px' }}>
          <TextArea
            placeholder="Add a scan description"
            value={textAreaValue}
            onChange={setTextAreaValue}
            rows={5}
            maxLength={500}
            width="lg"
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
{`<TextArea
  placeholder="Add a scan description"
  value={textAreaValue}
  onChange={setTextAreaValue}
  rows={5}
  maxLength={500}
  width="lg"
  disabled={false}
/>`}
          </code>
        </div>
      </section>

      {/* Date Picker */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          6. Date Picker with Calendar
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Date selection with interactive calendar dropdown. Click to select date from calendar. Height: 40px. Selected date color is configurable via props.
        </p>
        <div style={{ marginBottom: '16px' }}>
          <DatePicker
            placeholder="Select a date"
            value={dateValue}
            onChange={setDateValue}
            onDateSelect={() => {}}
            selectedColor="#266DF0"
            width="md"
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
{`<DatePicker
  placeholder="Select a date"
  value={dateValue}
  onChange={setDateValue}
  onDateSelect={() => {}}
  selectedColor="#266DF0"
  width="md"
  disabled={false}
/>`}
          </code>
        </div>
      </section>

      {/* Time Picker */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          7. Time Picker with Dropdown
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          Time selection with interactive dropdown. Click to select hours and minutes. Supports 12h/24h format. Height: 40px
        </p>
        <div style={{ marginBottom: '16px' }}>
          <TimePicker
            placeholder="Select a time"
            value={timeValue}
            onChange={setTimeValue}
            onTimeSelect={() => {}}
            format="12h"
            width="sm"
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
{`<TimePicker
  placeholder="Select a time"
  value={timeValue}
  onChange={setTimeValue}
  onTimeSelect={() => {}}
  format="12h"
  width="sm"
  disabled={false}
/>`}
          </code>
        </div>
      </section>

      {/* Width Variations */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          8. Width Variations
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          All inputs support three width sizes: Small (248px), Medium (400px), Large (600px max)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#344054' }}>
              Small Width (248px)
            </p>
            <SearchInput placeholder="Search" value={searchValue} onChange={setSearchValue} width="sm" />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#344054' }}>
              Medium Width (400px)
            </p>
            <SelectInput
              placeholder="Select an option"
              value={selectValue}
              onChange={setSelectValue}
              options={selectOptions}
              width="md"
            />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#344054' }}>
              Large Width (600px max)
            </p>
            <TextArea
              placeholder="Add a description"
              value={textAreaValue}
              onChange={setTextAreaValue}
              rows={3}
              width="lg"
            />
          </div>
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#F9FAFB', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '13px',
          marginTop: '16px',
          whiteSpace: 'pre-wrap'
        }}>
          <code style={{ color: '#344054' }}>
{`// Small width (248px)
<SearchInput width="sm" />

// Medium width (400px)
<SelectInput width="md" />

// Large width (600px max)
<TextArea width="lg" />`}
          </code>
        </div>
      </section>

      {/* States */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
          9. Input States
        </h2>
        <p style={{ color: '#475467', fontSize: '14px', marginBottom: '16px' }}>
          All inputs support disabled and error states
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Normal State</p>
            <SearchInput placeholder="Search" value="" onChange={() => {}} width="sm" />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Disabled State</p>
            <SearchInput placeholder="Search" value="" onChange={() => {}} disabled width="sm" />
          </div>
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
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Common Props</h3>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #D0D5DD' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>placeholder</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>Placeholder text</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>value</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>Input value</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>onChange</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>function</td>
                <td style={{ padding: '8px', color: '#475467' }}>Change handler</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>disabled</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '8px', color: '#475467' }}>Disable input</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>error</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '8px', color: '#475467' }}>Error state</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', color: '#475467' }}>width</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>sm | md | lg</td>
                <td style={{ padding: '8px', color: '#475467' }}>Input width (248px / 400px / 600px)</td>
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
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>TextInput Specific Props</h3>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #D0D5DD' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>type</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>text | email | password | number | tel | url</td>
                <td style={{ padding: '8px', color: '#475467' }}>Input type</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', color: '#475467' }}>maxLength</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>number</td>
                <td style={{ padding: '8px', color: '#475467' }}>Maximum character length</td>
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
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>DatePicker Specific Props</h3>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #D0D5DD' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>onDateSelect</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>{'(date: Date) => void'}</td>
                <td style={{ padding: '8px', color: '#475467' }}>Callback when date is selected</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>selectedColor</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '8px', color: '#475467' }}>Color for selected date (default: #266DF0)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>minDate</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>Date</td>
                <td style={{ padding: '8px', color: '#475467' }}>Minimum selectable date</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', color: '#475467' }}>maxDate</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>Date</td>
                <td style={{ padding: '8px', color: '#475467' }}>Maximum selectable date</td>
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
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>TimePicker Specific Props</h3>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #D0D5DD' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#344054' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', color: '#475467' }}>onTimeSelect</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>{'(time: string) => void'}</td>
                <td style={{ padding: '8px', color: '#475467' }}>Callback when time is selected</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', color: '#475467' }}>format</td>
                <td style={{ padding: '8px', color: '#475467', fontFamily: 'monospace' }}>12h | 24h</td>
                <td style={{ padding: '8px', color: '#475467' }}>Time format (default: 12h)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
