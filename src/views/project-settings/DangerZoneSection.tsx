import { Button } from '../../components';
import { spacing } from '../../design-system/tokens';
import { DangerZoneTrashIcon, DeleteProjectButtonIcon } from './icons';

type DangerZoneSectionProps = {
  onDeleteClick: () => void;
};

export function DangerZoneSection({ onDeleteClick }: DangerZoneSectionProps) {
  return (
    <div
      style={{
        marginTop: spacing[6],
        borderRadius: 12,
        border: '1px solid #FEE4E2',
        background: '#FFFFFF',
        padding: spacing[5],
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            color: '#B42318',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: '#FEF3F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DangerZoneTrashIcon />
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#B42318',
              }}
            >
              Danger Zone
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#B42318',
                opacity: 0.9,
              }}
            >
              Irreversible and destructive actions
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: spacing[3],
            border: '1px solid #FEE4E2',
            borderRadius: 8,
            padding: spacing[4],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing[4],
            flexWrap: 'wrap',
            background: '#FFFBFA',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#101828',
                marginBottom: 2,
              }}
            >
              Delete this project
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#667085',
                maxWidth: 420,
              }}
            >
              Once you delete a project, there is no going back. Please be certain.
            </div>
          </div>

          <Button
            label="Delete Project"
            variant="danger"
            iconPosition="left"
            onClick={onDeleteClick}
            icon={<DeleteProjectButtonIcon />}
          />
        </div>
      </div>
    </div>
  );
}
