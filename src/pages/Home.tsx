import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import { site } from '../content/site'
import {
  AboutSpread,
  ChapterSection,
  CreativeFeature,
  DarkFooter,
  Hero,
  PageShell,
} from './editorial/parts'

/** Home — the chapter scroll: hero collage, about spread, then each chapter
 *  as its own full-viewport section linking into its page. */
export function Home() {
  const chapters = [
    ...sections.map(({ key, label }) => ({
      to: `/${key === 'professional' ? 'advocacy' : key}`,
      label,
      note: `${String(pieces.filter((p) => p.section === key).length).padStart(2, '0')} pieces`,
      slot: images.gallery[key === 'professional' ? 6 : 0],
    })),
    {
      to: '/editing',
      label: site.editing.heading,
      note: 'freelance',
      slot: images.gallery[1],
    },
  ]

  return (
    <PageShell>
      <Hero />
      <AboutSpread />
      <CreativeFeature
        to="/creative"
        number="01"
        label={chapters[0].label}
        note={chapters[0].note}
        titles={pieces.filter((p) => p.section === 'creative').map((p) => p.title)}
      />
      {chapters.slice(1).map((chapter, idx) => (
        <ChapterSection
          key={chapter.to}
          to={chapter.to}
          number={String(idx + 2).padStart(2, '0')}
          label={chapter.label}
          note={chapter.note}
          slot={chapter.slot}
          flip={idx % 2 === 0}
        />
      ))}
      <DarkFooter />
    </PageShell>
  )
}
