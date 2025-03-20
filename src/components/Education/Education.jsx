import React from "react";
import { SectionTitleIcon } from "../SectionTitles";
import UseListEducationHook from "../../hooks/UseEducationListHook"; // Assuming you have a similar hook for education
import { ClipLoader } from "react-spinners";
import EducationCard from "../EducationCard/EducationCard";

const Education = () => {
  const { data: educationList, loading, error } = UseListEducationHook();

  if (error) {
    return <div>Error loading educational details.</div>;
  }

  return (
    <div className="educationWrap relative w-full">
      <SectionTitleIcon title="Formación" />
      <div className="educationList grid grid-cols-1 md:grid-cols-1 gap-2 p-3">
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <ClipLoader size={60} color="#284be5" loading={true} />
          </div>
        ) : (
          educationList &&
          educationList.map((education) => (
            <EducationCard education={education} key={education.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Education;
