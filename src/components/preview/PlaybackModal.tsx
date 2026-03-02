import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, X, Plus, Trash2 } from 'lucide-react'
import type { Shot } from './ShotsPanel'

interface PlaybackModalProps {
  shots: Shot[]
  onClose: () => void
  onDeleteShot: (id: string) => void
  onAddShot: () => void
}

export default function PlaybackModal({ shots, onClose, onDeleteShot, onAddShot }: PlaybackModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shotProgress, setShotProgress] = useState(0) // 0-1 within current shot

  const playableShots = shots.filter((s) => s.video)
  const totalDuration = playableShots.reduce((sum, s) => sum + s.duration, 0)

  // Advance to next shot when current video ends
  const handleEnded = useCallback(() => {
    if (currentIndex < playableShots.length - 1) {
      setCurrentIndex((i) => i + 1)
      setShotProgress(0)
    } else {
      // Loop back to beginning
      setCurrentIndex(0)
      setShotProgress(0)
    }
  }, [currentIndex, playableShots.length])

  // Auto-play when shot changes
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    if (playing) v.play().catch(() => {})
  }, [currentIndex, playing])

  // Track time for progress
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => {
      if (v.duration && Number.isFinite(v.duration)) {
        setShotProgress(v.currentTime / v.duration)
      }
    }
    v.addEventListener('timeupdate', onTime)
    return () => v.removeEventListener('timeupdate', onTime)
  }, [currentIndex])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.pause()
    } else {
      v.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  const jumpToShot = (index: number) => {
    setCurrentIndex(index)
    setShotProgress(0)
    if (!playing) setPlaying(true)
  }

  const handleDeleteShot = (e: React.MouseEvent, shotId: string) => {
    e.stopPropagation()
    const shotIndex = playableShots.findIndex((s) => s.id === shotId)
    if (playableShots.length <= 1) return
    onDeleteShot(shotId)
    if (shotIndex <= currentIndex && currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }

  // Compute cumulative offsets for timeline
  const cumulativeOffsets: number[] = []
  let acc = 0
  for (const s of playableShots) {
    cumulativeOffsets.push(acc)
    acc += s.duration
  }

  // Global playhead position as percentage
  const globalProgress = totalDuration > 0
    ? ((cumulativeOffsets[currentIndex] || 0) + shotProgress * playableShots[currentIndex]?.duration) / totalDuration * 100
    : 0

  const currentShot = playableShots[currentIndex]

  if (!currentShot) return null

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ zIndex: 400, background: 'rgba(0, 0, 0, 0.92)' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute flex items-center justify-center transition-all hover:bg-white/10"
        style={{ top: 16, right: 16, width: 40, height: 40, borderRadius: 10, zIndex: 10 }}
      >
        <X size={20} color="#99A1AF" />
      </button>

      {/* Shot name */}
      <div className="absolute" style={{ top: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '21px', letterSpacing: 0.28 }}>
          {currentShot.name}
        </span>
      </div>

      {/* Video area */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          maxWidth: 960,
          aspectRatio: '16 / 9',
          borderRadius: 16,
          background: 'black',
          border: '0.8px solid rgba(255, 255, 255, 0.10)',
          margin: '0 24px',
        }}
      >
        <video
          ref={videoRef}
          key={currentShot.id}
          src={currentShot.video!}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Play/Pause overlay on click */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={togglePlay}
        />
      </div>

      {/* Bottom controls */}
      <div
        className="w-full flex flex-col items-center"
        style={{ maxWidth: 960, padding: '20px 24px 24px', gap: 16 }}
      >
        {/* Global progress bar */}
        <div className="w-full relative" style={{ height: 4, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.10)' }}>
          <div
            style={{
              width: `${globalProgress}%`,
              height: 4,
              borderRadius: 9999,
              background: '#0A82DF',
              transition: 'width 0.15s linear',
            }}
          />
        </div>

        {/* Play button + timeline segments */}
        <div className="w-full flex items-center" style={{ gap: 12 }}>
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center shrink-0 transition-all hover:brightness-125"
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              background: 'rgba(255, 255, 255, 0.10)',
              border: '0.8px solid rgba(255, 255, 255, 0.10)',
            }}
          >
            {playing ? <Pause size={16} color="white" /> : <Play size={16} color="white" style={{ marginLeft: 2 }} />}
          </button>

          {/* Shot segments */}
          <div className="flex-1 flex items-center" style={{ gap: 6 }}>
            {playableShots.map((shot, i) => {
              const isActive = i === currentIndex
              const widthPercent = totalDuration > 0 ? (shot.duration / totalDuration) * 100 : 100 / playableShots.length

              return (
                <div
                  key={shot.id}
                  onClick={() => jumpToShot(i)}
                  className="relative group cursor-pointer flex items-center"
                  style={{
                    width: `${widthPercent}%`,
                    height: 48,
                    borderRadius: 10,
                    background: isActive ? 'rgba(10, 130, 223, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid rgba(10, 130, 223, 0.40)' : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '0 10px',
                    transition: 'all 0.15s ease',
                    overflow: 'hidden',
                  }}
                >
                  {/* Thumbnail strip */}
                  {shot.thumbnail && (
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url(${shot.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  )}

                  {/* Shot info */}
                  <div className="relative flex items-center justify-between w-full min-w-0" style={{ gap: 4 }}>
                    <div className="flex items-center min-w-0" style={{ gap: 6 }}>
                      <span
                        className="truncate"
                        style={{
                          color: isActive ? 'white' : '#99A1AF',
                          fontSize: 11,
                          fontWeight: 600,
                          lineHeight: '16px',
                        }}
                      >
                        {shot.name}
                      </span>
                      <span style={{ color: '#6A7282', fontSize: 10, lineHeight: '14px', flexShrink: 0 }}>
                        {shot.duration}s
                      </span>
                    </div>

                    {/* Delete button */}
                    {playableShots.length > 1 && (
                      <button
                        onClick={(e) => handleDeleteShot(e, shot.id)}
                        className="shrink-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                        style={{ width: 22, height: 22, borderRadius: 6 }}
                      >
                        <Trash2 size={11} color="#99A1AF" />
                      </button>
                    )}
                  </div>

                  {/* Active shot fill progress */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 pointer-events-none"
                      style={{
                        width: `${shotProgress * 100}%`,
                        background: 'rgba(10, 130, 223, 0.12)',
                        transition: 'width 0.15s linear',
                      }}
                    />
                  )}
                </div>
              )
            })}

            {/* Add shot button */}
            <button
              onClick={onAddShot}
              className="shrink-0 flex items-center justify-center transition-all hover:brightness-125 hover:bg-white/10"
              style={{
                width: 36,
                height: 48,
                borderRadius: 10,
                border: '1px dashed rgba(255, 255, 255, 0.15)',
              }}
            >
              <Plus size={14} color="#99A1AF" />
            </button>
          </div>

          {/* Time display */}
          <span className="shrink-0" style={{ color: '#6A7282', fontSize: 12, fontWeight: 500, lineHeight: '18px', minWidth: 40, textAlign: 'right' }}>
            {totalDuration.toFixed(1)}s
          </span>
        </div>
      </div>
    </div>
  )
}
