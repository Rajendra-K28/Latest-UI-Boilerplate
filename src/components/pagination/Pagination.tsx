import { colors } from '../../design-system/tokens';
import { ArrowLeft, ArrowRight } from '../icons';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '12px 24px',
    borderTop: `1px solid ${colors.stroke.neutral.light}`,
    background: colors.bg.surface.default,
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
  numbers: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  number: (isActive: boolean) => ({
    display: 'flex',
    width: '40px',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    background: isActive ? colors.bg.surface.gray : 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500' as const,
    color: isActive ? colors.text.neutral.main : colors.text.neutral.sub,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div style={styles.container}>
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

      <div style={styles.numbers}>
        {generatePageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={page}
              style={styles.number(currentPage === page)}
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
      </div>

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
