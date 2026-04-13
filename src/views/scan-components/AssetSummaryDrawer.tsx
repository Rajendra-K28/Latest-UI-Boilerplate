import React from 'react';
import { SideDrawer, Button, Database, Clock, Calendar, CheckCircleFilled, Eye } from '../../components';
import type { AssetRecord } from '../ScanComponentsView';
import { AssetIcon } from '../ScanComponentsView';

type AssetSummaryDrawerProps = {
  asset: AssetRecord;
  onClose: () => void;
  onReviewVulnerabilities: () => void;
};

export function AssetSummaryDrawer({
  asset,
  onClose,
  onReviewVulnerabilities,
}: AssetSummaryDrawerProps) {
  const vulnCounts = asset.vulnerabilities;

  return (
    <SideDrawer
      isOpen
      onClose={onClose}
      title={asset.name}
      subtitle={asset.ipAddress}
      icon={<AssetIcon type={asset.type} />}
      showPrimaryButton={false}
      showSecondaryButton
      secondaryButtonLabel="Close"
      onSecondaryClick={onClose}
      buttonAlignment="right"
      footerNote={
        <Button
          label="Review Vulnerabilities"
          icon={
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 0,
              }}
            >
              <Eye />
            </span>
          }
          iconPosition="left"
          variant="primary"
          size="md"
          onClick={onReviewVulnerabilities}
          style={{ cursor: 'pointer' }}
        />
      }
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          paddingTop: 8,
        }}
      >
        <div
          style={{
            borderRadius: 12,
            background: '#ECFDF3',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: '#027A48',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#12B76A',
              color: '#FFFFFF',
              fontSize: 14,
            }}
          >
            <CheckCircleFilled />
          </span>
          <span>Scan Completed</span>
        </div>

        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#101828',
          }}
        >
          ASSET DETAILS
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            rowGap: 16,
            columnGap: 32,
            fontSize: 12,
          }}
        >
          <div>
            <div
              style={{
                color: '#667085',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14, display: 'inline-flex' }}>
                <Database />
              </span>
              <span>Type</span>
            </div>
            <div style={{ color: '#101828', fontWeight: 500 }}>
              {asset.typeLabel}
            </div>
          </div>
          <div>
            <div
              style={{
                color: '#667085',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14, display: 'inline-flex' }}>
                <Clock />
              </span>
              <span>Reachability</span>
            </div>
            <div style={{ color: '#027A48', fontWeight: 500 }}>Validated</div>
          </div>
          <div>
            <div
              style={{
                color: '#667085',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14, display: 'inline-flex' }}>
                <Clock />
              </span>
              <span>Duration</span>
            </div>
            <div style={{ color: '#101828' }}>42m 15s</div>
          </div>
          <div>
            <div
              style={{
                color: '#667085',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  border: '1px solid #98A2B3',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: '#98A2B3',
                }}
              >
                #
              </span>
              <span>Project</span>
            </div>
            <div style={{ color: '#101828' }}>Production Infrastructure</div>
          </div>
          <div>
            <div
              style={{
                color: '#667085',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14, display: 'inline-flex' }}>
                <Calendar />
              </span>
              <span>Last scanned</span>
            </div>
            <div style={{ color: '#101828' }}>{asset.lastScanned}</div>
          </div>
          <div>
            <div
              style={{
                color: '#667085',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14, display: 'inline-flex' }}>
                <Calendar />
              </span>
              <span>Next scan</span>
            </div>
            <div style={{ color: '#101828' }}>Feb 21, 2026</div>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#101828',
              marginBottom: 12,
            }}
          >
            VULNERABILITIES
          </div>
          {(['critical', 'high', 'medium', 'low'] as const).map((sev) => {
            const value = vulnCounts[sev];
            const total =
              vulnCounts.critical + vulnCounts.high + vulnCounts.medium + vulnCounts.low;
            const widthPct = total > 0 ? Math.max(4, (value / total) * 100) : 0;

            const color =
              sev === 'critical'
                ? '#F04438'
                : sev === 'high'
                  ? '#F79009'
                  : sev === 'medium'
                    ? '#FDB022'
                    : '#266DF0';

            const label = sev.charAt(0).toUpperCase() + sev.slice(1);

            return (
              <div
                key={sev}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                <div style={{ width: 70, color: '#667085' }}>{label}</div>
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 999,
                    background: '#F2F4F7',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${widthPct}%`,
                      height: '100%',
                      background: color,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 24,
                    textAlign: 'right',
                    color: '#101828',
                  }}
                >
                  {value}
                </div>
              </div>
            );
          })}
          <div
            style={{
              marginTop: 8,
              textAlign: 'right',
              fontSize: 12,
              color: '#667085',
            }}
          >
            Total findings{' '}
            <span style={{ color: '#101828', fontWeight: 500 }}>
              {vulnCounts.critical +
                vulnCounts.high +
                vulnCounts.medium +
                vulnCounts.low}
            </span>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#101828',
              marginBottom: 12,
            }}
          >
            SCAN HISTORY
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontSize: 12,
            }}
          >
            {[
              {
                date: 'Feb 14, 2026',
                statusColor: '#12B76A',
                statusLabel: 'Completed',
                scanId: 'SCN-20260214-039',
              },
              {
                date: 'Feb 07, 2026',
                statusColor: '#12B76A',
                statusLabel: 'Completed',
                scanId: 'SCN-20260207-028',
              },
              {
                date: 'Jan 31, 2026',
                statusColor: '#F04438',
                statusLabel: 'Failed',
                scanId: 'SCN-20260131-019',
              },
              {
                date: 'Jan 24, 2026',
                statusColor: '#12B76A',
                statusLabel: 'Completed',
                scanId: 'SCN-20260124-011',
              },
            ].map((entry, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: entry.statusColor,
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <span style={{ color: '#101828' }}>{entry.date}</span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#667085',
                      }}
                    >
                      <span>{entry.scanId}</span>
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color:
                      entry.statusColor === '#F04438'
                        ? '#F04438'
                        : '#667085',
                    fontWeight:
                      entry.statusColor === '#F04438' ? 500 : 400,
                  }}
                >
                  {entry.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}

