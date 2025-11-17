import CountUp from './CountUp'
import { featureStats } from '../data/content'

export const FeatureBar: React.FC = () => {
  return (
    <section id="features" className="feature-bar">
      <div className="container feature-grid">
        {featureStats.map((stat) => (
          <div key={stat.label} className="feature-item">
            <CountUp value={stat.value} className="feature-number" />
            <p className="feature-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeatureBar
