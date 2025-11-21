import portraitImg from '../assets/3b.png'
import { CountUp } from './CountUp'
import instagramIcon from '../assets/icons/instagram.svg'
import facebookIcon from '../assets/icons/facebook.svg'
import youtubeIcon from '../assets/icons/youtube.svg'
import spotifyIcon from '../assets/icons/spotify.svg'

const ABOUT_METRICS = [
  {
    id: 'instagram-followers',
    category: 'Instagram',
    label: 'Followers',
    value: 480_000,
    display: '480K+',
    icon: instagramIcon,
    accent: '#E4405F',
  },
  {
    id: 'facebook-followers',
    category: 'Facebook',
    label: 'Followers',
    value: 487_000,
    display: '487K+',
    icon: facebookIcon,
    accent: '#1877F2',
  },
  {
    id: 'youtube-views',
    category: 'YouTube',
    label: 'Views',
    value: 540_000_000,
    display: '540M+',
    icon: youtubeIcon,
    accent: '#FF0033',
  },
  {
    id: 'youtube-subs',
    category: 'YouTube',
    label: 'Subscribers',
    value: 408_000,
    display: '408K+',
    icon: youtubeIcon,
    accent: '#FF0033',
  },
  {
    id: 'spotify-streams',
    category: 'Spotify',
    label: 'Streams',
    value: 65_000_000,
    display: '65M+',
    icon: spotifyIcon,
    accent: '#1DB954',
  },
  {
    id: 'spotify-monthly',
    category: 'Spotify',
    label: 'Monthly Listeners',
    value: 750_000,
    display: '750K+',
    icon: spotifyIcon,
    accent: '#1DB954',
  },
]

export const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        {/* Hero split: image + intro */}
        <div className="about-grid">
          <div className="about-image reveal-left">
            <div className="image-wrapper">
              <div className="image-placeholder">
                <img src={portraitImg} alt="Portrait of Shubhangi Kedar" />
              </div>
              <div className="image-decoration"></div>
            </div>
          </div>
          <div className="about-content reveal-right">
            <h2 className="section-title">About</h2>
            <div className="title-decoration"></div>
            <p className="about-text">
              Known for popular songs like <strong>Govyachya Kinaryav</strong>, <strong>Kokan Kokan</strong>, <strong>Tuji Feeling</strong>, <strong>Sanj Rangali</strong> and many more, Shubhangii is a pioneer in Marathi independent music, blending traditional and modern sounds to craft her style.
            </p>
            <p className="about-text">
              With a growing fanbase and a goal to take Marathi music worldwide, she has made a strong mark as a performer who deeply connects with her audience. Her powerful stage presence, sweet voice, and creative approach make her a standout in the indie music scene.
            </p>
          </div>
        </div>

        {/* Performance banner */}
        <div className="about-banner reveal-scale">
          <p>
            <strong>PERFORMED ACROSS <span className="accent">25+ CITIES</span> WITH</strong>
            <br />
            <strong className="accent">30,000+ FOOTFALL</strong>
          </p>
        </div>

        {/* The Show description */}
        <div className="about-show reveal-scale">
          <h3 className="about-subtitle">The Show</h3>
          <p>
            Shubhangii Kedar Live is <strong>not just a concert</strong>; it’s a personally designed <strong>musical experience</strong>. The show takes the audience on an <strong>emotional roller coaster</strong>, blending Shubhangii’s originals with engaging storytelling by the lyricist. Each song carries its own story, creating a deep connection with the audience. The journey culminates with the rich flavors of <em>Marathi folk music</em> that bring the roots of Maharashtra to life. It’s a <strong>complete package of entertainment</strong> — soulful, powerful, and unforgettable.
          </p>
        </div>

        {/* Social presence metrics */}
        <div className="about-metrics reveal-scale">
          {ABOUT_METRICS.map((metric) => (
            <div className="about-metric-card" key={metric.id}>
              <div className="about-metric-icon" style={{ backgroundColor: `${metric.accent}22` }}>
                <img src={metric.icon} alt="" />
              </div>
              <div className="about-metric-body">
                <span className="about-metric-category">{metric.category}</span>
                <CountUp
                  value={metric.value}
                  className="about-metric-value"
                  formatter={() => metric.display}
                />
                <span className="about-metric-label">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="about-achievements reveal-scale">
          <h3 className="about-subtitle">Achievements</h3>
          <ul className="about-list">
            <li><strong>50+ Originals</strong></li>
            <li>
              Independently crafted the <strong>second most viewed</strong> song in Marathi language
            </li>
            <li>
              <strong>Mirchi Music Award</strong> Winner for Upcoming Playback Singer
            </li>
            <li>
              Playback for movies across different languages like <strong>Marathi, Kannada and Hindi</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
