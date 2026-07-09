import Skeleton from "./Skeleton"

const HeaderSkeleton = () => (
  <header className="z-[9999] hidden lg:block" aria-hidden="true">
    <div className="topbar fixed md:top-[1.875rem] lg:top-[4rem] xl:top-[5rem] top-[1.25rem] left-0 w-full z-[9999]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between w-full topbarInner">
          <Skeleton width="120px" height="2rem" />
          <div className="flex gap-4">
            <Skeleton width="60px" height="2rem" />
            <Skeleton width="60px" height="2rem" />
            <Skeleton width="60px" height="2rem" />
          </div>
        </div>
      </div>
    </div>
    <div className="menuWrap hidden lg:flex flex-col items-center justify-between fixed left-[3.4375rem] top-[5.625rem] bottom-[5.625rem] border-2 border-solid border-accent/20 rounded-full z-[9999] w-[6.25rem] px-5 py-[3.125rem]">
      <Skeleton width="32px" height="32px" circle />
      <div className="flex flex-col items-center gap-4">
        <Skeleton width="24px" height="24px" circle />
        <Skeleton width="24px" height="24px" circle />
        <Skeleton width="24px" height="24px" circle />
        <Skeleton width="1px" height="60px" />
      </div>
    </div>
  </header>
)

export default HeaderSkeleton
