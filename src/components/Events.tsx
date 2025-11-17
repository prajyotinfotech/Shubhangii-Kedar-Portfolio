import { events } from '../data/content'

export const Events: React.FC = () => {
  return (
    <section id="events" className="events">
      <div className="container">
        <h2 className="section-title center">Upcoming Shows</h2>
        <div className="title-decoration center"></div>
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card reveal-scale" key={event.title}>
              <div className="event-date">
                <span className="day">{event.day}</span>
                <span className="month">{event.month}</span>
              </div>
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-meta">{event.meta}</p>
              </div>
              <a className="btn btn-primary event-btn" href={event.ticketUrl}>
                Tickets
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
