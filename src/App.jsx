import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Availability from './components/availability.jsx'
import Contact from './components/contact.jsx'
import Footer from './components/footer.jsx'
import HowIWork from './components/howIWork.jsx'
import { MoonIcon, SunIcon } from './components/icons.jsx'
import Intro from './components/intro.jsx'
import Portfolio from './components/portfolio.jsx'
import Stack from './components/stack.jsx'
import Timeline from './components/timeline.jsx'

function App() {
  const [theme, setTheme] = useState(null)
  const progressRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  const handleThemeSwitch = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Lenis smooth scroll + ScrollTrigger integration
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
    }
  }, [])

  // Reading progress bar
  useEffect(() => {
    if (!progressRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        transformOrigin: 'left center',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Reading progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left scale-x-0"
        style={{ background: 'linear-gradient(90deg, #f97316, #ec4899)' }}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={handleThemeSwitch}
        className="fixed p-2 z-10 right-5 md:right-36 top-4 bg-red-500/30 hover:bg-red-600 duration-300 text-lg rounded-md dark:bg-orange-500/40 dark:hover:bg-orange-600"
        aria-label="Toggle theme button"
        name="theme-switch-button"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="bg-white text-stone-900 min-h-screen font-nohemi dark:bg-stone-900 dark:text-stone-300">
        <main className="max-w-5xl w-11/12 mx-auto">
          <section aria-label="Presentación">
            <Intro />
            <Availability />
          </section>
          <section aria-label="Stack">
            <Stack />
          </section>
          <section aria-label="Proyectos">
            <Portfolio />
          </section>
          <section aria-label="Trayectoria">
            <Timeline />
          </section>
          <section aria-label="Cómo trabajo">
            <HowIWork />
          </section>
          <section aria-label="Contacto">
            <Contact />
          </section>
          <Footer />
        </main>
      </div>
    </>
  )
}

export default App
