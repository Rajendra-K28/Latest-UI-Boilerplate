import type { PhoneInputProps } from './input.types';
import { ChevronDown } from '../icons/ChevronDown';
import './input.css';

export function PhoneInput({
  placeholder = '9998883331',
  value,
  onChange,
  countryCode = '+91',
  onCountryCodeChange,
  disabled = false,
  width = 'md',
  ...props
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, ''); // Only numbers
    onChange?.(newValue);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryCodeChange?.(e.target.value);
  };

  return (
    <div className={`phone-input-wrapper input-width-${width}`}>
      <div className="country-code-wrapper">
        <span style={{ fontSize: '20px' }}>🇮🇳</span>
        <select
          className="country-code-select"
          value={countryCode}
          onChange={handleCountryCodeChange}
          disabled={disabled}
        >
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
          <option value="+86">+86</option>
        </select>
        <span style={{ color: '#667085', fontSize: '16px' }}>
          <ChevronDown />
        </span>
      </div>
      <input
        type="tel"
        className="phone-number-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
