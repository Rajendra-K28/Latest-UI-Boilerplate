import { colors } from '../../design-system/tokens';
import { ItemsPerPageDropdown } from './ItemsPerPageDropdown';
import { ArrowLeft, ArrowRight } from '../icons';

export interface PaginationWithPageSizeProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 24px',
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    background: '#F9FAFB',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  text: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    whiteSpace: 'nowrap' as const,
  },
  spacer: {
    flex: 1,
  },
  button: (disabled: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    background: 'white',
    border: `1px solid ${colors.stroke.neutral.light}`,
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600' as const,
    color: disabled ? colors.text.neutral.soft : colors.text.neutral.sub,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  }),
  pageNumber: (isActive: boolean) => ({
    display: 'flex',
    width: '40px',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    background: isActive ? 'white' : 'transparent',
    border: isActive ? `1px solid ${colors.stroke.neutral.light}` : 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500' as const,
    color: isActive ? colors.text.neutral.main : colors.text.neutral.sub,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: isActive ? '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' : 'none',
  }),
};

export function PaginationWithPageSize({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationWithPageSizeProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // Show max 5 page numbers with siblings
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Near the start: 1 2 3 4 ... last
        pages.push(2, 3, 4);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: 1 ... last-3 last-2 last-1 last
        pages.push('...');
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle: 1 ... prev current next ... last (always show siblings)
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={styles.container}>
      {/* Items per page selector */}
      <ItemsPerPageDropdown
        value={itemsPerPage}
        onChange={(value) => {
          onItemsPerPageChange(value);
          onPageChange(1);
        }}
      />
      
      <span style={styles.text}>items per page</span>
      
      <span style={styles.text}>
        {startItem}-{endItem} of {totalItems}
      </span>
      
      {/* Spacer to push pagination to the right */}
      <div style={styles.spacer} />
      
      {/* Previous button */}
      <button
        style={styles.button(currentPage === 1)}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        onMouseEnter={(e) => {
          if (currentPage > 1) {
            e.currentTarget.style.background = colors.bg.surface.gray;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white';
        }}
      >
        <ArrowLeft />
        Previous
      </button>

      {/* Page numbers */}
      {generatePageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={page}
            style={styles.pageNumber(currentPage === page)}
            onClick={() => onPageChange(page)}
            onMouseEnter={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.background = colors.bg.surface.gray;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} style={{ padding: '0 4px', color: '#667085' }}>
            {page}
          </span>
        )
      ))}

      {/* Next button */}
      <button
        style={styles.button(currentPage === totalPages)}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        onMouseEnter={(e) => {
          if (currentPage < totalPages) {
            e.currentTarget.style.background = colors.bg.surface.gray;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white';
        }}
      >
        Next
        <ArrowRight />
      </button>
    </div>
  );
}
