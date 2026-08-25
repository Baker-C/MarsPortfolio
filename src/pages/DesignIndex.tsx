import { Link } from 'react-router'
import { site } from '../content/site'

const designs = [
  {
    path: '/design1',
    name: 'Design 1 — Field Journal',
    blurb:
      'An editorial book spread: cream paper, serif columns, thin rules, page numbers. Reads like a printed folio.',
  },
  {
    path: '/design2',
    name: 'Design 2 — Poster',
    blurb:
      'Large display type over full-bleed color fields. Every page composed like a print poster.',
  },
  {
    path: '/design3',
    name: 'Design 3 — Collage',
    blurb:
      'A layered zine: framed cards, rotated scraps, stamps and pressed-flower marks over textured paper.',
  },
]

export function DesignIndex() {
  return (
    <main
      data-theme="sunset"
      className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-paper px-6 font-body text-ink"
    >
      <header className="text-center">
        <p className="font-sans text-sm tracking-[0.3em] text-muted uppercase">
          {site.name} · portfolio design lab
        </p>
        <h1 className="mt-3 font-display text-5xl font-medium">
          Three takes, one portfolio
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted">
          Same writing, same palettes — three different sites. Pick a door.
          Each design has its own color-theme switcher in the top right.
        </p>
      </header>

      <nav className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {designs.map((d) => (
          <Link
            key={d.path}
            to={d.path}
            className="group rounded-2xl border border-edge bg-surface/60 p-6 transition-all hover:-translate-y-1 hover:bg-surface"
          >
            <h2 className="font-display text-xl font-semibold group-hover:text-accent-2">
              {d.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d.blurb}</p>
            <span className="mt-4 inline-block font-sans text-sm text-accent">
              Enter →
            </span>
          </Link>
        ))}
      </nav>
    </main>
  )
}
