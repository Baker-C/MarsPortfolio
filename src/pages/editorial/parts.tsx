import { useState } from 'react'
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

const ALT_NAME = 'Good Willed Woman'

/**
 * The site mark: clicking scrolls home and crossfades the name into its
 * meaning; hovering the meaning explains it (after Portfolio_v2's Name).
 */
function NameToggle() {
  const [isAlt, setIsAlt] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setIsAlt((v) => !v)
      }}
      aria-pressed={isAlt}
      aria-label="Toggle name text"
      className="group relative cursor-pointer text-ink transition-colors hover:text-accent-2"
    >
      <span className="relative inline-flex justify-center">
        <span aria-hidden className="whitespace-pre opacity-0 select-none">
          {ALT_NAME}
        </span>
        <span
          className={`absolute inset-0 flex justify-center whitespace-pre transition-opacity duration-300 ${isAlt ? 'opacity-0' : 'opacity-100'}`}
        >
          {site.name}
        </span>
        <span
          aria-hidden={!isAlt}
          className={`absolute inset-0 flex justify-center whitespace-pre transition-opacity duration-300 ${isAlt ? 'opacity-100' : 'opacity-0'}`}
        >
          {ALT_NAME}
        </span>
      </span>
      <span
        role="tooltip"
        className={`pointer-events-none absolute inset-x-0 top-full mt-3 border border-paper/60 bg-ink/90 px-3 py-1.5 text-center font-sans text-[9px] normal-case tracking-widest text-paper opacity-0 transition-opacity duration-150 ${isAlt ? 'group-hover:opacity-100' : ''}`}
      >
        The meaning of my name, Marlee
      </span>
    </button>
  )
}

/** Theme scope + switcher + the quiet site mark, shared by every route. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ThemeScope designKey="editorial" initialTheme="lilypond">
      <div className="fixed top-3 right-3 z-50">
        <ThemeSwitcher />
      </div>
      <nav className="fixed top-3 left-4 z-50 flex items-center border border-edge bg-paper/85 px-3 py-1.5 font-sans text-[9px] tracking-widest uppercase backdrop-blur">
        <NameToggle />
      </nav>
      {children}
    </ThemeScope>
  )
}

/**
 * Hero after the seam-cut reference, built from Marlee's own collages: the
 * eye collage above, Mitakuye below, and a window cut through the seam.
 */
