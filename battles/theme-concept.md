# Theme Concept

Derived from `reference-theme-photos/` (local-only, gitignored). This doc traces every
palette and design direction to the reference file that inspired it.

The theme-setup battle asked for one concept; the follow-up request expanded this to
**three parallel design versions** (routes `/design1`–`/design3`) sharing one content
layer and one set of **six switchable color themes**. Each theme maps 1:1 to an image in
`ColorPalette/`; the switcher sits top-right in every design.

## Color themes (ColorPalette/ → `src/index.css` `[data-theme]` blocks)

Palette hexes come straight from the swatch cards in each image; each theme adds derived
neutrals (a lightened paper, a darkened ink) where the card lacks a legible text/background
pair. Token roles: `paper` (page), `surface` (cards), `ink` (text), `muted` (secondary),
`accent` / `accent-2` (emphasis), `highlight`, `edge` (borders, ink at ~18%).

| Theme id | Label | Source image | Card hexes used |
|---|---|---|---|
| `sunset` | Sunset Traveler | `ColorPalette/024d1b06….jpg` | Cloud #CDD0DB, Azul #9197AA, Mimosa #F7B557, Orange #E27921, Aperol #C1521E |
| `everglade` | Everglade | `ColorPalette/08af57c5….jpg` | Everglade #264431, Up North #719687, Deep Diving #5A94A7, Light Blue Veil #BED9EB, Gilded Leaves #EAA043 |
| `lilypond` | Lily Pond | `ColorPalette/4e063adc….jpg` | Dark green #0A3323, Moss #839958, Beige #F7F4D5, Rosy brown #D3968C, Midnight green #105666 |
| `meadow` | Wild Meadow | `ColorPalette/50232d2c….jpg` | Grasslands #5F5420, Bluebell #A1A8BE, Sweet Cream #F3D0C3, Lilac #EDBEE4, Terra Cotta #EA785B, Grape Fizz #3F0013 |
| `yosemite` | Yosemite | `ColorPalette/9bf7ad49….jpg` | Granite Shadows #353326, Valley Moss #897E45, Ivory #EDD9B7, Mistflower (≈#B7B3BE — hex misprinted in image), Summit Blush #EF955F, Meadow Bloom #C46D52 |
| `floral` | Vintage Floral | `ColorPalette/b140c19c….jpg` | No hexes printed; sampled from swatches: sangria ≈#8E5560, vintage mauve ≈#C08B98, champagne ≈#E8D8C6, pistachio ≈#7B7B52, twilight ≈#46617A, steel blue ≈#7FA3CB |

## Mood (Vibes/)

Misty pastoral photography, wildflower meadows at golden hour, art-nouveau botanical
illustration, riso-zine spreads. Naturalist, printed-matter, unhurried.
Key files: `Vibes/0725d3bd…` (zine spread with sheep field + green stamps),
`Vibes/44825b54…` (art-nouveau poppies/clouds), `Vibes/fd7a9c2f…` (meadow at sunset).

## Three design directions (FeatureDesign/)

1. **Design 1 — Field Journal** (`/design1`): an editorial book spread. Cream paper,
   two-column serif layouts, thin rules, small caps, page numbers, spot illustrations.
   Traced to: `FeatureDesign/29128d15…` (Brooklyn Piers photo/text spread),
   `Vibes/0725d3bd…` (zine spread), `FeatureDesign/cb6b5c05…` (framed letter block).
2. **Design 2 — Poster** (`/design2`): every page composed like a print poster — huge
   display type, full-bleed color fields, text shaped around imagery.
   Traced to: `FeatureDesign/963a105f…` (yellow text flowing over a landscape photo),
   `Vibes/44825b54…` (art-nouveau drama).
3. **Design 3 — Collage** (`/design3`): layered scrapbook — rotated framed cards, tape
   and stamp marks, overlapping paper scraps on textured ground.
   Traced to: `FeatureDesign/00609918…` ("Reading the Tree" photo-collage),
   `FeatureDesign/cb6b5c05…` (letter card floating over a photo).

## Fonts (added 2026-08-26)

Seven title fonts requested by name, all sourced from 1001fonts.com (demo /
free-for-personal-use; buy licenses before commercial use): Rafgins, Changes
Together, Generate Condensed, The Walkyr, Uncharted Resilience, Nocture Stars,
Protest. Each leads a selectable font set with supporting Google Fonts matched
to its voice (registry: `src/theme/fonts.ts`); 'Classic Folio'
(Fraunces/Newsreader/Archivo/Caveat) remains the default. Roles: Titles
(display) / Body / Labels (sans) / Handwriting. Sets are switchable per design,
and every role can be individually overridden from the full pool.

## Layout rules (all designs)

- Multi-page react-router structure: Home, Writing index, Reader (`writing/:slug`),
  Gallery, About, Contact — nested under each design's route.
- Pages fit the viewport; long text goes through the shared paginated Reader
  (`src/components/reader/`), book-style prev/next, never scroll.
- Growable collections (writing list, gallery) page in place rather than scroll.
- Single color mode per theme (no light/dark toggle); six themes switchable at runtime.

## Placeholders

- Writing pieces in `src/content/writing/` are placeholder text until real pieces land.
- All image slots render theme-colored line art (`ArtPlaceholder`); swap to real photos
  in `src/content/images.ts` when they exist.
- Contact email/links in `src/content/site.ts` are placeholders.
