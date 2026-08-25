import { useState } from 'react'
import { Link } from 'react-router'
import { pieces } from '../../../content/writing'
import type { PieceKind } from '../../../content/writing'
import { HandNote, Pager, Stamp, Tape } from '../components/scraps'

const kindStamp: Record<PieceKind, string> = {
  essay: 'border-accent text-accent',
  poem: 'border-accent-2 text-accent-2',
  fiction: 'border-ink text-ink',
  article: 'border-muted text-muted',
}

const tilts = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1']

/** The writing index as a shuffled pile of index cards — paged, never scrolled. */
export function Writing() {
  const n = pieces.length
  const [i, setI] = useState(0)
  const piece = pieces[i]
  const prev = () => setI((v) => (v - 1 + n) % n)
  const next = () => setI((v) => (v + 1) % n)

  return (
    <div className="relative flex h-full items-center justify-center gap-12 overflow-hidden px-6">
      <div className="relative w-full max-w-xl">
        {/* the rest of the pile, peeking out behind */}
        <div aria-hidden className="absolute inset-0 rotate-2 border border-edge bg-surface shadow-sm" />
        <div aria-hidden className="absolute inset-0 -rotate-3 border border-edge bg-surface shadow-sm" />

        <article
          key={piece.slug}
          className="relative -rotate-1 border border-edge bg-surface p-6 shadow-xl transition-transform hover:rotate-0 sm:p-8"
        >
          <Tape className="-top-2.5 left-10 -rotate-6" />
          <Tape className="-bottom-2.5 right-8 rotate-3" />
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

        <HandNote className="absolute -top-8 right-2 rotate-2">shuffle the pile ↓</HandNote>
      </div>

      {/* the whole pile, as tabbed scraps */}
      <aside className="hidden shrink-0 flex-col items-start gap-3 lg:flex">
        <HandNote className="-rotate-2">the whole pile —</HandNote>
        {pieces.map((p, idx) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setI(idx)}
            className={`${tilts[idx % tilts.length]} border px-3 py-2 text-left font-sans text-xs tracking-widest uppercase shadow-sm transition-transform hover:rotate-0 ${
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
