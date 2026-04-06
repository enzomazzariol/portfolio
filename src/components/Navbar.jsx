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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080808]/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
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
            to="/about"
            className={`transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              location.pathname === '/about' ? 'text-white' : 'text-white/50'
            }`}
          >
            About
          </Link>
          <Link
            to="/proyectos"
            className={`transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              location.pathname === '/proyectos' ? 'text-white' : 'text-white/50'
            }`}
          >
            Projects
          </Link>
          <Link
            to="/contacto"
            className={`transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              location.pathname === '/contacto' ? 'text-white' : 'text-white/50'
            }`}
          >
            Contact
          </Link>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080808]/95 backdrop-blur-sm border-b border-white/5 px-6 pb-4 flex flex-col font-mono text-sm">
          <Link to="/about" className="text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">About</Link>
          <Link to="/proyectos" className="text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">Projects</Link>
          <Link to="/contacto" className="text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">Contact</Link>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">Resume ↗</a>
        </div>
      )}
    </nav>
  )
}
