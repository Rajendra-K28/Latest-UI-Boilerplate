import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../../components';

type ExpandedQuarterId = 'q4' | 'q3' | 'q2' | 'q1' | null;

type AsvScansQuarterAccordionProps = {
  expandedQuarterId: ExpandedQuarterId;
  setExpandedQuarterId: Dispatch<SetStateAction<ExpandedQuarterId>>;
  onLaunchRescan: () => void;
};

export function AsvScansQuarterAccordion({
  expandedQuarterId,
  setExpandedQuarterId,
  onLaunchRescan,
}: AsvScansQuarterAccordionProps) {
  return (
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Quarter accordion current quarter */}
      <div
        style={{
          borderRadius: 16,
          border: '1px solid #D0D5DD',
          background: '#ffffff',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          padding: 20,
        }}
      >
        <div
          onClick={() => setExpandedQuarterId(expandedQuarterId === 'q4' ? null : 'q4')}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                background: '#FEF3F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '2px solid #F04438',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  color: '#F04438',
                }}
              >
                ✕
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
                  Quarter 4
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: 999,
                    background: '#EEF4FF',
                    color: '#155EEF',
                  }}
                >
                  Current
                </span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#4B5563',
                }}
              >
                Dec 10, 2025 – Mar 14, 2026 · 1 scan ·{' '}
                <span style={{ color: '#B42318', fontWeight: 500 }}>11 days remaining</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button
                variant="primary"
                iconPosition="left"
                onClick={onLaunchRescan}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M2.25 5.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H5.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V5.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.75 12.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H12.75"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V12.75"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.25 9H12.75"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                label="Launch Rescan"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedQuarterId(expandedQuarterId === 'q4' ? null : 'q4');
              }}
              style={{
                border: 'none',
                background: 'transparent',
                padding: 4,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={expandedQuarterId === 'q4' ? 'Collapse quarter 4' : 'Expand quarter 4'}
            >
              <span
                style={{
                  fontSize: 16,
                  color: '#6B7280',
                  transform: expandedQuarterId === 'q4' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.15s ease-out',
                  display: 'inline-block',
                }}
              >
                ▾
              </span>
            </button>
          </div>
        </div>

        {/* Expanded scan details */}
        {expandedQuarterId === 'q4' && (
          <div
            style={{
              marginTop: 16,
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              padding: 16,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 232px',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#101828' }}>Quarter 4 - Initial Scan</span>
                  <span style={{ fontSize: 12, color: '#98A2B3' }}>ASV-W4-2025</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      padding: '3px 8px',
                      borderRadius: 999,
                      background: '#FEF3F2',
                      color: '#B42318',
                      border: '1px solid #FECDCA',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#F04438',
                      }}
                    />
                    FAIL
                  </span>

                  <Button
                    variant="secondary"
                    size="sm"
                    iconPosition="left"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M8.75016 1.16602H3.50016C3.19074 1.16602 2.894 1.28893 2.6752 1.50772C2.45641 1.72652 2.3335 2.02326 2.3335 2.33268V11.666C2.3335 11.9754 2.45641 12.2722 2.6752 12.491C2.894 12.7098 3.19074 12.8327 3.50016 12.8327H10.5002C10.8096 12.8327 11.1063 12.7098 11.3251 12.491C11.5439 12.2722 11.6668 11.9754 11.6668 11.666V4.08268L8.75016 1.16602Z"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.1665 1.16602V3.49935C8.1665 3.80877 8.28942 4.10551 8.50821 4.32431C8.72701 4.5431 9.02375 4.66602 9.33317 4.66602H11.6665"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.83317 5.25H4.6665"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.33317 7.58398H4.6665"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.33317 9.91602H4.6665"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    label="View Results"
                  />

                  <Button
                    variant="secondary"
                    size="sm"
                    iconPosition="left"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.0835 5.83398L7.00016 8.75065L9.91683 5.83398"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 8.75V1.75"
                          stroke="#344054"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: '#344054',
                  fontWeight: 500,
                }}
              >
                <span style={{ color: '#98A2B3' }}>Findings Breakdown</span>
                <span style={{ color: '#98A2B3', fontWeight: 400 }}>21 total</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'CRITICAL', count: 2, color: '#F04438', width: '25%' },
                  { label: 'HIGH', count: 5, color: '#D97706', width: '62%' },
                  { label: 'MEDIUM', count: 8, color: '#F5A524', width: '100%' },
                  { label: 'LOW', count: 6, color: '#2E90FA', width: '75%' },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '56px minmax(0, 1fr) 20px',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 10,
                    }}
                  >
                    <span style={{ color: '#667085', letterSpacing: 0.2 }}>{row.label}</span>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 999,
                        background: '#EAECF0',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ height: '100%', width: row.width, background: row.color, borderRadius: 999 }} />
                    </div>
                    <span style={{ color: '#344054', textAlign: 'right', fontSize: 11 }}>{row.count}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 2,
                  paddingTop: 12,
                  borderTop: '1px solid #EAECF0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  rowGap: 8,
                  columnGap: 16,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Duration</span>
                  <span style={{ fontSize: 13, color: '#101828' }}>2h 18m</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Assets scanned</span>
                  <span style={{ fontSize: 13, color: '#101828' }}>24 / 24</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Nessus</span>
                  <span style={{ fontSize: 13, color: '#101828' }}>10.7.2</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 11, color: '#98A2B3' }}>Initiated by</span>
                  <span style={{ fontSize: 13, color: '#101828' }}>Sarah Chen</span>
                </div>
              </div>
            </div>

            <div
              style={{
                borderLeft: '1px solid #EAECF0',
                paddingLeft: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ fontSize: 12, color: '#344054', fontWeight: 500 }}>Top Affected Assets</div>

              {[
                { name: 'prod-web-01.internal', ip: '10.0.1.10', count: 4 },
                { name: 'prod-db-01.internal', ip: '10.0.1.20', count: 3 },
                { name: 'corp-ldap.internal', ip: '10.0.2.10', count: 2 },
              ].map((asset) => (
                <div
                  key={asset.name}
                  style={{
                    border: '1px solid #EAECF0',
                    borderRadius: 8,
                    padding: '8px 10px',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: '#F2F4F7',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#667085',
                        fontSize: 11,
                        flexShrink: 0,
                      }}
                    >
                      S
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#344054', lineHeight: 1.3 }}>
                      {asset.name}
                      <br />
                      <span style={{ fontSize: 10, color: '#98A2B3' }}>{asset.ip}</span>
                    </span>
                  </div>
                  <span style={{ color: '#B42318', fontSize: 12, fontWeight: 500 }}>{asset.count}</span>
                </div>
              ))}

              <div style={{ marginTop: 2, paddingTop: 10, borderTop: '1px solid #EAECF0' }}>
                <span style={{ display: 'block', fontSize: 11, color: '#98A2B3' }}>Target Scope</span>
                <span style={{ display: 'block', fontSize: 12, color: '#344054', marginTop: 3 }}>
                  10.0.1.0/24, 10.0.2.0/24
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Previous quarters - collapsed rows */}
      {(
        [
          {
            id: 'q3',
            label: 'Quarter 3',
            subtitle: 'Sep 11 – Dec 9, 2025 · 2 scans',
            statusLabel: 'Compliant',
            statusColor: '#12B76A',
            complianceScan: 'ASV–W3–2025–R1',
          },
          {
            id: 'q2',
            label: 'Quarter 2',
            subtitle: 'Jun 13 – Sep 10, 2025 · 1 scan',
            statusLabel: 'Compliant',
            statusColor: '#12B76A',
            complianceScan: 'ASV–W2–2025',
          },
          {
            id: 'q1',
            label: 'Quarter 1',
            subtitle: 'Mar 15 – Jun 12, 2025 · 1 scan',
            statusLabel: 'Compliant',
            statusColor: '#12B76A',
            complianceScan: 'ASV–W1–2025',
          },
        ] as const
      ).map((q) => {
        const isExpanded = expandedQuarterId === q.id;
        return (
          <div
            key={q.id}
            style={{
              borderRadius: 16,
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {/* Header row */}
            <div
              onClick={() => setExpandedQuarterId(isExpanded ? null : q.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: '#ECFDF3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '2px solid #12B76A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      color: '#12B76A',
                    }}
                  >
                    ✓
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
                      {q.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '4px 8px',
                        borderRadius: 999,
                        background: '#ECFDF3',
                        color: q.statusColor,
                      }}
                    >
                      {q.statusLabel}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#4B5563' }}>{q.subtitle}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#6B7280' }}>Compliance scan:</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    fontSize: 12,
                    color: '#155EEF',
                    fontWeight: 500,
                    fontFamily: 'Menlo, monospace',
                    cursor: 'pointer',
                  }}
                >
                  {q.complianceScan}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedQuarterId(isExpanded ? null : q.id);
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label={isExpanded ? `Collapse ${q.label}` : `Expand ${q.label}`}
                >
                  <span
                    style={{
                      fontSize: 16,
                      color: '#6B7280',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s ease-out',
                      display: 'inline-block',
                    }}
                  >
                    ▾
                  </span>
                </button>
              </div>
            </div>

            {/* Expanded compliant layout */}
            {isExpanded && q.statusLabel === 'Compliant' && (
              <div
                style={{
                  marginTop: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {/* Initial Scan (example uses Quarter 3 content; duplicated for Q2/Q1 with different text) */}
                <div
                  style={{
                    borderRadius: 12,
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    padding: 16,
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
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
                        {q.label} — Initial Scan
                      </span>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>
                        {q.id === 'q3' ? 'ASV–W3–2025' : q.id === 'q2' ? 'ASV–W2–2025' : 'ASV–W1–2025'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '4px 8px',
                          borderRadius: 999,
                          background: '#FEF3F2',
                          color: '#B42318',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#F97316',
                          }}
                        />
                        FAIL
                      </span>

                      {/* Reuse View Results + download buttons */}
                      <Button
                        variant="secondary"
                        size="sm"
                        iconPosition="left"
                        style={{ color: '#344054' }}
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M8.75016 1.16602H3.50016C3.19074 1.16602 2.894 1.28893 2.6752 1.50772C2.45641 1.72652 2.3335 2.02326 2.3335 2.33268V11.666C2.3335 11.9754 2.45641 12.2722 2.6752 12.491C2.894 12.7098 3.19074 12.8327 3.50016 12.8327H10.5002C10.8096 12.8327 11.1063 12.7098 11.3251 12.491C11.5439 12.2722 11.6668 11.9754 11.6668 11.666V4.08268L8.75016 1.16602Z"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.1665 1.16602V3.49935C8.1665 3.80877 8.28942 4.10551 8.50821 4.32431C8.72701 4.5431 9.02375 4.66602 9.33317 4.66602H11.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.83317 5.25H4.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.33317 7.58398H4.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.33317 9.91602H4.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        label="View Results"
                      />

                      {/* Download */}
                      <Button
                        variant="secondary"
                        size="sm"
                        iconPosition="left"
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.0835 5.83398L7.00016 8.75065L9.91683 5.83398"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 8.75V1.75"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                      gap: 16,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Date</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#111827' }}>
                        {q.id === 'q3'
                          ? 'Nov 14, 2025'
                          : q.id === 'q2'
                            ? 'Aug 20, 2025'
                            : 'Apr 18, 2025'}
                      </div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Duration</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#111827' }}>
                        {q.id === 'q3' ? '2h 42m' : q.id === 'q2' ? '2h 12m' : '1h 55m'}
                      </div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Assets scanned</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#111827' }}>22</div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Validated</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#111827' }}>No</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 12 }}>
                    {(
                      q.id === 'q3'
                        ? [
                            { id: '1', bg: '#FEF3F2', color: '#B42318' },
                            { id: '2', bg: '#FEF3F2', color: '#B42318' },
                            { id: '7', bg: '#FFFBEB', color: '#B45309' },
                            { id: '12', bg: '#EFF6FF', color: '#1D4ED8' },
                          ]
                        : q.id === 'q2'
                          ? [
                              { id: '3', bg: '#FEF3F2', color: '#B42318' },
                              { id: '6', bg: '#FFFBEB', color: '#B45309' },
                              { id: '9', bg: '#EFF6FF', color: '#1D4ED8' },
                            ]
                          : [
                              { id: '2', bg: '#FEF3F2', color: '#B42318' },
                              { id: '4', bg: '#FFFBEB', color: '#B45309' },
                            ]
                    ).map((chip) => (
                      <span
                        key={chip.id}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 2,
                          background: chip.bg,
                          color: chip.color,
                          fontWeight: 500,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 2,
                            background: chip.color,
                          }}
                        />
                        {chip.id}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rescan 1 (pass) */}
                <div
                  style={{
                    borderRadius: 12,
                    border: '1px solid #12B76A',
                    background: '#fff',
                    padding: 16,
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
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
                        {q.label} — Rescan 1
                      </span>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>
                        {q.id === 'q3'
                          ? 'ASV–W3–2025–R1'
                          : q.id === 'q2'
                            ? 'ASV–W2–2025–R1'
                            : 'ASV–W1–2025–R1'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '4px 8px',
                          borderRadius: 999,
                          background: '#EEF4FF',
                          color: '#155EEF',
                        }}
                      >
                        Rescan
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '4px 8px',
                          borderRadius: 999,
                          background: '#ECFDF3',
                          color: '#12B76A',
                        }}
                      >
                        Compliance Scan
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '4px 8px',
                          borderRadius: 999,
                          background: '#ECFDF3',
                          color: '#12B76A',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#16A34A',
                          }}
                        />
                        PASS
                      </span>

                      {/* View Results */}
                      <Button
                        variant="secondary"
                        size="sm"
                        iconPosition="left"
                        style={{ color: '#344054' }}
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M8.75016 1.16602H3.50016C3.19074 1.16602 2.894 1.28893 2.6752 1.50772C2.45641 1.72652 2.3335 2.02326 2.3335 2.33268V11.666C2.3335 11.9754 2.45641 12.2722 2.6752 12.491C2.894 12.7098 3.19074 12.8327 3.50016 12.8327H10.5002C10.8096 12.8327 11.1063 12.7098 11.3251 12.491C11.5439 12.2722 11.6668 11.9754 11.6668 11.666V4.08268L8.75016 1.16602Z"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.1665 1.16602V3.49935C8.1665 3.80877 8.28942 4.10551 8.50821 4.32431C8.72701 4.5431 9.02375 4.66602 9.33317 4.66602H11.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.83317 5.25H4.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.33317 7.58398H4.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.33317 9.91602H4.6665"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        label="View Results"
                      />

                      {/* Download */}
                      <Button
                        variant="secondary"
                        size="sm"
                        iconPosition="left"
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.0835 5.83398L7.00016 8.75065L9.91683 5.83398"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 8.75V1.75"
                              stroke="#344054"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                      gap: 16,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Date</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#111827' }}>
                        Dec 7, 2025
                      </div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Duration</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#111827' }}>
                        2h 05m
                      </div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Assets scanned</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#111827' }}>22</div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 8, background: '#F9FAFB' }}>
                      <div style={{ color: '#6B7280' }}>Validated</div>
                      <div style={{ marginTop: 4, fontWeight: 500, color: '#16A34A' }}>Yes</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 12 }}>
                    {[
                      { id: '1', bg: '#FEF3F2', color: '#B42318' },
                      { id: '2', bg: '#FEF3F2', color: '#B42318' },
                      { id: '7', bg: '#FFFBEB', color: '#B45309' },
                      { id: '12', bg: '#EFF6FF', color: '#1D4ED8' },
                    ].map((chip) => (
                      <span
                        key={chip.id}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 2,
                          background: chip.bg,
                          color: chip.color,
                          fontWeight: 500,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 2,
                            background: chip.color,
                          }}
                        />
                        {chip.id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

