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

      <div className="section">
        <h1 style={{ marginBottom: '1.5rem' }}>
          a creative representation of work i've done, meaningful experiences, core learnings, and more.
        </h1>

        <p style={{ marginBottom: '0.75rem' }}>
          hey, i'm sheldon! currently studying computer science at the university of waterloo, and working at{' '}
          <a href="https://theory.ventures" target="_blank" rel="noopener noreferrer">
            theory ventures
          </a>
          .
        </p>

        <div className="location-badge">
          <span className="location-dot" />
          <span>
            {location ? `currently in ${location}` : 'currently in sf'}
          </span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>·</span>
          <a href="https://cal.com/sheldonblewis" className="coffee-link" target="_blank" rel="noopener noreferrer">
            get a coffee with me!
          </a>
        </div>
      </div>

      <div className="section">
        <p style={{ marginBottom: '0.75rem' }}>
          this site is under construction as of feb 11, 2026. it will be done by next week, feb 18, 2026.
        </p>
        <p>
          feel free to check out these in the meantime, i think they represent me pretty well :){' '}
          <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">polarsteps</a>
          {' '}and{' '}
          <a href="https://linkedin.com/in/sheldonblewis" target="_blank" rel="noopener noreferrer">linkedin</a>
        </p>
      </div>
    </>
  )
}
