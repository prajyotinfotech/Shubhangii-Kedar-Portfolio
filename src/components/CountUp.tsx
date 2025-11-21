import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: number
  duration?: number
  formatter?: (value: number) => string
  className?: string
}

export const CountUp = ({
  value,
  duration = 1600,
  formatter,
  className,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame: number | null = null

    const startAnimation = () => {
      let start: number | null = null

      const tick = (timestamp: number) => {
        if (start === null) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic for smooth finish
        const next = Math.round(eased * value)
        setDisplay(next)

        if (progress < 1) {
          frame = requestAnimationFrame(tick)
        }
      }

      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            startAnimation()
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [duration, value])

  useEffect(() => {
    hasAnimatedRef.current = false
    setDisplay(0)
  }, [value, duration])

  const formatted = formatter
    ? formatter(Math.min(display, value))
    : Math.min(display, value).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}

export default CountUp
