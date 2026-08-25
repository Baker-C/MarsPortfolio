// Semantic image slots. Components ask for a slot, never a file path.
// No real photos exist yet, so every slot is placeholder line-art rendered by
// src/components/ui/ArtPlaceholder.tsx in theme colors. When real images land,
// change a slot to { kind: 'photo', src, alt } and nothing else moves.

export type ArtTone = 'accent' | 'accent2' | 'muted' | 'highlight'
export type ArtMotif = 'poppy' | 'iris' | 'lily' | 'meadow' | 'ridge' | 'moth'

export type ImageSlot =
  | { kind: 'art'; motif: ArtMotif; tone: ArtTone; alt: string; caption?: string }
  | { kind: 'photo'; src: string; alt: string; caption?: string }

export const images = {
  hero: {
    kind: 'art',
    motif: 'meadow',
    tone: 'accent',
    alt: 'Line drawing of a wildflower meadow at dusk',
  } satisfies ImageSlot as ImageSlot,

  aboutPortrait: {
    kind: 'art',
    motif: 'moth',
    tone: 'accent2',
    alt: 'Line drawing of a moth resting on a leaf',
  } satisfies ImageSlot as ImageSlot,

  gallery: [
    {
      kind: 'art',
      motif: 'poppy',
      tone: 'accent',
      alt: 'Study of poppies against clouds',
      caption: 'Poppy study, gouache',
    },
    {
      kind: 'art',
      motif: 'iris',
      tone: 'accent2',
      alt: 'Iris petals in ink',
      caption: 'Iris, ink on paper',
    },
    {
      kind: 'art',
      motif: 'lily',
      tone: 'highlight',
      alt: 'Lily pads on still water',
      caption: 'Pond series, no. 3',
    },
    {
      kind: 'art',
      motif: 'ridge',
      tone: 'muted',
      alt: 'A granite ridge over treeline',
      caption: 'Ridge line, graphite',
    },
    {
      kind: 'art',
      motif: 'meadow',
      tone: 'accent2',
      alt: 'Tall grasses with seed heads',
      caption: 'Grasslands, screen print',
    },
    {
      kind: 'art',
      motif: 'moth',
      tone: 'accent',
      alt: 'A moth drawn from a pinned specimen',
      caption: 'Specimen drawing',
    },
  ] satisfies ImageSlot[] as ImageSlot[],
}
