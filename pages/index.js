import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
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
  const [resumeReady, setResumeReady] = useState(false)
  const [resumeButtonHovered, setResumeButtonHovered] = useState(false)
  const [workCarouselAtEnd, setWorkCarouselAtEnd] = useState(false)
  const resumeReadyTimer = useRef(null)

  useEffect(() => {
    fetch('/api/location')
      .then(res => res.json())
      .then(data => {
        if (data.location) setLocation(data.location)
      })
      .catch(() => {})
  }, [])

  useEffect(() => () => window.clearTimeout(resumeReadyTimer.current), [])

  const beginResumePreview = () => {
    window.clearTimeout(resumeReadyTimer.current)
    setResumeReady(false)
    resumeReadyTimer.current = window.setTimeout(() => setResumeReady(true), 220)
  }

  const endResumePreview = () => {
    window.clearTimeout(resumeReadyTimer.current)
    setResumeReady(false)
    setResumeButtonHovered(false)
  }

  const updateWorkCarouselFade = (event) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget
    setWorkCarouselAtEnd(scrollLeft >= scrollWidth - clientWidth - 2)
  }

  return (
    <>
      <PageMeta />

      <div className="section home-intro" id="top">
        <div className="home-intro-copy">
          <p style={{ marginBottom: '0.75rem' }}>
            hey, i'm sheldon! i'm currently a research intern at{' '}
            <a href="https://www.worldlabs.ai" className="subtle-link" target="_blank" rel="noopener noreferrer">
              world labs
            </a>
            , on the pre-training team. i also study computer science at the university of waterloo.
          </p>

          <div className="location-badge">
            <span className="location-dot" aria-hidden="true" />
            <span>
              {`i'm currently in ${location || 'toronto'}. `}
              <a href="https://cal.com/sheldonblewis" className="subtle-link" target="_blank" rel="noopener noreferrer">
                get coffee with me!
              </a>
            </span>
          </div>
        </div>

        <div className="home-headshot">
          <img src="/headshot-square.png" alt="sheldon lewis" width="512" height="512" />
        </div>
      </div>

      <Section id="work" title="my work">
        <div className={`work-carousel${workCarouselAtEnd ? ' work-carousel-at-end' : ''}`}>
          <ul className="work-carousel-track" onScroll={updateWorkCarouselFade} tabIndex={0} aria-label="work positions">
            {work.map((item, index) => {
              const card = (
                <>
                  <span className="work-card-meta">
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

        <div
          className={`resume-peek${resumeReady ? ' resume-ready' : ''}`}
          onMouseEnter={beginResumePreview}
          onMouseLeave={endResumePreview}
        >
          <div className="resume-hover-preview" aria-hidden="true">
            <img src="/resume-preview.png" alt="" width="1530" height="1980" loading="lazy" />
          </div>
          <a
            href="/resume.pdf"
            download
            className="download-btn resume-link"
            aria-disabled={!resumeReady}
            tabIndex={resumeReady ? 0 : -1}
            onMouseEnter={() => setResumeButtonHovered(true)}
            onMouseLeave={() => setResumeButtonHovered(false)}
            onClick={(event) => {
              if (!resumeReady) event.preventDefault()
            }}
          >
            {resumeButtonHovered ? (
              <>
                <span aria-hidden="true">↓</span>
                download resume
              </>
            ) : (
              'view resume'
            )}
          </a>
        </div>
      </Section>

      <Section id="adventures" title="my adventures" subtitle="places that mean something to me">
        <p>
          check out my{' '}
          <a href="https://polarsteps.com/sheldonlewis" className="subtle-link" target="_blank" rel="noopener noreferrer">
            polarsteps
          </a>
          {' '}for now — more to come :)
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
          {thoughts.map((thought, index) => (
            <Link
              key={thought.slug}
              href={`/thoughts/${thought.slug}`}
              className={`thought-item${index === thoughts.length - 1 ? ' thought-item-before-veena' : ''}`}
            >
              <div className="thought-date">{thought.date}</div>
              <div className="thought-title">{thought.title}</div>
              <p className="thought-preview">{thought.preview}</p>
            </Link>
          ))}

          <Link href="/veena" className="thought-item veena-thought-item">
            <div className="thought-date">sep 29, 2025</div>
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
            <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.64a2 2 0 0 1-.45 2.11L8.01 9.74a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.86.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92Z" />
            </svg>
            <a href={contact.phone.href}>{contact.phone.text}</a>
          </div>
          <div className="contact-compact-row">
            <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
              <path d="m4 7 8 5.75L20 7" />
            </svg>
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
