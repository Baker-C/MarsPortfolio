import { Link } from 'react-router'
import type { ReactElement, ReactNode } from 'react'
import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { pieces } from '../../../content/writing'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'
import { HandNote, Stamp, Tape } from '../components/scraps'

/*
 * The same three scraps — hero art, the name card, the featured piece — pinned
 * to the board six different ways, one arrangement per theme vibe.
 */

function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`relative border border-edge bg-surface ${className}`}>{children}</div>
}

function TitleBlock({ big = false }: { big?: boolean }) {
  return (
    <>
      <Stamp className="border-accent-2 text-accent-2">portfolio</Stamp>
      <h1 className={`mt-2 font-display text-ink ${big ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl'}`}>
        {site.name}
      </h1>
      <p className="mt-2 font-body text-sm text-muted italic sm:text-base">{site.tagline}</p>
    </>
  )
}

function HeroArt({ frame = 'aspect-video' }: { frame?: string }) {
  return (
    <div className={`w-full overflow-hidden border border-edge ${frame}`}>
      <ArtPlaceholder slot={images.hero} />
    </div>
  )
}

function FeaturedLink() {
  const featured = pieces[0]
  return (
    <div>
      <Stamp className="border-accent text-accent">{featured.kind}</Stamp>
      <Link
        to={`writing/${featured.slug}`}
        className="mt-2 block font-display text-lg leading-snug text-ink underline-offset-4 hover:underline"
      >
        {featured.title}
      </Link>
    </div>
  )
}

/** horizon — a level timeline shelf: three cards in a calm row on a dashed line. */
function HomeHorizon() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 overflow-hidden px-6">
      <div className="relative flex w-full max-w-5xl items-center justify-center gap-6 sm:gap-10">
        <div aria-hidden className="absolute inset-x-4 top-1/2 border-t-2 border-dashed border-edge" />
        <Card className="hidden w-60 p-2 shadow-lg md:block">
          <Tape className="-top-2.5 left-1/3" />
          <HeroArt />
          <HandNote className="block pt-1 text-center">the field, at dusk</HandNote>
        </Card>
        <Card className="w-72 p-6 text-center shadow-xl sm:w-80">
          <Tape className="-top-2.5 left-1/3" />
          <TitleBlock />
        </Card>
        <Card className="hidden w-60 p-5 shadow-lg md:block">
          <Tape className="-top-2.5 left-1/3" />
          <HandNote className="block pb-1">read this one first —</HandNote>
          <FeaturedLink />
        </Card>
      </div>
      <HandNote>pinned in a level line, left to right →</HandNote>
    </div>
  )
}

/** grove — two tall columns of cards, leaning into each other, layered. */
function HomeGrove() {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden px-6">
      <div className="flex w-full max-w-2xl items-start justify-center">
        <div className="z-10 flex w-56 flex-col gap-5 sm:w-72">
          <Card className="rotate-1 p-2 shadow-xl">
            <Tape className="-top-2.5 left-8 -rotate-3" />
            <HeroArt frame="aspect-square" />
            <HandNote className="block pt-1 text-center">the field, at dusk</HandNote>
          </Card>
          <Card className="-rotate-1 p-5 shadow-lg">
            <Tape className="-bottom-2.5 right-6 rotate-2" />
            <HandNote className="block pb-1">read this one first ↓</HandNote>
            <FeaturedLink />
          </Card>
        </div>
        <div className="-ml-8 flex w-56 flex-col gap-5 pt-16 sm:w-72 sm:pt-24">
          <Card className="rotate-1 p-6 shadow-2xl">
            <Tape className="-top-2.5 right-8 rotate-2" />
            <TitleBlock />
          </Card>
          <Card className="hidden -rotate-2 p-2 shadow-md md:block">
            <Tape className="-top-2.5 left-10 rotate-3" />
            <div className="aspect-video w-full overflow-hidden border border-edge">
              <ArtPlaceholder slot={images.gallery[4]} />
            </div>
          </Card>
          <HandNote className="-rotate-2 self-end">two tall stacks, leaning in</HandNote>
        </div>
      </div>
    </div>
  )
}

