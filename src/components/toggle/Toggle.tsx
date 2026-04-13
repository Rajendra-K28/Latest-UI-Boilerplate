import { colors, spacing } from '../../design-system/tokens';

export type ToggleOption = {
  value: string;
  label: string;
};

export type ToggleProps = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const toggleStyles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    background: colors.bg.surface.gray,
    borderRadius: '8px',
    padding: '4px',
    gap: '4px',
  },
  option: (isSelected: boolean, disabled: boolean) => ({
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500' as const,
    color: isSelected ? colors.text.neutral.main : colors.text.neutral.sub,
    background: isSelected ? colors.bg.surface.default : 'transparent',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
    outline: 'none',
    boxShadow: isSelected ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none',
  }),
};

export function Toggle({ options, value, onChange, disabled = false }: ToggleProps) {
  return (
    <div style={toggleStyles.container}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          style={toggleStyles.option(value === option.value, disabled)}
          onClick={() => !disabled && onChange(option.value)}
          disabled={disabled}
          onMouseEnter={(e) => {
            if (!disabled && value !== option.value) {
              e.currentTarget.style.background = '#F1F3F9';
            }
          }}
          onMouseLeave={(e) => {
            if (value !== option.value) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
