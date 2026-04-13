import { TextInput, TextArea, Button } from '../../components';
import { colors, spacing } from '../../design-system/tokens';
import { GeneralSettingsIcon } from './icons';
import { projectSettingsStyles } from './projectSettingsStyles';

type GeneralSettingsSectionProps = {
  projectName: string;
  onProjectNameChange: (value: string) => void;
  projectKey: string;
  description: string;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
};

export function GeneralSettingsSection({
  projectName,
  onProjectNameChange,
  projectKey,
  description,
  onDescriptionChange,
  onSave,
}: GeneralSettingsSectionProps) {
  return (
    <div style={projectSettingsStyles.section}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: spacing[3],
          marginBottom: spacing[5],
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: '#EEF4FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GeneralSettingsIcon />
        </div>

        <div>
          <h3 style={projectSettingsStyles.sectionTitle}>General Settings</h3>
          <p style={projectSettingsStyles.sectionSubtitle}>
            Update your project name, key, and description.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[4],
        }}
      >
        <div style={projectSettingsStyles.formRow}>
          <label style={projectSettingsStyles.label}>Project Name</label>
          <TextInput value={projectName} onChange={onProjectNameChange} width="full" />
        </div>

        <div style={projectSettingsStyles.formRow}>
          <label style={projectSettingsStyles.label}>Project Key</label>
          <TextInput value={projectKey} onChange={() => {}} width="lg" disabled />
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: colors.text.neutral.sub,
            }}
          >
            This is a unique identifier for your project. It cannot be changed once set.
          </p>
        </div>

        <div style={projectSettingsStyles.formRow}>
          <label style={projectSettingsStyles.label}>Description</label>
          <TextArea
            value={description}
            onChange={onDescriptionChange}
            rows={3}
            width="lg"
            {...{ style: { resize: 'none' } }}
          />
        </div>

        <div style={{ marginTop: spacing[4], display: 'flex', justifyContent: 'flex-end' }}>
          <Button label="Save Changes" variant="primary" onClick={onSave} />
        </div>
      </div>
    </div>
  );
}
