import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SiReact, SiGooglesearchconsole, SiOpenjdk, SiTailwindcss } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const images = [
  '/assets/nvs/nvs-1.webp',
  '/assets/atelier/atelier-1.webp',
  '/assets/me.jpeg',
  '/assets/moodflix/moodflix-1.webp',
  '/assets/nvs/nvs-3.webp',
  '/assets/me-2.jpeg',
  '/assets/abode/abode-1.webp',
  '/assets/atelier/atelier-2.webp',
  '/assets/bsa/bsa-1.webp',
]

const timelineEntries = [
  { year: '2023 - 2025',         label: 'DAM — Desarrollo de Aplicaciones Multiplataforma' },
  { year: '2025',         label: 'Prácticas en Regalexia.com' },
  { year: '2024 - actualidad',         label: 'Software Developer en Guarapo Media' },
  { year: '2025 - actualidad', label: 'Ingeniería Audiovisual en UPF' },
]

const services = [
  { label: 'Desarrollo Web',  Icon: SiReact,       color: '#61DAFB', side: 'right' },
  { label: 'Auditoría SEO',    Icon: SiGooglesearchconsole, color: '#4285F4', side: 'left' },
  { label: 'Backend & APIs',  Icon: SiOpenjdk,     color: '#f89820', side: 'right' },
  { label: 'UI + Frontend',   Icon: SiTailwindcss, color: '#06B6D4', side: 'left' },
]

