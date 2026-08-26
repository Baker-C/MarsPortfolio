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

export function Contact() {
  const { vibe } = useTheme()
  const { heading, blurb, email, links } = site.contact
  const attitude = attitudes[vibe]

  return (
    <section className="relative h-full overflow-hidden bg-accent">
      <p
        aria-hidden="true"
        className={`pointer-events-none absolute font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 uppercase select-none ${attitude.ghost}`}
      >
        Hello
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

        <div>
          <p className="font-sans text-xs tracking-widest text-paper/70 uppercase">
            Write to
          </p>
          <a
            href={`mailto:${email}`}
            className="font-display text-3xl leading-none font-bold tracking-tighter text-paper underline decoration-2 underline-offset-8 transition-colors hover:text-ink md:text-6xl"
          >
            {email}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`border-2 border-paper px-6 py-3 font-display text-xl tracking-tight text-paper uppercase transition-colors hover:bg-paper hover:text-accent ${attitude.btn}`}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
