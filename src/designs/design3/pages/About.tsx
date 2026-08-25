import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { HandNote, Stamp, Tape } from '../components/scraps'

export function About() {
  const { heading, paragraphs } = site.about

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6">
      <div className="relative w-full max-w-3xl md:flex md:items-center">
        {/* pinned portrait */}
        <div className="relative z-10 hidden w-56 shrink-0 rotate-2 border border-edge bg-surface p-2 shadow-lg transition-transform hover:rotate-0 sm:block md:w-64">
          <Tape className="-top-2.5 left-8 -rotate-3" />
          <div className="aspect-square w-full overflow-hidden border border-edge">
            <ArtPlaceholder slot={images.aboutPortrait} />
          </div>
          <HandNote className="block pt-1 text-center">the author, roughly</HandNote>
        </div>

        {/* the dossier card, overlapping the portrait */}
        <div className="relative -rotate-1 border border-edge bg-surface p-6 shadow-xl transition-transform hover:rotate-0 sm:-mt-10 sm:ml-auto sm:w-4/5 md:mt-0 md:-ml-12 md:w-auto md:flex-1 md:p-8">
          <Tape className="-top-2.5 right-12 rotate-2" />
          <Tape className="-bottom-2.5 left-10 -rotate-3" />
          <div className="flex items-center gap-3">
            <Stamp className="border-accent-2 text-accent-2">dossier</Stamp>
            <Stamp className="border-muted text-muted">approx.</Stamp>
          </div>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{heading}</h1>
          <div className="mt-4 space-y-3 font-body text-sm leading-relaxed text-ink sm:text-base">
            {paragraphs.map((p, idx) => (
              <p key={idx} className={idx === paragraphs.length - 1 ? 'text-muted italic' : ''}>
                {p}
              </p>
            ))}
          </div>
          <div
            aria-hidden
            className="absolute right-5 bottom-4 hidden size-16 rotate-12 items-center justify-center rounded-full border-2 border-dashed border-accent/50 text-center font-sans text-xs leading-tight tracking-widest uppercase text-accent lg:flex"
          >
            noted
          </div>
        </div>
      </div>
    </div>
  )
}
