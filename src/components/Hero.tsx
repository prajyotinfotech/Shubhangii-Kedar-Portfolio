import { useRef, useState } from 'react'
import CountUp from './CountUp'
import youtubeIcon from '../assets/icons/youtube.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import musicIcon from '../assets/icons/music.svg'
import slidePrimary from '../assets/3.png'
import slideStudio from '../assets/backofthelatestR.png'
import slideLive from '../assets/6.png'

const HERO_VIDEO = '' // Provide a video URL if available

type HeroAction = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

type HeroSlide = {
  id: string
  image: string
  alt: string
  heading: string[]
  subtitle: string
  actions?: HeroAction[]
}

type PillKind = 'youtube' | 'tracks' | 'instagram'
type PillStat = { kind: PillKind; top?: string; sub?: string; value: number; color: string; delta?: string }
const HERO_PILLS: PillStat[] = [
  { kind: 'youtube', top: 'YouTube channel', sub: 'subscribers', value: 408_000, color: '#FF0000' },
  { kind: 'tracks', top: 'Songs', sub: 'Tracks', value: 58, color: '#1DB954' },
  { kind: 'instagram', top: 'Instagram', sub: 'followers', value: 480_000, color: '#B84DFF' },
]
const heroSlides: HeroSlide[] = [
  {
    id: 'live-neon-stage',
    image: slidePrimary,
    alt: 'Shubhangi Kedar performing live',
    heading: ['Namaskar, I’m Shubhangii Kedar'],
    subtitle: 'A voice rooted in Maharashtra, resonating around the world',
    // actions: [
    //   { label: 'Listen Now', href: '#playlist', variant: 'primary' },
    //   { label: 'Book Me', href: '#contact', variant: 'secondary' },
    // ],
  },
  {
    id: 'studio-microphone',
    image: slideStudio,
    alt: 'Shubhangi Kedar recording in studio',
    heading: ['#Marathi Worldwide Mission'],
    subtitle: 'Join our journey to take Marathi music across oceans',
    actions: [
      // { label: 'Watch Sessions', href: '#playlist', variant: 'primary' },
      // { label: 'Read Journal', href: '#about', variant: 'secondary' },
    ],
  },
  {
    id: 'crowd-concert',
    image: slideLive,
    alt: 'Shubhangi Kedar on stage with vibrant crowd',
    heading: ['Experience the Story behind every Song'],
    subtitle: 'From devotional abhangs to contemporary originals, each melody holds a story',
    actions: [
      // { label: 'View Tour Dates', href: '#events', variant: 'primary' },
      // { label: 'Get Tickets', href: '#events', variant: 'secondary' },
    ],
  },
]

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = heroSlides[activeSlide]
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef(0)

  const goToSlide = (index: number) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length)
  }

  const nextSlide = () => goToSlide(activeSlide + 1)
  const prevSlide = () => goToSlide(activeSlide - 1)

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }

  const onTouchEnd = () => {
    const delta = touchDeltaX.current
    touchStartX.current = null
    touchDeltaX.current = 0
    const threshold = 48
    if (Math.abs(delta) < threshold) return
    if (delta < 0) nextSlide()
    else prevSlide()
  }

  return (
    <section id="home" className="hero">
      <div
        className="hero-slider"
        aria-hidden="true"
        onClick={nextSlide}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide${index === activeSlide ? ' is-active' : ''}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              draggable={false}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding={index === 0 ? 'sync' : 'async'}
            />
          </div>
        ))}
      </div>
      <div className="hero-background" />
      {HERO_VIDEO && (
        <div className="hero-video-wrap">
          <video className="hero-video" autoPlay muted loop playsInline preload="none">
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>
      )}

      <button className="hero-nav hero-nav-prev" onClick={prevSlide} aria-label="Previous slide">
        <span aria-hidden="true">‹</span>
      </button>
      <button className="hero-nav hero-nav-next" onClick={nextSlide} aria-label="Next slide">
        <span aria-hidden="true">›</span>
      </button>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            {currentSlide.heading.map((line) => (
              <span className="line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">{currentSlide.subtitle}</p>
          <div className="hero-pills">
            {HERO_PILLS.map((p, idx) => (
              <div className={`hero-pill ${p.kind}`} key={`${p.kind}-${idx}`}>
                <span className="pill-icon" aria-hidden="true">
                  {p.kind === 'youtube' && <img src={youtubeIcon} alt="" />}
                  {p.kind === 'tracks' && <img src={musicIcon} alt="" />}
                  {p.kind === 'instagram' && <img src={instagramIcon} alt="" />}
                </span>
                <div className="pill-body">
                  {p.top && <span className="pill-top">{p.top}</span>}
                  <span className="pill-value" style={{ color: '#fff' }}>
                    <CountUp value={p.value} />
                  </span>
                  {p.sub && <span className="pill-sub">{p.sub}</span>}
                </div>
                {p.kind === 'instagram' && p.delta && (
                  <span className="pill-delta">{p.delta}</span>
                )}
              </div>
            ))}
          </div>
          {currentSlide.actions && (
            <div className="hero-buttons">
              {currentSlide.actions.map((action) => (
                <a
                  key={`${currentSlide.id}-${action.label}`}
                  href={action.href}
                  className={`btn btn-${action.variant ?? 'primary'}`}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hero-indicators" role="tablist" aria-label="Hero slides">
        {heroSlides.map((slide, index) => (
          <button
            key={`indicator-${slide.id}`}
            type="button"
            className={`hero-indicator${index === activeSlide ? ' active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-pressed={index === activeSlide}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
