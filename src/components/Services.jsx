import { useEffect, useRef } from 'react'
import {
  Video,
  Camera,
  Heart,
  Users,
  Globe,
  TrendingUp,
  UtensilsCrossed,
  Sparkles,
  Shirt,
  Baby,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const offerings = [
  { icon: Video, text: "Authentic UGC videos ready for your brand's channels" },
  { icon: Camera, text: 'High-quality product photography and lifestyle shots' },
  { icon: Heart, text: 'Genuine product integration into real daily life' },
  { icon: Users, text: 'Access to an engaged audience of moms, teachers, and families' },
  { icon: Globe, text: 'Bilingual content (English & Spanish) for wider reach' },
  { icon: TrendingUp, text: "Content optimized for TikTok's algorithm and trends" },
]

const perfectFor = [
  {
    icon: UtensilsCrossed,
    title: 'Food & Beverage Brands',
    desc: 'Recipe integrations, taste tests, and grocery content that converts.',
  },
  {
    icon: Sparkles,
    title: 'Skincare & Beauty',
    desc: 'Honest routines and reviews from a real, busy mom.',
  },
  {
    icon: Shirt,
    title: 'Loungewear & Lifestyle',
    desc: 'Authentic try-ons and daily-wear content that feels relatable.',
  },
  {
    icon: Baby,
    title: 'Family & Kid Products',
    desc: 'Real-life product use with two little girls at home.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftEls = sectionRef.current.querySelectorAll('.services-left > *')
      const cards = sectionRef.current.querySelectorAll('.perfect-card')

      if (leftEls.length) {
        gsap.fromTo(leftEls,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          }
        )
      }

      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-28 bg-cream relative z-10 mt-[60px]">
      {/* Wave top — linen to cream */}
      <div className="absolute left-0 right-0 bottom-full pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ height: '60px' }}
          preserveAspectRatio="none"
        >
          <rect width="1440" height="60" fill="#F3EDE4" />
          <path
            d="M0 35C300 10 600 50 900 25C1100 10 1300 45 1440 30V60H0V35Z"
            fill="#FFF8F0"
          />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          {/* Left Column */}
          <div className="services-left lg:flex-1">
            <p className="section-label">UGC Services</p>
            <h2 className="section-heading">
              Let Me Create Content for Your Brand!
            </h2>
            <p className="font-inter text-charcoal/70 leading-relaxed mb-8">
              I create authentic, scroll-stopping content that resonates with
              real families! Whether it's a recipe featuring your product, a
              skincare routine, or an unboxing that feels like a friend's
              recommendation. I bring genuine enthusiasm and three years of
              content creation experience to every project.
            </p>

            {/* What Brands Get */}
            <div className="space-y-4">
              {offerings.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                    <Icon size={16} className="text-terracotta" />
                  </span>
                  <span className="font-inter text-sm text-charcoal/80 leading-relaxed">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image + Perfect For cards */}
          <div className="services-right lg:flex-1">
            <div className="rounded-2xl overflow-hidden shadow-warm mb-6">
              <img
                src="/images/hero-2.jpg"
                alt="Mary Ransom — Content Creator"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perfectFor.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="perfect-card bg-white rounded-xl p-5 border-l-4 border-sage shadow-warm card-hover"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon size={20} className="text-sage flex-shrink-0" />
                    <h3 className="font-playfair text-base text-charcoal font-medium">
                      {title}
                    </h3>
                  </div>
                  <p className="font-inter text-xs text-charcoal/60 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a href="mailto:Mearansom@gmail.com?subject=UGC%20Collaboration%20Inquiry" className="btn-primary text-base px-12 py-4">
            Let's Work Together &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
