import { useState, useEffect, useRef, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { CgClose } from "react-icons/cg"
import { FiMenu } from "react-icons/fi"
import { Link as RouterLink } from "react-router-dom"
import { NAV_LINKS } from "../../data/menuItems"
import { LanguageSwitcher } from "../LanguageSwitcher"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

const ResponsiveHeader = () => {
  const { t } = useTranslation()
  const lang = useCurrentLanguage()
  const [responsiveMenu, setResponsiveMenu] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  const toggleMenu = useCallback(() => setResponsiveMenu((prev) => !prev), [])
  const closeMenu = useCallback(() => setResponsiveMenu(false), [])

  useEffect(() => {
    if (responsiveMenu) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [responsiveMenu])

  useEffect(() => {
    if (!responsiveMenu) return
    const handleEscape = (e) => {
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [responsiveMenu, closeMenu])

  useEffect(() => {
    if (!responsiveMenu) return
    const timer = setTimeout(() => {
      const firstLink = menuRef.current?.querySelector("a")
      firstLink?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [responsiveMenu])

  return (
    <div className="z-[9999] block lg:hidden w-full py-4 bg-dark3">
      <div className="topbar w-full z-[9999]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between w-full topbarInner">
            <div className="logo inline-block max-w-[50%]">
              <RouterLink to={`/${lang}`} title={t("nav.homeTitle")} className="flex items-center text-white font-Poppins font-bold text-[2rem]">
                YAMPI <span className="text-accent">DEV</span>
              </RouterLink>
            </div>
            <LanguageSwitcher className="mx-2" />
            <button
              ref={toggleRef}
              className="flex items-center justify-center w-10 h-10 bg-accent rounded cursor-pointer resMenuBtn hover:bg-shapBgDark text-white"
              onClick={toggleMenu}
              aria-label={responsiveMenu ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={responsiveMenu}
            >
              {responsiveMenu ? <CgClose size="20" /> : <FiMenu size="20" />}
            </button>
          </div>
        </div>
      </div>
      {responsiveMenu && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.sideMenu")}
        className={`sideMenu bg-[#000]/90 backdrop-blur-sm fixed transition-all ease-in-out duration-300 z-[9999] top-0 h-screen w-64 px-8 py-16 ${
          responsiveMenu ? "right-0" : "right-[-100%]"
        }`}
      >
        <button
          className="absolute right-4 top-4 text-white hover:text-accent cursor-pointer"
          onClick={closeMenu}
          aria-label={t("nav.closeMenu")}
        >
          <CgClose size={20} />
        </button>
        <ul className="w-full flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.hash}>
              <RouterLink
                to={`/${lang}#${link.hash}`}
                className="text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase text-white hover:text-accent block cursor-pointer"
                title={t(`nav.${link.key}`)}
                onClick={closeMenu}
              >
                {t(`nav.${link.key}`)}
              </RouterLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ResponsiveHeader
