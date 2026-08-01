const experience = [
  { period: '2024 — actualidad', role: 'Software Developer', place: 'Guarapo Media', url: 'https://guarapomedia.com/' },
  { period: '2025 — actualidad', role: 'Ingeniería Audiovisual Computacional', place: 'UPF' },
  { period: '2023 — 2025', role: 'DAM — Desarrollo de Aplicaciones Multiplataforma', place: null },
]

// eslint-disable-next-line react/prop-types
export default function ExperienceSection({ containerRef }) {
  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <p className="section-label text-white/50 text-xs font-mono tracking-[0.2em] uppercase mb-8">Experiencia</p>
      <div ref={containerRef} className="flex flex-col">
        {experience.map(({ period, role, place, url }) => (
          <div key={role} className="exp-item flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 py-5 border-b border-white/5">
            <span className="text-xs font-mono text-white/40 tracking-wide md:w-40 shrink-0">{period}</span>
            <p className="text-sm md:text-base text-white/80">
              {role}
              {place && (
                url ? (
                  <>
                    {' — '}
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                      {place} ↗︎
                    </a>
                  </>
                ) : (
                  <span className="text-white/55"> — {place}</span>
                )
              )}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <a
          href="/sobre-mi"
          className="text-sm font-mono text-white/60 hover:text-white/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Más sobre mí →
        </a>
      </div>
    </section>
  )
}
