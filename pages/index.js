import Link from 'next/link'
import { useState, useEffect } from 'react'
import PageMeta from '@/components/PageMeta'
import Section from '@/components/Section'
import work from '@/data/work'
import adventures from '@/data/adventures'
import contact from '@/data/contact'
import { getAllThoughts } from '@/lib/mdx'

export async function getStaticProps() {
  const thoughts = getAllThoughts()
  return { props: { thoughts } }
}

export default function Home({ thoughts }) {
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

      <div className="section home-intro" id="top">
        <div className="home-intro-copy">
          <p style={{ marginBottom: '0.75rem' }}>
            hey, i'm sheldon! i'm currently a research intern at{' '}
            <a href="https://www.worldlabs.ai" target="_blank" rel="noopener noreferrer">
              world labs
            </a>
            , on the pre-training team. i also study computer science at the university of waterloo.
          </p>

          <div className="location-badge">
            <span className="location-dot" aria-hidden="true" />
            <span>
              {`i'm currently in ${location || 'sf'}. `}
              <a href="https://cal.com/sheldonblewis" className="coffee-link" target="_blank" rel="noopener noreferrer">
                get a coffee with me
              </a>
              {'!'}
            </span>
          </div>
        </div>

        <div className="home-headshot">
          <img src="/headshot-square.png" alt="sheldon lewis" width="512" height="512" />
        </div>
      </div>

      <nav className="section home-social-links" aria-label="social links">
        <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">polarsteps</a>
        <a href="https://linkedin.com/in/sheldonblewis" target="_blank" rel="noopener noreferrer">linkedin</a>
        <a href="https://instagram.com/_sheldonlewis" target="_blank" rel="noopener noreferrer">instagram</a>
      </nav>

      <Section id="work" title="my work">
        <div className="work-list">
          {work.map((item) => (
            <div key={item.title} className="work-item">
              <div className="work-item-header">
                <span className="work-item-title">
                  {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
                </span>
                <span className="work-item-date">{item.date}</span>
              </div>
              <p className="work-item-description">{item.description}</p>
            </div>
          ))}
        </div>

        <h3 className="section-subheader">resume</h3>
        <figure className="resume-preview">
          <img
            src="/resume-preview.png"
            alt="Sheldon Lewis technical resume"
            width="1530"
            height="1980"
          />
          <a href="/resume.pdf" download className="download-btn resume-download">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            download resume
          </a>
        </figure>
      </Section>

      <Section id="adventures" title="my adventures" subtitle="places and adventures that mean something to me">
        <p>
          check out my{' '}
          <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">
            polarsteps
          </a>
          {' '}for now — more coming soon.
        </p>

        {adventures.length > 0 && (
          <div className="adventures-grid">
            {adventures.map((adventure) => (
              <div key={adventure.name} className="adventure-item">
                <div className="adventure-image">
                  {adventure.image && <img src={adventure.image} alt={adventure.name} />}
                </div>
                <div className="adventure-name">{adventure.name}</div>
                <p className="adventure-description">{adventure.description}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section id="thoughts" title="my thoughts">
        <div className="thoughts-list">
          {thoughts.length > 0 ? (
            thoughts.map((thought) => (
              <Link
                key={thought.slug}
                href={`/thoughts/${thought.slug}`}
                className="thought-item"
              >
                <div className="thought-date">{thought.date}</div>
                <div className="thought-title">{thought.title}</div>
                <p className="thought-preview">{thought.preview}</p>
              </Link>
            ))
          ) : (
            <p className="empty-state">nothing here yet.</p>
          )}
        </div>
      </Section>

      <Section id="contact" title="contact me">
        <div className="contact-links">
          {contact.map((item) => (
            <div key={item.label} className="contact-link">
              <span className="contact-link-label">{item.label}</span>
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
