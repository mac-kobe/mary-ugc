import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Grid } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_BASE = '/videos'

const posterFor = (src) => {
  const filename = src.split('/').pop().replace('.mp4', '.jpg')
  return `/images/posters/${filename}`
}

const videos = [
  { title: 'Summer Food', src: `${VIDEO_BASE}/summer-food.mp4` },
  { title: 'Salud Pepino Drink', src: `${VIDEO_BASE}/salud-pepino-drink.mp4` },
  { title: 'Neutrogena', src: `${VIDEO_BASE}/neutrogena.mp4` },
  { title: '5-Min Dinner', src: `${VIDEO_BASE}/5-min-dinner.mp4` },
  { title: 'Drain Catcher Hack', src: `${VIDEO_BASE}/drain-catcher.mp4` },
  { title: 'Penne Recipe', src: `${VIDEO_BASE}/penne-recipe.mp4` },
  { title: 'Ellaola Vitamin', src: `${VIDEO_BASE}/ellaola-vitamin.mp4` },
]

export default function VideoShowcase({ onOpenPortfolio }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const videoRefs = useRef([])
  const [active, setActive] = useState(0)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.video-header > *', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.video-header',
          start: 'top 85%',
        },
      })

      gsap.from('.video-carousel', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.video-carousel',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === active) {
        vid.play().catch(() => {})
      } else {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }, [active])

  // Toggle muted — set directly on video elements synchronously in the click handler
  // so the browser treats it as a user gesture (useEffect is async and gets blocked)
  const handleToggleMute = () => {
    setMuted((prev) => {
      const next = !prev
      videoRefs.current.forEach((vid) => {
        if (vid) vid.muted = next
      })
      return next
    })
  }

  // Scroll active card into view with smooth GSAP animation
  useEffect(() => {
    if (!trackRef.current) return
    const card = trackRef.current.children[active]
    if (!card) return
    const track = trackRef.current
    const scrollLeft = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2
    gsap.to(track, {
      scrollLeft,
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }, [active])

  const prev = () => setActive((a) => (a === 0 ? videos.length - 1 : a - 1))
  const next = () => setActive((a) => (a === videos.length - 1 ? 0 : a + 1))

  return (
    <section id="videos" ref={sectionRef} className="py-20 md:py-28 bg-cream relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="video-header text-center mb-14">
          <p className="section-label">Featured Content</p>
          <h2 className="section-heading">Some of my work!</h2>
        </div>

        {/* Carousel */}
        <div className="video-carousel relative max-w-5xl mx-auto">
          {/* Arrow buttons */}
          <button
            onClick={prev}
            aria-label="Previous video"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-14 z-10 w-10 h-10 rounded-full bg-white shadow-warm-lg flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors duration-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next video"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-14 z-10 w-10 h-10 rounded-full bg-white shadow-warm-lg flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors duration-200"
          >
            <ChevronRight size={20} />
          </button>

          {/* Mute toggle */}
          <button
            onClick={handleToggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="absolute top-3 right-3 lg:right-[-2rem] z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-warm flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors duration-200"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {videos.map(({ title, src }, i) => (
              <div
                key={title}
                className={`flex-shrink-0 w-56 sm:w-64 snap-center transition-all duration-300 cursor-pointer ${
                  i === active ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-50'
                }`}
                onClick={() => setActive(i)}
              >
                {/* Video - 9:16 aspect ratio */}
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-warm bg-linen">
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={Math.abs(i - active) <= 1 || (active === 0 && i === videos.length - 1) || (active === videos.length - 1 && i === 0) ? src : undefined}
                    poster={posterFor(src)}
                    muted={muted}
                    loop
                    playsInline
                    preload={i === active ? 'auto' : 'none'}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <p className="font-inter font-medium text-charcoal text-center mt-4 text-sm">
                  {title}
                </p>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to video ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'bg-terracotta w-7'
                    : 'bg-charcoal/20 hover:bg-charcoal/40 w-2.5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button
            onClick={onOpenPortfolio}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-terracotta text-white font-inter font-medium text-sm rounded-full hover:bg-[#B5613E] transition-all duration-200 hover:scale-[1.03]"
          >
            <Grid size={18} />
            View All Content
          </button>
          <a
            href="https://www.tiktok.com/@mary_elizabethugc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-charcoal text-white font-inter font-medium text-sm rounded-full hover:bg-charcoal/80 transition-all duration-200 hover:scale-[1.03]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.21 8.21 0 004.76 1.52V6.69h-1z" />
            </svg>
            Follow @mary_elizabethugc on TikTok
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
            Follow @mary_elizabethugc on IG
          </a>
        </div>
      </div>
    </section>
  )
}
