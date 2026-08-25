import { useState } from 'react'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { HandNote, Pager, Stamp, Tape } from '../components/scraps'

/** Gallery as a stack of pinned prints — flip through, never scroll. */
export function Gallery() {
  const slots = images.gallery
  const n = slots.length
  const [i, setI] = useState(0)
  const slot = slots[i]
  const behind = slots[(i + 1) % n]
  const further = slots[(i + 2) % n]
  const prev = () => setI((v) => (v - 1 + n) % n)
  const next = () => setI((v) => (v + 1) % n)

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-6">
      <div className="relative w-full max-w-xs md:max-w-sm">
        {/* the next prints in the stack, peeking out */}
        <div aria-hidden className="absolute inset-0 rotate-6 border border-edge bg-surface p-2 opacity-70 shadow-md">
          <div className="h-full w-full opacity-40">
            <ArtPlaceholder slot={behind} />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 -rotate-3 border border-edge bg-surface p-2 opacity-50 shadow-sm">
          <div className="h-full w-full opacity-30">
            <ArtPlaceholder slot={further} />
          </div>
        </div>

        <figure
          key={i}
          className="relative -rotate-2 border border-edge bg-surface p-3 shadow-xl transition-transform hover:rotate-0"
        >
          <Tape className="-top-2.5 left-1/3 -rotate-2" />
          <div className="aspect-square w-full overflow-hidden border border-edge">
            <ArtPlaceholder slot={slot} />
          </div>
          <figcaption className="flex items-center justify-between gap-2 pt-2">
            <span className="font-hand text-xl text-ink">{slot.caption ?? slot.alt}</span>
            <Stamp>
              {i + 1} / {n}
            </Stamp>
          </figcaption>
        </figure>

        <HandNote className="absolute -top-8 -right-2 rotate-2 hidden sm:block">
          from the flat files ↓
        </HandNote>
      </div>

      <Pager onPrev={prev} onNext={next} label="flip" />
    </div>
  )
}
