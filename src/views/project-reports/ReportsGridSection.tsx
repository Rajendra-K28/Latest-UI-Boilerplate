import { PageGrid, PageSection } from '../../ui/page/Page';
import { spacing } from '../../design-system/tokens';
import { REPORT_CARDS } from './constants';
import { ReportDownloadCard } from './ReportDownloadCard';

type ReportsGridSectionProps = {
  onDownloadReport: (reportId: string) => void;
};

export function ReportsGridSection({ onDownloadReport }: ReportsGridSectionProps) {
  return (
    <PageSection>
      <PageGrid columns={4} gap={spacing[5]}>
        {REPORT_CARDS.map((card) => (
          <ReportDownloadCard key={card.id} card={card} onDownload={onDownloadReport} />
        ))}
      </PageGrid>
    </PageSection>
  );
}
