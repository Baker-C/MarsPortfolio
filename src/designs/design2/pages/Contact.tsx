import { site } from '../../../content/site'

export function Contact() {
  const { heading, blurb, email, links } = site.contact

  return (
    <section className="relative h-full overflow-hidden bg-accent">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -right-6 rotate-3 font-display text-9xl leading-none font-bold tracking-tighter text-paper/15 uppercase select-none"
      >
        Hello
      </p>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <div>
          <h2 className="max-w-4xl font-display text-7xl leading-none font-bold tracking-tighter text-paper uppercase md:text-9xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-md font-body text-lg text-paper/70 italic md:ml-32 md:text-xl">
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
              className="border-2 border-paper px-6 py-3 font-display text-xl tracking-tight text-paper uppercase transition-colors hover:bg-paper hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
