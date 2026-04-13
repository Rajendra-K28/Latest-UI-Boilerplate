export function Shield({ color = '#518AF3', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5L3 3.5V7.5C3 10.5 5 13 8 14.5C11 13 13 10.5 13 7.5V3.5L8 1.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
