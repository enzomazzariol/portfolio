import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import StarBorder from '../StarBorder.jsx'

const services = [
  { n: '01', span: 'col-span-2 md:col-span-3 row-span-2', minH: 'min-h-[160px] md:min-h-[280px]', title: 'Servicios SEO', desc: 'Auditoría SEO, optimización on-page y estrategia de palabras clave para mejorar tu visibilidad en Google.', big: 'SEO' },
  { n: '02', span: 'col-span-2 md:col-span-3', minH: 'min-h-[140px]', title: 'Desarrollador WordPress', desc: 'Webs en WordPress a medida: maquetación, plugins y formularios.' },
  { n: '03', span: 'col-span-2 md:col-span-3', minH: 'min-h-[140px]', title: 'Desarrollo de landing pages', desc: 'Páginas de alta conversión para campañas, lanzamientos o servicios.' },
  { n: '04', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Web corporativa', desc: 'Web profesional para empresas y autónomos con diseño personalizado.' },
  { n: '05', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Tienda Online', desc: 'WooCommerce o Shopify con catálogo de productos y pasarela de pago.' },
  { n: '06', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Mantenimiento web', desc: 'Servicio mensual: actualizaciones, copias de seguridad y seguridad.' },
]

// eslint-disable-next-line react/prop-types
function ServiceCard({ n, span, minH, title, desc, big }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMove = useCallback((e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const el = cardRef.current
    const glow = glowRef.current
    if (!el || !glow) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glow.style.opacity = '1'
    glow.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 70%)`
  }, [])

  const handleLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  return (
    <Link
      ref={cardRef}
      to="/contacto"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`service-card group relative ${span} border-r border-b border-white/[0.07] p-8 ${n === '01' ? 'md:p-10' : ''} flex flex-col justify-between ${minH} transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset hover:border-white/[0.15]`}
    >
      {/* Radial glow that follows cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
      />
      <div className="relative z-[1] flex items-start justify-between">
        <span className="text-xs font-mono text-white/40 group-hover:text-white/70 tracking-widest uppercase transition-colors duration-300">{n}</span>
        <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">↗︎</span>
      </div>
      <div className="relative z-[1]">
        {big && (
          <p className="hidden md:block text-white/15 group-hover:text-white/[0.08] font-display text-[7rem] font-bold leading-none mb-4 select-none transition-colors duration-500">{big}</p>
        )}
        <h3 className={`font-display ${n === '01' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform duration-300`}>{title}</h3>
        <p className={`text-xs text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-300 ${n === '01' ? 'max-w-xs' : ''}`}>{desc}</p>
      </div>
    </Link>
  )
}

export default function ServicesGrid() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <div className="mb-10">
        <p className="section-label text-white/50 text-xs font-mono tracking-[0.2em] uppercase">Servicios</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 border-l border-t border-white/[0.07]">
        {services.map((s) => (
          <ServiceCard key={s.n} {...s} />
        ))}
      </div>

      {/* CTA button */}
      <div className="mt-10 flex justify-center">
        <StarBorder color="rgba(255,255,255,0.5)" speed="6s">
          <Link
            to="/contacto"
            className="flex items-center gap-3 px-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:text-white/90 transition-colors"
            style={{ height: '44px' }}
          >
            <span className="text-sm font-mono text-white whitespace-nowrap">
              Hablemos
            </span>
            <span className="text-sm text-white">
              →
            </span>
          </Link>
        </StarBorder>
      </div>
    </section>
  )
}
