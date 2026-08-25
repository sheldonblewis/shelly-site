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

  useEffect(() => {
    const targetId = window.sessionStorage.getItem('home-scroll-target')
    if (!targetId) return

    window.sessionStorage.removeItem('home-scroll-target')
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [])

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
              {`currently in ${location || 'toronto'}. `}
              <a href="https://cal.com/sheldonblewis" className="subtle-link lift-link" target="_blank" rel="noopener noreferrer">
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
                  {item.domain && (
                    <img
                      className="work-card-logo"
                      src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`}
                      alt=""
                      width="96"
                      height="96"
                    />
                  )}
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
                      className={`work-card${item.tone ? ` work-card--${item.tone}` : ''}`}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {card}
                    </Link>
                  ) : (
                    <div className={`work-card${item.tone ? ` work-card--${item.tone}` : ''}`}>{card}</div>
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

      <Section id="adventures" title="my adventures">
        <p className="adventures-intro">
          places that mean something to me. a small collection of chapters so far. you can also follow along on{' '}
          <a href="https://polarsteps.com/sheldonlewis" className="subtle-link lift-link" target="_blank" rel="noopener noreferrer">
            polarsteps
          </a>.
        </p>

        <div className="adventures-grid">
          {adventures.map((adventure, index) => (
            <article key={adventure.id} className={`adventure-item adventure-item-${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className={`adventure-visual adventure-visual-${adventure.tone}`} aria-hidden="true">
                <span className="adventure-orbit adventure-orbit-one" />
                <span className="adventure-orbit adventure-orbit-two" />
                <span className="adventure-pin" />
                <span className="adventure-marker">{adventure.marker}</span>
              </div>
              <div className="adventure-copy">
                <div className="adventure-years">{adventure.years}</div>
                <h3 className="adventure-name">{adventure.place}</h3>
              </div>
            </article>
          ))}
        </div>
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

          <Link href="/state-machines" className="thought-item">
            <div className="thought-date">aug 25, 2026</div>
            <div className="thought-title">can we create abundance using state machines</div>
          </Link>

          <Link href="/veena" className="thought-item veena-thought-item">
            <div className="thought-date">sep 29, 2025</div>
            <div className="thought-title">thoughts on making technology more accessible</div>
            <p className="thought-preview thought-subtitle">(veena)</p>
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
          <a href="https://x.com/sheldonblewis" target="_blank" rel="noopener noreferrer">
            <svg className="social-icon social-icon-x" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4l14 16M19 4 5 20" /></svg>
            twitter / X
          </a>
          <a href="https://linkedin.com/in/sheldonblewis" target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 10v6M8 7.5v.01M12 16v-3.5a2.5 2.5 0 0 1 5 0V16M12 10v6" /></svg>
            linkedin
          </a>
          <a href="https://github.com/sheldonblewis" target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 19c-4 1.2-4-2-5.6-2.4M18 21v-3.1a3.7 3.7 0 0 0-1-2.9c3.3-.4 6.7-1.6 6.7-7.1a5.5 5.5 0 0 0-1.5-3.8 5.1 5.1 0 0 0-.1-3.8s-1.2-.4-4 1.5a13.7 13.7 0 0 0-7.2 0c-2.8-1.9-4-1.5-4-1.5a5.1 5.1 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5.5 3.4 6.7 6.7 7.1a3.7 3.7 0 0 0-1 2.9V21" /></svg>
            github
          </a>
          <a href="https://sheldonblewis.substack.com" target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14M5 9h14M5 13h14M5 17h14" /></svg>
            substack
          </a>
          <a href="https://instagram.com/_sheldonlewis" target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.5" /><path d="M17.5 6.8v.01" /></svg>
            instagram
          </a>
          <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.25" /></svg>
            polarsteps
          </a>
        </nav>
      </Section>
    </>
  )
}
