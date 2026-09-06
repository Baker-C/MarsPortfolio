import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import {
  AboutSpread,
  DarkFooter,
  EditingSpread,
  Hero,
  PageShell,
  SectionBand,
  WorkSpread,
} from './editorial/parts'

/** Variant A — one continuous scroll: hero collage, about spread, then every
 *  work as a full-bleed zine spread, grouped under slim register bands. */
export function VariantA() {
  return (
    <PageShell>
      <Hero />
      <AboutSpread />
      {sections.map(({ key, label }) => {
        const group = pieces.filter((piece) => piece.section === key)
        return (
          <div key={key}>
            <SectionBand
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
      <SectionBand label="The Desk" />
      <EditingSpread />
      <DarkFooter />
    </PageShell>
  )
}
