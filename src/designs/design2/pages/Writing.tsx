import { useState } from 'react'
import { Link } from 'react-router'
import { pieces } from '../../../content/writing'
import { useTheme } from '../../../theme/ThemeContext'
import { Pager } from '../components/Pager'

// One full-screen poster card per piece; flip through them in place.
// The active vibe decides the card's format; the piece index rotates its field.
const fields = [
  { bg: 'bg-accent', tone: 'paper' as const },
  { bg: 'bg-surface', tone: 'ink' as const },
  { bg: 'bg-accent-2', tone: 'paper' as const },
  { bg: 'bg-muted', tone: 'paper' as const },
]

export function Writing() {
  const { vibe } = useTheme()
  const [index, setIndex] = useState(0)
  const piece = pieces[index]
  const field = fields[index % fields.length]
  const num = String(index + 1).padStart(2, '0')
  const fg = field.tone === 'paper' ? 'text-paper' : 'text-ink'
  const fgSoft = field.tone === 'paper' ? 'text-paper/60' : 'text-ink/60'
  const border = field.tone === 'paper' ? 'border-paper' : 'border-ink'
  const hover =
    field.tone === 'paper'
      ? 'hover:bg-paper hover:text-accent'
      : 'hover:bg-ink hover:text-paper'

  const pager = (
    <Pager
      index={index}
      total={pieces.length}
      onPrev={() => setIndex((i) => Math.max(0, i - 1))}
      onNext={() => setIndex((i) => Math.min(pieces.length - 1, i + 1))}
      tone={field.tone}
    />
  )
  const kindChip = (
    <span
      className={`border-2 ${border} px-3 py-1 font-sans text-xs tracking-widest uppercase ${fg}`}
    >
      {piece.kind}
    </span>
  )
  const readLink = (extra = '') => (
    <Link
      to={`/design2/writing/${piece.slug}`}
      className={`inline-block border-2 ${border} px-6 py-3 font-display text-xl tracking-tight uppercase transition-colors ${fg} ${hover} ${extra}`}
    >
      Read it →
    </Link>
  )

  let card
  switch (vibe) {
    case 'horizon':
      // Symmetric band poster: everything centered in calm horizontal rows.
      card = (
        <>
          <p
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-9xl leading-none font-bold tracking-tighter uppercase select-none ${fg} opacity-10`}
          >
            {piece.kind}
          </p>
          <div className="relative z-10 flex h-full flex-col items-center justify-between p-6 text-center md:p-10">
            <div className={`flex items-baseline gap-4 ${fgSoft}`}>
              <span className="font-display text-5xl leading-none font-bold tracking-tighter">
                {num}
              </span>
              {kindChip}
              <span className="font-sans text-xs tracking-widest">{piece.year}</span>
            </div>
            <div>
              <h2
                className={`mx-auto max-w-4xl font-display text-6xl leading-none font-bold tracking-tighter uppercase md:text-8xl ${fg}`}
              >
                {piece.title}
              </h2>
              <p className={`mx-auto mt-6 max-w-xl font-body text-lg italic ${fgSoft}`}>
                {piece.excerpt}
              </p>
              {readLink('mt-8')}
            </div>
            {pager}
          </div>
        </>
      )
      break
    case 'grove':
      // Hard vertical split: number rail left, tall text column right.
      card = (
        <div className="relative z-10 flex h-full overflow-hidden">
          <div
            className={`flex w-1/3 shrink-0 flex-col justify-between border-r-2 ${border} p-6 md:p-8`}
          >
            <span
              className={`font-display text-7xl leading-none font-bold tracking-tighter md:text-9xl ${fg}`}
            >
              {num}
            </span>
            <div className="flex flex-col items-start gap-3">
              {kindChip}
              <span className={`font-sans text-xs tracking-widest ${fgSoft}`}>
                {piece.year}
              </span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:p-8">
            <h2
              className={`font-display text-5xl leading-none font-bold tracking-tighter uppercase md:text-7xl ${fg}`}
            >
              {piece.title}
            </h2>
            <p className={`max-w-xl font-body text-lg italic ${fgSoft}`}>
              {piece.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {readLink()}
              {pager}
            </div>
          </div>
        </div>
      )
      break
    case 'pond':
      // Floating rounded cluster: circled number, pill link, ringed ghosts.
      card = (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full border-4 ${border} opacity-20`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full border-4 ${border} opacity-15`}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 p-6 text-center md:gap-6">
            <span
              className={`flex h-20 w-20 items-center justify-center rounded-full border-4 ${border} font-display text-3xl font-bold tracking-tighter ${fg}`}
            >
              {num}
            </span>
            {kindChip}
            <h2
              className={`max-w-3xl font-display text-5xl leading-none font-bold tracking-tighter uppercase md:text-7xl ${fg}`}
            >
              {piece.title}
            </h2>
            <p
              className={`max-w-xl rounded-3xl bg-paper/10 px-8 py-4 font-body text-lg italic ${fgSoft}`}
            >
              {piece.excerpt}
            </p>
            {readLink('rounded-full')}
            {pager}
          </div>
        </>
      )
      break
    case 'bloom':
      // Scattered, rotated type blocks at mixed scales.
      card = (
        <>
          <p
            aria-hidden="true"
            className={`pointer-events-none absolute -top-6 -right-4 rotate-12 font-display text-9xl leading-none font-bold tracking-tighter uppercase select-none ${fg} opacity-15`}
          >
            {piece.kind}
          </p>
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
            <div className={`flex items-baseline gap-4 ${fgSoft}`}>
              <span className="inline-block rotate-3 font-display text-6xl leading-none font-bold tracking-tighter md:text-8xl">
                {num}
              </span>
              <span className="inline-block -rotate-2">{kindChip}</span>
              <span className="font-sans text-xs tracking-widest">{piece.year}</span>
            </div>
            <div>
              <h2
                className={`max-w-3xl -rotate-2 font-display text-6xl leading-none font-bold tracking-tighter uppercase md:text-8xl ${fg}`}
              >
                {piece.title}
              </h2>
              <p
                className={`mt-6 max-w-md rotate-1 font-body text-lg italic md:ml-40 ${fgSoft}`}
              >
                {piece.excerpt}
              </p>
              {readLink('mt-8 -rotate-1 md:ml-16')}
            </div>
            {pager}
          </div>
        </>
      )
      break
    case 'ridge':
      // Monumental stack: title words pile up the full height, angular ghost number.
      card = (
        <>
          <p
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 right-0 -skew-y-6 font-display text-9xl leading-none font-bold tracking-tighter select-none ${fg} opacity-10`}
          >
            {num}
          </p>
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
            <div className={`flex items-baseline gap-4 ${fgSoft}`}>
              {kindChip}
              <span className="font-sans text-xs tracking-widest">{piece.year}</span>
            </div>
            <h2
              className={`flex min-h-0 flex-col py-2 font-display leading-none font-bold tracking-tighter uppercase ${fg}`}
            >
              {piece.title.split(' ').map((word, i) => (
                <span key={i} className="text-4xl md:text-6xl">
                  {word}
                </span>
              ))}
            </h2>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {readLink()}
              {pager}
            </div>
          </div>
        </>
      )
      break
    case 'bouquet':
      // Dense centered card inside a heavy frame, ornaments top and bottom.
      card = (
        <div className="relative z-10 h-full p-3 md:p-6">
          <div
            className={`flex h-full flex-col items-center justify-center gap-4 overflow-hidden border-4 ${border} p-6 text-center`}
          >
            <p className={`font-display text-xl ${fgSoft}`}>❧ {num} ❧</p>
            {kindChip}
            <h2
              className={`max-w-3xl font-display text-5xl leading-none font-bold tracking-tighter uppercase md:text-7xl ${fg}`}
            >
              {piece.title}
            </h2>
            <p className={`max-w-xl font-body text-lg italic ${fgSoft}`}>
              {piece.excerpt}
            </p>
            {readLink()}
            {pager}
          </div>
        </div>
      )
      break
  }

  return (
    <section
      className={`relative h-full overflow-hidden transition-colors duration-300 ${field.bg}`}
    >
      {card}
    </section>
  )
}
