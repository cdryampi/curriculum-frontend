import Skeleton from "./Skeleton"

const BottomBarSkeleton = () => (
  <div className="bottomBarWrap relative w-full py-8">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 min-h-[1.5rem]">
        <Skeleton width="220px" height="1.25rem" />
        <div className="flex gap-6">
          <Skeleton width="80px" height="1.25rem" />
          <Skeleton width="100px" height="1.25rem" />
        </div>
      </div>
    </div>
  </div>
)

export default BottomBarSkeleton
