import { useState, useEffect } from 'react'
import PageMeta from '@/components/PageMeta'

export default function Home() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    fetch('/api/location')
      .then(res => res.json())
      .then(data => {
        if (data.location) setLocation(data.location)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <PageMeta />

      <div className="section home-intro">
        <div className="home-intro-copy">
          <p style={{ marginBottom: '0.75rem' }}>
            hey, i'm sheldon! i'm currently a research intern at{' '}
            <a href="https://www.worldlabs.ai" target="_blank" rel="noopener noreferrer">
              world labs
            </a>
            , working on pre-training. i also study computer science at the university of waterloo.
          </p>

          <div className="location-badge">
            <span className="location-dot" aria-hidden="true" />
            <span>
              {`i'm currently in ${location || 'sf'}. (`}
              <a href="https://cal.com/sheldonblewis" className="coffee-link" target="_blank" rel="noopener noreferrer">
                get coffee with me
              </a>
              {')!'}
            </span>
          </div>
        </div>

        <div className="home-headshot">
          <img src="/headshot.jpg" alt="sheldon lewis" width="1312" height="1312" />
        </div>
      </div>

      <nav className="section home-social-links" aria-label="social links">
        <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">polarsteps</a>
        <a href="https://linkedin.com/in/sheldonblewis" target="_blank" rel="noopener noreferrer">linkedin</a>
        <a href="https://instagram.com/_sheldonlewis" target="_blank" rel="noopener noreferrer">instagram</a>
      </nav>
    </>
  )
}
