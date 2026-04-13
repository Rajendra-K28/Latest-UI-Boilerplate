import { PageSection } from '../../ui/page/Page';
import { ArrowUpRight, Calendar, ChevronRight } from '../../components';
import { spacing, colors } from '../../design-system/tokens';

type UpcomingScheduleItem = {
  id: string;
  name: string;
  date: string;
  assets: string;
  type: { label: string; bg: string; color: string };
};

type UpcomingScheduleSectionProps = {
  items: UpcomingScheduleItem[];
  onViewAll: () => void;
};

const upcomingScheduleStyles = {
  headerRow: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: spacing[3],
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: spacing[2],
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: colors.text.neutral.main,
    margin: 0,
  },
  upcomingScheduleContainer: {
    padding: '0px 0px 20px 0px',
  },
  scheduledBadge: {
    fontSize: '11px',
    color: colors.text.neutral.sub,
    borderRadius: 12,
    background: '#F2F4F7',
    padding: '2.5px 7.844px 1px 8px',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '19.5px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedulesLink: {
    display: 'inline-flex',
    alignItems: 'center' as const,
    gap: 6,
    border: 'none',
    background: 'transparent',
    padding: 0,
    cursor: 'pointer',
    color: colors.primary[600],
    fontSize: '13px',
    fontWeight: 600,
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: spacing[3],
  },
  card: {
    background: colors.bg.surface.default,
    borderRadius: '16px',
    border: `1px solid ${colors.stroke.neutral.soft}`,
    padding: '16px 18px 16px 18px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
  },
  cardTopRow: {
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  typePill: (bg: string, color: string) => ({
    display: 'inline-flex',
    alignItems: 'center' as const,
    padding: '4px 10px',
    borderRadius: '4px',
    background: bg,
    color,
    fontSize: '11px',
    fontWeight: 500,
  }),
  chevronIcon: {
    width: 20,
    height: 20,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    color: colors.text.neutral.soft,
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.text.neutral.main,
    margin: 0,
  },
  cardMetaRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 8,
    fontSize: '12px',
    color: colors.text.neutral.sub,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 4,
    background: '#D0D5DD',
  },
} as const;

export function UpcomingScheduleSection({
  items,
  onViewAll,
}: UpcomingScheduleSectionProps) {
  return (
    <PageSection>
      <div style={upcomingScheduleStyles.upcomingScheduleContainer}>
        <div style={upcomingScheduleStyles.headerRow}>
          <div style={upcomingScheduleStyles.headerLeft}>
            <h2 style={upcomingScheduleStyles.sectionTitle}>Upcoming Schedule</h2>
            <span style={upcomingScheduleStyles.scheduledBadge}>{items.length} scheduled</span>
          </div>
          <button
            type="button"
            style={upcomingScheduleStyles.schedulesLink}
            onClick={onViewAll}
          >
            <span>View All Schedules</span>
            <ArrowUpRight />
          </button>
        </div>

        <div style={upcomingScheduleStyles.cardGrid}>
          {items.map((item) => (
            <div key={item.id} style={upcomingScheduleStyles.card}>
              <div style={upcomingScheduleStyles.cardTopRow}>
                <span
                  style={upcomingScheduleStyles.typePill(
                    item.type.bg,
                    item.type.color,
                  )}
                >
                  {item.type.label}
                </span>
                <div style={upcomingScheduleStyles.chevronIcon}>
                  <a href="#">
                    <ChevronRight />
                  </a>
                </div>
              </div>
              <h3 style={upcomingScheduleStyles.cardTitle}>{item.name}</h3>
              <div style={upcomingScheduleStyles.cardMetaRow}>
                <Calendar />
                <span>{item.date}</span>
                <span style={upcomingScheduleStyles.metaDot} />
                <span>{item.assets}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

