import { portfolioData } from '../../public/data/portfolio.js'
import PortfolioItem from '../components/portfolioItem.jsx'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-6xl mx-auto">
      {/* Page title */}
      <div className="mb-16">
        <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">
          Selected work
        </p>
        <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter text-white">
          Projects
        </h1>
      </div>

      {/* Masonry-style grid */}
      <div className="columns-1 md:columns-2 gap-6 space-y-6">
        {portfolioData.map((project, i) => (
          <div key={project.slug} className="break-inside-avoid">
            <PortfolioItem project={project} large={i === 0 || i === 3} />
          </div>
        ))}
      </div>
    </main>
  )
}
