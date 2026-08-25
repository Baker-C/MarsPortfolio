import type { ReactNode } from 'react'

/**
 * Small collage vocabulary shared by design3 pages: rubber-stamp chips,
 * tape marks, handwritten notes, and a prev/next pager for shuffled stacks.
 * Pure presentation — all data arrives via props/children.
 */

export function Stamp({
  children,
  className = 'border-ink/60 text-ink',
}: {
  children: ReactNode
  /** Include border-* and text-* color classes when overriding. */
  className?: string
}) {
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-sans text-xs font-bold tracking-widest uppercase ${className}`}
    >
      {children}
    </span>
  )
}

export function Tape({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 h-5 w-16 border border-dashed border-ink/30 bg-highlight/50 shadow-sm ${className}`}
    />
  )
}

export function HandNote({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={`font-hand text-xl leading-tight text-accent-2 ${className}`}>
      {children}
    </span>
  )
}

export function Pager({
  onPrev,
  onNext,
  label,
}: {
  onPrev: () => void
  onNext: () => void
  label: string
}) {
  return (
    <div className="flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-muted">
      <button
        type="button"
        onClick={onPrev}
        className="border border-edge bg-surface px-3 py-1 text-ink shadow-sm transition-all hover:-rotate-2 hover:border-ink"
      >
        ← prev
      </button>
      <span aria-live="polite">{label}</span>
      <button
        type="button"
        onClick={onNext}
        className="border border-edge bg-surface px-3 py-1 text-ink shadow-sm transition-all hover:rotate-2 hover:border-ink"
      >
        next →
      </button>
    </div>
  )
}
