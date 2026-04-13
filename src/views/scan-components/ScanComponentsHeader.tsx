import { PageHeader } from '../../ui/page';
import { Button, Plus } from '../../components';

type ScanComponentsHeaderProps = {
  onOpenAddAssetDrawer: () => void;
};

export function ScanComponentsHeader({ onOpenAddAssetDrawer }: ScanComponentsHeaderProps) {
  return (
    <PageHeader
      title="Scan Components"
      description="Monitor asset-level scan coverage, status, and vulnerabilities."
      actions={
        <Button
          label="Add Asset"
          icon={<Plus />}
          iconPosition="left"
          hierarchy="secondary-white"
          size="md"
          style={{
            display: 'flex',
            padding: '10px 15px 8px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            borderRadius: '8px',
            border: '1px solid #D0D5DD',
            background: '#FFF',
            boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
            color: '#344054',
            fontFamily:
              'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            lineHeight: '19.5px',
            cursor: 'pointer',
          }}
          onClick={onOpenAddAssetDrawer}
        />
      }
    />
  );
}

