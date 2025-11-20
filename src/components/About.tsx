import portraitImg from '../assets/3b.png'
// import { aboutStats } from '../data/content'
// import { CountUp } from './CountUp'

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
            {/* <div className="stats">
              {aboutStats.map((stat) => (
                <div className="stat-item" key={stat.label}>
                  <CountUp value={stat.value} className="stat-number" formatter={(v) => `${v}+`} />
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div> */}
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
          <div className="metric">
            <div className="metric-number accent">480K+</div>
            <div className="metric-label">Instagram Followers</div>
          </div>
          <div className="metric">
            <div className="metric-number accent">487K+</div>
            <div className="metric-label">Facebook Followers</div>
          </div>
          <div className="metric">
            <div className="metric-number">540M+</div>
            <div className="metric-label">Views across YouTube</div>
          </div>
          <div className="metric">
            <div className="metric-number">408K+</div>
            <div className="metric-label">YouTube Subscribers</div>
          </div>
          <div className="metric">
            <div className="metric-number">65M+</div>
            <div className="metric-label">Streams across Spotify</div>
          </div>
          <div className="metric">
            <div className="metric-number">750K+</div>
            <div className="metric-label">Spotify Monthly Listeners</div>
          </div>
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
