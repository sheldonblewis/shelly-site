import PageMeta from '@/components/PageMeta'
import Section from '@/components/Section'
import places from '@/data/places'

export default function Places() {
  return (
    <>
      <PageMeta title="places" />

      <Section title="places" subtitle="places that mean something to me" />

      <div className="section">
        <p>
          check out my{' '}
          <a href="https://polarsteps.com/sheldonlewis" target="_blank" rel="noopener noreferrer">
            polarsteps
          </a>
          {' '}for now — more coming soon.
        </p>
      </div>

      {places.length > 0 && (
        <div className="section">
          <div className="places-grid">
            {places.map((place, i) => (
              <div key={i} className="place-item">
                <div className="place-image">
                  {place.image && <img src={place.image} alt={place.name} />}
                </div>
                <div className="place-name">{place.name}</div>
                <p className="place-description">{place.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
