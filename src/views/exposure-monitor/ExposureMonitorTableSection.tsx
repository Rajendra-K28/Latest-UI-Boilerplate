import React, { useState, useMemo } from 'react';
import { PageSection } from '../../ui/page';
import {
  Table,
  type TableColumn,
  Pagination,
  SearchInput,
  Tag,
  Eye,
  AlertTriangle,
  MoreVertical,
} from '../../components';
import { colors, spacing } from '../../design-system/tokens';
import type { ExposureRecord, Severity } from './ExposureMonitorView';

type ExposureMonitorTableSectionProps = {
  exposures: ExposureRecord[];
  onSelectExposure: (exposure: ExposureRecord) => void;
};

type TagVariant = React.ComponentProps<typeof Tag>['variant'];

const tagVariantDotColorMap: Record<NonNullable<TagVariant>, string> = {
  red: '#F04438',
  yellow: '#F79009',
  blue: '#2E90FA',
  green: '#12B76A',
  gray: '#667085',
  purple: '#7F56D9',
};

function getStatusVariant(status: string): TagVariant {
  const normalized = status.toLowerCase();

  if (normalized === 'reopened' || normalized === 'rescan pending') {
    return 'red';
  }

  if (normalized === 'fix in progress' || normalized === 'detected') {
    return 'yellow';
  }

  if (normalized === 'fix implemented' || normalized === 'closed') {
    return 'green';
  }

  return 'gray';
}

const severityLabelMap: Record<Severity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const severityTagVariantMap: Record<Severity, TagVariant> = {
  critical: 'red',
  high: 'yellow',
  medium: 'blue',
  low: 'gray',
};

const TagDot = ({ color }: { color: string }) => (
  <span
    style={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: color,
      flexShrink: 0,
    }}
  />
);

type RowActionMenuProps = {
  onViewDetails: () => void;
  onRaiseDispute: () => void;
};

function RowActionMenu({ onViewDetails, onRaiseDispute }: RowActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useState<HTMLDivElement | null>(null)[0];

  return (
    <div
      ref={menuRef as unknown as React.RefObject<HTMLDivElement>}
      style={{ position: 'relative' }}
    >
      <button
        type="button"
        style={{
          background: 'transparent',
          border: 'none',
          padding: 4,
          cursor: 'pointer',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#667085',
        }}
        onClick={() => setIsOpen((open) => !open)}
      >
        <MoreVertical />
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            width: 200,
            background: colors.bg.surface.default,
            border: `1px solid ${colors.stroke.neutral.light}`,
            borderRadius: 8,
            boxShadow:
              '0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
            padding: 4,
            zIndex: 1000,
          }}
        >
          <button
            type="button"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              padding: '8px 12px',
              border: 'none',
              background: 'transparent',
              color: '#344054',
              fontSize: 14,
              fontWeight: 500,
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 6,
            }}
            onClick={() => {
              onViewDetails();
              setIsOpen(false);
            }}
          >
            <Eye />
            View details
          </button>
          <button
            type="button"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              padding: '8px 12px',
              border: 'none',
              background: 'transparent',
              color: '#B42318',
              fontSize: 14,
              fontWeight: 500,
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 6,
            }}
            onClick={() => {
              onRaiseDispute();
              setIsOpen(false);
            }}
          >
            <span style={{ display: 'inline-flex', color: '#B42318' }}>
              <AlertTriangle />
            </span>
            Raise dispute
          </button>
        </div>
      )}
    </div>
  );
}

export function ExposureMonitorTableSection({
  exposures,
  onSelectExposure,
}: ExposureMonitorTableSectionProps) {
  const [searchValue, setSearchValue] = useState('');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredData = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return exposures.filter((item) => {
      if (severityFilter !== 'all' && item.severity !== severityFilter) {
        return false;
      }

      if (!search) return true;

      return (
        item.id.toLowerCase().includes(search) ||
        item.vulnerability.toLowerCase().includes(search) ||
        item.asset.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search)
      );
    });
  }, [exposures, searchValue, severityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = useMemo(
    () => filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredData, currentPage, pageSize],
  );

  const columns: TableColumn<ExposureRecord>[] = [
    {
      key: 'id',
      header: 'CVE ID',
      width: '140px',
      render: (item) => (
        <button
          type="button"
          onClick={() => onSelectExposure(item)}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            color: '#266DF0',
            fontWeight: 500,
          }}
        >
          {item.id}
        </button>
      ),
    },
    {
      key: 'vulnerability',
      header: 'Vulnerability',
      width: '1.8fr',
      render: (item) => (
        <button
          type="button"
          onClick={() => onSelectExposure(item)}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            color: '#101828',
            textAlign: 'left',
          }}
        >
          {item.vulnerability}
        </button>
      ),
    },
    {
      key: 'asset',
      header: 'Asset',
      width: '1.4fr',
      render: (item) => (
        <span style={{ color: '#344054' }}>{item.asset}</span>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      width: '140px',
      align: 'center',
      render: (item) => (
        <Tag
          label={severityLabelMap[item.severity]}
          variant={severityTagVariantMap[item.severity]}
          size="sm"
        />
      ),
    },
    {
      key: 'cvss',
      header: 'CVSS',
      width: '80px',
      align: 'center',
      render: (item) => (
        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
          {item.cvss.toFixed(1)}
        </span>
      ),
    },
    {
      key: 'discovered',
      header: 'Discovered',
      width: '140px',
      render: (item) => (
        <span style={{ color: '#667085' }}>{item.discovered}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '160px',
      render: (item) => (
        <Tag
          label={item.status}
          variant={getStatusVariant(item.status)}
          size="sm"
        />
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      align: 'right',
      render: (item) => (
        <RowActionMenu
          onViewDetails={() => onSelectExposure(item)}
          onRaiseDispute={() => onSelectExposure(item)}
        />
      ),
    },
  ];

  return (
    <PageSection>
      <div
        style={{
          padding: '0 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
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
              {(['all', 'critical', 'high', 'medium', 'low'] as const).map(
                (key, index) => {
                  const isAll = key === 'all';
                  const isActive = severityFilter === key;
                  const label = isAll ? 'View all' : severityLabelMap[key];
                  const isLast = index === 4;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSeverityFilter((prev) =>
                          prev === key ? 'all' : key,
                        );
                        setCurrentPage(1);
                      }}
                      style={{
                        padding: '10px 16px',
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                        backgroundColor: isActive ? '#f9fafb' : 'transparent',
                        color: isActive ? '#344054' : '#667085',
                        cursor: 'pointer',
                        border: 'none',
                        borderRight: !isLast
                          ? '1px solid #E4E7EC'
                          : 'none',
                      }}
                    >
                      {label}
                    </button>
                  );
                },
              )}
            </div>

            <SearchInput
              placeholder="Search"
              value={searchValue}
              onChange={(value) => {
                setSearchValue(value);
                setCurrentPage(1);
              }}
              width="sm"
            />
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <Table
              columns={columns}
              data={paginatedData}
              keyExtractor={(item) => item.id}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </PageSection>
  );
}

