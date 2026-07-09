import Skeleton, { ImageSkeleton } from "./Skeleton"

const StaticPageSkeleton = () => (
  <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
    <div className="container mx-auto max-w-[73.125rem]">
      <div className="flex flex-col gap-6">
        <Skeleton width="280px" height="2.5rem" className="mx-auto md:mx-0" />
        <div className="space-y-3">
          <Skeleton width="100%" height="1.25rem" />
          <Skeleton width="100%" height="1.25rem" />
          <Skeleton width="80%" height="1.25rem" />
          <Skeleton width="100%" height="1.25rem" />
          <Skeleton width="60%" height="1.25rem" />
        </div>
        <ImageSkeleton className="aspect-[16/9] min-h-[16rem] w-full rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem]">
          <div className="absolute bottom-8 left-8 right-8 space-y-3">
            <Skeleton width="45%" height="1.5rem" variant="light" />
            <Skeleton width="70%" height="1rem" variant="light" />
          </div>
        </ImageSkeleton>
      </div>
    </div>
  </section>
)

export default StaticPageSkeleton
