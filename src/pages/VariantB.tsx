import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import { site } from '../content/site'
import { AboutSpread, ChapterSection, DarkFooter, Hero, PageShell } from './editorial/parts'

/** Variant B — hero and about, then each chapter as its own full-viewport
 *  section in the scroll; entering one opens its own scrolling page. */
export function VariantB() {
  const chapters = [
    ...sections.map(({ key, label }) => ({
      to: `/b/${key === 'professional' ? 'advocacy' : key}`,
      label,
      note: `${String(pieces.filter((p) => p.section === key).length).padStart(2, '0')} pieces`,
      slot: images.gallery[key === 'professional' ? 6 : 0],
    })),
    {
      to: '/b/editing',
      label: site.editing.heading,
      note: 'freelance',
      slot: images.gallery[1],
    },
  ]

  return (
    <PageShell>
      <Hero />
      <AboutSpread />
      {chapters.map((chapter, idx) => (
        <ChapterSection
          key={chapter.to}
          to={chapter.to}
          number={String(idx + 1).padStart(2, '0')}
          label={chapter.label}
          note={chapter.note}
          slot={chapter.slot}
          flip={idx % 2 === 1}
        />
      ))}
      <DarkFooter />
    </PageShell>
  )
}
