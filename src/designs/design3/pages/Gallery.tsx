import { useState } from 'react'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'
import { HandNote, Pager, Stamp, Tape } from '../components/scraps'

/** How the stack of prints sits on the board, per theme vibe. */
type VibeLayout = {
  /** decorative frame around the whole stack (bouquet) */
  frame: string
  frameTapes: string[]
  /** the two prints peeking out behind the active one */
  behind: [string, string]
  /** tilt / edges of the active print (includes border classes) */
  fig: string
  /** rounding of the artwork inside the print */
  art: string
  tape: string | null
  note: string
  noteText: string
}

const layouts: Record<ThemeVibe, VibeLayout> = {
  horizon: {
    frame: '',
    frameTapes: [],
    behind: ['inset-0 -translate-x-12 opacity-70', 'inset-0 translate-x-12 opacity-50'],
    fig: 'border border-edge',
    art: '',
    tape: '-top-2.5 left-1/3',
    note: '-top-8 -right-2',
    noteText: 'a level row of prints →',
  },
  grove: {
    frame: '',
    frameTapes: [],
    behind: ['inset-0 -translate-y-10 rotate-1 opacity-70', 'inset-0 translate-y-10 -rotate-1 opacity-50'],
    fig: 'rotate-1 border border-edge',
    art: '',
    tape: '-top-2.5 left-1/3 -rotate-3',
    note: '-top-8 -right-2 rotate-2',
    noteText: 'a tall column of prints ↕',
  },
  pond: {
    frame: '',
    frameTapes: [],
    behind: [
      'inset-0 translate-x-6 translate-y-4 rounded-3xl opacity-60',
      'inset-0 -translate-x-6 -translate-y-4 rounded-3xl opacity-40',
    ],
    fig: 'rounded-3xl border border-edge',
    art: 'rounded-2xl',
    tape: null,
    note: '-top-8 -right-2',
    noteText: 'floated out to dry',
  },
  bloom: {
    frame: '',
    frameTapes: [],
    behind: ['inset-0 rotate-12 opacity-70', 'inset-0 -rotate-6 opacity-50'],
    fig: '-rotate-3 border border-edge',
    art: '',
    tape: '-top-2.5 left-1/3 -rotate-6',
    note: '-top-8 -right-2 rotate-2',
    noteText: 'from the flat files ↓',
  },
  ridge: {
    frame: '',
    frameTapes: [],
    behind: ['inset-0 translate-y-4 opacity-70', 'inset-0 translate-y-8 opacity-50'],
    fig: 'border-2 border-ink',
    art: '',
    tape: null,
    note: '-top-8 -right-2',
    noteText: 'one over the next ↓',
  },
  bouquet: {
    frame: 'border-2 border-dashed border-accent/50 p-6',
    frameTapes: [
      '-top-2.5 -left-4 -rotate-45',
      '-top-2.5 -right-4 rotate-45',
      '-bottom-2.5 -left-4 rotate-45',
      '-bottom-2.5 -right-4 -rotate-45',
    ],
    behind: ['inset-4 rotate-3 opacity-70', 'inset-4 -rotate-3 opacity-50'],
    fig: '-rotate-1 border border-edge',
    art: '',
    tape: '-top-2.5 left-1/3 rotate-2',
    note: '-top-9 -right-2 -rotate-2',
    noteText: 'the keepers, framed',
  },
}

/** Gallery as a stack of pinned prints — flip through, never scroll. */
export function Gallery() {
  const { vibe } = useTheme()
  const L = layouts[vibe]
  const slots = images.gallery
  const n = slots.length
  const [i, setI] = useState(0)
  const slot = slots[i]
  const behind = slots[(i + 1) % n]
  const further = slots[(i + 2) % n]
  const prev = () => setI((v) => (v - 1 + n) % n)
  const next = () => setI((v) => (v + 1) % n)

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-6">
      <div className={`relative w-full max-w-xs md:max-w-sm ${L.frame}`}>
        {L.frameTapes.map((cls) => (
          <Tape key={cls} className={cls} />
        ))}

        {/* the next prints in the stack, peeking out */}
        <div
          aria-hidden
          className={`absolute border border-edge bg-surface p-2 shadow-md ${L.behind[0]}`}
        >
          <div className="h-full w-full opacity-40">
            <ArtPlaceholder slot={behind} />
          </div>
        </div>
        <div
          aria-hidden
          className={`absolute border border-edge bg-surface p-2 shadow-sm ${L.behind[1]}`}
        >
          <div className="h-full w-full opacity-30">
            <ArtPlaceholder slot={further} />
          </div>
        </div>

        <figure
          key={i}
          className={`relative bg-surface p-3 shadow-xl transition-transform hover:rotate-0 ${L.fig}`}
        >
          {L.tape && <Tape className={L.tape} />}
          <div className={`aspect-square w-full overflow-hidden border border-edge ${L.art}`}>
            <ArtPlaceholder slot={slot} />
          </div>
          <figcaption className="flex items-center justify-between gap-2 pt-2">
            <span className="font-hand text-xl text-ink">{slot.caption ?? slot.alt}</span>
            <Stamp>
              {i + 1} / {n}
            </Stamp>
          </figcaption>
        </figure>

        <HandNote className={`absolute hidden sm:block ${L.note}`}>{L.noteText}</HandNote>
      </div>

      <Pager onPrev={prev} onNext={next} label="flip" />
    </div>
  )
}
