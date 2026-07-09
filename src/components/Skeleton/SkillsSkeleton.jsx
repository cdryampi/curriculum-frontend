import Skeleton from "./Skeleton"

const SkillsSkeleton = () => (
  <div className="skillsWrap relative w-full">
    <div className="flex justify-center mb-4">
      <Skeleton width="160px" height="2rem" />
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} width="90px" height="2.5rem" className="rounded-t-lg" />
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-[3.125rem] p-6 bg-gray/30 flex flex-col items-center gap-3 min-h-[11rem]">
          <Skeleton width="70px" height="70px" circle />
          <Skeleton width="100px" height="1.25rem" />
        </div>
      ))}
    </div>
  </div>
)

export default SkillsSkeleton
