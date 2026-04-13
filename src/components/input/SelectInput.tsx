import { useState, useRef, useEffect } from 'react';
import type { SelectInputProps } from './input.types';
import { ChevronDown } from '../icons/ChevronDown';
import './input.css';

export function SelectInput({
  placeholder = 'Select an option',
  value,
  onChange,
  onSelect,
  options = [],
  disabled = false,
  width = 'md',
  ...props
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Get the label for the selected value
  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    onSelect?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div 
      ref={wrapperRef}
      className={`select-wrapper input-width-${width}`}
      {...props}
    >
      <button
        type="button"
        className={`select-input ${isOpen ? 'select-input-open' : ''} ${disabled ? 'select-input-disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className={value ? 'select-value' : 'select-placeholder'}>
          {selectedLabel}
        </span>
        <span className={`select-icon ${isOpen ? 'select-icon-open' : ''}`}>
          <ChevronDown />
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="select-dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${option.value === value ? 'select-option-selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
