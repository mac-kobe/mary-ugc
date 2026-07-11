import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandReviews from './components/BrandReviews'
import VideoShowcase from './components/VideoShowcase'
import SocialProof from './components/SocialProof'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Portfolio from './components/Portfolio'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <BrandReviews />
        <VideoShowcase onOpenPortfolio={() => navigate('/content')} />
        <SocialProof />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/content" element={<Portfolio />} />
    </Routes>
  )
}

export default App