export default function AboutPage() {
  const pageRef = useRef(null)
  const circleRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 1. Hero title entrance
    gsap.fromTo(
      '.about-hero-anim',
      { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12 }
    )

    // 2. Marquee → now handled by CSS (.marquee-track) — no GSAP needed

    // 3. SVG circle draw-in (one-shot, not infinite)
    if (circleRef.current) {
      gsap.fromTo(circleRef.current,
        { strokeDashoffset: 754 },
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', delay: 0.3 }
      )
    }
    // Orbital dots → now handled by CSS (.orbit-dot) — no GSAP needed

    // 4. Bio paragraphs
    gsap.fromTo('.bio-para',
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: '.bio-section', start: 'top 75%', toggleActions: 'play none none none' } }
    )

    // 5. Stats
    gsap.fromTo('.stat-item',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: '.stats-row', start: 'top 80%', toggleActions: 'play none none none' } }
    )

    // 6. Timeline entries
    gsap.fromTo('.timeline-entry',
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: '.timeline-section', start: 'top 78%', toggleActions: 'play none none none' } }
    )

    // 7. Service rows
    gsap.utils.toArray('.service-text').forEach((el, i) => {
      const fromLeft = i % 2 === 0
      gsap.fromTo(el,
        { autoAlpha: 0, x: fromLeft ? -60 : 60 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' } }
      )
    })
    gsap.utils.toArray('.service-pill').forEach((el, i) => {
      const fromLeft = i % 2 !== 0
      gsap.fromTo(el,
        { autoAlpha: 0, x: fromLeft ? -60 : 60 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' } }
      )
    })

    // 7. CTA
    gsap.fromTo('.cta-section',
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.cta-section', start: 'top 85%', toggleActions: 'play none none none' } }
    )
  }, { scope: pageRef })

  const allImages = [...images, ...images] // duplicate for loop

  return (
    <div ref={pageRef} className="min-h-screen pt-14">

      {/* ── HERO ── */}
      <section className="px-6 md:px-10 pt-16 pb-8 max-w-6xl mx-auto">
        <h1 className="about-hero-anim font-display text-[clamp(4rem,14vw,12rem)] font-bold leading-[0.85] tracking-tighter text-white">
          Sobre mí
        </h1>
        <p className="about-hero-anim text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mt-4">
          Full Stack Developer · Barcelona · 2026
        </p>
      </section>

      {/* ── PHOTO STRIP (marquee) ── */}
      <section className="relative overflow-hidden my-8">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

        <div className="marquee-track flex gap-3 w-max">
          {allImages.map((src, i) => (
            <div key={i} className="h-[200px] w-[300px] flex-shrink-0 overflow-hidden">
              <img
                src={src}
                alt=""
                aria-hidden="true"
                width={300}
                height={200}
                className="w-full h-full object-cover grayscale opacity-60 hover:opacity-80 hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── TAGLINE ── */}
      <section className="px-6 md:px-10 py-12 max-w-6xl mx-auto border-b border-white/5">
        <p className="font-display text-[clamp(1.4rem,3.5vw,2.8rem)] font-bold leading-tight text-white max-w-4xl">
          Construyo experiencias web rápidas,<br className="hidden md:block" /> limpias y bien pensadas.
        </p>
      </section>

      {/* ── STATS ROW ── */}
      <section className="stats-row px-6 md:px-10 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Experiencia', value: '3 años programando' },
          { label: 'Ubicación', value: 'Barcelona, España' },
          { label: 'Freelance', value: null },
        ].map(({ label, value }) => (
          <div key={label} className="stat-item">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25">{label}</p>
              <div className="flex-1 border-t border-white/[0.08]" />
            </div>
            {value ? (
              <p className="text-sm font-mono text-white/70">{value}</p>
            ) : (
              <p className="text-sm font-mono text-white/70 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Disponible
              </p>
            )}
          </div>
        ))}
      </section>

      {/* ── BIO + SVG ── */}
      <section className="bio-section px-6 md:px-10 py-16 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row gap-16 items-start">

          {/* SVG orbital */}
          <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
            <svg width="260" height="260" viewBox="0 0 300 300" fill="none" aria-hidden="true">
              <circle cx="150" cy="150" r="120" ref={circleRef}
                stroke="rgba(255,255,255,0.12)" strokeWidth="1"
                strokeDasharray="754" strokeDashoffset="754" />
              <circle cx="150" cy="150" r="70"
                stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <circle cx="150" cy="150" r="30"
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <circle cx="150" cy="150" r="3" fill="rgba(255,255,255,0.5)" />
              {/* Orbiting dots — CSS animated, runs on compositor thread */}
              <circle className="orbit-dot" cx="270" cy="150" r="5" fill="rgba(255,255,255,0.7)"
                style={{ transformBox: 'view-box', transformOrigin: '50% 50%', animation: 'spinCW 8s linear infinite' }} />
              <circle className="orbit-dot" cx="90" cy="254" r="3.5" fill="rgba(255,255,255,0.35)"
                style={{ transformBox: 'view-box', transformOrigin: '50% 50%', animation: 'spinCW 14s linear infinite' }} />
              <circle className="orbit-dot" cx="220" cy="150" r="4" fill="rgba(255,255,255,0.5)"
                style={{ transformBox: 'view-box', transformOrigin: '50% 50%', animation: 'spinCCW 6s linear infinite' }} />
            </svg>
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-6 max-w-lg">
            <p className="bio-para text-sm font-mono text-white/50 leading-relaxed">
              Empecé a programar en 2023 y desde entonces no he parado.
              Me formé en Desarrollo de Aplicaciones Multiplataforma y ahora
              estudio Ingeniería Audiovisual Computacional en la UPF.
            </p>
            <p className="bio-para text-sm font-mono text-white/50 leading-relaxed">
              Trabajo como becario en Guarapo Media, donde colaboro en
              proyectos como New Vision Sports y Hola Atelier. También hice
              prácticas en Regalexia.com mejorando SEO y frontend.
            </p>
            <p className="bio-para text-sm font-mono text-white/50 leading-relaxed">
              Me interesa el cruce entre el código y el diseño: construir
              interfaces que funcionen bien y se vean todavía mejor.
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="timeline-section px-6 md:px-10 py-16 max-w-6xl mx-auto border-t border-white/5">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-10">Trayectoria</p>
        <div className="flex flex-col">
          {timelineEntries.map(({ year, label }) => (
            <div
              key={year + label}
              className="timeline-entry flex items-start gap-8 py-5 border-b border-white/5"
            >
              <span className="text-[10px] font-mono tracking-[0.15em] text-white/25 w-28 shrink-0 pt-0.5">
                {year}
              </span>
              <p className="text-sm font-mono text-white/60 leading-relaxed">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES (editorial style) ── */}
      <section className="px-6 md:px-10 py-16 max-w-6xl mx-auto border-t border-white/5">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-10">Servicios</p>

        <div className="flex flex-col">
          {services.map(({ label, Icon, color, side }) => (
            <div
              key={label}
              className={`flex items-center gap-6 py-5 border-b border-white/5 ${
                side === 'left' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <p className="service-text font-display text-[clamp(2rem,5.5vw,4.5rem)] font-bold text-white leading-none flex-1">
                {label}
              </p>
              <div className="service-pill flex-shrink-0 border border-white/10 rounded-[1.5rem] px-6 py-4 flex items-center gap-3 bg-white/[0.03]">
                <Icon size={28} style={{ color }} />
                <span className="text-xs font-mono text-white/40">{label.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section px-6 md:px-10 py-24 max-w-6xl mx-auto text-center">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-6">Trabajo juntos</p>
        <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-bold text-white mb-10 leading-tight">
          ¿Tienes un proyecto<br className="hidden md:block" /> en mente?
        </h2>
        <Link
          to="/contacto"
          className="inline-flex items-center bg-white text-black font-mono text-sm px-8 py-3 min-h-[44px] hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
        >
          Hablemos →
        </Link>
      </section>

    </div>
  )
}
