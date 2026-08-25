# CLAUDE.md — Mar's Portfolio

Design and architecture rules for every session working in this repo. The full
rationale lives in `battles/css-architecture.md` and `battles/theme-concept.md`.

## Structure

- Three parallel design versions live under `src/designs/design1|2|3/` (Field
  Journal / Poster / Collage), routed at `/design1`–`/design3`; `/` is the
  design chooser. Each design owns its whole subtree; shared layers below it.
- Layers, one-way: pages → components → tokens, content feeds pages as data.
  - `src/index.css` — ALL visual constants (Tailwind 4 `@theme` tokens + six
    `[data-theme]` palettes). The only CSS file.
  - `src/content/` — all words, pieces (markdown + manifest), image slots.
  - `src/components/` — shared primitives (`ui/`), paginated reader (`reader/`).
  - `src/theme/` — theme registry, `ThemeScope`, `ThemeSwitcher`.

## Design rules (do not break)

1. Tokens only: components use semantic utilities (`bg-paper`, `text-ink`,
   `text-accent`, `border-edge`, `font-display`, …). No hex values, no
   arbitrary values (`bg-[#123]`), no `style=`, no new CSS files. (One
   sanctioned exception: `ThemeSwitcher` swatch dots preview palette hexes.)
2. Every color theme maps 1:1 to an image in `reference-theme-photos/ColorPalette/`
   (folder is local-only/gitignored). Adding a theme = one `[data-theme]` block
   in `index.css` + one entry in `src/theme/themes.ts`, traced to its image in
   `battles/theme-concept.md`. Single mode per theme — no light/dark toggle.
3. Components never import content; data arrives via props. Pages are the only
   layer importing `src/content/`.
4. Images only through semantic slots in `src/content/images.ts` (`{src, alt}`
   or placeholder art descriptors). Never a raw path in a component.
5. Pages fit the viewport — no page scrolling. Long text goes through the
   shared paginated Reader (book-style prev/next). Growable collections
   (writing index, gallery) page in place instead of scrolling.
6. Adding a writing piece = one markdown file in `src/content/writing/` + one
   manifest entry. Placeholder content is clearly placeholder; don't invent
   real-sounding contact details.
7. No abstraction until a pattern repeats (extract on second use).
8. Each design must look right in ALL six themes — check anything
   contrast-sensitive against the darkest (`lilypond`) and lightest (`sunset`)
   palettes.

## Verify

`npm run build` (tsc + vite) must stay green; `npm run dev` and check the
affected design at a desktop viewport with no scrollbars.
