import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Volume2, VolumeX, ArrowLeft, X } from 'lucide-react'
import gsap from 'gsap'

const VIDEO_BASE = '/videos'

const posterFor = (src) => {
  const filename = src.split('/').pop().replace('.mp4', '.jpg')
  return `/images/posters/${filename}`
}

const allVideos = [
  { title: 'Drain Catcher Hack', src: `${VIDEO_BASE}/drain-catcher.mp4`, category: 'Product' },
  { title: 'Arroz con Pollo', src: `${VIDEO_BASE}/arroz-recipe.mp4`, category: 'Recipe' },
  { title: 'Breakfast Recipe', src: `${VIDEO_BASE}/breakfast-recipe.mp4`, category: 'Recipe' },
  { title: 'Penne Recipe', src: `${VIDEO_BASE}/penne-recipe.mp4`, category: 'Recipe' },
  { title: 'Meatball Recipe', src: `${VIDEO_BASE}/meatball-recipe.mp4`, category: 'Recipe' },
  { title: 'Alani Drink', src: `${VIDEO_BASE}/alani-drink.mp4`, category: 'Drink' },
  { title: 'Xmas Slippers', src: `${VIDEO_BASE}/xmas-slippers.mp4`, category: 'Product' },
  { title: 'Alani Drink #2', src: `${VIDEO_BASE}/alani-drink-2.mp4`, category: 'Drink' },
  { title: 'Alani Drink #3', src: `${VIDEO_BASE}/alani-drink-3.mp4`, category: 'Drink' },
  { title: 'Bloom Drink', src: `${VIDEO_BASE}/bloom-drink.mp4`, category: 'Drink' },
  { title: 'Coffee Mate Drink', src: `${VIDEO_BASE}/coffeemate-drink.mp4`, category: 'Drink' },
  { title: 'MaryRuth Drink', src: `${VIDEO_BASE}/maryruth-drink.mp4`, category: 'Drink' },
  { title: 'Ellaola Vitamin', src: `${VIDEO_BASE}/ellaola-vitamin.mp4`, category: 'Product' },
  { title: 'Korean Skincare', src: `${VIDEO_BASE}/korean-skincare.mp4`, category: 'Skincare' },
  { title: 'Korean Skincare #2', src: `${VIDEO_BASE}/korean-skincare-2.mp4`, category: 'Skincare' },
  { title: "L'Occitane Shower", src: `${VIDEO_BASE}/loccitane-shower.mp4`, category: 'Skincare' },
  { title: 'Medicube Skincare', src: `${VIDEO_BASE}/medicube-skincare.mp4`, category: 'Skincare' },
  { title: 'Nightly Skincare', src: `${VIDEO_BASE}/nightly-skincare.mp4`, category: 'Skincare' },
  { title: 'Parive Skincare', src: `${VIDEO_BASE}/parive-skincare.mp4`, category: 'Skincare' },
  { title: 'Tarte Makeup', src: `${VIDEO_BASE}/tarte-makeup.mp4`, category: 'Skincare' },
]

const categories = ['All', ...new Set(allVideos.map((v) => v.category))]

const colOffsets = [0, 0, 0]

