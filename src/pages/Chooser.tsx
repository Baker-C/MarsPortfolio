import { Link } from 'react-router'
import { site } from '../content/site'
import { PageShell } from './editorial/parts'

/** Mock chooser: the two scroll variants of the nature-editorial direction. */
export function Chooser() {
  return (
    <PageShell>
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-paper px-8 text-center">
        <div>
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted">
            Layout mocks
          </p>
          <h1 className="mt-2 font-display text-3xl font-light text-ink">{site.name}</h1>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/a"
            className="border border-edge px-8 py-6 transition-colors hover:border-ink"
          >
            <span className="block font-sans text-[10px] tracking-widest uppercase text-muted">
              01
            </span>
            <span className="mt-1 block font-display text-xl text-ink">One scroll</span>
            <span className="mt-1 block font-body text-xs italic text-muted">
              hero → about → every spread inline
            </span>
          </Link>
          <Link
            to="/b"
            className="border border-edge px-8 py-6 transition-colors hover:border-ink"
          >
            <span className="block font-sans text-[10px] tracking-widest uppercase text-muted">
              02
            </span>
            <span className="mt-1 block font-display text-xl text-ink">Chapter cards</span>
            <span className="mt-1 block font-body text-xs italic text-muted">
              hero → about → covers that open scrolling chapters
            </span>
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
