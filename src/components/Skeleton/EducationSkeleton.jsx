import Skeleton from "./Skeleton"

const EducationSkeleton = () => (
  <div className="educationWrap relative w-full">
    <div className="flex justify-center mb-4">
      <Skeleton width="160px" height="2rem" />
    </div>
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white/10 rounded-[3.125rem] p-6 flex items-center gap-4">
          <Skeleton width="50px" height="50px" circle />
          <div className="flex-1 space-y-2">
            <Skeleton width="180px" height="1.25rem" />
            <Skeleton width="140px" height="1rem" />
            <Skeleton width="100px" height="0.875rem" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default EducationSkeleton
