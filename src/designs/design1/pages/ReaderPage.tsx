import { Link, useParams } from 'react-router'
import { getPiece } from '../../../content/writing'
import type { PieceKind } from '../../../content/writing'
import { images } from '../../../content/images'
import { Reader } from '../../../components/reader/Reader'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { Spread } from '../components/Spread'

/** Gallery index whose motif accompanies each kind of piece. */
const artByKind: Record<PieceKind, number> = {
  essay: 4,
  poem: 1,
  fiction: 5,
  article: 3,
}

export function ReaderPage() {
  const { slug } = useParams()
  const piece = slug ? getPiece(slug) : undefined

  if (!piece) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="font-sans text-xs tracking-widest uppercase text-muted">Errata</p>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          This page is missing from the binding.
        </h2>
        <p className="max-w-sm font-body italic leading-relaxed text-muted">
          Nothing is bound under “{slug}”. It may have been unstitched, or never
          printed at all.
        </p>
        <Link
          to="/design1/writing"
          className="mt-2 border-b border-accent pb-0.5 font-sans text-xs tracking-widest uppercase text-accent transition-colors hover:border-ink hover:text-ink"
        >
          ← Return to Contents
        </Link>
      </div>
    )
  }

  return (
    <Spread
      verso={
        <div className="flex h-full min-h-0 flex-col justify-between p-10 lg:p-14">
          <p className="font-sans text-xs tracking-widest uppercase text-muted">
            {piece.kind} · {piece.year}
          </p>
          <div className="my-4 min-h-0">
            <h1 className="font-display text-4xl leading-tight text-ink lg:text-5xl">
              {piece.title}
            </h1>
            <span aria-hidden className="mt-6 block w-12 border-t border-edge" />
            <p className="mt-6 max-w-md font-body text-lg italic leading-relaxed text-muted">
              {piece.excerpt}
            </p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <Link
              to="/design1/writing"
              className="border-b border-transparent pb-0.5 font-sans text-xs tracking-widest uppercase text-muted transition-colors hover:border-ink hover:text-ink"
            >
              ← Contents
            </Link>
            <div className="h-16 w-28 opacity-70">
              <ArtPlaceholder slot={images.gallery[artByKind[piece.kind]]} />
            </div>
          </div>
        </div>
      }
      recto={
        <div className="flex h-full min-h-0 flex-col px-6 py-5 md:px-10 md:py-8">
          <div className="mb-3 shrink-0 border-b border-edge pb-3 md:hidden">
            <p className="font-sans text-xs tracking-widest uppercase text-muted">
              {piece.kind} · {piece.year}
            </p>
            <h1 className="mt-1 font-display text-xl text-ink">{piece.title}</h1>
          </div>
          <Reader markdown={piece.markdown} charsPerPage={950} className="min-h-0 flex-1" />
        </div>
      }
    />
  )
}
