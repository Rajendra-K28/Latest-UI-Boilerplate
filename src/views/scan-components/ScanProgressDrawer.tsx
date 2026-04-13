import React from 'react';
import { SideDrawer, Database, Clock, Calendar } from '../../components';
import type { AssetRecord } from '../ScanComponentsView';
import { AssetIcon } from '../ScanComponentsView';

type ScanProgressDrawerProps = {
  asset: AssetRecord;
  onClose: () => void;
};

export function ScanProgressDrawer({ asset, onClose }: ScanProgressDrawerProps) {
  const progress = asset.scanProgress ?? 0;

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
            background: '#EFF8FF',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: '#175CD3',
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '2px solid #175CD3',
              borderTopColor: 'transparent',
              display: 'inline-block',
            }}
            className="validation-spinner"
          />
          <span>Scan In Progress</span>
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
              <Clock />
              <span>Duration</span>
            </div>
            <div style={{ color: '#101828' }}>—</div>
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
              <Calendar />
              <span>Last scanned</span>
            </div>
            <div style={{ color: '#101828' }}>In Progress</div>
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

        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#101828',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Scan progress
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              color: '#667085',
              marginBottom: 6,
            }}
          >
            <span>Overall progress</span>
            <span>{progress}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: 6,
              borderRadius: 999,
              background: '#F2F4F7',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: '#266DF0',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: '#667085',
            }}
          >
            Estimated time remaining: a few minutes
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}

