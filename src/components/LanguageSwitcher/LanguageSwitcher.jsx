import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { SUPPORTED_LANGUAGES, getSupportedLanguage } from "../../i18n/languages"

const LanguageSwitcher = ({ className = "" }) => {
  const { t, i18n } = useTranslation()
  const { lang } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const currentLanguage = getSupportedLanguage(lang || i18n.resolvedLanguage)

  useEffect(() => {
    if (i18n.resolvedLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  const changeLanguage = (nextLanguage) => {
    const segments = location.pathname.split("/").filter(Boolean)
    if (segments.length && SUPPORTED_LANGUAGES.some((language) => language.code === segments[0])) {
      segments[0] = nextLanguage
    } else {
      segments.unshift(nextLanguage)
    }
    i18n.changeLanguage(nextLanguage)
    navigate(`/${segments.join("/")}${location.search}${location.hash}`)
  }

  return (
    <label className={`inline-flex items-center gap-2 text-white font-Poppins text-xs uppercase ${className}`}>
      <span className="sr-only">{t("common.language")}</span>
      <select
        value={currentLanguage}
        onChange={(event) => changeLanguage(event.target.value)}
        className="bg-dark3 border border-accent rounded-full px-3 py-1 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={t("common.language")}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default LanguageSwitcher
