import { PageHeader } from '../../ui/page/Page';
import { Button, Plus, Play } from '../../components';
import { spacing } from '../../design-system/tokens';

type HeaderProps = {
  onAddAsset: () => void;
  onLaunchScan: () => void;
};

export function Header({ onAddAsset, onLaunchScan }: HeaderProps) {
  return (
    <PageHeader
      title="Security Dashboard"
      description="Overview of all compliance projects and upcoming milestones."
      actions={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[3],
          }}
        >
          <Button
            label="Add Asset"
            icon={<Plus />}
            iconPosition="left"
            hierarchy="secondary-white"
            size="md"
            style={{
              display: 'flex',
              padding: '10px 15.023px 7.5px 15px',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '6px',
              borderRadius: '8px',
              border: '1px solid #D0D5DD',
              background: '#FFF',
              boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
              color: '#344054',
              fontFamily:
                'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '19.5px',
              cursor: 'pointer',
            }}
            onClick={onAddAsset}
          />
          <Button
            label="Launch Scan"
            icon={<Play />}
            iconPosition="left"
            variant="primary"
            size="md"
            style={{ cursor: 'pointer' }}
            onClick={onLaunchScan}
          />
        </div>
      }
    />
  );
}

