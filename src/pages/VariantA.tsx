import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import {
  AboutSpread,
  DarkFooter,
  EditingSpread,
  Hero,
  PageShell,
  SectionDivider,
  WorkSpread,
} from './editorial/parts'

/** Variant A — one continuous scroll: hero collage, about spread, then every
 *  work as a zine spread stacked on the dark ground. */
export function VariantA() {
  return (
    <PageShell>
      <Hero />
      <AboutSpread />
      <div className="space-y-14 bg-ink px-4 py-16 md:space-y-20 md:px-8 md:py-24">
        {sections.map(({ key, label }) => {
          const group = pieces.filter((piece) => piece.section === key)
          return (
            <div key={key} className="space-y-14 md:space-y-20">
              <SectionDivider
                label={`${label} — ${String(group.length).padStart(2, '0')} pieces`}
              />
              {group.map((piece, idx) => (
                <WorkSpread
                  key={piece.slug}
                  piece={piece}
                  slot={images.gallery[(idx + (key === 'professional' ? 3 : 0)) % images.gallery.length]}
                  index={idx}
                  flip={idx % 2 === 1}
                />
              ))}
            </div>
          )
        })}
        <SectionDivider label="The Desk" />
        <EditingSpread />
        <DarkFooter />
      </div>
    </PageShell>
  )
}
