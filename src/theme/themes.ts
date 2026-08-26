// Theme registry. Each theme is derived from one image in
// reference-theme-photos/ColorPalette — see battles/theme-concept.md.
// The CSS palettes live in src/index.css under [data-theme="<id>"]; the
// `colors` maps below MUST stay in sync with those blocks (adding/changing a
// theme touches both files).

export type ThemeId =
  | 'sunset'
  | 'everglade'
  | 'lilypond'
  | 'meadow'
  | 'yosemite'
  | 'floral'

/** Swappable color roles, matching the CSS variables in index.css. */
export type TokenRole =
  | 'paper'
  | 'surface'
  | 'ink'
  | 'muted'
  | 'accent'
  | 'accent-2'
  | 'highlight'

export const tokenRoles: { role: TokenRole; label: string }[] = [
  { role: 'paper', label: 'Paper' },
  { role: 'surface', label: 'Surface' },
  { role: 'ink', label: 'Ink' },
  { role: 'muted', label: 'Muted' },
  { role: 'accent', label: 'Accent' },
  { role: 'accent-2', label: 'Accent 2' },
  { role: 'highlight', label: 'Highlight' },
]

export type Theme = {
  id: ThemeId
  label: string
  /** ColorPalette reference image this palette comes from. */
  source: string
  /** Base palette, mirroring the [data-theme] block in index.css. */
  colors: Record<TokenRole, string>
  /** Preview dots for the switcher, in display order. */
  swatches: [string, string, string]
}

export const themes: Theme[] = [
  {
    id: 'sunset',
    label: 'Sunset Traveler',
    source: 'ColorPalette/024d1b062c4913f6709f42d129c78183.jpg',
    colors: {
      paper: '#e8e9ef',
      surface: '#cdd0db',
      ink: '#363c4d',
      muted: '#9197aa',
      accent: '#e27921',
      'accent-2': '#c1521e',
      highlight: '#f7b557',
    },
    swatches: ['#cdd0db', '#e27921', '#f7b557'],
  },
  {
    id: 'everglade',
    label: 'Everglade',
    source: 'ColorPalette/08af57c5e6eb804036baa1591fd6c4ed.jpg',
    colors: {
      paper: '#edf4f8',
      surface: '#bed9eb',
      ink: '#264431',
      muted: '#719687',
      accent: '#eaa043',
      'accent-2': '#5a94a7',
      highlight: '#f0be76',
    },
    swatches: ['#264431', '#5a94a7', '#eaa043'],
  },
  {
    id: 'lilypond',
    label: 'Lily Pond',
    source: 'ColorPalette/4e063adc8b0f9c0088da9bbab97988d0.jpg',
    colors: {
      paper: '#f7f4d5',
      surface: '#ede8c2',
      ink: '#0a3323',
      muted: '#839958',
      accent: '#d3968c',
      'accent-2': '#105666',
      highlight: '#b5c687',
    },
    swatches: ['#0a3323', '#f7f4d5', '#d3968c'],
  },
  {
    id: 'meadow',
    label: 'Wild Meadow',
    source: 'ColorPalette/50232d2c96edac36a68aa8352deb215f.jpg',
    colors: {
      paper: '#f8e4da',
      surface: '#f3d0c3',
      ink: '#3f0013',
      muted: '#5f5420',
      accent: '#ea785b',
      'accent-2': '#a1a8be',
      highlight: '#edbee4',
    },
    swatches: ['#3f0013', '#f3d0c3', '#ea785b'],
  },
  {
    id: 'yosemite',
    label: 'Yosemite',
    source: 'ColorPalette/9bf7ad49d6bfca3475a397d2dd8e3abf.jpg',
    colors: {
      paper: '#f2e6ce',
      surface: '#edd9b7',
      ink: '#353326',
      muted: '#897e45',
      accent: '#ef955f',
      'accent-2': '#c46d52',
      highlight: '#b7b3be',
    },
    swatches: ['#353326', '#edd9b7', '#ef955f'],
  },
  {
    id: 'floral',
    label: 'Vintage Floral',
    source: 'ColorPalette/b140c19c465d94bcfa488dfa8730631e.jpg',
    colors: {
      paper: '#efe4d6',
      surface: '#e8d8c6',
      ink: '#43303c',
      muted: '#7b7b52',
      accent: '#8e5560',
      'accent-2': '#46617a',
      highlight: '#c08b98',
    },
    swatches: ['#43303c', '#e8d8c6', '#8e5560'],
  },
]

