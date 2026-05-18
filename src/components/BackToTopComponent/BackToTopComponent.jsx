import { useState, useEffect, useRef } from "react"
import { CgArrowLongUp } from "react-icons/cg"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const scrollPos = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      scrollPos.current = position
      setIsVisible(position > 300)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollPercentage = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    return `${Math.min((scrollPos.current / maxScroll) * 100, 100)}%`
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 h-1 bg-accent z-50 pointer-events-none"
        style={{ width: scrollPercentage(), transition: "width 100ms linear" }}
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
