import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SelectedWorks from '../components/home/SelectedWorks.jsx'
import ServicesGrid from '../components/home/ServicesGrid.jsx'
import ProcessSteps from '../components/home/ProcessSteps.jsx'
import StackSection from '../components/home/StackSection.jsx'

const Prism = lazy(() => import('../components/Prism.jsx'))

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Pre-split hero name into chars for CSS animation (no forced DOM reflow)
const heroWords = [
  { word: 'Enzo',      startDelay: 0,    perCharDelay: 0.05 },
  { word: 'Mazzariol', startDelay: 0.22, perCharDelay: 0.04 },
]

export default function HomePage() {
  const heroRef  = useRef(null)
  const stackRef = useRef(null)
  const worksRef = useRef(null)
  const stepsRef = useRef(null)
  const [prismReady, setPrismReady] = useState(false)

  // Defer Prism until after first paint — avoids blocking content render
  useEffect(() => {
    const raf = requestAnimationFrame(() => setPrismReady(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Scroll-triggered animations — hero entrance is CSS-only
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.defaults({ ease: 'power2.out', duration: 0.5 })

    heroRef.current.querySelectorAll('.section-label').forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0, y: -20, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      })
    })

    gsap.fromTo('.stack-icon',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, stagger: 0.05, scrollTrigger: { trigger: stackRef.current, start: 'top 82%', toggleActions: 'play none none none' } }
    )
    gsap.fromTo('.work-item',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, stagger: 0.08, scrollTrigger: { trigger: worksRef.current, start: 'top 82%', toggleActions: 'play none none none' } }
    )
    gsap.fromTo('.step-item',
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, scrollTrigger: { trigger: stepsRef.current, start: 'top 82%', toggleActions: 'play none none none' } }
    )
  }, { scope: heroRef })

  return (
    <div ref={heroRef}>

      {/* Prism background — lazy loaded after first paint */}
      {prismReady && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <Suspense fallback={null}>
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
          </Suspense>
          <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.72)' }} />
        </div>
      )}

      {/* Content above the prism */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── Hero ── */}
        <main className="min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 pb-12 max-w-6xl mx-auto">
          <div className="flex-1 flex flex-col justify-center">

            <p
              className="hero-fade-down text-white/55 text-xs font-mono tracking-widest uppercase mb-6"
              style={{ animationDelay: '0.55s' }}
            >
              Full Stack Developer · Barcelona
            </p>

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

        <SelectedWorks containerRef={worksRef} />
        <ServicesGrid />
        <ProcessSteps containerRef={stepsRef} />
        <StackSection containerRef={stackRef} />

      </div>
    </div>
  )
}
