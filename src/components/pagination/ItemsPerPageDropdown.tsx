import { useState, useRef, useEffect } from 'react';
import { colors } from '../../design-system/tokens';
import { ChevronDown } from '../icons';

interface ItemsPerPageDropdownProps {
  value: number;
  onChange: (value: number) => void;
}

const styles = {
  container: {
    position: 'relative' as const,
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70px',
    height: '40px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500' as const,
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    background: 'white',
    color: colors.text.neutral.main,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  },
  chevron: (isOpen: boolean) => ({
    width: '16px',
    height: '16px',
    color: colors.text.neutral.sub,
    transition: 'transform 0.2s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: '4px',
  }),
  dropdown: {
    position: 'absolute' as const,
    bottom: '44px',
    left: 0,
    width: '70px',
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
    zIndex: 1000,
    overflow: 'hidden' as const,
  },
  option: (isSelected: boolean) => ({
    padding: '8px 12px',
    fontSize: '14px',
    color: isSelected ? colors.primary[600] : colors.text.neutral.main,
    background: isSelected ? colors.primary[50] : 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: isSelected ? '500' as const : '400' as const,
  }),
};

export function ItemsPerPageDropdown({ value, onChange }: ItemsPerPageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const options = [5, 10, 25, 50];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: number) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div style={styles.container} ref={containerRef}>
      <button
        type="button"
        style={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.stroke.neutral.light;
          e.currentTarget.style.background = colors.bg.surface.gray;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.stroke.neutral.light;
          e.currentTarget.style.background = 'white';
        }}
      >
        <span>{value}</span>
        <div style={styles.chevron(isOpen)}>
          <ChevronDown />
        </div>
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option}
              style={styles.option(option === value)}
              onClick={() => handleSelect(option)}
              onMouseEnter={(e) => {
                if (option !== value) {
                  e.currentTarget.style.background = colors.bg.surface.gray;
                }
              }}
              onMouseLeave={(e) => {
                if (option !== value) {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
