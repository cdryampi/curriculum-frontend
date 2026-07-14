import React from "react"
import { useTranslation } from "react-i18next"
import { SectionTitleIcon } from "../SectionTitles"
import useEducationList from "../../hooks/UseEducationListHook"
import EducationCard from "../EducationCard/EducationCard"
import { EducationSkeleton } from "../Skeleton"
import { EmptyState } from "../EmptyState"
import { ErrorState } from "../ErrorState"

const Education = () => {
  const { t } = useTranslation()
  const { data: educationList, loading, error, refetch } = useEducationList()

  if (error) {
    return (
      <div className="educationWrap relative w-full">
        <SectionTitleIcon title={t("education.title")} />
        <ErrorState message={t("education.error")} onRetry={refetch} />
      </div>
    )
  }

  if (loading) return <EducationSkeleton />

  return (
    <div className="educationWrap relative w-full">
      <SectionTitleIcon title={t("education.title")} />
      {(!educationList || educationList.length === 0) ? (
        <EmptyState
          title={t("education.emptyTitle")}
          description={t("education.emptyDesc")}
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
