import { Link } from 'react-router'
import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { pieces } from '../../../content/writing'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { HandNote, Stamp, Tape } from '../components/scraps'

export function Home() {
  const featured = pieces[0]

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6 pb-4">
      <div className="relative w-full max-w-2xl">
        {/* Framed hero art, pinned slightly askew */}
        <div className="relative w-4/5 rotate-1 border border-edge bg-surface p-2 shadow-xl sm:p-3">
          <Tape className="-top-2.5 left-12 -rotate-3" />
          <Tape className="-top-2.5 right-16 rotate-2" />
          <div className="aspect-video w-full overflow-hidden border border-edge">
            <ArtPlaceholder slot={images.hero} />
          </div>
          <HandNote className="absolute bottom-2 -left-4 hidden -rotate-6 sm:block">
            the field, at dusk
          </HandNote>
          <div
            aria-hidden
            className="absolute -top-8 -right-8 hidden size-20 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-accent/60 text-center font-sans text-xs leading-tight tracking-widest uppercase text-accent md:flex"
          >
            field notes
          </div>
        </div>

        {/* Manuscript card floating over the photo, like a letter on the tree */}
        <div className="relative z-10 -mt-14 ml-auto w-11/12 -rotate-2 border border-edge bg-surface p-5 shadow-xl transition-transform hover:rotate-0 sm:-mt-24 sm:w-3/5 sm:p-6">
          <Tape className="-top-2.5 right-10 rotate-2" />
          <Stamp className="border-accent-2 text-accent-2">portfolio</Stamp>
          <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{site.name}</h1>
          <p className="mt-2 font-body text-sm text-muted italic sm:text-base">
            {site.tagline}
          </p>
        </div>

        {/* Featured scrap with a handwritten nudge */}
        <div className="absolute bottom-0 -left-2 z-10 hidden w-64 rotate-2 border border-edge bg-paper p-4 shadow-lg transition-transform hover:rotate-0 md:block">
          <HandNote className="absolute -top-7 left-2 block -rotate-2">
            read this one first ↓
          </HandNote>
          <Stamp className="border-accent text-accent">{featured.kind}</Stamp>
          <Link
            to={`writing/${featured.slug}`}
            className="mt-2 block font-display text-lg leading-snug text-ink underline-offset-4 hover:underline"
          >
            {featured.title}
          </Link>
        </div>
      </div>
    </div>
  )
}
