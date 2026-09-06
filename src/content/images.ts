// Semantic image slots. Components ask for a slot, never a file path.
// Current photos are openly-licensed stand-ins from Wikimedia Commons
// (see public/photos/CREDITS.md — CC BY-SA attribution required if shipped).
// Swap a slot's src when Marlee's real images land and nothing else moves.

export type ArtTone = 'accent' | 'accent2' | 'muted' | 'highlight'
export type ArtMotif = 'poppy' | 'iris' | 'lily' | 'meadow' | 'ridge' | 'moth'

export type ImageSlot =
  | { kind: 'art'; motif: ArtMotif; tone: ArtTone; alt: string; caption?: string }
  | { kind: 'photo'; src: string; alt: string; caption?: string }

export const images = {
  hero: {
    kind: 'photo',
    src: '/photos/fog-field-tall.jpg',
    alt: 'Tall pines in thick morning fog, a pale sun behind them',
    caption: 'Photo: Dietmar Rabich · CC BY-SA 4.0',
  } satisfies ImageSlot as ImageSlot,

  aboutPortrait: {
    kind: 'art',
    motif: 'moth',
    tone: 'accent2',
    alt: 'Line drawing of a moth resting on a leaf',
  } satisfies ImageSlot as ImageSlot,

  gallery: [
    {
      kind: 'photo',
      src: '/photos/fog-field-wide.jpg',
      alt: 'A hedgerow of trees dissolving into fog across a field',
      caption: 'Photo: Dietmar Rabich · CC BY-SA 4.0',
    },
    {
      kind: 'photo',
      src: '/photos/meadow-stream.jpg',
      alt: 'A small stream winding through a rough green meadow',
      caption: 'Photo: Dietmar Rabich · CC BY-SA 4.0',
    },
    {
      kind: 'photo',
      src: '/photos/meadow-wide.jpg',
      alt: 'An open meadow of long grass under a broad sky',
      caption: 'Photo: Dietmar Rabich · CC BY-SA 4.0',
    },
    {
      kind: 'photo',
      src: '/photos/park-trees.jpg',
      alt: 'Old park trees standing in soft light',
      caption: 'Photo: Dietmar Rabich · CC BY-SA 4.0',
    },
    {
      kind: 'photo',
      src: '/photos/moss-gorge-tall.jpg',
      alt: 'Mossy boulders in a shaded stream gorge',
      caption: 'Photo: Dietmar Rabich · CC BY-SA 4.0',
    },
    {
      kind: 'photo',
      src: '/photos/pond-reflection.jpg',
      alt: 'A tree reflected in the still surface of a pond',
      caption: 'Photo: W.carter · public domain',
    },
    {
      kind: 'photo',
      src: '/photos/green-hills.jpg',
      alt: 'Green mountain pasture falling away into hazy ridges',
      caption: 'Photo: rybakot · CC BY-SA 3.0',
    },
  ] satisfies ImageSlot[] as ImageSlot[],
}
