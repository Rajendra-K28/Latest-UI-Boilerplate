import { FilterCard } from '../../components';
import { colors } from '../../design-system/tokens';
import { PageGrid } from '../../ui/page';

export function AsvScansStatsCards() {
  return (
    <PageGrid columns={4} gap={16}>
      <FilterCard
        value="3/4"
        label="Quarters Passed"
        icon={
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: '#ECFDF3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '2px solid #12B76A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#12B76A',
              }}
            >
              ✓
            </span>
          </div>
        }
        variant="green"
        footer={
          <span
            style={{
              fontSize: 12,
              color: '#039855',
              fontWeight: 500,
            }}
          >
            ↑ 75% compliance rate
          </span>
        }
      />

      <FilterCard
        value="FAIL"
        label="Current Quarter"
        icon={
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: '#FEF3F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '2px solid #F04438',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#F04438',
              }}
            >
              ✕
            </span>
          </div>
        }
        variant="red"
        footer={
          <span
            style={{
              fontSize: 12,
              color: '#F04438',
              fontWeight: 500,
            }}
          >
            ↓ 11d days remaining
          </span>
        }
      />

      <FilterCard
        value="1"
        label="Scans This Quarter"
        icon={
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: '#EEF4FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 6,
                border: '2px solid #155EEF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#155EEF',
              }}
            >
              ⬚
            </span>
          </div>
        }
        variant="blue"
        footer={
          <span
            style={{
              fontSize: 12,
              color: colors.text.neutral.sub,
            }}
          >
            1 compliance scan scheduled
          </span>
        }
      />

      <FilterCard
        value="1"
        label="Rescans Run"
        icon={
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: '#FFFAEB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '2px solid #F79009',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#F79009',
              }}
            >
              ⟳
            </span>
          </div>
        }
        variant="yellow"
        footer={
          <span
            style={{
              fontSize: 12,
              color: colors.text.neutral.sub,
            }}
          >
            Rescan planned for remediation
          </span>
        }
      />
    </PageGrid>
  );
}

