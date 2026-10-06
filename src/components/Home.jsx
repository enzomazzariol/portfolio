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

// Desktop: screenshots live in the side gutters of the hero block (the name spans ~32–68%),
// three per side, so they never cover the copy or the stats row.
// `depth` = scroll parallax (px); mouse parallax is derived from it too, so far tiles move more.
// Images are 640px copies in /assets/hero (originals are up to 2900px).
const tiles = [
  { src: '/assets/hero/nvs-1.webp',           pos: 'left-[1%] top-[0%] w-[17vw]',    rot: -6, depth: -140 },
  { src: '/assets/hero/bsa-2.webp',           pos: 'left-[10%] top-[40%] w-[12vw]',  rot: 6,  depth: -70 },
  { src: '/assets/hero/atelier-1.webp',   pos: 'left-[0%] top-[76%] w-[15vw]',   rot: -3, depth: -200 },
  { src: '/assets/hero/abode-1.webp',       pos: 'right-[1%] top-[2%] w-[17vw]',   rot: 5,  depth: -170 },
  { src: '/assets/hero/moodflix-1.webp', pos: 'right-[9%] top-[40%] w-[13vw]',  rot: -5, depth: -90 },
  { src: '/assets/hero/nvs-3.webp',           pos: 'right-[0%] top-[75%] w-[15vw]',  rot: 4,  depth: -230 },
]
const mobileTiles = [tiles[0], tiles[4], tiles[3]]

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40'
const onScroll = (trigger, start = 'top 85%') => ({ trigger, start, toggleActions: 'play none none none' })

export default function Home() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)

  const { contextSafe } = useGSAP({ scope: rootRef })

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.defaults({ ease: 'power3.out', duration: 0.9 })

    // Hero tiles — stacked layers so each motion owns its own transform
    // (GSAP writes `rotate: none` on anything it animates, so the CSS tilt can't share an element):
    //   .hero-tile      → scroll parallax (GSAP)
    //   .hero-tile-move → mouse parallax (GSAP)
    //   .hero-tile-tilt → resting tilt + hover straighten (CSS only)
    //   .hero-tile-img  → entrance (GSAP)
    const hero = heroRef.current
    const heroBox = hero.getBoundingClientRect()
    const cx = heroBox.left + heroBox.width / 2
    const cy = heroBox.top + heroBox.height * 0.42

    // Entrance: all tiles start stacked flat behind the name, then get tossed out to their spots.
    // Hidden until the images decode (max 1.5s) so nobody sees empty frames flying around.
    const imgs = gsap.utils.toArray('.hero-tile-img', hero).filter((img) => img.getBoundingClientRect().width)
    gsap.set(imgs, { autoAlpha: 0 })
    const ready = Promise.all(imgs.map((img) => img.decode().catch(() => {})))
    Promise.race([ready, new Promise((r) => setTimeout(r, 1500))]).then(contextSafe(() => imgs.forEach((img, i) => {
      const r = img.getBoundingClientRect()
      gsap.fromTo(img, {
        x: cx - (r.left + r.width / 2),
        y: cy - (r.top + r.height / 2),
        rotation: -Number(img.dataset.rot || 0),
        scale: 0.45,
        autoAlpha: 0,
      }, {
        x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1,
        duration: 1.4,
        ease: 'expo.out',
        delay: 0.35 + i * 0.07,
      })
    })))

    gsap.utils.toArray('.hero-tile', hero).forEach((el) => {
      gsap.to(el, { y: Number(el.dataset.depth), ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
    })

    // Mouse parallax (fine pointers only)
    let removePointer = () => {}
    if (window.matchMedia('(pointer: fine)').matches) {
      const movers = gsap.utils.toArray('.hero-tile-move', hero).map((el) => {
        const k = Math.abs(Number(el.parentElement.dataset.depth)) / 6
        return { k, x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }), y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }) }
      })
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        movers.forEach(({ k, x, y }) => { x(-nx * k); y(-ny * k) })
      }
      hero.addEventListener('pointermove', onMove)
      removePointer = () => hero.removeEventListener('pointermove', onMove)
    }

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

    // Stack: desktop rows slide in opposite directions, driven by scroll.
    // Below md they're a CSS infinite marquee instead (global.css), so GSAP stays off them there.
    gsap.matchMedia().add('(min-width: 768px)', () => {
      gsap.utils.toArray('.stack-row').forEach((el, i) => {
        gsap.fromTo(el, { xPercent: i % 2 ? -18 : 0 }, { xPercent: i % 2 ? 0 : -18, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    })

    return removePointer
  }, { scope: rootRef })

  return (
    <div ref={rootRef}>

      {/* ── Hero ── */}
      <main ref={heroRef} className="relative min-h-[100svh] flex flex-col px-6 md:px-10 pt-24 pb-8">

        <div className="relative flex-1 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 hidden md:block" aria-hidden="true">
            {tiles.map(({ src, pos, rot, depth }) => (
              <div key={src} className={`hero-tile absolute ${pos}`} data-depth={depth}>
                <div className="hero-tile-move">
                  <div
                    className="hero-tile-tilt [rotate:var(--rot)] hover:[rotate:0deg] hover:scale-[1.06] transition-[rotate,scale] duration-500 ease-out"
                    style={{ '--rot': `${rot}deg` }}
                  >
                    <img
                      src={src}
                      alt=""
                      data-rot={rot}
                      className="hero-tile-img w-full rounded-tile shadow-[0_20px_40px_-20px_rgb(13_13_13/0.35)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* h1 carries the search keyword; the big name below is the visual headline */}
            <h1 className="hero-fade-down font-sans text-ink/65 text-sm md:text-base font-medium tracking-[0.14em] uppercase mb-6" style={{ animationDelay: '0.55s' }}>
              Desarrollador web full stack en Barcelona
            </h1>

            <p className="display text-ink leading-[0.85] text-[clamp(4.5rem,10.5vw,9.5rem)]">
              <span className="sr-only">Enzo Mazzariol</span>
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
            </p>

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
                <div key={src} className="-mx-3" style={{ rotate: `${rot * 1.5}deg`, zIndex: i === 1 ? 1 : 0 }}>
                  <img src={src} alt="" data-rot={rot * 1.5} className="hero-tile-img w-32 aspect-[4/3] object-cover rounded-tile border-4 border-canvas" />
                </div>
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
