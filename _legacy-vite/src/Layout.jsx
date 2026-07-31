import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/footer.jsx'

const scrollPositions = new Map()

function ScrollManager() {
  const { pathname, key } = useLocation()
  const prevKey = useRef(null)

  useEffect(() => {
    // Save scroll position of the page we're leaving
    if (prevKey.current) {
      scrollPositions.set(prevKey.current, window.scrollY)
    }

    const saved = scrollPositions.get(key)
    if (saved !== undefined) {
      // Back/forward navigation — restore position
      requestAnimationFrame(() => window.scrollTo(0, saved))
    } else {
      // New navigation — scroll to top
      window.scrollTo(0, 0)
    }

    prevKey.current = key
  }, [key, pathname])

  return null
}

export default function Layout() {
  return (
    <div className="bg-[#080808] text-white min-h-screen font-sans">
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
