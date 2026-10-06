import {
  SiReact, SiNodedotjs, SiOpenjdk, SiSpringboot,
  SiTailwindcss, SiMysql, SiWordpress, SiExpo, SiGit,
  SiJavascript, SiAstro, SiHtml5, SiCss, SiSupabase, SiShopify,
} from 'react-icons/si'

const rows = [
  {
    label: 'Día a día',
    items: [
      { name: 'React',      Icon: SiReact,       color: '#149eca' },
      { name: 'Astro',      Icon: SiAstro,       color: '#FF5D01' },
      { name: 'JavaScript', Icon: SiJavascript,  color: '#d4b80f' },
      { name: 'Tailwind',   Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'WordPress',  Icon: SiWordpress,   color: '#21759B' },
      { name: 'Shopify',    Icon: SiShopify,     color: '#5E8E3E' },
      { name: 'Git',        Icon: SiGit,         color: '#F05032' },
      { name: 'HTML',       Icon: SiHtml5,       color: '#E34F26' },
      { name: 'CSS',        Icon: SiCss,         color: '#663399' },
    ],
  },
  {
    label: 'Backend y móvil',
    items: [
      { name: 'Java',         Icon: SiOpenjdk,   color: '#E76F00' },
      { name: 'Spring Boot',  Icon: SiSpringboot, color: '#6DB33F' },
      { name: 'MySQL',        Icon: SiMysql,     color: '#4479A1' },
      { name: 'Node.js',      Icon: SiNodedotjs, color: '#339933' },
      { name: 'Supabase',     Icon: SiSupabase,  color: '#3ECF8E' },
      { name: 'React Native', Icon: SiReact,     color: '#149eca' },
      { name: 'Expo',         Icon: SiExpo,      color: '#0d0d0d' },
    ],
  },
]

export default function StackSection() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-14">
        <p className="reveal text-xs font-medium tracking-[0.18em] uppercase text-ink/50 mb-4">Stack</p>
        <h2 className="split-reveal display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] text-ink max-w-3xl">
          Las herramientas con las que construyo.
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {rows.map(({ label, items }, r) => (
          <div key={label}>
            <p className="px-6 md:px-10 max-w-7xl mx-auto text-sm text-ink/50 mb-3">{label}</p>
            {/* Items are repeated: desktop slides on scroll without showing an edge; mobile loops it
                as an infinite marquee (-50% = exactly one copy, so spacing is margin, not gap) */}
            <ul className={`stack-row flex w-max md:px-10 ${r % 2 ? 'stack-row-reverse' : ''}`} aria-label={label}>
              {[...items, ...items].map(({ name, Icon, color }, i) => (
                <li
                  key={i}
                  aria-hidden={i >= items.length || undefined}
                  className="flex items-center gap-3 mr-3 bg-surface border border-ink/10 rounded-full pl-4 pr-6 py-3 md:py-4"
                >
                  <Icon size={26} style={{ color }} />
                  <span className="display text-2xl md:text-3xl text-ink whitespace-nowrap">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
