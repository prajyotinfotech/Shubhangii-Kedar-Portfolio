import type { FormEvent } from 'react'
import { useState } from 'react'

export const Newsletter: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    form.reset()
    setStatus('success')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section id="newsletter" className="newsletter">
      <div className="container newsletter-inner">
        <h3>Stay in the loop</h3>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Your email address" required aria-label="Email" />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
        {status === 'success' && <span className="newsletter-success">Thanks for subscribing!</span>}
      </div>
    </section>
  )
}

export default Newsletter
