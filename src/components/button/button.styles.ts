import type { ButtonHierarchy, ButtonSize } from "./button.types";

export const buttonStyles = ({ 
  hierarchy, 
  size,
  destructive,
  disabled 
}: { 
  hierarchy: ButtonHierarchy; 
  size: ButtonSize;
  destructive?: boolean;
  disabled?: boolean;
}) => {
    // Base styles
    const base = 'btn-base';
  
    // Size class
    const sizeClass = `btn-${size}`;
  
    // Hierarchy styles using CSS classes
    const getHierarchyClass = () => {
      const suffix = destructive ? '-destructive' : '';
      switch (hierarchy) {
        case 'primary':
          return `btn-primary${suffix}`;
        case 'secondary-gray':
          return `btn-secondary-gray${suffix}`;
        case 'secondary-white':
          return `btn-secondary-white${suffix}`;
        case 'tertiary-gray':
          return `btn-tertiary-gray${suffix}`;
        case 'link-gray':
          return `btn-link-gray${suffix}`;
      }
    };
  
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  
    // Important: keep size class AFTER hierarchy so size overrides height/padding.
    return `${base} ${getHierarchyClass()} ${sizeClass} ${disabledStyles}`;
  };
  