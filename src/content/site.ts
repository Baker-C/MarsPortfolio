// Site-wide copy and metadata. Pages import from here and pass down as props;
// components never import this file. All contact details are placeholders
// until real ones are provided.

export type NavItem = { label: string; path: string }

export const site = {
  name: 'Marlee',
  title: 'Marlee — Writing & Art',
  tagline: 'Essays, poems, and small fictions from the edge of the field.',
  nav: [
    { label: 'Home', path: '' },
    { label: 'Writing', path: 'writing' },
    { label: 'Gallery', path: 'gallery' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' },
  ] satisfies NavItem[],
  about: {
    heading: 'About Marlee',
    paragraphs: [
      'Marlee writes at the meeting point of field notes and fiction — published papers, creative pieces, and news writing that all start the same way: standing still outside long enough to notice something.',
      'This site is a working portfolio. The pieces here rotate; the gallery collects visual work and ephemera that grew alongside the writing.',
      'When not writing, Marlee is usually somewhere with long grass, a scanner bed full of pressed flowers, and a pot of tea going cold.',
    ],
  },
  contact: {
    heading: 'Get in touch',
    blurb:
      'For commissions, reprints, readings, or just to say a word — the inbox is open.',
    email: 'hello@marlee.example',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/example' },
      { label: 'Substack', href: 'https://example.substack.com' },
    ],
  },
}
