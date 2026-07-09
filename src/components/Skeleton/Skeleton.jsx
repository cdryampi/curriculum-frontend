const Skeleton = ({ width, height, circle, className = "", variant = "default" }) => {
  const tones = {
    default: "from-slate-800/55 via-slate-600/70 to-slate-800/55",
    light: "from-white/50 via-white/80 to-white/50",
    accent: "from-accent/20 via-white/35 to-accent2/20",
  }
  const base = `relative overflow-hidden skeleton-pulse bg-gradient-to-r ${tones[variant] || tones.default} bg-[length:220%_100%] animate-shimmer shadow-[inset_0_1px_0_rgba(255,255,255,.08)]`
  const shape = circle ? "rounded-full" : "rounded-xl"
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

export const ImageSkeleton = ({ className = "", children }) => (
  <div
    role="status"
    aria-hidden="true"
    className={`relative overflow-hidden bg-slate-900/60 border border-white/10 shadow-[0_1.25rem_3.5rem_rgba(15,23,42,.28)] ${className}`}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,.18),transparent_30%),linear-gradient(135deg,rgba(37,99,235,.28),rgba(124,58,237,.2)_45%,rgba(15,23,42,.92))]" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent bg-[length:220%_100%] animate-shimmer" />
    <div className="absolute inset-4 rounded-[inherit] border border-white/10 bg-white/[.03]" />
    {children}
  </div>
)

export default Skeleton
