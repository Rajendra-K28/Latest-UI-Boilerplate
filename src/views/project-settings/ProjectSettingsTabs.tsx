import { projectSettingsStyles } from './projectSettingsStyles';
import type { ProjectSettingsTabId } from './types';

type ProjectSettingsTabsProps = {
  activeTab: ProjectSettingsTabId;
  onTabChange: (tab: ProjectSettingsTabId) => void;
};

export function ProjectSettingsTabs({ activeTab, onTabChange }: ProjectSettingsTabsProps) {
  return (
    <div style={projectSettingsStyles.tabs}>
      <button
        type="button"
        style={projectSettingsStyles.tab(activeTab === 'project-details')}
        onClick={() => onTabChange('project-details')}
      >
        Project details
      </button>
      <button
        type="button"
        style={projectSettingsStyles.tab(activeTab === 'team-members')}
        onClick={() => onTabChange('team-members')}
      >
        Team members
      </button>
    </div>
  );
}
