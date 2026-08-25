import { Link, useParams } from 'react-router'
import { getPiece } from '../../../content/writing'
import { Reader } from '../../../components/reader/Reader'
import { HandNote, Stamp, Tape } from '../components/scraps'

/** A single piece, framed as a taped-down manuscript with the shared Reader. */
export function ReaderPage() {
  const { slug } = useParams()
  const piece = slug ? getPiece(slug) : undefined

  if (!piece) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden px-6">
        <div className="relative max-w-sm -rotate-2 border border-edge bg-surface p-8 text-center shadow-xl">
          <Tape className="-top-2.5 left-1/3 rotate-2" />
          <Stamp className="border-accent-2 text-accent-2">lost scrap</Stamp>
          <p className="mt-4 font-body text-muted">
            This page slipped out of the binder — there is no piece filed under that name.
          </p>
          <Link to="/design3/writing" className="mt-4 inline-block">
            <HandNote className="text-accent-2 underline underline-offset-4">
              ← back to the pile
            </HandNote>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-4 pb-4 sm:px-6">
      <div className="relative h-full w-full max-w-2xl">
        {/* pages beneath the manuscript */}
        <div aria-hidden className="absolute inset-0 rotate-1 border border-edge bg-surface shadow-sm" />

        <div className="relative flex h-full min-h-0 flex-col border border-edge bg-surface p-5 shadow-xl sm:p-7">
          <Tape className="-top-2.5 left-16 -rotate-3" />
          <Tape className="-top-2.5 right-12 rotate-2" />

          <div className="flex shrink-0 flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-dashed border-edge pb-3">
            <Link to="/design3/writing" className="font-hand text-lg text-accent-2 hover:underline">
              ← the pile
            </Link>
            <h1 className="font-display text-xl text-ink sm:text-2xl">{piece.title}</h1>
            <span className="ml-auto flex items-center gap-2">
              <Stamp className="border-accent text-accent">{piece.kind}</Stamp>
              <span className="font-sans text-xs tracking-widest uppercase text-muted">
                {piece.year}
              </span>
            </span>
          </div>

          <div className="min-h-0 flex-1 pt-4">
            <Reader markdown={piece.markdown} charsPerPage={900} />
          </div>
        </div>
      </div>
    </div>
  )
}
