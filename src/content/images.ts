// Semantic image slots. Components ask for a slot, never a file path.
// The photos are Marlee's own collage art from public/art/ (sent Sep 2026).
// Two carry known titles (Cry Me A River, Mitakuye); the rest are untitled
// here — update alt/caption when Marlee supplies titles.

export type ArtTone = 'accent' | 'accent2' | 'muted' | 'highlight'
export type ArtMotif = 'poppy' | 'iris' | 'lily' | 'meadow' | 'ridge' | 'moth'

export type ImageSlot =
  | { kind: 'art'; motif: ArtMotif; tone: ArtTone; alt: string; caption?: string }
  | { kind: 'photo'; src: string; alt: string; caption?: string }

const BY = 'Collage · Marlee Baker'

// Public-dir files need the base prefix by hand — Vite only rewrites
// imported assets, not plain strings.
const art = (file: string) => `${import.meta.env.BASE_URL}art/${file}`

export const images = {
  hero: {
    kind: 'photo',
    src: art('IMG_0613.PNG'),
    alt: 'Collage: a watching eye over torn sky, butterfly wings, and the cut-out words “I felt a thrill in being alone”',
    caption: BY,
  } satisfies ImageSlot as ImageSlot,

  /** The angel nightscape's subject (angel, gilded frame, star) with the sky
   *  removed — overlays the full piece 1:1 so the subject pops over the page. */
  creativeCutout: {
    kind: 'photo',
    src: art('Firefly_RemoveBackground.png'),
    alt: '',
  } satisfies ImageSlot as ImageSlot,

  gallery: [
    {
      kind: 'photo',
      src: art('IMG_0612.PNG'),
      alt: 'Collage: an engraved angel diving through a starry night sky past a gilded frame, with the words “I accepted there wasn’t much I could do but appreciate the beauty of the night”',
      caption: BY,
    },
    {
      kind: 'photo',
      src: art('IMG_0610.PNG'),
      alt: 'Collage: a butterfly in glitched rainbow color under the words “THE NEW”',
      caption: BY,
    },
    {
      kind: 'photo',
      src: art('Mitakuye.PNG'),
      alt: 'Mitakuye — collage of a bison, dove, and woodpecker among cut-letter words reading “All Our Relatives”',
      caption: 'Mitakuye · Marlee Baker',
    },
    {
      kind: 'photo',
      src: art('IMG_0614.PNG'),
      alt: 'Collage: four women resting before a red planet, a rising moon, and a great dark feather',
      caption: BY,
    },
    {
      kind: 'photo',
      src: art('Cry_Me_A_River.PNG'),
      alt: 'Cry Me A River — collage of an engraved woman weeping blue petal tears over water, with the line “I’ll tell you how the sun rose, a ribbon at a time”',
      caption: 'Cry Me A River · Marlee Baker',
    },
    {
      kind: 'photo',
      src: art('IMG_0616.PNG'),
      alt: 'Collage: a small golden house inside a cut paper ring, floating in a stormy sky',
      caption: BY,
    },
    {
      kind: 'photo',
      src: art('IMG_0606.PNG'),
      alt: 'Collage: an engraved woman holding a rifle before a woven field of color and a nebula sky',
      caption: BY,
    },
    {
      kind: 'photo',
      src: art('IMG_0617.PNG'),
      alt: 'Collage: a mother carrying a child on her back before an eclipse halo and a line of handwritten sheet music',
      caption: BY,
    },
    {
      kind: 'photo',
      src: art('IMG_0615.PNG'),
      alt: 'Collage: a portrait crowned by a golden fan inside a painted flower border, with the words “Dream the future, know your history, organize your people, fight to win”',
      caption: BY,
    },
  ] satisfies ImageSlot[] as ImageSlot[],
}
