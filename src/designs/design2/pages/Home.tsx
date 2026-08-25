import { Link } from 'react-router'
import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'

export function Home() {
  return (
    <section className="relative h-full overflow-hidden bg-accent">
      {/* Hero art as a tilted poster plate bleeding off the right edge */}
      <div className="absolute -right-16 top-1/2 hidden h-4/5 w-1/2 -translate-y-1/2 rotate-3 border-4 border-ink shadow-2xl md:block">
        <ArtPlaceholder slot={images.hero} />
      </div>

      {/* Giant ghost word behind everything */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-0 font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 uppercase select-none"
      >
        {site.name}
        {site.name}
      </p>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <p className="font-sans text-xs tracking-widest text-paper/70 uppercase">
          {site.title}
        </p>

        <div className="max-w-3xl">
          <h1 className="font-display text-8xl leading-none font-bold tracking-tighter text-paper uppercase md:text-9xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-md font-display text-2xl leading-tight text-paper italic md:ml-24 md:text-3xl">
            {site.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <Link
            to="/design2/writing"
            className="border-2 border-paper px-6 py-3 font-display text-xl tracking-tight text-paper uppercase transition-colors hover:bg-paper hover:text-accent"
          >
            Read the work →
          </Link>
          <Link
            to="/design2/gallery"
            className="border-2 border-paper/50 px-6 py-3 font-display text-xl tracking-tight text-paper/80 uppercase transition-colors hover:border-paper hover:bg-paper hover:text-accent"
          >
            See the gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
