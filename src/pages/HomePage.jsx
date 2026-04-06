import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Prism from '../components/Prism.jsx'
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

// Pre-split hero name into chars for CSS animation (no forced DOM reflow)
const heroWords = [
  { word: 'Enzo',      startDelay: 0,    perCharDelay: 0.05 },
  { word: 'Mazzariol', startDelay: 0.22, perCharDelay: 0.04 },
]

export default function HomePage() {
  const heroRef   = useRef(null)
  const stackRef  = useRef(null)
  const worksRef  = useRef(null)
  const stepsRef  = useRef(null)
  const [prismReady, setPrismReady] = useState(false)

  // Defer Prism init until after first paint so it doesn't block content render
  useEffect(() => {
    const raf = requestAnimationFrame(() => setPrismReady(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Scroll-triggered animations only — hero entrance handled entirely by CSS
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Section labels — simple fade in on scroll (no SplitText)
    heroRef.current.querySelectorAll('.section-label').forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: -20,
        duration: 0.45,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    })

    // Stack icons
    gsap.fromTo('.stack-icon',
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1, y: 0, stagger: 0.05,
        scrollTrigger: { trigger: stackRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      }
    )

    // Selected Works
    gsap.fromTo('.work-item',
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1, y: 0, stagger: 0.08,
        scrollTrigger: { trigger: worksRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      }
    )

    // Process steps
    gsap.fromTo('.step-item',
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: stepsRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      }
    )
  }, { scope: heroRef })

  return (
    <div ref={heroRef}>

      {/* ── Prism background — deferred so it doesn't block first paint ── */}
      {prismReady && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <Prism
            animationType="rotate"
            timeScale={0.4}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={0.6}
            bloom={0.7}
            transparent={true}
          />
          {/* Dark overlay so content stays readable */}
          <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.72)' }} />
        </div>
      )}

      {/* Content above the prism */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── Hero ── */}
        <main className="min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 pb-12 max-w-6xl mx-auto">
          <div className="flex-1 flex flex-col justify-center">

            {/* Subtitle — CSS fade-down, no SplitText */}
            <p
              className="hero-fade-down text-white/55 text-xs font-mono tracking-widest uppercase mb-6"
              style={{ animationDelay: '0.55s' }}
            >
              Full Stack Developer · Barcelona
            </p>

            {/* Hero name — pre-split in JSX, CSS char animation (zero DOM reflow) */}
            <h1
              className="font-display text-[clamp(5rem,14vw,8rem)] font-medium leading-[0.9] tracking-tighter text-white mb-8"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.9)' }}
            >
              {heroWords.map(({ word, startDelay, perCharDelay }) => (
                <span key={word} className="block">
                  {Array.from(word).map((char, i) => (
                    <span
                      key={i}
                      className="hero-char"
                      style={{ animationDelay: `${startDelay + i * perCharDelay}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-4">
              <p
                className="hero-desc hero-fade-up text-white/50 text-sm md:text-base max-w-sm leading-relaxed"
                style={{ animationDelay: '0.75s' }}
              >
                Desarrollo web y móvil con React, Node.js y Java.<br />
                Estudiante de Ingeniería Audiovisual en UPF.
              </p>
              <div
                className="hero-btns hero-fade-up flex gap-4 text-sm font-mono"
                style={{ animationDelay: '0.87s' }}
              >
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
          <div
            className="hero-status hero-fade-up flex items-center justify-between mt-16 border-t border-white/5 pt-6"
            style={{ animationDelay: '0.99s' }}
          >
            <div className="flex gap-6 text-white/40 text-xs font-mono">
              <a href="https://github.com/enzomazzariol" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/enzo-mazzariol/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">LinkedIn ↗</a>
              <a href="mailto:mazzariolenzo@gmail.com" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">Email ↗</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/45 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Disponible para proyectos
            </div>
          </div>
        </main>

        {/* ── Selected Works ── */}
        <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
          <p className="section-label text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">Selected Works</p>
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
            <p className="section-label text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">Servicios</p>
            <Link to="/contacto" className="text-[10px] font-mono text-white/30 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              Hablemos →
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 border-l border-t border-white/[0.07]">

            {/* SEO — featured, 3 cols, tall */}
            <Link to="/contacto" className="group col-span-2 md:col-span-3 row-span-2 border-r border-b border-white/[0.07] p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">01</span>
                <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
              </div>
              <div>
                <p className="hidden md:block text-white/15 font-display text-[7rem] font-bold leading-none mb-4 select-none">SEO</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">SEO services</h3>
                <p className="text-xs text-white/35 leading-relaxed max-w-xs">Auditoría SEO, optimización on-page y estrategia de palabras clave para mejorar tu visibilidad en Google.</p>
              </div>
            </Link>

            {/* WordPress — 3 cols */}
            <Link to="/contacto" className="group col-span-2 md:col-span-3 border-r border-b border-white/[0.07] p-8 flex flex-col justify-between min-h-[140px] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
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
            <Link to="/contacto" className="group col-span-2 md:col-span-3 border-r border-b border-white/[0.07] p-8 flex flex-col justify-between min-h-[140px] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
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
            <Link to="/contacto" className="group col-span-2 border-r border-b border-white/[0.07] p-8 flex flex-col justify-between min-h-[160px] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
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
            <Link to="/contacto" className="group col-span-2 border-r border-b border-white/[0.07] p-8 flex flex-col justify-between min-h-[160px] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
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
            <Link to="/contacto" className="group col-span-2 border-r border-b border-white/[0.07] p-8 flex flex-col justify-between min-h-[160px] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset">
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
          <p className="section-label text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">Process</p>
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-white/[0.07]">
            {processSteps.map(({ n, title, desc }) => (
              <div key={n} className="step-item border-r border-b border-white/[0.07] p-8 flex flex-col gap-4">
                <span className="text-5xl font-bold text-white/10 leading-none">{n}</span>
                <h3 className="text-sm font-semibold text-white/80">{title}</h3>
                <p className="text-sm text-white/35 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stack ── */}
        <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
          <p className="section-label text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">Stack</p>
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

      </div>{/* end content wrapper */}
    </div>
  )
}
