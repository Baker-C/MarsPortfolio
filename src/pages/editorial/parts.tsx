import { Link } from 'react-router'
import type { ReactNode } from 'react'
import { site } from '../../content/site'
import { images } from '../../content/images'
import type { ImageSlot } from '../../content/images'
import type { Piece } from '../../content/writing'
import { ArtPlaceholder } from '../../components/ui/ArtPlaceholder'
import { ThemeScope } from '../../theme/ThemeContext'
import { ThemeSwitcher } from '../../theme/ThemeSwitcher'

/*
 * Shared fragments of the nature-editorial scroll mocks (pages layer — these
 * import content directly). References: reference-theme-photos/FeatureDesign.
 */

const photoSrc = (slot: ImageSlot) => (slot.kind === 'photo' ? slot.src : undefined)
const photoAlt = (slot: ImageSlot) => slot.alt

/** Theme scope + switcher + the quiet site mark, shared by every route. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ThemeScope designKey="editorial" initialTheme="lilypond">
      <div className="fixed top-3 right-3 z-50">
        <ThemeSwitcher />
      </div>
      <nav className="fixed top-3 left-4 z-50 flex items-center gap-3 border border-edge bg-paper/85 px-3 py-1.5 font-sans text-[9px] tracking-widest uppercase backdrop-blur">
        <Link to="/" className="text-ink transition-colors hover:text-accent-2">
          {site.name}
        </Link>
        <span aria-hidden className="h-2.5 border-l border-edge" />
        <Link to="/creative" className="text-muted transition-colors hover:text-accent-2">
          Creative
        </Link>
        <Link to="/advocacy" className="text-muted transition-colors hover:text-accent-2">
          Advocacy
        </Link>
        <Link to="/editing" className="text-muted transition-colors hover:text-accent-2">
          Editing
        </Link>
      </nav>
      {children}
    </ThemeScope>
  )
}

/**
 * Hero collage after the sky-cross reference: an upturned reflection above,
 * a grass field below, and two offset windows cut through the seam.
 */
export function Hero() {
  const reflection = images.gallery[0]
  const grass = images.gallery[2]
  const windowSky = images.gallery[5]
  const windowTrees = images.hero
  return (
    <section className="relative h-dvh overflow-hidden bg-surface">
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
        <img
          src={photoSrc(reflection)}
          alt={photoAlt(reflection)}
          className="h-full w-full rotate-180 object-cover"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
        <img
          src={photoSrc(grass)}
          alt={photoAlt(grass)}
          className="h-full w-full object-cover object-left-bottom"
        />
      </div>

      {/* windows cut through the seam */}
      <div className="absolute top-[23%] left-1/2 h-[27%] w-44 -translate-x-[72%] overflow-hidden sm:w-56 md:w-64">
        <img
          src={photoSrc(windowSky)}
          alt={photoAlt(windowSky)}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 h-[26%] w-40 -translate-x-[18%] overflow-hidden sm:w-48 md:w-56">
        <img
          src={photoSrc(windowTrees)}
          alt={photoAlt(windowTrees)}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="absolute inset-x-0 top-7 text-center font-sans text-sm tracking-[0.4em] uppercase text-paper drop-shadow-lg">
        {site.name}
      </p>
      <div className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 px-6 text-paper drop-shadow-md">
        <p className="max-w-md text-center font-body text-sm italic">{site.tagline}</p>
        <span aria-hidden className="font-sans text-sm">
          ↓
        </span>
      </div>
      {windowTrees.kind === 'photo' && (
        <p className="absolute bottom-2 left-3 font-sans text-[8px] tracking-widest uppercase text-paper/70">
          Photos: Dietmar Rabich, W.carter · CC BY-SA 4.0 / PD
        </p>
      )}
    </section>
  )
}

/**
 * About spread after the Brooklyn Piers reference: dense flora verso; recto a
 * centered letterspaced heading, a line drawing, and a justified paragraph.
 */