function VideoModal({ video, muted, modalVideoRef, onClose, onToggleMute }) {
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startY = useRef(0)

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY
    setDragging(true)
  }

  const onTouchMove = (e) => {
    if (!dragging) return
    const dy = e.touches[0].clientY - startY.current
    if (dy > 0) setDragY(dy)
  }

  const onTouchEnd = () => {
    setDragging(false)
    if (dragY > 120) {
      onClose()
    } else {
      setDragY(0)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <div
        className="w-full max-w-sm mx-4 transition-transform"
        style={{
          transform: `translateY(${dragY}px)`,
          opacity: Math.max(0, 1 - dragY / 300),
          transition: dragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Swipe hint */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 rounded-full bg-white/40" />
        </div>
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
          <video
            ref={modalVideoRef}
            src={video.src}
            poster={posterFor(video.src)}
            autoPlay
            loop
            playsInline
            muted={muted}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onToggleMute}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
        <p className="text-center text-white font-inter font-medium mt-4">{video.title}</p>
        <p className="text-center text-white/50 font-inter text-sm mt-1">{video.category}</p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [activeVideo, setActiveVideo] = useState(null)
  const [muted, setMuted] = useState(true)
  const [loadedSrcs, setLoadedSrcs] = useState({})
  const videoRefs = useRef({})
  const cardRefs = useRef([])
  const scrollRef = useRef(null)
  const observerRef = useRef(null)
  const modalVideoRef = useRef(null)

  const filtered = filter === 'All' ? allVideos : allVideos.filter((v) => v.category === filter)

  // Toggle muted — set directly on all video elements in the click handler (synchronous)
  // so the browser treats it as a user gesture. React's muted prop doesn't reliably update the DOM.
  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      Object.values(videoRefs.current).forEach((vid) => {
        if (vid) vid.muted = next
      })
      if (modalVideoRef.current) {
        modalVideoRef.current.muted = next
      }
      return next
    })
  }, [])

  // Open video modal
  const openVideo = useCallback((idx) => {
    setLoadedSrcs((prev) => ({ ...prev, [idx]: true }))
    setActiveVideo(idx)
  }, [])

  // Close video modal
  const closeVideo = useCallback(() => {
    setActiveVideo(null)
  }, [])

  // Fade-in + lazy load videos on scroll
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const cards = cardRefs.current.filter(Boolean)
      if (!cards.length) return

      gsap.set(cards, { opacity: 0, y: 40 })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
              })
              const idx = entry.target.dataset.idx
              if (idx !== undefined) {
                setLoadedSrcs((prev) => ({ ...prev, [idx]: true }))
              }
              observer.unobserve(entry.target)
            }
          })
        },
        { root: scrollRef.current, rootMargin: '400px', threshold: 0.05 }
      )

      cards.forEach((card) => observer.observe(card))
      observerRef.current = observer
    })
    return () => {
      cancelAnimationFrame(raf)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [filter])

  useEffect(() => {
    setLoadedSrcs({})
    videoRefs.current = {}
    cardRefs.current = []
  }, [filter])

  // Distribute videos into columns
  const colCount = typeof window !== 'undefined'
    ? window.innerWidth >= 640 ? 3 : 2
    : 3

  const columns = Array.from({ length: colCount }, () => [])
  filtered.forEach((video, i) => {
    columns[i % colCount].push({ ...video, globalIdx: i })
  })

  return (
    <div ref={scrollRef} className="fixed inset-0 z-[90] bg-cream overflow-y-auto overscroll-contain">
      {/* Fullscreen modal — rendered on top so gallery keeps its scroll position */}
      {activeVideo !== null && (
        <VideoModal
          video={filtered[activeVideo]}
          muted={muted}
          modalVideoRef={modalVideoRef}
          onClose={closeVideo}
          onToggleMute={handleToggleMute}
        />
      )}
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-cream/90 backdrop-blur-md border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-inter text-sm text-charcoal/60 hover:text-terracotta transition-colors min-h-[44px]"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <p className="font-playfair text-xl text-charcoal">Content Gallery</p>
          <button
            onClick={handleToggleMute}
            className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors"
            aria-label={muted ? 'Unmute all' : 'Mute all'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-6 text-center">
        <p className="text-sage text-xs font-inter font-medium uppercase tracking-[0.15em] mb-3">Content Library</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">My Work</h1>
        <p className="font-inter text-charcoal/60 text-base max-w-lg mx-auto leading-relaxed">
          A collection of content I've created, from budget-friendly recipes to honest product reviews. Every video is real, relatable, and made with love.
        </p>
      </div>

      {/* Filter pills */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-inter text-sm transition-all duration-200 ${
                filter === cat
                  ? 'bg-terracotta text-white shadow-warm'
                  : 'bg-linen text-charcoal border border-charcoal/10 hover:bg-sage hover:text-white hover:border-sage'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest-style offset columns */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="flex gap-8 sm:gap-12">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="flex-1 flex flex-col"
              style={{ paddingTop: `${colOffsets[colIdx % colOffsets.length]}px` }}
            >
              {col.map(({ globalIdx, ...video }, rowIdx) => {
                const topMargin = rowIdx === 0 ? 0 : 48

                return (
                  <div
                    key={video.src}
                    ref={(el) => (cardRefs.current[globalIdx] = el)}
                    data-idx={globalIdx}
                    className="group"
                    style={{ marginTop: `${topMargin}px` }}
                  >
                    <div
                      className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-charcoal cursor-pointer shadow-warm hover:shadow-warm-xl transition-shadow duration-300"
                      onClick={() => openVideo(globalIdx)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[globalIdx] = el)}
                        src={loadedSrcs[globalIdx] ? video.src : undefined}
                        poster={posterFor(video.src)}
                        muted={muted}
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />

                      {/* Bottom gradient for text */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal/60 to-transparent" />

                      {/* Category tag */}
                      <span className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-inter font-medium rounded-full">
                        {video.category}
                      </span>

                      {/* Title */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="font-inter font-medium text-white text-sm drop-shadow-lg">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
