import { useState } from 'react'
import { Link } from 'react-router'
import { pieces } from '../../../content/writing'
import type { PieceKind } from '../../../content/writing'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'
import { HandNote, Pager, Stamp, Tape } from '../components/scraps'

const kindStamp: Record<PieceKind, string> = {
  essay: 'border-accent text-accent',
  poem: 'border-accent-2 text-accent-2',
  fiction: 'border-ink text-ink',
  article: 'border-muted text-muted',
}

/** How the pile of index cards sits on the board, per theme vibe. */
type VibeLayout = {
  /** outer flow: where the tab pile lives relative to the card */
  wrap: string
  /** decorative frame on the card area (bouquet pins it down) */
  frame: string
  /** the two sheets peeking out from under the active card */
  under: [string, string]
  /** tilt / edges of the active card (includes border classes) */
  card: string
  tapes: string[]
  note: string
  noteText: string
  aside: string
  asideNote: string
  tilts: string[]
  /** border/rounding of each tab in the pile */
  tab: string
}

const layouts: Record<ThemeVibe, VibeLayout> = {
  horizon: {
    wrap: 'flex-col gap-6',
    frame: '',
    under: ['inset-0 -translate-x-8', 'inset-0 translate-x-8'],
    card: 'border border-edge',
    tapes: ['-top-2.5 left-10', '-top-2.5 right-10'],
    note: '-top-8 right-2',
    noteText: 'the shelf, in reading order →',
    aside: 'flex-row flex-wrap items-center justify-center',
    asideNote: '',
    tilts: [''],
    tab: 'border',
  },
  grove: {
    wrap: 'flex-row gap-10',
    frame: '',
    under: ['inset-0 -translate-y-5 rotate-1', 'inset-0 translate-y-5 -rotate-2'],
    card: 'rotate-1 border border-edge',
    tapes: ['-top-2.5 left-10 -rotate-6', '-bottom-2.5 right-8 rotate-3'],
    note: '-top-8 right-2 rotate-2',
    noteText: 'two stacks deep ↓',
    aside: 'order-first flex-col items-end',
    asideNote: '-rotate-2',
    tilts: ['rotate-1', '-rotate-1'],
    tab: 'border',
  },
  pond: {
    wrap: 'flex-row gap-16',
    frame: '',
    under: [
      'inset-0 translate-x-4 translate-y-3 rounded-3xl',
      'inset-0 -translate-x-4 -translate-y-3 rounded-3xl',
    ],
    card: 'rounded-3xl border border-edge',
    tapes: [],
    note: '-top-8 right-4',
    noteText: 'drifting past, one at a time',
    aside: 'flex-col items-start gap-4',
    asideNote: '',
    tilts: [''],
    tab: 'rounded-full border',
  },
  bloom: {
    wrap: 'flex-row gap-12',
    frame: '',
    under: ['inset-0 rotate-6', 'inset-0 -rotate-6'],
    card: '-rotate-2 border border-edge',
    tapes: ['-top-2.5 left-10 -rotate-12', '-bottom-2.5 right-8 rotate-6'],
    note: '-top-8 right-2 rotate-3',
    noteText: 'shuffle the pile ↓',
    aside: 'flex-col items-start',
    asideNote: '-rotate-3',
    tilts: ['-rotate-3', 'rotate-2', 'rotate-3', '-rotate-2'],
    tab: 'border',
  },
  ridge: {
    wrap: 'flex-row gap-12',
    frame: '',
    under: ['inset-0 translate-y-3', 'inset-0 translate-y-6'],
    card: 'border-2 border-ink',
    tapes: [],
    note: '-top-8 left-2',
    noteText: 'stacked at the base ↓',
    aside: 'flex-col items-stretch gap-2',
    asideNote: '',
    tilts: [''],
    tab: 'border-2',
  },
  bouquet: {
    wrap: 'flex-row gap-12',
    frame: 'border-2 border-dashed border-accent/50 p-5',
    under: ['inset-4 rotate-2', 'inset-4 -rotate-2'],
    card: '-rotate-1 border border-edge',
    tapes: ['-top-2.5 left-1/3 rotate-2'],
    note: '-top-9 right-2 -rotate-2',
    noteText: 'kept together, all of it',
    aside: 'flex-col items-center',
    asideNote: '-rotate-1',
    tilts: ['-rotate-1', 'rotate-1'],
    tab: 'border',
  },
}

/** The writing index as a pile of index cards — paged, never scrolled. */
export function Writing() {
  const { vibe } = useTheme()
  const L = layouts[vibe]
  const n = pieces.length
  const [i, setI] = useState(0)
  const piece = pieces[i]
  const prev = () => setI((v) => (v - 1 + n) % n)
  const next = () => setI((v) => (v + 1) % n)

  return (
    <div
      className={`relative flex h-full items-center justify-center overflow-hidden px-6 ${L.wrap}`}
    >
      <div className={`relative w-full max-w-xl ${L.frame}`}>
        {L.under.map((cls) => (
          <div
            key={cls}
            aria-hidden
            className={`absolute border border-edge bg-surface shadow-sm ${cls}`}
          />
        ))}

        <article
          key={piece.slug}
          className={`relative bg-surface p-6 shadow-xl transition-transform hover:rotate-0 sm:p-8 ${L.card}`}
        >
          {L.tapes.map((cls) => (
            <Tape key={cls} className={cls} />
          ))}
          <div className="flex items-center gap-3">
            <Stamp className={kindStamp[piece.kind]}>{piece.kind}</Stamp>
            <span className="font-sans text-xs tracking-widest uppercase text-muted">
              {piece.year}
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{piece.title}</h2>
          <p className="mt-3 font-body text-muted italic">“{piece.excerpt}”</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              to={piece.slug}
              className="border border-ink bg-paper px-3 py-1.5 font-sans text-xs font-bold tracking-widest uppercase text-ink shadow-sm transition-all hover:-rotate-1 hover:border-accent hover:bg-accent hover:text-paper"
            >
              open the manuscript →
            </Link>
            <Pager onPrev={prev} onNext={next} label={`${i + 1} / ${n}`} />
          </div>
        </article>

        <HandNote className={`absolute ${L.note}`}>{L.noteText}</HandNote>
      </div>

      {/* the whole pile, as tabbed scraps */}
      <aside className={`hidden shrink-0 gap-3 lg:flex ${L.aside}`}>
        <HandNote className={L.asideNote}>the whole pile —</HandNote>
        {pieces.map((p, idx) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setI(idx)}
            className={`${L.tilts[idx % L.tilts.length]} ${L.tab} px-3 py-2 text-left font-sans text-xs tracking-widest uppercase shadow-sm transition-transform hover:rotate-0 ${
              idx === i
                ? 'border-ink bg-accent text-paper'
                : 'border-edge bg-surface text-ink hover:border-ink'
            }`}
          >
            {p.title}
          </button>
        ))}
      </aside>
    </div>
  )
}
