import { Link } from 'react-router'
import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { useTheme } from '../../../theme/ThemeContext'

/** The two poster CTAs, toned for the field they sit on. */
function Ctas({ tone, shape = '' }: { tone: 'paper' | 'ink'; shape?: string }) {
  const base =
    tone === 'paper'
      ? 'border-paper text-paper hover:bg-paper hover:text-ink'
      : 'border-ink text-ink hover:bg-ink hover:text-paper'
  const cls = `border-2 px-6 py-3 font-display text-xl tracking-tight uppercase transition-colors ${base} ${shape}`
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link to="/design2/writing" className={cls}>
        Read the work →
      </Link>
      <Link to="/design2/gallery" className={cls}>
        See the gallery
      </Link>
    </div>
  )
}

/** Horizon: calm horizontal band poster — title strip between two color fields. */
function HorizonHome() {
  return (
    <section className="flex h-full flex-col overflow-hidden text-center">
      <div className="relative flex flex-1 items-end justify-center overflow-hidden bg-accent pb-4">
        <div
          aria-hidden="true"
          className="absolute -bottom-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-highlight"
        />
        <p className="relative z-10 font-sans text-xs tracking-widest text-paper/80 uppercase">
          {site.title}
        </p>
      </div>
      <div className="shrink-0 border-y-2 border-ink bg-paper px-6 py-4 md:py-8">
        <h1 className="font-display text-6xl leading-none font-bold tracking-tighter text-ink uppercase md:text-9xl">
          {site.name}
        </h1>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden bg-accent-2 p-6">
        <p className="max-w-md font-display text-xl leading-tight text-paper italic md:text-2xl">
          {site.tagline}
        </p>
        <Ctas tone="paper" />
      </div>
    </section>
  )
}

/** Grove: hard vertical split — letters run down a tall column, plates layer right. */
function GroveHome() {
  return (
    <section className="flex h-full overflow-hidden">
      <div className="flex w-1/3 shrink-0 flex-col justify-between overflow-hidden bg-accent p-4 md:w-1/4 md:p-6">
        <p className="font-sans text-xs tracking-widest text-paper/70 uppercase">
          {site.title}
        </p>
        <h1 className="flex min-h-0 flex-1 flex-col justify-evenly py-4 font-display leading-none font-bold tracking-tighter text-paper uppercase">
          {site.name.split('').map((ch, i) => (
            <span key={i} className="text-5xl md:text-7xl">
              {ch}
            </span>
          ))}
        </h1>
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col justify-end gap-6 overflow-hidden bg-paper p-6 md:p-10">
        <div
          aria-hidden="true"
          className="absolute top-8 right-0 hidden h-3/5 w-1/2 bg-accent-2/40 md:block"
        />
        <div className="absolute top-14 right-8 hidden h-3/5 w-1/2 border-4 border-ink shadow-2xl md:block">
          <ArtPlaceholder slot={images.hero} />
        </div>
        <p className="relative z-10 max-w-sm font-display text-2xl leading-tight text-ink italic md:text-3xl">
          {site.tagline}
        </p>
        <div className="relative z-10 flex justify-start">
          <Ctas tone="ink" />
        </div>
      </div>
    </section>
  )
}

/** Pond: rounded color plates floating on paper, the title still among them. */
function PondHome() {
  return (
    <section className="relative h-full overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="absolute top-8 left-1/4 h-40 w-40 rounded-full bg-accent/30"
      />
      <div
        aria-hidden="true"
        className="absolute right-1/4 bottom-10 h-56 w-56 rounded-full bg-accent-2/25"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-10 h-24 w-24 rounded-full bg-highlight/40"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-10 h-32 w-32 rounded-full bg-accent/20"
      />
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full border-4 border-edge"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 p-6 text-center md:gap-8">
        <p className="rounded-full border-2 border-ink px-4 py-1 font-sans text-xs tracking-widest text-ink uppercase">
          {site.title}
        </p>
        <h1 className="font-display text-7xl leading-none font-bold tracking-tighter text-ink uppercase md:text-9xl">
          {site.name}
        </h1>
        <p className="max-w-md rounded-3xl bg-surface px-8 py-4 font-display text-xl leading-tight text-ink italic md:text-2xl">
          {site.tagline}
        </p>
        <Ctas tone="ink" shape="rounded-full" />
      </div>
    </section>
  )
}

