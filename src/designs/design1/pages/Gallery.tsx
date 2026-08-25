import { useState } from 'react'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { roman } from '../components/roman'

const PER_SPREAD = 2

export function Gallery() {
  const plates = images.gallery
  const spreadCount = Math.ceil(plates.length / PER_SPREAD)
  const [spread, setSpread] = useState(0)
  const start = spread * PER_SPREAD
  const visible = plates.slice(start, start + PER_SPREAD)

  return (
    <div className="flex h-full min-h-0 flex-col px-6 py-5 md:px-12 md:py-7">
      <div className="shrink-0 text-center">
        <p className="font-sans text-xs tracking-widest uppercase text-muted">The Plates</p>
        <h2 className="mt-1 font-display text-2xl text-ink md:text-3xl">Gallery</h2>
      </div>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:gap-10">
        {visible.map((slot, i) => (
          <figure key={start + i} className="flex min-h-0 flex-col">
            <div className="min-h-0 flex-1 border border-edge">
              <ArtPlaceholder slot={slot} />
            </div>
            <figcaption className="mt-2 shrink-0 text-center">
              <span className="font-sans text-xs tracking-widest uppercase text-muted">
                Plate {roman(start + i)}
              </span>
              {slot.caption && (
                <span className="mt-0.5 hidden font-body text-sm italic text-ink sm:block">
                  {slot.caption}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between font-sans text-xs tracking-widest uppercase text-muted">
        <button
          type="button"
          onClick={() => setSpread((s) => Math.max(0, s - 1))}
          disabled={spread === 0}
          className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
        >
          ← Prev
        </button>
        <span aria-live="polite">
          Spread {spread + 1} of {spreadCount}
        </span>
        <button
          type="button"
          onClick={() => setSpread((s) => Math.min(spreadCount - 1, s + 1))}
          disabled={spread === spreadCount - 1}
          className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
