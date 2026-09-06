import { Link, useParams } from 'react-router'
import { pieces, sections } from '../content/writing'
import { images } from '../content/images'
import { site } from '../content/site'
import {
  ChapterSection,
  DarkFooter,
  EditingSpread,
  PageShell,
  WorkSpread,
} from './editorial/parts'

const chapters = {
  creative: { key: 'creative', number: '01' },
  advocacy: { key: 'professional', number: '02' },
  editing: { key: null, number: '03' },
} as const

/** A chapter page: its own cover section, then the full-bleed spreads. */
export function SectionWorks() {
  const { sectionSlug = '' } = useParams()
  const chapter = chapters[sectionSlug as keyof typeof chapters]

  const backBand = (
    <div className="bg-ink py-8 text-center">
      <Link
        to="/"
        className="border-b border-paper/40 pb-0.5 font-sans text-[10px] tracking-[0.25em] uppercase text-paper/70 transition-colors hover:border-paper hover:text-paper"
      >
        ← Back home
      </Link>
    </div>
  )

  if (sectionSlug === 'editing') {
    return (
      <PageShell>
        <ChapterSection
          number={chapters.editing.number}
          label={site.editing.heading}
          note="freelance"
          slot={images.gallery[1]}
        />
        <EditingSpread />
        {backBand}
        <DarkFooter />
      </PageShell>
    )
  }

  const key = chapter?.key
  const section = sections.find((s) => s.key === key)
  const group = key ? pieces.filter((piece) => piece.section === key) : []

  if (!section || !chapter) {
    return (
      <PageShell>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper text-center">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted">
            No such chapter
          </p>
          <Link
            to="/"
            className="border-b border-edge pb-0.5 font-sans text-[10px] tracking-[0.25em] uppercase text-ink transition-colors hover:text-accent-2"
          >
            ← Back home
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <ChapterSection
        number={chapter.number}
        label={section.label}
        note={`${String(group.length).padStart(2, '0')} pieces`}
        slot={images.gallery[key === 'professional' ? 6 : 0]}
      />
      {group.map((piece, idx) => (
        <WorkSpread
          key={piece.slug}
          piece={piece}
          slot={images.gallery[(idx + (key === 'professional' ? 3 : 0)) % images.gallery.length]}
          index={idx}
          flip={idx % 2 === 0}
        />
      ))}
      {backBand}
      <DarkFooter />
    </PageShell>
  )
}
