import { useRef, useEffect } from 'react'

const snippets = [
  `const Button = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-white
      text-black font-mono">
    {label}
  </button>
)`,
  `const data = await fetch('/api/projects')
  .then(res => res.json())
  .catch(console.error)`,
  `@GetMapping("/projects")
public List<Project> getAll() {
  return repo.findAll();
}`,
  `gsap.fromTo('.hero',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0,
    duration: 0.8,
    ease: 'power3.out' })`,
  `const useTheme = () => {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    document.documentElement
      .classList.toggle('dark', dark)
  }, [dark])
  return { dark, setDark }
}`,
  `SELECT p.title, p.slug
FROM projects p
WHERE p.published = true
ORDER BY p.created_at DESC
LIMIT 6;`,
  `@Entity
public class Project {
  @Id @GeneratedValue
  private Long id;
  private String title;
  private String slug;
}`,
  `ScrollTrigger.create({
  trigger: '.section',
  start: 'top 80%',
  onEnter: () =>
    gsap.to('.section',
      { autoAlpha: 1, y: 0 })
})`,
  `export default function useFetch(url) {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
  }, [url])
  return data
}`,
  `// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Mono']
      }
    }
  }
}`,
  `router.get('/api/users/:id',
  async (req, res) => {
    const user = await
      User.findById(req.params.id)
    res.json(user)
  }
)`,
  `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.cards',
    scrub: true
  }
})
tl.from('.card', {
  y: 60, stagger: 0.1
})`,
]

const TYPE_SPEED = 38
const DELETE_SPEED = 14
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 500

export default function TerminalTyper() {
  const codeRef = useRef(null)

  useEffect(() => {
    let timeout
    let snippetIndex = 0
    let charIndex = 0
    let isDeleting = false

    const tick = () => {
      const current = snippets[snippetIndex]

      if (!isDeleting) {
        charIndex++
        if (codeRef.current) {
          codeRef.current.textContent = current.slice(0, charIndex) + '▌'
        }
        if (charIndex === current.length) {
          timeout = setTimeout(() => { isDeleting = true; tick() }, PAUSE_AFTER_TYPE)
          return
        }
      } else {
        charIndex--
        if (codeRef.current) {
          codeRef.current.textContent = current.slice(0, charIndex) + '▌'
        }
        if (charIndex === 0) {
          isDeleting = false
          snippetIndex = (snippetIndex + 1) % snippets.length
          timeout = setTimeout(tick, PAUSE_AFTER_DELETE)
          return
        }
      }

      timeout = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED)
    }

    timeout = setTimeout(tick, 600)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex-shrink-0 w-full md:w-[320px] border border-white/10 overflow-hidden bg-[#0d0d0d]">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[10px] font-mono text-white/20 tracking-wider">~/portfolio</span>
      </div>

      {/* Code area */}
      <div className="px-4 pt-3 pb-5">
        <p className="text-[10px] font-mono text-white/25 mb-2.5 tracking-wider">enzo@dev:~$</p>
        <pre
          ref={codeRef}
          className="text-[11px] font-mono text-green-400/75 leading-relaxed whitespace-pre"
          style={{ minHeight: '140px' }}
        />
      </div>
    </div>
  )
}
