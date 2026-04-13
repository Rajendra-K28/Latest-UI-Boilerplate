import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Download } from '../icons';
import { colors, spacing } from '../../design-system/tokens';

type InvoiceActionMenuProps = {
  onView?: () => void;
  onDownload?: () => void;
};

const styles = {
  actionButton: {
    background: 'transparent',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
    color: '#667085',
  },
  actionMenu: {
    position: 'absolute' as const,
    top: 'calc(100% + 4px)',
    right: 0,
    width: '160px',
    background: colors.bg.surface.default,
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    boxShadow: '0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
    padding: '4px',
    zIndex: 1000,
  },
  actionMenuItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: '8px 12px',
    border: 'none',
    background: 'transparent',
    color: '#344054',
    fontSize: '14px',
    fontWeight: '500' as const,
    textAlign: 'left' as const,
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background 0.15s ease',
  },
};

export function InvoiceActionMenu({ onView, onDownload }: InvoiceActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        style={styles.actionButton}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F9FAFB';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <MoreVertical />
      </button>

      {isOpen && (
        <div style={styles.actionMenu}>
          <button
            style={styles.actionMenuItem}
            onClick={() => {
              onView?.();
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Eye />
            View
          </button>
          <button
            style={styles.actionMenuItem}
            onClick={() => {
              onDownload?.();
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Download />
            Download
          </button>
        </div>
      )}
    </div>
  );
}
