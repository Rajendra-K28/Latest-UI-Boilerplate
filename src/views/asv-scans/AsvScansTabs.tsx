import type { ReactNode } from 'react';

type AsvTabId = 'scans' | 'history' | 'timeline' | 'disputes';

type AsvScansTabsProps = {
  activeTab: AsvTabId;
  onTabChange: (tab: AsvTabId) => void;
  scansTab: ReactNode;
  historyTab: ReactNode;
  timelineTab: ReactNode;
  disputesTab: ReactNode;
};

export function AsvScansTabs({
  activeTab,
  onTabChange,
  scansTab,
  historyTab,
  timelineTab,
  disputesTab,
}: AsvScansTabsProps) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 24,
          borderBottom: '1px solid #E5E7EB',
          marginBottom: 16,
        }}
      >
        {(
          [
            { id: 'scans', label: 'Scans' },
            { id: 'history', label: 'History' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'disputes', label: 'Disputes' },
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              style={{
                position: 'relative',
                padding: '8px 4px 10px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#155EEF' : '#667085',
              }}
            >
              {tab.label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 3,
                    borderRadius: 999,
                    background: '#155EEF',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {activeTab === 'scans'
        ? scansTab
        : activeTab === 'history'
          ? historyTab
          : activeTab === 'timeline'
            ? timelineTab
            : disputesTab}
    </>
  );
}

