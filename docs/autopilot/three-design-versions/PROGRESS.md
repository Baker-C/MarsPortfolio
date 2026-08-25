# Autopilot run: three-design-versions

Mission: Build 3 design versions of Mar's portfolio at /design1, /design2, /design3,
each a different take on the reference photos in reference-theme-photos/ (read from the
main checkout at C:/Users/cdbak/MarsPortfolio/reference-theme-photos — gitignored, local-only).
Each design has a color-theme switcher (top right); each theme's palette correlates to one
image in reference-theme-photos/ColorPalette (6 images -> 6 themes).
Work happens in this worktree (branch feature/design-explorations); merge to main at the end.

## Units

- [x] 1. Worktree + deps (react-router, react-markdown) + battles docs copied — `done`
- [x] 2. Shared foundation — `done`
  - battles/theme-concept.md (6 palettes w/ hex + 3 design directions, each traced to reference files)
  - src/index.css: Tailwind 4 @theme tokens + 6 [data-theme] palettes
  - src/theme/: themes.ts (registry), ThemeProvider + useTheme, ThemeSwitcher (top-right control)
  - src/content/: site.ts, images.ts, writing/ (3 placeholder pieces + manifest)
  - src/routes.tsx: / (design chooser) + /design1|2|3 nested routes; App wired
- [x] 3. Design 1 "Field Journal" — editorial book-spread (subagent) — `done`
- [x] 4. Design 2 "Poster" — bold display type, full-bleed color (subagent) — `done`
- [x] 5. Design 3 "Collage" — layered zine/scrapbook (subagent) — `done`
- [x] 6. Verify: tsc + vite build green; playwright screenshots of each design x sample themes; fix issues — `done`
- [x] 7. Update battles docs; commit; merge feature branch to main; COMPLETION.md — `done`

## Design directions (decided from Vibes/ + FeatureDesign/ references)

1. Field Journal — cream paper book spread, serif, thin rules, page numbers
   (ref: FeatureDesign/29128d1... Brooklyn Piers spread, Vibes/0725d3b... zine spread)
2. Poster — large display type shaped over full-bleed color fields
   (ref: FeatureDesign/963a105... text-over-landscape poster, Vibes/44825b5... art-nouveau poppies)
3. Collage — layered framed cards, rotated elements, stamps/pressed-flower
   (ref: FeatureDesign/0060991... "Reading the Tree", FeatureDesign/cb6b5c0... framed letter)

## Theme palettes (ColorPalette/ image -> theme)

1. 024d1b06... -> sunset   "Sunset Traveler" (#CDD0DB #9197AA #F7B557 #E27921 #C1521E)
2. 08af57c5... -> everglade "Everglade"      (#264431 #719687 #5A94A7 #BED9EB #EAA043)
3. 4e063adc... -> lilypond "Lily Pond"       (#0A3323 #839958 #F7F4D5 #D3968C #105666)
4. 50232d2c... -> meadow   "Wild Meadow"     (#5F5420 #A1A8BE #F3D0C3 #EDBEE4 #EA785B #3F0013)
5. 9bf7ad49... -> yosemite "Yosemite"        (#353326 #897E45 #EDD9B7 ~#B7B3BE #EF955F #C46D52)
6. b140c19c... -> floral   "Vintage Floral"  (no hex in image; sampled: ~#8E5560 ~#C08B98 ~#E8D8C6 ~#7B7B52 ~#46617A ~#7FA3CB)

## Finishing criteria

1. `npm run build` (tsc -b && vite build) exits 0 in the worktree.
2. Dev server serves /, /design1, /design2, /design3; each design renders all sections
   (home/hero, writing index, reader for a piece, gallery, about, contact).
3. Theme switcher visible top-right in every design; switching changes colors live;
   all 6 themes selectable; palettes match the table above.
4. Playwright screenshots captured for each design (at least default + one alternate theme).
5. battles/ docs updated (theme-concept.md exists; css-architecture.md consistent with what was built).
6. Branch merged to main; main's working tree builds.
