import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'

export function About() {
  const { heading, paragraphs } = site.about
  const [lead, ...rest] = paragraphs

  return (
    <section className="flex h-full flex-col overflow-hidden md:flex-row">
      {/* Poster half: giant word + portrait plate */}
      <div className="relative flex shrink-0 flex-col justify-between overflow-hidden bg-accent-2 p-6 md:w-1/2 md:p-10">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-4 font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 uppercase select-none"
        >
          About
        </p>

        <h2 className="relative z-10 font-display text-7xl leading-none font-bold tracking-tighter text-paper uppercase md:text-9xl">
          {heading}
        </h2>

        <div className="relative z-10 ml-auto h-2/5 w-3/5 -rotate-2 border-4 border-ink shadow-2xl md:h-1/2">
          <ArtPlaceholder slot={images.aboutPortrait} />
        </div>
      </div>

      {/* Text half: shaped, stepped paragraphs */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-6 overflow-hidden bg-paper p-6 md:p-12">
        <p className="max-w-lg font-display text-2xl leading-tight text-ink italic md:text-3xl">
          {lead}
        </p>
        {rest.map((p, i) => (
          <p
            key={i}
            className={`max-w-md font-body text-base leading-relaxed text-ink/80 ${
              i % 2 === 0 ? 'md:ml-24' : 'md:ml-8'
            }`}
          >
            {p}
          </p>
        ))}
        <p className="font-sans text-xs tracking-widest text-muted uppercase">
          ✳ {site.name} — {site.tagline}
        </p>
      </div>
    </section>
  )
}
