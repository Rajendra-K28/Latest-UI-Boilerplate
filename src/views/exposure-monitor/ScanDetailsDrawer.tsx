import React from 'react';
import { Activity, AlertTriangle, UploadArrow, FileText, Tag } from '../../components';
import { colors } from '../../design-system/tokens';
import type { ExposureRecord } from './ExposureMonitorView';

type ScanDetailsDrawerProps = {
  exposure: ExposureRecord;
  onClose: () => void;
};

function getStatusVariant(status: string): React.ComponentProps<typeof Tag>['variant'] {
  const normalized = status.toLowerCase();

  if (normalized === 'reopened' || normalized === 'rescan pending') {
    return 'red';
  }

  if (normalized === 'fix in progress' || normalized === 'detected') {
    return 'yellow';
  }

  if (normalized === 'fix implemented' || normalized === 'closed') {
    return 'green';
  }

  return 'gray';
}

export function ScanDetailsDrawer({ exposure, onClose }: ScanDetailsDrawerProps) {
  const priority =
    exposure.severity === 'critical'
      ? 'Critical'
      : exposure.severity === 'high'
      ? 'High'
      : exposure.severity === 'medium'
      ? 'Medium'
      : 'Low';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 1400,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '920px',
          maxWidth: '100vw',
          height: '100vh',
          background: '#FFFFFF',
          boxShadow: '-4px 0 24px rgba(15,23,42,0.18)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: `1px solid ${colors.stroke.neutral.light}`,
            background: '#FFFFFF',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: '#111827',
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: `1px solid ${colors.stroke.neutral.light}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#EEF2FF',
                color: '#4F46E5',
              }}
            >
              <Activity />
            </span>
            <span>Vulnerability details</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              borderRadius: 6,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#667085',
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            gap: 16,
            padding: 24,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: `1px solid ${colors.stroke.neutral.light}`,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: '#101828',
                      marginBottom: 4,
                    }}
                  >
                    {exposure.vulnerability}
                  </div>
                  <div style={{ fontSize: 13, color: '#667085' }}>
                    {exposure.asset} · {exposure.category}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      border: `1px solid ${colors.stroke.neutral.light}`,
                      fontSize: 12,
                      color: '#344054',
                      background: '#F9FAFB',
                    }}
                  >
                    {exposure.id}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: '#FEF3F2',
                        fontSize: 12,
                        color: '#B42318',
                        fontWeight: 600,
                      }}
                    >
                      {exposure.cvss.toFixed(1)}
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: '#FEF3F2',
                        fontSize: 12,
                        color: '#B42318',
                        fontWeight: 600,
                      }}
                    >
                      {exposure.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#667085',
                      marginBottom: 4,
                    }}
                  >
                    Vulnerability details
                  </div>
                  <div
                    style={{
                      padding: '8px 10px',
                      borderRadius: 999,
                      border: `1px solid ${colors.stroke.neutral.light}`,
                      fontSize: 13,
                      color: '#344054',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#12B76A',
                      }}
                    />
                    <span>Affected asset: {exposure.asset}</span>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    gap: 8,
                  }}
                >
                  <Tag
                    label={exposure.status}
                    variant={getStatusVariant(exposure.status)}
                    size="sm"
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr)',
                  rowGap: 16,
                }}
              >
                {[
                  {
                    title: 'Threat summary',
                    body:
                      'This vulnerability was detected on ' +
                      exposure.asset +
                      '. It may allow attackers to exploit weak cryptographic configuration and compromise sensitive data.',
                  },
                  {
                    title: 'Impact',
                    body:
                      'Successful exploitation could lead to unauthorized access, data exposure, or interruption of critical services on ' +
                      exposure.asset +
                      '.',
                  },
                  {
                    title: 'Solution',
                    body:
                      'Apply the latest security patches and hardening guidance for the affected component. Re-run the scan to validate that the issue has been remediated.',
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#101828',
                        marginBottom: 4,
                      }}
                    >
                      {section.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#344054',
                        lineHeight: '20px',
                      }}
                    >
                      {section.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: `1px solid ${colors.stroke.neutral.light}`,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#101828',
                  }}
                >
                  Remediation evidence
                </div>
                <button
                  type="button"
                  style={{
                    border: '1px solid #FDA29B',
                    background: '#FEF3F2',
                    borderRadius: 999,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#B42318',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                >
                  <AlertTriangle />
                  Raise dispute
                </button>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#667085',
                }}
              >
                Upload proof of remediation to close this vulnerability.
              </div>
              <button
                type="button"
                style={{
                  marginTop: 4,
                  borderRadius: 8,
                  border: `1px dashed ${colors.stroke.neutral.light}`,
                  background: '#F9FAFB',
                  padding: '10px 12px',
                  fontSize: 13,
                  color: '#266DF0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                }}
              >
                <UploadArrow />
                Upload remediation evidence
              </button>

              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {['fw-config-v3.pdf', 'fw-config-v2.pdf', 'fw-config-v1.pdf'].map(
                  (name, idx) => (
                    <div
                      key={name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: `1px solid ${colors.stroke.neutral.light}`,
                        background: '#FFFFFF',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: '#F9FAFB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FileText />
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: '#101828',
                            }}
                          >
                            {name}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: '#667085',
                            }}
                          >
                            2.4 MB · Added by Anita Kumar · 24 Jan 26
                          </div>
                          {idx === 2 && (
                            <div
                              style={{
                                fontSize: 12,
                                color: '#B42318',
                                marginTop: 4,
                              }}
                            >
                              Evidence does not demonstrate vulnerability fix.
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color:
                            idx === 2
                              ? '#B42318'
                              : idx === 0
                              ? '#F79009'
                              : '#667085',
                        }}
                      >
                        {idx === 0
                          ? 'Pending review'
                          : idx === 1
                          ? 'Pending review'
                          : 'Rejected'}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              width: 320,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: `1px solid ${colors.stroke.neutral.light}`,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Project management
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  fontSize: 12,
                  color: '#667085',
                }}
              >
                <div>
                  <div>Status</div>
                  <div style={{ marginTop: 4 }}>
                    <Tag
                      label={exposure.status}
                      variant={getStatusVariant(exposure.status)}
                      size="sm"
                    />
                  </div>
                </div>
                <div>
                  <div>Priority</div>
                  <div style={{ marginTop: 4 }}>
                    <Tag
                      label={priority}
                      variant={exposure.severity === 'critical' ? 'red' : 'yellow'}
                      size="sm"
                    />
                  </div>
                </div>
                <div>
                  <div>Assignee</div>
                  <div
                    style={{
                      marginTop: 4,
                      padding: '6px 10px',
                      borderRadius: 8,
                      border: `1px dashed ${colors.stroke.neutral.light}`,
                      color: '#98A2B3',
                    }}
                  >
                    Unassigned
                  </div>
                </div>
                <div>
                  <div>Due date</div>
                  <div
                    style={{
                      marginTop: 4,
                      padding: '6px 10px',
                      borderRadius: 8,
                      border: `1px solid ${colors.stroke.neutral.light}`,
                      fontSize: 12,
                      color: '#344054',
                    }}
                  >
                    Fri, Mar 6, 2026
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: `1px solid ${colors.stroke.neutral.light}`,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                Activity timeline
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  fontSize: 12,
                  color: '#344054',
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Anita R uploaded evidence
                  </div>
                  <div style={{ color: '#667085' }}>16 Jan 2025, 09:02 AM</div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Rajeev R assigned this vulnerability
                  </div>
                  <div style={{ color: '#667085' }}>15 Jan 2025, 09:01 AM</div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Rajeev R created the vulnerability
                  </div>
                  <div style={{ color: '#667085' }}>15 Jan 2025, 09:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

