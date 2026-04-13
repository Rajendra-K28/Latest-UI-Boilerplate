import type { SearchInputProps } from './input.types';
import { Search } from '../icons/Search';
import './input.css';

export function SearchInput({
  placeholder = 'Search',
  value,
  onChange,
  onSearch,
  disabled = false,
  width = 'sm',
  ...props
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && value) {
      onSearch(value);
    }
  };

  return (
    <div className={`search-input-wrapper input-width-${width}`}>
      <span className="search-icon">
        <Search />
      </span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
