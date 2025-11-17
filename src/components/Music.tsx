import { musicReleases } from '../data/content'

const AlbumArt: React.FC<{ gradient: [string, string] }> = ({ gradient }) => (
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`album-${gradient[0]}-${gradient[1]}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={gradient[0]} />
        <stop offset="100%" stopColor={gradient[1]} />
      </linearGradient>
    </defs>
    <rect width="300" height="300" fill={`url(#album-${gradient[0]}-${gradient[1]})`} />
    <circle cx="150" cy="150" r="80" fill="rgba(255,255,255,0.1)" />
    <circle cx="150" cy="150" r="20" fill="rgba(255,255,255,0.3)" />
  </svg>
)

export const Music: React.FC = () => {
  return (
    <section id="music" className="music">
      <div className="container">
        <h2 className="section-title center">Latest Releases</h2>
        <div className="title-decoration center"></div>
        <div className="music-grid">
          {musicReleases.map((release) => (
            <div className="music-card reveal-scale" key={release.title}>
              <div className="album-art">
                <AlbumArt gradient={release.gradient} />
                <div className="play-button">
                  <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="24" fill="rgba(255,255,255,0.9)" />
                    <polygon points="20,15 35,25 20,35" fill={release.gradient[0]} />
                  </svg>
                </div>
              </div>
              <div className="music-info">
                <h3 className="song-title">{release.title}</h3>
                <p className="song-meta">{release.meta}</p>
                <div className="music-links">
                  {release.links.map((link) => (
                    <a href={link.href} key={link.label} className="music-link">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Music
