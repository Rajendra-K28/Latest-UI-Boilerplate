import { PageGrid } from '../../ui/page';
import { FilterCard } from '../../components';
import { colors } from '../../design-system/tokens';
import type React from 'react';

type FilterCardsSectionProps = {
  totalAssets: number;
  activeScans: number;
  scanReadyAssets: number;
  totalVulnerabilities: number;
  criticalIssues: number;
  renderSimpleDeltaFooter: (
    direction: 'up' | 'down',
    value: string,
    color: string,
  ) => React.ReactNode;
  AssetsIcon: () => React.ReactNode;
  ActiveScansIcon: () => React.ReactNode;
  ScanReadyIcon: () => React.ReactNode;
  VulnerabilitiesIcon: () => React.ReactNode;
  CriticalIssuesIcon: () => React.ReactNode;
};

export function FilterCardsSection({
  totalAssets,
  activeScans,
  scanReadyAssets,
  totalVulnerabilities,
  criticalIssues,
  renderSimpleDeltaFooter,
  AssetsIcon,
  ActiveScansIcon,
  ScanReadyIcon,
  VulnerabilitiesIcon,
  CriticalIssuesIcon,
}: FilterCardsSectionProps) {
  return (
    <PageGrid columns={5} gap={16}>
      <FilterCard
        value={totalAssets}
        label="Total Assets"
        icon={
          <span style={{ color: '#266DF0', lineHeight: 0 }}>
            <AssetsIcon />
          </span>
        }
        variant="blue"
        footer={renderSimpleDeltaFooter('up', '+2 this month', colors.green[500])}
      />
      <FilterCard
        value={activeScans}
        label="Active Scans"
        icon={
          <span style={{ color: '#F2AE40' }}>
            <ActiveScansIcon />
          </span>
        }
        variant="yellow"
        footer={renderSimpleDeltaFooter('up', '+1 queued', colors.yellow[500])}
      />
      <FilterCard
        value={scanReadyAssets}
        label="Scan-Ready Assets"
        icon={
          <span style={{ color: colors.green[500], lineHeight: 0 }}>
            <ScanReadyIcon />
          </span>
        }
        variant="green"
        footer={renderSimpleDeltaFooter('up', '+3 validated', colors.green[500])}
      />
      <FilterCard
        value={totalVulnerabilities}
        label="Total Vulnerabilities"
        icon={
          <span style={{ color: colors.yellow[500], lineHeight: 0 }}>
            <VulnerabilitiesIcon />
          </span>
        }
        variant="yellow"
        footer={renderSimpleDeltaFooter('down', '-5 vs last scan', colors.green[500])}
      />
      <FilterCard
        value={criticalIssues}
        label="Critical Issues"
        icon={
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 25,
              height: 25,
              color: colors.red[500],
            }}
          >
            <CriticalIssuesIcon />
          </span>
        }
        variant="red"
        footer={renderSimpleDeltaFooter('up', '+1 new', colors.red[500])}
      />
    </PageGrid>
  );
}

