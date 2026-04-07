import {
  SiReact, SiNodedotjs, SiOpenjdk, SiSpringboot,
  SiTailwindcss, SiMysql, SiWordpress, SiExpo, SiGit,
  SiJavascript,
} from 'react-icons/si'

const stackDominio = [
  { name: 'React',       Icon: SiReact,       color: '#61DAFB' },
  { name: 'Tailwind',    Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'WordPress',   Icon: SiWordpress,   color: '#21759B' },
  { name: 'Git',         Icon: SiGit,         color: '#F05032' },
  { name: 'JavaScript',  Icon: SiJavascript,  color: '#F7DF1E' },
]

const stackExperiencia = [
  { name: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
  { name: 'Java',        Icon: SiOpenjdk,     color: '#f89820' },
  { name: 'Spring Boot', Icon: SiSpringboot,  color: '#6DB33F' },
  { name: 'MySQL',       Icon: SiMysql,       color: '#4479A1' },
  { name: 'Expo',        Icon: SiExpo,        color: '#888' },
]

// eslint-disable-next-line react/prop-types
export default function StackSection({ containerRef }) {
  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto border-t border-white/5">
      <p className="section-label text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">Stack</p>
      <div ref={containerRef} className="flex flex-col gap-8">

        <div>
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20 mb-3">Dominio</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {stackDominio.map(({ name, Icon, color }) => (
              <div key={name} className="stack-icon flex flex-col items-center gap-2.5 p-4 border border-white/5 hover:border-white/15 transition-colors duration-200 cursor-default group">
                <Icon size={26} style={{ color }} className="transition-transform duration-200 group-hover:scale-110" />
                <span className="text-[9px] font-mono text-white/25 group-hover:text-white/50 transition-colors text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/15 mb-3">Experiencia</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {stackExperiencia.map(({ name, Icon, color }) => (
              <div key={name} className="stack-icon flex flex-col items-center gap-2.5 p-4 border border-white/5 hover:border-white/15 transition-colors duration-200 cursor-default group">
                <Icon size={26} style={{ color }} className="transition-transform duration-200 group-hover:scale-110" />
                <span className="text-[9px] font-mono text-white/25 group-hover:text-white/50 transition-colors text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
