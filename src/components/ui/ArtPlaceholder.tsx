import type { ImageSlot } from '../../content/images'

const toneClass = {
  accent: 'text-accent',
  accent2: 'text-accent-2',
  muted: 'text-muted',
  highlight: 'text-highlight',
} as const

/**
 * Renders an image slot. Placeholder slots ('art') draw simple botanical
 * line-art in theme colors so every theme recolors the artwork; photo slots
 * render a plain <img>. Fills its container.
 */
export function ArtPlaceholder({
  slot,
  className = '',
}: {
  slot: ImageSlot
  className?: string
}) {
  if (slot.kind === 'photo') {
    return (
      <img
        src={slot.src}
        alt={slot.alt}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={slot.alt}
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full bg-surface ${toneClass[slot.tone]} ${className}`}
    >
      <Motif motif={slot.motif} />
    </svg>
  )
}

function Motif({ motif }: { motif: 'poppy' | 'iris' | 'lily' | 'meadow' | 'ridge' | 'moth' }) {
  const stroke = {
    stroke: 'currentColor',
    fill: 'none',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const

  switch (motif) {
    case 'poppy':
      return (
        <g {...stroke}>
          <path d="M60 190 C 64 130 58 110 70 78" />
          <circle cx="72" cy="62" r="20" fill="currentColor" stroke="none" opacity="0.85" />
          <path d="M130 190 C 126 140 134 124 128 96" />
          <circle cx="127" cy="80" r="15" fill="currentColor" stroke="none" opacity="0.55" />
          <path d="M96 190 C 98 160 92 150 96 132" />
          <ellipse cx="97" cy="124" rx="7" ry="10" />
        </g>
      )
    case 'iris':
      return (
        <g {...stroke}>
          <path d="M100 190 L 100 96" />
          <path d="M100 96 C 80 92 68 74 72 52 C 88 56 100 70 100 96" />
          <path d="M100 96 C 120 92 132 74 128 52 C 112 56 100 70 100 96" />
          <path d="M100 96 C 96 72 100 56 100 36" />
          <path d="M100 96 C 84 108 72 108 60 100" opacity="0.7" />
          <path d="M100 96 C 116 108 128 108 140 100" opacity="0.7" />
        </g>
      )
    case 'lily':
      return (
        <g {...stroke}>
          <ellipse cx="70" cy="130" rx="34" ry="12" />
          <path d="M70 130 L 96 122" />
          <ellipse cx="140" cy="90" rx="26" ry="9" opacity="0.7" />
          <ellipse cx="120" cy="160" rx="22" ry="8" opacity="0.5" />
          <path d="M60 118 C 58 100 64 92 74 86 C 76 98 72 108 70 118 Z" fill="currentColor" stroke="none" opacity="0.8" />
          <path d="M20 40 C 60 52 140 52 180 40" opacity="0.35" />
        </g>
      )
    case 'meadow':
      return (
        <g {...stroke}>
          <path d="M30 190 C 34 140 28 120 38 92" />
          <circle cx="40" cy="82" r="7" fill="currentColor" stroke="none" />
          <path d="M70 190 C 72 150 66 136 74 112" />
          <path d="M74 112 l -10 -12 M74 112 l 10 -12 M74 112 l 0 -16" />
          <path d="M110 190 C 108 136 116 120 112 88" />
          <circle cx="112" cy="78" r="9" opacity="0.8" />
          <path d="M150 190 C 154 146 146 130 154 104" />
          <path d="M154 104 l -9 -10 M154 104 l 9 -10 M154 104 l -4 -15 M154 104 l 6 -14" />
          <path d="M178 190 C 176 160 180 150 176 132" opacity="0.6" />
        </g>
      )
    case 'ridge':
      return (
        <g {...stroke}>
          <path d="M10 150 L 62 84 L 92 118 L 128 58 L 190 150" />
          <path d="M128 58 L 118 74 L 132 78 Z" fill="currentColor" stroke="none" opacity="0.7" />
          <path d="M10 168 C 60 158 140 158 190 168" opacity="0.5" />
          <circle cx="160" cy="40" r="12" opacity="0.8" />
        </g>
      )
    case 'moth':
      return (
        <g {...stroke}>
          <ellipse cx="100" cy="104" rx="8" ry="26" fill="currentColor" stroke="none" opacity="0.85" />
          <path d="M92 92 C 60 62 34 66 30 92 C 28 112 60 122 92 112" />
          <path d="M108 92 C 140 62 166 66 170 92 C 172 112 140 122 108 112" />
          <path d="M92 112 C 70 124 58 138 62 150 C 78 150 90 136 96 126" opacity="0.7" />
          <path d="M108 112 C 130 124 142 138 138 150 C 122 150 110 136 104 126" opacity="0.7" />
          <path d="M96 80 C 90 68 84 62 76 58 M104 80 C 110 68 116 62 124 58" />
        </g>
      )
  }
}
