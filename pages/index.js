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
              {`i'm currently in ${location || 'toronto'}. `}
              <a href="https://cal.com/sheldonblewis" className="coffee-link" target="_blank" rel="noopener noreferrer">
                book a coffee with me!
              </a>
              {' '}
              <a href="https://calendly.com/sheldonblewis/15-minute-meeting" target="_blank" rel="noopener noreferrer">
                (or a call)
              </a>
            </span>
          </div>
        </div>

        <div className="home-headshot">
          <img src="/headshot-square.png" alt="sheldon lewis" width="512" height="512" />
        </div>
      </div>

      <Section id="work" title="my work">
        <div className="work-carousel">
          <ul className="work-carousel-track" tabIndex={0} aria-label="work positions">
            {work.map((item, index) => {
              const card = (
                <>
                  <span className="work-card-meta">
                    <span className="work-card-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="work-card-date">{item.date}</span>
                  </span>
                  <span className="work-card-content">
                    <span className="work-card-title">{item.title}</span>
                    <span className="work-card-role">{item.role}</span>
                  </span>
                </>
              )

              return (
                <li key={item.id} className={`work-card-shell${item.placeholder ? ' placeholder' : ''}`}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="work-card"
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {card}
                    </Link>
                  ) : (
                    <div className="work-card">{card}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="resume-peek">
          <div className="resume-hover-preview" aria-hidden="true">
            <img src="/resume-preview.png" alt="" width="1530" height="1980" loading="lazy" />
          </div>
          <a href="/resume.pdf" download className="download-btn resume-link">
            <span aria-hidden="true">↓</span>
            download resume
          </a>
          <span className="resume-hover-hint">hover to preview</span>
        </div>
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
          {thoughts.map((thought) => (
            <Link
              key={thought.slug}
              href={`/thoughts/${thought.slug}`}
              className="thought-item"
            >
              <div className="thought-date">{thought.date}</div>
              <div className="thought-title">{thought.title}</div>
              <p className="thought-preview">{thought.preview}</p>
            </Link>
          ))}

          <Link href="/veena" className="thought-item">
            <div className="thought-date">2025 — present</div>
            <div className="thought-title">veena</div>
            <p className="thought-preview">
              your access point to the world's technology — an AI brain that builds a complete context model of an organization and helps it operate.
            </p>
          </Link>
        </div>
      </Section>

      <Section id="contact" title="contact me">
        <div className="contact-compact">
          <div className="contact-compact-row">
            <span className="contact-icon" aria-hidden="true">☎</span>
            <a href={contact.phone.href}>{contact.phone.text}</a>
          </div>
          <div className="contact-compact-row">
            <span className="contact-icon" aria-hidden="true">✉</span>
            <div className="contact-email-links">
              {contact.emails.map((email) => (
                <a key={email.href} href={email.href}>{email.text}</a>
              ))}
            </div>
          </div>
        </div>

        <nav className="contact-social-links" aria-label="social links">
          <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">polarsteps</a>
          <a href="https://linkedin.com/in/sheldonblewis" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="https://github.com/sheldonblewis" target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://instagram.com/_sheldonlewis" target="_blank" rel="noopener noreferrer">instagram</a>
        </nav>
      </Section>
    </>
  )
}
