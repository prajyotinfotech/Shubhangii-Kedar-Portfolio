import portraitImg from '../assets/3b.png'
import { aboutStats } from '../data/content'
import { CountUp } from './CountUp'

export const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
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
            <h2 className="section-title">About Me</h2>
            <div className="title-decoration"></div>
            <p className="about-text">
              My journey began in the small towns of Maharashtra, where devotional songs and folk melodies filled the air. Singing started as something I did for family and friends, but my dream was always bigger: to share our stories and sounds with the world. Today, I’m humbled to see that dream becoming reality. Our community has grown from a handful of listeners to a family that spans continents — with over 540 million views across YouTube and 65 million+ streams on Spotify, including 750 k monthly listeners
              . On social media we connect with 480 k+ Instagram followers and 487 k+ Facebook followers, while our YouTube family has grown to 408 k subscribers
              . Hits like ‘Govyachya Kinaryav’ and ‘Ishkkachi Nauka’ have together crossed more than 43 million streams

            </p>
            <p className="about-text">
              Along the way I’ve released over 50 original songs, earned the Mirchi Music Award for Upcoming Playback Singer, crafted one of the most‑viewed songs in the Marathi language and lent my voice to films in Marathi, Kannada and Hindi
              . Through every performance I remain devoted to preserving the soul of Marathi music while embracing modern influences. Welcome to my world — let’s write the next chapter together
            </p>
            <div className="stats">
              {aboutStats.map((stat) => (
                <div className="stat-item" key={stat.label}>
                  <CountUp value={stat.value} className="stat-number" formatter={(v) => `${v}+`} />
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
