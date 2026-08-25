# Completion — three-design-versions

## What was built

Three full design versions of Mar's portfolio, each with Home, Writing index,
paginated Reader, Gallery, About, and Contact, all viewport-fit (no page scroll):

- `/design1` — **Field Journal**: every route is a printed-book spread (art verso,
  cream text recto), hairline rules, small caps, roman-numeral contents/plates,
  folio page numbers. Default theme: Yosemite.
- `/design2` — **Poster**: full-viewport poster compositions — text-9xl display
  headlines, ghost words bleeding off edges, numbered masthead nav, marquee footer;
  writing index and gallery flip through full-screen poster cards. Default: Sunset Traveler.
- `/design3` — **Collage**: zine/scrapbook — rotated taped cards, dashed postmark
  stamps, hand-written annotations, reader framed as a taped-down manuscript.
  Default: Wild Meadow.
- `/` — design chooser linking the three.

Shared layers (built once, used by all three): six `[data-theme]` palettes in
`src/index.css`, each traced 1:1 to a `reference-theme-photos/ColorPalette` image;
`src/theme/` (registry + ThemeScope + ThemeSwitcher, top-right in every design,
choice persisted per design in localStorage); `src/content/` (site copy, 4 placeholder
writing pieces + manifest, semantic image slots rendered as theme-colored line art);
shared paginated `Reader`; `ArtPlaceholder`.

## Finishing criteria — results

1. `npm run build` → **green** (tsc -b + vite, 222 modules, `✓ built in 629ms`;
   re-run green after the PosterNav fix, see below).
2. Dev server serves `/`, `/design1`, `/design2`, `/design3` — verified in Playwright;
   all sections render (home, writing index, reader with "Page 1 of N" pagination,
   gallery paging "01/06", about, contact spot-checked across designs).
3. Theme switcher top-right in all designs; live switching verified (design1
   Yosemite→Everglade, design3 Meadow→Lily Pond); all six themes listed; palettes
   match battles/theme-concept.md.
4. Screenshots in `screenshots/` (chooser, d1 home/reader/everglade, d2 home/writing/
   gallery-after-fix, d3 home/reader-lilypond).
5. battles/ docs updated: theme-concept.md written; theme-setup.md tasks checked with
   scope notes; css-architecture.md marked IMPLEMENTED with the multi-design addition;
   project CLAUDE.md design guidelines written.
6. Merged to main — see final report.

Zero browser console errors across all checked pages.

## Fixes during verification

- Design 2 masthead: last nav item ("05 Contact") sat under the fixed ThemeSwitcher;
  increased header right padding (pr-40 / md:pr-56). Re-verified visually.

## Deferred / known limitations (placeholders by design)

- Writing pieces, contact email/links, and all imagery are placeholders; image slots
  swap to real photos via `src/content/images.ts` without touching components.
- Poem soft line-breaks render as joined lines in the reader (react-markdown default);
  revisit if/when real poems land.
- Mobile: layouts use responsive fallbacks (design1 hides the verso panel < md) but
  the no-scroll rule is tuned for desktop viewports per the battle's success criteria.

## Follow-ups

- Pick a winning design; promote its pages to `src/pages/` and delete the others
  (css-architecture.md documents this path).
- Land real writing/photos; replace placeholder contact details.
