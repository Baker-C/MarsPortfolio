import { site } from '../../../content/site'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'
import { vibeOrnament } from '../components/vibe'

/** How the editing-desk card is framed and aligned, per vibe. */
const frame: Record<ThemeVibe, { card: string; align: 'center' | 'start' }> = {
  horizon: { card: 'border-y border-edge text-center', align: 'center' },
  grove: { card: 'border-l border-edge pl-8 text-left sm:pl-12', align: 'start' },
  pond: {
    card: 'rounded-full border border-edge px-10 text-center sm:px-16',
    align: 'center',
  },
  bloom: { card: '-rotate-1 border border-edge shadow-md text-center', align: 'center' },
  ridge: { card: 'border-2 border-ink pl-8 text-left sm:pl-12', align: 'start' },
  bouquet: { card: 'border border-edge text-center', align: 'center' },
}

export function Editing() {
  const { heading, blurb, paragraphs, project } = site.editing
  const { vibe } = useTheme()
  const { card, align } = frame[vibe]
  const centered = align === 'center'

  const inner = (
    <>
      <p className="font-sans text-xs tracking-widest uppercase text-muted">The Desk</p>
      <h2
        className={`mt-3 font-display text-3xl text-ink md:text-4xl ${
          vibe === 'ridge' ? 'tracking-wide uppercase' : ''
        }`}
      >
        {heading}
      </h2>
      <p
        className={`mt-4 max-w-md font-body italic leading-relaxed text-muted ${
          centered ? 'mx-auto' : ''
        }`}
      >
        {blurb}
      </p>
      <div
        className={`mt-5 max-w-md space-y-3 font-body text-sm leading-relaxed text-ink md:text-base ${
          centered ? 'mx-auto' : ''
        }`}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-6 font-sans text-xs tracking-widest uppercase text-muted">
        {project.note}
      </p>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block border-b border-accent pb-0.5 font-display text-xl text-accent transition-colors hover:border-ink hover:text-ink md:text-2xl"
      >
        {project.label} ↗
      </a>
      <p aria-hidden className="mt-8 text-accent">
        {vibeOrnament[vibe]}
      </p>
    </>
  )

  return (
    <div className="flex h-full min-h-0 items-center justify-center px-6">
      {vibe === 'bouquet' ? (
        // Double-ruled ornamental frame.
        <div className={`w-full max-w-xl p-2 ${card}`}>
          <div className="border border-edge px-4 py-8 md:py-12">{inner}</div>
        </div>
      ) : (
        <div className={`w-full max-w-xl px-4 py-8 md:py-12 ${card}`}>{inner}</div>
      )}
    </div>
  )
}
