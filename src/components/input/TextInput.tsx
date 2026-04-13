import type { TextInputProps } from './input.types';
import './input.css';

export function TextInput({
  placeholder = 'Enter text',
  value,
  onChange,
  disabled = false,
  error = false,
  width = 'md',
  type = 'text',
  maxLength,
  ...props
}: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`text-input-wrapper input-width-${width}`}>
      <input
        type={type}
        className={`text-input-field ${error ? 'input-error' : ''}`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        {...props}
      />
    </div>
  );
}
