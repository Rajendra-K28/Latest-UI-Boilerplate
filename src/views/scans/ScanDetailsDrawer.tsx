import { Button, Shield, Calendar, Clock } from '../../components';
import type { ScanRecord } from '../ScansView';

type ScanDetailsDrawerProps = {
  scan: ScanRecord;
  onClose: () => void;
  onRescan: (scan: ScanRecord) => void;
  onDownloadReport: (scan: ScanRecord) => void;
};

export function ScanDetailsDrawer({
  scan,
  onClose,
  onRescan,
  onDownloadReport,
}: ScanDetailsDrawerProps) {
  const isScheduled = scan.status === 'scheduled';
  const isFailed = scan.status === 'failed';
  const isQuarterPass =
    !isScheduled &&
    !isFailed &&
    scan.status === 'completed' &&
    scan.schedule.startsWith('Q4');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.45)',
        zIndex: 1400,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '60vw',
          maxWidth: 960,
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
            padding: '18px 24px 12px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                background: '#E0EAFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4F46E5',
                flexShrink: 0,
              }}
            >
              <Shield />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: '#EEF4FF',
                    color: '#4F46E5',
                    fontWeight: 500,
                  }}
                >
                  {scan.projectType}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: '#EFF6FF',
                    color: '#2563EB',
                    fontWeight: 500,
                  }}
                >
                  Full Scan
                </span>
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                {scan.scanName}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#667085',
                }}
              >
                {scan.projectName}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              borderRadius: 999,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#667085',
              fontSize: 20,
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            padding: '18px 24px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {isScheduled ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  borderRadius: 6,
                  background: '#FFFAEB',
                  border: '1px solid #FEDF89',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: '#B54708',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#FDB022',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    !
                  </span>
                  <span>Scheduled</span>
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    color: '#B54708',
                  }}
                >
                  {scan.id}
                </span>
              </div>
            </div>
          ) : isFailed ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  borderRadius: 6,
                  background: '#FEF3F2',
                  border: '1px solid #FECDCA',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: '#B42318',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#F97066',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    ×
                  </span>
                  <span>Failed</span>
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    color: '#B42318',
                  }}
                >
                  {scan.id}
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  borderRadius: 6,
                  background: '#ECFDF3',
                  border: '1px solid #A6F4C5',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: '#027A48',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#12B76A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  <span>Completed</span>
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    color: '#039855',
                  }}
                >
                  {scan.id}
                </span>
              </div>
              <div
                style={{
                  borderRadius: 6,
                  background: isQuarterPass ? '#ECFDF3' : '#FEF3F2',
                  border: isQuarterPass ? '1px solid #A6F4C5' : '1px solid #FECDCA',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: isQuarterPass ? '#027A48' : '#B42318',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: isQuarterPass ? '#12B76A' : '#F97066',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {isQuarterPass ? '✓' : '×'}
                  </span>
                  <span>{isQuarterPass ? 'Quarter PASS' : 'Quarter FAIL'}</span>
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: isQuarterPass ? '#039855' : '#B42318',
                  }}
                >
                  {scan.schedule}
                </span>
              </div>
            </div>
          )}

          <div
            style={{
              borderRadius: 12,
              background: '#FFFFFF',
              padding: 20,
              border: '1px solid #E5E7EB',
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: '#98A2B3',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                marginBottom: 12,
              }}
            >
              Scan details
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                rowGap: 16,
                columnGap: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#98A2B3',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: '#D0D5DD' }}>
                    <Calendar />
                  </span>
                  <span>Start date</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#111827',
                  }}
                >
                  {scan.startTime.split('·')[0].trim()}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#98A2B3',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: '#D0D5DD' }}>
                    <Clock />
                  </span>
                  <span>Start time</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#111827',
                  }}
                >
                  {scan.startTime.split('·')[1]?.trim() ?? ''}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#98A2B3',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: '#D0D5DD' }}>
                    <Clock />
                  </span>
                  <span>Duration</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#111827',
                  }}
                >
                  {isFailed ? '15 min' : '1h 45min'}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#98A2B3',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9CA3AF',
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        border: '1px solid currentColor',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'currentColor',
                        }}
                      />
                    </span>
                  </span>
                  <span>Target assets</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#111827',
                  }}
                >
                  {isFailed ? '22 assets' : isScheduled ? '8 assets' : '15 assets'}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#98A2B3',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: '#D0D5DD' }}>
                    <Calendar />
                  </span>
                  <span>{isScheduled || isFailed ? 'Frequency' : 'Quarter'}</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#111827',
                  }}
                >
                  {scan.schedule}
                </div>
              </div>
            </div>
          </div>

          {isScheduled ? (
            <div
              style={{
                marginTop: 16,
                borderRadius: 12,
                background: '#FFFAEB',
                border: '1px solid #FEDF89',
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#FDB022',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ⏱
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#B54708',
                  }}
                >
                  Scan scheduled for {scan.startTime.split('·')[0].trim()}{' '}
                  {scan.startTime.split('·')[1]?.trim() ?? ''}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#B54708',
                  }}
                >
                  This scan will run automatically. You&apos;ll receive a notification when it
                  starts and completes.
                </div>
              </div>
            </div>
          ) : isFailed ? (
            <div
              style={{
                marginTop: 16,
                borderRadius: 12,
                background: '#FEF3F2',
                border: '1px solid #FECDCA',
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#F97066',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                !
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#B42318',
                  }}
                >
                  Scan failed after 15 minutes
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#B42318',
                  }}
                >
                  Connection timeout — scanner could not reach 8 of 22 target assets.
                  Verify whitelisted IPs and firewall rules before retrying.
                </div>
              </div>
            </div>
          ) : isQuarterPass ? (
            <div
              style={{
                marginTop: 16,
                borderRadius: 12,
                background: '#ECFDF3',
                border: '1px solid #A6F4C5',
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#12B76A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#027A48',
                  }}
                >
                  No vulnerabilities found
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#16A34A',
                  }}
                >
                  All scanned assets passed compliance checks
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                paddingTop: 16,
                paddingBottom: 8,
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#98A2B3',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  marginBottom: 10,
                }}
              >
                Vulnerability findings
              </div>
              {[
                  { label: 'Critical', color: '#F04438', value: 2 },
                  { label: 'High', color: '#F79009', value: 5 },
                  { label: 'Medium', color: '#FDB022', value: 12 },
                  { label: 'Low', color: '#2563EB', value: 8 },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr 24px',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 8,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: '#475467' }}>{row.label}</span>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 999,
                        background: '#E5E7EB',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${30 + row.value * 4}%`,
                          maxWidth: '100%',
                          height: '100%',
                          borderRadius: 999,
                          background: row.color,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontVariantNumeric: 'tabular-nums',
                        color: '#667085',
                        textAlign: 'right',
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              <div
                style={{
                  marginTop: 10,
                  paddingTop: 8,
                  borderTop: '1px solid #E5E7EB',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 12,
                  color: '#667085',
                }}
              >
                <span>Total findings</span>
                <span
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    color: '#111827',
                    fontWeight: 600,
                  }}
                >
                  27
                </span>
              </div>
            </div>
          )}

          {!isScheduled && (
            <div
              style={{
                paddingTop: 4,
                paddingBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#98A2B3',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  marginBottom: 10,
                }}
              >
                Activity log
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  fontSize: 13,
                  position: 'relative',
                  paddingLeft: 20,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 26,
                    top: -8,
                    bottom: 2,
                    width: 1,
                    background: '#E5E7EB',
                  }}
                />
                {[
                  {
                    label: 'Scan initiated',
                    description: 'Full scan started against 12 target assets',
                    time: '08:30 AM',
                  },
                  {
                    label: 'Asset discovery complete',
                    description: '12 assets confirmed reachable',
                    time: '08:42 AM',
                  },
                  {
                    label: 'Vulnerability enumeration',
                    description: 'Running CVE database checks',
                    time: '09:15 AM',
                  },
                  {
                    label: 'Scan completed',
                    description: '27 findings across 4 severity levels',
                    time: '10:15 AM',
                  },
                ].map((event, index, all) => (
                  <div
                    key={event.label}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          border:
                            index === 0
                              ? '2px solid #2563EB'
                              : index === all.length - 1
                              ? '2px solid #12B76A'
                              : '2px solid #CBD5E1',
                          background: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxSizing: 'border-box',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background:
                              index === 0
                                ? '#2563EB'
                                : index === all.length - 1
                                ? '#12B76A'
                                : '#98a2b3',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        <span
                          style={{
                            color: '#111827',
                          }}
                        >
                          {event.label}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: '#667085',
                          }}
                        >
                          {event.description}
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#98A2B3',
                        whiteSpace: 'nowrap',
                        marginTop: 2,
                      }}
                    >
                      {event.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div
          style={{
            padding: '12px 24px',
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: '#FFFFFF',
          }}
        >
          {isScheduled ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Button
                icon={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                        stroke="#344054"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.375 5.625L5.625 9.375"
                        stroke="#344054"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.625 5.625L9.375 9.375"
                        stroke="#344054"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Cancel</span>
                  </span>
                }
                hierarchy="secondary-gray"
                size="sm"
                onClick={onClose}
              />
              <Button
                icon={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M3.75 1.875L12.5 7.5L3.75 13.125V1.875Z"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Run Now</span>
                  </span>
                }
                hierarchy="primary"
                size="sm"
                onClick={() => {
                  onRescan(scan);
                }}
              />
            </div>
          ) : isFailed ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Button
                icon={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#FFFFFF',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 30 30"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
                    </svg>
                    <span>Retry scan</span>
                  </span>
                }
                hierarchy="primary"
                size="sm"
                onClick={() => {
                  onRescan(scan);
                }}
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Button
                icon={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M13.125 9.375V11.875C13.125 12.2065 12.9933 12.5245 12.7589 12.7589C12.5245 12.9933 12.2065 13.125 11.875 13.125H3.125C2.79348 13.125 2.47554 12.9933 2.24112 12.7589C2.0067 12.5245 1.875 12.2065 1.875 11.875V9.375"
                        stroke="#344054"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.375 6.25L7.5 9.375L10.625 6.25"
                        stroke="#344054"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 9.375V1.875"
                        stroke="#344054"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>View Report</span>
                  </span>
                }
                hierarchy="secondary-gray"
                size="sm"
                onClick={() => {
                  onDownloadReport(scan);
                }}
              />
              <Button
                icon={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M1.875 7.5C1.875 6.00816 2.46763 4.57742 3.52252 3.52252C4.57742 2.46763 6.00816 1.875 7.5 1.875C9.07253 1.88092 10.5819 2.49451 11.7125 3.5875L13.125 5"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.125 1.875V5H10"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.125 7.5C13.125 8.99184 12.5324 10.4226 11.4775 11.4775C10.4226 12.5324 8.99184 13.125 7.5 13.125C5.92747 13.1191 4.41811 12.5055 3.2875 11.4125L1.875 10"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 10H1.875V13.125"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Rescan</span>
                  </span>
                }
                hierarchy="primary"
                size="sm"
                onClick={() => {
                  onRescan(scan);
                }}
              />
            </div>
          )}
          <Button
            label="Close"
            hierarchy="secondary-gray"
            size="sm"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

