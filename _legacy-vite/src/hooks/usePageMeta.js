import { useEffect } from 'react'

/**
 * Updates <head> metadata for the current page.
 * Works in the browser only — complements the static HTML files
 * generated at build time by scripts/generate-routes.mjs.
 */
export function usePageMeta({ title, description, canonical, ogImage }) {
  useEffect(() => {
    document.title = title

    const setMeta = (selector, content) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute('content', content)
    }

    const setLink = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', description)
    setMeta('meta[name="title"]', title)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', canonical)
    setMeta('meta[property="twitter:title"]', title)
    setMeta('meta[property="twitter:description"]', description)
    setMeta('meta[property="twitter:url"]', canonical)
    setLink('link[rel="canonical"]', 'href', canonical)

    if (ogImage) {
      setMeta('meta[property="og:image"]', ogImage)
      setMeta('meta[property="og:image:alt"]', title)
      setMeta('meta[property="twitter:image"]', ogImage)
    }
  }, [title, description, canonical, ogImage])
}
