import PageMeta from '@/components/PageMeta'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <PageMeta title="page not found" />

      <main className="not-found-page">
        <div className="not-found-lockup">
          <span className="not-found-code">404</span>
          <span className="not-found-divider" aria-hidden="true" />
          <p>this page cannot be found.</p>
        </div>
        <Link href="/" className="not-found-home">back home</Link>
      </main>
    </>
  )
}
