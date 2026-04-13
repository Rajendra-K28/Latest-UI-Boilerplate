import { useMemo, useState } from 'react';
import { SideDrawer } from '../../components';
import { colors } from '../../design-system/tokens';

export type RaiseDisputeFinding = {
  cve: string;
  finding: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvss: string;
};

type AsvRaiseDisputeDrawerProps = {
  isOpen: boolean;
  finding: RaiseDisputeFinding | null;
  onClose: () => void;
  drawerWidth?: string;
  overlayBackground?: string;
  zIndexBase?: number;
};

const DisputeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10.6667 10.6673L12.6667 5.33398L14.6667 10.6673C14.0867 11.1007 13.3867 11.334 12.6667 11.334C11.9467 11.334 11.2467 11.1007 10.6667 10.6673Z" stroke="#F04438" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.33325 10.6673L3.33325 5.33398L5.33325 10.6673C4.75325 11.1007 4.05325 11.334 3.33325 11.334C2.61325 11.334 1.91325 11.1007 1.33325 10.6673Z" stroke="#F04438" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.66675 14H11.3334" stroke="#F04438" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V14" stroke="#F04438" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 4.66732H3.33333C4.66667 4.66732 6.66667 4.00065 8 3.33398C9.33333 4.00065 11.3333 4.66732 12.6667 4.66732H14" stroke="#F04438" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function AsvRaiseDisputeDrawer({
  isOpen,
  finding,
  onClose,
  drawerWidth,
  overlayBackground,
  zIndexBase,
}: AsvRaiseDisputeDrawerProps) {
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeExplanation, setDisputeExplanation] = useState('');
  const [disputeFiles, setDisputeFiles] = useState<File[]>([]);

  const isDisputeSubmitDisabled = useMemo(
    () => !disputeReason.trim() || !disputeExplanation.trim(),
    [disputeReason, disputeExplanation]
  );

  const resetAndClose = () => {
    setDisputeReason('');
    setDisputeExplanation('');
    setDisputeFiles([]);
    onClose();
  };

  if (!finding) return null;

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={resetAndClose}
      width={drawerWidth}
      overlayBackground={overlayBackground}
      zIndexBase={zIndexBase}
      title="Raise Dispute"
      subtitle={`${finding.cve} · ${finding.finding}`}
      icon={
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: '#FEF1F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DisputeIcon />
        </div>
      }
      showPrimaryButton
      showSecondaryButton
      primaryButtonLabel="Submit Dispute"
      secondaryButtonLabel="Cancel"
      primaryButtonVariant="danger"
      primaryButtonStyle={
        isDisputeSubmitDisabled
          ? {
              backgroundColor: '#FECACA',
              borderColor: 'transparent',
              color: '#FFFFFF',
            }
          : undefined
      }
      primaryButtonDisabled={isDisputeSubmitDisabled}
      onPrimaryClick={() => {
        if (!isDisputeSubmitDisabled) {
          resetAndClose();
        }
      }}
      onSecondaryClick={resetAndClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #FEDF89',
            background: '#FFFAEB',
            fontSize: 12,
            color: '#B54708',
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              border: '2px solid #F79009',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 600,
              color: '#F79009',
              flexShrink: 0,
            }}
          >
            !
          </span>
          <span>
            Disputes are submitted to the ASV vendor for formal review. An accepted dispute can
            remove this finding from the quarter&apos;s compliance evaluation.
          </span>
        </div>

        <div
          style={{
            borderRadius: 12,
            border: '1px solid #EAECF0',
            background: '#FFFFFF',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                color: finding.severity === 'Critical' ? '#B42318' : '#B45309',
                background: finding.severity === 'Critical' ? '#FEF1F2' : '#FFF4E6',
              }}
            >
              {finding.severity}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 500,
                color: '#155EEF',
                background: '#EFF4FF',
              }}
            >
              CVSS {finding.cvss}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 500,
                color: '#B42318',
                background: '#FEF1F2',
              }}
            >
              ASV-Blocking
            </span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#101828' }}>
            {finding.finding}
          </div>
          <div style={{ fontSize: 12, color: '#667085' }}>{finding.cve}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: colors.text.neutral.main,
              }}
            >
              Dispute Reason <span style={{ color: '#F04438' }}>*</span>
            </label>
            <select
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: `1px solid ${colors.stroke.neutral.light}`,
                fontSize: 14,
                color: disputeReason ? colors.text.neutral.main : colors.text.neutral.sub,
                background: colors.bg.surface.default,
              }}
            >
              <option value="">Select a reason...</option>
              <option value="false-positive">False Positive — Vulnerability does not exist</option>
              <option value="already-patched">Already Patched — Fix has been applied</option>
              <option value="compensating-controls">Compensating Controls in Place</option>
              <option value="not-applicable">Not Applicable to Our Environment</option>
              <option value="scanner-error">Scanner Error or Misconfiguration</option>
              <option value="other">Other (please explain)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: colors.text.neutral.main,
              }}
            >
              Detailed Explanation <span style={{ color: '#F04438' }}>*</span>
            </label>
            <textarea
              placeholder="Explain why this finding should be disputed..."
              rows={5}
              maxLength={1000}
              value={disputeExplanation}
              onChange={(e) => setDisputeExplanation(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${colors.stroke.neutral.light}`,
                fontSize: 14,
                background: colors.bg.surface.default,
                color: '#111625',
                resize: 'none',
                fontFamily: 'Inter',
                letterSpacing: '-0.02px',
              }}
            />
            <div
              style={{
                alignSelf: 'flex-end',
                fontSize: 11,
                color: colors.text.neutral.sub,
              }}
            >
              {disputeExplanation.length}/1000 characters
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: colors.text.neutral.main,
              }}
            >
              Supporting Evidence <span style={{ color: colors.text.neutral.sub }}>(optional)</span>
            </label>
            <label
              style={{
                borderRadius: 12,
                border: `1px dashed ${colors.stroke.neutral.light}`,
                background: colors.bg.surface.gray,
                padding: '16px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: 13,
                color: colors.primary[600],
                cursor: 'pointer',
              }}
            >
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.xls,.xlsx,.csv,.pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  setDisputeFiles(files);
                }}
              />
              <span>Upload files</span>
            </label>
            {disputeFiles.length > 0 && (
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: colors.text.neutral.sub }}>
                {disputeFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
            <div style={{ fontSize: 11, color: colors.text.neutral.sub }}>
              Supported formats: .jpg, .jpeg, .png, .xls, .xlsx, .csv, .pdf, .doc, .docx
            </div>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}
