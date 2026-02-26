interface AudiLogoProps {
  className?: string
  size?: number
}

export default function AudiLogo({ className = '', size = 120 }: AudiLogoProps) {
  const ringRadius = size * 0.16
  const strokeWidth = size * 0.02
  const spacing = size * 0.22
  const cy = size * 0.5
  const startX = size * 0.17

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size * 0.42}`}
      fill="none"
      className={className}
      width={size}
      height={size * 0.42}
    >
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={startX + i * spacing}
          cy={cy * 0.42}
          r={ringRadius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />
      ))}
    </svg>
  )
}
