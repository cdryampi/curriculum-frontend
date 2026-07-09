import Skeleton, { ImageSkeleton } from "./Skeleton"

const PortfolioSkeleton = () => (
  <section className="portWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem] relative w-full">
    <div className="container mx-auto">
      <div className="flex justify-center mb-8">
        <div className="text-center space-y-2">
          <Skeleton width="240px" height="2.5rem" className="mx-auto" />
          <Skeleton width="320px" height="1rem" className="mx-auto" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl bg-dark2/40 p-3">
            <ImageSkeleton className="aspect-[4/3] w-full rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl">
              <div className="absolute left-6 right-6 bottom-6 space-y-3">
                <Skeleton width="55%" height="1.5rem" variant="light" />
                <Skeleton width="76%" height="1rem" variant="light" />
              </div>
              <div className="absolute right-6 top-6 h-12 w-12 rounded-xl border border-white/20 bg-white/10" />
            </ImageSkeleton>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default PortfolioSkeleton
