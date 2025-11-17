import { useEffect, useState } from 'react'
import concertMic from '../assets/microphone.png'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const HangingMic: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId = 0

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const maxScrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const next = clamp(scrollTop / maxScrollable, 0, 1)

      rafId = window.requestAnimationFrame(() => {
        setProgress((prev) => (Math.abs(prev - next) > 0.003 ? next : prev))
      })
    }

    const onScroll = () => updateProgress()
    const onResize = () => updateProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  const baseWire = 110
  const extraWire = 380
  const wireLength = baseWire + extraWire * progress
  const swing = Math.sin(progress * Math.PI) * 5
  const bob = Math.sin(progress * Math.PI * 1.5) * 3

  return (
    <div className="hanging-mic" aria-hidden="true">
      <div className="mic-wire" style={{ height: `${wireLength}px` }}>
        <div className="mic-wire-glow" />
      </div>
      <div
        className="mic-body"
        style={{ transform: `translateY(${bob}px) rotate(${swing * 0.4}deg)` }}
      >
        <img src={concertMic} alt="" className="mic-image" draggable={false} />
      </div>
    </div>
  )
}

export default HangingMic
