import Skeleton, { ImageSkeleton } from "./Skeleton"

const WorkExpSkeleton = () => (
  <section className="workExpWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem] relative w-full">
    <div className="container mx-auto">
      <div className="flex justify-center mb-8">
        <div className="text-center space-y-2">
          <Skeleton width="240px" height="2.5rem" className="mx-auto" />
          <Skeleton width="280px" height="1rem" className="mx-auto" />
        </div>
      </div>
      <div className="grid gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="grid gap-[1.875rem] xl:grid-cols-2 grid-cols-1 items-center p-6 rounded-[3.125rem] bg-dark2/50">
            <ImageSkeleton className="aspect-[16/9] max-h-[14rem] w-full rounded-[10px] sm:rounded-[1.25rem] lg:rounded-[1.875rem] xl:rounded-[3.125rem]">
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/15" />
            </ImageSkeleton>
            <div className="space-y-3">
              <Skeleton width="80px" height="1rem" />
              <Skeleton width="200px" height="2rem" />
              <Skeleton width="160px" height="1.25rem" />
              <Skeleton width="100%" height="3rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default WorkExpSkeleton
