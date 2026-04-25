import { forwardRef } from 'react'
import { EXPERIENCE } from '../data'
import './sections.css'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
)

const Experience = forwardRef((props, ref) => (
  <section
    id="experience"
    data-section="Experience"
    ref={ref}
    className="section"
  >
    <p className="section-label">Experience</p>

    {EXPERIENCE.map((job, i) => (
      <a
        key={i}
        href={job.url}
        target="_blank"
        rel="noreferrer"
        className="card exp-card"
      >
        <div className="exp-date">{job.date}</div>
        <div>
          <div className="card-title">
            {job.title} · {job.company}
            <ArrowIcon />
          </div>
          {job.sub && <div className="exp-sub">{job.sub}</div>}
          <p className="card-desc">{job.description}</p>
          <div className="tag-list">
            {job.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
      </a>
    ))}
  </section>
))

Experience.displayName = 'Experience'
export default Experience
