import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.4 })
        .from('.hero-headline', { opacity: 0, y: 24, duration: 0.4 }, '-=0.15')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.35 }, '-=0.15')
        .from('.hero-buttons', { opacity: 0, y: 18, duration: 0.35 }, '-=0.1')
        .from('.hero-stats', { opacity: 0, y: 14, duration: 0.3 }, '-=0.05')
        .from('.hero-image', { opacity: 0, scale: 0.96, duration: 0.6 }, '-=0.5')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-[100dvh] flex items-center bg-cream relative overflow-hidden"
    >
      {/* Subtle decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sage/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-24 pb-16 md:pt-0 md:pb-0">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="hero-badge mb-6">
              <span className="inline-block px-5 py-2 bg-sage/10 text-sage rounded-full text-sm font-inter font-medium tracking-wide">
                Content Creator &middot; UGC Creator &middot; Bilingual (EN/ES)
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline font-playfair text-5xl sm:text-6xl lg:text-7xl text-charcoal mb-5 leading-[1.1]">
              Hi, I'm Mary!
            </h1>

            {/* Subheadline */}
            <p className="hero-sub text-lg sm:text-xl text-charcoal/70 font-inter max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              I'm a Mom, Teacher, and born & raised Michigan girly. I'm also bilingual! I specialize in lifestyle, family & wellness products. I create authentic, 
              relatable content that converts & I'd love to work with you on your next project!
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href="mailto:Mearansom@gmail.com?subject=UGC%20Collaboration%20Inquiry" className="btn-primary text-base px-10 py-4">
                Work With Me
              </a>
              <a href="#videos" className="btn-secondary text-base px-10 py-4">
                See My Content
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-stats mb-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="https://www.tiktok.com/@mary_elizabethugc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-charcoal text-white font-inter font-medium text-sm rounded-full hover:bg-charcoal/80 transition-all duration-200 hover:scale-[1.03]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.21 8.21 0 004.76 1.52V6.69h-1z" />
                </svg>
                @mary_elizabethugc on TikTok
              </a>
              <a
                href="https://www.instagram.com/mary_elizabethugc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-charcoal text-white font-inter font-medium text-sm rounded-full hover:bg-charcoal/80 transition-all duration-200 hover:scale-[1.03]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 00-1.38-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zM12 16a4 4 0 114-4 4 4 0 01-4 4zm6.41-10.85a1.44 1.44 0 101.44 1.44 1.44 1.44 0 00-1.44-1.44z" />
                </svg>
                @mary_elizabethugc on IG
              </a>
            </div>

            {/* Social Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-charcoal/50 font-inter">
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-charcoal/70">2.8K</span> Followers
              </span>
              <span className="text-charcoal/20">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-charcoal/70">43.8K</span> Likes
              </span>
              <span className="text-charcoal/20">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-charcoal/70">886K</span> Top Video Views
              </span>
              <span className="text-charcoal/20">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-charcoal/70">3 Years</span> Creating
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hero-image flex-1 w-full max-w-md lg:max-w-lg">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-warm-lg">
              <img
                src="/images/hero.png"
                alt="Mary Elizabeth — Content Creator and UGC Creator"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 10 480 50 720 35C960 20 1200 55 1440 30V60H0V40Z"
            fill="#FFF8F0"
          />
        </svg>
      </div>
    </section>
  )
}
