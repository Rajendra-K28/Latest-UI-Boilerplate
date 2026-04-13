import { SideDrawer, UserPlus } from '../../components';
import {
  TeamSetupView,
  type ScanConfigurationSummary,
} from '../../sidebarViews/createProjectSidebarViews';

export type TeamInviteDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedGroups: string[];
  scanSummary: ScanConfigurationSummary;
};

export function TeamInviteDrawer({
  isOpen,
  onClose,
  selectedGroups,
  scanSummary,
}: TeamInviteDrawerProps) {
  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Invite team members"
      icon={<UserPlus />}
      primaryButtonLabel="Send invites"
      secondaryButtonLabel="Cancel"
      onPrimaryClick={onClose}
      onSecondaryClick={onClose}
    >
      <TeamSetupView selectedGroups={selectedGroups} scanSummary={scanSummary} hideChrome />
    </SideDrawer>
  );
}
