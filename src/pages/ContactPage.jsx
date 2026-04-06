export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-6xl mx-auto flex flex-col justify-center">
      <div className="max-w-xl">
        <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">
          Get in touch
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white mb-12">
          Let's<br />talk.
        </h1>

        <form
          action="https://getform.io/f/bnlldomb"
          method="POST"
          className="flex flex-col gap-0"
        >
          <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none"
            />
          </div>
          <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none"
            />
          </div>
          <div className="border-b border-white/10 py-4 focus-within:border-white/40 transition-colors">
            <textarea
              name="message"
              placeholder="Tell me about your project"
              rows="5"
              required
              className="w-full bg-transparent text-white placeholder-white/20 text-base font-mono outline-none resize-none"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-white text-black font-mono text-sm px-8 py-3 hover:bg-white/90 transition-colors"
            >
              Send message →
            </button>
          </div>
        </form>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-2 text-sm font-mono text-white/30">
          <p>Or reach me directly:</p>
          <a href="mailto:mazzariolenzo@gmail.com" className="hover:text-white/70 transition-colors">
            mazzariolenzo@gmail.com ↗
          </a>
        </div>
      </div>
    </main>
  )
}
