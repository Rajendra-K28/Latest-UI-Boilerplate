import React from 'react';
import { SideDrawer, Calendar, Clock, Database, Button } from '../../components';
import type { AssetRecord } from '../ScanComponentsView';
import { AssetIcon } from '../ScanComponentsView';

type NeverScannedAssetDrawerProps = {
  asset: AssetRecord;
  onClose: () => void;
  onOpenWhitelistStep: () => void;
};

const CompleteSetupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
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
);

export function NeverScannedAssetDrawer({
  asset,
  onClose,
  onOpenWhitelistStep,
}: NeverScannedAssetDrawerProps) {
  return (
    <SideDrawer
      isOpen
      onClose={onClose}
      title={asset.name}
      subtitle={asset.ipAddress}
      icon={<AssetIcon type={asset.type} />}
      showPrimaryButton={false}
      showSecondaryButton={false}
      buttonAlignment="right"
      footerNote={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 12,
          }}
        >
          {asset.scanStatus === 'never-scanned' && asset.reachability === 'setup-required' && (
            <Button
              label="Complete Setup"
              variant="primary"
              size="md"
              icon={
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 0,
                  }}
                >
                  <CompleteSetupIcon />
                </span>
              }
              iconPosition="left"
              onClick={onOpenWhitelistStep}
            />
          )}
          <Button
            label="Close"
            variant="secondary"
            size="md"
            style={{ color: '#344054', marginLeft: 'auto' }}
            onClick={onClose}
          />
        </div>
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
        {/* Status banner */}
        <div
          style={{
            borderRadius: 12,
            background: '#F9FAFB',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: '#344054',
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
              backgroundColor: '#E5E7EB',
              color: '#344054',
              fontSize: 14,
            }}
          >
            ⏱
          </span>
          <span>Never Scanned</span>
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
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
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
        </div>

        {/* Setup incomplete message */}
        <div
          style={{
            marginTop: 8,
            padding: '32px 24px',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 12,
            borderTop: '1px solid #E0E7EC',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '999px',
              background:
                '#FEF7EC',
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
              ⚠️
            </span>
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#101828',
            }}
          >
            Setup Incomplete
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#667085',
              maxWidth: 420,
            }}
          >
            Complete validation and whitelisting before this asset can be queued for scanning.
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}

