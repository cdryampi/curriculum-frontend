import React, { useState } from "react"
import { BsPlus, BsDash } from "react-icons/bs"
import { TagsDisplay } from "../Tag"

const EducationCard = React.memo(({ education }) => {
  const [expand, setExpand] = useState(false)
  const toggleExpand = () => setExpand(!expand)
  const descId = `edu-desc-${education?.id}`

  return (
    <div className="eduBox bg-white relative rounded-[10px] sm:rounded-[1.25rem] lg:rounded-[1.875rem] xl:rounded-[3.125rem] gap-2 flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left p-2 md:p-10 w-full">
      <div className="eduBoxInfo flex flex-col md:flex-row items-center gap-2">
        <button
          onClick={toggleExpand}
          className="bg-gray rounded-[10px] h-[3.125rem] w-[3.125rem] inline-flex items-center justify-center cursor-pointer hover:bg-gray/80 transition-colors duration-200"
          aria-expanded={expand}
          aria-controls={descId}
          aria-label={expand ? "Colapsar descripción" : "Expandir descripción"}
        >
          {expand ? <BsDash className="fill-accent" size="2.3rem" /> : <BsPlus className="fill-accent" size="2.3rem" />}
        </button>
      </div>
      <div className="text-accent2 text-[1.375rem] font-Poppins font-bold flex-1">
        <h3 className="text-accent2 text-[1.375rem] font-Poppins font-bold">{education?.title}</h3>
        <h4 className="text-accent text-[1.375rem] font-Poppins font-bold">{education?.subtitle}</h4>
        <p><span className="text-accent font-NunitoSans font-semibold text-[1rem] md:text-[1.0625rem]">{education?.institution}</span></p>
        <p className="text-desc2 text-[1rem] md:text-[1.125rem] font-NunitoSans mt-2">
          <span className="eduDate relative rounded-[10px] text-white font-Poppins font-medium text-[1rem] bg-accent px-5 py-[7px]">
            {education?.start_year} - {education?.end_year}
          </span>
        </p>
        <div
          id={descId}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expand ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="text-desc2 text-[1rem] md:text-[1.125rem] font-NunitoSans p-2" dangerouslySetInnerHTML={{ __html: education?.description }} />
          <TagsDisplay tags={education?.tags} />
        </div>
      </div>
    </div>
  )
})

export default EducationCard
