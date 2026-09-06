import { Link, useParams } from 'react-router'
import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import {
  DarkFooter,
  EditingSpread,
  PageShell,
  SectionBand,
  WorkSpread,
} from './editorial/parts'

const slugToSection = { creative: 'creative', advocacy: 'professional' } as const

/** Variant B chapter page — scroll through one section's full-bleed spreads. */
export function SectionWorks() {
  const { sectionSlug = '' } = useParams()

  const backBand = (
    <div className="bg-ink py-8 text-center">
      <Link
        to="/b"
        className="border-b border-paper/40 pb-0.5 font-sans text-[10px] tracking-[0.25em] uppercase text-paper/70 transition-colors hover:border-paper hover:text-paper"
      >
        ← Back to the chapters
      </Link>
    </div>
  )

  if (sectionSlug === 'editing') {
    return (
      <PageShell>
        <div className="pt-14">
          <SectionBand label="The Desk" />
          <EditingSpread />
          {backBand}
          <DarkFooter />
        </div>
      </PageShell>
    )
  }

  const key = slugToSection[sectionSlug as keyof typeof slugToSection]
  const section = sections.find((s) => s.key === key)
  const group = key ? pieces.filter((piece) => piece.section === key) : []

  return (
    <PageShell>
      <div className="pt-14">
        {section ? (
          <>
            <SectionBand
              label={`${section.label} — ${String(group.length).padStart(2, '0')} pieces`}
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
          </>
        ) : (
          <SectionBand label="No such chapter" />
        )}
        {backBand}
        <DarkFooter />
      </div>
    </PageShell>
  )
}
