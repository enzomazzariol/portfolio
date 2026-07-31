const processSteps = [
  { n: '01', title: 'Entendemos el problema', desc: 'Antes de escribir código, entiendo bien los objetivos, la audiencia y los requisitos del proyecto.' },
  { n: '02', title: 'Diseño y desarrollo', desc: 'Código limpio, componentes reutilizables, actualizaciones frecuentes y buenas prácticas.' },
  { n: '03', title: 'Entrega y soporte', desc: 'Deploy, revisión final y ajustes. Disponible después de entregar para resolver dudas y aplicar mejoras.' },
]

// eslint-disable-next-line react/prop-types
export default function ProcessSteps({ containerRef }) {
  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <p className="section-label text-white/50 text-xs font-mono tracking-[0.2em] uppercase mb-8">Process</p>
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-white/[0.07]">
        {processSteps.map(({ n, title, desc }) => (
          <div key={n} className="step-item border-r border-b border-white/[0.07] p-8 flex flex-col gap-4">
            <span className="text-5xl font-bold text-white/10 leading-none">{n}</span>
            <h3 className="text-sm font-semibold text-white/80">{title}</h3>
            <p className="text-sm text-white/35 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
