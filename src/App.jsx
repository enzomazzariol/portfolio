import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'

const HomePage     = lazy(() => import('./pages/HomePage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const ContactPage  = lazy(() => import('./pages/ContactPage.jsx'))
const AboutPage    = lazy(() => import('./pages/AboutPage.jsx'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"          element={<Suspense><HomePage /></Suspense>} />
        <Route path="/about"     element={<Suspense><AboutPage /></Suspense>} />
        <Route path="/proyectos" element={<Suspense><ProjectsPage /></Suspense>} />
        <Route path="/contacto"  element={<Suspense><ContactPage /></Suspense>} />
      </Route>
    </Routes>
  )
}

export default App