export const defaultTheme: ThemeId = 'sunset'

export function isThemeId(value: string | null): value is ThemeId {
  return themes.some((t) => t.id === value)
}

export function getTheme(id: ThemeId): Theme {
  return themes.find((t) => t.id === id) ?? themes[0]
}

export type PresetColor = { name: string; hex: string; source: ThemeId }

/**
 * The full pool of swatch-card colors gathered from the six ColorPalette
 * reference images (names as printed on the cards). Any of these can be
 * swapped into any role of any theme via the switcher's customize panel.
 */
export const presetColors: PresetColor[] = [
  // Sunset Traveler card
  { name: 'Cloud', hex: '#cdd0db', source: 'sunset' },
  { name: 'Azul', hex: '#9197aa', source: 'sunset' },
  { name: 'Mimosa', hex: '#f7b557', source: 'sunset' },
  { name: 'Orange', hex: '#e27921', source: 'sunset' },
  { name: 'Aperol', hex: '#c1521e', source: 'sunset' },
  // Everglade card
  { name: 'Everglade', hex: '#264431', source: 'everglade' },
  { name: 'Up North', hex: '#719687', source: 'everglade' },
  { name: 'Deep Diving', hex: '#5a94a7', source: 'everglade' },
  { name: 'Light Blue Veil', hex: '#bed9eb', source: 'everglade' },
  { name: 'Gilded Leaves', hex: '#eaa043', source: 'everglade' },
  // Lily Pond card
  { name: 'Dark Green', hex: '#0a3323', source: 'lilypond' },
  { name: 'Moss Green', hex: '#839958', source: 'lilypond' },
  { name: 'Beige', hex: '#f7f4d5', source: 'lilypond' },
  { name: 'Rosy Brown', hex: '#d3968c', source: 'lilypond' },
  { name: 'Midnight Green', hex: '#105666', source: 'lilypond' },
  // Wild Meadow card
  { name: 'Grasslands', hex: '#5f5420', source: 'meadow' },
  { name: 'Bluebell', hex: '#a1a8be', source: 'meadow' },
  { name: 'Sweet Cream', hex: '#f3d0c3', source: 'meadow' },
  { name: 'Lilac', hex: '#edbee4', source: 'meadow' },
  { name: 'Terra Cotta', hex: '#ea785b', source: 'meadow' },
  { name: 'Grape Fizz', hex: '#3f0013', source: 'meadow' },
  // Yosemite card
  { name: 'Granite Shadows', hex: '#353326', source: 'yosemite' },
  { name: 'Valley Moss', hex: '#897e45', source: 'yosemite' },
  { name: 'Yosemite Ivory', hex: '#edd9b7', source: 'yosemite' },
  { name: 'Mistflower', hex: '#b7b3be', source: 'yosemite' },
  { name: 'Summit Blush', hex: '#ef955f', source: 'yosemite' },
  { name: 'Meadow Bloom', hex: '#c46d52', source: 'yosemite' },
  // Vintage Floral card (sampled; no hex printed in image)
  { name: 'Sangria', hex: '#8e5560', source: 'floral' },
  { name: 'Vintage Mauve', hex: '#c08b98', source: 'floral' },
  { name: 'Champagne', hex: '#e8d8c6', source: 'floral' },
  { name: 'Pistachio', hex: '#7b7b52', source: 'floral' },
  { name: 'Twilight', hex: '#46617a', source: 'floral' },
  { name: 'Steel Blue', hex: '#7fa3cb', source: 'floral' },
]
