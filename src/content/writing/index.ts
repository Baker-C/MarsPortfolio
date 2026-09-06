// Writing manifest. Every piece lives on an external publication's site, so
// each entry is a link-out card: metadata + summary excerpt + the original URL.
// Nothing is rehosted. See battles/content-plan.md for the rationale.

export type PieceKind = 'essay' | 'poem' | 'fiction' | 'article'
export type PieceSection = 'creative' | 'professional'

export type Piece = {
  slug: string
  title: string
  kind: PieceKind
  year: string
  venue: string
  url: string
  excerpt: string
  section: PieceSection
  /** Soft credit line for work produced, not bylined — shown verbatim. */
  credit?: string
}

export const sections: { key: PieceSection; label: string }[] = [
  { key: 'creative', label: 'Creative' },
  { key: 'professional', label: 'Advocacy' },
]

const FHCO_CREDIT =
  'Produced during my tenure at the Fair Housing Council of Oregon'

export const pieces: Piece[] = [
  {
    slug: 'wicahpi-hinhpaya',
    title: 'Wičaȟpi Hiŋȟpáya',
    kind: 'fiction',
    year: '2026',
    venue: 'Homeplace Magazine',
    url: 'https://homeplacemag.com/2026/08/10/wicahpi-hinhpaya/',
    excerpt:
      'A life-sentenced prisoner is exiled into space toward a distant black hole — dystopian science fiction braided with Lakota mythology.',
    section: 'creative',
  },
  {
    slug: 'dust-to-dust',
    title: 'Dust to Dust',
    kind: 'poem',
    year: 'n.d.',
    venue: 'Floweret Poppy Wilt',
    url: 'https://online.fliphtml5.com/ioqsp/bmky/#p=62',
    excerpt:
      'A five-part prose poem moving from the formless void through a love story told in the language of scripture, myth, and appetite.',
    section: 'creative',
  },
  {
    slug: 'apricity-and-vespers',
    title: 'Apricity and Louise Glück’s Vespers',
    kind: 'essay',
    year: 'n.d.',
    venue: 'The Wineskin',
    url: 'https://www.thewineskin.com/blog/apricity-and-louise-glcks-vespers',
    excerpt:
      'The warmth of the winter sun, read against Glück’s “Vespers” — on spiritual disconnection and the attentiveness that begins to repair it.',
    section: 'creative',
  },
  {
    slug: 'musings-on-formation-iii',
    title: 'Musings on Formation III.',
    kind: 'essay',
    year: '2020',
    venue: 'The Wineskin',
    url: 'https://www.thewineskin.com/blog/musings-on-formation-iii',
    excerpt:
      'A tulip frozen under spring snow — dissolution and stagnation as what make renewal possible.',
    section: 'creative',
  },
  {
    slug: 'i-started-using-their-name-in-vain',
    title: '“I Started Using Their Name in Vain…”',
    kind: 'essay',
    year: 'n.d.',
    venue: 'The Wineskin',
    url: 'https://www.thewineskin.com/blog/i-started-using-their-name-in-vain',
    excerpt:
      'A complicated relationship with faith, traced through the different names given to God — certainty, grief, doubt, and witness.',
    section: 'creative',
  },
  {
    slug: 'housing-status-protected-class',
    title: 'Imagining Housing Status as a Protected Class',
    kind: 'article',
    year: '2023',
    venue: 'Fair Housing Council of Oregon',
    url: 'https://fhco.org/imagining-housing-status-as-a-protected-class/',
    excerpt:
      'An argument for extending fair housing protections to unhoused people as a protected class, with Salem, Oregon as the proof it can be done.',
    section: 'professional',
  },
  {
    slug: 'future-of-fair-housing',
    title: 'The Future of Fair Housing Needs YOU!',
    kind: 'article',
    year: '2024',
    venue: 'FHCO Newsletter',
    url: 'https://us7.campaign-archive.com/?u=972fec413cac24baf355a7809&id=92d0c31f67',
    excerpt:
      'What policies are we putting in place today that will be on a bus tour fifty years from now?',
    section: 'professional',
    credit: FHCO_CREDIT,
  },
  {
    slug: 'from-portland-to-broadway',
    title: 'From Portland to Broadway',
    kind: 'article',
    year: 'n.d.',
    venue: 'FHCO Newsletter',
    url: 'https://us7.campaign-archive.com/?u=972fec413cac24baf355a7809&id=cda8d6a9d8',
    excerpt:
      'Dr. DeNorval Unthank’s Portland and Lorraine Hansberry’s Chicago, linked by housing discrimination.',
    section: 'professional',
    credit: FHCO_CREDIT,
  },
  {
    slug: 'fair-housing-history-is-black-history',
    title: 'Fair Housing History IS Black History!',
    kind: 'article',
    year: 'n.d.',
    venue: 'FHCO Newsletter',
    url: 'https://us7.campaign-archive.com/?u=972fec413cac24baf355a7809&id=a3e1e1a13f',
    excerpt:
      'How housing and land in the United States were regulated toward white male ownership, beginning with Oregon’s 1859 exclusion.',
    section: 'professional',
    credit: FHCO_CREDIT,
  },
  {
    slug: 'a-century-of-nativism',
    title: 'A Century of Nativism: 1921 to 2025',
    kind: 'article',
    year: '2025',
    venue: 'FHCO Newsletter',
    url: 'https://us7.campaign-archive.com/?u=972fec413cac24baf355a7809&id=990fc0b8e1',
    excerpt:
      'A 2025 executive order set against a century of American nativist policy, from the quota era to the present.',
    section: 'professional',
    credit: FHCO_CREDIT,
  },
  {
    slug: 'response-to-grants-pass-v-johnson',
    title: 'A Response to Grants Pass v. Johnson',
    kind: 'article',
    year: '2024',
    venue: 'FHCO Newsletter',
    url: 'https://us7.campaign-archive.com/?u=972fec413cac24baf355a7809&id=fe89707017',
    excerpt:
      'What the Supreme Court’s Grants Pass v. Johnson decision means for unhoused Oregonians.',
    section: 'professional',
    credit: FHCO_CREDIT,
  },
  {
    slug: 'maxville-a-place-of-healing',
    title: 'Maxville: A Place of Healing, History, Joy, and Art',
    kind: 'article',
    year: '2024',
    venue: 'FHCO Newsletter',
    url: 'https://us7.campaign-archive.com/?u=972fec413cac24baf355a7809&id=d3446efe1e',
    excerpt:
      'The logging town of Maxville, 1923–1933, and the work of recovering its history.',
    section: 'professional',
    credit: FHCO_CREDIT,
  },
]
