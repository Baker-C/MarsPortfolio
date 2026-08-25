import { site } from '../../../content/site'
import { images } from '../../../content/images'
import { ArtPlaceholder } from '../../../components/ui/ArtPlaceholder'
import { HandNote, Stamp, Tape } from '../components/scraps'

const linkTilts = ['-rotate-2', 'rotate-2', '-rotate-1']

export function Contact() {
  const { heading, blurb, email, links } = site.contact
  const scrap = images.gallery[images.gallery.length - 1]

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6">
      <div className="relative w-full max-w-lg">
        {/* a specimen scrap slipped behind the letter */}
        <div
          aria-hidden
          className="absolute -top-12 -left-10 hidden h-40 w-40 rotate-6 border border-edge bg-surface p-2 opacity-90 shadow-md sm:block"
        >
          <ArtPlaceholder slot={scrap} />
        </div>

        {/* the letter */}
        <div className="relative z-10 -rotate-1 border border-edge bg-surface p-6 shadow-xl transition-transform hover:rotate-0 sm:p-8">
          <Tape className="-top-2.5 left-14 -rotate-3" />
          <Tape className="-top-2.5 right-10 rotate-2" />
          <div
            aria-hidden
            className="absolute top-5 right-6 flex size-14 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-accent-2/60 text-center font-sans text-xs leading-tight tracking-widest uppercase text-accent-2"
          >
            post
          </div>

          <Stamp className="border-accent text-accent">correspondence</Stamp>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{heading}</h1>
          <p className="mt-3 font-body text-muted">{blurb}</p>

          <p className="mt-5 font-hand text-lg text-accent-2">write to —</p>
          <a
            href={`mailto:${email}`}
            className="font-display text-xl text-accent underline decoration-dashed underline-offset-4 transition-colors hover:decoration-solid sm:text-2xl"
          >
            {email}
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-dashed border-edge pt-4">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`${linkTilts[i % linkTilts.length]} border border-edge bg-paper px-3 py-1 font-sans text-xs font-bold tracking-widest uppercase text-ink shadow-sm transition-all hover:rotate-0 hover:border-ink`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <HandNote className="absolute -bottom-8 right-4 -rotate-2">
          the inbox is open ✎
        </HandNote>
      </div>
    </div>
  )
}
