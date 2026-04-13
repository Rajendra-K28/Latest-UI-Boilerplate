import { colors, spacing } from '../../design-system/tokens';
import type { FindingRow } from '../vulnerability-management/constants';

type ExposureAffectedAssetsTableProps = {
  finding: FindingRow;
};

export function ExposureAffectedAssetsTable({ finding }: ExposureAffectedAssetsTableProps) {
  return (
    <div style={{ marginBottom: spacing[4] }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: colors.text.neutral.sub, textTransform: 'uppercase' }}>
            Affected Assets
          </span>
          <span
            style={{
              minWidth: 20,
              height: 20,
              padding: '0 6px',
              borderRadius: 999,
              background: '#F2F4F7',
              color: '#667085',
              fontSize: 12,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            1
          </span>
        </div>
        <span style={{ color: '#98A2B3', display: 'inline-flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div
        style={{
          border: '1px solid #D8DEE9',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#FFFFFF',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '10px 16px',
            background: '#F2F4F7',
            borderBottom: '1px solid #D8DEE9',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 500, color: '#74829D', textTransform: 'uppercase' }}>Asset / Endpoint</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: '#74829D', textTransform: 'uppercase' }}>Port / Protocol</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '10px 16px',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 13, color: '#344054' }}>{finding.ip}</span>
          <span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 6,
                border: '1px solid #C7D7FD',
                background: '#EFF4FF',
                color: '#266DF0',
                fontSize: 12,
                fontWeight: 500,
                lineHeight: '18px',
              }}
            >
              {finding.port}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
