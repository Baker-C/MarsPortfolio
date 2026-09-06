import { site } from '../content/site'
import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import { ArtPlaceholder } from '../components/ui/ArtPlaceholder'
import { ThemeScope } from '../theme/ThemeContext'
import { ThemeSwitcher } from '../theme/ThemeSwitcher'

/**
 * Nature-editorial mock: one quiet book spread. Verso is a full-bleed fog
 * photograph; recto is the paper page — small-caps running heads, a numbered
 * index of the real pieces (map-legend style), and tipped-in photo squares.
 * Reference boards: reference-theme-photos/FeatureDesign/.
 */
export function Home() {
  const photo = images.hero
  return (
    <ThemeScope designKey="editorial" initialTheme="lilypond">
      <div className="fixed top-3 right-3 z-50">
        <ThemeSwitcher />
      </div>

      <div className="grid h-dvh grid-cols-1 overflow-hidden md:grid-cols-2">
        {/* verso — the photograph */}
        <figure className="relative hidden min-h-0 md:block">
          <ArtPlaceholder slot={photo} />
          {photo.kind === 'photo' && photo.caption && (
            <figcaption className="absolute bottom-3 left-4 font-sans text-[9px] tracking-widest uppercase text-paper/80">
              {photo.caption}
            </figcaption>
          )}
        </figure>

        {/* recto — the paper page */}
        <div className="flex min-h-0 flex-col border-l border-edge bg-paper px-8 py-6 md:px-12 lg:px-16">
          {/* running head */}
          <div className="flex shrink-0 items-baseline justify-between pr-32 font-sans text-[10px] tracking-widest uppercase text-muted">
            <span>{site.name}</span>
            <span>Writing &amp; Editing</span>
            <span>1</span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <h1 className="font-display text-4xl font-light text-ink lg:text-5xl">
              {site.name}
            </h1>
            <p className="mt-2 max-w-md font-body text-sm italic leading-relaxed text-muted lg:text-base">
              {site.tagline}
            </p>
            <span aria-hidden className="mt-6 w-10 border-t border-edge" />

            {/* numbered index, map-legend style */}
            <div className="mt-6 space-y-5">
              {sections.map(({ key, label }) => (
                <section key={key}>
                  <h2 className="font-sans text-[10px] tracking-widest uppercase text-muted">
                    {label}
                  </h2>
                  <ol className="mt-2 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
                    {pieces
                      .filter((piece) => piece.section === key)
                      .map((piece, idx) => (
                        <li key={piece.slug} className="flex gap-3">
                          <span className="w-5 shrink-0 pt-px font-sans text-[10px] text-muted">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <a
                            href={piece.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group min-w-0"
                          >
                            <span className="block font-body text-[13px] leading-snug text-ink transition-colors group-hover:text-accent-2">
                              {piece.title}
                            </span>
                            <span className="block font-sans text-[9px] tracking-wider uppercase text-muted">
                              {piece.venue} · {piece.year}
                            </span>
                          </a>
                        </li>
                      ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>

          {/* tipped-in squares */}
          <div className="flex shrink-0 items-end justify-between gap-6 pb-1">
            <div className="flex gap-3">
              {[images.gallery[2], images.gallery[5], images.gallery[6]].map((slot, i) => (
                <div key={i} className="h-14 w-14 overflow-hidden border border-edge">
                  <ArtPlaceholder slot={slot} />
                </div>
              ))}
            </div>
            <p className="font-sans text-[9px] tracking-widest uppercase text-muted">
              {site.editing.heading} · {site.editing.blurb}
            </p>
          </div>
        </div>
      </div>
    </ThemeScope>
  )
}
