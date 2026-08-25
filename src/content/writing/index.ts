// Writing manifest. One markdown file per piece, imported as raw text.
// Adding a piece = one .md file + one entry here.

import overwintering from './overwintering.md?raw'
import aperolHour from './aperol-hour.md?raw'
import cartographer from './cartographer.md?raw'
import readingOutdoors from './reading-outdoors.md?raw'

export type PieceKind = 'essay' | 'poem' | 'fiction' | 'article'

export type Piece = {
  slug: string
  title: string
  kind: PieceKind
  year: string
  excerpt: string
  markdown: string
}

export const pieces: Piece[] = [
  {
    slug: 'overwintering',
    title: 'Field Notes from the Overwintering',
    kind: 'essay',
    year: '2026',
    excerpt:
      'Dormancy is not sleep. It is a ledger — a winter spent learning the difference between patience and waiting.',
    markdown: overwintering,
  },
  {
    slug: 'aperol-hour',
    title: 'Aperol Hour',
    kind: 'poem',
    year: '2025',
    excerpt: 'Six o’clock lays its orange down on the windowsill like a coin.',
    markdown: aperolHour,
  },
  {
    slug: 'cartographer',
    title: 'The Cartographer of Small Gardens',
    kind: 'fiction',
    year: '2025',
    excerpt:
      'A map of a garden eleven meters square, at a scale generous enough to name things.',
    markdown: cartographer,
  },
  {
    slug: 'reading-outdoors',
    title: 'On Reading Outdoors',
    kind: 'article',
    year: '2024',
    excerpt:
      'The page and the world interleave; years later you cannot remember the chapter without the weather.',
    markdown: readingOutdoors,
  },
]

export function getPiece(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug)
}
