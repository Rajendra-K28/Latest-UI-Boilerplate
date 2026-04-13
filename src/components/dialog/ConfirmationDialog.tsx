import { colors, spacing } from '../../design-system/tokens';
import { Button } from '../button/button';
import { Warning, Danger, Info } from '../icons';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  dialog: {
    background: colors.bg.surface.default,
    borderRadius: '12px',
    boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
    width: '400px',
    maxWidth: '90vw',
    overflow: 'hidden',
  },
  iconContainer: (variant: 'danger' | 'warning' | 'info') => ({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
    background: variant === 'danger' 
      ? '#FEE4E2' 
      : variant === 'warning' 
      ? '#FEF0C7' 
      : '#D1FADF',
    color: variant === 'danger' 
      ? '#D92D20' 
      : variant === 'warning' 
      ? '#DC6803' 
      : '#039855',
  }),
  content: {
    padding: spacing[6],
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: colors.text.neutral.main,
    marginBottom: spacing[2],
    lineHeight: '28px',
  },
  message: {
    fontSize: '14px',
    color: colors.text.neutral.sub,
    lineHeight: '20px',
    marginBottom: spacing[6],
  },
  actions: {
    display: 'flex',
    gap: spacing[3],
    width: '100%',
  },
  actionButton: {
    flex: 1,
    display: 'flex',
  } as const,
};

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'warning',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <Danger />;
      case 'warning':
        return <Warning />;
      case 'info':
        return <Info />;
      default:
        return <Warning />;
    }
  };

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={styles.content}>
          <div style={styles.iconContainer(variant)}>
            {getIcon()}
          </div>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.message}>{message}</p>
          <div style={styles.actions}>
            <div style={styles.actionButton}>
              <Button
                label={cancelLabel}
                variant="secondary"
                onClick={onCancel}
                style={{ width: '100%' }}
              />
            </div>
            <div style={styles.actionButton}>
              <Button
                label={confirmLabel}
                variant="primary"
                onClick={onConfirm}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