/** pond — untaped rounded scraps drifting apart, still water between them. */
function HomePond() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-16 left-1/4 size-40 rounded-full border-2 border-dashed border-muted/30" />
        <div className="absolute right-1/4 bottom-16 size-28 rounded-full border-2 border-dashed border-accent/30" />
        <div className="absolute top-1/2 right-12 size-16 rounded-full border border-dashed border-accent-2/40" />
      </div>
      <div className="flex w-full max-w-3xl flex-col justify-center gap-6 sm:gap-8">
        <Card className="w-48 self-start rounded-3xl p-3 shadow-lg md:ml-10">
          <HeroArt frame="aspect-square rounded-2xl" />
          <HandNote className="block pt-1 text-center">the field, at dusk</HandNote>
        </Card>
        <Card className="w-72 self-end rounded-3xl p-6 text-center shadow-xl sm:w-80 md:mr-10">
          <TitleBlock />
        </Card>
        <Card className="w-60 self-center rounded-3xl p-5 shadow-lg">
          <FeaturedLink />
          <HandNote className="block pt-2">start here, quietly ↑</HandNote>
        </Card>
      </div>
    </div>
  )
}

/** bloom — the scatter cranked up: harder tilts, bigger type, more overlap. */
function HomeBloom() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6 pb-4">
      <div className="relative w-full max-w-2xl">
        <Card className="w-4/5 rotate-3 p-2 shadow-xl sm:p-3">
          <Tape className="-top-2.5 left-12 -rotate-6" />
          <Tape className="-top-2.5 right-16 rotate-6" />
          <HeroArt />
          <HandNote className="absolute bottom-2 -left-4 hidden -rotate-12 sm:block">
            the field, at dusk
          </HandNote>
          <div
            aria-hidden
            className="absolute -top-8 -right-8 hidden size-24 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-accent/60 text-center font-sans text-xs leading-tight tracking-widest uppercase text-accent md:flex"
          >
            field notes
          </div>
        </Card>

        <Card className="z-10 -mt-16 ml-auto w-11/12 -rotate-6 p-5 shadow-2xl transition-transform hover:rotate-0 sm:-mt-28 sm:w-3/5 sm:p-6">
          <Tape className="-top-2.5 right-10 rotate-6" />
          <TitleBlock big />
        </Card>

        <div className="absolute bottom-0 -left-2 z-10 hidden w-48 rotate-6 border border-edge bg-paper p-3 shadow-lg transition-transform hover:rotate-0 md:block">
          <HandNote className="absolute -top-7 left-2 block -rotate-6">
            read this one first ↓
          </HandNote>
          <FeaturedLink />
        </div>
      </div>
    </div>
  )
}

/** ridge — one strict vertical spine of hard-edged cards, imposing header. */
function HomeRidge() {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden px-6">
      <div className="flex w-full max-w-md flex-col">
        <div className="relative z-30 border-2 border-ink bg-surface p-6 text-center shadow-xl">
          <Stamp className="border-accent-2 text-accent-2">portfolio</Stamp>
          <h1 className="mt-2 font-display text-5xl tracking-tight uppercase text-ink sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-2 font-body text-sm text-muted italic">{site.tagline}</p>
        </div>
        <div className="relative z-20 -mt-0.5 border-2 border-ink bg-surface p-2 shadow-lg">
          <HeroArt />
        </div>
        <div className="relative z-10 -mt-0.5 flex items-center justify-between gap-4 border-2 border-ink bg-surface p-4 shadow-md">
          <FeaturedLink />
          <HandNote className="hidden sm:block">start the climb ↑</HandNote>
        </div>
      </div>
    </div>
  )
}

/** bouquet — everything gathered dense in the center, corners of the frame pinned. */
function HomeBouquet() {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden px-6">
      <div className="relative border-2 border-dashed border-accent/60 p-6 sm:p-10">
        <Tape className="-top-2.5 -left-4 -rotate-45" />
        <Tape className="-top-2.5 -right-4 rotate-45" />
        <Tape className="-bottom-2.5 -left-4 rotate-45" />
        <Tape className="-bottom-2.5 -right-4 -rotate-45" />
        <div className="relative flex w-72 flex-col items-center sm:w-96">
          <Card className="w-4/5 rotate-2 p-2 shadow-md">
            <HeroArt />
          </Card>
          <Card className="z-10 -mt-8 w-11/12 -rotate-1 p-5 text-center shadow-2xl">
            <Tape className="-top-2.5 left-1/3 rotate-2" />
            <TitleBlock />
          </Card>
          <Card className="z-20 -mt-5 w-3/5 rotate-1 p-4 shadow-lg">
            <FeaturedLink />
          </Card>
        </div>
        <HandNote className="absolute -bottom-9 left-1/3 -rotate-2">
          everything, gathered close
        </HandNote>
      </div>
    </div>
  )
}

const homes: Record<ThemeVibe, () => ReactElement> = {
  horizon: HomeHorizon,
  grove: HomeGrove,
  pond: HomePond,
  bloom: HomeBloom,
  ridge: HomeRidge,
  bouquet: HomeBouquet,
}

export function Home() {
  const { vibe } = useTheme()
  const HomeVibe = homes[vibe]
  return <HomeVibe />
}
