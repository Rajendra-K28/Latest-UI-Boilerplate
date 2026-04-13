import { useMemo, useState } from 'react';
import { FilterCard, SearchInput, Table, type TableColumn } from '../../components';
import { colors } from '../../design-system/tokens';
import { PageGrid } from '../../ui/page';
import { AsvFailScanResultPage } from './AsvFailScanResultPage';
import { AsvPassScanResultPage } from './AsvPassScanResultPage';

type HistoryFilter = 'all' | 'pass' | 'fail';

type HistoryRow = {
  scanId: string;
  description: string;
  quarter: string;
  date: string;
  type: string;
  findings: Array<{ id: string; bg: string; color: string }>;
  result: 'PASS' | 'FAIL';
  validated: 'Yes' | 'No';
  /** Shown on pass result detail VM banner */
  duration?: string;
  /** e.g. "Rescan 1" when applicable */
  rescanBadgeLabel?: string | null;
  /** "Q3 2025" style label for pass detail */
  vmQuarterLabel?: string;
  passVmMedium?: number;
  passVmLow?: number;
};

const TotalScansIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M3.125 7.29167V5.20833C3.125 4.6558 3.34449 4.12589 3.73519 3.73519C4.12589 3.34449 4.6558 3.125 5.20833 3.125H7.29167" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.708 3.125H19.7913C20.3439 3.125 20.8738 3.34449 21.2645 3.73519C21.6552 4.12589 21.8747 4.6558 21.8747 5.20833V7.29167" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.8747 17.709V19.7923C21.8747 20.3449 21.6552 20.8748 21.2645 21.2655C20.8738 21.6562 20.3439 21.8757 19.7913 21.8757H17.708" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.29167 21.8757H5.20833C4.6558 21.8757 4.12589 21.6562 3.73519 21.2655C3.34449 20.8748 3.125 20.3449 3.125 19.7923V17.709" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.29199 12.5H17.7087" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScansPassedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z" stroke="#288D68" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.375 12.4993L11.4583 14.5827L15.625 10.416" stroke="#288D68" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScanFailedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M12.4997 22.9173C18.2526 22.9173 22.9163 18.2536 22.9163 12.5007C22.9163 6.74768 18.2526 2.08398 12.4997 2.08398C6.74671 2.08398 2.08301 6.74768 2.08301 12.5007C2.08301 18.2536 6.74671 22.9173 12.4997 22.9173Z" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.625 9.375L9.375 15.625" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.375 9.375L15.625 15.625" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RescansRunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M3.125 12.5C3.125 10.0136 4.11272 7.62903 5.87087 5.87087C7.62903 4.11272 10.0136 3.125 12.5 3.125C15.1209 3.13486 17.6365 4.15752 19.5208 5.97917L21.875 8.33333" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.8753 3.125V8.33333H16.667" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.875 12.5C21.875 14.9864 20.8873 17.371 19.1291 19.1291C17.371 20.8873 14.9864 21.875 12.5 21.875C9.87912 21.8651 7.36351 20.8425 5.47917 19.0208L3.125 16.6667" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33333 16.666H3.125V21.8743" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FailResultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <g clipPath="url(#clip0_history_fail)">
      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 4.5L4.5 7.5" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 4.5L7.5 7.5" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_history_fail">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const PassResultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <g clipPath="url(#clip0_history_pass)">
      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#12B76A" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 6L5.5 7L7.5 5" stroke="#12B76A" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_history_pass">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const HISTORY_ROWS: HistoryRow[] = [
  {
    scanId: 'ASV-W4-2025',
    description: 'Quarter 4 — Initial Scan',
    quarter: 'Quarter 4',
    date: 'Feb 12, 2026',
    type: 'Initial Scan',
    findings: [
      { id: '2', bg: '#FEF3F2', color: '#B42318' },
      { id: '5', bg: '#FFFBEB', color: '#B45309' },
      { id: '8', bg: '#EFF6FF', color: '#1D4ED8' },
      { id: '6', bg: '#EFF6FF', color: '#1D4ED8' },
    ],
    result: 'FAIL',
    validated: 'No',
  },
  {
    scanId: 'ASV-W3-2025',
    description: 'Quarter 3 — Initial Scan',
    quarter: 'Quarter 3',
    date: 'Nov 14, 2025',
    type: 'Initial Scan',
    findings: [
      { id: '1', bg: '#FEF3F2', color: '#B42318' },
      { id: '2', bg: '#FEF3F2', color: '#B42318' },
      { id: '7', bg: '#FFFBEB', color: '#B45309' },
      { id: '12', bg: '#EFF6FF', color: '#1D4ED8' },
    ],
    result: 'FAIL',
    validated: 'No',
  },
  {
    scanId: 'ASV-W3-2025-R1',
    description: 'Quarter 3 — Rescan 1',
    quarter: 'Quarter 3',
    date: 'Dec 7, 2025',
    type: 'Rescan',
    findings: [
      { id: '2', bg: '#FFFBEB', color: '#B45309' },
      { id: '8', bg: '#EFF6FF', color: '#1D4ED8' },
    ],
    result: 'PASS',
    validated: 'Yes',
    duration: '2h 05m duration',
    rescanBadgeLabel: 'Rescan 1',
    vmQuarterLabel: 'Q3 2025',
    passVmMedium: 3,
    passVmLow: 8,
  },
  {
    scanId: 'ASV-W2-2025',
    description: 'Quarter 2 — Initial Scan',
    quarter: 'Quarter 2',
    date: 'Sep 8, 2025',
    type: 'Initial Scan',
    findings: [
      { id: '1', bg: '#FFFBEB', color: '#B45309' },
      { id: '4', bg: '#FFFBEB', color: '#B45309' },
      { id: '9', bg: '#EFF6FF', color: '#1D4ED8' },
    ],
    result: 'PASS',
    validated: 'Yes',
    duration: '1h 52m duration',
    rescanBadgeLabel: null,
    vmQuarterLabel: 'Q2 2025',
    passVmMedium: 5,
    passVmLow: 9,
  },
  {
    scanId: 'ASV-W1-2025',
    description: 'Quarter 1 — Initial Scan',
    quarter: 'Quarter 1',
    date: 'Jun 10, 2025',
    type: 'Initial Scan',
    findings: [
      { id: '2', bg: '#FFFBEB', color: '#B45309' },
      { id: '6', bg: '#FFFBEB', color: '#B45309' },
      { id: '11', bg: '#EFF6FF', color: '#1D4ED8' },
    ],
    result: 'PASS',
    validated: 'Yes',
    duration: '2h 10m duration',
    rescanBadgeLabel: null,
    vmQuarterLabel: 'Q1 2025',
    passVmMedium: 8,
    passVmLow: 11,
  },
];

