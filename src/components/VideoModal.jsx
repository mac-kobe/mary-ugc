import { useState, useRef } from 'react'
import { Volume2, VolumeX, X } from 'lucide-react'
import { posterFor } from '../data/videos'

export default function VideoModal({ video, muted, modalVideoRef, onClose, onToggleMute }) {
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
