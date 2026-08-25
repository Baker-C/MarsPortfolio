import { Link, NavLink } from 'react-router'

export type PosterNavItem = { label: string; href: string; end: boolean }

/**
 * Poster masthead: oversized index numbers, uppercase display labels,
 * and a small escape hatch back to the design chooser.
 */
export function PosterNav({ items }: { items: PosterNavItem[] }) {
  return (
    <header className="flex shrink-0 items-end justify-between gap-4 border-b-2 border-ink bg-paper py-2 pr-40 pl-4 md:pr-56 md:pl-8">
      <Link
        to="/"
        className="font-sans text-xs tracking-widest text-muted uppercase transition-colors hover:text-accent"
        title="Back to design chooser"
      >
        ← Index
      </Link>

      <nav className="flex items-end gap-4 md:gap-8">
        {items.map((item, i) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              `group flex items-baseline gap-1.5 font-display uppercase leading-none transition-colors ${
                isActive ? 'text-accent' : 'text-ink hover:text-accent'
              }`
            }
          >
            <span className="text-2xl font-bold tracking-tighter md:text-4xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="hidden font-sans text-xs tracking-widest sm:inline">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
