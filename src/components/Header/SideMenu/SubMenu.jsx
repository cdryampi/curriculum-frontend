import React, { useState } from "react";
import { Link } from "react-scroll";
const SubMenu = ({ item, toggleSideMenu }) => {
  return (
    <>
      <li>
        <span className="flex justify-between items-center w-full relative">
          <Link
            className="text-white block font-Poppins text-[2rem] font-medium uppercase hover:text-accent relative w-full pr-4 z-[1] cursor-pointer"
            to={item.path}
            smooth={true}
            duration={500}
            offset={-100}
            title={item.title}
            onClick={toggleSideMenu}
          >
            {item.title}
          </Link>
        </span>
      </li>
    </>
  );
};

export default SubMenu;
