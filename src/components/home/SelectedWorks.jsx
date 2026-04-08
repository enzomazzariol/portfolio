import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioData } from '../../../public/data/portfolio.js'

// eslint-disable-next-line react/prop-types
export default function SelectedWorks({ containerRef }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <p className="section-label text-white/50 text-xs font-mono tracking-[0.2em] uppercase mb-8">Selected Works</p>
      <div ref={containerRef}>
        {portfolioData.slice(0, 3).map(({ title, stack, link, images, imgUrl }, i) => {
          const previews = (images && images.length > 0 ? images : [imgUrl]).slice(0, 3)
          const isOpen = hoveredIndex === i

          return (
            <div key={title} className="border-b border-white/5">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="work-item group flex items-center gap-6 py-6 -mx-4 px-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="text-4xl font-bold text-white/10 font-mono w-14 shrink-0 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[clamp(1.5rem,4vw,3rem)] font-bold text-white flex-1 leading-tight">
                  {title}
                </span>
                <div className="hidden md:flex flex-wrap gap-1.5 justify-end max-w-[280px]">
                  {stack.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-white/45 border border-white/10 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-white/30 group-hover:text-white transition-colors duration-200 text-xl font-mono shrink-0 ml-2">
                  ↗︎
                </span>
              </a>

              {/* Expandable image gallery */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="overflow-hidden">
                  <div className="flex gap-2 pb-5">
                    {previews.map((src, j) => (
                      <div
                        key={j}
                        className="flex-1 overflow-hidden"
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
                          transition: `opacity 0.9s ease ${j * 150}ms, transform 0.9s ease ${j * 150}ms`,
                        }}
                      >
                        <img
                          src={src}
                          alt={`${title} — imagen ${j + 1}`}
                          className="w-full aspect-video object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-10 flex justify-end">
        <Link
          to="/proyectos"
          className="text-sm font-mono text-white/60 hover:text-white/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Ver todos →
        </Link>
      </div>
    </section>
  )
}
