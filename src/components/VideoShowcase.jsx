import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Grid } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CDN = 'https://zq6erlmzzbr6p1bk.public.blob.vercel-storage.com/videos'

const videos = [
  { title: 'Drain Catcher Hack', src: `${CDN}/drain-catcher.MP4` },
  { title: 'Alani Drink', src: `${CDN}/alani-drink-3.MP4` },
  { title: 'Korean Skincare', src: `${CDN}/korean-skincare.MP4` },
  { title: 'Penne Recipe', src: `${CDN}/penne-recipe.MP4` },
  { title: 'Nightly Skincare', src: `${CDN}/nightly-skincare.MP4` },
  { title: 'Ellaola Vitamin', src: `${CDN}/ellaola-vitamin.MP4` },
  { title: 'Xmas Slippers', src: `${CDN}/xmas-slippers.MP4` },
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
          <h2 className="section-heading">Videos That Perform</h2>
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
            onClick={() => setMuted((m) => !m)}
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
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-warm bg-charcoal">
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={src}
                    muted={muted}
                    loop
                    playsInline
                    preload="metadata"
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
      </div>
    </section>
  )
}
