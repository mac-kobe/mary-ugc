import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  'Food & Snacks',
  'Skincare',
  'Loungewear',
  'Drinks & Beverages',
  'Kitchen & Home',
  'Family Products',
  'Budget Living',
  'Teacher Essentials',
]

export default function BrandCategories() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = sectionRef.current.querySelector('.categories-headline')
      const pills = sectionRef.current.querySelectorAll('.category-pill')

      if (headline) {
        gsap.fromTo(headline,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          }
        )
      }

      if (pills.length) {
        gsap.fromTo(pills,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-linen relative z-10 mt-[60px] mb-[60px]">
      {/* Wave top — cream to linen */}
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
            d="M0 30C200 55 400 10 720 35C1040 60 1240 15 1440 40V60H0V30Z"
            fill="#F3EDE4"
          />
        </svg>
      </div>

      {/* Wave bottom — linen to cream */}
      <div className="absolute left-0 right-0 top-full pointer-events-none">
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
            d="M0 0H1440V25C1200 50 960 10 720 30C480 50 240 15 0 35V0Z"
            fill="#F3EDE4"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h2 className="categories-headline font-playfair text-3xl md:text-4xl text-charcoal mb-10">
          Categories I Create For
        </h2>

        <div className="categories-grid flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="category-pill inline-block px-6 py-3 bg-linen text-charcoal border border-charcoal/10 rounded-full font-inter text-sm
                         transition-all duration-200 ease-out cursor-default
                         hover:bg-sage hover:text-white hover:border-sage"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
