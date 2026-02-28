import { useState } from 'react'
import { Image, Plus, GripVertical, X } from 'lucide-react'

export interface Shot {
  id: string
  name: string
  duration: number
  thumbnail: string | null
  video?: string | null
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
      className="
        flex flex-row md:flex-col
        overflow-x-auto md:overflow-x-hidden md:overflow-y-auto
        w-full md:w-auto
        h-auto md:h-full
        shrink-0
      "
      style={{
        padding: 16,
        background: 'rgba(16, 19, 25, 0.40)',
        gap: 12,
      }}
    >
      {/* Header - desktop only */}
      <div className="hidden md:flex items-center justify-between shrink-0 w-full" style={{ marginBottom: 4, paddingLeft: 8, paddingRight: 8 }}>
        <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '21px', letterSpacing: 0.28 }}>
          SHOTS
        </span>
        <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>
          {shots.length}
        </span>
      </div>

      {/* Shot Cards */}
      {shots.map((shot) => {
        const isSelected = shot.id === selectedShotId
        const isHovered = shot.id === hoveredId

        return (
          <div
            key={shot.id}
            className="relative transition-all cursor-pointer shrink-0 w-[150px] md:w-full"
            onClick={() => onSelectShot(shot.id)}
            onMouseEnter={() => setHoveredId(shot.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              height: 88,
              borderRadius: 14,
              background: isSelected ? 'rgba(101, 112, 129, 0.39)' : 'rgba(255, 255, 255, 0.05)',
              border: isSelected ? '0.8px solid #657081' : '0.8px solid rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
            }}
          >
            {/* Delete X */}
            {isHovered && shots.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteShot(shot.id) }}
                className="absolute flex items-center justify-center transition-all hover:bg-white/10"
                style={{ top: 6, right: 6, width: 20, height: 20, borderRadius: 6, zIndex: 10 }}
              >
                <X size={12} color="#99A1AF" />
              </button>
            )}

            <div className="flex items-center h-full" style={{ paddingLeft: 12, paddingRight: 12, gap: 10 }}>
              {/* Drag handle - desktop only */}
              <div
                className="absolute transition-opacity hidden md:block"
                style={{ left: 8, top: '50%', transform: 'translateY(-50%)', opacity: isHovered ? 0.5 : 0 }}
              >
                <GripVertical size={16} color="#6A7282" />
              </div>

              {/* Thumbnail */}
              <div
                className="shrink-0 flex items-center justify-center overflow-hidden"
                style={{ width: 56, height: 48, borderRadius: 8, background: 'linear-gradient(180deg, #232A34 0%, black 100%)' }}
              >
                {shot.thumbnail ? (
                  <img src={shot.thumbnail} alt={shot.name} className="w-full h-full object-cover" />
                ) : (
                  <Image size={16} color="rgba(101, 112, 129, 0.50)" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col items-start min-w-0" style={{ gap: 2 }}>
                <span className="truncate w-full" style={{ color: 'white', fontSize: 13, fontWeight: 600, lineHeight: '20px', textAlign: 'left' }}>
                  {shot.name}
                </span>
                <span style={{ color: '#6A7282', fontSize: 11, lineHeight: '16px' }}>
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
        className="flex items-center justify-center transition-all hover:brightness-125 shrink-0 w-[150px] md:w-full"
        style={{ height: 88, borderRadius: 14, background: 'rgba(255, 255, 255, 0.05)', border: '0.8px solid rgba(255, 255, 255, 0.20)', gap: 8 }}
      >
        <Plus size={18} color="#99A1AF" />
        <span style={{ color: '#99A1AF', fontSize: 13, fontWeight: 600, lineHeight: '20px' }}>Add Shot</span>
      </button>
    </div>
  )
}
