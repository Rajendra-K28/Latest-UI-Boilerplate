import { useId } from 'react';

/** Shared table / header pieces for ASV scan result (pass & fail) pages */

export const BackToHistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
    <path
      d="M11.875 7.5H3.125M3.125 7.5L6.25 10.625M3.125 7.5L6.25 4.375"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ScannedStatusIcon() {
  const uid = useId().replace(/:/g, '');
  const clipId = `clip-scanned-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M5.00065 9.16732C7.30184 9.16732 9.16732 7.30184 9.16732 5.00065C9.16732 2.69946 7.30184 0.833984 5.00065 0.833984C2.69946 0.833984 0.833984 2.69946 0.833984 5.00065C0.833984 7.30184 2.69946 9.16732 5.00065 9.16732Z"
          stroke="#12B76A"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 4.99935L4.58333 5.83268L6.25 4.16602"
          stroke="#12B76A"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const TableReattemptStatusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17 17" fill="none" aria-hidden>
    <path d="M8.5 14.166H8.50708" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.02148 11.6374C6.68352 10.9885 7.57361 10.625 8.50065 10.625C9.42769 10.625 10.3178 10.9885 10.9798 11.6374" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.54102 9.10854C4.54545 8.12389 5.8203 7.46058 7.2031 7.20312" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.4587 9.10809C13.0322 8.69 12.5546 8.32752 12.0371 8.0293" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.41602 6.24712C2.29194 5.46376 3.29175 4.83113 4.37472 4.375" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5836 6.24839C14.5032 5.2821 13.2365 4.54708 11.8614 4.08857C10.4863 3.63005 9.03202 3.45774 7.58789 3.58223" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.41602 1.41602L15.5827 15.5827" stroke="#B54708" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const severityCountPill = {
  critical: { background: '#FEF3F2', color: '#B42318' },
  high: { background: '#FEF0E6', color: '#93370D' },
  medium: { background: '#FFFAEB', color: '#B54708' },
  low: { background: '#E9F0FE', color: '#1849A9' },
} as const;

export function SeverityCountCell({ value, kind }: { value: string; kind: keyof typeof severityCountPill }) {
  if (value === '-') {
    return <span style={{ color: '#667085', fontSize: 12 }}>{value}</span>;
  }
  const s = severityCountPill[kind];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: 24,
        height: 20,
        padding: '1.75px 0 1.25px 0',
        borderRadius: 10,
        background: s.background,
        color: s.color,
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      {value}
    </span>
  );
}

export const DownloadReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M13.125 9.375V11.875C13.125 12.2065 12.9933 12.5245 12.7589 12.7589C12.5245 12.9933 12.2065 13.125 11.875 13.125H3.125C2.79348 13.125 2.47554 12.9933 2.24112 12.7589C2.0067 12.5245 1.875 12.2065 1.875 11.875V9.375" stroke="#344054" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.375 6.25L7.5 9.375L10.625 6.25" stroke="#344054" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 9.375V1.875" stroke="#344054" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InitiatedByIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M19.7923 21.875V19.7917C19.7923 18.6866 19.3533 17.6268 18.5719 16.8454C17.7905 16.064 16.7307 15.625 15.6257 15.625H9.37565C8.27058 15.625 7.21077 16.064 6.42937 16.8454C5.64797 17.6268 5.20898 18.6866 5.20898 19.7917V21.875" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5007 11.4583C14.8018 11.4583 16.6673 9.59285 16.6673 7.29167C16.6673 4.99048 14.8018 3.125 12.5007 3.125C10.1995 3.125 8.33398 4.99048 8.33398 7.29167C8.33398 9.59285 10.1995 11.4583 12.5007 11.4583Z" stroke="#667085" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AssetsScannedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M20.834 2.08398H4.16732C3.01672 2.08398 2.08398 3.01672 2.08398 4.16732V8.33398C2.08398 9.48458 3.01672 10.4173 4.16732 10.4173H20.834C21.9846 10.4173 22.9173 9.48458 22.9173 8.33398V4.16732C22.9173 3.01672 21.9846 2.08398 20.834 2.08398Z" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.834 14.584H4.16732C3.01672 14.584 2.08398 15.5167 2.08398 16.6673V20.834C2.08398 21.9846 3.01672 22.9173 4.16732 22.9173H20.834C21.9846 22.9173 22.9173 21.9846 22.9173 20.834V16.6673C22.9173 15.5167 21.9846 14.584 20.834 14.584Z" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.25 6.25H6.26" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.25 18.75H6.26" stroke="#266DF0" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TotalFindingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M22.6353 18.7508L14.3019 4.16747C14.1202 3.84685 13.8567 3.58017 13.5383 3.39463C13.2199 3.20908 12.858 3.11133 12.4894 3.11133C12.1209 3.11133 11.759 3.20908 11.4406 3.39463C11.1222 3.58017 10.8587 3.84685 10.6769 4.16747L2.34362 18.7508C2.15995 19.0689 2.06364 19.4299 2.06446 19.7972C2.06527 20.1645 2.16318 20.525 2.34825 20.8423C2.53332 21.1596 2.79898 21.4222 3.1183 21.6037C3.43762 21.7853 3.79925 21.8791 4.16653 21.8758H20.8332C21.1987 21.8754 21.5577 21.7789 21.8741 21.5959C22.1905 21.4129 22.4532 21.1499 22.6358 20.8332C22.8184 20.5166 22.9145 20.1575 22.9144 19.7919C22.9143 19.4264 22.818 19.0674 22.6353 18.7508Z" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 9.375V13.5417" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 17.709H12.51" stroke="#C0182E" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AcknowledgedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M2.14714 12.8625C2.06033 12.6286 2.06033 12.3714 2.14714 12.1375C2.99266 10.0874 4.42789 8.33443 6.27086 7.10095C8.11383 5.86746 10.2816 5.20898 12.4992 5.20898C14.7169 5.20898 16.8846 5.86746 18.7276 7.10095C20.5706 8.33443 22.0058 10.0874 22.8513 12.1375C22.9381 12.3714 22.9381 12.6286 22.8513 12.8625C22.0058 14.9127 20.5706 16.6656 18.7276 17.8991C16.8846 19.1326 14.7169 19.791 12.4992 19.791C10.2816 19.791 8.11383 19.1326 6.27086 17.8991C4.42789 16.6656 2.99266 14.9127 2.14714 12.8625Z" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 15.625C14.2259 15.625 15.625 14.2259 15.625 12.5C15.625 10.7741 14.2259 9.375 12.5 9.375C10.7741 9.375 9.375 10.7741 9.375 12.5C9.375 14.2259 10.7741 15.625 12.5 15.625Z" stroke="#F2AE40" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FixImplementedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M15.3119 6.56304C15.1211 6.75776 15.0142 7.01955 15.0142 7.29221C15.0142 7.56486 15.1211 7.82665 15.3119 8.02137L16.9786 9.68804C17.1733 9.8789 17.4351 9.98581 17.7078 9.98581C17.9804 9.98581 18.2422 9.8789 18.4369 9.68804L22.364 5.76096C22.8878 6.91844 23.0464 8.20807 22.8186 9.45798C22.5909 10.7079 21.9877 11.8587 21.0893 12.7571C20.1909 13.6554 19.0401 14.2587 17.7902 14.4864C16.5403 14.7142 15.2507 14.5556 14.0932 14.0318L6.89526 21.2297C6.48085 21.6441 5.91881 21.8769 5.33276 21.8769C4.7467 21.8769 4.18466 21.6441 3.77026 21.2297C3.35585 20.8153 3.12305 20.2533 3.12305 19.6672C3.12305 19.0812 3.35585 18.5191 3.77026 18.1047L10.9682 10.9068C10.4444 9.7493 10.2858 8.45967 10.5135 7.20976C10.7413 5.95985 11.3445 4.80903 12.2429 3.91066C13.1412 3.0123 14.2921 2.40905 15.542 2.18131C16.7919 1.95358 18.0815 2.11217 19.239 2.63595L15.3223 6.55262L15.3119 6.56304Z" stroke="#288D68" strokeWidth="1.95312" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ViewFindingsChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 12L10 8L6 4" stroke="#266DF0" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RowChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6 4L10 8L6 12" stroke="#667085" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
