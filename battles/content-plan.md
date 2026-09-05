# Content plan — real works replacing placeholders

Decided September 5, 2026, from the source material in `MarsPortfolio/MarsPortfolio/`
(Marlee Baker's emails, Aug 2–19 2026, compiled into 12 work cards + a URL index).
This supersedes the placeholder content in `src/content/`.

## Decisions

### 1. Piece model: link-out cards

Every real piece lives on an external publication's site; nothing is rehosted.
Each work becomes a card — title, venue, date, kind, and the compiled summary as
excerpt — linking out to the original. No full text on-site, no rights questions.
The paginated Reader goes dormant (kept, not removed — it returns if Marlee ever
supplies manuscripts/PDFs with a "first published in" credit line).

Consequence for `src/content/writing/`: the `Piece` type gains venue/URL and loses
required `markdown`; the four placeholder markdown pieces are retired.

### 2. Sections: Creative + Professional + Editing

Three sections replace the single Writing index:

- **Creative** (5 pieces) — led by *Wičaȟpi Hiŋȟpáya* (Homeplace Magazine,
  Aug 2026, her most recent publication), then *Dust to Dust* (Floweret Poppy
  Wilt), and the three Wineskin essays.
- **Professional / Advocacy** (7 pieces) — anchored by *Imagining Housing Status
  as a Protected Class* (fhco.org, the one clearly bylined piece), with the six
  FHCO newsletters beneath it.
- **Editing** — freelance editing services, with nativeamericanflightattendant.com
  as the (to-be-confirmed) client credit.

### 3. FHCO newsletters (works 07–12): soft credit

Included now, framed as "produced during my tenure at the Fair Housing Council of
Oregon" — a framing that does not claim authorship. Upgrade to direct attribution
per piece once Marlee confirms wrote / edited / produced for each.

### 4. Gallery: keep with placeholder art

The themed line-art gallery stays as decorative until Marlee sends visual content.
No changes needed to `images.ts` gallery slots.

### 5. Identity: Marlee Baker, interim bio

Site name/title become "Marlee Baker". About gets a short factual interim bio
drawn from the works themselves (writer and editor; fiction, poetry, and lyric
essay in Homeplace Magazine, Floweret Poppy Wilt, and The Wineskin; education and
outreach writing for the Fair Housing Council of Oregon) — swapped out when her
real bio arrives (offered Aug 2, not yet sent).

### 6. Contact: placeholder until confirmed

Keep a clearly-placeholder address. Do not publish marleebaker.21@gmail.com
without her explicit OK — it's her personal inbox, not a stated public contact.

## Still waiting on Marlee

Carried over from the compilation's open questions, still blocking upgrades:

1. Bio (promised Aug 2).
2. Public contact email / social links.
3. Per-piece FHCO credits (07–12) — unlocks direct attribution.
4. Yellow Medicine Review — specific piece, or venue credit only?
5. nativeamericanflightattendant.com — editing client confirmation.
6. *Dust to Dust* PDF/image of p. 62 (flipbook link lands on the whole issue).
7. *Musings on Formation* I and II — include the earlier series entries?
8. Publication years for the two undated Wineskin posts.
