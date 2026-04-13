import React from 'react';
import { Tag, User, Clock } from '../../components';
import { colors, spacing } from '../../design-system/tokens';
import type { ExposureRecord, TimelineEvent } from './ExposureMonitorView';

type TagVariant = React.ComponentProps<typeof Tag>['variant'];

const tagVariantDotColorMap: Record<NonNullable<TagVariant>, string> = {
  red: '#F04438',
  yellow: '#F79009',
  blue: '#2E90FA',
  green: '#12B76A',
  gray: '#667085',
  purple: '#7F56D9',
};

const TagDot = ({ color }: { color: string }) => (
  <span
    style={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: color,
      flexShrink: 0,
    }}
  />
);

type ExposureDetailModalProps = {
  exposure: ExposureRecord;
  onClose: () => void;
  onOpenScanDetails: (exposure: ExposureRecord) => void;
};

const severityLabelMap: Record<ExposureRecord['severity'], string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const severityTagVariantMap: Record<ExposureRecord['severity'], TagVariant> = {
  critical: 'red',
  high: 'yellow',
  medium: 'blue',
  low: 'gray',
};

function getStatusVariant(status: string): TagVariant {
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

const AlertCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 7V10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="10" cy="13" r="0.9" fill="currentColor" />
  </svg>
);

const CvssIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 3.25L5.5 5.25V9.5C5.5 12.3 7.38 14.86 10 15.75C12.62 14.86 14.5 12.3 14.5 9.5V5.25L10 3.25Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 6.5V10.1L11.6 11.4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CycleIcon = () => (
  <svg width="25" height="25" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 5.5C6.1 4.4 7.5 3.75 9 3.75C11.7614 3.75 14 5.98858 14 8.75C14 11.5114 11.7614 13.75 9 13.75C7.433 13.75 6.03202 13.0182 5.0718 11.883"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 3V6H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ExposureDetailModal({
  exposure,
  onClose,
  onOpenScanDetails,
}: ExposureDetailModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        zIndex: 1200,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '960px',
          maxWidth: '96vw',
          height: '100vh',
          background: '#FFFFFF',
          borderRadius: 0,
          boxShadow: '0px 24px 48px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${colors.stroke.neutral.light}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: spacing[4],
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: 16, color: '#101828' }}>
                {exposure.id}
              </span>
              <Tag
                label={severityLabelMap[exposure.severity]}
                variant={severityTagVariantMap[exposure.severity]}
                size="sm"
                icon={
                  <TagDot
                    color={
                      tagVariantDotColorMap[severityTagVariantMap[exposure.severity] as NonNullable<TagVariant>]
                    }
                  />
                }
              />
              <Tag label={exposure.category} variant="purple" size="sm" />
              {(() => {
                const statusVariant = getStatusVariant(exposure.status);
                return (
                  <Tag
                    label={exposure.status}
                    variant={statusVariant}
                    size="sm"
                    icon={<TagDot color={tagVariantDotColorMap[statusVariant as NonNullable<TagVariant>]} />}
                  />
                );
              })()}
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#101828' }}>
              {exposure.vulnerability}
            </div>
            <div style={{ fontSize: 14, color: '#667085' }}>
              {exposure.asset} · {exposure.category}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              color: '#667085',
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            borderBottom: `1px solid ${colors.stroke.neutral.light}`,
            background: '#f9fafb',
          }}
        >
          {[
            {
              label: 'Remediation Cycles',
              value: exposure.remediationCycles,
              icon: <CycleIcon />,
            },
            {
              label: 'Avg MTTR',
              value: exposure.avgMttr,
              icon: (
                <span style={{ display: 'inline-flex', color: '#98A2B3' }}>
                  <Clock />
                </span>
              ),
            },
            {
              label: 'CVSS Score',
              value: exposure.cvss.toFixed(1),
              icon: <CvssIcon />,
            },
            {
              label: 'Recurrence Count',
              value: exposure.recurrenceCount,
              icon: <AlertCircleIcon />,
            },
          ].map((metric, index) => (
            <div
              key={metric.label}
              style={{
                padding: '14px 24px 16px 24px',
                borderLeft: index === 0 ? 'none' : `1px solid ${colors.stroke.neutral.light}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: '#667085',
                  justifyContent: 'center',
                }}
              >
                <span style={{ display: 'inline-flex', color: '#98A2B3' }}>{metric.icon}</span>
                <span>{metric.label}</span>
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#101828',
                }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#101828',
                marginBottom: 20,
              }}
            >
              Vulnerability fingerprint
            </div>
            <div
              style={{
                borderRadius: 12,
                border: `1px solid ${colors.stroke.neutral.light}`,
                overflow: 'hidden',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 13,
                }}
              >
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eaecf0' }}>
                    <td
                      style={{
                        width: 180,
                        padding: '10px 16px',
                        background: '#F9FAFB',
                        color: '#667085',
                      }}
                    >
                      Vulnerability ID
                    </td>
                    <td style={{ padding: '10px 16px', color: '#101828', background: '#f9fafb', lineHeight: '18px', fontFamily: 'Menlo', fontWeight: 400 }}>
                      {exposure.vulnerabilityId}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eaecf0' }}>
                    <td
                      style={{
                        width: 180,
                        padding: '10px 16px',
                        background: '#F9FAFB',
                        color: '#667085',
                      }}
                    >
                      Endpoint
                    </td>
                    <td style={{ padding: '10px 16px', color: '#101828', background: '#F9FAFB', lineHeight: '18px', fontFamily: 'Menlo', fontWeight: 400 }}>
                      {exposure.endpoint}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eaecf0' }}>
                    <td
                      style={{
                        width: 180,
                        padding: '10px 16px',
                        background: '#F9FAFB',
                        color: '#667085',
                      }}
                    >
                      Ports / Protocol
                    </td>
                    <td style={{ padding: '10px 16px', color: '#101828', background: '#F9FAFB', lineHeight: '18px', fontFamily: 'Menlo', fontWeight: 400 }}>
                      {exposure.portsProtocol}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: 180,
                        padding: '10px 16px',
                        background: '#F9FAFB',
                        color: '#667085',
                      }}
                    >
                      Scan IDs
                    </td>
                    <td style={{ padding: '10px 16px', color: '#101828', background: '#F9FAFB' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 8,
                        }}
                      >
                        {exposure.scanIds.map((id) => (
                          <button
                            key={id}
                            type="button"
                            style={{
                              padding: '6px 10px',
                              borderRadius: 6,
                              border: `1px solid #266df0`,
                              background: '#eff4ff',
                              fontSize: 11,
                              color: '#266DF0',
                              cursor: 'pointer',
                              fontFamily: 'Menlo',
                              fontWeight: 400,
                            }}
                          >
                            {id}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#101828',
                marginBottom: 20,
              }}
            >
              Lifecycle timeline
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {exposure.timeline.length === 0 ? (
                <div style={{ fontSize: 13, color: '#667085' }}>
                  No lifecycle events recorded yet for this exposure.
                </div>
              ) : (
                exposure.timeline.map((event, index) => {
                  const colorMap: Record<TimelineEvent['type'], string> = {
                    reopened: '#B42318',
                    closed: '#027A48',
                    'fix-implemented': '#155EEF',
                    detected: '#b42318',
                  };
                  const labelMap: Record<TimelineEvent['type'], string> = {
                    reopened: 'Reopened',
                    closed: 'Closed',
                    'fix-implemented': 'Fix implemented',
                    detected: 'Detected',
                  };
                  const color = colorMap[event.type];
                  const isRootCause =
                    event.type === 'detected' && index === exposure.timeline.length - 1;

                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          marginTop: 4,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: color,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color,
                            }}
                          >
                            {labelMap[event.type]}
                          </span>
                          {event.mttrLabel && (
                            <span
                              style={{
                                fontSize: 12,
                                color: '#667085',
                              }}
                            >
                              {event.mttrLabel}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 12,
                            color: '#667085',
                            marginBottom: 2,
                          }}
                        >
                          <span style={{ display: 'inline-flex', color: '#98A2B3' }}>
                            <User />
                          </span>
                          <span>
                            {event.actor}
                            {event.role && ` · ${event.role}`}
                          </span>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#D0D5DD' }} />
                          <span style={{ display: 'inline-flex', color: '#98A2B3' }}>
                            <Clock />
                          </span>
                          <span>{event.date}</span>
                        </div>
                        {event.description && !isRootCause && (
                          <div
                            style={{
                              fontSize: 13,
                              color: '#344054',
                            }}
                          >
                            {event.description}
                          </div>
                        )}
                        {event.description && isRootCause && (
                          <div
                            style={{
                              marginTop: 10,
                              padding: '10px 14px',
                              borderRadius: 8,
                              background: '#F9FAFB',
                              fontSize: 13,
                              color: '#344054',
                              border: `1px solid #EDF0F5`,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 11,
                                color: '#667085',
                                lineHeight: '16px',
                                marginBottom: 2,
                              }}
                            >
                              Root cause
                            </div>
                            <div>{event.description}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '12px 24px',
            borderTop: `1px solid ${colors.stroke.neutral.light}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12,
            color: '#667085',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Latest scan:</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 0px',
                borderRadius: 999,
                border: 'none',
                background: 'transparent',
                color: '#266DF0',
                fontSize: 12,
                fontWeight: 500,
                lineHeight: '18px',
                fontFamily: 'Menlo',
              }}
            >
              {exposure.latestScanId}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0px 16px',
                borderRadius: 8,
                border: `1px solid #D0D5DD`,
                background: '#FFFFFF',
                color: '#344054',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                height: 40,
              }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onOpenScanDetails(exposure)}
              style={{
                padding: '0px 16px',
                borderRadius: 8,
                border: `1px solid #266DF0`,
                background: '#FFFFFF',
                color: '#266DF0',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                height: 40,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  transform: 'translateY(0.5px)',
                  color: '#266DF0',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>View latest scan details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

