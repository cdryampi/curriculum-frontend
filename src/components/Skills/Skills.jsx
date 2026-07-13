import React, { useState } from "react"
import useSkillListCategoryHook from "../../hooks/UseSkillListCategoryHook"
import { SkillCard } from "../SkillCard"
import { SectionTitleIcon } from "../SectionTitles"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { CATEGORIES_LIST } from "../../data/Skill/Skill"
import { SkillsSkeleton } from "../Skeleton"
import { EmptyState } from "../EmptyState"
import { ErrorState } from "../ErrorState"
import { ClipLoader } from "react-spinners"

const Skills = () => {
  const {
    data: skills,
    loading,
    error,
    loadNextPage,
    nextPageURL,
    loadPrevPage,
    prevPageURL,
    category,
    setCategory,
    refetch,
  } = useSkillListCategoryHook("frontend")

  const [pageIndex, setPageIndex] = useState(0)

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    setPageIndex(0)
  }

  const handleNext = () => {
    if (!nextPageURL) return
    loadNextPage()
    setPageIndex((i) => i + 1)
  }

  const handlePrev = () => {
    if (!prevPageURL) return
    loadPrevPage()
    setPageIndex((i) => i - 1)
  }

  if (error) {
    return (
      <div className="skillsWrap relative w-full">
        <SectionTitleIcon title="Habilidades" />
        <ErrorState message="No hemos podido recuperar los datos." onRetry={refetch} />
      </div>
    )
  }

  if (loading && (!skills || skills.length === 0)) return <SkillsSkeleton />

  return (
    <div className="skillsWrap relative w-full" aria-live="polite">
      <SectionTitleIcon title="Habilidades" />
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Categorías de habilidades">
        {Object.entries(CATEGORIES_LIST).map(([key, value]) => {
          const isActive = category === value
          return (
            <button
              key={`${key}-${value}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleCategoryChange(value)}
              className={`border-2 border-cyan-900 p-3 rounded-t-lg text-white font-Poppins font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive ? "bg-accent text-white" : "bg-dark3 text-white hover:bg-accent2"
              }`}
            >
              {value}
            </button>
          )
        })}
      </div>
      <div className="relative min-h-[200px]">
        {loading && skills && skills.length > 0 && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-[3.125rem] transition-opacity duration-200" aria-hidden="true">
            <ClipLoader size={40} color="#284be5" />
          </div>
        )}
        {(!skills || skills.length === 0) ? (
          <EmptyState
            title="Sin habilidades en esta categoría"
            description="No hay habilidades registradas todavía. Prueba con otra categoría o vuelve más tarde."
          />
        ) : (
          <div className={`skillsList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"} section-fade-in`}>
            {skills.map((skill) => (
              <SkillCard key={`${skill.title}-${skill.id}`} skill={skill} />
            ))}
          </div>
        )}
      </div>
      {(nextPageURL || prevPageURL) && (
        <div className="pagination flex justify-between items-center mt-5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!prevPageURL}
            aria-label="Página anterior"
            className={`flex items-center justify-center py-2 px-4 rounded shadow transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              prevPageURL
                ? "bg-accent2 hover:bg-accent2_dark text-white cursor-pointer"
                : "bg-gray/30 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FiArrowLeft className="mr-2" /> Anterior
          </button>
          <span className="text-white font-Poppins text-sm" aria-live="polite">Página {pageIndex + 1}</span>
          <button
            type="button"
            onClick={handleNext}
            disabled={!nextPageURL}
            aria-label="Página siguiente"
            className={`flex items-center justify-center py-2 px-4 rounded shadow transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              nextPageURL
                ? "bg-accent2 hover:bg-accent2_dark text-white cursor-pointer"
                : "bg-gray/30 text-gray-500 cursor-not-allowed"
            }`}
          >
            Siguiente <FiArrowRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Skills
