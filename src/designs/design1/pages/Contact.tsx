import { site } from '../../../content/site'

export function Contact() {
  const { heading, blurb, email, links } = site.contact

  return (
    <div className="flex h-full min-h-0 items-center justify-center px-6">
      <div className="w-full max-w-xl border-y border-edge px-4 py-8 text-center md:py-12">
        <p className="font-sans text-xs tracking-widest uppercase text-muted">
          Correspondence
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-md font-body italic leading-relaxed text-muted">
          {blurb}
        </p>
        <a
          href={`mailto:${email}`}
          className="mt-6 inline-block border-b border-accent pb-0.5 font-display text-xl text-accent transition-colors hover:border-ink hover:text-ink md:text-2xl"
        >
          {email}
        </a>
        <div className="mt-6 flex items-center justify-center gap-6 font-sans text-xs tracking-widest uppercase">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent pb-0.5 text-muted transition-colors hover:border-ink hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p aria-hidden className="mt-8 text-accent">
          ❦
        </p>
      </div>
    </div>
  )
}
