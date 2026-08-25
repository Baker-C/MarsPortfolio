// Theme registry. Each theme is derived from one image in
// reference-theme-photos/ColorPalette — see battles/theme-concept.md.
// The CSS palettes live in src/index.css under [data-theme="<id>"].

export type ThemeId =
  | 'sunset'
  | 'everglade'
  | 'lilypond'
  | 'meadow'
  | 'yosemite'
  | 'floral'

export type Theme = {
  id: ThemeId
  label: string
  /** ColorPalette reference image this palette comes from. */
  source: string
  /** Preview dots for the switcher, in display order. */
  swatches: [string, string, string]
}

export const themes: Theme[] = [
  {
    id: 'sunset',
    label: 'Sunset Traveler',
    source: 'ColorPalette/024d1b062c4913f6709f42d129c78183.jpg',
    swatches: ['#cdd0db', '#e27921', '#f7b557'],
  },
  {
    id: 'everglade',
    label: 'Everglade',
    source: 'ColorPalette/08af57c5e6eb804036baa1591fd6c4ed.jpg',
    swatches: ['#264431', '#5a94a7', '#eaa043'],
  },
  {
    id: 'lilypond',
    label: 'Lily Pond',
    source: 'ColorPalette/4e063adc8b0f9c0088da9bbab97988d0.jpg',
    swatches: ['#0a3323', '#f7f4d5', '#d3968c'],
  },
  {
    id: 'meadow',
    label: 'Wild Meadow',
    source: 'ColorPalette/50232d2c96edac36a68aa8352deb215f.jpg',
    swatches: ['#3f0013', '#f3d0c3', '#ea785b'],
  },
  {
    id: 'yosemite',
    label: 'Yosemite',
    source: 'ColorPalette/9bf7ad49d6bfca3475a397d2dd8e3abf.jpg',
    swatches: ['#353326', '#edd9b7', '#ef955f'],
  },
  {
    id: 'floral',
    label: 'Vintage Floral',
    source: 'ColorPalette/b140c19c465d94bcfa488dfa8730631e.jpg',
    swatches: ['#43303c', '#e8d8c6', '#8e5560'],
  },
]

export const defaultTheme: ThemeId = 'sunset'

export function isThemeId(value: string | null): value is ThemeId {
  return themes.some((t) => t.id === value)
}
