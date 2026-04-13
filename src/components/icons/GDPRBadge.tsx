export function GDPRBadge({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="#2E5AAC" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="6"
        fontWeight="600"
        fontFamily="Inter"
      >
        GDPR
      </text>
    </svg>
  );
}
