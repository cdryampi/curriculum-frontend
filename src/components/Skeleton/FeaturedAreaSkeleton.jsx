import Skeleton from "./Skeleton"

const FeaturedAreaSkeleton = () => (
  <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
    <div className="container mx-auto">
      <div className="grid gap-[1.875rem] md:grid-cols-2 grid-cols-1 items-center">
        <div className="md:order-1 flex justify-center">
          <div className="relative inline-block">
            <Skeleton width="280px" height="280px" circle className="md:w-[350px] md:h-[350px]" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton width="180px" height="1.5rem" />
          <Skeleton width="320px" height="3.5rem" />
          <Skeleton width="250px" height="1.25rem" />
          <Skeleton width="100%" height="4rem" />
          <div className="flex gap-6 mt-8">
            <Skeleton width="160px" height="3.5rem" />
            <Skeleton width="140px" height="3.5rem" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default FeaturedAreaSkeleton
