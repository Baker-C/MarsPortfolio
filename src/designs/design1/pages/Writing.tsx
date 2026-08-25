import { useState } from 'react'
import { Link } from 'react-router'
import { pieces } from '../../../content/writing'
import { images } from '../../../content/images'
import { Spread } from '../components/Spread'
import { PlatePanel } from '../components/PlatePanel'
import { roman } from '../components/roman'

const PER_PAGE = 4

export function Writing() {
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(pieces.length / PER_PAGE)
  const start = page * PER_PAGE
  const visible = pieces.slice(start, start + PER_PAGE)

  return (
    <Spread
      verso={<PlatePanel slot={images.gallery[4]} caption="Grasslands · screen print" />}
      recto={
        <div className="flex h-full min-h-0 flex-col justify-center px-6 py-6 md:px-12 lg:px-14">
          <p className="text-center font-sans text-xs tracking-widest uppercase text-muted">
            Table of Contents
          </p>
          <h2 className="mt-2 text-center font-display text-3xl text-ink md:text-4xl">
            Writing
          </h2>
          <span aria-hidden className="mx-auto mt-4 w-12 border-t border-edge" />

          <ol className="mt-5 md:mt-8">
            {visible.map((piece, idx) => (
              <li key={piece.slug} className={idx > 0 ? 'border-t border-edge' : ''}>
                <Link
                  to={`/design1/writing/${piece.slug}`}
                  className="group flex items-baseline gap-4 py-3.5 md:py-4"
                >
                  <span className="w-7 shrink-0 font-display text-sm text-muted">
                    {roman(start + idx)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-lg text-ink transition-colors group-hover:text-accent md:text-xl">
                      {piece.title}
                    </span>
                    <span className="mt-0.5 block font-sans text-xs tracking-widest uppercase text-muted">
                      {piece.kind} · {piece.year}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="mx-1 hidden min-w-6 flex-1 border-b border-dotted border-edge sm:block"
                  />
                  <span
                    aria-hidden
                    className="hidden shrink-0 font-sans text-xs tracking-widest uppercase text-muted transition-colors group-hover:text-accent sm:block"
                  >
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {pageCount > 1 && (
            <div className="mt-5 flex items-center justify-between font-sans text-xs tracking-widest uppercase text-muted">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
              >
                ← Prev
              </button>
              <span>
                Leaf {page + 1} of {pageCount}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={page === pageCount - 1}
                className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      }
    />
  )
}
