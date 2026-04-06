import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)
import { portfolioData } from '../../public/data/portfolio.js'

/* eslint-disable react/prop-types */
function MobileProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    // rAF ensures the browser paints opacity:0 before the observer starts.
    // Without it, the IO fires in the same tick as the initial render and
    // React batches the state update — the CSS transition never plays.
    let io
    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } },
        { threshold: 0.1 }
      )
      io.observe(el)
    })
    return () => { cancelAnimationFrame(raf); io?.disconnect() }
  }, [])

  const image = project.images && project.images.length > 0 ? project.images[0] : project.imgUrl

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      className="border-b border-white/5 px-5 pt-6 pb-8"
    >
      {/* Project number */}
      <p
        className="font-mono text-white/10 leading-none mb-1 select-none"
        style={{ fontSize: 'clamp(4rem, 20vw, 6rem)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </p>

      {/* Title */}
      <h2 className="font-display text-3xl font-bold text-white leading-tight mb-2">
        {project.title}
      </h2>

      {/* Description */}
      {project.description && (
        <p className="text-sm font-mono text-white/45 leading-relaxed mb-4">
          {project.description}
        </p>
      )}

      {/* Image */}
      <div className="w-full aspect-video overflow-hidden rounded-sm mb-4">
        <img
          src={image}
          alt={`Proyecto ${project.title}`}
          width={1280}
          height={720}
          className="w-full h-full object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono text-white/50 border border-white/10 px-2 py-0.5 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-white/60 hover:text-white transition-colors"
        >
          Ver proyecto ↗
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-white/40 hover:text-white/70 transition-colors"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  )
}

function LeftPanel({ project, panelRef }) {
  return (
    <div ref={panelRef} className="flex flex-col justify-center flex-1 min-h-0 px-10 lg:px-16 overflow-y-auto">
      {/* Index */}
      <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-8">
        Selected work
      </p>

      {/* Title */}
      <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
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
          className="flex items-center gap-2 text-sm font-mono text-white/70 hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <span className="w-4 h-px bg-white/30 group-hover:w-6 group-hover:bg-white transition-all duration-300" />
          Ver proyecto ↗
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white/70 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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

function Img({ src, alt, eager }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto block"
      loading={eager ? 'eager' : 'lazy'}
    />
  )
}

function ImageGrid({ images, title, projectIndex, eager }) {
  const count = images.length
  const alt = (i) => `${title} — captura ${i + 1}`
  const flip = projectIndex % 2 === 1

  // Layout configs per image index: [widthClass, marginClass]
  const layouts5 = flip
    ? [
        ['w-full', ''],
        ['w-[72%]', 'ml-auto'],
        ['w-[60%]', 'mr-auto'],
        ['w-[78%]', 'ml-auto'],
        ['w-[55%]', 'ml-[10%]'],
      ]
    : [
        ['w-full', ''],
        ['w-[72%]', 'mr-auto'],
        ['w-[60%]', 'ml-auto'],
        ['w-[78%]', 'mr-auto'],
        ['w-[55%]', 'mr-[10%]'],
      ]

  const layouts4 = flip
    ? [
        ['w-full', ''],
        ['w-[75%]', 'ml-auto'],
        ['w-[62%]', 'mr-auto'],
        ['w-[80%]', 'ml-auto'],
      ]
    : [
        ['w-full', ''],
        ['w-[75%]', 'mr-auto'],
        ['w-[62%]', 'ml-auto'],
        ['w-[80%]', 'mr-auto'],
      ]

  const layouts = count >= 5 ? layouts5 : count >= 4 ? layouts4 : null

  if (count === 1) {
    return (
      <div className="py-8 px-8">
        <Img src={images[0]} alt={title} eager={eager} />
      </div>
    )
  }

  if (layouts) {
    return (
      <div className="py-6 flex flex-col gap-3">
        {images.map((src, i) => {
          const [width, margin] = layouts[i] || ['w-full', '']
          return (
            <div key={i} className={`${width} ${margin}`}>
              <Img src={src} alt={alt(i)} eager={eager && i === 0} />
            </div>
          )
        })}
      </div>
    )
  }

  // 2–3 images
  const fallback = flip
    ? [['w-full', ''], ['w-[68%]', 'ml-auto'], ['w-[75%]', 'mr-auto']]
    : [['w-full', ''], ['w-[68%]', 'mr-auto'], ['w-[75%]', 'ml-auto']]

  return (
    <div className="py-8 flex flex-col gap-3">
      {images.map((src, i) => {
        const [width, margin] = fallback[i] || ['w-full', '']
        return (
          <div key={i} className={`${width} ${margin}`}>
            <Img src={src} alt={alt(i)} eager={eager && i === 0} />
          </div>
        )
      })}
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
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [index, onIntersect])

  const images = project.images && project.images.length > 0 ? project.images : [project.imgUrl]

  return (
    <div ref={sectionRef} className="relative w-full border-b border-white/5">
      <ImageGrid
        images={images}
        title={project.title}
        projectIndex={index}
        eager={index === 0}
      />

      {/* Mobile info overlay (bottom of last image) */}
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
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.fromTo(
      '.anim',
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
    )
  }, { scope: headingRef })

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

      {/* Mobile: card list */}
      <div className="md:hidden">
        {portfolioData.map((project, i) => (
          <MobileProjectCard
            key={project.slug}
            project={project}
            index={i}
          />
        ))}
      </div>
    </main>
  )
}
