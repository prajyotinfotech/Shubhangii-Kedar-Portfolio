import { useMiniPlayer } from '../hooks/useMiniPlayer'

const IconPlay = () => (
  <svg className="icon" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7 5.2v9.6L16 10 7 5.2z" fill="currentColor" />
  </svg>
)

const IconPause = () => (
  <svg className="icon" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7 4h2.8v12H7zM11.6 4h2.8v12h-2.8z" fill="currentColor" />
  </svg>
)

const IconNext = () => (
  <svg className="icon" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5 4.8v10.4L13.4 10 5 4.8zm10 0H13.6v10.4H15z" fill="currentColor" />
  </svg>
)

const IconPrev = () => (
  <svg className="icon" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M15 4.8v10.4L6.6 10 15 4.8zM5 4.8h1.4v10.4H5z" fill="currentColor" />
  </svg>
)

const IconClose = () => (
  <svg className="icon" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const MiniPlayer = () => {
  const {
    audioRef,
    progressRef,
    track,
    isPlaying,
    collapsed,
    setCollapsed,
    time,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    formatTime,
  } = useMiniPlayer()

  if (!track) return null

  const progressPercent = time.duration ? Math.min((time.current / time.duration) * 100, 100) : 0

  return (
    <div className={`mini-player${collapsed ? ' collapsed' : ''}`} id="miniPlayer">
      <div className="mini-track-meta">
        <div
          className="mini-cover"
          style={{
            background: track.color,
            backgroundImage: (track as any).coverSrc ? `url(${(track as any).coverSrc})` : undefined,
            backgroundSize: (track as any).coverSrc ? 'cover' : undefined,
            backgroundPosition: (track as any).coverSrc ? 'center' : undefined,
          }}
        />
        <div className="mini-text">
          <div className="mini-title">{track.title}</div>
          <div className="mini-artist">{track.artist}</div>
        </div>
      </div>

      <div className="mini-progress">
        <span className="progress-time current">{formatTime(time.current)}</span>
        <div
          className="progress-bar"
          ref={progressRef}
          onClick={seek}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={Math.round(time.duration) || 0}
          aria-valuenow={Math.round(time.current) || 0}
        >
          <span className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="progress-time duration">{formatTime(time.duration)}</span>
      </div>

      <div className="mini-controls">
        <button className="mini-btn prev" onClick={prevTrack} aria-label="Previous track">
          <IconPrev />
        </button>
        <button
          className="mini-btn play"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause track' : 'Play track'}
        >
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
        <button className="mini-btn next" onClick={nextTrack} aria-label="Next track">
          <IconNext />
        </button>
      </div>

      <button className="mini-btn mini-close" onClick={() => setCollapsed(true)} aria-label="Collapse player">
        <IconClose />
      </button>

      <button className="mini-btn mini-expand" onClick={() => setCollapsed(false)} aria-label="Expand player">
        <IconPlay />
      </button>

      <audio ref={audioRef} preload="none" />
    </div>
  )
}

export default MiniPlayer
