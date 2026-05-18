import Skeleton from "./Skeleton"

const SocialLinksSkeleton = () => (
  <div className="socialLinks flex flex-col items-center justify-center gap-5">
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} width="24px" height="24px" circle />
    ))}
  </div>
)

export default SocialLinksSkeleton
