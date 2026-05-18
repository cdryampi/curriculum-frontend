import Skeleton from "./Skeleton"

const PortfolioSkeleton = () => (
  <section className="portWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem] relative w-full">
    <div className="container mx-auto">
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <Skeleton width="240px" height="2.5rem" className="mx-auto" />
          <Skeleton width="320px" height="1rem" className="mx-auto mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} width="100%" height="400px" className="rounded-[3.125rem]" />
        ))}
      </div>
    </div>
  </section>
)

export default PortfolioSkeleton
