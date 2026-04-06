import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ContactPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // Signal arcs entrance
      gsap.fromTo(
        '.signal-arc',
        { opacity: 0, scale: 0.5, transformOrigin: '60px 60px' },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)', stagger: 0.2, delay: 0.3 }
      )
      // Continuous pulse
      gsap.to(
        '.signal-arc',
        { opacity: 0.4, duration: 1.5, ease: 'power1.inOut', yoyo: true, repeat: -1, stagger: 0.3, delay: 1.5 }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="relative min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Signal broadcast SVG — communication/connection decoration */}
      <svg
        aria-hidden="true"
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
      >
        {/* Center point */}
        <circle cx="60" cy="60" r="3" fill="rgba(255,255,255,0.5)" />
        {/* Arc 1 — r=20 */}
        <path
          className="signal-arc"
          d="M 60,40 A 20,20 0 0,1 80,60 A 20,20 0 0,1 60,80"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Arc 2 — r=40 */}
        <path
          className="signal-arc"
          d="M 60,20 A 40,40 0 0,1 100,60 A 40,40 0 0,1 60,100"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Arc 3 — r=60 */}
        <path
          className="signal-arc"
          d="M 60,0 A 60,60 0 0,1 120,60 A 60,60 0 0,1 60,120"
          stroke="rgba(26,26,62,0.6)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-xl">
        <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">
          Get in touch
        </p>
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white mb-12">
          Let's<br />talk.
        </h1>

        <form
          action="https://getform.io/f/bnlldomb"
          method="POST"
          className="flex flex-col gap-0"
        >
          <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none"
            />
          </div>
          <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none"
            />
          </div>
          <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
            <textarea
              name="message"
              placeholder="Tell me about your project"
              rows="5"
              required
              className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none resize-none"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-white text-black font-mono text-sm px-8 py-3 hover:bg-white/90 transition-colors"
            >
              Send message →
            </button>
          </div>
        </form>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-2 text-sm font-mono text-white/30">
          <p>Or reach me directly:</p>
          <a href="mailto:mazzariolenzo@gmail.com" className="hover:text-white/70 transition-colors">
            mazzariolenzo@gmail.com ↗
          </a>
        </div>
      </div>
    </main>
  )
}
