import { useState } from 'react'
import { images } from '../../../content/images'
import type { ImageSlot } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'
import { roman } from '../components/roman'

/** Plates bound per spread — the imposition changes with the vibe. */
const perSpread: Record<ThemeVibe, number> = {
  horizon: 3,
  grove: 2,
  pond: 3,
  bloom: 3,
  ridge: 2,
  bouquet: 3,
}

function Caption({
  n,
  slot,
  className = 'text-center',
}: {
  n: number
  slot: ImageSlot
  className?: string
}) {
  return (
    <figcaption className={`mt-2 shrink-0 ${className}`}>
      <span className="font-sans text-xs tracking-widest uppercase text-muted">
        Plate {roman(n)}
      </span>
      {slot.caption && (
        <span className="mt-0.5 hidden font-body text-sm italic text-ink sm:block">
          {slot.caption}
        </span>
      )}
    </figcaption>
  )
}

/** The plate area of the spread, re-imposed per vibe. */
function Plates({
  vibe,
  visible,
  start,
}: {
  vibe: ThemeVibe
  visible: ImageSlot[]
  start: number
}) {
  switch (vibe) {
    case 'horizon':
      // A calm symmetric band of three wide plates ruled top and bottom.
      return (
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-none md:gap-8">
          {visible.map((slot, i) => (
            <figure key={start + i} className="flex min-h-0 flex-col">
              <div className="min-h-0 flex-1 border-y border-edge">
                <ArtPlaceholder slot={slot} />
              </div>
              <Caption n={start + i} slot={slot} />
            </figure>
          ))}
        </div>
      )
    case 'grove':
      // Two tall plates of unequal width, staggered like layered canopy.
      return (
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-4 md:grid-cols-5 md:grid-rows-none md:gap-6">
          {visible.map((slot, i) => (
            <figure
              key={start + i}
              className={`flex min-h-0 flex-col ${
                i === 0 ? 'md:col-span-2 md:pt-10' : 'md:col-span-3 md:pb-10'
              }`}
            >
              <div className="min-h-0 flex-1 border border-edge">
                <ArtPlaceholder slot={slot} />
              </div>
              <Caption n={start + i} slot={slot} className="text-left" />
            </figure>
          ))}
        </div>
      )
    case 'pond':
      // Oval plates drifting at different heights across still water.
      return (
        <div className="mt-4 flex min-h-0 flex-1 flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
          {visible.map((slot, i) => (
            <figure
              key={start + i}
              className={`flex min-h-0 flex-col items-center ${
                i === 0 ? 'md:self-start' : i === 1 ? 'md:self-center' : 'md:self-end'
              }`}
            >
              <div
                className={`overflow-hidden rounded-full border border-edge ${
                  i === 1 ? 'h-36 w-56 md:h-52 md:w-80' : 'h-24 w-40 md:h-40 md:w-60'
                }`}
              >
                <ArtPlaceholder slot={slot} />
              </div>
              <Caption n={start + i} slot={slot} />
            </figure>
          ))}
        </div>
      )
    case 'bloom':
      // Tipped-in mounted plates, each at its own tilt and height.
      return (
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 grid-rows-3 gap-3 md:grid-cols-3 md:grid-rows-none md:gap-8 md:px-6">
          {visible.map((slot, i) => {
            const tilt = ['rotate-2', '-rotate-3', 'rotate-1'][i % 3]
            const offset = ['md:mb-10', 'md:mt-10', 'md:mb-4'][i % 3]
            return (
              <figure key={start + i} className={`flex min-h-0 flex-col ${tilt} ${offset}`}>
                <div className="min-h-0 flex-1 border border-edge bg-paper p-1.5 shadow-md">
                  <div className="h-full min-h-0">
                    <ArtPlaceholder slot={slot} />
                  </div>
                </div>
                <Caption n={start + i} slot={slot} />
              </figure>
            )
          })}
        </div>
      )
    case 'ridge':
      // Two monumental plates in heavy angular frames.
      return (
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-none md:gap-10 md:px-10">
          {visible.map((slot, i) => (
            <figure key={start + i} className="flex min-h-0 flex-col">
              <div className="min-h-0 flex-1 border-2 border-ink">
                <ArtPlaceholder slot={slot} />
              </div>
              <Caption
                n={start + i}
                slot={slot}
                className="border-l-2 border-ink pl-3 text-left"
              />
            </figure>
          ))}
        </div>
      )
    case 'bouquet':
      // A dense central cluster: large double-framed plate flanked by small ones.
      return (
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 grid-rows-3 gap-3 md:grid-cols-4 md:grid-rows-none md:gap-6">
          {visible.map((slot, i) => (
            <figure
              key={start + i}
              className={`flex min-h-0 flex-col ${i === 1 ? 'md:col-span-2' : 'md:my-14'}`}
            >
              {i === 1 ? (
                <div className="min-h-0 flex-1 border border-edge p-1.5">
                  <div className="h-full min-h-0 border border-edge">
                    <ArtPlaceholder slot={slot} />
                  </div>
                </div>
              ) : (
                <div className="min-h-0 flex-1 border border-edge">
                  <ArtPlaceholder slot={slot} />
                </div>
              )}
              <Caption n={start + i} slot={slot} />
            </figure>
          ))}
        </div>
      )
  }
}

export function Gallery() {
  const { vibe } = useTheme()
  const plates = images.gallery
  const per = perSpread[vibe]
  const spreadCount = Math.ceil(plates.length / per)
  const [rawSpread, setSpread] = useState(0)
  // Clamp: switching vibe can shrink the number of spreads.
  const spread = Math.min(rawSpread, spreadCount - 1)
  const start = spread * per
  const visible = plates.slice(start, start + per)

  return (
    <div className="flex h-full min-h-0 flex-col px-6 py-5 md:px-12 md:py-7">
      <div className="shrink-0 text-center">
        <p className="font-sans text-xs tracking-widest uppercase text-muted">The Plates</p>
        <h2 className="mt-1 font-display text-2xl text-ink md:text-3xl">Gallery</h2>
      </div>

      <Plates vibe={vibe} visible={visible} start={start} />

      <div className="mt-4 flex shrink-0 items-center justify-between font-sans text-xs tracking-widest uppercase text-muted">
        <button
          type="button"
          onClick={() => setSpread(Math.max(0, spread - 1))}
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
          onClick={() => setSpread(Math.min(spreadCount - 1, spread + 1))}
          disabled={spread === spreadCount - 1}
          className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
