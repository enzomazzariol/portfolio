import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import SelectedWorks from './home/SelectedWorks.jsx'
import ExperienceSection from './home/ExperienceSection.jsx'
import StackSection from './home/StackSection.jsx'
import WhatIDo from './home/WhatIDo.jsx'
import { portfolioData } from '../data/portfolio.js'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Pre-split hero name into chars for CSS animation (no forced DOM reflow)
const heroWords = [
  { word: 'Enzo',      startDelay: 0,    perCharDelay: 0.05 },
  { word: 'Mazzariol', startDelay: 0.22, perCharDelay: 0.04 },
]

// Desktop: screenshots live in the side gutters of the hero block (the name spans ~26–74%),
// so they never cover the copy or the stats row. `depth` = parallax distance (px) on scroll.
const tiles = [
  { src: '/assets/nvs/nvs-1.webp',           pos: 'left-[2%] top-[2%] w-[16vw]',    rot: -6, depth: -140 },
  { src: '/assets/bsa/bsa-2.webp',           pos: 'left-[7%] top-[50%] w-[10vw]',   rot: 7,  depth: -60 },
  { src: '/assets/atelier/atelier-1.webp',   pos: 'left-[16%] top-[80%] w-[8vw]',   rot: -3, depth: -220 },
  { src: '/assets/abode/abode-1.webp',       pos: 'right-[2%] top-[0%] w-[16vw]',   rot: 5,  depth: -180 },
  { src: '/assets/moodflix/moodflix-1.webp', pos: 'right-[6%] top-[48%] w-[11vw]',  rot: -4, depth: -80 },
  { src: '/assets/nvs/nvs-3.webp',           pos: 'right-[16%] top-[82%] w-[8vw]',  rot: 4,  depth: -260 },
]
const mobileTiles = [tiles[0], tiles[4], tiles[3]]

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40'
const onScroll = (trigger, start = 'top 85%') => ({ trigger, start, toggleActions: 'play none none none' })

