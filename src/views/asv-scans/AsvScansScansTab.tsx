import { AsvScansQuarterAccordion } from './AsvScansQuarterAccordion';
import { AsvScansStatsCards } from './AsvScansStatsCards';
import type { Dispatch, SetStateAction } from 'react';

type ExpandedQuarterId = 'q4' | 'q3' | 'q2' | 'q1' | null;

type AsvScansScansTabProps = {
  expandedQuarterId: ExpandedQuarterId;
  setExpandedQuarterId: Dispatch<SetStateAction<ExpandedQuarterId>>;
  onLaunchRescan: () => void;
};

export function AsvScansScansTab({
  expandedQuarterId,
  setExpandedQuarterId,
  onLaunchRescan,
}: AsvScansScansTabProps) {
  return (
    <>
      <AsvScansStatsCards />
      <AsvScansQuarterAccordion
        expandedQuarterId={expandedQuarterId}
        setExpandedQuarterId={setExpandedQuarterId}
        onLaunchRescan={onLaunchRescan}
      />
    </>
  );
}

