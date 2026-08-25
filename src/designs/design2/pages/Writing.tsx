import { useState } from 'react'
import { Link } from 'react-router'
import { pieces } from '../../../content/writing'
import { Pager } from '../components/Pager'

// One full-screen poster card per piece; flip through them in place.
const fields = [
  { bg: 'bg-accent', tone: 'paper' as const },
  { bg: 'bg-surface', tone: 'ink' as const },
  { bg: 'bg-accent-2', tone: 'paper' as const },
  { bg: 'bg-muted', tone: 'paper' as const },
]

export function Writing() {
  const [index, setIndex] = useState(0)
  const piece = pieces[index]
  const field = fields[index % fields.length]
  const fg = field.tone === 'paper' ? 'text-paper' : 'text-ink'
  const fgSoft = field.tone === 'paper' ? 'text-paper/60' : 'text-ink/60'
  const border = field.tone === 'paper' ? 'border-paper' : 'border-ink'
  const hover =
    field.tone === 'paper'
      ? 'hover:bg-paper hover:text-accent'
      : 'hover:bg-ink hover:text-paper'

  return (
    <section
      className={`relative h-full overflow-hidden transition-colors duration-300 ${field.bg}`}
    >
      {/* Kind as a giant graphic stamp behind the card */}
      <p
        aria-hidden="true"
        className={`pointer-events-none absolute -top-6 -right-4 rotate-3 font-display text-9xl leading-none font-bold tracking-tighter uppercase select-none ${fg} opacity-15`}
      >
        {piece.kind}
      </p>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <div className={`flex items-baseline gap-4 ${fgSoft}`}>
          <span className="font-display text-6xl leading-none font-bold tracking-tighter md:text-8xl">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`border-2 ${border} px-3 py-1 font-sans text-xs tracking-widest uppercase ${fg}`}>
            {piece.kind}
          </span>
          <span className="font-sans text-xs tracking-widest">{piece.year}</span>
        </div>

        <div className="max-w-4xl">
          <h2
            className={`font-display text-6xl leading-none font-bold tracking-tighter uppercase md:text-8xl ${fg}`}
          >
            {piece.title}
          </h2>
          <p className={`mt-6 max-w-xl font-body text-lg italic md:ml-32 md:text-xl ${fgSoft}`}>
            {piece.excerpt}
          </p>
          <Link
            to={`/design2/writing/${piece.slug}`}
            className={`mt-8 inline-block border-2 ${border} px-6 py-3 font-display text-xl tracking-tight uppercase transition-colors md:ml-32 ${fg} ${hover}`}
          >
            Read it →
          </Link>
        </div>

        <Pager
          index={index}
          total={pieces.length}
          onPrev={() => setIndex((i) => Math.max(0, i - 1))}
          onNext={() => setIndex((i) => Math.min(pieces.length - 1, i + 1))}
          tone={field.tone}
        />
      </div>
    </section>
  )
}