export default function Home() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.defaults({ ease: 'power3.out', duration: 0.9 })

    // Hero: tiles drop in, then drift up at different speeds as the hero scrolls away
    gsap.from('.hero-tile-img', { autoAlpha: 0, y: 60, scale: 0.92, stagger: 0.08, delay: 0.5, duration: 1.1 })
    gsap.utils.toArray('.hero-tile').forEach((el) => {
      gsap.to(el, { y: Number(el.dataset.depth), ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } })
    })

    // Headings: masked line-by-line rise
    gsap.utils.toArray('.split-reveal').forEach((el) => {
      SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 105, stagger: 0.08, duration: 1, scrollTrigger: onScroll(el) }),
      })
    })

    // Generic fade-up, staggered per parent group
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.from(el, { autoAlpha: 0, y: 40, scrollTrigger: onScroll(el, 'top 90%') })
    })

    // Works: image wipes up into its frame, then parallaxes inside it
    gsap.utils.toArray('.work-media').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', scrollTrigger: onScroll(el) })
      gsap.fromTo(el.querySelector('img'), { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })

    // Experience: timeline draws itself as you scroll through it
    gsap.fromTo('.timeline-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } })
    gsap.utils.toArray('.timeline-dot').forEach((el) => {
      gsap.from(el, { scale: 0, duration: 0.5, ease: 'back.out(3)', scrollTrigger: onScroll(el, 'top 65%') })
    })

    // Stack: rows slide in opposite directions, driven by scroll
    gsap.utils.toArray('.stack-row').forEach((el, i) => {
      gsap.fromTo(el, { xPercent: i % 2 ? -18 : 0 }, { xPercent: i % 2 ? 0 : -18, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
  }, { scope: rootRef })

  return (
    <div ref={rootRef}>

      {/* ── Hero ── */}
      <main ref={heroRef} className="relative min-h-[100svh] flex flex-col px-6 md:px-10 pt-24 pb-8">

        <div className="relative flex-1 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 hidden md:block" aria-hidden="true">
            {tiles.map(({ src, pos, rot, depth }) => (
              <div key={src} className={`hero-tile absolute ${pos}`} data-depth={depth}>
                <img src={src} alt="" className="hero-tile-img w-full rounded-tile" style={{ rotate: `${rot}deg` }} decoding="async" />
              </div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <p className="hero-fade-down text-ink/60 text-xs font-mono font-medium tracking-[0.18em] uppercase mb-6" style={{ animationDelay: '0.55s' }}>
              Desarrollador Full Stack · Barcelona
            </p>

            <h1 className="display text-ink leading-[0.85] text-[clamp(4.5rem,10.5vw,9.5rem)]" aria-label="Enzo Mazzariol, desarrollador full stack en Barcelona">
              {heroWords.map(({ word, startDelay, perCharDelay }) => (
                <span key={word} className="block" aria-hidden="true">
                  {Array.from(word).map((char, i) => {
                    const delay = `${startDelay + i * perCharDelay}s`
                    return (
                      // hero-char-wrap: overflow:hidden clips the ::after curtain as it slides up
                      <span key={i} className="hero-char-wrap" style={{ '--delay': delay }}>
                        <span className="hero-char" style={{ animationDelay: delay }}>{char}</span>
                      </span>
                    )
                  })}
                </span>
              ))}
            </h1>

            <p className="hero-fade-up text-ink/65 text-base md:text-lg max-w-md leading-relaxed mt-8" style={{ animationDelay: '0.75s' }}>
              Construyo webs en producción para clientes reales y backends en
              <span className="text-ink"> Java + Spring Boot</span>. Frontend con
              <span className="text-ink"> React y Astro</span>.
            </p>

            <div className="hero-fade-up flex flex-wrap justify-center gap-3 mt-8 text-sm font-medium" style={{ animationDelay: '0.87s' }}>
              <a href="/proyectos" className={`bg-ink text-canvas rounded-ui px-6 py-3.5 min-h-[44px] flex items-center hover:bg-ink/85 transition-colors ${focusRing}`}>
                Ver proyectos →
              </a>
              <a
                href="/assets/EnzoMazzariol-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-surface text-ink border border-ink/15 hover:border-ink/40 rounded-ui px-6 py-3.5 min-h-[44px] flex items-center transition-colors ${focusRing}`}
              >
                Descargar CV ↓
              </a>
            </div>

            {/* Mobile: no room in the gutters, so the screenshots fan out under the CTAs */}
            <div className="md:hidden flex justify-center mt-12" aria-hidden="true">
              {mobileTiles.map(({ src, rot }, i) => (
                <img key={src} src={src} alt="" className="hero-tile-img w-32 aspect-[4/3] object-cover rounded-tile -mx-3 border-4 border-canvas" style={{ rotate: `${rot * 1.5}deg`, zIndex: i === 1 ? 1 : 0 }} decoding="async" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: proof + status */}
        <div className="hero-fade-up relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-12 pt-6 border-t border-ink/10" style={{ animationDelay: '0.99s' }}>
          <dl className="flex gap-8">
            {[
              ['2+', 'años como dev'],
              [String(portfolioData.length), 'proyectos publicados'],
              ['3', 'stacks: web, móvil, Java'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="display text-3xl md:text-4xl text-ink">{value}</dd>
                <dd className="text-xs text-ink/55 mt-1">{label}</dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center gap-6 text-sm text-ink/60">
            <a href="https://github.com/enzomazzariol" target="_blank" rel="noopener noreferrer" className={`hover:text-ink transition-colors ${focusRing}`}>GitHub ↗︎</a>
            <a href="https://www.linkedin.com/in/enzo-mazzariol/" target="_blank" rel="noopener noreferrer" className={`hover:text-ink transition-colors ${focusRing}`}>LinkedIn ↗︎</a>
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-600" />
              </span>
              Disponible
            </span>
          </div>
        </div>
      </main>

      <SelectedWorks />
      <WhatIDo />
      <ExperienceSection />
      <StackSection />


    </div>
  )
}
