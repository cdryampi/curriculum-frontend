import Skeleton, { ImageSkeleton } from "./Skeleton"

const FeaturedAreaSkeleton = () => (
  <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
    <div className="shaps absolute inset-0 opacity-30" aria-hidden="true" />
    <div className="container mx-auto">
      <div className="grid gap-[1.875rem] md:grid-cols-2 grid-cols-1 items-center">
        <div className="md:order-1 flex justify-center">
          <div className="relative inline-block w-4/5 sm:w-full md:w-full lg:w-[26rem] xl:w-[35rem]">
            <span className="h-[8rem] w-[8rem] sm:h-[14rem] sm:w-[14rem] md:h-[10rem] md:w-[10rem] lg:h-[14rem] lg:w-[14rem] xl:h-[18.75rem] xl:w-[18.75rem] absolute bg-white/20 rounded-full right-[-2.5rem] top-[-2.5rem] md:right-[-3.5rem] md:top-[-3.5rem] lg:right-[-4rem] lg:top-[-4rem] xl:right-[-6.25rem] xl:top-[-6.25rem] z-[1]"></span>
            <span className="h-[8rem] w-[8rem] sm:h-[14rem] sm:w-[14rem] md:h-[10rem] md:w-[10rem] lg:h-[14rem] lg:w-[14rem] xl:h-[18.75rem] xl:w-[18.75rem] absolute bg-dark2/70 rounded-full left-[-2.5rem] bottom-[-2.5rem] md:right-[-3.5rem] md:bottom-[-3.5rem] lg:left-[-4rem] lg:bottom-[-4rem] xl:left-[-6.25rem] xl:bottom-[-6.25rem] z-[1]"></span>
            <ImageSkeleton className="relative z-[2] mx-auto aspect-square w-[280px] max-w-full rounded-full md:w-[350px] xl:w-[460px]">
              <div className="absolute inset-[18%] rounded-full border border-white/15 bg-white/[.04]" />
              <div className="absolute bottom-[18%] left-1/2 h-[28%] w-[48%] -translate-x-1/2 rounded-t-full bg-white/10" />
            </ImageSkeleton>
          </div>
        </div>
        <div className="space-y-5">
          <Skeleton width="180px" height="1.5rem" className="mx-auto md:mx-0" />
          <Skeleton width="320px" height="3.5rem" className="mx-auto md:mx-0" />
          <Skeleton width="250px" height="1.25rem" className="mx-auto md:mx-0" />
          <div className="space-y-2">
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="92%" height="1rem" />
            <Skeleton width="80%" height="1rem" />
          </div>
          <div className="flex gap-6 mt-8 justify-center md:justify-start">
            <Skeleton width="160px" height="3.5rem" />
            <Skeleton width="140px" height="3.5rem" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default FeaturedAreaSkeleton
