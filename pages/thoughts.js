import Link from 'next/link'
import PageMeta from '@/components/PageMeta'
import Section from '@/components/Section'
import { getAllThoughts } from '@/lib/mdx'

export async function getStaticProps() {
  const thoughts = getAllThoughts()
  return { props: { thoughts } }
}

export default function Thoughts({ thoughts }) {
  return (
    <>
      <PageMeta title="thoughts" />

      <Section title="thoughts" />

      <div className="section">
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
      </div>
    </>
  )
}
