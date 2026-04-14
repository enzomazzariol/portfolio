import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './Layout.jsx'

const HomePage      = lazy(() => import('./pages/HomePage.jsx'))
const ProjectsPage  = lazy(() => import('./pages/ProjectsPage.jsx'))
const ContactPage   = lazy(() => import('./pages/ContactPage.jsx'))
const AboutPage     = lazy(() => import('./pages/AboutPage.jsx'))
const NotFoundPage  = lazy(() => import('./pages/NotFoundPage.jsx'))

function RouteTracker() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-3MR3P0H4X3', { page_path: location.pathname })
    }
  }, [location])
  return null
}

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <RouteTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"          element={<HomePage />} />
          <Route path="/sobre-mi"  element={<AboutPage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/contacto"  element={<ContactPage />} />
          <Route path="*"          element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
