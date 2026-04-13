import { useState } from 'react';
import { colors, spacing } from '../../design-system/tokens';
import { ChevronUp, ChevronDown } from '../icons';

export type CollapsibleSectionProps = {
  title: string;
  isOpenByDefault?: boolean;
  children: React.ReactNode;
};

const collapsibleStyles = {
  container: {
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '12px',
    background: colors.bg.surface.default,
    overflow: 'hidden',
  },
  header: (isOpen: boolean) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing[4]} ${spacing[5]}`,
    cursor: 'pointer',
    background: isOpen ? colors.bg.surface.gray : 'transparent',
    transition: 'background 0.2s ease',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
  }),
  title: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
  },
  icon: {
    color: colors.text.neutral.sub,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s ease',
  },
  content: (isOpen: boolean) => ({
    maxHeight: isOpen ? '2000px' : '0',
    overflow: 'hidden' as const,
    transition: 'max-height 0.3s ease',
  }),
  contentInner: {
    padding: `${spacing[4]} ${spacing[5]}`,
    paddingTop: 0,
  },
};

export function CollapsibleSection({
  title,
  isOpenByDefault = true,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  return (
    <div style={collapsibleStyles.container}>
      <button
        type="button"
        style={collapsibleStyles.header(isOpen)}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = colors.bg.surface.gray;
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        <span style={collapsibleStyles.title}>{title}</span>
        <span style={collapsibleStyles.icon}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      <div style={collapsibleStyles.content(isOpen)}>
        <div style={collapsibleStyles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
