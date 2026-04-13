import type { TextAreaProps } from './input.types';
import './input.css';

export function TextArea({
  placeholder = 'Add a description',
  value,
  onChange,
  rows = 5,
  maxLength,
  disabled = false,
  width = 'lg',
  ...props
}: TextAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`input-width-${width}`}>
      <textarea
        className="textarea-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
