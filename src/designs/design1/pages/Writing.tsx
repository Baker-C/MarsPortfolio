import { useState } from 'react'
import { Link } from 'react-router'
import { pieces } from '../../../content/writing'
import type { Piece } from '../../../content/writing'
import { images } from '../../../content/images'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'
import { Spread } from '../components/Spread'
import { PlatePanel } from '../components/PlatePanel'
import { roman } from '../components/roman'

const PER_PAGE = 4

function Pager({
  page,
  pageCount,
  setPage,
}: {
  page: number
  pageCount: number
  setPage: (page: number) => void
}) {
  return (
    <div className="mt-5 flex w-full items-center justify-between font-sans text-xs tracking-widest uppercase text-muted">
      <button
        type="button"
        onClick={() => setPage(Math.max(0, page - 1))}
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
        onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
        disabled={page === pageCount - 1}
        className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
      >
        Next →
      </button>
    </div>
  )
}

function TocHeading({ align = 'text-center' }: { align?: string }) {
  return (
    <div className={align}>
      <p className="font-sans text-xs tracking-widest uppercase text-muted">
        Table of Contents
      </p>
      <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">Writing</h2>
    </div>
  )
}

/** The contents list, re-set per vibe. */
function TocList({
  vibe,
  visible,
  start,
}: {
  vibe: ThemeVibe
  visible: Piece[]
  start: number
}) {
  switch (vibe) {
    case 'horizon':
      // Symmetric full-width bands: numeral left, centered title, year right.
      return (
        <ol className="w-full">
          {visible.map((piece, idx) => (
            <li key={piece.slug} className={idx > 0 ? 'border-t border-edge' : ''}>
              <Link
                to={`/design1/writing/${piece.slug}`}
                className="group flex items-baseline gap-4 py-4"
              >
                <span className="w-8 shrink-0 font-display text-sm text-muted">
                  {roman(start + idx)}
                </span>
                <span
                  aria-hidden
                  className="hidden min-w-6 flex-1 border-b border-dotted border-edge sm:block"
                />
                <span className="min-w-0 text-center">
                  <span className="block truncate font-display text-lg text-ink transition-colors group-hover:text-accent md:text-xl">
                    {piece.title}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="hidden min-w-6 flex-1 border-b border-dotted border-edge sm:block"
                />
                <span className="shrink-0 font-sans text-xs tracking-widest uppercase text-muted">
                  {piece.kind} · {piece.year}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )
    case 'grove':
      // Tall asymmetric column: large numerals down the left edge.
      return (
        <ol className="w-full">
          {visible.map((piece, idx) => (
            <li key={piece.slug} className={idx > 0 ? 'border-t border-edge' : ''}>
              <Link
                to={`/design1/writing/${piece.slug}`}
                className="group flex items-center gap-5 py-3.5 md:py-4"
              >
                <span className="w-10 shrink-0 font-display text-2xl text-accent">
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
              </Link>
            </li>
          ))}
        </ol>
      )
    case 'pond':
      // Rounded cards drifting at alternating heights.
      return (
        <ol className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {visible.map((piece, idx) => (
            <li key={piece.slug} className={idx % 2 === 0 ? 'sm:mb-6' : 'sm:mt-6'}>
              <Link
                to={`/design1/writing/${piece.slug}`}
                className="group block rounded-3xl border border-edge px-6 py-5 text-center transition-colors hover:bg-surface"
              >
                <span className="block font-display text-sm text-muted">
                  {roman(start + idx)}
                </span>
                <span className="mt-1 block font-display text-lg text-ink transition-colors group-hover:text-accent">
                  {piece.title}
                </span>
                <span className="mt-1 block font-sans text-xs tracking-widest uppercase text-muted">
                  {piece.kind} · {piece.year}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )
    case 'bloom':
      // Scattered entries: alternating tilt, alignment, and scale.
      return (
        <ol className="flex w-full flex-col gap-4">
          {visible.map((piece, idx) => {
            const even = idx % 2 === 0
            return (
              <li
                key={piece.slug}
                className={
                  even ? '-rotate-1 self-start text-left' : 'rotate-1 self-end text-right'
                }
              >
                <Link to={`/design1/writing/${piece.slug}`} className="group inline-block">
                  <span
                    className={`block font-display text-ink transition-colors group-hover:text-accent ${
                      even ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                    }`}
                  >
                    {piece.title}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs tracking-widest uppercase text-muted">
                    {roman(start + idx)} · {piece.kind} · {piece.year}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )
    case 'ridge':
      // Monumental register: heavy rules, huge numerals, uppercase titles.
      return (
        <ol className="w-full border-b-2 border-ink">
          {visible.map((piece, idx) => (
            <li key={piece.slug} className="border-t-2 border-ink">
              <Link
                to={`/design1/writing/${piece.slug}`}
                className="group flex items-center gap-6 py-3"
              >
                <span className="w-14 shrink-0 font-display text-4xl text-accent">
                  {roman(start + idx)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-lg tracking-wide uppercase text-ink transition-colors group-hover:text-accent md:text-xl">
                    {piece.title}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs tracking-widest uppercase text-muted">
                    {piece.kind} · {piece.year}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 font-sans text-xs tracking-widest uppercase text-muted transition-colors group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )
    case 'bouquet':
      // Centered ornamental register with fleuron separators.
      return (
        <ol className="w-full text-center">
          {visible.map((piece, idx) => (
            <li key={piece.slug}>
              {idx > 0 && (
                <p aria-hidden className="my-1 text-accent">
                  ❧
                </p>
              )}
              <Link to={`/design1/writing/${piece.slug}`} className="group block py-1.5">
                <span className="block font-sans text-xs tracking-widest uppercase text-muted">
                  {roman(start + idx)} · {piece.kind} · {piece.year}
                </span>
                <span className="mt-0.5 block font-display text-xl text-ink transition-colors group-hover:text-accent">
                  {piece.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )
  }
}

export function Writing() {
  const { vibe } = useTheme()
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(pieces.length / PER_PAGE)
  const start = page * PER_PAGE
  const visible = pieces.slice(start, start + PER_PAGE)

  const pager =
    pageCount > 1 ? <Pager page={page} pageCount={pageCount} setPage={setPage} /> : null
  const list = <TocList vibe={vibe} visible={visible} start={start} />

  // Grove keeps the classic spread: tall plate verso, contents recto.
  if (vibe === 'grove') {
    return (
      <Spread
        verso={<PlatePanel slot={images.gallery[4]} caption="Grasslands · screen print" />}
        recto={
          <div className="flex h-full min-h-0 flex-col justify-center px-6 py-6 md:px-12 lg:px-14">
            <TocHeading align="text-left" />
            <span aria-hidden className="mt-4 w-12 border-t border-edge" />
            <div className="mt-5 md:mt-8">{list}</div>
            {pager}
          </div>
        }
      />
    )
  }

  // Bouquet sets the contents inside a double-ruled frame.
  if (vibe === 'bouquet') {
    return (
      <div className="flex h-full min-h-0 items-center justify-center p-4 md:p-6">
        <div className="h-full w-full max-w-2xl border border-edge p-2">
          <div className="flex h-full min-h-0 flex-col items-center justify-center border border-edge px-6 py-6 md:px-10">
            <TocHeading />
            <span aria-hidden className="mt-3 w-24 border-t border-edge" />
            <span aria-hidden className="mt-1 w-14 border-t border-edge" />
            <div className="mt-5">{list}</div>
            {pager}
          </div>
        </div>
      </div>
    )
  }

  // Every other vibe sets the contents as a full-width single leaf.
  const leaf: Record<Exclude<ThemeVibe, 'grove' | 'bouquet'>, string> = {
    horizon: 'max-w-3xl items-center',
    pond: 'max-w-3xl items-center',
    bloom: 'max-w-2xl items-center',
    ridge: 'max-w-2xl items-start',
  }

  return (
    <div className="flex h-full min-h-0 justify-center overflow-hidden px-6 py-6 md:px-12">
      <div
        className={`flex h-full min-h-0 w-full flex-col justify-center ${leaf[vibe as Exclude<ThemeVibe, 'grove' | 'bouquet'>]}`}
      >
        <TocHeading align={vibe === 'ridge' ? 'text-left' : 'text-center'} />
        {vibe !== 'ridge' && (
          <span aria-hidden className="mx-auto mt-4 w-12 border-t border-edge" />
        )}
        <div className="mt-5 w-full md:mt-8">{list}</div>
        {pager}
      </div>
    </div>
  )
}
