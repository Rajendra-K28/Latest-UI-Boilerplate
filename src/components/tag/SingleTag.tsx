import { colors, spacing } from '../../design-system/tokens';

export type TagVariant = 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple';
export type TagSize = 'sm' | 'md' | 'lg';

export type TagProps = {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  icon?: React.ReactNode;
};

const variantStyles: Record<TagVariant, { background: string; color: string; border: string }> = {
  blue: {
    background: '#EFF8FF',
    color: '#2E90FA',
    border: '#B2DDFF',
  },
  green: {
    background: '#ECFDF3',
    color: '#12B76A',
    border: '#ABEFC6',
  },
  yellow: {
    background: '#FFFAEB',
    color: '#F79009',
    border: '#FEDF89',
  },
  red: {
    background: '#FEF3F2',
    color: '#F04438',
    border: '#FECDCA',
  },
  gray: {
    background: colors.bg.surface.gray,
    color: colors.text.neutral.main,
    border: colors.stroke.neutral.light,
  },
  purple: {
    background: '#F4F3FF',
    color: '#7F56D9',
    border: '#D9D6FE',
  },
};

const sizeStyles: Record<TagSize, { padding: string; fontSize: string; height: string }> = {
  sm: {
    padding: `4px ${spacing[2]}`,
    fontSize: '12px',
    height: '24px',
  },
  md: {
    padding: `6px ${spacing[3]}`,
    fontSize: '13px',
    height: '28px',
  },
  lg: {
    padding: `8px ${spacing[3]}`,
    fontSize: '14px',
    height: '32px',
  },
};

export function Tag({ label, variant = 'gray', size = 'md', icon }: TagProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[1],
        padding: sizeStyle.padding,
        borderRadius: '6px',
        fontSize: sizeStyle.fontSize,
        fontWeight: '500',
        color: variantStyle.color,
        background: variantStyle.background,
        border: `1px solid ${variantStyle.border}`,
        height: sizeStyle.height,
        whiteSpace: 'nowrap',
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </span>
  );
}
