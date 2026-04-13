/**
 * RequireAuth Component - Route Protection
 * Ensures user is authenticated before rendering protected routes
 */

import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

export const RequireAuth = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // First check if already authenticated
      const alreadyAuth = AuthContext.isAuthenticated();
      
      if (alreadyAuth) {
        setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }

      // Not authenticated - initialize local auth session
      const authenticated = await AuthContext.ensureAuth();
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('Authentication check failed');
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div>Checking authentication...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Please wait</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to signin to initialize local session
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
};
