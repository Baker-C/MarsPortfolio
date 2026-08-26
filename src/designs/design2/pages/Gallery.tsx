import { useState } from 'react'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { useTheme } from '../../../theme/ThemeContext'
import { Pager } from '../components/Pager'

// Full-screen poster spread per artwork; flip through in place.
// The active vibe decides how the plate and its caption are mounted.
const fields = ['bg-accent', 'bg-accent-2', 'bg-muted']

export function Gallery() {
  const { vibe } = useTheme()
  const [index, setIndex] = useState(0)
  const slot = images.gallery[index]
  const field = fields[index % fields.length]
  const num = String(index + 1).padStart(2, '0')
  const caption = slot.caption ?? slot.alt

  const pager = (tone: 'paper' | 'ink') => (
    <Pager
      index={index}
      total={images.gallery.length}
      onPrev={() => setIndex((i) => Math.max(0, i - 1))}
      onNext={() => setIndex((i) => Math.min(images.gallery.length - 1, i + 1))}
      tone={tone}
    />
  )
  const badge = (
    <span className="absolute top-4 left-4 border-2 border-ink bg-paper px-3 py-1 font-sans text-xs tracking-widest text-ink uppercase">
      Gallery
    </span>
  )

  switch (vibe) {
    case 'horizon':
      // Calm horizontal bands: full-width art over a centered caption band.
      return (
        <section className="flex h-full flex-col overflow-hidden">
          <div className="relative min-h-0 flex-1 border-b-2 border-ink">
            <ArtPlaceholder slot={slot} />
            {badge}
          </div>
          <div
            className={`flex shrink-0 flex-col items-center gap-3 p-6 text-center transition-colors duration-300 ${field}`}
          >
            <h2 className="font-display text-3xl leading-none font-bold tracking-tighter text-paper uppercase md:text-5xl">
              {caption}
            </h2>
            <p className="max-w-md font-body text-base text-paper/70 italic">
              {slot.alt}
            </p>
            {pager('paper')}
          </div>
        </section>
      )
    case 'grove':
      // Vertical split, caption column first — tall type rail beside the plate.
      return (
        <section className="flex h-full flex-col overflow-hidden md:flex-row">
          <div
            className={`relative flex shrink-0 flex-col justify-between overflow-hidden p-6 transition-colors duration-300 md:w-2/5 md:p-10 ${field}`}
          >
            <p
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -left-2 font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 select-none"
            >
              {num}
            </p>
            <span className="relative z-10 font-display text-7xl leading-none font-bold tracking-tighter text-paper md:text-8xl">
              {num}
            </span>
            <div className="relative z-10">
              <h2 className="font-display text-4xl leading-none font-bold tracking-tighter text-paper uppercase md:text-6xl">
                {caption}
              </h2>
              <p className="mt-4 max-w-sm font-body text-lg text-paper/70 italic">
                {slot.alt}
              </p>
            </div>
            {pager('paper')}
          </div>
          <div className="relative min-h-0 flex-1 border-t-2 border-ink md:border-t-0 md:border-l-2">
            <ArtPlaceholder slot={slot} />
            {badge}
          </div>
        </section>
      )
    case 'pond':
      // The artwork floats as a rounded plate among quiet circles.
      return (
        <section className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden bg-paper p-6">
          <div
            aria-hidden="true"
            className="absolute top-10 left-10 h-32 w-32 rounded-full bg-accent/20"
          />
          <div
            aria-hidden="true"
            className="absolute right-12 bottom-12 h-40 w-40 rounded-full bg-accent-2/20"
          />
          <div className="relative h-1/2 w-full max-w-xl overflow-hidden rounded-3xl border-4 border-ink md:h-3/5">
            <ArtPlaceholder slot={slot} />
          </div>
          <span className="relative rounded-full border-2 border-ink px-4 py-1 font-sans text-xs tracking-widest text-ink uppercase">
            Gallery — {num}
          </span>
          <h2 className="relative text-center font-display text-3xl leading-none font-bold tracking-tighter text-ink uppercase md:text-5xl">
            {caption}
          </h2>
          <p className="relative max-w-md text-center font-body text-base text-ink/60 italic">
            {slot.alt}
          </p>
          <div className="relative">{pager('ink')}</div>
        </section>
      )
    case 'bloom':
      // Scattered pin-board: tilted plate, opposite-tilted caption card.
      return (
        <section className="relative h-full overflow-hidden bg-paper">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 right-1/4 rotate-6 font-display text-9xl leading-none font-bold tracking-tighter text-accent/15 select-none"
          >
            {num}
          </p>
          <div className="absolute top-10 left-6 h-3/5 w-3/5 -rotate-2 border-4 border-ink shadow-2xl md:left-12 md:w-2/5">
            <ArtPlaceholder slot={slot} />
          </div>
          <div
            className={`absolute right-6 bottom-20 max-w-sm rotate-3 border-2 border-ink p-6 shadow-2xl transition-colors duration-300 md:right-16 ${field}`}
          >
            <h2 className="font-display text-3xl leading-none font-bold tracking-tighter text-paper uppercase md:text-4xl">
              {caption}
            </h2>
            <p className="mt-3 font-body text-base text-paper/70 italic">
              {slot.alt}
            </p>
          </div>
          <span className="absolute top-4 right-6 -rotate-3 border-2 border-ink bg-paper px-3 py-1 font-sans text-xs tracking-widest text-ink uppercase">
            Gallery
          </span>
          <div className="absolute bottom-6 left-8 -rotate-1">{pager('ink')}</div>
        </section>
      )
    case 'ridge':
      // Full-bleed monument: the art fills the wall, caption on angular ink slabs.
      return (
        <section className="relative h-full overflow-hidden">
          <div className="absolute inset-0">
            <ArtPlaceholder slot={slot} />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
            <span className="self-start -skew-y-2 border-2 border-paper bg-ink px-3 py-1 font-sans text-xs tracking-widest text-paper uppercase">
              Gallery — {num}
            </span>
            <div className="flex flex-col items-start gap-3">
              <h2 className="-skew-y-2 bg-ink px-4 py-2 font-display text-4xl leading-none font-bold tracking-tighter text-paper uppercase md:text-6xl">
                {caption}
              </h2>
              <p className="-skew-y-2 bg-ink px-4 py-2 font-body text-base text-paper/80 italic">
                {slot.alt}
              </p>
              <div className="-skew-y-2 bg-ink p-2">{pager('paper')}</div>
            </div>
          </div>
        </section>
      )
    case 'bouquet':
      // The plate hangs matted inside a heavy double frame, label beneath.
      return (
        <section className="h-full overflow-hidden bg-paper p-3 md:p-6">
          <div className="flex h-full flex-col overflow-hidden border-4 border-ink p-1 md:p-2">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-2 border-ink/60 p-3 md:p-4">
              <div className="relative min-h-0 flex-1 border-2 border-ink">
                <ArtPlaceholder slot={slot} />
              </div>
              <div className="flex shrink-0 flex-col items-center gap-2 pt-4 text-center">
                <h2 className="font-display text-2xl leading-none font-bold tracking-tighter text-ink uppercase md:text-4xl">
                  ❧ {caption} ❧
                </h2>
                <p className="max-w-md font-body text-sm text-ink/60 italic">
                  {slot.alt} — plate {num}
                </p>
                {pager('ink')}
              </div>
            </div>
          </div>
        </section>
      )
  }
}
