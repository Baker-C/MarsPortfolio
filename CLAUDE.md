# CLAUDE.md — Mar's Portfolio

Design and architecture rules for every session working in this repo. The full
rationale lives in `battles/css-architecture.md` and `battles/theme-concept.md`.

## Structure

- Direction: the nature-editorial chapter scroll (chosen 2026-09-06 from
  `reference-theme-photos/FeatureDesign/`). `/` scrolls hero collage → about
  spread → one full-viewport section per chapter; `/creative`, `/advocacy`,
  `/editing` are chapter pages of full-bleed zine spreads. Shared spread
  fragments live in `src/pages/editorial/parts.tsx`. The three earlier design
  versions live in git history (`feature/real-content` and before).
- Layers, one-way: pages → components → tokens, content feeds pages as data.
  - `src/index.css` — ALL visual constants (Tailwind 4 `@theme` tokens + six
    `[data-theme]` palettes). The only CSS file.
  - `src/content/` — all words, pieces (link-out manifest), image slots.
  - `src/components/` — shared primitives (`ui/`), paginated reader (`reader/`).
  - `src/theme/` — theme registry, `ThemeScope`, `ThemeSwitcher`.

## Design rules (do not break)

1. Tokens only: components use semantic utilities (`bg-paper`, `text-ink`,
   `text-accent`, `border-edge`, `font-display`, …). No hex values, no
   arbitrary values (`bg-[#123]`), no `style=`, no new CSS files. (Sanctioned
   exceptions, all user data rather than styling: `ThemeSwitcher` swatch dots
   and font-preview labels render literal palette hexes / font faces, and
   `ThemeScope` applies the user's color and font customizations as an inline
   CSS-variable overlay.)
2. Every color theme maps 1:1 to an image in `reference-theme-photos/ColorPalette/`
   (folder is local-only/gitignored). Adding a theme = one `[data-theme]` block
   in `index.css` + one entry in `src/theme/themes.ts` (the two MUST stay in
   sync — the registry mirrors each palette), traced to its image in
   `battles/theme-concept.md`. Single mode per theme — no light/dark toggle.
   Themes also carry a layout `vibe` (horizon/grove/pond/bloom/ridge/bouquet):
   designs recompose their pages per vibe (never per theme id), so switching
   themes changes composition as well as color. A new theme reuses whichever
   existing vibe fits its mood; inventing a new vibe means adding that
   composition to all three designs.
   Visitors can additionally swap any color role for any preset from the
   collected palette pool (`presetColors` in `themes.ts`) via the switcher's
   customize panel; overrides persist per design+theme in localStorage.
   Typography works the same way: font sets and per-role font overrides come
   from the registry in `src/theme/fonts.ts` (seven 1001fonts title fonts in
   `public/fonts/` — demo/personal-use licenses — plus matched Google Fonts);
   `index.css` (@font-face blocks, Google import, `:root` classic defaults)
   and `fonts.ts` must change together.
3. Components never import content; data arrives via props. Pages are the only
   layer importing `src/content/`.
4. Images only through semantic slots in `src/content/images.ts` (`{src, alt}`
   or placeholder art descriptors). Never a raw path in a component.
5. The nature-editorial direction scrolls vertically (Chad's 2026-09-06
   decision, superseding the old no-scroll rule): long pages read as stacked
   zine spreads. No horizontal page scrolling. The shared paginated Reader
   stays available for any future on-site full text.
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
