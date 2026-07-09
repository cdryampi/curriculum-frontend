import React from "react"
import { SectionTitleIcon } from "../SectionTitles"
import useEducationList from "../../hooks/UseEducationListHook"
import EducationCard from "../EducationCard/EducationCard"
import { EducationSkeleton } from "../Skeleton"
import { EmptyState } from "../EmptyState"
import { ErrorState } from "../ErrorState"

const Education = () => {
  const { data: educationList, loading, error, refetch } = useEducationList()

  if (error) {
    return (
      <div className="educationWrap relative w-full">
        <SectionTitleIcon title="Formaci\u00f3n" />
        <ErrorState message="Error al cargar la formaci\u00f3n." onRetry={refetch} />
      </div>
    )
  }

  if (loading) return <EducationSkeleton />

  return (
    <div className="educationWrap relative w-full">
      <SectionTitleIcon title="Formaci\u00f3n" />
      {(!educationList || educationList.length === 0) ? (
        <EmptyState
          title="A\u00fan no hay formaci\u00f3n registrada"
          description="Pronto compartir\u00e9 los detalles de mi formaci\u00f3n acad\u00e9mica."
        />
      ) : (
        <div className="educationList grid grid-cols-1 md:grid-cols-1 gap-2 p-3 section-fade-in">
          {educationList.map((education) => (
            <EducationCard education={education} key={`${education.title}-${education.id}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Education

