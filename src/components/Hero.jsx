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
                Content Creator &middot; UGC Specialist &middot; Bilingual (EN/ES)
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline font-playfair text-5xl sm:text-6xl lg:text-7xl text-charcoal mb-5 leading-[1.1]">
              Hi, I'm Mary
            </h1>

            {/* Subheadline */}
            <p className="hero-sub text-lg sm:text-xl text-charcoal/70 font-inter max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Mom, teacher, and content creator helping brands connect with real
              families through authentic, relatable content.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href="mailto:michael@maryransom.com?subject=UGC%20Collaboration%20Inquiry" className="btn-primary text-base px-10 py-4">
                Work With Me
              </a>
              <a href="#videos" className="btn-secondary text-base px-10 py-4">
                See My Content
              </a>
            </div>

            {/* TikTok Link */}
            <div className="hero-stats mb-6">
              <a
                href="https://www.tiktok.com/@mary_arndt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-charcoal text-white font-inter font-medium text-sm rounded-full hover:bg-charcoal/80 transition-all duration-200 hover:scale-[1.03]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.21 8.21 0 004.76 1.52V6.69h-1z" />
                </svg>
                Follow @mary_arndt on TikTok
              </a>
            </div>

            {/* Social Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-charcoal/50 font-inter">
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-charcoal/70">2.6K</span> Followers
              </span>
              <span className="text-charcoal/20">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-charcoal/70">38.9K</span> Likes
              </span>
              <span className="text-charcoal/20">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-charcoal/70">673K</span> Top Video Views
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
                alt="Mary Ransom — Content Creator and UGC Specialist"
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
