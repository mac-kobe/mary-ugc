import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import gsap from 'gsap'
import App from './App.jsx'
import './index.css'

// Smooth anchor scrolling with GSAP
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]')
  if (!link) return
  const id = link.getAttribute('href')
  if (id === '#') return
  const target = document.querySelector(id)
  if (!target) return
  e.preventDefault()
  gsap.to(window, {
    scrollTo: { y: target, offsetY: 60 },
    duration: 1.4,
    ease: 'power2.inOut',
  })
})

// Load GSAP ScrollToPlugin
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
