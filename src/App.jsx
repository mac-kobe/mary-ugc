import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import BrandCategories from './components/BrandCategories'
import VideoShowcase from './components/VideoShowcase'
import SocialProof from './components/SocialProof'
import ContentNiches from './components/ContentNiches'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Portfolio from './components/Portfolio'

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  const openPortfolio = useCallback(() => {
    setShowPortfolio(true)
    window.history.pushState({ view: 'portfolio' }, '')
  }, [])

  const closePortfolio = useCallback(() => {
    setShowPortfolio(false)
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setShowPortfolio(false)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (showPortfolio) {
    return <Portfolio onClose={() => {
      closePortfolio()
      window.history.back()
    }} />
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <About />
        <BrandCategories />
        <VideoShowcase onOpenPortfolio={openPortfolio} />
        <SocialProof />
        <ContentNiches />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
