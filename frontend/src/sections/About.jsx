import { forwardRef } from 'react'
import { ABOUT_PARAGRAPHS } from '../data'
import './sections.css'

const About = forwardRef((props, ref) => (
  <section
    id="about"
    data-section="About"
    ref={ref}
    className="section"
  >
    <p className="section-label">About</p>
    <div className="about-content">
      {ABOUT_PARAGRAPHS.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  </section>
))

About.displayName = 'About'
export default About
