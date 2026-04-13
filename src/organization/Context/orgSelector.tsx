import { useState } from 'react';
import type { Organization } from '../../types/organization.types';

interface OrgSelectorProps {
  organizations: Organization[];
  currentOrgId?: string | null;
  userEmail: string;
  onSelectOrganization: (orgId: string) => Promise<void>;
  onCreateNew: () => void;
  onClose?: () => void;
}

export function OrgSelector({
  organizations,
  currentOrgId,
  userEmail,
  onSelectOrganization,
  onCreateNew,
  onClose,
}: OrgSelectorProps) {
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(
    currentOrgId ?? null,
  );
  const [loading, setLoading] = useState(false);

  const handleSelect = async (orgId: string) => {
    if (orgId === selectedOrgId || loading) return;
    setLoading(true);
    setSelectedOrgId(orgId);
    await onSelectOrganization(orgId);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{
          position: 'relative',
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          padding: '24px',
          color: 'white'
        }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                right: '16px',
                top: '16px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                fontSize: '20px',
                color: 'white'
              }}
            >
              ×
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              height: '48px',
              width: '48px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Select Organization</h2>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>{userEmail}</p>
            </div>
          </div>
        </div>

        <div style={{
          maxHeight: 'calc(90vh - 180px)',
          overflowY: 'auto',
          padding: '24px'
        }}>
          {organizations.length === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <div style={{
                margin: '0 auto 16px',
                display: 'flex',
                height: '64px',
                width: '64px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6'
              }}>
                <svg width="32" height="32" fill="#9ca3af" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>No Organizations</h3>
              <p style={{ marginBottom: '24px', color: '#6b7280' }}>
                Create your first organization to continue.
              </p>
              <button
                onClick={onCreateNew}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                + Create Organization
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {organizations.map((org) => (
                <button
                  key={org._id}
                  onClick={() => handleSelect(org._id)}
                  disabled={loading}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: selectedOrgId === org._id ? '2px solid #2563eb' : '2px solid #e5e7eb',
                    padding: '16px',
                    textAlign: 'left',
                    backgroundColor: selectedOrgId === org._id ? '#eff6ff' : 'white',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      display: 'flex',
                      height: '56px',
                      width: '56px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                      color: 'white'
                    }}>
                      {org.imageUrl ? (
                        <img
                          src={org.imageUrl}
                          style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: '12px',
                            objectFit: 'cover'
                          }}
                          alt=""
                        />
                      ) : (
                        <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600 }}>{org.name}</span>
                        {org.isPrimary && (
                          <span style={{
                            borderRadius: '4px',
                            backgroundColor: '#d1fae5',
                            padding: '2px 8px',
                            fontSize: '12px',
                            color: '#065f46'
                          }}>
                            Owner
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>{org.role}</p>
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      color: selectedOrgId === org._id ? '#2563eb' : '#9ca3af'
                    }}>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </button>
              ))}

              <button
                onClick={onCreateNew}
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  border: '2px dashed #d1d5db',
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    display: 'flex',
                    height: '56px',
                    width: '56px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    backgroundColor: '#f3f4f6'
                  }}>
                    <svg width="28" height="28" fill="#9ca3af" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Create Organization</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      Set up a new workspace
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