export function Hero() {
  const above = images.hero
  const below = images.gallery[2]
  const seamWindow = images.gallery[5]
  return (
    <section className="relative h-dvh overflow-hidden bg-surface">
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
        <img
          src={photoSrc(above)}
          alt={photoAlt(above)}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden border-t border-edge">
        <img
          src={photoSrc(below)}
          alt={photoAlt(below)}
          className="h-full w-full object-cover"
        />
      </div>

      {/* a window cut through the seam */}
      <div className="absolute top-[30%] left-1/2 h-[40%] w-44 -translate-x-[80%] overflow-hidden shadow-2xl sm:w-56 md:w-64">
        <img
          src={photoSrc(seamWindow)}
          alt={photoAlt(seamWindow)}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="absolute top-7 left-1/2 -translate-x-1/2 bg-ink/85 px-6 py-2 text-center font-sans text-lg tracking-[0.4em] whitespace-nowrap uppercase text-paper backdrop-blur-sm">
        {site.name}
      </p>
      <div className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 px-6 text-ink">
        <p className="max-w-md bg-paper/80 px-4 py-1 text-center font-body text-sm italic backdrop-blur-sm">
          {site.tagline}
        </p>
        <span aria-hidden className="font-sans text-sm">
          ↓
        </span>
      </div>
      <p className="absolute bottom-2 left-3 font-sans text-[8px] tracking-widest uppercase text-ink/60">
        Collage art · Marlee Baker
      </p>
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

/**
 * The Creative chapter as a "Reading the Tree" feature: one background
 * photograph, a translucent page laid over it (cut window left, text right),
 * and the photo's subject re-overlaid with a soft mask so it pops through
 * the page.
 */
export function CreativeFeature({
  number,
  label,
  note,
  pieces,
}: {
  number: string
  label: string
  note: string
  pieces: Piece[]
}) {
  const scene = images.gallery[0]
  const cutout = images.creativeCutout
  return (
    <section
      id="creative"
      className="relative block min-h-dvh overflow-hidden border-t border-edge"
    >
      {/* 1 — the full piece */}
      <img
        src={photoSrc(scene)}
        alt={photoAlt(scene)}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 2 — the window box: a frame with its center cut out, its right side
             fading out to blend into the text panel */}
      <div
        aria-hidden
        className="absolute inset-y-[24%] left-[6%] hidden w-[46%] border-[2.5rem] border-r-0 border-ink/90 shadow-2xl md:block"
      >
        <div className="absolute -top-10 -bottom-10 right-0 w-14 bg-gradient-to-r from-ink/90 to-transparent" />
      </div>

      {/* 3 — the subject with its sky removed, popping through the window */}
      <img
        src={photoSrc(cutout)}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
      />

      {/* 4 — the text box, a separate solid panel above the cutout */}
      <div className="absolute inset-x-[8%] inset-y-[24%] z-20 flex flex-col bg-ink/90 shadow-2xl md:left-[52%] md:w-[40%]">
        {/* soft entry: the cutout fades under the panel instead of hard-cutting */}
        <div
          aria-hidden
          className="absolute inset-y-0 -left-14 hidden w-14 bg-gradient-to-l from-ink/90 to-transparent md:block"
        />
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-8 py-10 text-center md:px-12">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-paper/60">
            Chapter {number}
          </p>
          <h2 className="font-display text-3xl font-light tracking-[0.35em] uppercase text-paper md:text-4xl">
            {label}
          </h2>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-paper/60">{note}</p>
          <span aria-hidden className="w-10 border-t border-paper/40" />
          <ol className="space-y-1.5">
            {pieces.map((piece, idx) => (
              <li key={piece.slug} className="font-body text-[12px] italic leading-snug">
                <span className="mr-2 font-sans text-[9px] not-italic tracking-widest text-paper/50">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <a
                  href={piece.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/90 underline decoration-paper/30 underline-offset-2 transition-colors hover:text-highlight hover:decoration-highlight"
                >
                  {piece.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="absolute right-[9%] bottom-[10%] z-20 font-sans text-[9px] font-bold tracking-[0.3em] uppercase text-paper drop-shadow-md">
        Reading the night
      </p>
    </section>
  )
}

/**
 * The Advocacy chapter as a letter card: the same photograph runs full bleed
 * and blurred behind, then sharp inside the cream card, letter text below.
 */
export function AdvocacyFeature({
  number,
  label,
  note,
  pieces,
}: {
  number: string
  label: string
  note: string
  pieces: Piece[]
}) {
  const scene = images.gallery[3]
  const src = photoSrc(scene)
  return (
    <section
      id="advocacy"
      className="relative block overflow-hidden border-t border-edge py-14 md:py-20"
    >
      {/* the same scene, blurred, as the ground */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-[2px]"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/35" />

      {/* the letter card */}
      <div className="relative mx-auto w-[88%] max-w-3xl bg-paper p-5 shadow-2xl md:p-7">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={src} alt={photoAlt(scene)} className="h-full w-full object-cover" />
        </div>
        <div className="px-2 pt-8 pb-4 md:px-4">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted">
            Chapter {number} · {note}
          </p>
          <h2 className="mt-2 font-display text-2xl font-light tracking-[0.3em] uppercase text-ink">
            {label}
          </h2>
          <p className="mt-4 max-w-md text-justify font-body text-[12.5px] leading-relaxed text-ink">
            My education and advocacy writing on fair housing — from
            protected-class policy to Oregon’s housing history, written and
            produced during my time at the Fair Housing Council of Oregon.
          </p>
          <ol className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-3">
            {pieces.map((piece, idx) => (
              <li key={piece.slug} className="flex gap-2 font-body text-[11.5px] leading-snug">
                <span className="shrink-0 pt-px font-sans text-[8.5px] tracking-widest text-muted">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <a
                  href={piece.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink/80 underline decoration-edge underline-offset-2 transition-colors hover:text-accent-2 hover:decoration-accent-2"
                >
                  {piece.title}
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-7 font-body text-[12.5px] italic text-ink">From, Marlee</p>
        </div>
      </div>
    </section>
  )
}

/**
 * The Editing chapter: the artwork on top, then a thin typed note — header on
 * the left, the note and client project on the right.
 */
export function EditingFeature({ number }: { number: string }) {
  const artwork = images.gallery[5]
  const { heading, blurb, paragraphs, project, poem } = site.editing
  return (
    <section id="editing" className="block border-t border-edge">
      <div className="bg-ink px-8 py-8 md:grid md:grid-cols-2 md:gap-12 md:px-14 md:py-10">
        <div>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-paper/60">
            Chapter {number} · freelance
          </p>
          <h2 className="mt-2 font-display text-2xl font-light tracking-[0.3em] uppercase text-paper md:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 font-body text-sm italic text-paper/60">{blurb}</p>
          <span aria-hidden className="mt-5 block w-10 border-t border-paper/40" />
        </div>
        <div className="mt-6 md:mt-0">
          <div className="max-w-md space-y-3 text-justify font-body text-[12.5px] leading-relaxed text-paper/90">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p>
              A recent client project:{' '}
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-highlight underline decoration-2 underline-offset-2 transition-colors hover:text-paper"
              >
                {project.label}
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* the artwork below the note, whole and matted in white like a print,
          with a stanza gated on each side of the ring */}
      <div className="relative bg-white p-5 md:p-8">
        <img
          src={photoSrc(artwork)}
          alt={photoAlt(artwork)}
          className="w-full"
        />
        {/* each half floats an ellipse matching the ring, so the verse wraps
            the curve like the reference posters */}
        <div className="absolute inset-y-[4%] left-[6%] right-1/2 hidden overflow-hidden md:block">
          <div
            aria-hidden
            className="float-right h-full w-[66%] [shape-outside:ellipse(107%_48%_at_100%_50%)]"
          />
          <p className="text-justify font-body text-[15px] italic leading-loose text-white/90">
            {poem.left.join(' ')}
          </p>
        </div>
        <div className="absolute inset-y-[4%] left-1/2 right-[6%] hidden overflow-hidden md:block">
          <div
            aria-hidden
            className="float-left h-full w-[66%] [shape-outside:ellipse(107%_48%_at_0%_50%)]"
          />
          <p className="text-justify font-body text-[15px] italic leading-loose text-white/90">
            {poem.right.join(' ')}
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * Footer: the page fades from paper down to ink, with the email as a
 * click-to-copy title resting on the dark end.
 */
export function DarkFooter() {
  const email = site.contact.email
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <footer className="bg-gradient-to-b from-white to-ink">
      <div className="flex flex-col items-center gap-3 pt-44 pb-10 md:pt-52">
        <button
          type="button"
          onClick={copyEmail}
          aria-label={`Copy email ${email}`}
          className="cursor-pointer font-display text-2xl font-light tracking-[0.2em] text-paper transition-colors hover:text-highlight md:text-4xl"
        >
          {email}
        </button>
        <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-paper/50">
          {copied ? 'copied ✓' : 'click to copy'}
        </p>
        <p className="mt-4 font-sans text-[9px] tracking-[0.3em] uppercase text-paper/40">
          {site.title}
        </p>
      </div>
    </footer>
  )
}

