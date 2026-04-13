import { colors } from '../../design-system/tokens';
import { Check } from '../icons';

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

const checkboxStyles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    position: 'relative' as const,
    flexShrink: 0,
  },
  input: {
    position: 'absolute' as const,
    opacity: 0,
    width: '16px',
    height: '16px',
    cursor: 'pointer' as const,
    margin: 0,
  },
  customCheckbox: (checked: boolean, disabled: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    border: checked ? 'none' : `1.5px solid ${colors.stroke.neutral.soft}`,
    background: checked ? colors.primary[600] : colors.bg.surface.default,
    transition: 'all 0.2s ease',
    pointerEvents: 'none' as const,
    opacity: disabled ? 0.5 : 1,
    padding: '2px',
  }),
  checkIcon: {
    width: '12px',
    height: '12px',
    color: colors.bg.surface.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export function Checkbox({ checked, onChange, disabled = false }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  return (
    <div style={checkboxStyles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        style={checkboxStyles.input}
      />
      <div style={checkboxStyles.customCheckbox(checked, disabled)}>
        {checked && (
          <div style={checkboxStyles.checkIcon}>
            <Check />
          </div>
        )}
      </div>
    </div>
  );
}
