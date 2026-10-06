const experience = [
  {
    period: '2024 — hoy',
    role: 'Software Developer',
    place: 'Guarapo Media',
    url: 'https://guarapomedia.com/',
    text: 'Desarrollador único en los proyectos de clientes de la agencia: webs en Astro y React, tiendas Shopify y sitios WordPress, desde la maqueta hasta producción.',
    tags: ['Astro', 'React', 'Shopify', 'WordPress'],
  },
  {
    period: '2025 — hoy',
    role: 'Ingeniería Audiovisual Computacional',
    place: 'Universitat Pompeu Fabra',
    text: 'Grado universitario que compagino con el trabajo en Guarapo Media.',
  },
  {
    period: '2023 — 2025',
    role: 'Desarrollo de Aplicaciones Multiplataforma',
    place: 'Ciclo Formativo de Grado Superior (DAM)',
    text: 'Proyecto final: Moodflix, app móvil en React Native con backend REST propio en Java + Spring Boot y MySQL.',
    tags: ['Java', 'Spring Boot', 'React Native'],
  },
]

export default function ExperienceSection() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto grid md:grid-cols-12 gap-12">

      {/* Left: sticky intro */}
      <div className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <p className="reveal text-xs font-medium tracking-[0.18em] uppercase text-ink/50 mb-4">Experiencia</p>
          <h2 className="split-reveal display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95] text-ink">
            Trabajo y estudio, en paralelo.
          </h2>
          <a href="/sobre-mi" className="reveal inline-block mt-8 text-sm font-medium text-ink/60 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            Más sobre mí →
          </a>
        </div>
      </div>

      {/* Right: timeline */}
      <ol className="timeline relative md:col-span-8 md:col-start-6">
        <span className="timeline-line absolute left-[5px] top-2 bottom-2 w-px bg-ink/20 origin-top" aria-hidden="true" />
        {experience.map(({ period, role, place, url, text, tags }) => (
          <li key={role} className="relative pl-10 pb-16 last:pb-0">
            <span className="timeline-dot absolute left-0 top-2 w-[11px] h-[11px] rounded-full bg-canvas border-2 border-ink" aria-hidden="true" />
            <div className="reveal">
              <p className="text-sm text-ink/50 tabular-nums">{period}</p>
              <h3 className="display text-3xl md:text-4xl text-ink mt-2">{role}</h3>
              <p className="text-ink/60 mt-1">
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink transition-colors">
                    {place} ↗︎
                  </a>
                ) : place}
              </p>
              <p className="text-ink/75 mt-4 max-w-xl leading-relaxed">{text}</p>
              {tags && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tags.map((t) => (
                    <span key={t} className="text-xs font-medium text-ink/60 border border-ink/15 rounded-full px-2.5 py-1">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
