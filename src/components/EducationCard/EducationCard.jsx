import React, { useState } from 'react';
import { BsPlus } from "react-icons/bs";
import { TagsDisplay } from '../Tag';

const EducationCard = ({ education }) => {
    const [expand, setExpand] = useState(false);

    const toggleExpand = () => {
        setExpand(!expand);
    };


    return (
        <div key={education.id} className="eduBox bg-white relative rounded-[10px] sm:rounded-[1.25rem] lg:rounded-[1.875rem] xl:rounded-[3.125rem] gap-2 flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left p-2 md:p-10 w-full">
            <div className="eduBoxInfo flex flex-col md:flex-row items-center gap-2">
                  <span onClick={toggleExpand} className="bg-gray rounded-[10px] h-[3.125rem] w-[3.125rem] inline-flex items-center justify-center">
                    <BsPlus className="fill-accent" size="2.3rem"></BsPlus>
                  </span>
            </div>
            <div className="text-accent2 text-[1.375rem] font-Poppins font-bold">
                <h3 className="text-accent2 text-[1.375rem] font-Poppins font-bold">
                    {education.title}
                </h3>
                <h4 className="text-accent text-[1.375rem] font-Poppins font-bold">
                    {education.subtitle}
                </h4>
                <p>
                    <span className="text-accent font-NunitoSans font-semibold text-[1rem] md:text-[1.0625rem]">
                        {education.institution}
                    </span>
                </p>
                <p className="group-hover:text-desc text-desc2 text-[1rem] md:text-[1.125rem] font-NunitoSans mt-2">
                    <span className="eduDate gradBg2 relative rounded-[10px] text-white font-Poppins font-medium text-[1rem] bg-accent overflow-hidden px-5 py-[7px] z-[1] before:opacity-30">
                            {education.start_year} - {education.end_year}
                    </span>
                </p>
                <div className="educationDescription group-hover:text-desc text-desc1 text-[1rem] md:text-[1.125rem] font-NunitoSans mt-2 p-2">
                    {expand ? (
                        <div className='mb-3' dangerouslySetInnerHTML={{ __html: education.description }} />
                    ) : (
                        <>
                            <span dangerouslySetInnerHTML={{ __html: (education.short_description_preview) }} />
                        </>
                    )}
                    {expand ? (
                        <TagsDisplay tags={education?.tags} />
                    ):(
                        <>
                        </>
                    )}

                </div> 
            </div>

        </div>

    );
};

export default EducationCard;