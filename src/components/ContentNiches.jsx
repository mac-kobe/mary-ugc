import { useEffect, useRef } from 'react'
import { ChefHat, ShoppingCart, Sparkles, Baby, BookOpen, Package } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const niches = [
  {
    icon: ChefHat,
    title: 'Budget Recipes',
    desc: 'Easy, family-friendly meals that save money without sacrificing flavor. From arroz con pollo to 30-minute dinners.',
  },
  {
    icon: ShoppingCart,
    title: 'Grocery Hauls',
    desc: 'Real grocery runs with real budgets. Showing families how to eat well for less.',
  },
  {
    icon: Sparkles,
    title: 'Skincare',
    desc: "Honest reviews and routines that fit a busy mom and teacher's schedule.",
  },
  {
    icon: Baby,
    title: 'Mom Life',
    desc: 'The real, unfiltered moments of raising two little girls. Relatable content that resonates with millennial moms.',
  },
  {
    icon: BookOpen,
    title: 'Teacher Life',
    desc: 'A window into the daily life of a bilingual educator. Relatable for the massive teacher community on TikTok.',
  },
  {
    icon: Package,
    title: 'Product Reviews',
    desc: 'Authentic reviews of loungewear, snacks, drinks, and household products families actually use.',
  },
]

export default function ContentNiches() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEls = sectionRef.current.querySelectorAll('.niche-header > *')
      const cards = sectionRef.current.querySelectorAll('.niche-card')

      if (headerEls.length) {
        gsap.fromTo(headerEls,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          }
        )
      }

      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-linen">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="niche-header text-center mb-14">
          <p className="section-label">What I Create</p>
          <h2 className="section-heading">Content That Connects</h2>
        </div>

        {/* Grid */}
        <div className="niche-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="niche-card bg-white rounded-2xl p-7 shadow-warm card-hover"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-5">
                <Icon size={22} className="text-sage" />
              </div>

              <h3 className="font-playfair text-xl text-charcoal mb-2">
                {title}
              </h3>
              <p className="font-inter text-sm text-charcoal/70 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
