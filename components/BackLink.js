import Link from 'next/link'

export default function BackLink({ href = '/', scrollTarget, children }) {
  const rememberScrollTarget = () => {
    if (scrollTarget) window.sessionStorage.setItem('home-scroll-target', scrollTarget)
  }

  return (
    <div className="back-link">
      <Link href={href} onClick={rememberScrollTarget}>
        ← {children}
      </Link>
    </div>
  )
}
