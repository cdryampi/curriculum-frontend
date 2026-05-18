import { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react"
import { Link as RouterLink } from "react-router-dom"
import { CgClose, CgMenuRight } from "react-icons/cg"
import { SocialLinks } from "../SocialLinks"
import MenuLinks from "./MenuLinks"
import { ResponsiveHeader } from "../ResponsiveHeader"
import { NAV_LINKS } from "../../data/menuItems"

const Header = ({ pdf }) => {
  const refHeader = useRef()
  const [sideMenu, setSideMenu] = useState(false)
  const sideMenuRef = useRef(null)
  const toggleSideMenu = useCallback(() => setSideMenu((prev) => !prev), [])

  useLayoutEffect(() => {
    const header = document.getElementById("header")
    if (!refHeader.current) return
    const fixedTop = refHeader.current.offsetTop
    const stickyHeader = () => {
      if (window.pageYOffset > fixedTop) {
        header.classList.add("stickyHeader")
      } else {
        header.classList.remove("stickyHeader")
      }
    }
    window.addEventListener("scroll", stickyHeader)
    return () => window.removeEventListener("scroll", stickyHeader)
  }, [])

  useEffect(() => {
    if (sideMenu) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [sideMenu])

  useEffect(() => {
    if (!sideMenu) return
    const handleEscape = (e) => {
      if (e.key === "Escape") setSideMenu(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [sideMenu])

  useEffect(() => {
    if (!sideMenu) return
    const timer = setTimeout(() => {
      const firstLink = sideMenuRef.current?.querySelector("a")
      firstLink?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [sideMenu])

  return (
    <>
      <header className="z-[9999] hidden lg:block" ref={refHeader} id="header">
        <div className="topbar fixed md:top-[1.875rem] lg:top-[4rem] xl:top-[5rem] top-[1.25rem] left-0 w-full z-[9999]">
          <div className="container mx-auto">
            <div className="flex items-center justify-between w-full topbarInner">
              <div className="logo inline-block max-w-[50%]">
                <RouterLink to="/" title="ir a la página de inicio" className="flex items-center text-white font-Poppins font-bold text-[1.5rem]">
                  YAMPI <span className="text-accent ml-3">DEV</span>
                </RouterLink>
              </div>
              <div className="hidden menuWrapper">
                <MenuLinks pdf_link={pdf} />
              </div>
            </div>
          </div>
        </div>
        <div className="menuWrap hidden lg:flex flex-col items-center justify-between fixed left-[3.4375rem] top-[5.625rem] bottom-[5.625rem] border-2 border-solid border-accent rounded-full z-[9999] w-[6.25rem] px-5 py-[3.125rem]">
          <button
            className="mirror cursor-pointer"
            onClick={toggleSideMenu}
            aria-label="Abrir menú lateral"
            aria-expanded={sideMenu}
          >
            <CgMenuRight className="text-white hover:text-accent" size={32} />
          </button>
          <div className="flex flex-col items-center justify-center gap-8 menuInner">
            <SocialLinks />
            <span className="h-[2.5rem] sm:h-[3rem] md:h-[5.625rem] bg-accent w-[1px]"></span>
            <h5 className="uppercase text-white font-Poppins font-bold text-[1rem]" style={{ textOrientation: "mixed", writingMode: "vertical-rl", transform: "matrix(-1, 0, 0, -1, 0, 0)" }}>
              Follow Me
            </h5>
          </div>
        </div>
        {sideMenu && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={() => setSideMenu(false)}
            aria-hidden="true"
          />
        )}
        <div
          ref={sideMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={`sideMenu bg-[#000] fixed transition-all ease-in-out duration-300 z-[9999] top-0 h-screen w-screen flex justify-center items-center px-8 py-16 overflow-y-scroll ${
            sideMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <button
            className="absolute right-10 top-4 cursor-pointer"
            onClick={() => setSideMenu(false)}
            aria-label="Cerrar menú"
          >
            <CgClose className="text-white hover:text-accent" size={40} />
          </button>
          <ul className="flex flex-col gap-4 w-80">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <RouterLink
                  to={link.to}
                  className="text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase text-white hover:text-accent block cursor-pointer"
                  title={link.title}
                  onClick={() => setSideMenu(false)}
                >
                  {link.label}
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <ResponsiveHeader />
    </>
  )
}

export default Header
