import { site } from '../../../content/site'
import { useTheme } from '../../../theme/ThemeContext'
import type { ThemeVibe } from '../../../theme/themes'

// Subtle per-vibe shifts: alignment, ghost attitude, button shape, frame.
const attitudes: Record<
  ThemeVibe,
  { align: string; ghost: string; btn: string; frame: string }
> = {
  horizon: {
    align: 'items-center text-center',
    ghost: '-top-8 left-1/2 -translate-x-1/2',
    btn: '',
    frame: '',
  },
  grove: {
    align: 'items-start text-left',
    ghost: '-bottom-8 -left-6',
    btn: '',
    frame: '',
  },
  pond: {
    align: 'items-center text-center',
    ghost: '-top-8 -right-6',
    btn: 'rounded-full',
    frame: '',
  },
  bloom: {
    align: 'items-start text-left',
    ghost: '-top-8 -right-6 rotate-6',
    btn: '-rotate-1',
    frame: '',
  },
  ridge: {
    align: 'items-start text-left',
    ghost: '-top-8 -right-6 -skew-y-6',
    btn: '',
    frame: '',
  },
  bouquet: {
    align: 'items-center text-center',
    ghost: '-top-8 -right-6',
    btn: '',
    frame: 'border-2 border-paper/60 m-2 md:m-4',
  },
}

export function Editing() {
  const { vibe } = useTheme()
  const { heading, blurb, paragraphs, project } = site.editing
  const attitude = attitudes[vibe]

  return (
    <section className="relative h-full overflow-hidden bg-accent-2">
      <p
        aria-hidden="true"
        className={`pointer-events-none absolute font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 uppercase select-none ${attitude.ghost}`}
      >
        Edit
      </p>

      <div
        className={`relative z-10 flex h-full flex-col justify-between p-6 md:p-10 ${attitude.align} ${attitude.frame}`}
      >
        <div>
          <h2 className="max-w-4xl font-display text-7xl leading-none font-bold tracking-tighter text-paper uppercase md:text-9xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-md font-body text-lg text-paper/70 italic md:text-xl">
            {blurb}
          </p>
        </div>

        <div className="max-w-lg space-y-4">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-display text-xl leading-tight text-paper md:text-2xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <p className="mb-3 font-sans text-xs tracking-widest text-paper/70 uppercase">
            {project.note}
          </p>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className={`inline-block border-2 border-paper px-6 py-3 font-display text-xl tracking-tight text-paper uppercase transition-colors hover:bg-paper hover:text-accent-2 ${attitude.btn}`}
          >
            {project.label} ↗
          </a>
        </div>
      </div>
    </section>
  )
}
