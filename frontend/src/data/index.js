// ─────────────────────────────────────────────
//  PORTFOLIO DATA
//  Edit this file to update your portfolio content.
// ─────────────────────────────────────────────

export const PROFILE = {
  name: 'Brittany Chiang',
  role: 'Frontend Engineer',
  tagline: 'I build accessible, pixel-perfect experiences for the web.',
  social: {
    github: 'https://github.com/bchiang7',
    linkedin: 'https://linkedin.com/in/bchiang7',
    twitter: 'https://x.com/bchiang7',
    instagram: 'https://instagram.com/bchiang7',
  },
}

export const ABOUT_PARAGRAPHS = [
  `Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled
   head first into the rabbit hole of coding and web design. Fast-forward to today, and
   I've had the privilege of building software for an advertising agency, a start-up,
   a huge corporation, and a digital product studio.`,

  `My main focus these days is building accessible, inclusive products and digital
   experiences at <a href="https://www.klaviyo.com" target="_blank" rel="noreferrer">Klaviyo</a>
   for a variety of clients. I most enjoy creating things that live at the intersection
   of design and engineering — things that look good but are also built well under the hood.`,

  `When I'm not at the computer, I'm usually rock climbing, reading, hanging out with
   my wife and two cats, or running around Hyrule searching for Korok seeds.`,
]

export const EXPERIENCE = [
  {
    date: '2024 — Present',
    title: 'Senior Frontend Engineer, Accessibility',
    company: 'Klaviyo',
    url: 'https://klaviyo.com',
    sub: null,
    description:
      'Build and maintain critical components used to construct Klaviyo\'s frontend across the whole product. Work closely with cross-functional teams to implement and advocate for best practices in web accessibility.',
    tags: ['JavaScript', 'TypeScript', 'React', 'Storybook'],
  },
  {
    date: '2018 — 2024',
    title: 'Lead Engineer',
    company: 'Upstatement',
    url: 'https://upstatement.com',
    sub: 'Senior Engineer · Engineer',
    description:
      'Build, style, and ship high-quality websites, design systems, and digital experiences for clients including Harvard Business School, Pratt Institute, and The 19th News.',
    tags: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML & SCSS', 'Node.js'],
  },
  {
    date: 'Jul — Dec 2017',
    title: 'UI Engineer Co-op',
    company: 'Apple',
    url: 'https://apple.com',
    sub: null,
    description:
      'Developed and styled interactive web apps for Apple Music, including the user interface of Apple Music\'s embeddable web player widget for in-browser authorization.',
    tags: ['JavaScript', 'HTML/CSS', 'MVC'],
  },
]

export const PROJECTS = [
  {
    title: 'Spotify Profile',
    description:
      'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.',
    url: 'https://github.com/bchiang7/spotify-profile',
    icon: '🎵',
    tags: ['React', 'Express', 'Spotify API'],
  },
  {
    title: 'Halcyon Theme',
    description:
      'A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on the Visual Studio Marketplace.',
    url: 'https://marketplace.visualstudio.com',
    icon: '🎨',
    tags: ['VS Code', 'Sublime Text', 'Atom'],
  },
  {
    title: 'Build a Spotify Connected App',
    description:
      'A course that walks through building a full-stack web app connected to the Spotify API, covering the Node.js/Express server and OAuth flow.',
    url: 'https://newline.co',
    icon: '📚',
    tags: ['Node.js', 'Express', 'Spotify API'],
  },
]
