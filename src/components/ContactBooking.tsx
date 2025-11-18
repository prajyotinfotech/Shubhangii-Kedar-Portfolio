import { useState } from 'react'

const encode = (data: Record<string, string>) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactBooking: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = String(value)
    })

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'booking', ...data }),
      })
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="booking">
      <div className="container">
        <h2 className="section-title">Book Shubhangii Kedar</h2>
        <div className="title-decoration" />
        <p className="booking-intro">
          Let’s create an unforgettable experience together. For concerts, festivals, corporate events or private performances, please contact our management team.
          Tell us about your event and we’ll tailor a set that fits your audience.
        </p>

        {status === 'success' ? (
          <div className="booking-success">Thank you! We have received your request and will get back to you soon.</div>
        ) : (
          <form
            name="booking"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="booking-form"
          >
            <input type="hidden" name="form-name" value="booking" />
            <input type="hidden" name="subject" value="New booking inquiry from portfolio" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" name="fullName" type="text" required placeholder="Your full name" />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="form-field full">
                <label htmlFor="message">Event Details / Message</label>
                <textarea id="message" name="message" required rows={5} placeholder="Event type, date, venue, audience size, budget, any other details" />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Booking Request'}
              </button>
            </div>

            <p className="privacy-note">
              We respect your privacy. Your information will be used solely for event coordination and will not be shared with third parties.
            </p>
          </form>
        )}

        {status === 'error' && (
          <div className="booking-error">Something went wrong. Please try again or email us directly.</div>
        )}
      </div>
    </section>
  )
}

export default ContactBooking
