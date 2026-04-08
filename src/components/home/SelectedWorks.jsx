// eslint-disable-next-line react/prop-types
import { Link } from 'react-router-dom'
import { portfolioData } from '../../../public/data/portfolio.js'

// eslint-disable-next-line react/prop-types
export default function SelectedWorks({ containerRef }) {
  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <p className="section-label text-white/50 text-xs font-mono tracking-[0.2em] uppercase mb-8">Selected Works</p>
      <div ref={containerRef}>
        {portfolioData.slice(0, 3).map(({ title, stack, link }, i) => (
          <a
            key={title}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="work-item group flex items-center gap-6 border-b border-white/5 py-6 hover:bg-white/[0.02] transition-colors duration-200 -mx-4 px-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
        ))}
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
