import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { Spread } from '../components/Spread'
import { PlatePanel } from '../components/PlatePanel'

export function About() {
  const { heading, paragraphs } = site.about

  return (
    <Spread
      verso={
        <PlatePanel
          slot={images.aboutPortrait}
          caption="The author · in lieu of a photograph"
        />
      }
      recto={
        <div className="flex h-full min-h-0 flex-col justify-center px-7 py-6 md:px-14">
          <p className="font-sans text-xs tracking-widest uppercase text-muted">
            The Author
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">{heading}</h2>
          <span aria-hidden className="mt-5 w-12 border-t border-edge" />
          <div className="mt-5 max-w-prose space-y-4 overflow-hidden font-body text-sm leading-relaxed text-ink md:mt-6 md:text-base lg:text-lg">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={paragraph.slice(0, 24)}
                className={
                  idx === 0
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
