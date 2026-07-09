const Skeleton = ({ width, height, circle, className = "" }) => {
  const base = "skeleton-pulse bg-gray-700/40 bg-gradient-to-r from-gray-700/40 via-gray-600/60 to-gray-700/40 bg-[length:200%_100%] animate-shimmer"
  const shape = circle ? "rounded-full" : "rounded"
  const style = {
    width: width || "100%",
    height: height || "1rem",
  }
  return (
    <div
      role="status"
      aria-hidden="true"
      className={`${base} ${shape} ${className}`}
      style={style}
    />
  )
}

export default Skeleton
