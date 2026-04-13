import { Table, Pagination, SearchInput, SelectInput, type TableColumn } from '../../components';
import type { AssetRecord, AssetStatusFilter } from '../ScanComponentsView';

type AssetsTableSectionProps = {
  statusFilter: AssetStatusFilter;
  onStatusFilterChange: (value: AssetStatusFilter) => void;
  selectedType: string;
  onSelectedTypeChange: (value: string) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  assetTypeOptions: { value: string; label: string }[];
  statusChipOrder: AssetStatusFilter[];
  statusFilterLabels: Record<AssetStatusFilter, string>;
  columns: TableColumn<AssetRecord>[];
  paginatedAssets: AssetRecord[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function AssetsTableSection({
  statusFilter,
  onStatusFilterChange,
  selectedType,
  onSelectedTypeChange,
  searchValue,
  onSearchValueChange,
  assetTypeOptions,
  statusChipOrder,
  statusFilterLabels,
  columns,
  paginatedAssets,
  currentPage,
  totalPages,
  onPageChange,
}: AssetsTableSectionProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid #EAECF0',
        background: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: 12,
          borderBottom: '1px solid #EAECF0',
          background: '#FFFFFF',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'stretch',
            background: '#F2F4F7',
            borderRadius: '6px',
            border: '1px solid #E4E7EC',
            overflow: 'hidden',
          }}
        >
          {statusChipOrder.map((key, index) => {
            const isAll = key === 'all';
            const isActive = statusFilter === key;
            const label = isAll ? 'View all' : statusFilterLabels[key];
            const isLast = index === statusChipOrder.length - 1;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onStatusFilterChange(statusFilter === key ? 'all' : key);
                }}
                style={{
                  padding: '10px 16px',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? '#f9fafb' : 'transparent',
                  color: isActive ? '#344054' : '#667085',
                  cursor: 'pointer',
                  border: 'none',
                  borderRight: !isLast ? '1px solid #E4E7EC' : 'none',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <SelectInput
            value={selectedType}
            onChange={onSelectedTypeChange}
            options={assetTypeOptions}
            width="sm"
            placeholder="All types"
          />
          <SearchInput
            placeholder="Search assets, IPs, scan IDs"
            value={searchValue}
            onChange={onSearchValueChange}
            width="sm"
          />
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Table
          columns={columns}
          data={paginatedAssets}
          keyExtractor={(item: AssetRecord) => item.id}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

