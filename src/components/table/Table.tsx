import type { ReactNode } from 'react';

export type TableColumn<T> = {
  key: string;
  header: string | ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render: (item: T, index: number) => ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
};

const styles = {
  container: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    padding: `12px 24px`,
    gap: '16px',
    background: '#F9FAFB',
    borderBottom: `1px solid #EAECF0`,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  tableHeaderCell: (align: 'left' | 'center' | 'right' = 'left') => ({
    fontSize: '12px',
    fontWeight: '500' as const,
    color: '#667085',
    lineHeight: '18px',
    textAlign: align,
  }),
  tableRow: {
    display: 'grid',
    padding: `16px 24px`,
    gap: '16px',
    borderBottom: `1px solid #EAECF0`,
    transition: 'background 0.15s ease',
  },
  tableRowLast: {
    borderBottom: 'none',
  },
  tableCell: (align: 'left' | 'center' | 'right' = 'left') => ({
    fontSize: '14px',
    fontWeight: '400' as const,
    color: '#101828',
    lineHeight: '20px',
    textAlign: align,
    display: 'flex',
    alignItems: 'center',
    justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
  }),
};

export function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  // Build grid template columns from column widths
  const gridTemplateColumns = columns
    .map(col => col.width || '1fr')
    .join(' ');

  return (
    <div style={styles.container}>
      {/* Table Header */}
      <div style={{ ...styles.tableHeader, gridTemplateColumns }}>
        {columns.map((column) => (
          <div
            key={column.key}
            style={styles.tableHeaderCell(column.align)}
          >
            {column.header}
          </div>
        ))}
      </div>

      {/* Table Rows */}
      {data.map((item, index) => {
        const isLastRow = index === data.length - 1;
        const rowStyle = isLastRow
          ? { ...styles.tableRow, ...styles.tableRowLast, gridTemplateColumns }
          : { ...styles.tableRow, gridTemplateColumns };

        return (
          <div
            key={keyExtractor(item, index)}
            style={rowStyle}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                style={styles.tableCell(column.align)}
              >
                {column.render(item, index)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
