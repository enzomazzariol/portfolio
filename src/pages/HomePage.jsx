import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 pb-12 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-6">
          Full Stack Developer · Barcelona
        </p>
        <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter text-white mb-8">
          Enzo<br />
          Mazzariol
        </h1>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-4">
          <p className="text-white/50 text-sm md:text-base max-w-sm leading-relaxed">
            Desarrollo web y móvil con React, Node.js y Java.<br />
            Estudiante de Ingeniería Audiovisual en UPF.
          </p>
          <div className="flex gap-4 text-sm font-mono">
            <Link
              to="/proyectos"
              className="border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all px-5 py-2.5 rounded-full"
            >
              Ver proyectos →
            </Link>
            <Link
              to="/contacto"
              className="bg-white text-black hover:bg-white/90 transition-all px-5 py-2.5 rounded-full"
            >
              Hablemos
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-16 border-t border-white/5 pt-6">
        <div className="flex gap-6 text-white/30 text-xs font-mono">
          <a
            href="https://github.com/enzomazzariol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/enzo-mazzariol/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:mazzariolenzo@gmail.com"
            className="hover:text-white/70 transition-colors"
          >
            Email ↗
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
          Disponible para proyectos
        </div>
      </div>
    </main>
  )
}
