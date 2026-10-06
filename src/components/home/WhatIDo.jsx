// Each area links to the project that proves it — claims without proof read as filler.
const areas = [
  {
    n: '01',
    title: 'Backend con Java',
    text: 'APIs REST con Spring Boot y MySQL: modelado de datos, endpoints y lógica de negocio. Ejemplo: el motor de recomendaciones de Moodflix.',
    proof: { label: 'Moodflix', href: 'https://github.com/enzomazzariol/moodflix' },
  },
  {
    n: '02',
    title: 'Frontend moderno',
    text: 'Interfaces rápidas con React y Astro, mobile-first, animaciones con GSAP y buenas puntuaciones en Core Web Vitals.',
    proof: { label: 'New Vision Sports', href: 'https://playwithnewvision.com/' },
  },
  {
    n: '03',
    title: 'Webs para negocios',
    text: 'Sitios y tiendas en producción con Shopify y WordPress para clientes de Guarapo Media: pagos, envíos, inscripciones y SEO.',
    proof: { label: 'Abode Pets', href: 'https://abodepets.com/' },
  },
]

export default function WhatIDo() {
  return (
    <section className="band">
      <div className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto">
        <p className="text-ink/50 text-xs font-medium tracking-[0.18em] uppercase mb-4">Qué hago</p>
        <h2 className="split-reveal display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-ink max-w-3xl mb-14">
          Del modelo de datos al último píxel.
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {areas.map(({ n, title, text, proof }) => (
            <article key={n} className="reveal bg-surface border border-ink/10 rounded-ui p-6 md:p-8 flex flex-col">
              <span className="text-xs font-mono text-ink/30">{n}</span>
              <h3 className="display text-3xl text-ink mt-6 mb-3">{title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed flex-1">{text}</p>
              <a
                href={proof.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ink/60 hover:text-ink mt-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                Ver: {proof.label} ↗︎
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
