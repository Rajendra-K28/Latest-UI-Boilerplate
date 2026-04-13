export function HIPAABadge({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="#9B5C5C" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="5"
        fontWeight="600"
        fontFamily="Inter"
      >
        HIPAA
      </text>
    </svg>
  );
}
