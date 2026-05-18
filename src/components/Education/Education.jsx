import React from "react"
import { SectionTitleIcon } from "../SectionTitles"
import useEducationList from "../../hooks/UseEducationListHook"
import EducationCard from "../EducationCard/EducationCard"
import { EducationSkeleton } from "../Skeleton"

const Education = () => {
  const { data: educationList, loading, error, refetch } = useEducationList()

  if (error) {
    return (
      <div className="educationWrap relative w-full">
        <SectionTitleIcon title="Formación" />
        <div className="flex flex-col items-center py-8">
          <p className="text-red-400 mb-3">Error al cargar la formación.</p>
          <button className="bg-accent text-white px-4 py-2 rounded font-bold hover:bg-accent2" onClick={refetch}>Reintentar</button>
        </div>
      </div>
    )
  }

  if (loading) return <EducationSkeleton />

  return (
    <div className="educationWrap relative w-full">
      <SectionTitleIcon title="Formación" />
      <div className="educationList grid grid-cols-1 md:grid-cols-1 gap-2 p-3">
        {educationList && educationList.map((education) => (
          <EducationCard education={education} key={`${education.title}-${education.id}`} />
        ))}
      </div>
    </div>
  )
}

export default Education
