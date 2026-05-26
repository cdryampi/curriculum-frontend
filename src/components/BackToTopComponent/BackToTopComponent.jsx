import { useState, useEffect, useRef } from "react"
import { CgArrowLongUp } from "react-icons/cg"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sentinelRef = useRef(null)

  useEffect(() => {
    // Check if scroll-timeline is natively supported
    const isSupported = window.CSS && CSS.supports("animation-timeline", "scroll()")
    setSupportsScrollTimeline(isSupported)

    // Fallback: only attach window scroll listener if CSS scroll-driven animations are not supported
    if (!isSupported) {
      const handleScroll = () => {
        const scrolled = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const percentage = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0
        setScrollProgress(percentage)
      }
      window.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll() // Initialize
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Use high-performance IntersectionObserver instead of a scroll listener to detect if page scrolled > 300px
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Sentinel for IntersectionObserver to toggle visibility when scrolled past 300px */}
      <div
        ref={sentinelRef}
        className="absolute top-[300px] left-0 w-1 h-1 pointer-events-none opacity-0"
        aria-hidden="true"
      />
      {/* Scroll Progress Bar: Native CSS animation if supported, else JS fallback */}
      <div
        className={`fixed top-0 left-0 h-1 bg-accent z-50 pointer-events-none ${
          supportsScrollTimeline ? "scroll-progress-bar w-full" : ""
        }`}
        style={supportsScrollTimeline ? undefined : { width: `${scrollProgress}%`, transition: "width 100ms linear" }}
        aria-hidden="true"
      />
      <button
        className={`fixed z-50 bottom-4 right-4 bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer hover:bg-accent/80 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <CgArrowLongUp />
      </button>
    </>
  )
}

export default ScrollToTopButton

