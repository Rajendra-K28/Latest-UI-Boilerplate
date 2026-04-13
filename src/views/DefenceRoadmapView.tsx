import { useState } from 'react';
import { Page, PageHeader, PageSection } from '../ui/page/Page';
import { DefenseRoadmapTable } from '../components';
import type { RoadmapActivity } from '../components';
import { Button, Plus } from '../components';

// Generate 50 dummy activities for pagination testing
const generateDummyActivities = (): RoadmapActivity[] => {
  const activities: RoadmapActivity[] = [];
  const activityTypes = [
    'Upload Evidence for Requirement v3.1',
    'Review Security Controls Documentation',
    'Complete Network Security Assessment',
    'Conduct Vulnerability Scan',
    'Update Firewall Configuration',
    'Perform Access Control Review',
    'Submit Compliance Report',
    'Complete Risk Assessment',
    'Review Audit Findings',
    'Update Security Policies',
  ];
  const projects = [
    'PCI DSS - Q4 Audit 2025',
    'Enterprise-wide Access Control Policy',
    'SOC 2 Type II Observation Engineering',
    'Annual GDPR Data Mapping Accreditation',
    'HIPAA Security Rule Risk Assessment',
    'ISO 27001 Certification',
    'Vendor Security Assessment Q1',
    'Data Privacy Impact Assessment',
  ];
  const statuses: Array<'overdue' | 'in-progress' | 'scheduled' | 'completed'> = ['overdue', 'in-progress', 'scheduled', 'completed'];
  
  for (let i = 1; i <= 50; i++) {
    const dayOffset = Math.floor(i / 2);
    const month = 'Dec';
    const day = 20 + (dayOffset % 10);
    
    activities.push({
      id: `${i}`,
      date: `${day} ${month} 2025`,
      activity: activityTypes[i % activityTypes.length],
      projectName: projects[i % projects.length],
      status: statuses[i % statuses.length],
    });
  }
  
  return activities;
};

const sampleActivities: RoadmapActivity[] = generateDummyActivities();

export function DefenceRoadmapView() {
  const [currentFilter, setCurrentFilter] = useState<
    'all' | 'overdue' | 'in-progress' | 'scheduled'
  >('all');
  const [searchValue, setSearchValue] = useState('');
  const [selectedProject, setSelectedProject] = useState('All projects');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  return (
    <Page>
      <PageHeader
        title="Defence Roadmap"
        description="Track compliance activities across all projects"
        actions={
          <Button
            label="New Milestone"
            icon={<Plus />}
            iconPosition="left"
            variant="primary"
            onClick={() => {}}
          />
        }
      />

      <PageSection>
        <DefenseRoadmapTable
          activities={sampleActivities}
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedProject={selectedProject}
          onProjectChange={setSelectedProject}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </PageSection>
    </Page>
  );
}
