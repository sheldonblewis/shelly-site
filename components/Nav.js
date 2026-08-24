import Link from 'next/link'

const links = [
  { id: 'work', label: 'my work' },
  { id: 'adventures', label: 'my adventures' },
  { id: 'thoughts', label: 'my thoughts' },
  { id: 'contact', label: 'contact me' },
]

export default function Nav() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          sheldon lewis
        </Link>
        <div className="nav-links">
          {links.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="nav-link"
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