function openPassDetailProps(row: HistoryRow) {
  return {
    scanId: row.scanId,
    quarter: row.quarter,
    date: row.date,
    duration: row.duration,
    rescanBadgeLabel: row.rescanBadgeLabel ?? (row.type === 'Rescan' ? 'Rescan 1' : null),
    vmQuarterLabel: row.vmQuarterLabel,
    mediumCount: row.passVmMedium,
    lowCount: row.passVmLow,
  };
}

export function AsvScansHistoryTab() {
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const [searchValue, setSearchValue] = useState('');
  const [selectedScanRow, setSelectedScanRow] = useState<HistoryRow | null>(null);

  const goToScanDetail = (row: HistoryRow) => setSelectedScanRow(row);

  const filteredRows = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();

    return HISTORY_ROWS.filter((row) => {
      if (filter === 'pass' && row.result !== 'PASS') return false;
      if (filter === 'fail' && row.result !== 'FAIL') return false;

      if (!normalized) return true;

      return (
        row.scanId.toLowerCase().includes(normalized) ||
        row.description.toLowerCase().includes(normalized)
      );
    });
  }, [filter, searchValue]);

  const columns: TableColumn<HistoryRow>[] = [
    {
      key: 'scanId',
      header: 'Scan ID',
      width: '130px',
      render: (row) => (
        <button
          type="button"
          onClick={() => goToScanDetail(row)}
          style={{
            color: colors.primary[600],
            fontWeight: 500,
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          {row.scanId}
        </button>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      width: '1.8fr',
      render: (row) => <span style={{ color: colors.text.neutral.main }}>{row.description}</span>,
    },
    {
      key: 'quarter',
      header: 'Quarter',
      width: '0.9fr',
      render: (row) => <span style={{ color: colors.text.neutral.sub }}>{row.quarter}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      width: '1fr',
      render: (row) => <span style={{ color: colors.text.neutral.sub }}>{row.date}</span>,
    },
    {
      key: 'type',
      header: 'Type',
      width: '0.9fr',
      render: (row) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 500,
            color: row.type === 'Rescan' ? '#175CD3' : '#344054',
            background: row.type === 'Rescan' ? '#EFF8FF' : '#F2F4F7',
          }}
        >
          {row.type}
        </span>
      ),
    },
    {
      key: 'findings',
      header: 'Findings',
      width: '1.3fr',
      render: (row) => (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {row.findings.map((chip) => (
            <span
              key={chip.id}
              style={{
                padding: '2px 6px',
                borderRadius: 4,
                background: chip.bg,
                color: chip.color,
                fontSize: 11,
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  background: chip.color,
                }}
              />
              {chip.id}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'result',
      header: 'Result',
      width: '0.9fr',
      render: (row) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 8px',
            borderRadius: 999,
            background: row.result === 'PASS' ? '#ECFDF3' : '#FEF3F2',
            fontSize: 12,
            fontWeight: 600,
            color: row.result === 'PASS' ? '#027A48' : '#B42318',
          }}
        >
          {row.result === 'PASS' ? <PassResultIcon /> : <FailResultIcon />}
          {row.result}
        </span>
      ),
    },
    {
      key: 'validated',
      header: 'Validated',
      width: '0.9fr',
      render: (row) => (
        <span
          style={{
            fontSize: 12,
            color: row.validated === 'Yes' ? '#027A48' : colors.text.neutral.sub,
          }}
        >
          {row.validated}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '52px',
      align: 'right',
      render: (row) => (
        <button
          type="button"
          aria-label={`Open details for ${row.scanId}`}
          onClick={() => goToScanDetail(row)}
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            border: '1px solid #D0D5DD',
            background: '#FFFFFF',
            color: '#667085',
            cursor: 'pointer',
          }}
        >
          ›
        </button>
      ),
    },
  ];

  if (selectedScanRow?.result === 'FAIL') {
    return (
      <AsvFailScanResultPage
        scanId={selectedScanRow.scanId}
        quarter={selectedScanRow.quarter}
        date={selectedScanRow.date}
        onBack={() => setSelectedScanRow(null)}
      />
    );
  }

  if (selectedScanRow?.result === 'PASS') {
    const p = openPassDetailProps(selectedScanRow);
    return (
      <AsvPassScanResultPage
        scanId={p.scanId}
        quarter={p.quarter}
        date={p.date}
        duration={p.duration}
        rescanBadgeLabel={p.rescanBadgeLabel}
        vmQuarterLabel={p.vmQuarterLabel}
        mediumCount={p.mediumCount}
        lowCount={p.lowCount}
        onBack={() => setSelectedScanRow(null)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageGrid columns={4} gap={16}>
        <FilterCard
          value="5"
          label="Total Scans"
          icon={<TotalScansIcon />}
          variant="blue"
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
        <FilterCard
          value="3"
          label="Scans Passed"
          icon={<ScansPassedIcon />}
          variant="green"
          footer={<span style={{ fontSize: 12, color: '#12B76A' }}>↑ 60% pass rate</span>}
        />
        <FilterCard
          value="2"
          label="Scans Failed"
          icon={<ScanFailedIcon />}
          variant="red"
          footer={<span style={{ fontSize: 12, color: '#F04438' }}></span>}
        />
        <FilterCard
          value="1"
          label="Rescans Run"
          icon={<RescansRunIcon />}
          variant="yellow"
          footer={<span style={{ fontSize: 12, color: colors.text.neutral.sub }}></span>}
        />
      </PageGrid>

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
            borderBottom: '1px solid #EAECF0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            rowGap: 12,
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
            {(
              [
                { id: 'all', label: 'All Results' },
                { id: 'pass', label: 'PASS' },
                { id: 'fail', label: 'FAIL' },
              ] as const
            ).map((item, index, arr) => {
              const isActive = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  style={{
                    padding: '10px 16px',
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? '#FFFFFF' : 'transparent',
                    color: isActive ? '#344054' : '#667085',
                    border: 'none',
                    borderRight: index < arr.length - 1 ? '1px solid #E4E7EC' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <SearchInput
            placeholder="Search scan ID or description..."
            value={searchValue}
            onChange={setSearchValue}
            width="md"
          />
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <Table
            columns={columns}
            data={filteredRows}
            keyExtractor={(row) => row.scanId}
          />
        </div>
      </div>
    </div>
  );
}

