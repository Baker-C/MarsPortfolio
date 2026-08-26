import { Link, useParams } from 'react-router'
import { getPiece } from '../../../content/writing'
import { Reader } from '../../../components/reader/Reader'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'

// Subtle per-vibe shifts: rail orientation and attitude, ghost placement.
const attitudes: Record<
  ThemeVibe,
  { section: string; rail: string; ghost: string }
> = {
  // Horizon lays the title as a calm top band instead of a side rail.
  horizon: {
    section: 'flex-col',
    rail: 'items-center text-center',
    ghost: '-bottom-6 left-1/2 -translate-x-1/2',
  },
  grove: { section: 'md:flex-row', rail: 'md:w-2/5', ghost: '-bottom-6 -left-2' },
  pond: {
    section: 'md:flex-row',
    rail: 'md:w-2/5 md:rounded-r-3xl',
    ghost: '-bottom-6 -right-2',
  },
  bloom: {
    section: 'md:flex-row',
    rail: 'md:w-2/5',
    ghost: '-top-6 -right-2 rotate-6',
  },
  ridge: {
    section: 'md:flex-row',
    rail: 'md:w-2/5',
    ghost: '-bottom-6 -left-2 -skew-y-6',
  },
  bouquet: { section: 'md:flex-row', rail: 'md:w-2/5', ghost: '-bottom-6 -left-2' },
}

export function ReaderPage() {
  const { vibe } = useTheme()
  const { slug } = useParams()
  const piece = slug ? getPiece(slug) : undefined
  const attitude = attitudes[vibe]

  if (!piece) {
    return (
      <section className="relative flex h-full flex-col items-start justify-center overflow-hidden bg-accent-2 p-6 md:p-12">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 right-0 font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 uppercase select-none"
        >
          Lost
        </p>
        <h2 className="font-display text-7xl leading-none font-bold tracking-tighter text-paper uppercase md:text-9xl">
          Not found
        </h2>
        <p className="mt-4 max-w-md font-body text-lg text-paper/70 italic">
          No piece lives at this address. It may have rotated out of the
          portfolio.
        </p>
        <Link
          to="/design2/writing"
          className="mt-8 border-2 border-paper px-6 py-3 font-display text-xl tracking-tight text-paper uppercase transition-colors hover:bg-paper hover:text-accent-2"
        >
          ← Back to the index
        </Link>
      </section>
    )
  }

  return (
    <section className={`flex h-full flex-col overflow-hidden ${attitude.section}`}>
      {/* Title rail: the poster half */}
      <div
        className={`relative flex shrink-0 flex-col justify-between overflow-hidden bg-accent p-6 md:p-8 ${attitude.rail}`}
      >
        <p
          aria-hidden="true"
          className={`pointer-events-none absolute font-display text-9xl leading-none font-bold tracking-tighter text-paper/10 uppercase select-none ${attitude.ghost}`}
        >
          {piece.kind}
        </p>

        <div className="relative z-10 flex items-center gap-4">
          <Link
            to="/design2/writing"
            className="font-sans text-xs tracking-widest text-paper/70 uppercase transition-colors hover:text-paper"
          >
            ← Index
          </Link>
          <span className="border-2 border-paper px-3 py-1 font-sans text-xs tracking-widest text-paper uppercase">
            {piece.kind}
          </span>
          <span className="font-sans text-xs tracking-widest text-paper/70">
            {piece.year}
          </span>
        </div>

        <h2 className="relative z-10 mt-4 font-display text-5xl leading-none font-bold tracking-tighter text-paper uppercase md:text-7xl">
          {piece.title}
        </h2>
      </div>

      {/* Reading half: paginated, never scrolls */}
      <div className="min-h-0 flex-1 bg-paper p-6 md:p-10">
        <Reader markdown={piece.markdown} className="mx-auto max-w-2xl" />
      </div>
    </section>
  )
}
