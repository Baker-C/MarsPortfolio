import { useEffect, useMemo, useState } from 'react'
import Markdown from 'react-markdown'

/**
 * Book-style paginated reader. Takes markdown text as a prop and splits it
 * into pages turned with prev/next (buttons or arrow keys) — long pieces are
 * read by flipping pages, never by scrolling. Self-contained: markdown
 * parsing and pagination live here only.
 */
export function Reader({
  markdown,
  charsPerPage = 1100,
  className = '',
}: {
  markdown: string
  /** Rough page size; blocks are never split mid-paragraph. */
  charsPerPage?: number
  className?: string
}) {
  const pages = useMemo(() => paginate(markdown, charsPerPage), [markdown, charsPerPage])
  const [page, setPage] = useState(0)
  const current = Math.min(page, pages.length - 1)

  const prev = () => setPage(Math.max(0, current - 1))
  const next = () => setPage(Math.min(pages.length - 1, current + 1))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(0, p - 1))
      if (e.key === 'ArrowRight') setPage((p) => Math.min(pages.length - 1, p + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pages.length])

  return (
    <div className={`flex h-full min-h-0 flex-col ${className}`}>
      <div className="reader-page min-h-0 flex-1 overflow-hidden font-body text-ink">
        <Markdown>{pages[current]}</Markdown>
      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between gap-4 font-sans text-sm text-muted">
        <button
          type="button"
          onClick={prev}
          disabled={current === 0}
          className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
        >
          ← Prev
        </button>
        <span aria-live="polite">
          Page {current + 1} of {pages.length}
        </span>
        <button
          type="button"
          onClick={next}
          disabled={current === pages.length - 1}
          className="rounded-full border border-edge px-4 py-1.5 text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-35"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

function paginate(markdown: string, charsPerPage: number): string[] {
  const blocks = markdown.trim().split(/\n\s*\n/)
  const pages: string[] = []
  let buf: string[] = []
  let size = 0

  for (const block of blocks) {
    if (buf.length > 0 && size + block.length > charsPerPage) {
      pages.push(buf.join('\n\n'))
      buf = []
      size = 0
    }
    buf.push(block)
    size += block.length
  }
  if (buf.length > 0) pages.push(buf.join('\n\n'))
  return pages.length > 0 ? pages : ['']
}
