/**
 * Post-build script: generates per-route static HTML files.
 *
 * After `vite build` produces dist/index.html, this script copies it for each
 * route and replaces <title>, <meta description>, OG tags, and canonical with
 * page-specific values. Vercel then serves the correct HTML to crawlers before
 * JS runs, giving each page proper SEO metadata.
 *
 * Run automatically via the `postbuild` npm script.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const BASE_URL = 'https://enzomazzariol.com'

const pages = [
  {
    path: '/sobre-mi',
    title: 'Sobre mí — Enzo Mazzariol · Desarrollador Web Barcelona',
    description:
      'Enzo Mazzariol, desarrollador web y full stack en Barcelona. Creo webs con React, Node.js y Java. Software Developer en Guarapo Media. Disponible freelance.',
    ogImage: `${BASE_URL}/assets/og-images/about-og.png`,
    ogImageType: 'image/png',
    ogImageAlt: 'Enzo Mazzariol — Desarrollador Web Barcelona, página Sobre mí',
  },
  {
    path: '/proyectos',
    title: 'Proyectos — Enzo Mazzariol · Portfolio Web Barcelona',
    description:
      'Portfolio de Enzo Mazzariol: webs y apps con React, Node.js y Java Spring Boot. Proyectos reales para clientes en Barcelona. Desarrollador web y full stack.',
    ogImage: `${BASE_URL}/assets/og-images/proyectos-og.png`,
    ogImageType: 'image/png',
    ogImageAlt: 'Portfolio de proyectos de Enzo Mazzariol, desarrollador web en Barcelona',
  },
  {
    path: '/contacto',
    title: 'Contacto — Enzo Mazzariol · Desarrollador Web Barcelona',
    description:
      '¿Tienes un proyecto web en mente? Escríbeme. Enzo Mazzariol, desarrollador web freelance y full stack en Barcelona, disponible para nuevos proyectos ahora.',
    ogImage: `${BASE_URL}/assets/og-images/contacto-og.png`,
    ogImageType: 'image/png',
    ogImageAlt: 'Contacto — Enzo Mazzariol, desarrollador web freelance en Barcelona',
  },
]

function esc(str) {
  return str.replace(/"/g, '&quot;')
}

const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

for (const page of pages) {
  const canonical = `${BASE_URL}${page.path}`
  const t = esc(page.title)
  const d = esc(page.description)

  let html = template

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(/(<meta name="description"\s+content=")[^"]*(")/i,   `$1${d}$2`)
  html = html.replace(/(<meta name="title"\s+content=")[^"]*(")/i,          `$1${t}$2`)
  html = html.replace(/(<meta property="og:title"\s+content=")[^"]*(")/i,   `$1${t}$2`)
  html = html.replace(/(<meta property="og:description"\s+content=")[^"]*(")/i, `$1${d}$2`)
  html = html.replace(/(<meta property="og:url"\s+content=")[^"]*(")/i,     `$1${canonical}$2`)
  html = html.replace(/(<meta property="twitter:title"\s+content=")[^"]*(")/i,       `$1${t}$2`)
  html = html.replace(/(<meta property="twitter:description"\s+content=")[^"]*(")/i, `$1${d}$2`)
  html = html.replace(/(<meta property="twitter:url"\s+content=")[^"]*(")/i,          `$1${canonical}$2`)
  html = html.replace(/(<link rel="canonical"\s+href=")[^"]*(")/i,          `$1${canonical}$2`)

  if (page.ogImage) {
    const img = esc(page.ogImage)
    const alt = esc(page.ogImageAlt)
    html = html.replace(/(<meta property="og:image"\s+content=")[^"]*(")/i,      `$1${img}$2`)
    html = html.replace(/(<meta property="og:image:alt"\s+content=")[^"]*(")/i,   `$1${alt}$2`)
    html = html.replace(/(<meta property="og:image:type"\s+content=")[^"]*(")/i,  `$1${esc(page.ogImageType)}$2`)
    html = html.replace(/(<meta property="twitter:image"\s+content=")[^"]*(")/i,  `$1${img}$2`)
  }

  const dir = join(distDir, page.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`  ✓  dist${page.path}/index.html`)
}

console.log('\nRoute HTML generation complete.\n')
