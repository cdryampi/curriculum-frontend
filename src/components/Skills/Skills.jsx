import React, { useState } from "react"
import useSkillListCategoryHook from "../../hooks/UseSkillListCategoryHook"
import { SkillCard } from "../SkillCard"
import { SectionTitleIcon } from "../SectionTitles"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { CATEGORIES_LIST } from "../../data/Skill/Skill"
import { SkillsSkeleton } from "../Skeleton"
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
  } = useSkillListCategoryHook("frontend")

  const [pageIndex, setPageIndex] = useState(0)

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    setPageIndex(0)
  }

  const handleNext = () => {
    loadNextPage()
    setPageIndex((i) => i + 1)
  }

  const handlePrev = () => {
    loadPrevPage()
    setPageIndex((i) => i - 1)
  }

  if (error) {
    return (
      <div className="skillsWrap relative w-full">
        <SectionTitleIcon title="Habilidades" />
        <div className="flex flex-col items-center py-8">
          <p className="text-red-400 mb-3">No hemos podido recuperar los datos.</p>
          <button className="bg-accent text-white px-4 py-2 rounded font-bold hover:bg-accent2 transition-colors" onClick={() => setCategory(category)}>Reintentar</button>
        </div>
      </div>
    )
  }

  if (loading && !skills.length) return <SkillsSkeleton />

  return (
    <div className="skillsWrap relative w-full" aria-live="polite">
      <SectionTitleIcon title="Habilidades" />
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(CATEGORIES_LIST).map(([key, value]) => (
          <button
            key={`${key}-${value}`}
            onClick={() => handleCategoryChange(value)}
            className={`border-2 border-cyan-900 p-3 rounded-t-lg text-white font-Poppins font-bold transition-all duration-200 ${
              category === value ? "bg-accent text-white" : "bg-desc2 text-white hover:bg-desc3"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="relative min-h-[200px]">
        {loading && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10 rounded-[3.125rem]">
            <ClipLoader size={40} color="#284be5" />
          </div>
        )}
        <div className={`skillsList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"}`}>
          {skills.map((skill) => (
            <SkillCard key={`${skill.title}-${skill.id}`} skill={skill} />
          ))}
        </div>
      </div>
      {(nextPageURL || prevPageURL) && (
        <div className="pagination flex justify-between items-center mt-5">
          <button
            onClick={handlePrev}
            disabled={!prevPageURL}
            className={`flex items-center justify-center py-2 px-4 rounded shadow transition-colors duration-200 ${
              prevPageURL
                ? "bg-accent2 hover:bg-accent2_dark text-white cursor-pointer"
                : "bg-gray/30 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FiArrowLeft className="mr-2" /> Anterior
          </button>
          <span className="text-white font-Poppins text-sm">Página {pageIndex + 1}</span>
          <button
            onClick={handleNext}
            disabled={!nextPageURL}
            className={`flex items-center justify-center py-2 px-4 rounded shadow transition-colors duration-200 ${
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
