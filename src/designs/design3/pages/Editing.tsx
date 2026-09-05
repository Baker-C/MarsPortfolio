import { site } from '../../../content/site'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'
import { HandNote, Stamp, Tape } from '../components/scraps'

/** Subtle per-vibe shift: how the worksheet sits on the board. */
const sheetTilt: Record<ThemeVibe, string> = {
  horizon: '',
  grove: '-rotate-1',
  pond: 'rounded-3xl',
  bloom: 'rotate-2',
  ridge: 'outline outline-2 outline-ink',
  bouquet: 'rotate-1 outline-dashed outline-2 outline-offset-8 outline-accent/50',
}

export function Editing() {
  const { vibe } = useTheme()
  const { heading, blurb, paragraphs, project } = site.editing

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6">
      <div className="relative w-full max-w-lg">
        {/* the worksheet */}
        <div
          className={`relative z-10 border border-edge bg-surface p-6 shadow-xl transition-transform hover:rotate-0 sm:p-8 ${sheetTilt[vibe]}`}
        >
          <Tape className="-top-2.5 left-12 rotate-2" />
          <Tape className="-top-2.5 right-14 -rotate-3" />
          <div
            aria-hidden
            className="absolute top-5 right-6 flex size-14 rotate-12 items-center justify-center rounded-full border-2 border-dashed border-accent/60 text-center font-sans text-xs leading-tight tracking-widest uppercase text-accent"
          >
            red pen
          </div>

          <Stamp className="border-accent-2 text-accent-2">the desk</Stamp>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{heading}</h1>
          <p className="mt-3 font-body text-muted italic">{blurb}</p>

          <div className="mt-4 space-y-3 font-body text-sm leading-relaxed text-ink sm:text-base">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6 border-t border-dashed border-edge pt-4">
            <p className="font-hand text-lg text-accent-2">{project.note.toLowerCase()} —</p>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="font-display text-xl text-accent underline decoration-dashed underline-offset-4 transition-colors hover:decoration-solid sm:text-2xl"
            >
              {project.label} ↗
            </a>
          </div>
        </div>

        <HandNote className="absolute -bottom-8 right-4 rotate-2">
          margins welcome ✎
        </HandNote>
      </div>
    </div>
  )
}
