import Skeleton, { ImageSkeleton } from "./Skeleton"

const AboutUsSkeleton = () => (
  <section className="aboutUsWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem] relative w-full">
    <div className="container mx-auto">
      <div className="flex justify-center mb-12">
        <div className="text-center space-y-2">
          <Skeleton width="220px" height="2.5rem" className="mx-auto" />
          <Skeleton width="300px" height="1.25rem" className="mx-auto" />
        </div>
      </div>
      <div className="aboutUs relative w-full p-[1.25rem] lg:p-[1.875rem] mt-[5.9375rem]">
        <div className="aboutUsBg absolute inset-0 left-0 lg:left-[10.9375rem] rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] bg-gray/70"></div>
        <div className="grid gap-[1.875rem] lg:grid-cols-2 grid-cols-1 relative">
          <div className="aboutImg relative mt-[-5.625rem] ml-0 lg:ml-[-1.875rem]">
            <ImageSkeleton className="relative z-[1] aspect-[4/5] min-h-[22rem] w-full rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem]">
              <div className="absolute bottom-8 left-8 h-20 w-2/3 rounded-2xl bg-white/10" />
            </ImageSkeleton>
          </div>
        <div className="space-y-4 rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] bg-white/85 p-5 md:p-10 lg:px-[3.5rem] xl:px-20 lg:py-12 xl:pt-[4.6875rem] xl:pb-[4.375rem]">
          <Skeleton width="120px" height="2rem" />
          <Skeleton width="200px" height="1.5rem" />
          <div className="space-y-3 mt-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <Skeleton width="80px" height="1.25rem" />
                <Skeleton width="180px" height="1.25rem" />
              </div>
            ))}
          </div>
          <Skeleton width="175px" height="120px" className="mt-[-45px] opacity-40" variant="accent" />
        </div>
        </div>
      </div>
    </div>
  </section>
)

export default AboutUsSkeleton
