import { Link as RouterLink } from "react-router-dom";
import { NAV_LINKS } from "../../data/menuItems";

const MenuLinks = ({ pdf_link }) => {
  const { title, file } = pdf_link || {};

  return (
    <nav className="relative hidden lg:block">
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-10">
        {NAV_LINKS.map((link) => (
          <RouterLink
            key={link.to}
            to={link.to}
            className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
            title={link.title}
          >
            <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
              {link.label}
            </span>
          </RouterLink>
        ))}
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
