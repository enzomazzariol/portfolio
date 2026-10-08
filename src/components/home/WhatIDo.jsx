// Each area links to the project that proves it — claims without proof read as filler.
const areas = [
  {
    n: '01',
    title: 'Desarrollo backend',
    text: 'Diseño e implementación de APIs REST con Java y Spring Boot sobre MySQL: modelado de datos, lógica de negocio e integración con servicios externos.',
    proof: { label: 'Moodflix', href: '/proyectos/moodflix' },
  },
  {
    n: '02',
    title: 'Desarrollo frontend',
    text: 'Interfaces con React y Astro, mobile-first y orientadas al rendimiento, con animación cuidada y atención a la accesibilidad y a las Core Web Vitals.',
    proof: { label: 'New Vision Sports', href: '/proyectos/new-vision-sports' },
  },
  {
    n: '03',
    title: 'Webs y e-commerce',
    text: 'Sitios corporativos y tiendas online en Shopify y WordPress para clientes de agencia: pasarelas de pago, envíos, inscripciones y SEO técnico.',
    proof: { label: 'Abode Pets', href: '/proyectos/abode-pets' },
  },
]

export default function WhatIDo() {
  return (
    <section className="band">
      <div className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto">
        <p className="text-ink/50 text-xs font-medium tracking-[0.18em] uppercase mb-4">Especialidades</p>
        <h2 className="split-reveal display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-ink max-w-3xl">
          Lo que aporto a un equipo.
        </h2>
        <p className="reveal text-lg text-ink/65 max-w-2xl leading-relaxed mt-6 mb-14">
          Trabajo en todo el ciclo de un producto web: el modelo de datos y la API, la interfaz
          y su puesta en producción para clientes reales.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {areas.map(({ n, title, text, proof }) => (
            <article key={n} className="reveal bg-surface border border-ink/10 rounded-ui p-6 md:p-8 flex flex-col">
              <span className="text-xs font-mono text-ink/30">{n}</span>
              <h3 className="display text-3xl text-ink mt-6 mb-3">{title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed flex-1">{text}</p>
              <a
                href={proof.href}
                className="text-xs font-mono text-ink/60 hover:text-ink mt-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                Caso: {proof.label} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
