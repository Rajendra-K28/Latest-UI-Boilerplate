import { Page } from '../../ui/page/Page';
import { ProjectReportsHeaderSection } from './ProjectReportsHeaderSection';
import { ReportsGridSection } from './ReportsGridSection';

export function ProjectReportsView() {
  const handleDownloadReport = (_reportId: string) => {
    // TODO: Implement report download
  };

  return (
    <Page>
      <ProjectReportsHeaderSection />
      <ReportsGridSection onDownloadReport={handleDownloadReport} />
    </Page>
  );
}
