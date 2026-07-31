import { useRef, useEffect, useState } from 'react'

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789'

function useScrambleText(final, { speed = 50, initialDelay = 300 } = {}) {
  const [text, setText] = useState('')

  useEffect(() => {
    let frame = 0
    const totalFrames = final.length + 8
    let raf
    let timeout

    const tick = () => {
      frame++
      const resolved = Math.min(Math.floor((frame / totalFrames) * final.length), final.length)
      const scrambled = final
        .split('')
        .map((ch, i) => {
          if (i < resolved) return ch
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        })
        .join('')
      setText(scrambled)
      if (frame < totalFrames) {
        timeout = setTimeout(() => { raf = requestAnimationFrame(tick) }, speed)
      } else {
        setText(final)
      }
    }

    const start = setTimeout(() => { raf = requestAnimationFrame(tick) }, initialDelay)
    return () => { clearTimeout(start); clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [final, speed, initialDelay])

  return text
}

export default function NotFound() {
  const containerRef = useRef(null)
  const title = useScrambleText('404', { speed: 70, initialDelay: 200 })
  const subtitle = useScrambleText('PÁGINA NO ENCONTRADA', { speed: 30, initialDelay: 900 })

  // Periodic micro-glitch on the 404 text
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timeout
    const glitch = () => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 3,
      })
      setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 80)
      timeout = setTimeout(glitch, 2000 + Math.random() * 4000)
    }
    timeout = setTimeout(glitch, 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Glitch 404 */}
      <div className="relative mb-6" aria-label="404">
        {/* Chromatic layers */}
        <p
          className="glitch-layer-r absolute inset-0 font-mono font-bold leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(8rem, 25vw, 16rem)',
            color: 'rgba(255,0,80,0.12)',
            transform: `translate(${glitchOffset.x + 3}px, ${glitchOffset.y - 1}px)`,
            transition: 'transform 0.05s',
            clipPath: 'inset(10% 0 30% 0)',
          }}
          aria-hidden="true"
        >
          {title}
        </p>
        <p
          className="glitch-layer-b absolute inset-0 font-mono font-bold leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(8rem, 25vw, 16rem)',
            color: 'rgba(0,180,255,0.10)',
            transform: `translate(${-glitchOffset.x - 2}px, ${-glitchOffset.y + 1}px)`,
            transition: 'transform 0.05s',
            clipPath: 'inset(50% 0 0 0)',
          }}
          aria-hidden="true"
        >
          {title}
        </p>
        {/* Main text */}
        <p
          className="relative font-mono font-bold leading-none select-none"
          style={{
            fontSize: 'clamp(8rem, 25vw, 16rem)',
            color: 'rgba(255,255,255,0.08)',
            transform: `translate(${glitchOffset.x * 0.3}px, ${glitchOffset.y * 0.3}px)`,
            transition: 'transform 0.05s',
          }}
        >
          {title}
        </p>
      </div>

      {/* Scramble subtitle */}
      <p
        className="text-white/40 text-xs font-mono tracking-[0.35em] mb-2 h-5"
        aria-label="Página no encontrada"
      >
        {subtitle}
      </p>

      {/* Scanline decoration */}
      <div className="flex items-center gap-3 my-8">
        <span className="w-8 h-px bg-white/10" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
        <span className="w-8 h-px bg-white/10" />
      </div>

      {/* Terminal-style message */}
      <p className="text-white/25 text-xs font-mono mb-8 max-w-xs leading-relaxed">
        <span className="text-white/40">$</span> La ruta que buscas no existe en este servidor.
      </p>

      <a
        href="/"
        className="group relative text-xs font-mono text-white/50 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-6 py-3 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <span className="relative z-[1]">cd /home →</span>
        <span className="absolute inset-0 bg-white/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      </a>

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />
    </main>
  )
}
