/**
 * User Profile Page
 */

import { AuthContext } from '../auth/authContext';
import { OrgContext } from '../organization/orgContext';

export const Profile = () => {
  const user = AuthContext.getUser();
  const orgData = OrgContext.getOrganizationData();
  const role = OrgContext.getCurrentRole();

  return (
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '32px',
        color: '#111827'
      }}>
        User Profile
      </h1>

      {/* User Information */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#111827'
        }}>
          Personal Information
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              Full Name
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827'
            }}>
              {user?.name || 'N/A'}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              Email
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827'
            }}>
              {user?.email || 'N/A'}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              Username
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827'
            }}>
              {user?.preferredUsername || 'N/A'}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              User ID
            </label>
            <div style={{
              fontSize: '14px',
              color: '#6B7280',
              fontFamily: 'monospace'
            }}>
              {user?.userId || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Organization Information */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '24px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#111827'
        }}>
          Organization Information
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              Current Organization
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827'
            }}>
              {orgData?.name || 'N/A'}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              Role
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827',
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#DBEAFE',
              borderRadius: '12px',
              fontWeight: '500'
            }}>
              {role || 'User'}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              Organization ID
            </label>
            <div style={{
              fontSize: '14px',
              color: '#6B7280',
              fontFamily: 'monospace'
            }}>
              {orgData?._id || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
