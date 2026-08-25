import { useState } from 'react'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { Pager } from '../components/Pager'

// Full-screen poster spread per artwork; flip through in place.
const fields = ['bg-accent', 'bg-accent-2', 'bg-muted']

export function Gallery() {
  const [index, setIndex] = useState(0)
  const slot = images.gallery[index]
  const field = fields[index % fields.length]

  return (
    <section className="flex h-full flex-col overflow-hidden md:flex-row">
      {/* The artwork, full bleed */}
      <div className="relative min-h-0 flex-1 border-b-2 border-ink md:border-r-2 md:border-b-0">
        <ArtPlaceholder slot={slot} />
        <span className="absolute top-4 left-4 border-2 border-ink bg-paper px-3 py-1 font-sans text-xs tracking-widest text-ink uppercase">
          Gallery
        </span>
      </div>

      {/* The caption as poster type */}
      <div
        className={`relative flex shrink-0 flex-col justify-between overflow-hidden p-6 transition-colors duration-300 md:w-2/5 md:p-10 ${field}`}
      >
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-2 font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 select-none"
        >
          {String(index + 1).padStart(2, '0')}
        </p>

        <span className="relative z-10 font-display text-7xl leading-none font-bold tracking-tighter text-paper md:text-8xl">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative z-10">
          <h2 className="font-display text-4xl leading-none font-bold tracking-tighter text-paper uppercase md:text-6xl">
            {slot.caption ?? slot.alt}
          </h2>
          <p className="mt-4 max-w-sm font-body text-lg text-paper/70 italic">
            {slot.alt}
          </p>
        </div>

        <Pager
          index={index}
          total={images.gallery.length}
          onPrev={() => setIndex((i) => Math.max(0, i - 1))}
          onNext={() => setIndex((i) => Math.min(images.gallery.length - 1, i + 1))}
          tone="paper"
        />
      </div>
    </section>
  )
}
