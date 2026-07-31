import { useRef, useEffect, useState } from 'react'

const SKILLS = ['FRONTEND', 'BACKEND', 'SEO', 'UI / UX', 'REACT', 'JAVA', 'FULL STACK']
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&'

export default function SkillScramble() {
  const displayRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let rafId
    let timeoutId
    let currentIndex = 0

    const scrambleTo = (target, idx) => {
      const FRAMES = 20
      let frame = 0

      const tick = () => {
        const progress = frame / FRAMES
        const resolved = Math.floor(progress * target.length)

        const text = target
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '/') return char
            if (i < resolved) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        if (displayRef.current) displayRef.current.textContent = text
        frame++

        if (frame <= FRAMES) {
          rafId = requestAnimationFrame(tick)
        } else {
          if (displayRef.current) displayRef.current.textContent = target
          timeoutId = setTimeout(next, 2400)
        }
      }

      setActiveIndex(idx)
      rafId = requestAnimationFrame(tick)
    }

    const next = () => {
      currentIndex = (currentIndex + 1) % SKILLS.length
      scrambleTo(SKILLS[currentIndex], currentIndex)
    }

    scrambleTo(SKILLS[0], 0)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="flex-shrink-0 w-full md:w-[280px]">
      <p className="text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase mb-5">
        // especialidad
      </p>
      <p
        ref={displayRef}
        className="font-display font-bold text-white leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.2rem, 7vw, 3.5rem)' }}
        aria-live="polite"
      />
      <div className="mt-5 flex items-center gap-2">
        {SKILLS.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === activeIndex ? '20px' : '6px',
              height: '2px',
              background: i === activeIndex ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </div>
  )
}
