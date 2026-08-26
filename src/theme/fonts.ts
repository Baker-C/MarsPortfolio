// Font registry, mirroring the color system in themes.ts.
// The seven title fonts came from 1001fonts.com (files in public/fonts/,
// @font-face blocks in src/index.css; demo / free-for-personal-use licenses —
// buy licenses before any commercial use). Supporting body/label/hand fonts
// are Google Fonts, matched by judgement to each title font's voice; the
// Google import also lives in src/index.css. index.css and this file must
// change together when fonts are added.

export type FontRole = 'display' | 'body' | 'sans' | 'hand'

export const fontRoles: { role: FontRole; label: string }[] = [
  { role: 'display', label: 'Titles' },
  { role: 'body', label: 'Body' },
  { role: 'sans', label: 'Labels' },
  { role: 'hand', label: 'Handwriting' },
]

/** CSS variable each role feeds (see @theme inline in index.css). */
export const fontVar: Record<FontRole, string> = {
  display: '--fd',
  body: '--fb',
  sans: '--fs',
  hand: '--fh',
}

export type FontOption = {
  id: string
  label: string
  /** Full CSS font-family stack, with fallbacks. */
  stack: string
  source: '1001fonts' | 'google'
}

export const fontOptions: FontOption[] = [
  // ---- Title fonts from 1001fonts (local files) ----
  { id: 'rafgins', label: 'Rafgins', stack: '"Rafgins", "Archivo", sans-serif', source: '1001fonts' },
  { id: 'changes-together', label: 'Changes Together', stack: '"Changes Together", "Exo 2", sans-serif', source: '1001fonts' },
  { id: 'generate-condensed', label: 'Generate Condensed', stack: '"Generate Condensed", "Barlow Condensed", sans-serif', source: '1001fonts' },
  { id: 'the-walkyr', label: 'The Walkyr', stack: '"The Walkyr", "Cinzel", serif', source: '1001fonts' },
  { id: 'uncharted-resilience', label: 'Uncharted Resilience', stack: '"Uncharted Resilience", "Oswald", sans-serif', source: '1001fonts' },
  { id: 'nocture-stars', label: 'Nocture Stars', stack: '"Nocture Stars", "Great Vibes", cursive', source: '1001fonts' },
  { id: 'protest', label: 'Protest', stack: '"Protest", "Permanent Marker", sans-serif', source: '1001fonts' },
  // ---- Google Fonts: serifs / body ----
  { id: 'fraunces', label: 'Fraunces', stack: '"Fraunces", Georgia, serif', source: 'google' },
  { id: 'newsreader', label: 'Newsreader', stack: '"Newsreader", Georgia, serif', source: 'google' },
  { id: 'lora', label: 'Lora', stack: '"Lora", Georgia, serif', source: 'google' },
  { id: 'eb-garamond', label: 'EB Garamond', stack: '"EB Garamond", Georgia, serif', source: 'google' },
  { id: 'cormorant', label: 'Cormorant Garamond', stack: '"Cormorant Garamond", Georgia, serif', source: 'google' },
  { id: 'libre-franklin', label: 'Libre Franklin', stack: '"Libre Franklin", system-ui, sans-serif', source: 'google' },
  { id: 'exo-2', label: 'Exo 2', stack: '"Exo 2", system-ui, sans-serif', source: 'google' },
  // ---- Google Fonts: sans / labels ----
  { id: 'archivo', label: 'Archivo', stack: '"Archivo", system-ui, sans-serif', source: 'google' },
  { id: 'space-grotesk', label: 'Space Grotesk', stack: '"Space Grotesk", system-ui, sans-serif', source: 'google' },
  { id: 'barlow-condensed', label: 'Barlow Condensed', stack: '"Barlow Condensed", system-ui, sans-serif', source: 'google' },
  { id: 'oswald', label: 'Oswald', stack: '"Oswald", system-ui, sans-serif', source: 'google' },
  { id: 'josefin', label: 'Josefin Sans', stack: '"Josefin Sans", system-ui, sans-serif', source: 'google' },
  { id: 'cinzel', label: 'Cinzel', stack: '"Cinzel", Georgia, serif', source: 'google' },
  // ---- Google Fonts: handwriting / script ----
  { id: 'caveat', label: 'Caveat', stack: '"Caveat", cursive', source: 'google' },
  { id: 'permanent-marker', label: 'Permanent Marker', stack: '"Permanent Marker", cursive', source: 'google' },
  { id: 'rock-salt', label: 'Rock Salt', stack: '"Rock Salt", cursive', source: 'google' },
  { id: 'great-vibes', label: 'Great Vibes', stack: '"Great Vibes", cursive', source: 'google' },
]

export type FontSet = {
  id: string
  label: string
  /** One-line voice description shown nowhere yet; kept for the docs. */
  note: string
  fonts: Record<FontRole, string>
}

/**
 * Font sets (groups): each title font from the reference list leads a set,
 * with supporting fonts matched to its voice. 'classic' preserves the
 * original site typography and stays the default.
 */
export const fontSets: FontSet[] = [
  {
    id: 'classic',
    label: 'Classic Folio',
    note: 'The original editorial pairing.',
    fonts: { display: 'fraunces', body: 'newsreader', sans: 'archivo', hand: 'caveat' },
  },
  {
    id: 'rafgins',
    label: 'Rafgins',
    note: 'Clean modern sans titles over a literary serif.',
    fonts: { display: 'rafgins', body: 'lora', sans: 'archivo', hand: 'caveat' },
  },
  {
    id: 'changes-together',
    label: 'Changes Together',
    note: 'Gaming display with techy supporting cast.',
    fonts: { display: 'changes-together', body: 'exo-2', sans: 'space-grotesk', hand: 'permanent-marker' },
  },
  {
    id: 'generate-condensed',
    label: 'Generate Condensed',
    note: 'Industrial condensed poster typography.',
    fonts: { display: 'generate-condensed', body: 'libre-franklin', sans: 'barlow-condensed', hand: 'caveat' },
  },
  {
    id: 'the-walkyr',
    label: 'The Walkyr',
    note: 'Mythic display over old-style serifs.',
    fonts: { display: 'the-walkyr', body: 'eb-garamond', sans: 'cinzel', hand: 'great-vibes' },
  },
  {
    id: 'uncharted-resilience',
    label: 'Uncharted Resilience',
    note: 'Rugged expedition lettering.',
    fonts: { display: 'uncharted-resilience', body: 'lora', sans: 'oswald', hand: 'rock-salt' },
  },
  {
    id: 'nocture-stars',
    label: 'Nocture Stars',
    note: 'Celestial script with an airy serif.',
    fonts: { display: 'nocture-stars', body: 'cormorant', sans: 'josefin', hand: 'great-vibes' },
  },
  {
    id: 'protest',
    label: 'Protest',
    note: 'Loud marker headlines, plainspoken text.',
    fonts: { display: 'protest', body: 'libre-franklin', sans: 'archivo', hand: 'permanent-marker' },
  },
]

export const defaultFontSet = 'classic'

export function isFontSetId(value: string | null): boolean {
  return fontSets.some((s) => s.id === value)
}

export function getFontSet(id: string): FontSet {
  return fontSets.find((s) => s.id === id) ?? fontSets[0]
}

export function getFontOption(id: string): FontOption {
  return fontOptions.find((o) => o.id === id) ?? fontOptions[0]
}

export function isFontOptionId(value: unknown): value is string {
  return typeof value === 'string' && fontOptions.some((o) => o.id === value)
}
