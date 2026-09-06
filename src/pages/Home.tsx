import { pieces, sections } from '../content/writing'
import {
  AboutSpread,
  AdvocacyFeature,
  CreativeFeature,
  DarkFooter,
  EditingFeature,
  Hero,
  PageShell,
} from './editorial/parts'

/** Home — the whole site as one scroll: hero collage, about spread, then each
 *  chapter section carrying its work links directly. */
export function Home() {
  const creative = pieces.filter((p) => p.section === 'creative')
  const professional = pieces.filter((p) => p.section === 'professional')

  return (
    <PageShell>
      <Hero />
      <AboutSpread />
      <CreativeFeature
        number="01"
        label={sections[0].label}
        note={`${String(creative.length).padStart(2, '0')} pieces`}
        pieces={creative}
      />
      <AdvocacyFeature
        number="02"
        label={sections[1].label}
        note={`${String(professional.length).padStart(2, '0')} pieces`}
        pieces={professional}
      />
      <EditingFeature number="03" />
      <DarkFooter />
    </PageShell>
  )
}
