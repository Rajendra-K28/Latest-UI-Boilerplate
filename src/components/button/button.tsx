import { buttonStyles } from "./button.styles";
import type { ButtonProps } from "./button.types";
import "./button.css";

export function Button({
    label,
    icon,
    variant,
    iconPosition,
    iconConfig: iconConfigProp,
    hierarchy: hierarchyProp = 'primary',
    size = 'md',
    destructive: destructiveProp = false,
    disabled = false,
    onClick,
    className,
    ...props
  }: ButtonProps) {
    // Resolve variant -> hierarchy/destructive (preferred API)
    const { hierarchy, destructive } = (() => {
      if (!variant) return { hierarchy: hierarchyProp, destructive: destructiveProp };
      switch (variant) {
        case 'primary':
          return { hierarchy: 'primary' as const, destructive: false };
        case 'secondary':
          return { hierarchy: 'secondary-white' as const, destructive: false };
        case 'danger':
          return { hierarchy: 'primary' as const, destructive: true };
        case 'ghost':
          return { hierarchy: 'tertiary-gray' as const, destructive: false };
      }
    })();

    // Resolve icon placement (preferred API) -> iconConfig (legacy internal)
    const iconConfig = (() => {
      if (iconConfigProp) return iconConfigProp;
      if (iconPosition) {
        if (icon && !label) return 'only' as const;
        if (!icon) return 'none' as const;
        return iconPosition === 'left' ? ('left' as const) : ('right' as const);
      }
      // Default: keep legacy behavior
      if (icon && !label) return 'only' as const;
      if (icon && label) return 'left' as const;
      return 'none' as const;
    })();

    const computedClassName = buttonStyles({ hierarchy, size, destructive, disabled });

    return (
      <button
        className={[computedClassName, className].filter(Boolean).join(' ')}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {iconConfig === 'left' && icon && (
          <span className="btn-icon-slot">{icon}</span>
        )}

        {iconConfig !== 'only' && label && (
          <span>{label}</span>
        )}

        {iconConfig === 'only' && icon && (
          <span className="btn-icon-slot">{icon}</span>
        )}

        {iconConfig === 'right' && icon && (
          <span className="btn-icon-slot">{icon}</span>
        )}
      </button>
    );
  }
  