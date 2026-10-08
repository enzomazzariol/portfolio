import { useState } from 'react'

function validate({ name, email, message }) {
  const errs = {}
  if (!name.trim()) errs.name = 'Nombre requerido'
  else if (name.trim().length < 2) errs.name = 'Nombre demasiado corto'

  if (!email.trim()) errs.email = 'Email requerido'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Email inválido'

  if (!message.trim()) errs.message = 'Mensaje requerido'
  else if (message.trim().length < 10) errs.message = 'Cuéntame un poco más'

  return errs
}

const reasons = ['Oferta de empleo', 'Proyecto freelance', 'Otro']

const details = [
  { label: 'Email', value: 'mazzariolenzo@gmail.com', href: 'mailto:mazzariolenzo@gmail.com' },
  { label: 'LinkedIn', value: 'in/enzo-mazzariol', href: 'https://www.linkedin.com/in/enzo-mazzariol/', external: true },
  { label: 'CV', value: 'Descargar PDF', href: '/assets/EnzoMazzariol-CV.pdf', external: true },
  { label: 'Ubicación', value: 'Barcelona, España' },
]

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40'
const fieldLabel = 'block text-sm font-medium text-ink/70 mb-2'
const fieldBase = 'w-full bg-canvas text-ink placeholder-ink/35 border rounded-xl px-4 py-3 outline-none transition-colors focus:border-ink/60'
const fieldBorder = (err) => (err ? 'border-red-600/60' : 'border-ink/15')

// eslint-disable-next-line react/prop-types
function FieldError({ id, children }) {
  if (!children) return null
  return <p id={id} className="text-sm text-red-700 mt-1.5">{children}</p>
}

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState({})

  async function handleSubmit(e) {
    e.preventDefault()

    const data = new FormData(e.target)
    const values = {
      name: data.get('name') ?? '',
      email: data.get('email') ?? '',
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
    <main className="px-6 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32 max-w-7xl mx-auto grid md:grid-cols-12 gap-16 md:gap-10">

      {/* Left: pitch + direct details */}
      <div className="md:col-span-5">
        <p className="hero-fade-down text-xs font-medium tracking-[0.18em] uppercase text-ink/50 mb-6" style={{ animationDelay: '0.1s' }}>Contacto</p>
        <h1 className="hero-fade-up display text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-ink" style={{ animationDelay: '0.2s' }}>
          Hablemos de tu equipo o de tu proyecto
        </h1>
        <p className="hero-fade-up text-lg text-ink/65 leading-relaxed mt-8 max-w-md" style={{ animationDelay: '0.35s' }}>
          Si buscas un desarrollador full stack para tu equipo o tienes un proyecto web en mente,
          escríbeme. Respondo personalmente a cada mensaje.
        </p>

        <dl className="hero-fade-up mt-12 border-t border-ink/10" style={{ animationDelay: '0.5s' }}>
          {details.map(({ label, value, href, external }) => (
            <div key={label} className="flex justify-between gap-6 py-4 border-b border-ink/10">
              <dt className="text-sm text-ink/50">{label}</dt>
              <dd className="text-right">
                {href ? (
                  <a
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className={`text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink transition-colors ${focusRing}`}
                  >
                    {value}{external && ' ↗︎'}
                  </a>
                ) : <span className="text-ink">{value}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right: form card */}
      <div className="hero-fade-up md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7" style={{ animationDelay: '0.4s' }}>
        <div className="bg-surface border border-ink/10 rounded-ui p-6 md:p-10">
          {status === 'success' ? (
            <div className="py-12 flex flex-col gap-4" role="status">
              <p className="display text-4xl text-ink">Mensaje enviado.</p>
              <p className="text-ink/60">Gracias por escribir. Te responderé lo antes posible.</p>
              <button
                onClick={() => { setStatus('idle'); setErrors({}) }}
                className={`mt-4 text-sm font-medium text-ink/60 hover:text-ink transition-colors self-start ${focusRing}`}
              >
                ← Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <fieldset>
                <legend className={fieldLabel}>Motivo</legend>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <label key={r} className="cursor-pointer">
                      <input type="radio" name="motivo" value={r} className="peer sr-only" />
                      <span className="inline-block text-sm border border-ink/15 rounded-full px-4 py-2 transition-colors hover:border-ink/40 peer-checked:bg-ink peer-checked:text-canvas peer-checked:border-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink/40">
                        {r}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={fieldLabel}>Nombre *</label>
                  <input id="name" type="text" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={`${fieldBase} ${fieldBorder(errors.name)}`} />
                  <FieldError id="name-error">{errors.name}</FieldError>
                </div>
                <div>
                  <label htmlFor="email" className={fieldLabel}>Email *</label>
                  <input id="email" type="email" name="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={`${fieldBase} ${fieldBorder(errors.email)}`} />
                  <FieldError id="email-error">{errors.email}</FieldError>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className={fieldLabel}>Teléfono <span className="text-ink/40">(opcional)</span></label>
                <input id="phone" type="tel" name="phone" autoComplete="tel" className={`${fieldBase} ${fieldBorder()}`} />
              </div>

              <div>
                <label htmlFor="message" className={fieldLabel}>Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Cuéntame sobre el puesto o el proyecto…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${fieldBase} ${fieldBorder(errors.message)} resize-none`}
                />
                <FieldError id="message-error">{errors.message}</FieldError>
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-700" role="alert">
                  Algo salió mal. Inténtalo de nuevo o escríbeme directamente a mazzariolenzo@gmail.com.
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-sm text-ink/45">* Campos obligatorios</p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`bg-ink text-canvas text-sm font-medium rounded-ui px-7 py-3.5 min-h-[44px] cursor-pointer hover:bg-ink/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${focusRing}`}
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Enviando…
                    </span>
                  ) : 'Enviar mensaje →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
