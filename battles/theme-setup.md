# Battle: Theme Setup

**Goal:** Produce a design concept for what Marlee's portfolio could look like, derived from reference content. This battle delivers a concept — theme colors, layout/style direction, and Claude design guidelines — not a full site build.

**Status:** IN PROGRESS — reference content landed 2026-08-25; concept + tokens delivered. Scope expanded by follow-up request: three full design versions (`/design1`–`/design3`) with six switchable color themes, not a single concept mock. See `battles/theme-concept.md`.

**Trigger to resume:** Reference content exists in `reference-theme-photos/` (local-only folder, gitignored). Photos, clippings, PDFs, and text samples all count as reference input.

## Tasks

- [x] **1. Collect reference content** (owner: Chad)
  - Put reference/inspiration content into `reference-theme-photos/`.
  - verify: the folder contains one or more files. ✓ (ColorPalette/ ×6, FeatureDesign/ ×17, Vibes/ ×10)
- [x] **2. Derive theme concept from references** (blocked by 1)
  - Review each reference file. Extract mood, palette candidates, and typography direction.
  - Write the concept into `battles/theme-concept.md`, with each choice traced to the reference file that inspired it.
  - verify: `battles/theme-concept.md` exists and each palette/typography choice cites a reference file.
- [x] **3. Define theme color tokens** (blocked by 2)
  - Encode the palette as Tailwind 4 `@theme` tokens in `src/index.css`. Single color mode only — no light/dark toggle.
  - verify: tokens in `src/index.css` match the palette in `battles/theme-concept.md`.
  - Note: delivered as SIX palettes (one per ColorPalette/ image) switchable via `data-theme`; each is still a single mode (no light/dark).
- [x] **4. Design layout and style concept** (blocked by 2)
  - Multi-page structure with react-router. Pages fit the viewport — minimal scrolling.
  - Long pieces use a paginated reader (book-style next/prev page flips), not scrolling.
  - Describe each page in the concept doc: Home, Writing index, Reader, Gallery (extra), About, Contact.
  - verify: `battles/theme-concept.md` describes every page and how each fits the viewport without scroll.
- [ ] **5. Build a concept mock** (blocked by 3, 4)
  - Render one or two representative screens (e.g. Home + Reader) with the real tokens so the concept can be seen, using placeholder writing pieces.
  - verify: `npm run dev` shows the mock screens without scroll at a desktop viewport.
- [x] **6. Write Claude design guidelines** (blocked by 2, 4)
  - Write the design rules into the project `CLAUDE.md` so every future session obeys them: token usage, no-scroll rule, paginated-reader pattern, typography, spacing, and what not to do.
  - verify: `CLAUDE.md` exists at the repo root and states each rule from the concept doc.

## Success criteria

- verify: all tasks above are checked off.
- verify: theme tokens trace to specific reference files.
- verify: mock pages render without scroll at a desktop viewport.
- verify: `CLAUDE.md` contains the design guidelines.

## Out of scope

- No gallery content.
- No real writing pieces (placeholders only).
- No light/dark mode toggle.
- No deployment.

## Decisions

- 2026-08-23 — Portfolio is writing-first (published papers, creative writing, news articles, book entries); visual-art gallery is extra on top; About and Contact required.
- 2026-08-23 — Multi-page with routing; no scrolling for the most part; long pieces read in a paginated reader.
- 2026-08-23 — Single color mode, derived from reference photos.
- 2026-08-23 — Writing content will be stored as text/markdown in the repo.
- 2026-08-23 — Battle deliverable is a concept, not a full build.
- 2026-08-23 — Claude design guidelines live in the project `CLAUDE.md`.
