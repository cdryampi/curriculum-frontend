import React from "react";

const ProficiencyBar = ({ proficiency }) => (
    <div className="w-full bg-[#ede5f6] h-[7px] my-3 rounded-[2px]">
      <div
        className="bg-accent h-[7px] rounded-[2px] relative"
        style={{ width: `${proficiency}%` }}
      >
        <span className="text-dark bg-accent absolute rounded-[10px] font-Poppins font-medium text-[14px] py-[4px] px-[.9375rem] top-0 mt-[-13px] right-0 translate-x-2/4">
          {proficiency}%
        </span>
      </div>
    </div>
);

export default ProficiencyBar;