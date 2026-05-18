import { Link as RouterLink } from "react-router-dom"
import { FiExternalLink } from "react-icons/fi"
import { NAV_LINKS } from "../../data/menuItems"

const MenuLinks = ({ pdf_link }) => {
  const pdfUrl = pdf_link?.file
  const pdfTitle = pdf_link?.title || "Descargar CV"

  return (
    <nav className="relative hidden lg:block" aria-label="Navegación principal">
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <RouterLink
              to={link.to}
              className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase text-white hover:text-accent transition-colors duration-300 block cursor-pointer"
              title={link.title}
            >
              {link.label}
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
