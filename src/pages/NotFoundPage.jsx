import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-white/20 font-mono text-[clamp(6rem,20vw,14rem)] font-bold leading-none select-none">
        404
      </p>
      <p className="text-white/50 text-sm font-mono mt-4 mb-8">
        Esta página no existe.
      </p>
      <Link
        to="/"
        className="text-xs font-mono text-white/40 hover:text-white/80 transition-colors border border-white/10 hover:border-white/30 px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        ← Volver al inicio
      </Link>
    </main>
  )
}
