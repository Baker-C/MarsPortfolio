import { site } from '../content/site'
import { pieces, sections } from '../content/writing'
import { ThemeScope } from '../theme/ThemeContext'
import { ThemeSwitcher } from '../theme/ThemeSwitcher'

/**
 * Clean-slate base page. Deliberately design-free: it proves the shell,
 * tokens, themes, and content are all wired while the next design direction
 * is decided. The three previous design versions live in git history
 * (feature/real-content and earlier).
 */
export function Base() {
  return (
    <ThemeScope designKey="base">
      <div className="fixed top-3 right-3 z-50">
        <ThemeSwitcher />
      </div>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="font-display text-3xl">{site.name}</h1>
        <p className="mt-1 font-body italic text-muted">{site.tagline}</p>

        {sections.map(({ key, label }) => (
          <section key={key} className="mt-8">
            <h2 className="font-sans text-xs tracking-widest uppercase text-muted">
              {label}
            </h2>
            <ul className="mt-2">
              {pieces
                .filter((piece) => piece.section === key)
                .map((piece) => (
                  <li key={piece.slug} className="border-t border-edge py-2 text-sm">
                    <a
                      href={piece.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-body text-ink hover:text-accent"
                    >
                      {piece.title}
                    </a>
                    <span className="text-muted">
                      {' '}
                      — {piece.venue} · {piece.year}
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="font-sans text-xs tracking-widest uppercase text-muted">
            {site.editing.heading}
          </h2>
          <p className="mt-2 text-sm text-muted">{site.editing.blurb}</p>
        </section>
      </main>
    </ThemeScope>
  )
}
