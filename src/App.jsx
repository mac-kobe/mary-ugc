import { useState } from 'react'
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

  if (showPortfolio) {
    return <Portfolio onClose={() => setShowPortfolio(false)} />
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <About />
        <BrandCategories />
        <VideoShowcase onOpenPortfolio={() => setShowPortfolio(true)} />
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
