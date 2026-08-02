import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FiChevronDown } from "react-icons/fi"
import { SUPPORTED_LANGUAGES, getSupportedLanguage } from "../../i18n/languages"
import Flag from "./Flags"

const LanguageSwitcher = ({ className = "" }) => {
  const { t, i18n } = useTranslation()
  const { lang } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const currentLanguage = getSupportedLanguage(lang || i18n.resolvedLanguage)

  useEffect(() => {
    if (i18n.resolvedLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const changeLanguage = (nextLanguage) => {
    const segments = location.pathname.split("/").filter(Boolean)
    if (segments.length && SUPPORTED_LANGUAGES.some((language) => language.code === segments[0])) {
      segments[0] = nextLanguage
    } else {
      segments.unshift(nextLanguage)
    }
    i18n.changeLanguage(nextLanguage)
    navigate(`/${segments.join("/")}${location.search}${location.hash}`)
    setOpen(false)
  }

  const current =
    SUPPORTED_LANGUAGES.find((language) => language.code === currentLanguage) || SUPPORTED_LANGUAGES[0]

  return (
    <div ref={rootRef} className={`relative inline-block text-white font-Poppins text-xs uppercase ${className}`}>
      <button
        type="button"
        className="flex items-center gap-2 bg-dark3 border border-accent rounded-full px-3 py-1.5 hover:bg-accent2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("common.language")}
      >
        <Flag code={current.code} className="w-4 h-3 rounded-[2px] shadow" />
        <span>{current.code.toUpperCase()}</span>
        <FiChevronDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          size={12}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("common.language")}
          className="absolute right-0 mt-2 w-40 bg-dark3 border border-accent/40 rounded-lg overflow-hidden shadow-xl z-[10000]"
        >
          {SUPPORTED_LANGUAGES.map((language) => {
            const selected = language.code === currentLanguage
            return (
              <button
                key={language.code}
                type="button"
                role="option"
                aria-selected={selected}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left text-[0.8rem] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected ? "bg-accent/25 text-white" : "text-white/80 hover:bg-accent2 hover:text-white"
                }`}
                onClick={() => changeLanguage(language.code)}
              >
                <Flag code={language.code} className="w-4 h-3 rounded-[2px] shadow" />
                <span>{language.name}</span>
                {selected && <span className="ml-auto text-accent" aria-hidden="true">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
