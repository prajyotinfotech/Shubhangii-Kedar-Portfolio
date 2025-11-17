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
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const step = Math.max(1, Math.floor(value / (duration / 16)))
    let frame: number

    const animate = () => {
      setDisplay((prev) => {
        const next = prev + step
        if (next < value) {
          frame = requestAnimationFrame(animate)
          return next
        }
        cancelAnimationFrame(frame)
        return value
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            frame = requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [duration, hasAnimated, value])

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
