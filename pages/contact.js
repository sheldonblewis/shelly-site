import PageMeta from '@/components/PageMeta'
import Section from '@/components/Section'
import contact from '@/data/contact'

export default function Contact() {
  return (
    <>
      <PageMeta title="contact" />

      <Section title="contact" />

      <div className="section">
        <div className="contact-links">
          {contact.length > 0 ? (
            contact.map((item, i) => (
              <div key={i} className="contact-link">
                <span className="contact-link-label">{item.label}</span>
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.text}
                </a>
              </div>
            ))
          ) : (
            <p className="empty-state">nothing here yet.</p>
          )}
        </div>
      </div>
    </>
  )
}
