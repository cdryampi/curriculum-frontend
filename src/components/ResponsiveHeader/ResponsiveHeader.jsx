import { useState } from "react";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const ResponsiveHeader = () => {
  const [responsiveMenu, setResponsiveMenu] = useState(false);
  const showResponsiveSideMenu = () => setResponsiveMenu(!responsiveMenu);

  return (
    <div className="z-[9999] block lg:hidden w-full py-4 bg-dark3">
      <div className="topbar w-full z-[9999]">
        <div className="container mx-auto sm:container md:container lg:container xl:container 2xl:container">
          <div className="flex items-center justify-between w-full topbarInner">
            <div className="logo inline-block max-w-[50%]">
              <Link
                to="/"
                title="ir a la página de inicio"
                className="flex items-center text-white font-Poppins font-bold text-[2rem]"
              >
                YAMPI <span className="text-accent">DEV</span>
              </Link>
              {/* Logo */}
            </div>
            <span
              className="flex items-center justify-center w-10 h-10 bg-accent rounded cursor-pointer resMenuBtn hover:bg-shapBgDark text-white"
              onClick={showResponsiveSideMenu}
            >
              <FiMenu size="20"></FiMenu>
            </span>
          </div>
          {/* Topbar Inner */}
        </div>
        {/* Topbar */}
      </div>
      <div
        className="backdrop-blur-md fixed transition-all ease-in-out duration-300 top-0 left-0 h-screen w-screen z-[9999]"
        style={{
          opacity: responsiveMenu ? "1" : "0",
          visibility: responsiveMenu ? "visible" : "hidden",
        }}
        onClick={showResponsiveSideMenu}
      ></div>
      <div
        className="sideMenu bg-[#000]/90 backdrop-blur-sm fixed transition-all ease-in-out duration-300 z-[9999] top-0 h-screen w-64 px-8 py-16"
        style={{ right: responsiveMenu ? "0" : "-100%" }}
      >
        <span
          className="mirror absolute right-4 top-4"
          onClick={showResponsiveSideMenu}
        >
          <CgClose
            className="text-white cursor-pointer hover:text-accent"
            size={20}
          ></CgClose>
        </span>
        <ul
          className="w-full flex flex-col gap-4"
          // responsivemenu={responsiveMenu}
        >
          <RouterLink
            to="/#about"
            className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
            title="Sobre mí"
            onClick={showResponsiveSideMenu}
          >
            <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
              Sobre mí
            </span>
          </RouterLink>
          <RouterLink
            className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
            to="/#workExperience"
            title="Experiencia laboral"
            onClick={showResponsiveSideMenu}
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
            onClick={showResponsiveSideMenu}
          >
            <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
              Portfolio
            </span>
          </RouterLink>
          <RouterLink
            className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
            to="/#services"
            title="Servicios"
            onClick={showResponsiveSideMenu}
          >
            <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
              Servicios
            </span>
          </RouterLink>

          <RouterLink
            className="menuItemHasChildren relative group text-[1rem] lg:text-[1.125rem] font-Poppins font-semibold uppercase"
            to="/#contact"
            title="Contacto"
            onClick={showResponsiveSideMenu}
          >
            <span className="group-hover:text-accent text-white pr-5 relative block cursor-pointer">
              Contacto
            </span>
          </RouterLink>
        </ul>
      </div>
      {/* Responsive Header */}
    </div>
  );
};

export default ResponsiveHeader;
