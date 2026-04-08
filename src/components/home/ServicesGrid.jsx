import { Link } from 'react-router-dom'

const services = [
  { n: '01', span: 'col-span-2 md:col-span-3 row-span-2', minH: 'min-h-[160px] md:min-h-[280px]', title: 'Servicios SEO', desc: 'Auditoría SEO, optimización on-page y estrategia de palabras clave para mejorar tu visibilidad en Google.', big: 'SEO' },
  { n: '02', span: 'col-span-2 md:col-span-3', minH: 'min-h-[140px]', title: 'Desarrollador WordPress', desc: 'Webs en WordPress a medida: maquetación, plugins y formularios.' },
  { n: '03', span: 'col-span-2 md:col-span-3', minH: 'min-h-[140px]', title: 'Desarrollo de landing pages', desc: 'Páginas de alta conversión para campañas, lanzamientos o servicios.' },
  { n: '04', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Web corporativa', desc: 'Web profesional para empresas y autónomos con diseño personalizado.' },
  { n: '05', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Tienda Online', desc: 'WooCommerce o Shopify con catálogo de productos y pasarela de pago.' },
  { n: '06', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Mantenimiento web', desc: 'Servicio mensual: actualizaciones, copias de seguridad y seguridad.' },
]

export default function ServicesGrid() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <div className="mb-10">
        <p className="section-label text-white/50 text-xs font-mono tracking-[0.2em] uppercase">Servicios</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 border-l border-t border-white/[0.07]">
        {services.map(({ n, span, minH, title, desc, big }) => (
          <Link
            key={n}
            to="/contacto"
            className={`group ${span} border-r border-b border-white/[0.07] p-8 ${n === '01' ? 'md:p-10' : ''} flex flex-col justify-between ${minH} hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset`}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">{n}</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗︎</span>
            </div>
            <div>
              {big && (
                <p className="hidden md:block text-white/15 font-display text-[7rem] font-bold leading-none mb-4 select-none">{big}</p>
              )}
              <h3 className={`font-display ${n === '01' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold text-white mb-2 leading-tight`}>{title}</h3>
              <p className={`text-xs text-white/35 leading-relaxed ${n === '01' ? 'max-w-xs' : ''}`}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA button */}
      <div className="mt-10 flex justify-center">
        <Link
          to="/contacto"
          className="group relative flex items-center gap-3 border border-white/20 px-8 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{ height: '44px' }}
        >
          <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <span className="relative text-sm font-mono text-white group-hover:text-black transition-colors duration-300 group-hover:delay-100 whitespace-nowrap">
            Hablemos
          </span>
          <span className="relative text-sm text-white group-hover:text-black group-hover:translate-x-1 transition-all duration-300 group-hover:delay-100">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
