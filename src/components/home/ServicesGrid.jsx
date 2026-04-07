import { Link } from 'react-router-dom'

const services = [
  { n: '01', span: 'col-span-2 md:col-span-3 row-span-2', minH: 'min-h-[280px]', title: 'SEO services', desc: 'Auditoría SEO, optimización on-page y estrategia de palabras clave para mejorar tu visibilidad en Google.', big: 'SEO' },
  { n: '02', span: 'col-span-2 md:col-span-3', minH: 'min-h-[140px]', title: 'WordPress developer', desc: 'Webs en WordPress a medida: maquetación, plugins y formularios.' },
  { n: '03', span: 'col-span-2 md:col-span-3', minH: 'min-h-[140px]', title: 'Landing page design', desc: 'Páginas de alta conversión para campañas, lanzamientos o servicios.' },
  { n: '04', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Web corporativa', desc: 'Web profesional para empresas y autónomos con diseño personalizado.' },
  { n: '05', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Tienda Online', desc: 'WooCommerce o Shopify con catálogo de productos y pasarela de pago.' },
  { n: '06', span: 'col-span-2', minH: 'min-h-[160px]', title: 'Mantenimiento web', desc: 'Servicio mensual: actualizaciones, copias de seguridad y seguridad.' },
]

export default function ServicesGrid() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <div className="flex items-end justify-between mb-10">
        <p className="section-label text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">Servicios</p>
        <Link to="/contacto" className="text-[10px] font-mono text-white/30 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
          Hablemos →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 border-l border-t border-white/[0.07]">
        {services.map(({ n, span, minH, title, desc, big }) => (
          <Link
            key={n}
            to="/contacto"
            className={`group ${span} border-r border-b border-white/[0.07] p-8 ${n === '01' ? 'md:p-10' : ''} flex flex-col justify-between ${minH} hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">{n}</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
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
    </section>
  )
}
