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
    // Filler verse for the poster-style overlay — placeholder until Marlee
    // supplies real lines. Two stanzas, one per side of the artwork, long
    // enough to run the full height of the print.
    poem: {
      left: [
        'placeholder verse, for now —',
        'a house held in the eye',
        'of a paper storm,',
        'every draft a weather',
        'I learn to read.',
        'the clouds keep their own',
        'grammar, torn at the seams,',
        'and I keep mine,',
        'pencil light as thread.',
        'what the scissors leave',
        'is also a sentence.',
        'what the glue holds',
        'is also a promise.',
        'I write the storm down',
        'until it fits the page,',
        'then cut a door in it',
        'and wait in the doorway,',
        'listening for the line',
        'that wants to come home.',
      ],
      right: [
        'and this is where the work is:',
        'circling a thing until it opens,',
        'cutting the sky away',
        'so the small true shape',
        'can stand in its ring of light.',
        'every page is weather,',
        'every margin a horizon,',
        'and the red pen only ever asks',
        'one question — is this the house',
        'you meant to build?',
        'I read the way rain reads a roof,',
        'finding every place',
        'the words let the water in,',
        'and I mend them one by one,',
        'quietly, in the storm’s spare room.',
        'a comma is a hinge,',
        'a stanza is a shelter,',
        'a draft is a sky',
        'you are still allowed to change.',
        'placeholder lines, waiting',
        'for the real poem',
        'to walk in and hang up its coat.',
      ],
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
