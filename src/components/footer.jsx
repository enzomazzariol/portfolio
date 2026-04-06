import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080808]">
      {/* Columns */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-10 grid grid-cols-2 md:grid-cols-3 gap-10">
        <div>
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-5">
            Let's connect
          </p>
          <div className="flex flex-col gap-3 text-sm font-mono text-white/60">
            <a
              href="https://www.linkedin.com/in/enzo-mazzariol/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/enzomazzariol"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:mazzariolenzo@gmail.com"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Email ↗
            </a>
          </div>
        </div>

        <div>
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-5">
            Details
          </p>
          <div className="flex flex-col gap-3 text-sm font-mono text-white/60">
            <span className="text-white/40 select-all">mazzariolenzo@gmail.com</span>
          </div>
        </div>

        <div>
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-5">
            Links
          </p>
          <div className="flex flex-col gap-3 text-sm font-mono text-white/60">
            <Link to="/proyectos" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              Projects
            </Link>
            <Link to="/contacto" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Big outline name */}
      <div className="overflow-hidden select-none">
        <p
          className="text-[clamp(4rem,18vw,14rem)] font-bold leading-none tracking-tighter px-4 md:px-8 pb-2"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
          }}
        >
          MAZZARIOL
        </p>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-6 flex items-center justify-between text-xs font-mono text-white/20">
        <span>© {new Date().getFullYear()} Enzo Mazzariol</span>
        <span>Barcelona, España</span>
      </div>
    </footer>
  )
}
