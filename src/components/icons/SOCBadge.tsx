export function SOCBadge({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="#518AF3" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="600"
        fontFamily="Inter"
      >
        SOC
      </text>
    </svg>
  );
}
