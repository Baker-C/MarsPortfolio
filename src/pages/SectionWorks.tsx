import { Link, useParams } from 'react-router'
import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import {
  DarkFooter,
  EditingSpread,
  PageShell,
  SectionDivider,
  WorkSpread,
} from './editorial/parts'

const slugToSection = { creative: 'creative', advocacy: 'professional' } as const

/** Variant B chapter page — scroll through one section's works as spreads. */
export function SectionWorks() {
  const { sectionSlug = '' } = useParams()

  const back = (
    <div className="pb-10 text-center">
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
        <div className="min-h-dvh space-y-14 bg-ink px-4 pt-24 pb-4 md:px-8">
          <SectionDivider label="The Desk" />
          <EditingSpread />
          {back}
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
      <div className="min-h-dvh space-y-14 bg-ink px-4 pt-24 pb-4 md:space-y-20 md:px-8">
        {section ? (
          <>
            <SectionDivider
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
          <SectionDivider label="No such chapter" />
        )}
        {back}
        <DarkFooter />
      </div>
    </PageShell>
  )
}
