# CSS & Component Architecture

**Goal:** Define how the portfolio's styling, components, and content are structured so the site is easy to extend, easy to maintain, and easy to change later. Every part must swap independently: theme, pictures, writing pieces, page sections.

**Status:** IMPLEMENTED (2026-08-25) — with one structural addition: the site currently exists as THREE parallel design versions at `/design1`–`/design3` (Field Journal / Poster / Collage), each a full set of pages under `src/designs/designN/`, all sharing the same tokens, content, and component layers. `src/pages/` holds only the design chooser at `/`. When one design wins, its folder's pages promote to `src/pages/` and the others are deleted; the layer rules below are unchanged by this.

Additions made during implementation:
- Six color themes (one per `reference-theme-photos/ColorPalette` image), switchable at runtime: `src/index.css` defines each as a `[data-theme]` variable block feeding the same semantic `@theme inline` tokens; `src/theme/` (themes registry, `ThemeScope` provider setting `data-theme`, `ThemeSwitcher` control in every design's top right). Retheming = editing `index.css`; adding a theme = one CSS block + one registry entry.
- Image slots are placeholder line art (`ArtPlaceholder` in `ui/`) rendered in theme colors until real photos land; `images.ts` slots carry alt/caption either way. Sanctioned `style=` exceptions (data, not styling): `ThemeSwitcher` swatch/preset dots preview literal palette hexes, and `ThemeScope` applies user color overrides as an inline CSS-variable overlay.
- Per-role color customization (added 2026-08-26): the switcher's customize panel lets a visitor swap any token role (paper/surface/ink/muted/accent/accent-2/highlight) for any preset color from the pooled ColorPalette swatches (`presetColors` in `src/theme/themes.ts`). Overrides ride on top of the active theme as CSS-variable overlays in `ThemeScope` (edge re-derives from an overridden ink), persist per design+theme in localStorage, and reset per theme. The theme registry now mirrors each `[data-theme]` palette (`colors` map) so the UI can show effective colors; index.css and themes.ts must change together.

## The four layers

Dependency direction is one-way: **pages → components → tokens**, with **content** feeding pages as data. A change in one layer must not require edits in the layers below it.

### 1. Design tokens — `src/index.css`

- All colors, fonts, and the spacing scale live as Tailwind 4 `@theme` tokens in this one file. Nothing else defines visual constants.
- Token names are semantic, not literal: `--color-paper`, `--color-ink`, `--color-accent`, `--font-display`, `--font-body` — never `--color-brown`.
- Components use only token-backed utility classes. No hex values, no arbitrary values (`bg-[#123456]`), no per-component CSS files.
- **Swap test:** retheming the whole site = editing this one file.

### 2. Content — `src/content/`

Components never contain words, pieces, or image paths. All content is data that flows in.

- `src/content/site.ts` — site metadata: name, nav items, contact links, About text.
- `src/content/writing/` — one markdown file per piece, plus `index.ts`: a manifest listing each piece (slug, title, kind, source file). The manifest imports each markdown file as raw text (Vite `?raw` import), so pieces reach the reader as strings. Placeholder pieces are fine until real ones land.
- `src/content/images.ts` — semantic image slots mapping a slot name to `{ src, alt }` (imported asset + alt text): `hero`, `aboutPortrait`, `gallery` (a list, each entry optionally with a caption). Components ask for a slot, never a file path; alt text is content, so it lives here, not in components.
- **Swap test:** replacing a picture = replacing the file or changing one manifest line. Adding a writing piece = adding one markdown file and one manifest entry.

### 3. Components — `src/components/`

- `src/components/ui/` — small presentational primitives: headings, text styles, buttons, frames. Props in, markup out. No content imports, no routing, no state beyond their own.
- `src/components/layout/` — `PageShell`: the viewport-fitting frame plus nav. This is the ONE place that enforces the no-scroll rule; pages render inside it.
- `src/components/reader/` — the paginated reader (book-style next/prev flips) as a self-contained module. It takes markdown text as a prop; it does not know where text comes from. Markdown parsing/rendering and the measure-and-split pagination logic live inside this module — no other component touches markdown. This is the hardest component in the site; treat it as its own sub-project.
- Every visible section of a page is its own component, so sections swap independently.
- **Swap test:** replacing the reader, the nav, or any section = replacing one component; no page rewrites.

### 4. Pages — `src/pages/` + `src/routes.tsx`

- One file per route: `Home`, `Writing` (index), `Reader`, `Gallery`, `About`, `Contact`.
- Pages are the ONLY layer that imports from `src/content/`. They pass data down as props and compose layout + components. They hold no styling decisions beyond composition.
- `src/routes.tsx` — the single react-router route table.
- **Swap test:** adding a page = one new file plus one route entry.

## Rules (enforced in review, later in CLAUDE.md)

1. Components do not import content; data arrives via props.
2. Images are referenced only through semantic slots in `images.ts`.
3. Styling is Tailwind utilities inline in components, tokens only. No CSS files besides `index.css`, no inline `style=`, no arbitrary values.
4. No component abstraction until a pattern repeats; extract on the second use, not the first.
5. Pages fit the viewport; long text goes through the reader, not scroll.
6. Growable collections (Writing index, Gallery) also stay in-viewport: they cap what one screen shows and page/step through the rest. How that looks (grid pages, carousel, etc.) is a theme-concept decision (theme-setup Task 4); the architectural rule is only that growth never introduces scroll.

## Dependencies to add at implementation

Not yet in `package.json` (do not install until implementation starts): `react-router` and a markdown renderer for the reader (e.g. `react-markdown` or `marked` — pick when building the reader). Everything else (React 19, Tailwind 4, Vite) is already in place.

## Out of scope here

- The actual palette, typography, and mood — that comes from the theme-setup battle's reference photos.
- Real writing content and gallery images.
