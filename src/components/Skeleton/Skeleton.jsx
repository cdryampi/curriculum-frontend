const Skeleton = ({ width, height, circle, className = "" }) => {
  const base = "animate-pulse bg-gray-700/50"
  const shape = circle ? "rounded-full" : "rounded"
  const style = {
    width: width || "100%",
    height: height || "1rem",
  }
  return <div className={`${base} ${shape} ${className}`} style={style} />
}

export default Skeleton
