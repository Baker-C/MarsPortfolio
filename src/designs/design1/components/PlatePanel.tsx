import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import type { ImageSlot } from '../../../content/images'

/** Full-bleed image page with an optional small-caps caption strip. */
export function PlatePanel({ slot, caption }: { slot: ImageSlot; caption?: string }) {
  return (
    <figure className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1">
        <ArtPlaceholder slot={slot} />
      </div>
      {caption && (
        <figcaption className="shrink-0 border-t border-edge px-6 py-2 text-center font-sans text-xs tracking-widest uppercase text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
