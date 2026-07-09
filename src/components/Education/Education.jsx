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
        <SectionTitleIcon title="Formación" />
        <ErrorState message="Error al cargar la formación." onRetry={refetch} />
      </div>
    )
  }

  if (loading) return <EducationSkeleton />

  return (
    <div className="educationWrap relative w-full">
      <SectionTitleIcon title="Formación" />
      {(!educationList || educationList.length === 0) ? (
        <EmptyState
          title="Aún no hay formación registrada"
          description="Pronto compartiré los detalles de mi formación académica."
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
