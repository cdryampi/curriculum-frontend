import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-scroll";
import PatternImg2 from "../../assets/images/patternImg2.jpg";

const MenuLinks = () => {
  return (
    <nav className="relative hidden lg:block">
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-10">
        <Link
          to="about"
          smooth={true}
          duration={500}
          offset={-100}
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Sobre mí
          </span>
        </Link>
        <Link
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="workExperience"
          smooth={true}
          duration={500}
          offset={-100}
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Experiencia laboral
          </span>
        </Link>
        <Link
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="portfolio"
          smooth={true}
          duration={500}
          offset={-100}
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Portfolio
          </span>
        </Link>
        <Link
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="services"
          smooth={true}
          duration={500}
          offset={-100}
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Servicios
          </span>
        </Link>

        <Link
          className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
          to="contact"
          smooth={true}
          duration={500}
          offset={-100}
        >
          <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
            Contacto
          </span>
        </Link>
      </ul>
    </nav>
  );
};

export default MenuLinks;
