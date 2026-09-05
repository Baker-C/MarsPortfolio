// Site-wide copy and metadata. Pages import from here and pass down as props;
// components never import this file. Contact details stay placeholder until
// Marlee confirms what she wants public — see battles/content-plan.md.

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
      'Marlee Baker is a writer and editor. Her fiction, poetry, and essays have appeared in Homeplace Magazine, Floweret Poppy Wilt, and The Wineskin — work that moves between speculative fiction, prose poetry, and lyric essay.',
      'As Education and Outreach Specialist for the Portland Metro and Salem regions at the Fair Housing Council of Oregon, she wrote and produced education and advocacy pieces on fair housing — from protected-class policy to Oregon’s housing history.',
      'A fuller bio is on its way — until then, the writing speaks for itself.',
    ],
  },
  editing: {
    heading: 'Editing',
    blurb: 'Freelance editing, alongside the writing.',
    paragraphs: [
      'Marlee takes on freelance editing work alongside her own writing.',
      'Rates, availability, and scope by conversation — reach out through the contact page.',
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
      'For commissions, reprints, readings, or just to say a word — the inbox is open.',
    email: 'hello@marlee.example',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/example' },
      { label: 'Substack', href: 'https://example.substack.com' },
    ],
  },
}
