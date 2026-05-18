import Skeleton from "./Skeleton"

const AboutUsSkeleton = () => (
  <section className="aboutUsWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem] relative w-full">
    <div className="container mx-auto">
      <div className="flex justify-center mb-12">
        <div className="text-center">
          <Skeleton width="220px" height="2.5rem" className="mx-auto" />
          <Skeleton width="300px" height="1.25rem" className="mx-auto mt-2" />
        </div>
      </div>
      <div className="grid gap-[1.875rem] lg:grid-cols-2 grid-cols-1">
        <Skeleton width="100%" height="400px" className="rounded-[3.125rem]" />
        <div className="space-y-4">
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
          <Skeleton width="175px" height="235px" className="mt-[-115px]" />
        </div>
      </div>
    </div>
  </section>
)

export default AboutUsSkeleton
