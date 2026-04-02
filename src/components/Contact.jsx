import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content > *', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-content',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 bg-terracotta relative z-10 mt-[60px]"
    >
      {/* Wave top — cream to terracotta */}
      <div className="absolute left-0 right-0 bottom-full pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ height: '60px' }}
          preserveAspectRatio="none"
        >
          <rect width="1440" height="60" fill="#FFF8F0" />
          <path
            d="M0 40C360 10 720 50 1080 25C1260 12 1380 35 1440 30V60H0V40Z"
            fill="#C4704B"
          />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center contact-content">
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-5">
          Let's Create Something Together
        </h2>

        <p className="font-inter text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
          Have a product you'd love to see in authentic, family-friendly
          content? I'd love to hear about it.
        </p>

        {/* Email CTA */}
        <a
          href="mailto:michael@maryransom.com?subject=UGC%20Collaboration%20Inquiry"
          className="inline-flex items-center gap-3 px-10 py-4 bg-white text-terracotta font-inter font-semibold rounded-full
                     text-base shadow-warm-lg
                     transition-all duration-200 ease-out
                     hover:scale-[1.03] hover:shadow-warm-xl
                     active:scale-[0.98]
                     pulse-glow
                     min-h-[44px]"
        >
          <Mail size={20} />
          michael@maryransom.com
        </a>

        {/* Secondary */}
        <div className="mt-8">
          <a
            href="https://www.tiktok.com/@mary_arndt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/20 text-white font-inter font-medium text-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-[1.03] backdrop-blur-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.21 8.21 0 004.76 1.52V6.69h-1z" />
            </svg>
            Or find me on TikTok @mary_arndt
          </a>
        </div>
      </div>
    </section>
  )
}
