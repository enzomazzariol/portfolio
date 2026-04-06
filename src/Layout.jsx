import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/footer.jsx'

export default function Layout() {
  return (
    <div className="bg-[#080808] text-white min-h-screen font-mono">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
