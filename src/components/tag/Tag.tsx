import { colors, spacing } from '../../design-system/tokens';

export type TagOption = {
  value: string;
  label: string;
};

export type TagGroupProps = {
  options: TagOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
};

const tagStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: spacing[2],
  },
  tag: (isSelected: boolean, disabled: boolean) => ({
    padding: `6px ${spacing[3]}`,
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500' as const,
    color: isSelected ? colors.bg.surface.default : colors.text.neutral.main,
    background: isSelected ? colors.primary[500] : colors.bg.surface.gray,
    border: isSelected ? `1px solid ${colors.primary[500]}` : `1px solid ${colors.stroke.neutral.light}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
    outline: 'none',
  }),
};

export function TagGroup({ options, selectedValues, onChange, disabled = false }: TagGroupProps) {
  const handleToggle = (value: string) => {
    if (disabled) return;
    
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div style={tagStyles.container}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            style={tagStyles.tag(isSelected, disabled)}
            onClick={() => handleToggle(option.value)}
            disabled={disabled}
            onMouseEnter={(e) => {
              if (!disabled && !isSelected) {
                e.currentTarget.style.background = '#E0E3E8';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = colors.bg.surface.gray;
              }
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
