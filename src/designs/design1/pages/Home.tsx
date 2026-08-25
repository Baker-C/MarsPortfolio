import { Link } from 'react-router'
import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { Spread } from '../components/Spread'
import { PlatePanel } from '../components/PlatePanel'

export function Home() {
  return (
    <Spread
      verso={<PlatePanel slot={images.hero} caption="Frontispiece · the meadow at dusk" />}
      recto={
        <div className="flex h-full min-h-0 flex-col items-center justify-center gap-4 px-8 py-6 text-center md:gap-5 md:px-14">
          <p className="font-sans text-xs tracking-widest uppercase text-muted">
            Vol. I · A Field Journal
          </p>
          <span aria-hidden className="w-12 border-t border-edge" />
          <h1 className="font-display text-5xl text-ink md:text-6xl lg:text-7xl">
            {site.name}
          </h1>
          <p className="max-w-sm font-body text-base italic leading-relaxed text-muted md:text-lg">
            {site.tagline}
          </p>
          <div className="h-16 w-36 opacity-80 md:h-24 md:w-48">
            <ArtPlaceholder slot={images.gallery[5]} />
          </div>
          <span aria-hidden className="w-12 border-t border-edge" />
          <div className="flex items-center gap-6 font-sans text-xs tracking-widest uppercase">
            <Link
              to="/design1/writing"
              className="border-b border-accent pb-0.5 text-accent transition-colors hover:border-ink hover:text-ink"
            >
              Begin Reading →
            </Link>
            <Link
              to="/design1/gallery"
              className="border-b border-transparent pb-0.5 text-muted transition-colors hover:border-ink hover:text-ink"
            >
              View the Plates
            </Link>
          </div>
        </div>
      }
    />
  )
}
