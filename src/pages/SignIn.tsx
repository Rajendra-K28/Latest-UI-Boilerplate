/**
 * Sign In Page
 * Initializes local auth session
 */

import { useEffect } from 'react';
import { AuthContext } from '../auth/authContext';

export const SignIn = () => {
  useEffect(() => {
    // Initialize session and continue in-app
    AuthContext.login();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px'
    }}>
      <div>Signing you in...</div>
    </div>
  );
};
