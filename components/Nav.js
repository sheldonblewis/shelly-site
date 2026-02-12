import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { href: '/', label: 'home' },
  { href: '/me', label: 'me' },
  { href: '/work', label: 'my work' },
  { href: '/places', label: 'places' },
  { href: '/adventures', label: 'adventures' },
  { href: '/thoughts', label: 'thoughts' },
  { href: '/contact', label: 'contact' },
]

export default function Nav() {
  const router = useRouter()

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          sheldon lewis
        </Link>
        <div className="nav-links">
          {links.slice(1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${router.pathname === href ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
