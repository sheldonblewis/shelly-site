import Link from 'next/link'

const links = [
  { href: '/#work', label: 'my work' },
  { href: '/#adventures', label: 'my adventures' },
  { href: '/#thoughts', label: 'my thoughts' },
  { href: '/#contact', label: 'contact me' },
]

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          sheldon lewis
        </Link>
        <div className="nav-links">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
