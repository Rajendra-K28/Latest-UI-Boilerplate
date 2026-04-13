import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContext } from './auth/authContext'

/**
 * Bootstrap authentication before rendering the app
 */
async function bootstrapAuth() {
  try {
    console.log('🔐 Initializing authentication...');
    const authenticated = await AuthContext.initAuth();

    if (!authenticated) {
      console.log('❌ Not authenticated - redirect will occur');
      return false;
    }

    console.log('✅ Authentication successful');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed:', error);
    return false;
  }
}

/**
 * Main bootstrap function
 */
async function bootstrap() {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('❌ Root element not found!');
    return;
  }

  try {
    // Initialize authentication first
    await bootstrapAuth();

    // Render app
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );

    console.log('✅ Application rendered successfully');
  } catch (error) {
    console.error('❌ Bootstrap failed:', error);
    
    // Render error state
    createRoot(rootElement).render(
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '20px'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e53e3e' }}>
          Application Error
        </div>
        <div style={{ fontSize: '16px', color: '#4a5568' }}>
          Failed to initialize application
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }
}

// Start bootstrap
bootstrap();
