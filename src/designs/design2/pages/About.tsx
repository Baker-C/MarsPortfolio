import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'

// Subtle per-vibe shifts: split order, portrait-plate attitude, ghost placement.
const attitudes: Record<
  ThemeVibe,
  { row: string; plate: string; ghost: string }
> = {
  horizon: {
    row: 'md:flex-row',
    plate: 'border-4 border-ink',
    ghost: '-bottom-10 left-1/2 -translate-x-1/2',
  },
  grove: {
    row: 'md:flex-row',
    plate: '-rotate-2 border-4 border-ink',
    ghost: '-bottom-10 -left-4',
  },
  pond: {
    row: 'md:flex-row-reverse',
    plate: 'overflow-hidden rounded-full border-4 border-ink',
    ghost: '-bottom-10 -right-4',
  },
  bloom: {
    row: 'md:flex-row',
    plate: 'rotate-3 border-4 border-ink',
    ghost: '-top-10 -right-4 rotate-6',
  },
  ridge: {
    row: 'md:flex-row',
    plate: '-skew-y-2 border-4 border-ink',
    ghost: '-bottom-10 -left-4 -skew-y-3',
  },
  bouquet: {
    row: 'md:flex-row-reverse',
    plate: 'border-8 border-double border-ink',
    ghost: '-bottom-10 -left-4',
  },
}

export function About() {
  const { vibe } = useTheme()
  const { heading, paragraphs } = site.about
  const [lead, ...rest] = paragraphs
  const attitude = attitudes[vibe]

  return (
    <section className={`flex h-full flex-col overflow-hidden ${attitude.row}`}>
      {/* Poster half: giant word + portrait plate */}
      <div className="relative flex shrink-0 flex-col justify-between overflow-hidden bg-accent-2 p-6 md:w-1/2 md:p-10">
        <p
          aria-hidden="true"
          className={`pointer-events-none absolute font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 uppercase select-none ${attitude.ghost}`}
        >
          About
        </p>

        <h2 className="relative z-10 font-display text-7xl leading-none font-bold tracking-tighter text-paper uppercase md:text-9xl">
          {heading}
        </h2>

        <div
          className={`relative z-10 ml-auto h-2/5 w-3/5 shadow-2xl md:h-1/2 ${attitude.plate}`}
        >
          <ArtPlaceholder slot={images.aboutPortrait} />
        </div>
      </div>

      {/* Text half: shaped, stepped paragraphs */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-6 overflow-hidden bg-paper p-6 md:p-12">
        <p className="max-w-lg font-display text-2xl leading-tight text-ink italic md:text-3xl">
          {lead}
        </p>
        {rest.map((p, i) => (
          <p
            key={i}
            className={`max-w-md font-body text-base leading-relaxed text-ink/80 ${
              i % 2 === 0 ? 'md:ml-24' : 'md:ml-8'
            }`}
          >
            {p}
          </p>
        ))}
        <p className="font-sans text-xs tracking-widest text-muted uppercase">
          ✳ {site.name} — {site.tagline}
        </p>
      </div>
    </section>
  )
}
