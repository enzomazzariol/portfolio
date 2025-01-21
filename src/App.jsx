import Intro from './components/intro.jsx'
import Portfolio from './components/portfolio.jsx'
import Timeline from './components/timeline.jsx'
import Contact from './components/contact.jsx'
import Footer from './components/footer.jsx'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './components/icons.jsx'

function App() {

  const[theme, setTheme] = useState(null)

  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  const handleThemeSwitch = () => {
    if(theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  useEffect(() => {
    if(theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);

  return (
    <>
      <button
        type='button'
        onClick={handleThemeSwitch}
        className='fixed p-2 z-10 right-20 top-4 bg-neutral-500/20 hover:bg-neutral-400 duration-300 text-lg rounded-md
        dark:bg-orange-500/40 dark:hover:bg-orange-400'
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="bg-white text-stone-900 min-h-screen font-space max-w-5xl w-11/12 mx-auto">
        <Intro />
        <Portfolio />
        <Timeline />
        <Contact />
        <Footer />
      </div>
    </>
  );
  
}

export default App
