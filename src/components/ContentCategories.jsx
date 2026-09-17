import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Grid, Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { homeCategories, posterFor } from '../data/videos'
import VideoModal from './VideoModal'

gsap.registerPlugin(ScrollTrigger)

// Alternating band palettes, all drawn from the "Warm Kitchen Table" system
const palettes = [
  {
    band: 'bg-terracotta',
    heading: 'text-cream',
    tagline: 'text-cream/75',
    ring: 'ring-[#E8B39B]',
    label: 'text-cream',
    play: 'bg-cream/90 text-terracotta',
    arrow: 'bg-cream text-terracotta hover:bg-white',
  },
  {
    band: 'bg-linen',
    heading: 'text-terracotta',
    tagline: 'text-charcoal/60',
    ring: 'ring-terracotta/25',
    label: 'text-charcoal',
    play: 'bg-white/90 text-terracotta',
    arrow: 'bg-white text-charcoal hover:bg-terracotta hover:text-white',
  },
  {
    band: 'bg-sage',
    heading: 'text-cream',
    tagline: 'text-cream/75',
    ring: 'ring-[#B9C6AF]',
    label: 'text-cream',
    play: 'bg-cream/90 text-sage',
    arrow: 'bg-cream text-sage hover:bg-white',
  },
  {
    band: 'bg-[#F6E4DA]',
    heading: 'text-terracotta',
    tagline: 'text-charcoal/60',
    ring: 'ring-terracotta/30',
    label: 'text-charcoal',
    play: 'bg-white/90 text-terracotta',
    arrow: 'bg-white text-charcoal hover:bg-terracotta hover:text-white',
  },
]

// Horizontal snap carousel of poster tiles with prev/next arrows
function TileCarousel({ videos, palette: p, onSelect }) {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const t = trackRef.current
    if (!t) return
    setCanPrev(t.scrollLeft > 4)
    setCanNext(t.scrollLeft + t.clientWidth < t.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const t = trackRef.current
    if (!t) return
    updateArrows()
    t.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      t.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByPage = (dir) => {
    const t = trackRef.current
    if (!t) return
    const tile = t.querySelector('.cc-tile')
    const step = tile ? tile.offsetWidth * 2 + 24 : t.clientWidth * 0.8
    t.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const arrowBase =
    'absolute top-[40%] z-10 w-10 h-10 rounded-full shadow-warm-lg flex items-center justify-center transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        disabled={!canPrev}
        aria-label="Previous videos"
        className={`${arrowBase} ${p.arrow} left-1 sm:-left-2 lg:-left-14`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => scrollByPage(1)}
        disabled={!canNext}
        aria-label="More videos"
        className={`${arrowBase} ${p.arrow} right-1 sm:-right-2 lg:-right-14`}
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 scroll-px-5 sm:-mx-2 sm:px-2 sm:scroll-px-2 pt-1 pb-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => onSelect(video)}
            className="cc-tile group flex-shrink-0 w-[40vw] max-w-[13rem] sm:w-48 md:w-52 snap-start text-left focus:outline-none"
            aria-label={`Play ${video.title}`}
          >
            <div
              className={`relative aspect-[9/16] rounded-2xl overflow-hidden ring-4 ${p.ring} bg-charcoal/10 shadow-warm-lg transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1`}
            >
              <img
                src={posterFor(video.src)}
                alt={video.title}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${p.play} backdrop-blur-sm shadow-warm flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                >
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </span>
              </div>
            </div>
            <p className={`font-inter font-medium text-sm sm:text-[15px] text-center mt-3 ${p.label}`}>
              {video.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ContentCategories({ onOpenPortfolio }) {
  const sectionRef = useRef(null)
  const modalVideoRef = useRef(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cc-header > *', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.cc-header', start: 'top 85%' },
      })

      sectionRef.current.querySelectorAll('.cc-band').forEach((band) => {
        gsap.from(band.querySelectorAll('.cc-band-head > *'), {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: band, start: 'top 80%' },
        })
        gsap.from(band.querySelectorAll('.cc-tile'), {
          opacity: 0,
          y: 30,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: band, start: 'top 75%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Lock page scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!activeVideo) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveVideo(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [activeVideo])

  // Set muted directly on the element in the click handler so it counts as a user gesture
  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      if (modalVideoRef.current) modalVideoRef.current.muted = next
      return next
    })
  }, [])

  return (
    <section id="videos" ref={sectionRef} className="relative pt-20 md:pt-28 pb-20 md:pb-28 bg-cream">
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          muted={muted}
          modalVideoRef={modalVideoRef}
          onClose={() => setActiveVideo(null)}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Section header */}
      <div className="cc-header text-center max-w-2xl mx-auto px-5 sm:px-6 pb-14 md:pb-16">
        <p className="section-label">Featured Content</p>
        <h2 className="section-heading">Some of my work!</h2>
        <p className="font-inter text-charcoal/60 leading-relaxed">
          From the kitchen table to the bathroom counter, here’s a taste of the kinds of
          content I make for brands. Tap any video to watch.
        </p>
      </div>

      {/* Category bands */}
      {homeCategories.map((cat, i) => {
        const p = palettes[i % palettes.length]
        return (
          <div key={cat.name} className={`cc-band ${p.band} py-14 md:py-20`}>
            <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="cc-band-head text-center mb-8 md:mb-10">
                <h3 className={`font-playfair italic font-medium text-4xl sm:text-5xl md:text-6xl leading-tight ${p.heading}`}>
                  {cat.name}
                </h3>
                <p className={`font-inter text-sm md:text-base mt-3 ${p.tagline}`}>{cat.tagline}</p>
              </div>

              <TileCarousel videos={cat.videos} palette={p} onSelect={setActiveVideo} />
            </div>
          </div>
        )
      })}

      {/* View all + social CTAs */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 px-5 pt-14 md:pt-16">
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
    </section>
  )
}
