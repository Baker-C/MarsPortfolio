/**
 * In-place prev/next pager for flipping through full-screen poster cards.
 * `tone` matches the card it sits on: 'paper' for dark/accent fields,
 * 'ink' for light fields.
 */
export function Pager({
  index,
  total,
  onPrev,
  onNext,
  tone,
}: {
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  tone: 'paper' | 'ink'
}) {
  const fg = tone === 'paper' ? 'text-paper' : 'text-ink'
  const border = tone === 'paper' ? 'border-paper' : 'border-ink'
  const hover =
    tone === 'paper'
      ? 'hover:bg-paper hover:text-ink'
      : 'hover:bg-ink hover:text-paper'

  return (
    <div className={`flex items-center gap-4 font-sans ${fg}`}>
      <button
        type="button"
        onClick={onPrev}
        disabled={index === 0}
        aria-label="Previous"
        className={`border-2 ${border} px-4 py-1 text-lg font-bold transition-colors ${hover} disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        ←
      </button>
      <span className="font-display text-xl tracking-tight tabular-nums">
        {String(index + 1).padStart(2, '0')}
        <span className="opacity-50"> / {String(total).padStart(2, '0')}</span>
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={index === total - 1}
        aria-label="Next"
        className={`border-2 ${border} px-4 py-1 text-lg font-bold transition-colors ${hover} disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        →
      </button>
    </div>
  )
}
