import { useState, useRef, useEffect } from 'react';
import { defenseRoadmapTableStyles } from './DefenseRoadmapTable.styles';
import { MoreVertical, Edit, Trash } from '../../icons';

type ActionMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export function ActionMenu({ onEdit, onDelete }: ActionMenuProps) {
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
        style={defenseRoadmapTableStyles.actionButton}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F9FAFB';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
        }}
      >
        <MoreVertical />
      </button>

      {isOpen && (
        <div style={defenseRoadmapTableStyles.actionMenu}>
          <button
            style={defenseRoadmapTableStyles.actionMenuItem}
            onClick={() => {
              onEdit?.();
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Edit />
            Edit
          </button>
          <button
            style={defenseRoadmapTableStyles.actionMenuItem}
            onClick={() => {
              onDelete?.();
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FEF3F2';
              e.currentTarget.style.color = '#B42318';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#344054';
            }}
          >
            <Trash />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
