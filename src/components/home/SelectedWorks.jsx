import { portfolioData } from '../../data/portfolio.js'

export default function SelectedWorks() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-6 mb-14">
        <div>
          <p className="reveal text-xs font-medium tracking-[0.18em] uppercase text-ink/50 mb-4">Proyectos</p>
          <h2 className="split-reveal display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] text-ink">
            Trabajos seleccionados
          </h2>
        </div>
        <a href="/proyectos" className="hidden md:inline text-sm font-medium text-ink/60 hover:text-ink transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
          Ver todos ({portfolioData.length}) →
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-x-6 gap-y-16">
        {portfolioData.slice(0, 4).map(({ title, slug, role, year, stack, imgUrl, highlights }, i) => (
          <a
            key={title}
            href={`/proyectos/${slug}`}
            // Offset the right column so the grid reads as a staggered gallery, not a table
            className={`group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${i % 2 ? 'md:mt-24' : ''}`}
          >
            <div className="work-media overflow-hidden rounded-tile bg-surface aspect-[16/10]">
              <img
                src={imgUrl}
                alt={`${title} — captura del proyecto`}
                className="w-full h-[115%] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>

            <div className="reveal">
              <div className="flex items-baseline justify-between gap-4 mt-5">
                <h3 className="display text-3xl md:text-4xl text-ink">
                  {title}
                  <span className="inline-block ml-2 text-xl text-ink/40 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </h3>
                <span className="text-sm text-ink/45 shrink-0 tabular-nums">{year}</span>
              </div>
              <p className="text-sm text-ink/50 mt-1">{role}</p>
              {highlights?.[0] && (
                <p className="text-ink/75 mt-3 max-w-md leading-relaxed">{highlights[0]}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {stack.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-ink/60 border border-ink/15 rounded-full px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      <a href="/proyectos" className="md:hidden inline-block mt-12 text-sm font-medium text-ink/60 hover:text-ink transition-colors">
        Ver todos ({portfolioData.length}) →
      </a>
    </section>
  )
}
