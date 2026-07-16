import PageMeta from '@/components/PageMeta'
import Section from '@/components/Section'
import work from '@/data/work'

export default function Work() {
  return (
    <>
      <PageMeta title="my work" />

      <Section title="my work" />

      <div className="section">
        <div className="work-list">
          {work.length > 0 ? (
            work.map((item, i) => (
              <div key={i} className="work-item">
                <div className="work-item-header">
                  <span className="work-item-title">
                    {item.href ? <a href={item.href}>{item.title}</a> : item.title}
                  </span>
                  <span className="work-item-date">{item.date}</span>
                </div>
                <p className="work-item-description">{item.description}</p>
              </div>
            ))
          ) : null}
        </div>
      </div>

      <Section title="future">
        <div className="future-links">
          <span className="future-project">agentic personal assistant</span>
          <span className="subtle-link">
            unified LLM interface for admin & task management — visualizes and sources from Notes, Messages, work/school/personal email, open PRs, Google Calendar, and Google Tasks. call it whenever an idea, thought, takeaway, deadline, or question comes up; it auto-classifies and updates my data representation
          </span>
        </div>
      </Section>

      <div className="section">
        <a href="/resume.pdf" download className="download-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          download resume
        </a>
      </div>
    </>
  )
}
