import { useState } from 'react';
import { Page, PageHeader, PageSection } from '../ui/page/Page';
import { Button, Tag, ArrowUpRight, Users, CheckCircle, Database, Table, Checkbox, InvoiceActionMenu } from '../components';
import type { TableColumn } from '../components';
import { colors, spacing } from '../design-system/tokens';

type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  plan: string;
  status: 'paid' | 'pending' | 'overdue';
};

const sampleInvoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', date: '24 Dec 2024', amount: '$0.00', plan: 'Starter', status: 'paid' },
  { id: '2', invoiceNumber: 'INV-2024-001', date: '24 Dec 2024', amount: '$0.00', plan: 'Starter', status: 'paid' },
  { id: '3', invoiceNumber: 'INV-2024-001', date: '24 Dec 2024', amount: '$0.00', plan: 'Starter', status: 'paid' },
  { id: '4', invoiceNumber: 'INV-2024-001', date: '24 Dec 2024', amount: '$0.00', plan: 'Starter', status: 'paid' },
  { id: '5', invoiceNumber: 'INV-2024-001', date: '24 Dec 2024', amount: '$0.00', plan: '$0.00', status: 'paid' },
];

const styles = {
  cardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  planCard: {
    background: colors.bg.surface.default,
    border: `1px solid #EAECF0`,
    borderRadius: '12px',
    padding: spacing[4],
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[3],
  },
  cardLabel: {
    fontSize: '12px',
    fontWeight: '500' as const,
    color: '#98A2B3',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '0px',
  },
  planContentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing[6],
  },
  planLeftSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[2],
    flex: 1,
  },
  planHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  planTitle: {
    fontSize: '20px',
    fontWeight: '600' as const,
    color: '#101828',
    lineHeight: '28px',
  },
  description: {
    fontSize: '14px',
    color: '#667085',
    lineHeight: '20px',
  },
  planRightSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: spacing[1],
  },
  price: {
    fontSize: '48px',
    fontWeight: '600' as const,
    color: '#101828',
    lineHeight: '56px',
    letterSpacing: '-0.02em',
  },
  perMonth: {
    fontSize: '14px',
    color: '#667085',
    lineHeight: '20px',
  },
  paymentCard: {
    background: colors.bg.surface.default,
    border: `1px solid #EAECF0`,
    borderRadius: '12px',
    padding: spacing[4],
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[3],
  },
  paymentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing[4],
  },
  paymentHeaderLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[1],
  },
  paymentTitle: {
    fontSize: '16px',
    fontWeight: '600' as const,
    color: '#101828',
    lineHeight: '24px',
  },
  paymentSubtitle: {
    fontSize: '14px',
    color: '#667085',
    lineHeight: '20px',
  },
  paymentDetails: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[2],
  },
  paymentDetailsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },
  visaLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '32px',
    background: colors.bg.surface.default,
    borderRadius: '6px',
    border: `1px solid #EAECF0`,
    fontSize: '13px',
    fontWeight: '700' as const,
    color: '#1434CB',
    flexShrink: 0,
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  cardNumber: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#101828',
    lineHeight: '20px',
  },
  cardExpiry: {
    fontSize: '14px',
    color: '#667085',
    lineHeight: '20px',
  },
  cardEmail: {
    fontSize: '14px',
    color: '#667085',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: '4px',
  },
  emailIcon: {
    color: '#667085',
    flexShrink: 0,
  },
  usageCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  usageCard: {
    background: colors.bg.surface.default,
    border: `1px solid #EAECF0`,
    borderRadius: '12px',
    padding: spacing[4],
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[3],
  },
  usageHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  usageIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  usageValue: {
    fontSize: '30px',
    fontWeight: '600' as const,
    color: '#101828',
    lineHeight: '38px',
    letterSpacing: '-0.02em',
    flex: 1,
    textAlign: 'left' as const,
  },
  usageLabel: {
    fontSize: '14px',
    color: '#667085',
    lineHeight: '20px',
  },
  invoicesSection: {
    background: colors.bg.surface.default,
    border: `1px solid #EAECF0`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  invoicesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing[4],
    paddingBottom: spacing[4],
  },
  invoicesTitle: {
    fontSize: '18px',
    fontWeight: '600' as const,
    color: '#101828',
    lineHeight: '28px',
    marginBottom: spacing[1],
  },
  invoicesSubtitle: {
    fontSize: '14px',
    color: '#667085',
    lineHeight: '20px',
  },
  statusCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#12B76A',
    flexShrink: 0,
  },
  statusText: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#027A48',
    lineHeight: '20px',
  },
  actionButton: {
    background: 'transparent',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
    color: '#667085',
  },
};

