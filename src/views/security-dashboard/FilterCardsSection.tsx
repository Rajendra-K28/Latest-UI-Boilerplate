import { PageSection, PageGrid } from '../../ui/page/Page';
import { FilterCard } from '../../components/card/filter-card/FilterCard';
import { spacing } from '../../design-system/tokens';
import type { FilterCardVariant } from '../../components/card/filter-card/FilterCard.types';

type FilterCardConfig = {
  icon: React.ReactNode;
  value: string;
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showAccentBar?: boolean;
  footer?: React.ReactNode;
};

type FilterCardsSectionProps = {
  cards: FilterCardConfig[];
};

export function FilterCardsSection({ cards }: FilterCardsSectionProps) {
  return (
    <PageSection>
      <PageGrid columns={4} gap={spacing[4]}>
        {cards.map((card, index) => (
          <FilterCard
            key={index}
            icon={card.icon}
            value={card.value}
            label={card.label}
            variant={card.variant as any}
            showAccentBar={card.showAccentBar}
            footer={card.footer}
            onClick={() => {}}
          />
        ))}
      </PageGrid>
    </PageSection>
  );
}

