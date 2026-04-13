import React from 'react';
import { SideDrawer, Database, Clock, Calendar, ChevronRight } from '../../components';
import type { AssetRecord } from '../ScanComponentsView';
import { AssetIcon, RefreshIcon } from '../ScanComponentsView';

type FailedValidationDrawerProps = {
  asset: AssetRecord;
  onClose: () => void;
  onRetryValidation: () => void;
};

export function FailedValidationDrawer({
  asset,
  onClose,
  onRetryValidation,
}: FailedValidationDrawerProps) {
  return (
    <SideDrawer
      isOpen
      onClose={onClose}
      title={asset.name}
      subtitle={`${asset.ipAddress} · ${asset.typeLabel}`}
      icon={<AssetIcon type={asset.type} />}
      showPrimaryButton={false}
      showSecondaryButton
      secondaryButtonLabel="Close"
      buttonAlignment="right"
      onSecondaryClick={onClose}
      footerNote={
        <button
          type="button"
          onClick={onRetryValidation}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid #FDEAD7',
            background: '#FFF6ED',
            color: '#FB6514',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            minWidth: 140,
            width: 140,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <RefreshIcon />
          <span>Retry Validation</span>
        </button>
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
            background: '#FEF3F2',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: '#B42318',
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: '2px solid #F04438',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
            }}
          >
            ✕
          </span>
          <span>Scan Failed</span>
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
            rowGap: 30,
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
              <Clock />
              <span>Reachability</span>
            </div>
            <div style={{ color: '#F04438', fontWeight: 500 }}>Failed</div>
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
              <Clock />
              <span>Duration</span>
            </div>
            <div style={{ color: '#101828' }}>15m 32s</div>
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
            <div style={{ color: '#101828' }}>Cloud Infrastructure</div>
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
              <Calendar />
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
              <span>Scan Job ID</span>
            </div>
            <div style={{ color: '#101828' }}>{asset.scanId ?? '—'}</div>
          </div>
        </div>

        {/* Scan history section */}
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#101828',
              marginBottom: 12,
              borderTop: '1px solid #E0E7EC',
              paddingTop: 24,
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
                statusLabel: '27 findings · 42m 15s',
                scanId: 'SCN-20260214-039',
              },
              {
                date: 'Feb 07, 2026',
                statusColor: '#12B76A',
                statusLabel: '31 findings · 39m 50s',
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
                statusLabel: '29 findings · 44m 02s',
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
                    <span
                      style={{
                        color: '#667085',
                      }}
                    >
                      {entry.scanId}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    color: entry.statusColor === '#F04438' ? '#F04438' : '#667085',
                    fontWeight: entry.statusColor === '#F04438' ? 500 : 400,
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  {entry.statusLabel}
                  <span
                    style={{
                      fontSize: 14,
                      display: 'inline-flex',
                    }}
                  >
                    <ChevronRight />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}

