import Skeleton from "./Skeleton"

const ServicesSkeleton = () => (
  <section className="servicesWrap pb-[4.5rem] md:pb-[5.5rem] lg:pb-[6.5rem] xl:pb-[7.5rem] relative w-full">
    <div className="container mx-auto">
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <Skeleton width="280px" height="2.5rem" className="mx-auto" />
          <Skeleton width="200px" height="1rem" className="mx-auto mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.875rem]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-4 p-10 rounded-[3.125rem] bg-gray/30 min-h-[20rem]">
            <Skeleton width="80px" height="80px" circle />
            <Skeleton width="120px" height="1.5rem" />
            <Skeleton width="100%" height="3rem" />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ServicesSkeleton
