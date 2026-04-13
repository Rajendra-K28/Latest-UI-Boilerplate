import { Link } from 'react-router-dom';

export function TablesStyleGuide() {
  const tables = [
    {
      name: 'Active Projects Table',
      path: '/Style-Guide/active-projects-table',
      description: 'Progress tracking, compliance badges, empty + filled states',
    },
    {
      name: 'Defense Roadmap Table',
      path: '/Style-Guide/defense-roadmap-table',
      description: 'Filters, search, dropdown, pagination, actions menu',
    },
    {
      name: 'Projects Table',
      path: '/Style-Guide/projects-table',
      description: 'Owner cell, compliance, progress, status, actions',
    },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link
        to="/Style-Guide"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#6B7280',
          textDecoration: 'none',
          fontSize: '14px',
          marginBottom: '24px',
        }}
      >
        <span>←</span> Back to Style Guide
      </Link>

      <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '8px', color: '#111625' }}>
        Tables
      </h1>
      <p style={{ color: '#475467', fontSize: '16px', marginBottom: '24px' }}>
        Table components in the design system.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {tables.map((t) => (
          <Link key={t.path} to={t.path} style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '16px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                height: '100%',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#111625', marginBottom: '8px' }}>
                {t.name}
              </div>
              <div style={{ fontSize: '14px', color: '#596881', lineHeight: '20px' }}>{t.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

