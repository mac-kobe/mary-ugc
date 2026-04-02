import { useEffect, useRef } from 'react'
import { MapPin, GraduationCap, Heart, Globe } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const details = [
  { icon: MapPin, text: 'West Michigan' },
  { icon: GraduationCap, text: 'Spanish Teacher' },
  { icon: Heart, text: 'Mom of Two' },
  { icon: Globe, text: 'Bilingual (EN/ES)' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-image', {
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 85%',
        },
      })

      gsap.from('.about-text > *', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="about-image w-full max-w-md lg:flex-1">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-lg">
              <img
                src="/images/family-grass.jpg"
                alt="Mary with her husband and two daughters"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="about-text lg:flex-1 max-w-xl">
            <p className="section-label">About Mary</p>
            <h2 className="section-heading">Teacher by Day, Creator by Passion</h2>

            <div className="space-y-4 text-charcoal/70 font-inter leading-relaxed mb-8">
              <p>
                I'm a mom of two little girls, a middle and high
                school Spanish teacher, and a content creator who's been showing
                up on TikTok every single day for three years!
              </p>
              <p>
                My content is rooted in real life. Budget-friendly recipes my
                family actually eats, skincare that works on a teacher's
                schedule, and the beautiful chaos of raising two girls under
                five.
              </p>
              <p>
                I believe the best content comes from authenticity. When I share
                a product, it's because it genuinely fits into my life, and my
                audience can tell the difference.
              </p>
            </div>

            {/* Detail pills */}
            <div className="grid grid-cols-2 gap-3">
              {details.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-charcoal/80 font-inter text-sm"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sage/10 text-sage flex-shrink-0">
                    <Icon size={16} />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
