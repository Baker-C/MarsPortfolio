import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { useTheme } from '../../../theme/ThemeContext'
import { Spread } from '../components/Spread'
import { PlatePanel } from '../components/PlatePanel'
import { vibeOrnament } from '../components/vibe'

export function About() {
  const { heading, paragraphs } = site.about
  const { vibe } = useTheme()

  // Light vibe response: alignment, heading treatment, rule weight, framing.
  const column =
    vibe === 'bouquet'
      ? 'items-center text-center'
      : vibe === 'grove'
        ? 'md:justify-end md:pb-14'
        : ''
  const headingClass =
    vibe === 'ridge' ? 'tracking-wide uppercase' : vibe === 'bloom' ? '-rotate-1' : ''
  const rule =
    vibe === 'ridge' ? (
      <span aria-hidden className="mt-5 block w-full border-t-2 border-ink" />
    ) : vibe === 'bouquet' ? (
      <p aria-hidden className="mt-4 text-accent">
        {vibeOrnament.bouquet}
      </p>
    ) : (
      <span aria-hidden className={`mt-5 w-12 border-t border-edge ${vibe === 'bloom' ? 'rotate-2' : ''}`} />
    )
  const prose =
    vibe === 'pond'
      ? 'rounded-3xl border border-edge px-6 py-5 md:px-8 md:py-6'
      : ''

  return (
    <Spread
      verso={
        <PlatePanel
          slot={images.aboutPortrait}
          caption="The author · in lieu of a photograph"
        />
      }
      recto={
        <div
          className={`flex h-full min-h-0 flex-col justify-center px-7 py-6 md:px-14 ${column}`}
        >
          <p className="font-sans text-xs tracking-widest uppercase text-muted">
            The Author
          </p>
          <h2 className={`mt-2 font-display text-3xl text-ink md:text-4xl ${headingClass}`}>
            {heading}
          </h2>
          {rule}
          <div
            className={`mt-5 max-w-prose space-y-4 overflow-hidden font-body text-sm leading-relaxed text-ink md:mt-6 md:text-base lg:text-lg ${prose}`}
          >
            {paragraphs.map((paragraph, idx) => (
              <p
                key={paragraph.slice(0, 24)}
                className={
                  idx === 0 && vibe !== 'bouquet'
                    ? 'first-letter:float-left first-letter:pr-2 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:text-accent'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      }
    />
  )
}
