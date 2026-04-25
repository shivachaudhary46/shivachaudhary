import { forwardRef } from 'react'
import { PROJECTS } from '../data'
import './sections.css'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
)

const Projects = forwardRef((props, ref) => (
  <section
    id="projects"
    data-section="Projects"
    ref={ref}
    className="section"
  >
    <p className="section-label">Projects</p>

    {PROJECTS.map((p, i) => (
      <a
        key={i}
        href={p.url}
        target="_blank"
        rel="noreferrer"
        className="card project-card"
      >
        <div className="project-icon">{p.icon}</div>
        <div>
          <div className="card-title">
            {p.title}
            <ArrowIcon />
          </div>
          <p className="card-desc">{p.description}</p>
          <div className="tag-list">
            {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
      </a>
    ))}
  </section>
))

Projects.displayName = 'Projects'
export default Projects
