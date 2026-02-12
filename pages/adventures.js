import PageMeta from '@/components/PageMeta'
import Section from '@/components/Section'
import adventures from '@/data/adventures'

export default function Adventures() {
  return (
    <>
      <PageMeta title="adventures" />

      <Section title="adventures" />

      <div className="section">
        <p>
          check out my{' '}
          <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">
            polarsteps
          </a>
          {' '}for now — more coming soon.
        </p>
      </div>

      {adventures.length > 0 && (
        <div className="section">
          <div className="adventures-grid">
            {adventures.map((adventure, i) => (
              <div key={i} className="adventure-item">
                <div className="adventure-image">
                  {adventure.image && <img src={adventure.image} alt={adventure.name} />}
                </div>
                <div className="adventure-name">{adventure.name}</div>
                <p className="adventure-description">{adventure.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
