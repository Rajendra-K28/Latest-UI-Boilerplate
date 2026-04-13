import { Button, Download } from '../../components';
import { colors } from '../../design-system/tokens';
import { reportCardStyles } from './reportCardStyles';
import type { ReportCardConfig } from './types';

type ReportDownloadCardProps = {
  card: ReportCardConfig;
  onDownload: (reportId: string) => void;
};

export function ReportDownloadCard({ card, onDownload }: ReportDownloadCardProps) {
  return (
    <div
      style={reportCardStyles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.stroke.neutral.light;
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.stroke.neutral.soft;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={reportCardStyles.cardHeader}>
        <div style={reportCardStyles.iconWrapper(card.iconBg, card.iconColor)}>{card.icon}</div>
        <div style={reportCardStyles.titleRow}>
          <h3 style={reportCardStyles.title}>{card.title}</h3>
          <span style={reportCardStyles.formatBadge}>{card.format}</span>
        </div>
        <p style={reportCardStyles.description}>{card.description}</p>
      </div>
      <div style={reportCardStyles.buttonWrapper}>
        <Button
          label="Download report"
          icon={<Download />}
          iconPosition="left"
          variant="secondary"
          onClick={() => onDownload(card.id)}
        />
      </div>
    </div>
  );
}
