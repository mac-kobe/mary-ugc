import { useRef, useEffect } from 'react'
import { Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const brands = [
  { name: 'Neutrogena', logo: '/images/brands/neutrogena.png' },
  { name: 'Medicube', logo: '/images/brands/medicube.png' },
  { name: 'Salud', logo: '/images/brands/salud.png' },
  { name: 'Lolalet', logo: null },
  { name: 'Tubby Todd', logo: '/images/brands/tubbytodd.png' },
  { name: 'EllaOla', logo: '/images/brands/ellaola.png' },
]

const reviews = [
  {
    quote:
      "I absolutely loved it! The interaction between your daughter and the jewelry box was honestly one of my favorite parts. It felt so natural and sweet, and those sweet moments added so much warmth and authenticity to the content. She was adorable!",
    author: 'Brand Partner',
  },
  {
    quote:
      "Thank you again for all your hard work throughout this collaboration. It was a pleasure working with you, and I hope we can collaborate again on another project soon!",
    author: 'Brand Partner',
  },
]

export default function BrandReviews() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current.querySelectorAll('.br-head > *')
      const logos = sectionRef.current.querySelectorAll('.br-logo')
      const cards = sectionRef.current.querySelectorAll('.br-card')

      gsap.fromTo(heading,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )

      gsap.fromTo(logos,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: '.br-logos', start: 'top 88%' },
        }
      )

      gsap.fromTo(cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.br-reviews', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="br-head text-center mb-12">
          <p className="section-label">Brand Partners</p>
          <h2 className="section-heading">Brands I've Worked With</h2>
          <p className="font-inter text-charcoal/60 max-w-xl mx-auto leading-relaxed">
            Trusted by brands big and small to create authentic, family-friendly
            content that connects.
          </p>
        </div>

        {/* Brand logos */}
        <div className="br-logos grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="br-logo group flex items-center justify-center aspect-[3/2] bg-warm-white rounded-xl border border-charcoal/5 shadow-warm p-4 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-warm-lg hover:border-terracotta/30"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <span className="font-playfair text-xl text-charcoal/60 text-center transition-colors duration-300 group-hover:text-terracotta">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="br-reviews grid md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="br-card bg-warm-white rounded-2xl p-8 shadow-warm border border-charcoal/5 flex flex-col"
            >
              <Quote size={28} className="text-terracotta/40 mb-4 flex-shrink-0" />
              <p className="font-inter text-charcoal/75 leading-relaxed mb-6 flex-1">
                {review.quote}
              </p>
              <p className="font-inter text-sm font-medium text-charcoal/50">
                &mdash; {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
