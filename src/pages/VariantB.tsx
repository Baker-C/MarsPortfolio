import { Link } from 'react-router'
import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import { site } from '../content/site'
import { ArtPlaceholder } from '../components/ui/ArtPlaceholder'
import { AboutSpread, DarkFooter, Hero, PageShell } from './editorial/parts'

/** Variant B — same hero and about, then each section as a zine cover card
 *  that opens its own scrolling page of works. */
export function VariantB() {
  const covers = [
    ...sections.map(({ key, label }, i) => ({
      slug: key === 'professional' ? 'advocacy' : key,
      label,
      note: `${String(pieces.filter((p) => p.section === key).length).padStart(2, '0')} pieces`,
      slot: images.gallery[i === 0 ? 0 : 6],
    })),
    { slug: 'editing', label: site.editing.heading, note: 'freelance', slot: images.gallery[1] },
  ]

  return (
    <PageShell>
      <Hero />
      <AboutSpread />
      <div className="bg-ink px-4 py-16 md:px-8 md:py-24">
        <p className="text-center font-sans text-[10px] tracking-[0.35em] uppercase text-paper/60">
          The chapters
        </p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
          {covers.map((cover) => (
            <Link
              key={cover.slug}
              to={`/b/${cover.slug}`}
              className="group flex aspect-[3/4] flex-col bg-paper shadow-2xl transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-1/2 overflow-hidden">
                <ArtPlaceholder slot={cover.slot} />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
                <h3 className="font-display text-lg font-light tracking-[0.3em] uppercase text-ink transition-colors group-hover:text-accent-2">
                  {cover.label}
                </h3>
                <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-muted">
                  {cover.note}
                </p>
                <span
                  aria-hidden
                  className="mt-1 font-sans text-[10px] text-muted transition-colors group-hover:text-accent-2"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <DarkFooter />
      </div>
    </PageShell>
  )
}
