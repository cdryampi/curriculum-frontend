import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CgClose, CgMenuRight } from "react-icons/cg";
import { SocialLinks } from "../SocialLinks";
import MenuLinks from "./MenuLinks";
import { MenuData } from "./SideMenu/MenuData";
import SubMenu from "./SideMenu/SubMenu";
import { ResponsiveHeader } from "../ResponsiveHeader";

const Header = ({ pdf }) => {
  const refHeader = useRef();
  const [sideMenu, setSideMenu] = useState(false);
  const showSideMenu = () => setSideMenu(!sideMenu);
  const toggleSideMenu = () => {
    setSideMenu((prev) => !prev);
  };
  const pdf_link = pdf;

  useLayoutEffect(() => {
    const header = document.getElementById("header");
    let fixedTop = refHeader.current.offsetTop;
    const stickyHeader = () => {
      if (window.pageYOffset > fixedTop) {
        header.classList.add("stickyHeader");
      } else {
        header.classList.remove("stickyHeader");
      }
    };
    window.addEventListener("scroll", stickyHeader);
  }, []);

  return (
    <React.Fragment>
      <header className="z-[9999] hidden lg:block" ref={refHeader} id="header">
        <div className="topbar fixed md:top-[1.875rem] lg:top-[4rem] xl:top-[5rem] top-[1.25rem] left-0 w-full z-[9999]">
          <div className="container mx-auto sm:container md:container lg:container xl:container 2xl:container">
            <div className="flex items-center justify-between w-full topbarInner">
              <div className="logo inline-block max-w-[50%]">
                <Link
                  to="/"
                  title="ir a la página de inicio"
                  className="flex items-center text-white font-Poppins font-bold text-[1.5rem]"
                >
                  YAMPI <span className="text-accent ml-3">DEV</span>
                </Link>
              </div>
              <div className="hidden menuWrapper">
                <MenuLinks pdf_link={pdf_link}></MenuLinks>
              </div>
            </div>
            {/* Topbar Inner */}
          </div>
          {/* Topbar */}
        </div>
        <div className="menuWrap hidden lg:flex flex-col items-center justify-between fixed left-[3.4375rem] top-[5.625rem] bottom-[5.625rem] border-2 border-solid border-accent rounded-full z-[9999] w-[6.25rem] px-5 py-[3.125rem]">
          <span className="mirror" onClick={showSideMenu}>
            <CgMenuRight
              className="text-white cursor-pointer hover:text-accent"
              size={32}
            ></CgMenuRight>
          </span>
          <div className="flex flex-col items-center justify-center gap-8 menuInner">
            <SocialLinks></SocialLinks>
            <span className="h-[2.5rem] sm:h-[3rem] md:h-[5.625rem] bg-accent w-[1px]"></span>
            <h5
              className="uppercase text-white font-Poppins font-bold text-[1rem]"
              style={{
                textOrientation: "mixed",
                writingMode: "vertical-rl",
                transform: "matrix(-1, 0, 0, -1, 0, 0)",
              }}
            >
              Follow Me
            </h5>
          </div>
          {/* Menu Wrap */}
        </div>
        <div
          className="sideMenu bg-[#000] fixed transition-all ease-in-out duration-300 z-[9999] top-0 h-screen w-screen flex justify-center items-center px-8 py-16 overflow-y-scroll"
          style={{
            opacity: sideMenu ? "1" : "0",
            visibility: sideMenu ? "visible" : "hidden",
          }}
        >
          <span
            className="mirror absolute right-10 top-4"
            onClick={showSideMenu}
          >
            <CgClose
              className="text-white cursor-pointer hover:text-accent"
              size={40}
            ></CgClose>
          </span>
          <ul className="flex flex-col gap-4 w-80">
            {MenuData.map((item, index) => {
              return (
                <SubMenu
                  item={item}
                  key={index}
                  toggleSideMenu={toggleSideMenu}
                />
              );
            })}
          </ul>
        </div>
        {/* Header */}
      </header>
      <ResponsiveHeader></ResponsiveHeader>
    </React.Fragment>
  );
};

export default Header;
