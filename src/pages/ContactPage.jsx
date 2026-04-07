import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    const data = new FormData(e.target)

    try {
      const res = await fetch('https://getform.io/f/bnlldomb', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-6xl mx-auto flex flex-col justify-center">
      <div className="max-w-xl">
        <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">
          Hablemos
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white mb-12">
          Cuéntame<br />tu proyecto.
        </h1>

        {status === 'success' ? (
          <div className="py-12 flex flex-col gap-4">
            <p className="font-display text-2xl text-white">Mensaje enviado.</p>
            <p className="text-sm font-mono text-white/40">Me pondré en contacto contigo pronto.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-mono text-white/30 hover:text-white/70 transition-colors self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              ← Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
            <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
              <label htmlFor="name" className="sr-only">Tu nombre</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Tu nombre"
                required
                className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none"
              />
            </div>
            <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
              <label htmlFor="email" className="sr-only">Tu email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Tu email"
                required
                className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none"
              />
            </div>
            <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
              <label htmlFor="phone" className="sr-only">Teléfono</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Teléfono (opcional)"
                className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none"
              />
            </div>
            <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
              <label htmlFor="service" className="sr-only">¿Qué necesitas?</label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="w-full bg-transparent text-white text-base font-mono outline-none appearance-none cursor-pointer [&>option]:bg-[#080808] [&>option]:text-white"
              >
                <option value="" disabled className="text-white/20">¿Qué necesitas?</option>
                <option value="web">Sitio web / Landing page</option>
                <option value="ecommerce">Tienda online</option>
                <option value="app">Aplicación web o móvil</option>
                <option value="mantenimiento">Mantenimiento / mejoras</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
              <label htmlFor="message" className="sr-only">Tu mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Cuéntame sobre tu proyecto"
                rows="5"
                required
                className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="mt-4 text-xs font-mono text-red-400">
                Algo salió mal. Inténtalo de nuevo o escríbeme directamente.
              </p>
            )}

            <div className="mt-8">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-white text-black font-mono text-sm px-8 py-3 min-h-[44px] cursor-pointer hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-2 text-sm font-mono text-white/30">
          <p>O escríbeme directamente:</p>
          <a href="mailto:mazzariolenzo@gmail.com" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            mazzariolenzo@gmail.com ↗︎
          </a>
        </div>
      </div>
    </main>
  )
}
