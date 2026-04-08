import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-sm border-b border-white/5'
            : 'bg-[#080808]/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-white font-mono text-sm tracking-wider hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            enzo.
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-mono">
            <Link
              to="/sobre-mi"
              className={`transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                location.pathname === '/sobre-mi' ? 'text-white' : 'text-white/50'
              }`}
            >
              Sobre mí
            </Link>
            <Link
              to="/proyectos"
              className={`transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                location.pathname === '/proyectos' ? 'text-white' : 'text-white/50'
              }`}
            >
              Proyectos
            </Link>
            <Link
              to="/contacto"
              className={`transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                location.pathname === '/contacto' ? 'text-white' : 'text-white/50'
              }`}
            >
              Contacto
            </Link>
            <a
              href="/assets/EnzoCV-summer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              CV ↗︎
            </a>
          </div>

          {/* Mobile hamburger — z-50 so it stays above the overlay */}
          <button
            className="md:hidden relative z-50 text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4l12 12M4 16L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay — outside <nav> to avoid scroll interference */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-md flex flex-col justify-end px-8 pb-16 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Nav links */}
        <nav className="flex flex-col gap-2 mb-12">
          {[
            { label: 'Sobre mí', to: '/sobre-mi' },
            { label: 'Proyectos', to: '/proyectos' },
            { label: 'Contacto', to: '/contacto' },
          ].map(({ label, to }, index) => (
            <Link
              key={to}
              to={to}
              className={`font-display font-bold text-6xl leading-none tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                location.pathname === to ? 'text-white' : 'text-white/30 hover:text-white'
              }`}
              style={{
                transitionProperty: 'transform, opacity, color',
                transitionDuration: '0.35s',
                transitionTimingFunction: 'ease',
                transitionDelay: `${index * 60}ms`,
                transform: menuOpen ? 'translateY(0)' : 'translateY(1.25rem)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="/assets/EnzoCV-summer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-bold text-6xl leading-none tracking-tight text-white/30 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            style={{
              transitionProperty: 'transform, opacity, color',
              transitionDuration: '0.35s',
              transitionTimingFunction: 'ease',
              transitionDelay: '180ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(1.25rem)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            CV ↗︎
          </a>
        </nav>

        {/* Metadata footer */}
        <p
          className="font-mono text-xs text-white/20 tracking-widest uppercase"
          style={{
            transitionProperty: 'transform, opacity',
            transitionDuration: '0.35s',
            transitionTimingFunction: 'ease',
            transitionDelay: '260ms',
            transform: menuOpen ? 'translateY(0)' : 'translateY(0.75rem)',
            opacity: menuOpen ? 1 : 0,
          }}
        >
          Enzo Mazzariol · 2025
        </p>
      </div>
    </>
  )
}
