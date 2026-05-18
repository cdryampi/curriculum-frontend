import Skeleton from "./Skeleton"

const StaticPageSkeleton = () => (
  <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
    <div className="container mx-auto max-w-[73.125rem]">
      <div className="flex flex-col gap-8">
        <Skeleton width="280px" height="2.5rem" />
        <Skeleton width="100%" height="1.5rem" />
        <Skeleton width="100%" height="1.5rem" />
        <Skeleton width="80%" height="1.5rem" />
        <Skeleton width="100%" height="400px" className="rounded-[3.125rem]" />
      </div>
    </div>
  </section>
)

export default StaticPageSkeleton
