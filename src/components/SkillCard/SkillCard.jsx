import React from "react";
import ProficiencyBar from "../ProficiencyBar/ProficiencyBar";
import PatternImg2 from "../../assets/images/patternImg2.jpg";

const SkillCard = ({ skill }) => {
  return (
    <div
      className="rounded-[10px] text-center sm:rounded-[1.25rem] lg:rounded-[1.875rem] xl:rounded-[3.125rem] border-[5px] md:border-[10px] border-gray border-solid p-6 sm:pt-[2.1875rem] sm:pb-8 sm:px-10 relative before:absolute before:inset-0 before:bg-white before:rounded-[10px] before:sm:rounded-[1.25rem] before:md:rounded-[3.125rem] before:opacity-70 before:z-[-11] bg-blend-multiply bg-no-repeat bg-center bg-cover bg-white z-[1]"
      key={`${skill?.title}-${skill?.id}`}
      style={{ backgroundImage: `url(${PatternImg2})` }}
    >
      <span className="bg-white text-center rounded-[10px] sm:rounded-[1.25rem] h-[4.375rem] w-[4.375rem] inline-flex items-center border-[3px] border-[#f2eafa] border-solid justify-center">
        <img
          src={skill?.logo?.file}
          alt={skill?.title}
          className="w-20 h-20 object-contain mb-3 text-center"
        />
      </span>

      <div className="skillInfo justify-content-center text-center flex flex-col w-full mt-3 gap-[8px] pb-6">
        <h3 className="text-accent2 text-[1.375rem] font-Poppins font-bold">
          {skill?.title}
        </h3>
        <p className="text-[1rem] md:text-[1.125rem] font-normal font-NunitoSans text-desc2">
          {skill?.categoria}
        </p>
      </div>
      <div className="w-full bg-[#ede5f6] h-[7px] my-3 rounded-[2px]">
        <ProficiencyBar proficiency={skill?.proficiency} />
      </div>
    </div>
  );
};
export default SkillCard;
