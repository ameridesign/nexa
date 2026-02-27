import { useState } from 'react'
import { Image, Plus, GripVertical, X } from 'lucide-react'

export interface Shot {
  id: string
  name: string
  duration: number
  thumbnail: string | null
}

interface ShotsPanelProps {
  shots: Shot[]
  selectedShotId: string
  onSelectShot: (id: string) => void
  onAddShot: () => void
  onDeleteShot: (id: string) => void
}

export default function ShotsPanel({ shots, selectedShotId, onSelectShot, onAddShot, onDeleteShot }: ShotsPanelProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div
      className="h-full flex flex-col shrink-0"
      style={{
        width: 280,
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        background: 'rgba(16, 19, 25, 0.40)',
        borderRight: '0.8px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <span
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '21px',
            letterSpacing: 0.28,
          }}
        >
          SHOTS
        </span>
        <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>
          {shots.length}
        </span>
      </div>

      {/* Shot Cards */}
      <div className="flex flex-col flex-1 overflow-y-auto" style={{ gap: 12 }}>
        {shots.map((shot) => {
          const isSelected = shot.id === selectedShotId
          const isHovered = shot.id === hoveredId

          return (
            <div
              key={shot.id}
              className="w-full relative transition-all cursor-pointer"
              onClick={() => onSelectShot(shot.id)}
              onMouseEnter={() => setHoveredId(shot.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                height: 88,
                borderRadius: 14,
                background: isSelected
                  ? 'rgba(101, 112, 129, 0.39)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: isSelected
                  ? '0.8px solid #657081'
                  : '0.8px solid rgba(255, 255, 255, 0.05)',
                overflow: 'hidden',
              }}
            >
              {/* Delete X */}
              {isHovered && shots.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteShot(shot.id)
                  }}
                  className="absolute flex items-center justify-center transition-all hover:bg-white/10"
                  style={{
                    top: 6,
                    right: 6,
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    zIndex: 10,
                  }}
                >
                  <X size={12} color="#99A1AF" />
                </button>
              )}

              <div
                className="flex items-center"
                style={{
                  height: '100%',
                  paddingLeft: 32,
                  paddingRight: 12,
                  gap: 12,
                }}
              >
                {/* Drag handle */}
                <div
                  className="absolute transition-opacity"
                  style={{
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: isHovered ? 0.5 : 0,
                  }}
                >
                  <GripVertical size={16} color="#6A7282" />
                </div>

                {/* Thumbnail */}
                <div
                  className="shrink-0 flex items-center justify-center overflow-hidden"
                  style={{
                    width: 80,
                    height: 64,
                    borderRadius: 10,
                    background: 'linear-gradient(180deg, #232A34 0%, black 100%)',
                  }}
                >
                  {shot.thumbnail ? (
                    <img
                      src={shot.thumbnail}
                      alt={shot.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image size={20} color="rgba(101, 112, 129, 0.50)" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col items-start" style={{ gap: 4 }}>
                  <span
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: '21px',
                      textAlign: 'left',
                    }}
                  >
                    {shot.name}
                  </span>
                  <span
                    style={{
                      color: '#6A7282',
                      fontSize: 12,
                      lineHeight: '18px',
                    }}
                  >
                    {shot.duration}s
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Add Shot */}
        <button
          onClick={onAddShot}
          className="w-full flex items-center justify-center transition-all hover:brightness-125 shrink-0"
          style={{
            height: 88,
            borderRadius: 14,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '0.8px solid rgba(255, 255, 255, 0.20)',
            gap: 8,
          }}
        >
          <Plus size={20} color="#99A1AF" />
          <span
            style={{
              color: '#99A1AF',
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '21px',
            }}
          >
            Add Shot
          </span>
        </button>
      </div>
    </div>
  )
}