export function OrganizationBillingView() {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const handleToggleInvoice = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleToggleAll = () => {
    if (selectedInvoices.length === sampleInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(sampleInvoices.map((inv) => inv.id));
    }
  };

  const allSelected = selectedInvoices.length === sampleInvoices.length && sampleInvoices.length > 0;

  // Define invoice table columns
  const invoiceColumns: TableColumn<Invoice>[] = [
    {
      key: 'checkbox',
      header: (
        <Checkbox
          checked={allSelected}
          onChange={handleToggleAll}
        />
      ),
      width: '48px',
      render: (invoice) => (
        <Checkbox
          checked={selectedInvoices.includes(invoice.id)}
          onChange={() => handleToggleInvoice(invoice.id)}
        />
      ),
    },
    {
      key: 'invoiceNumber',
      header: 'Invoice ID',
      width: '1fr',
      render: (invoice) => invoice.invoiceNumber,
    },
    {
      key: 'date',
      header: 'Date',
      width: '1fr',
      render: (invoice) => invoice.date,
    },
    {
      key: 'amount',
      header: 'Amount',
      width: '1fr',
      render: (invoice) => invoice.amount,
    },
    {
      key: 'plan',
      header: 'Plan',
      width: '1fr',
      render: (invoice) => invoice.plan,
    },
    {
      key: 'status',
      header: 'Status',
      width: '1fr',
      render: () => (
        <div style={styles.statusCell}>
          <span style={styles.statusDot} />
          <span style={styles.statusText}>Paid</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '100px',
      align: 'right',
      render: () => (
        <InvoiceActionMenu
          onView={() => {}}
          onDownload={() => {}}
        />
      ),
    },
  ];

  return (
    <Page>
      <PageHeader
        title="Billing & Plans"
        description="Track your subscription status, payment methods, and invoice history."
      />

      <PageSection>
        {/* Plan and Payment Cards */}
        <div style={styles.cardsRow}>
          {/* Current Plan Card */}
          <div style={styles.planCard}>
            <span style={styles.cardLabel}>Current plan</span>
            <div style={styles.planContentRow}>
              <div style={styles.planLeftSection}>
                <div style={styles.planHeader}>
                  <h3 style={styles.planTitle}>Starter plan</h3>
                  <Tag label="Monthly" variant="blue" size="sm" />
                </div>
                <p style={styles.description}>Our free tier plan for small teams.</p>
              </div>
              <div style={styles.planRightSection}>
                <span style={styles.price}>$0</span>
                <span style={styles.perMonth}>per month</span>
              </div>
            </div>
            <Button
              label="Upgrade plan"
              hierarchy="primary"
              size="md"
              icon={<ArrowUpRight />}
              iconConfig="right"
              onClick={() => {}}
            />
          </div>

          {/* Payment Method Card */}
          <div style={styles.paymentCard}>
            <div style={styles.paymentHeader}>
              <div style={styles.paymentHeaderLeft}>
                <h4 style={styles.paymentTitle}>Payment method</h4>
                <p style={styles.paymentSubtitle}>Change how you pay for your plan.</p>
              </div>
              <Button
                label="Change"
                hierarchy="secondary-white"
                size="sm"
                onClick={() => {}}
              />
            </div>
            <div style={styles.paymentDetails}>
              <div style={styles.paymentDetailsRow}>
                <div style={styles.visaLogo}>VISA</div>
                <div style={styles.cardInfo}>
                  <div style={styles.cardNumber}>Visa ending in 1234</div>
                  <div style={styles.cardExpiry}>Expiry 06/2028</div>
                </div>
              </div>
              <div style={styles.cardEmail}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={styles.emailIcon}>
                  <path
                    d="M2.66667 4L7.55733 7.42667C7.82667 7.61333 8.17333 7.61333 8.44267 7.42667L13.3333 4M3.33333 12H12.6667C13.403 12 14 11.403 14 10.6667V5.33333C14 4.59695 13.403 4 12.6667 4H3.33333C2.59695 4 2 4.59695 2 5.33333V10.6667C2 11.403 2.59695 12 3.33333 12Z"
                    stroke="currentColor"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                billing@acmeworks.com
              </div>
            </div>
          </div>
        </div>

        {/* Usage Cards */}
        <div style={styles.usageCards}>
          <div style={styles.usageCard}>
            <div style={styles.usageHeader}>
              <div style={styles.usageValue}>6/10</div>
              <div style={{ ...styles.usageIcon, background: '#EFF8FF', color: '#2E90FA' }}>
                <Users />
              </div>
            </div>
            <div style={styles.usageLabel}>Seats used</div>
          </div>

          <div style={styles.usageCard}>
            <div style={styles.usageHeader}>
              <div style={styles.usageValue}>8 / 10</div>
              <div style={{ ...styles.usageIcon, background: '#EFF8FF', color: '#2E90FA' }}>
                <CheckCircle />
              </div>
            </div>
            <div style={styles.usageLabel}>Active projects</div>
          </div>

          <div style={styles.usageCard}>
            <div style={styles.usageHeader}>
              <div style={styles.usageValue}>1.2GB/ 5GB</div>
              <div style={{ ...styles.usageIcon, background: '#ECFDF3', color: '#12B76A' }}>
                <Database />
              </div>
            </div>
            <div style={styles.usageLabel}>Evidence storage</div>
          </div>
        </div>

        {/* Invoices Section */}
        <div style={styles.invoicesSection}>
          <div style={styles.invoicesHeader}>
            <div>
              <h3 style={styles.invoicesTitle}>Invoices</h3>
              <p style={styles.invoicesSubtitle}>
                View and download your monthly subscription invoices.
              </p>
            </div>
            <Button
              label={
                selectedInvoices.length > 0
                  ? `Download ${selectedInvoices.length} invoice${selectedInvoices.length === 1 ? '' : 's'}`
                  : 'Download all'
              }
              hierarchy="secondary-white"
              size="sm"
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M14 10V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              iconConfig="left"
              onClick={() => {}}
            />
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <Table
              columns={invoiceColumns}
              data={sampleInvoices}
              keyExtractor={(invoice) => invoice.id}
            />
          </div>
        </div>
      </PageSection>
    </Page>
  );
}
