import type { ScanConfigurationSummary } from '../../sidebarViews/createProjectSidebarViews';
import { projectDetailStyles } from './projectDetailStyles';
import { InviteTeamButton } from './InviteTeamButton';
import { LaunchScanButton } from './LaunchScanButton';

type ProjectDashboardHeaderSectionProps = {
  projectName: string;
  projectId?: string;
  teamMembers: string[];
  selectedGroups: string[];
  scanSummary: ScanConfigurationSummary;
};

export function ProjectDashboardHeaderSection({
  projectName,
  projectId,
  teamMembers,
  selectedGroups,
  scanSummary,
}: ProjectDashboardHeaderSectionProps) {
  const avatarThemes = [
    { bg: '#E9F0FE', fg: '#1D4ED8' },
    { bg: '#ECFDF3', fg: '#027A48' },
    { bg: '#FEF2F2', fg: '#B91C1C' },
    { bg: '#FFF7ED', fg: '#B45309' },
  ];

  return (
    <div style={projectDetailStyles.projectHeader}>
      <div style={projectDetailStyles.projectHeaderLeft}>
        <h1 style={projectDetailStyles.projectTitle}>{projectName}</h1>
        <p style={projectDetailStyles.projectMeta}>
          PCI Certification date: Mar 15, 2025 &nbsp; · &nbsp; License ends: Mar 14, 2026
        </p>
      </div>

      <div style={projectDetailStyles.teamSection}>
        <div style={projectDetailStyles.teamMembersContainer}>
          {teamMembers.map((member, i) => (
            <div
              key={i}
              style={{
                ...projectDetailStyles.avatar,
                ...(i === 0 ? projectDetailStyles.firstAvatar : {}),
                background: avatarThemes[i % avatarThemes.length]?.bg,
                color: avatarThemes[i % avatarThemes.length]?.fg,
              }}
            >
              {member?.trim()?.[0]?.toUpperCase() ?? '?'}
            </div>
          ))}
          <div style={projectDetailStyles.moreCount}>+3</div>
        </div>

        <InviteTeamButton selectedGroups={selectedGroups} scanSummary={scanSummary} />
        <LaunchScanButton projectName={projectName} projectId={projectId} />
      </div>
    </div>
  );
}

