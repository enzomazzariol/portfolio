import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { portfolioData } from '../../public/data/portfolio.js'

function LeftPanel({ project, panelRef }) {
  return (
    <div ref={panelRef} className="flex flex-col justify-center h-full px-10 lg:px-16">
      {/* Index */}
      <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-8">
        Selected work
      </p>

      {/* Title */}
      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
        {project.title}
      </h2>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
        {project.description}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 mb-10">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono text-white/40 border border-white/10 px-2.5 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-mono text-white/70 hover:text-white transition-colors group"
        >
          <span className="w-4 h-px bg-white/30 group-hover:w-6 group-hover:bg-white transition-all duration-300" />
          Ver proyecto ↗
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white/70 transition-colors group"
          >
            <span className="w-4 h-px bg-white/20 group-hover:w-6 group-hover:bg-white/40 transition-all duration-300" />
            GitHub ↗
          </a>
        )}
      </div>

      {/* Project counter */}
      <p className="mt-auto text-white/15 text-xs font-mono">
        {String(portfolioData.indexOf(project) + 1).padStart(2, '0')} / {String(portfolioData.length).padStart(2, '0')}
      </p>
    </div>
  )
}

function ImageSection({ project, onIntersect, index }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect(index)
      },
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [index, onIntersect])

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <img
        src={project.imgUrl}
        alt={`Proyecto ${project.title}`}
        className="w-full h-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Mobile info overlay (bottom) */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-white/50 text-xs font-mono mb-3">{project.stack.join(' · ')}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 text-xs font-mono underline"
        >
          Ver proyecto ↗
        </a>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRef = useRef(null)
  const prevIndexRef = useRef(0)

  const handleIntersect = useCallback((index) => {
    if (index === prevIndexRef.current) return
    prevIndexRef.current = index

    if (panelRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }

    setActiveIndex(index)
  }, [])

  // Entrance animation for page heading
  const headingRef = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!headingRef.current) return

    gsap.fromTo(
      headingRef.current.querySelectorAll('.anim'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
    )
  }, [])

  return (
    <main className="min-h-screen pt-14">
      {/* Desktop: split layout */}
      <div className="hidden md:flex">
        {/* Left: sticky info panel */}
        <div className="w-[42%] sticky top-14 h-[calc(100vh-3.5rem)] border-r border-white/5 flex flex-col">
          {/* Page label */}
          <div ref={headingRef} className="px-10 lg:px-16 pt-12 pb-0">
            <p className="anim text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">
              Enzo Mazzariol · Work
            </p>
          </div>
          <LeftPanel project={portfolioData[activeIndex]} panelRef={panelRef} />
        </div>

        {/* Right: scrollable images */}
        <div className="w-[58%]">
          {portfolioData.map((project, i) => (
            <ImageSection
              key={project.slug}
              project={project}
              index={i}
              onIntersect={handleIntersect}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden">
        {portfolioData.map((project, i) => (
          <ImageSection
            key={project.slug}
            project={project}
            index={i}
            onIntersect={handleIntersect}
          />
        ))}
      </div>
    </main>
  )
}
