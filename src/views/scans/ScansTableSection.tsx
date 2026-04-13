import { Table, Pagination, SearchInput, type TableColumn, Clock } from '../../components';
import type { ScanRecord, ScanStatusFilter } from '../ScansView';
import { statusFilterLabels, statusChipOrder } from '../ScansView';
import { colors } from '../../design-system/tokens';

type ScansTableSectionProps = {
  statusFilter: ScanStatusFilter;
  setStatusFilter: (value: ScanStatusFilter) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  paginatedScans: ScanRecord[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  onSelectScanForDetails: (scan: ScanRecord) => void;
  onActionClick: (scan: ScanRecord) => void;
};

export function ScansTableSection({
  statusFilter,
  setStatusFilter,
  searchValue,
  setSearchValue,
  paginatedScans,
  currentPage,
  totalPages,
  setCurrentPage,
  onSelectScanForDetails,
  onActionClick,
}: ScansTableSectionProps) {
  const getProjectTypeBadgeStyle = (projectType: string) => {
    if (projectType === 'PCI ASV Scan') {
      return {
        background: '#EEF4FF',
        color: '#4F46E5',
      };
    }

    if (projectType === 'External VA Scan') {
      return {
        background: '#ECFDF3',
        color: '#027A48',
      };
    }

    return {
      background: '#F2F4F7',
      color: '#344054',
    };
  };

  const LoadingSpinnerIcon = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke="#E5E7EB"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10 3A7 7 0 0 1 17 10"
        stroke="#266DF0"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 10 10"
          to="360 10 10"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );

  const SmallRefreshIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 30 30"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
    </svg>
  );

  const columns: TableColumn<ScanRecord>[] = [
    {
      key: 'id',
      header: 'Scan ID',
      width: '120px',
      render: (item) => (
        <button
          type="button"
          onClick={() => onSelectScanForDetails(item)}
          style={{
            border: 'none',
            padding: 0,
            margin: 0,
            background: 'transparent',
            color: colors.primary[600],
            fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
            cursor: 'pointer',
          }}
        >
          {item.id}
        </button>
      ),
    },
    {
      key: 'projectName',
      header: 'Project Name',
      width: '1.6fr',
      render: (item) => (
        <button
          type="button"
          onClick={() => onSelectScanForDetails(item)}
          style={{
            border: 'none',
            padding: 0,
            margin: 0,
            background: 'transparent',
            color: colors.text.neutral.main,
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {item.projectName}
        </button>
      ),
    },
    {
      key: 'projectType',
      header: 'Project Type',
      width: '1.1fr',
      render: (item) => {
        const style = getProjectTypeBadgeStyle(item.projectType);

        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: style.background,
              color: style.color,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {item.projectType}
          </span>
        );
      },
    },
    {
      key: 'scanName',
      header: 'Scan Name',
      width: '1.5fr',
      render: (item) => (
        <span style={{ color: colors.text.neutral.main }}>{item.scanName}</span>
      ),
    },
    {
      key: 'schedule',
      header: 'Quarter / Frequency',
      width: '1.3fr',
      render: (item) => (
        <span style={{ color: colors.text.neutral.sub }}>{item.schedule}</span>
      ),
    },
    {
      key: 'startTime',
      header: 'Start Time',
      width: '1.1fr',
      render: (item) => (
        <span
          style={{
            color: colors.text.neutral.sub,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {item.startTime}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '1.1fr',
      align: 'right',
      render: (item) => {
        const isInProgress = item.status === 'in-progress';
        const isCompleted = item.status === 'completed';
        const isScheduled = item.status === 'scheduled';
        const isFailed = item.status === 'failed';

        const statusLabel =
          item.status === 'in-progress'
            ? 'In Progress'
            : item.status.charAt(0).toUpperCase() + item.status.slice(1);

        const badgeColors =
          item.status === 'completed'
            ? { bg: '#ECFDF3', text: '#027A48', border: '#A6F4C5' }
            : item.status === 'in-progress'
              ? { bg: '#EFF8FF', text: '#175CD3', border: '#B2DDFF' }
              : item.status === 'scheduled'
                ? { bg: '#FFFAEB', text: '#B54708', border: '#FEDF89' }
                : item.status === 'failed'
                  ? { bg: '#FEF3F2', text: '#B42318', border: '#FEE4E2' }
                  : { bg: '#F2F4F7', text: '#344054', border: '#E4E7EC' };

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 6,
              width: 120,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <span
                onClick={() => onSelectScanForDetails(item)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: isFailed ? 'center' : 'flex-start',
                  gap: 8,
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: `1px solid ${badgeColors.border}`,
                  background: badgeColors.bg,
                  color: badgeColors.text,
                  fontSize: 12,
                  fontWeight: 500,
                  width: 120,
                  cursor: 'pointer',
                }}
              >
                {(isCompleted || isInProgress || isScheduled || isFailed) && (
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        isCompleted || isFailed
                          ? 'rgba(240, 68, 56, 0.06)'
                          : 'transparent',
                    }}
                  >
                    {isCompleted && (
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: '#12B76A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                    )}
                    {isInProgress && <LoadingSpinnerIcon />}
                    {isScheduled && (
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: '#FFFAEB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#F79009',
                        }}
                      >
                        <Clock />
                      </span>
                    )}
                    {isFailed && (
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: '#FEF3F2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#F04438',
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        !
                      </span>
                    )}
                  </span>
                )}
                {statusLabel}
              </span>
            </div>

            {isInProgress && typeof item.progressPercent === 'number' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 2,
                  width: 120,
                }}
              >
                <div
                  style={{
                    width: 88,
                    height: 6,
                    borderRadius: 6,
                    background: '#EEF2FF',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${item.progressPercent}%`,
                      height: '100%',
                      borderRadius: 6,
                      background: '#2563EB',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: colors.text.neutral.sub,
                    fontVariantNumeric: 'tabular-nums',
                    flexShrink: 0,
                  }}
                >
                  {item.progressPercent}%
                </span>
              </div>
            )}

            {!isInProgress &&
              typeof item.progressPercent === 'number' && (
                <span
                  style={{
                    fontSize: 12,
                    color: colors.text.neutral.sub,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  Progress {item.progressPercent}%
                </span>
              )}

            {item.actionLabel && (
              <button
                type="button"
                onClick={() => onActionClick(item)}
                style={{
                  marginTop: 2,
                  padding: '6px 12px',
                  borderRadius: 6,
                  border:
                    item.status === 'failed'
                      ? '1px solid #FDEAD7'
                      : '1px solid #D0D5DD',
                  background:
                    item.status === 'failed'
                      ? '#FFF6ED'
                      : '#FFFFFF',
                  color:
                    item.status === 'failed'
                      ? '#FB6514'
                      : '#344054',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  width: 120,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                {(item.actionLabel === 'Rescan' ||
                  item.actionLabel === 'Retry Scan') && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SmallRefreshIcon />
                  </span>
                )}
                <span>{item.actionLabel}</span>
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid #EAECF0',
        background: '#FFFFFF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '14px 20px 10px',
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
            borderRadius: 6,
            border: '1px solid #E4E7EC',
            overflow: 'hidden',
          }}
        >
          {statusChipOrder.map((key, index) => {
            const isActive = statusFilter === key;
            const label = statusFilterLabels[key];
            const isLast = index === statusChipOrder.length - 1;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  const next = statusFilter === key ? 'all' : key;
                  setStatusFilter(next);
                  setCurrentPage(1);
                }}
                style={{
                  padding: '10px 16px',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? '#F9FAFB' : 'transparent',
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
          <SearchInput
            placeholder="Search"
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value);
              setCurrentPage(1);
            }}
            width="md"
          />
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Table
          columns={columns}
          data={paginatedScans}
          keyExtractor={(item) => item.id}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

