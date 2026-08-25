/**
 * Marquee-like footer strip: one phrase stamped end to end, clipped at the
 * viewport edges like a printed poster border.
 */
export function MarqueeStrip({ text }: { text: string }) {
  return (
    <footer
      aria-hidden="true"
      className="shrink-0 overflow-hidden border-t-2 border-ink bg-ink py-1 whitespace-nowrap"
    >
      <p className="font-display text-sm tracking-widest text-paper uppercase">
        {Array.from({ length: 12 }, () => text).join('  ✳  ')}
      </p>
    </footer>
  )
}
