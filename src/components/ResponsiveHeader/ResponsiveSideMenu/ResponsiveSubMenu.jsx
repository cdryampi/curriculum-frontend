import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const ResponsiveSubMenu = ({ item, responsiveMenu }) => {
  return (
    <>
      <li>
        <span className="flex justify-between items-center w-full relative">
          <RouterLink
            className="text-white block font-Poppins text-[2rem] font-medium uppercase hover:text-accent relative w-full pr-4 z-[1] cursor-pointer"
            to={item?.path}
            title={item?.title}
            onClick={responsiveMenu}
          >
            {item?.title}
          </RouterLink>
        </span>
      </li>
    </>
  );
};

export default ResponsiveSubMenu;
