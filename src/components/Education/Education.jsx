import React from "react";
import { SectionTitleIcon } from "../SectionTitles";
import useEducationList from "../../hooks/UseEducationListHook";
import { ClipLoader } from "react-spinners";
import EducationCard from "../EducationCard/EducationCard";

const Education = () => {
  const { data: educationList, loading, error, refetch } = useEducationList();

  if (error) {
    return (
      <div className="flex flex-col items-center py-8">
        <p className="text-red-500 mb-3">Error al cargar la formación.</p>
        <button className="bg-accent text-white px-4 py-2 rounded font-bold hover:bg-accent2" onClick={refetch}>Reintentar</button>
      </div>
    );
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
            <EducationCard
              education={education}
              key={`${education.title}-${education.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Education;
