import PageMeta from '@/components/PageMeta'
import Section from '@/components/Section'
import timeline from '@/data/timeline'

export default function Me() {
  return (
    <>
      <PageMeta title="me" />

      <Section title="me" subtitle="the chapters so far" />

      <div className="section">
        <div className="timeline">
          {timeline.length > 0 ? (
            timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-title">{item.title}</div>
                <p className="timeline-description">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="empty-state"></p>
          )}
        </div>
      </div>
    </>
  )
}
