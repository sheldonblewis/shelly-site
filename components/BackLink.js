import Link from 'next/link'

export default function BackLink({ href, children }) {
  return (
    <div className="back-link">
      <Link href={href}>
        ← {children}
      </Link>
    </div>
  )
}
