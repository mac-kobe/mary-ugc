import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 673, suffix: 'K', label: 'Top Video Views' },
  { value: 38.9, suffix: 'K', label: 'Total Likes', decimals: 1 },
  { value: 3, suffix: '', label: 'Years Creating' },
  { value: 2.6, suffix: 'K', label: 'Followers & Growing', decimals: 1 },
]

export default function SocialProof() {
  const sectionRef = useRef(null)
  const statRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proof-headline', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.proof-headline',
          start: 'top 85%',
        },
      })

      statRefs.current.forEach((el, i) => {
        if (!el) return
        const stat = stats[i]
        const obj = { val: 0 }

        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          snap: stat.decimals ? { val: 0.1 } : { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            const display = stat.decimals
              ? obj.val.toFixed(stat.decimals)
              : Math.round(obj.val)
            el.textContent = `${display}${stat.suffix}`
          },
        })
      })

      gsap.from('.proof-quote', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.proof-quote',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-terracotta relative z-10 mt-[60px] mb-[60px]">
      {/* Wave top */}
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
            d="M0 40C240 15 480 55 720 30C960 5 1200 50 1440 25V60H0V40Z"
            fill="#C4704B"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h2 className="proof-headline font-playfair text-3xl md:text-4xl text-white mb-14">
          Creating Content That People Actually Watch
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-14">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <p
                ref={(el) => (statRefs.current[i] = el)}
                className="font-inter font-bold text-4xl sm:text-5xl text-white mb-2"
              >
                0
              </p>
              <p className="font-inter text-xs sm:text-sm uppercase tracking-[0.1em] text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <p className="proof-quote font-playfair italic text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          "The best brand partnerships feel like recommendations from a friend. That's exactly what I create."
        </p>
      </div>

      {/* Wave bottom */}
      <div className="absolute left-0 right-0 top-full pointer-events-none">
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
            d="M0 0H1440V20C1200 50 960 5 720 30C480 55 240 10 0 40V0Z"
            fill="#C4704B"
          />
        </svg>
      </div>
    </section>
  )
}