/** Bloom: playful scatter — rotated type blocks at mixed scales. */
function BloomHome() {
  const linkCls =
    'inline-block border-2 border-ink px-6 py-3 font-display text-xl tracking-tight text-ink uppercase transition-colors hover:bg-ink hover:text-paper'
  return (
    <section className="relative h-full overflow-hidden bg-paper">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-10 -rotate-6 font-display text-9xl leading-none font-bold tracking-tighter text-accent/15 uppercase select-none"
      >
        {site.name}
      </p>
      <span className="absolute top-6 left-6 rotate-3 border-2 border-ink bg-highlight px-3 py-1 font-sans text-xs tracking-widest text-ink uppercase">
        {site.title}
      </span>
      <div className="absolute top-10 right-1/4 hidden h-40 w-32 rotate-6 border-4 border-ink shadow-2xl md:block">
        <ArtPlaceholder slot={images.hero} />
      </div>
      <h1 className="absolute top-1/4 left-4 -rotate-3 font-display text-7xl leading-none font-bold tracking-tighter text-ink uppercase md:left-12 md:text-9xl">
        {site.name}
      </h1>
      <p className="absolute top-1/2 right-6 max-w-xs rotate-2 bg-accent p-4 font-display text-xl leading-tight text-paper italic md:right-16 md:text-2xl">
        {site.tagline}
      </p>
      <div className="absolute bottom-14 left-8 -rotate-2 md:bottom-16">
        <Link to="/design2/writing" className={linkCls}>
          Read the work →
        </Link>
      </div>
      <div className="absolute right-1/4 bottom-6 rotate-3">
        <Link to="/design2/gallery" className={linkCls}>
          See the gallery
        </Link>
      </div>
    </section>
  )
}

/** Ridge: monumental skyscraper stack — halved name filling the height, angular slabs. */
function RidgeHome() {
  const half = Math.ceil(site.name.length / 2)
  return (
    <section className="relative h-full overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 -left-8 w-1/4 -skew-x-6 bg-accent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 -right-8 w-1/4 skew-x-6 bg-accent-2"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-between overflow-hidden p-6 text-center md:p-8">
        <p className="font-sans text-xs tracking-widest text-ink/70 uppercase">
          {site.title}
        </p>
        <h1 className="flex min-h-0 flex-col font-display leading-none font-bold tracking-tighter text-ink uppercase">
          <span className="text-8xl md:text-9xl">{site.name.slice(0, half)}</span>
          <span className="text-8xl md:text-9xl">{site.name.slice(half)}</span>
        </h1>
        <p className="max-w-md font-display text-lg leading-tight text-ink italic md:text-xl">
          {site.tagline}
        </p>
        <Ctas tone="ink" />
      </div>
    </section>
  )
}

/** Bouquet: dense ornamental cluster inside a heavy double poster frame. */
function BouquetHome() {
  return (
    <section className="h-full overflow-hidden bg-accent-2 p-3 md:p-6">
      <div className="h-full overflow-hidden border-4 border-paper p-1 md:p-2">
        <div className="flex h-full flex-col items-center justify-center gap-3 overflow-hidden border-2 border-paper/60 p-4 text-center md:gap-4">
          <p className="font-display text-2xl text-paper/80">❧ ✳ ❧</p>
          <p className="font-sans text-xs tracking-widest text-paper/70 uppercase">
            {site.title}
          </p>
          <h1 className="font-display text-6xl leading-none font-bold tracking-tighter text-paper uppercase md:text-8xl">
            {site.name}
          </h1>
          <div className="hidden h-28 w-40 border-4 border-paper md:block">
            <ArtPlaceholder slot={images.hero} />
          </div>
          <p className="max-w-md font-display text-lg leading-tight text-paper italic md:text-xl">
            {site.tagline}
          </p>
          <Ctas tone="paper" />
          <p className="font-display text-2xl text-paper/80">❧ ✳ ❧</p>
        </div>
      </div>
    </section>
  )
}

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
