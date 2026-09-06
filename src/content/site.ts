// Site-wide copy and metadata. Pages import from here and pass down as props;
// components never import this file. All copy speaks in Marlee's first-person
// voice (Marlee uses they/them). Contact details stay placeholder until
// Marlee confirms what they want public — see battles/content-plan.md.

export type NavItem = { label: string; path: string }

export const site = {
  name: 'Marlee Baker',
  title: 'Marlee Baker — Writing & Editing',
  tagline: 'Stories, poems, and essays — alongside fair-housing advocacy and freelance editing.',
  nav: [
    { label: 'Home', path: '' },
    { label: 'Writing', path: 'writing' },
    { label: 'Editing', path: 'editing' },
    { label: 'Gallery', path: 'gallery' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' },
  ] satisfies NavItem[],
  about: {
    heading: 'About Marlee',
    paragraphs: [
      'I’m a writer and editor. My fiction, poetry, and essays have appeared in Homeplace Magazine, Floweret Poppy Wilt, and The Wineskin — work that moves between speculative fiction, prose poetry, and lyric essay.',
      'As Education and Outreach Specialist for the Portland Metro and Salem regions at the Fair Housing Council of Oregon, I wrote and produced education and advocacy pieces on fair housing — from protected-class policy to Oregon’s housing history.',
      'A fuller bio is on its way — until then, the writing speaks for itself.',
    ],
  },
  editing: {
    heading: 'Editing',
    blurb: 'Freelance editing, alongside my writing.',
    paragraphs: [
      'I take on freelance editing work alongside my own writing.',
      'Rates, availability, and scope by conversation — reach out and we’ll talk.',
    ],
    project: {
      label: 'Native American Flight Attendant',
      href: 'https://nativeamericanflightattendant.com/',
      note: 'A recent client project',
    },
  },
  contact: {
    heading: 'Get in touch',
    blurb:
      'For commissions, reprints, readings, or just to say a word — my inbox is open.',
    email: 'hello@marlee.example',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/example' },
      { label: 'Substack', href: 'https://example.substack.com' },
    ],
  },
}
