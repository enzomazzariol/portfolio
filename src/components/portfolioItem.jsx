/* eslint-disable react/prop-types */

export default function PortfolioItem({ project, large }) {
  const { title, imgUrl, stack, link } = project

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* Image */}
      <div className={`overflow-hidden relative ${large ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
        <img
          src={imgUrl}
          alt={`Captura del proyecto ${title}`}
          width={800}
          height={large ? 600 : 534}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white text-xs font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/50 px-4 py-2">
            View project ↗
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-start justify-between gap-4">
        <p className="text-white/80 text-sm font-mono">{title}</p>
        <p className="text-white/30 text-xs font-mono text-right shrink-0">
          {stack.join(' | ')}
        </p>
      </div>
    </a>
  )
}
