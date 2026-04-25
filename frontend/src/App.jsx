import { useEffect, useRef, useState } from 'react'
import CursorGlow from './components/CursorGlow'
import LeftPanel from './components/LeftPanel'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Footer from './sections/Footer'
import './styles/App.css'

const SECTIONS = ['About', 'Experience', 'Projects']

export default function App() {
  const [activeSection, setActiveSection] = useState('About')
  const sectionRefs = useRef({})

  // Highlight the nav item for the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Radial glow that follows the cursor */}
      <CursorGlow />

      <div className="app-layout">
        {/* ── Sticky left sidebar ── */}
        <LeftPanel
          sections={SECTIONS}
          activeSection={activeSection}
          onNavClick={scrollTo}
        />

        {/* ── Scrollable right content ── */}
        <main className="right-panel">
          <About ref={(el) => (sectionRefs.current['About'] = el)} />
          <Experience ref={(el) => (sectionRefs.current['Experience'] = el)} />
          <Projects ref={(el) => (sectionRefs.current['Projects'] = el)} />
          <Footer />
        </main>
      </div>
    </>
  )
}
