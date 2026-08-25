import { Link, NavLink } from 'react-router'

export type NavEntry = { label: string; href: string; end: boolean }

const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2']

/**
 * Collage masthead: the name on a highlighter scrap, nav links as taped
 * paper chips that straighten on hover, and a hand note back to the chooser.
 */
export function Nav({ name, entries }: { name: string; entries: NavEntry[] }) {
  return (
    <header className="relative z-40 flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 px-5 pt-4 pb-2 pr-32 sm:pr-48">
      <Link to={entries[0]?.href ?? '/'} className="group relative mr-1">
        <span
          aria-hidden
          className="absolute -inset-x-2 inset-y-0 -rotate-2 bg-highlight/60 transition-transform group-hover:rotate-0"
        />
        <span className="relative font-display text-2xl tracking-tight text-ink">
          {name}
        </span>
      </Link>

      <nav className="flex flex-wrap items-center gap-2 font-sans text-xs tracking-widest uppercase">
        {entries.map((entry, i) => (
          <NavLink
            key={entry.href}
            to={entry.href}
            end={entry.end}
            className={({ isActive }) =>
              `border px-2.5 py-1 shadow-sm transition-transform hover:rotate-0 ${tilts[i % tilts.length]} ${
                isActive
                  ? 'border-ink bg-accent text-paper'
                  : 'border-edge bg-surface text-ink hover:border-ink'
              }`
            }
          >
            {entry.label}
          </NavLink>
        ))}
      </nav>

      <Link
        to="/"
        className="ml-auto font-hand text-lg text-muted transition-colors hover:text-accent"
      >
        ← all designs
      </Link>
    </header>
  )
}
