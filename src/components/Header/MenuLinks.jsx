import { FiChevronDown } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import PatternImg2 from "../../assets/images/patternImg2.jpg";

const MenuLinks = ({ pdf_link }) => {
  const { title, file, url } = pdf_link || {};

  return (
    <nav className="relative hidden lg:block">
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-10">
        <RouterLink
          to="/#about"
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          title="Sobre mí"
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Sobre mí
          </span>
        </RouterLink>
        <RouterLink
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="/#workExperience"
          title="Experiencia laboral"
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Experiencia laboral
          </span>
        </RouterLink>
        <RouterLink
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="/#portfolio"
          smooth={true}
          duration={500}
          offset={-100}
          title="portfolio"
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Portfolio
          </span>
        </RouterLink>
        <RouterLink
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="/#services"
          title="Servicios"
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Servicios
          </span>
        </RouterLink>

        <RouterLink
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="/#contact"
          title="Contacto"
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Contacto
          </span>
        </RouterLink>
        <a
          className="bg-white text-accent text-[1rem] font-Poppins font-bold uppercase rounded-[5px] md:rounded-[10px] md:px-5 lg:px-5 xl:px-5 px-7 md:py-[.3rem] py-[04px] hover:bg-accent hover:text-white text-center inline-block cursor-pointer"
          href={`${file}`}
          target="_blank"
          title={title}
        >
          Descargar CV
        </a>
      </ul>
    </nav>
  );
};

export default MenuLinks;
