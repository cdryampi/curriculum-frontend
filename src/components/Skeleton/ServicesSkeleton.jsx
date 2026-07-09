import Skeleton, { ImageSkeleton } from "./Skeleton"

const ServicesSkeleton = () => (
  <section className="servicesWrap pb-[4.5rem] md:pb-[5.5rem] lg:pb-[6.5rem] xl:pb-[7.5rem] relative w-full">
    <div className="container mx-auto">
      <div className="flex justify-center mb-8">
        <div className="text-center space-y-2">
          <Skeleton width="280px" height="2.5rem" className="mx-auto" />
          <Skeleton width="200px" height="1rem" className="mx-auto" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.875rem]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="relative flex min-h-[20rem] md:min-h-[24.375rem] flex-col items-center justify-center gap-5 overflow-hidden rounded-[10px] sm:rounded-xl md:rounded-[3.125rem] bg-dark2/70 p-6 md:p-7 lg:p-10 xl:p-[3.125rem] text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.15),transparent_32%),linear-gradient(135deg,rgba(37,99,235,.24),rgba(124,58,237,.18))]" />
            <ImageSkeleton className="relative h-24 w-24 rounded-[1.75rem] border-white/15">
              <div className="absolute inset-6 rounded-2xl bg-white/20" />
            </ImageSkeleton>
            <Skeleton width="70%" height="1.5rem" className="relative" variant="light" />
            <div className="relative w-full space-y-2">
              <Skeleton width="100%" height="1rem" variant="light" />
              <Skeleton width="72%" height="1rem" className="mx-auto" variant="light" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ServicesSkeleton
