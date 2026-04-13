/**
 * Organization Onboarding Modal
 * Allows user to create their first organization
 */

import { useState } from 'react';
import { apiService } from '../../api/api.service';

interface OrgOnboardingModalProps {
  onComplete: () => void;
  userEmail?: string;
}

const EMPLOYEE_OPTIONS = [
  { value: '', label: 'Select company size' },
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' },
];

export function OrgOnboardingModal({
  onComplete,
  userEmail,
}: OrgOnboardingModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: userEmail ?? '',
    employeeCount: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const email = formData.email || userEmail || '';
    
    if (!formData.companyName || !email || !formData.employeeCount) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await apiService.post('/api/companies/setup', {
        name: formData.companyName,
        email,
        size: formData.employeeCount,
        country: 'India',
      });
      
      console.log('Organization created successfully!');
      onComplete();
    } catch (err: unknown) {
      const message = (err as any)?.data?.message || 'Failed to create organization';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
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
        maxWidth: '500px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          padding: '32px 24px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            height: '64px',
            width: '64px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginBottom: '16px'
          }}>
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Create Your Organization
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Let's get started by setting up your organization profile
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#991b1b',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Company Name */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="company-name" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151'
            }}>
              Company Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              id="company-name"
              type="text"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, companyName: e.target.value }))
              }
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
              required
            />
          </div>

          {/* Email (read-only if provided) */}
          {userEmail && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151'
              }}>
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                disabled
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#6b7280'
                }}
              />
            </div>
          )}

          {/* Company Size */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="employee-count" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151'
            }}>
              Company Size <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              id="employee-count"
              value={formData.employeeCount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, employeeCount: e.target.value }))
              }
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
              required
            >
              {EMPLOYEE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginBottom: '16px'
            }}
          >
            {isSubmitting ? 'Creating...' : 'Create Organization'}
          </button>

          {/* Terms Note */}
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            By creating an organization, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
}
