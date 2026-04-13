import { useState } from 'react';
import { Button, UserPlus } from '../../components';
import type { ScanConfigurationSummary } from '../../sidebarViews/createProjectSidebarViews';
import { TeamInviteDrawer } from './TeamInviteDrawer';

type InviteTeamButtonProps = {
  selectedGroups: string[];
  scanSummary: ScanConfigurationSummary;
  /** Defaults to "Invite Team" (dashboard). */
  label?: string;
  /** Defaults to secondary (dashboard header). */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
};

export function InviteTeamButton({
  selectedGroups,
  scanSummary,
  label = 'Invite Team',
  variant = 'secondary',
}: InviteTeamButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        label={label}
        icon={<UserPlus />}
        iconPosition="left"
        variant={variant}
        size="md"
        onClick={() => setIsOpen(true)}
      />

      <TeamInviteDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedGroups={selectedGroups}
        scanSummary={scanSummary}
      />
    </>
  );
}
