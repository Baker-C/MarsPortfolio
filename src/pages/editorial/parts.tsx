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

/** Theme scope + switcher + tiny variant nav, shared by every editorial route. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ThemeScope designKey="editorial" initialTheme="lilypond">
      <div className="fixed top-3 right-3 z-50">
        <ThemeSwitcher />
      </div>
      <nav className="fixed top-3 left-4 z-50 flex items-center gap-3 border border-edge bg-paper/85 px-3 py-1.5 font-sans text-[9px] tracking-widest uppercase backdrop-blur">
        <Link to="/" className="text-muted transition-colors hover:text-accent-2">
          Mocks
        </Link>
        <span aria-hidden className="h-2.5 border-l border-edge" />
        <Link to="/a" className="text-ink transition-colors hover:text-accent-2">
          Scroll
        </Link>
        <Link to="/b" className="text-ink transition-colors hover:text-accent-2">
          Cards
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
 * The whole section links into the chapter's scroll page.
 */
export function ChapterSection({
  to,
  number,
  label,
  note,
  slot,
  flip = false,
}: {
  to: string
  number: string
  label: string
  note: string
  slot: ImageSlot
  flip?: boolean
}) {
  return (
    <Link
      to={to}
      className="group block w-full border-t border-edge bg-paper md:grid md:min-h-dvh md:grid-cols-2"
    >
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
          Enter →
        </span>
      </div>
    </Link>
  )
}
