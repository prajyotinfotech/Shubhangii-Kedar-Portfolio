import { useEffect } from 'react'

const selectors = ['.reveal-left', '.reveal-right', '.reveal-scale']

export const useScrollReveal = (deps: any[] = []) => {
  // Whole-section fade-up (hero excluded — it has its own entrance animations)
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main > section:not(#home)'),
    )
    if (!sections.length) return

    sections.forEach((el) => {
      el.classList.add('section-reveal')
      // Sections already at/above the viewport (e.g. reload mid-page) show immediately
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add('in-view')
      }
    })

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            sectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
    )

    sections.forEach((el) => {
      if (!el.classList.contains('in-view')) sectionObserver.observe(el)
    })

    return () => sectionObserver.disconnect()
  }, deps)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selectors.join(', '))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      },
    )

    elements.forEach((el) => {
      // If it's already active, don't observe it again
      if (el.classList.contains('active')) return
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, deps)
}

export default useScrollReveal
