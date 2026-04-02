import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#videos' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Name / Brand */}
          <a
            href="#"
            className="font-playfair text-xl text-charcoal hover:text-terracotta transition-colors duration-200"
          >
            Mary Ransom
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-sm text-charcoal link-hover"
              >
                {link.label}
              </a>
            ))}
            <a href="mailto:michael@maryransom.com?subject=UGC%20Collaboration%20Inquiry" className="btn-primary text-sm">
              Work With Me
            </a>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a href="mailto:michael@maryransom.com?subject=UGC%20Collaboration%20Inquiry" className="btn-primary text-sm px-5 py-2.5">
              Work With Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-charcoal min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 pt-20">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="font-playfair text-2xl text-charcoal link-hover"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
