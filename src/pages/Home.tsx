import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div style={{ 
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '12px', color: 'white' }}>
          Tribal React TypeScript App
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: '1.6' }}>
          Welcome! This application is built with a comprehensive design system. 
          Explore our component library and style guide below.
        </p>
      </div>
      
      <Link 
        to="/Style-Guide"
        style={{ textDecoration: 'none' }}
      >
        <div style={{
          padding: '32px',
          background: 'linear-gradient(135deg, #266DF0 0%, #1557D0 100%)',
          borderRadius: '16px',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(38, 109, 240, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          <div style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: 'white' }}>
            📚 Design System Style Guide
          </div>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, color: 'white' }}>
            Explore all components, patterns, and guidelines
          </p>
          <div style={{ 
            marginTop: '16px',
            fontSize: '14px',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white'
          }}>
            View Style Guide <span>→</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
