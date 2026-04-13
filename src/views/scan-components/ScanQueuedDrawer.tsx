import React from 'react';
import { SideDrawer, Calendar, Clock, Database } from '../../components';
import type { AssetRecord } from '../ScanComponentsView';
import { AssetIcon } from '../ScanComponentsView';

type ScanQueuedDrawerProps = {
  asset: AssetRecord;
  onClose: () => void;
};

export function ScanQueuedDrawer({ asset, onClose }: ScanQueuedDrawerProps) {
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
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          paddingTop: 8,
        }}
      >
        {/* Status banner */}
        <div
          style={{
            borderRadius: 12,
            background: '#FFFAEB',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: '#B54708',
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
              backgroundColor: '#FEEFC7',
              color: '#B54708',
              fontSize: 14,
            }}
          >
            ⏱
          </span>
          <span>Queued</span>
        </div>

        {/* Asset details title */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#101828',
          }}
        >
          ASSET DETAILS
        </div>

        {/* Asset details grid */}
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
            <div style={{ color: '#101828', fontWeight: 500 }}>{asset.typeLabel}</div>
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
            <div style={{ color: '#101828' }}>Network Infrastructure</div>
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
            <div
              style={{
                color:
                  asset.reachability === 'validated'
                    ? '#027A48'
                    : asset.reachability === 'failed'
                      ? '#F04438'
                      : '#F79009',
                fontWeight: 500,
              }}
            >
              {asset.reachability === 'validated'
                ? 'Validated'
                : asset.reachability === 'failed'
                  ? 'Failed'
                  : 'Setup Required'}
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
              <span>Duration</span>
            </div>
            <div style={{ color: '#101828' }}>38m 42s</div>
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

        {/* Scan queued message */}
        <div
          style={{
            marginTop: 8,
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderTop: '1px solid #E0E7EC',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '999px',
              background: '#FEF7EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F79009',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              ⏱
            </span>
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#101828',
            }}
          >
            Scan Queued
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#667085',
              maxWidth: 420,
            }}
          >
            Waiting in batch {asset.scanId ?? '—'}. Scan will begin once current active scans
            complete.
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}

