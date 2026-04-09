import { useState } from 'react'
import SkillScramble from '../components/SkillScramble'

function validate({ name, email, service, message }) {
  const errs = {}
  if (!name.trim()) errs.name = 'Nombre requerido'
  else if (name.trim().length < 2) errs.name = 'Nombre demasiado corto'

  if (!email.trim()) errs.email = 'Email requerido'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Email inválido'

  if (!service) errs.service = 'Selecciona un tipo de servicio'

  if (!message.trim()) errs.message = 'Mensaje requerido'
  else if (message.trim().length < 10) errs.message = 'Cuéntame un poco más'

  return errs
}

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState({})

  async function handleSubmit(e) {
    e.preventDefault()

    const data = new FormData(e.target)
    const values = {
      name: data.get('name') ?? '',
      email: data.get('email') ?? '',
      service: data.get('service') ?? '',
      message: data.get('message') ?? '',
    }

    const errs = validate(values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setStatus('submitting')

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
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-16 mb-12">
        <div>
          <p className="text-white/50 text-xs font-mono tracking-widest uppercase mb-4">Hablemos</p>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white">
            Cuéntame<br />tu proyecto.
          </h1>
        </div>
        <div className="md:pt-6">
          <SkillScramble />
        </div>
      </div>
      <div className="max-w-xl">
        {status === 'success' ? (
          <div className="py-12 flex flex-col gap-4 animate-[heroFadeDown_0.5s_ease_forwards]">
            <p className="font-display text-2xl text-white">Mensaje enviado.</p>
            <p className="text-sm font-mono text-white/40">Me pondré en contacto contigo pronto.</p>
            <button
              onClick={() => { setStatus('idle'); setErrors({}) }}
              className="mt-4 text-xs font-mono text-white/30 hover:text-white/70 transition-colors self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              ← Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-0">
            <div className={`border-b py-4 focus-within:border-white/40 transition-colors ${errors.name ? 'border-red-400/60' : 'border-white/10'}`}>
              <label htmlFor="name" className="sr-only">Tu nombre</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Tu nombre *"
                className="w-full bg-transparent text-white placeholder-white/35 text-base font-mono outline-none"
              />
              {errors.name && <p className="text-xs font-mono text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div className={`border-b py-4 focus-within:border-white/40 transition-colors ${errors.email ? 'border-red-400/60' : 'border-white/10'}`}>
              <label htmlFor="email" className="sr-only">Tu email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Tu email *"
                className="w-full bg-transparent text-white placeholder-white/35 text-base font-mono outline-none"
              />
              {errors.email && <p className="text-xs font-mono text-red-400 mt-1">{errors.email}</p>}
            </div>
            <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
              <label htmlFor="phone" className="sr-only">Teléfono (opcional)</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Teléfono (opcional)"
                className="w-full bg-transparent text-white placeholder-white/35 text-base font-mono outline-none"
              />
            </div>
            <div className={`border-b py-4 focus-within:border-white/40 transition-colors ${errors.service ? 'border-red-400/60' : 'border-white/10'}`}>
              <label htmlFor="service" className="sr-only">¿Qué necesitas?</label>
              <select
                id="service"
                name="service"
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
              {errors.service && <p className="text-xs font-mono text-red-400 mt-1">{errors.service}</p>}
            </div>
            <div className={`border-b py-4 focus-within:border-white/40 transition-colors ${errors.message ? 'border-red-400/60' : 'border-white/10'}`}>
              <label htmlFor="message" className="sr-only">Tu mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Cuéntame sobre tu proyecto *"
                rows="5"
                className="w-full bg-transparent text-white placeholder-white/35 text-base font-mono outline-none resize-none"
              />
              {errors.message && <p className="text-xs font-mono text-red-400 mt-1">{errors.message}</p>}
            </div>

            {status === 'error' && (
              <p className="mt-4 text-xs font-mono text-red-400">
                Algo salió mal. Inténtalo de nuevo o escríbeme directamente.
              </p>
            )}

            <p className="mt-6 text-xs font-mono text-white/30">* Campos obligatorios</p>

            <div className="mt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-white text-black font-mono text-sm px-8 py-3 min-h-[44px] cursor-pointer hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : 'Enviar mensaje →'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-2 text-sm font-mono text-white/50">
          <p>O escríbeme directamente:</p>
          <a href="mailto:mazzariolenzo@gmail.com" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            mazzariolenzo@gmail.com ↗︎
          </a>
        </div>
      </div>
    </main>
  )
}
