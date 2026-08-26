import { Link } from 'react-router'
import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { useTheme } from '../../../theme/ThemeContext'
import { roman } from '../components/roman'

/**
 * Frontispiece. The active vibe re-imposes the leaf entirely: six different
 * compositions of the same title, tagline, plates, and links.
 */
export function Home() {
  const { vibe } = useTheme()
  switch (vibe) {
    case 'horizon':
      return <HorizonHome />
    case 'grove':
      return <GroveHome />
    case 'pond':
      return <PondHome />
    case 'bloom':
      return <BloomHome />
    case 'ridge':
      return <RidgeHome />
    case 'bouquet':
      return <BouquetHome />
  }
}

function Kicker({ className = '' }: { className?: string }) {
  return (
    <p className={`font-sans text-xs tracking-widest uppercase text-muted ${className}`}>
      Vol. I · A Field Journal
    </p>
  )
}

function JournalLinks({ align = 'center' }: { align?: 'center' | 'start' }) {
  return (
    <div
      className={`flex items-center gap-6 font-sans text-xs tracking-widest uppercase ${
        align === 'start' ? 'justify-start' : 'justify-center'
      }`}
    >
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
  )
}

/** Calm horizontal bands: panoramic plate over a centered title band. */
function HorizonHome() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 basis-2/5 border-b border-edge">
        <ArtPlaceholder slot={images.hero} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <Kicker />
        <span aria-hidden className="w-24 border-t border-edge" />
        <h1 className="font-display text-5xl text-ink md:text-6xl">{site.name}</h1>
        <p className="max-w-md font-body italic leading-relaxed text-muted md:text-lg">
          {site.tagline}
        </p>
        <span aria-hidden className="w-24 border-t border-edge" />
        <JournalLinks />
      </div>
      <div
        aria-hidden
        className="hidden h-16 shrink-0 grid-cols-3 divide-x divide-edge border-t border-edge opacity-70 md:grid"
      >
        {[0, 2, 4].map((i) => (
          <div key={i} className="min-h-0">
            <ArtPlaceholder slot={images.gallery[i]} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Asymmetric vertical split: tall layered plate column, low-set title, contents rail. */
function GroveHome() {
  return (
    <div className="flex h-full min-h-0">
      <div className="hidden min-h-0 w-1/3 flex-col border-r border-edge md:flex">
        <div className="min-h-0 basis-2/3 border-b border-edge">
          <ArtPlaceholder slot={images.hero} />
        </div>
        <div className="min-h-0 basis-1/3 opacity-80">
          <ArtPlaceholder slot={images.gallery[4]} />
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-4 px-8 py-8 lg:border-r lg:border-edge lg:px-12">
        <Kicker />
        <h1 className="font-display text-5xl text-ink md:text-6xl lg:text-7xl">
          {site.name}
        </h1>
        <p className="max-w-sm font-body italic leading-relaxed text-muted md:text-lg">
          {site.tagline}
        </p>
        <span aria-hidden className="w-12 border-t border-edge" />
        <JournalLinks align="start" />
      </div>
      <div className="hidden w-52 min-h-0 shrink-0 flex-col justify-between px-6 py-8 lg:flex">
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-muted">Contents</p>
          <ol className="mt-4">
            {site.nav
              .filter((item) => item.path !== '')
              .map((item, idx) => (
                <li key={item.path} className={idx > 0 ? 'border-t border-edge' : ''}>
                  <Link
                    to={`/design1/${item.path}`}
                    className="flex items-baseline gap-3 py-2.5 font-sans text-xs tracking-widest uppercase text-muted transition-colors hover:text-accent"
                  >
                    <span className="w-5 shrink-0 font-display text-sm text-ink">
                      {roman(idx)}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ol>
        </div>
        <div className="h-20 opacity-60">
          <ArtPlaceholder slot={images.gallery[1]} />
        </div>
      </div>
    </div>
  )
}

/** Floating rounded clusters: oval plates scattered around a central title card. */
function PondHome() {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-8 left-10 hidden h-28 w-44 overflow-hidden rounded-full border border-edge opacity-90 md:block"
      >
        <ArtPlaceholder slot={images.gallery[2]} />
      </div>
      <div
        aria-hidden
        className="absolute bottom-12 left-24 hidden h-20 w-32 overflow-hidden rounded-full border border-edge opacity-60 md:block"
      >
        <ArtPlaceholder slot={images.gallery[1]} />
      </div>
      <div
        aria-hidden
        className="absolute top-14 right-12 hidden h-24 w-24 overflow-hidden rounded-full border border-edge opacity-75 md:block"
      >
        <ArtPlaceholder slot={images.gallery[5]} />
      </div>
      <div
        aria-hidden
        className="absolute right-24 bottom-8 hidden h-32 w-52 overflow-hidden rounded-full border border-edge md:block"
      >
        <ArtPlaceholder slot={images.hero} />
      </div>
      <div className="flex h-full min-h-0 items-center justify-center px-6">
        <div className="flex max-w-lg flex-col items-center gap-4 rounded-full border border-edge bg-paper px-14 py-12 text-center shadow-sm md:px-20 md:py-14">
          <Kicker />
          <h1 className="font-display text-4xl text-ink md:text-5xl">{site.name}</h1>
          <p className="max-w-xs font-body text-sm italic leading-relaxed text-muted md:text-base">
            {site.tagline}
          </p>
          <JournalLinks />
        </div>
      </div>
    </div>
  )
}

/** Playful scatter: tipped-in rotated plates around an off-grid title. */
function BloomHome() {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <figure
        aria-hidden
        className="absolute top-8 right-14 hidden w-48 rotate-3 border border-edge bg-paper p-1.5 shadow-md md:block"
      >
        <div className="h-32">
          <ArtPlaceholder slot={images.gallery[0]} />
        </div>
      </figure>
      <figure
        aria-hidden
        className="absolute right-40 bottom-10 hidden w-40 -rotate-6 border border-edge bg-paper p-1.5 shadow-md md:block"
      >
        <div className="h-28">
          <ArtPlaceholder slot={images.gallery[1]} />
        </div>
      </figure>
      <figure
        aria-hidden
        className="absolute bottom-16 left-10 hidden w-32 rotate-2 border border-edge bg-paper p-1.5 shadow-md lg:block"
      >
        <div className="h-24">
          <ArtPlaceholder slot={images.gallery[5]} />
        </div>
      </figure>
      <div className="flex h-full min-h-0 flex-col justify-center gap-4 px-10 md:px-24">
        <Kicker className="-rotate-2 self-start" />
        <h1 className="-rotate-1 font-display text-6xl text-ink md:text-7xl">{site.name}</h1>
        <p className="ml-10 max-w-sm rotate-1 font-body italic leading-relaxed text-muted md:ml-16 md:text-lg">
          {site.tagline}
        </p>
        <div className="ml-4 rotate-1">
          <JournalLinks align="start" />
        </div>
      </div>
    </div>
  )
}

/** Monumental stacked verticals: full-height title wall, plate as a narrow sidebar. */
function RidgeHome() {
  return (
    <div className="flex h-full min-h-0">
      <div className="hidden w-28 shrink-0 border-r-2 border-ink md:block lg:w-36">
        <ArtPlaceholder slot={images.gallery[3]} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-between px-8 py-8 md:px-14">
        <Kicker />
        <div className="min-h-0">
          <h1 className="font-display text-6xl leading-none tracking-tight uppercase text-ink md:text-8xl">
            {site.name}
          </h1>
          <p className="mt-3 font-display text-2xl tracking-widest uppercase text-muted md:text-4xl">
            Field Journal
          </p>
          <span aria-hidden className="mt-6 block border-t-2 border-ink" />
          <p className="mt-5 max-w-md font-body italic leading-relaxed text-muted md:text-lg">
            {site.tagline}
          </p>
        </div>
        <div className="border-t-2 border-ink pt-4">
          <JournalLinks align="start" />
        </div>
      </div>
    </div>
  )
}

/** Dense ornamental cluster: double-framed frontispiece with stacked rules. */
function BouquetHome() {
  return (
    <div className="flex h-full min-h-0 items-center justify-center p-4 md:p-6">
      <div className="h-full w-full max-w-2xl border border-edge p-2">
        <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 border border-edge px-8 text-center">
          <p aria-hidden className="text-accent">
            ✾
          </p>
          <Kicker />
          <span aria-hidden className="w-32 border-t border-edge" />
          <span aria-hidden className="w-20 border-t border-edge" />
          <h1 className="font-display text-4xl text-ink md:text-5xl lg:text-6xl">
            {site.name}
          </h1>
          <div aria-hidden className="flex h-16 items-center gap-2 opacity-80 md:h-20">
            <div className="h-full w-16 md:w-20">
              <ArtPlaceholder slot={images.gallery[1]} />
            </div>
            <div className="h-full w-24 md:w-28">
              <ArtPlaceholder slot={images.hero} />
            </div>
            <div className="h-full w-16 md:w-20">
              <ArtPlaceholder slot={images.gallery[0]} />
            </div>
          </div>
          <p className="max-w-sm font-body text-sm italic leading-relaxed text-muted md:text-base">
            {site.tagline}
          </p>
          <span aria-hidden className="w-20 border-t border-edge" />
          <span aria-hidden className="w-32 border-t border-edge" />
          <JournalLinks />
          <p aria-hidden className="text-accent">
            ❦
          </p>
        </div>
      </div>
    </div>
  )
}
