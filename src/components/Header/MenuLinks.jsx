import { Link as RouterLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FiExternalLink } from "react-icons/fi"
import { NAV_LINKS } from "../../data/menuItems"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

const MenuLinks = ({ pdf_link }) => {
  const { t } = useTranslation()
  const lang = useCurrentLanguage()
  const pdfUrl = pdf_link?.file
  const pdfTitle = pdf_link?.title || t("nav.downloadCv")

  return (
    <nav className="relative hidden lg:block" aria-label={t("nav.main")}>
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.hash}>
            <RouterLink
              to={`/${lang}#${link.hash}`}
              className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase text-white hover:text-accent transition-colors duration-300 block cursor-pointer"
              title={t(`nav.${link.key}`)}
            >
              {t(`nav.${link.key}`)}
            </RouterLink>
          </li>
        ))}
        {pdfUrl && (
          <li>
            <a
              className="text-accent hover:text-white text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase inline-flex items-center gap-1.5 transition-colors duration-300 cursor-pointer"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={pdfTitle}
            >
              {pdfTitle} <FiExternalLink className="inline" size={14} />
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default MenuLinks
