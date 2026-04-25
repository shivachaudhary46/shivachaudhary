import './LeftPanel.css'
import { PROFILE } from '../data'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1.15-.01-2.1-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97.01 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .3.21.66.79.55C20.71 21.41 24 17.1 24 12 24 5.65 18.35.5 12 .5z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M20.45 20.45h-3.57v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.33V9h3.43v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.55 20.45h3.57V9H3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.9 4.9 0 0 1-1.772-1.153A4.9 4.9 0 0 1 1.795 19.28c-.163-.46-.35-1.26-.403-2.43C1.334 15.584 1.32 15.204 1.32 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43A4.9 4.9 0 0 1 2.946 2.948 4.9 4.9 0 0 1 4.72 1.795c.46-.163 1.26-.35 2.43-.403C8.416 1.334 8.796 1.32 12 1.32zm0 10.674a2.163 2.163 0 1 0 0 4.326 2.163 2.163 0 0 0 0-4.326zm0-1.44a3.603 3.603 0 1 1 0 7.206 3.603 3.603 0 0 1 0-7.206zm4.965-.403a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z"/>
  </svg>
)

export default function LeftPanel({ sections, activeSection, onNavClick }) {
  return (
    <aside className="left-panel">
      <div className="left-top">
        <h1>{PROFILE.name}</h1>
        <h2>{PROFILE.role}</h2>
        <p>{PROFILE.tagline}</p>

        <nav className="nav">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className={activeSection === s ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onNavClick(s) }}
            >
              <span className="nav-line" />
              {s}
            </a>
          ))}
        </nav>
      </div>

      <div className="socials">
        <a href={PROFILE.social.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
        <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href={PROFILE.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><TwitterIcon /></a>
        <a href={PROFILE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
      </div>
    </aside>
  )
}
