import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  SiReact, SiNodedotjs, SiOpenjdk, SiSpringboot,
  SiTailwindcss, SiMysql, SiWordpress, SiExpo, SiGit,
} from 'react-icons/si'
import { portfolioData } from '../../public/data/portfolio.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const stackItems = [
  { name: 'React',       Icon: SiReact,       color: '#61DAFB' },
  { name: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
  { name: 'Java',        Icon: SiOpenjdk,     color: '#f89820' },
  { name: 'Spring Boot', Icon: SiSpringboot,  color: '#6DB33F' },
  { name: 'Tailwind',    Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'MySQL',       Icon: SiMysql,       color: '#4479A1' },
  { name: 'WordPress',   Icon: SiWordpress,   color: '#21759B' },
  { name: 'Expo',        Icon: SiExpo,        color: '#888' },
  { name: 'Git',         Icon: SiGit,         color: '#F05032' },
]

const processSteps = [
  { n: '01', title: 'Entendemos el problema', desc: 'Antes de escribir código, entiendo bien los objetivos, la audiencia y los requisitos del proyecto.' },
  { n: '02', title: 'Diseño y desarrollo', desc: 'Código limpio, componentes reutilizables, actualizaciones frecuentes y buenas prácticas.' },
  { n: '03', title: 'Entrega y soporte', desc: 'Deploy, revisión final y ajustes. Disponible después de entregar para resolver dudas y aplicar mejoras.' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const stackRef = useRef(null)
  const worksRef = useRef(null)
  const stepsRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hero entrance
    gsap.fromTo(
      '.hero-anim',
      { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      }
    )

    // Stack section
    gsap.fromTo(
      '.stack-icon',
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: stackRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Selected Works
    gsap.fromTo(
      '.work-item',
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        scrollTrigger: {
          trigger: worksRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Process steps
    gsap.fromTo(
      '.step-item',
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: heroRef })

  return (
    <div ref={heroRef}>
      {/* ── Hero ── */}
      <main className="min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 pb-12 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col justify-center">
          <p className="hero-anim text-white/40 text-xs font-mono tracking-widest uppercase mb-6">
            Full Stack Developer · Barcelona
          </p>
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-medium leading-[0.9] tracking-tighter text-white mb-8">
            <span className="hero-anim block">Enzo</span>
            <span className="hero-anim block">Mazzariol</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-4">
            <p className="hero-anim text-white/50 text-sm md:text-base max-w-sm leading-relaxed">
              Desarrollo web y móvil con React, Node.js y Java.<br />
              Estudiante de Ingeniería Audiovisual en UPF.
            </p>
            <div className="hero-anim flex gap-4 text-sm font-mono">
              <Link
                to="/proyectos"
                className="border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all px-5 py-2.5 min-h-[44px] flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Ver proyectos →
              </Link>
              <Link
                to="/contacto"
                className="bg-white text-black hover:bg-white/90 transition-all px-5 py-2.5 min-h-[44px] flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              >
                Hablemos
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom status row */}
        <div className="flex items-center justify-between mt-16 border-t border-white/5 pt-6">
          <div className="flex gap-6 text-white/30 text-xs font-mono">
            <a href="https://github.com/enzomazzariol" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/enzo-mazzariol/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">LinkedIn ↗</a>
            <a href="mailto:mazzariolenzo@gmail.com" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">Email ↗</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/30 font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            Disponible para proyectos
          </div>
        </div>
      </main>

      {/* ── Stack ── */}
      <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
        <p className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">Stack</p>
        <div ref={stackRef} className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
          {stackItems.map(({ name, Icon, color }) => (
            <div
              key={name}
              className="stack-icon flex flex-col items-center gap-2.5 p-4 border border-white/5 hover:border-white/15 transition-colors duration-200 cursor-default group"
            >
              <Icon size={26} style={{ color }} className="transition-transform duration-200 group-hover:scale-110" />
              <span className="text-[9px] font-mono text-white/25 group-hover:text-white/50 transition-colors text-center leading-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected Works ── */}
      <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
        <p className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">Selected Works</p>
        <div ref={worksRef}>
          {portfolioData.slice(0, 3).map(({ title, stack, link }, i) => (
            <a
              key={title}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-item group flex items-center gap-6 border-b border-white/5 py-6 hover:bg-white/[0.02] transition-colors duration-200 -mx-4 px-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span className="text-4xl font-bold text-white/10 font-mono w-14 shrink-0 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-[clamp(1.5rem,4vw,3rem)] font-bold text-white flex-1 leading-tight">
                {title}
              </span>
              <div className="hidden md:flex flex-wrap gap-1.5 justify-end max-w-[280px]">
                {stack.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-white/30 border border-white/10 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-white/30 group-hover:text-white transition-colors duration-200 text-xl font-mono shrink-0 ml-2">
                ↗
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <Link
            to="/proyectos"
            className="text-sm font-mono text-white/40 hover:text-white/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Ver todos →
          </Link>
        </div>
      </section>

      {/* ── Servicios ── */}
      <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-end justify-between mb-10">
          <p className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">Servicios</p>
          <Link to="/contacto" className="text-[10px] font-mono text-white/30 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            Hablemos →
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-white/[0.06]">

          {/* SEO — featured, 3 cols, tall */}
          <Link to="/contacto" className="group col-span-2 md:col-span-3 row-span-2 bg-[#080808] p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">01</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
            </div>
            <div>
              <p className="text-white/15 font-display text-[7rem] font-bold leading-none mb-4 select-none">SEO</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">SEO services</h3>
              <p className="text-xs text-white/35 leading-relaxed max-w-xs">Auditoría SEO, optimización on-page y estrategia de palabras clave para mejorar tu visibilidad en Google.</p>
            </div>
          </Link>

          {/* WordPress — 3 cols */}
          <Link to="/contacto" className="group col-span-2 md:col-span-3 bg-[#080808] p-8 flex flex-col justify-between min-h-[140px] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">02</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">WordPress developer</h3>
              <p className="text-xs text-white/35 leading-relaxed">Webs en WordPress a medida: maquetación, plugins y formularios.</p>
            </div>
          </Link>

          {/* Landing page — 3 cols */}
          <Link to="/contacto" className="group col-span-2 md:col-span-3 bg-[#080808] p-8 flex flex-col justify-between min-h-[140px] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">03</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Landing page design</h3>
              <p className="text-xs text-white/35 leading-relaxed">Páginas de alta conversión para campañas, lanzamientos o servicios.</p>
            </div>
          </Link>

          {/* Web corporativa — 2 cols */}
          <Link to="/contacto" className="group col-span-2 bg-[#080808] p-8 flex flex-col justify-between min-h-[160px] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">04</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Web corporativa</h3>
              <p className="text-xs text-white/35 leading-relaxed">Web profesional para empresas y autónomos con diseño personalizado.</p>
            </div>
          </Link>

          {/* Tienda Online — 2 cols */}
          <Link to="/contacto" className="group col-span-2 bg-[#080808] p-8 flex flex-col justify-between min-h-[160px] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">05</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Tienda Online</h3>
              <p className="text-xs text-white/35 leading-relaxed">WooCommerce o Shopify con catálogo de productos y pasarela de pago.</p>
            </div>
          </Link>

          {/* Mantenimiento — 2 cols */}
          <Link to="/contacto" className="group col-span-2 bg-[#080808] p-8 flex flex-col justify-between min-h-[160px] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">06</span>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Mantenimiento web</h3>
              <p className="text-xs text-white/35 leading-relaxed">Servicio mensual: actualizaciones, copias de seguridad y seguridad.</p>
            </div>
          </Link>

        </div>
      </section>

      {/* ── Process ── */}
      <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
        <p className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">Process</p>
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {processSteps.map(({ n, title, desc }) => (
            <div key={n} className="step-item bg-[#080808] p-8 flex flex-col gap-4">
              <span className="text-5xl font-bold text-white/10 leading-none">{n}</span>
              <h3 className="text-sm font-semibold text-white/80">{title}</h3>
              <p className="text-sm text-white/35 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
