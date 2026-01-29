import { useEffect, useMemo, useState } from "react"

export interface CardStackItem {
  id: number
  title: string
  description: string
  imageSrc: string
  href?: string
}

interface CardStackProps {
  items: CardStackItem[]
  initialIndex?: number
  autoAdvance?: boolean
  intervalMs?: number
  pauseOnHover?: boolean
  showDots?: boolean
}

export function CardStack({
  items,
  initialIndex = 0,
  autoAdvance = false,
  intervalMs = 3000,
  pauseOnHover = false,
  showDots = false,
}: CardStackProps) {
  const safeItems = useMemo(() => items.filter(Boolean), [items])
  const [activeIndex, setActiveIndex] = useState(
    safeItems.length ? initialIndex % safeItems.length : 0
  )
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!autoAdvance || safeItems.length <= 1 || (pauseOnHover && isPaused)) {
      return
    }
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeItems.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [autoAdvance, intervalMs, safeItems.length, pauseOnHover, isPaused])

  if (!safeItems.length) {
    return null
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="relative h-[320px] md:h-[380px] lg:h-[420px]">
        {safeItems.map((item, index) => {
          let offset = index - activeIndex
          const half = Math.floor(safeItems.length / 2)
          if (offset > half) offset -= safeItems.length
          if (offset < -half) offset += safeItems.length

          const isActive = offset === 0
          const translateX = offset * 210
          const translateY = Math.abs(offset) * 6
          const scale = 1 - Math.abs(offset) * 0.03
          const rotate = offset * 12
          const opacity = Math.abs(offset) > 3 ? 0 : 1
          const zIndex = safeItems.length - Math.abs(offset)

          const card = (
            <div
              className="absolute left-1/2 top-0 h-full w-[64%] rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_22px_44px_-30px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out"
              style={{
                transform: `translate(-50%, 0) translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity,
                zIndex,
              }}
            >
              <div className="grid h-full w-full grid-rows-[1fr_auto] overflow-hidden rounded-[2rem] bg-[#202a2d]">
                <div className="relative">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                </div>
                <div className="p-6 md:p-8 text-white">
                  <h3 className="font-['DM_Serif_Display'] text-3xl md:text-4xl tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-base md:text-lg font-light">
                    {item.description}
                  </p>
                </div>
              </div>
              {isActive && (
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/15" />
              )}
            </div>
          )

          return item.href ? (
            <a
              key={item.id}
              href={item.href}
              className="absolute inset-0"
              style={{ zIndex }}
            >
              {card}
            </a>
          ) : (
            <div key={item.id} className="absolute inset-0" style={{ zIndex }}>
              {card}
            </div>
          )
        })}
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          className="h-9 w-9 rounded-full border border-[#202a2d]/25 text-[#202a2d] hover:border-[#202a2d] transition-colors"
          onClick={() =>
            setActiveIndex((prev) =>
              (prev - 1 + safeItems.length) % safeItems.length
            )
          }
        >
          <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {showDots && (
          <div className="flex items-center justify-center gap-2">
            {safeItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to item ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === activeIndex ? "bg-[#202a2d]" : "bg-[#202a2d]/30"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label="Next"
          className="h-9 w-9 rounded-full border border-[#202a2d]/25 text-[#202a2d] hover:border-[#202a2d] transition-colors"
          onClick={() =>
            setActiveIndex((prev) => (prev + 1) % safeItems.length)
          }
        >
          <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