export function AboutSpread() {
  const flora = images.gallery[4]
  return (
    <section className="md:grid md:min-h-dvh md:grid-cols-2">
      <div className="h-80 md:h-auto">
        <ArtPlaceholder slot={flora} />
      </div>
      <div className="flex flex-col items-center justify-center border-l border-edge bg-paper px-8 py-16 text-center md:px-14 lg:px-20">
        <h2 className="font-display text-2xl font-light tracking-[0.35em] uppercase text-ink md:text-3xl">
          About
          <span className="mt-2 block">Marlee</span>
        </h2>
        <div className="mt-8 h-24 w-32 opacity-80">
          <ArtPlaceholder slot={images.aboutPortrait} className="bg-paper" />
        </div>
        <div className="mt-8 max-w-sm space-y-3 text-justify font-body text-[12.5px] leading-relaxed text-ink">
          {site.about.paragraphs.slice(0, 2).map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-7 font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-ink">
          Writer &amp; Editor
        </p>
      </div>
    </section>
  )
}

/** One work as a full-bleed zine spread: photo half, paper half. */
export function WorkSpread({
  piece,
  slot,
  index,
  flip = false,
}: {
  piece: Piece
  slot: ImageSlot
  index: number
  flip?: boolean
}) {
  return (
    <article className="w-full border-t border-edge bg-paper md:grid md:min-h-dvh md:grid-cols-2">
      <div className={`h-72 md:h-auto ${flip ? 'md:order-2' : ''}`}>
        <ArtPlaceholder slot={slot} />
      </div>
      <div className="flex flex-col px-8 py-10 md:min-h-dvh md:px-14 md:py-12">
        <div className="flex items-baseline justify-between font-sans text-[9px] tracking-widest uppercase text-muted">
          <span>{piece.kind}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h3 className="max-w-sm font-display text-2xl font-light leading-snug text-ink md:text-3xl">
            {piece.title}
          </h3>
          <p className="mt-3 font-sans text-[9px] tracking-[0.25em] uppercase text-muted">
            {piece.venue} · {piece.year}
          </p>
          <span aria-hidden className="mt-6 w-10 border-t border-edge" />
          <p className="mt-6 max-w-xs text-justify font-body text-[12.5px] leading-relaxed text-ink">
            {piece.excerpt}
          </p>
          {piece.credit && (
            <p className="mt-4 max-w-xs font-sans text-[8.5px] tracking-widest uppercase text-muted">
              {piece.credit}
            </p>
          )}
          <a
            href={piece.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 border-b border-accent-2 pb-0.5 font-sans text-[10px] tracking-[0.25em] uppercase text-accent-2 transition-colors hover:border-ink hover:text-ink"
          >
            Read the original ↗
          </a>
        </div>
      </div>
    </article>
  )
}

/** Slim full-width register band between groups. */
export function SectionBand({ label }: { label: string }) {
  return (
    <div className="bg-ink py-6 text-center font-sans text-[10px] tracking-[0.35em] uppercase text-paper/70">
      {label}
    </div>
  )
}

/** The editing desk as its own full-bleed spread. */
export function EditingSpread() {
  const { heading, blurb, paragraphs, project } = site.editing
  return (
    <article className="w-full border-t border-edge bg-paper md:grid md:min-h-dvh md:grid-cols-2">
      <div className="h-72 md:h-auto">
        <ArtPlaceholder slot={images.gallery[1]} />
      </div>
      <div className="flex flex-col items-center justify-center px-8 py-12 text-center md:min-h-dvh md:px-14">
        <h3 className="font-display text-2xl font-light tracking-[0.35em] uppercase text-ink">
          {heading}
        </h3>
        <p className="mt-3 font-body text-sm italic text-muted">{blurb}</p>
        <span aria-hidden className="mt-6 w-10 border-t border-edge" />
        <div className="mt-6 max-w-xs space-y-3 text-justify font-body text-[12.5px] leading-relaxed text-ink">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-7 font-sans text-[9px] tracking-[0.25em] uppercase text-muted">
          {project.note}
        </p>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 border-b border-accent-2 pb-0.5 font-sans text-[10px] tracking-[0.25em] uppercase text-accent-2 transition-colors hover:border-ink hover:text-ink"
        >
          {project.label} ↗
        </a>
      </div>
    </article>
  )
}

/**
 * The Creative chapter as a "Reading the Tree" feature: one background
 * photograph, a translucent page laid over it (cut window left, text right),
 * and the photo's subject re-overlaid with a soft mask so it pops through
 * the page.
 */
export function CreativeFeature({
  to,
  number,
  label,
  note,
  titles,
}: {
  to: string
  number: string
  label: string
  note: string
  titles: string[]
}) {
  const scene = images.gallery[0]
  const src = photoSrc(scene)
  return (
    <Link
      to={to}
      className="group relative block min-h-dvh overflow-hidden border-t border-edge"
    >
      {/* the field, full bleed */}
      <img src={src} alt={photoAlt(scene)} className="absolute inset-0 h-full w-full object-cover" />

      {/* the page laid over it */}
      <div className="absolute inset-x-[8%] inset-y-[16%] flex flex-col border border-paper/60 shadow-2xl md:grid md:grid-cols-2">
        {/* cut window — the field shows through, framed twice like a plate */}
        <div className="relative min-h-40 flex-1 md:min-h-0">
          <div aria-hidden className="absolute inset-3 border border-paper/70" />
        </div>
        {/* the text leaf */}
        <div className="flex flex-col items-center justify-center gap-4 bg-paper/90 px-8 py-10 text-center backdrop-blur-[2px] md:px-12">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted">
            Chapter {number}
          </p>
          <h2 className="font-display text-3xl font-light tracking-[0.35em] uppercase text-ink transition-colors group-hover:text-accent-2 md:text-4xl">
            {label}
          </h2>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted">{note}</p>
          <span aria-hidden className="w-10 border-t border-edge" />
          <ol className="space-y-1.5">
            {titles.map((title, idx) => (
              <li key={title} className="font-body text-[12px] italic leading-snug text-ink/80">
                <span className="mr-2 font-sans text-[9px] not-italic tracking-widest text-muted">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {title}
              </li>
            ))}
          </ol>
          <span
            aria-hidden
            className="mt-2 border-b border-edge pb-1 font-sans text-[10px] tracking-[0.25em] uppercase text-muted transition-colors group-hover:border-accent-2 group-hover:text-accent-2"
          >
            Enter →
          </span>
        </div>
      </div>

      {/* the tree again, masked soft, popping through the page */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(ellipse_26%_34%_at_50%_16%,black_42%,transparent_75%)]"
      />

      <p className="absolute right-[9%] bottom-[10%] font-sans text-[9px] font-bold tracking-[0.3em] uppercase text-paper drop-shadow-md">
        Reading the field
      </p>
    </Link>
  )
}

/**
 * The Advocacy chapter as a letter card: the same photograph runs full bleed
 * and blurred behind, then sharp inside the cream card, letter text below.
 */
export function AdvocacyFeature({
  to,
  number,
  label,
  note,
  titles,
}: {
  to: string
  number: string
  label: string
  note: string
  titles: string[]
}) {
  const scene = images.gallery[6]
  const src = photoSrc(scene)
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden border-t border-edge py-14 md:py-20"
    >
      {/* the same scene, blurred, as the ground */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/35" />

      {/* the letter card */}
      <div className="relative mx-auto w-[88%] max-w-xl bg-paper p-5 shadow-2xl md:p-7">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={src} alt={photoAlt(scene)} className="h-full w-full object-cover" />
        </div>
        <div className="px-2 pt-8 pb-4 md:px-4">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted">
            Chapter {number} · {note}
          </p>
          <h2 className="mt-2 font-display text-2xl font-light tracking-[0.3em] uppercase text-ink transition-colors group-hover:text-accent-2">
            {label}
          </h2>
          <p className="mt-4 max-w-md text-justify font-body text-[12.5px] leading-relaxed text-ink">
            Education and advocacy writing on fair housing — from protected-class
            policy to Oregon’s housing history, written and produced at the Fair
            Housing Council of Oregon.
          </p>
          <ol className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {titles.map((title, idx) => (
              <li key={title} className="flex gap-2 font-body text-[11.5px] leading-snug text-ink/80">
                <span className="shrink-0 pt-px font-sans text-[8.5px] tracking-widest text-muted">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span>{title}</span>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex items-baseline justify-between">
            <p className="font-body text-[12.5px] italic text-ink">From, Marlee</p>
            <span
              aria-hidden
              className="border-b border-edge pb-0.5 font-sans text-[10px] tracking-[0.25em] uppercase text-muted transition-colors group-hover:border-accent-2 group-hover:text-accent-2"
            >
              Enter →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/** Footer band on the dark ground. */
export function DarkFooter() {
  return (
    <footer className="bg-ink py-10 text-center font-sans text-[9px] tracking-[0.3em] uppercase text-paper/50">
      {site.title} · {site.contact.email}
    </footer>
  )
}

/**
 * A chapter as its own full-viewport section: photo half, cover-page half.
 * With `to` it links into the chapter's page; without, it is the chapter
 * page's own static cover (scroll cue instead of an enter link).
 */
export function ChapterSection({
  to,
  number,
  label,
  note,
  slot,
  flip = false,
}: {
  to?: string
  number: string
  label: string
  note: string
  slot: ImageSlot
  flip?: boolean
}) {
  const inner = (
    <>
      <div className={`h-72 md:h-auto ${flip ? 'md:order-2' : ''}`}>
        <ArtPlaceholder slot={slot} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center md:min-h-dvh md:px-14">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted">
          Chapter {number}
        </p>
        <h2 className="font-display text-3xl font-light tracking-[0.35em] uppercase text-ink transition-colors group-hover:text-accent-2 md:text-4xl">
          {label}
        </h2>
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted">{note}</p>
        <span
          aria-hidden
          className="mt-3 border-b border-edge pb-1 font-sans text-[10px] tracking-[0.25em] uppercase text-muted transition-colors group-hover:border-accent-2 group-hover:text-accent-2"
        >
          {to ? 'Enter →' : '↓'}
        </span>
      </div>
    </>
  )
  const cls = 'group block w-full border-t border-edge bg-paper md:grid md:min-h-dvh md:grid-cols-2'
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <header className={cls}>{inner}</header>
  )
}
