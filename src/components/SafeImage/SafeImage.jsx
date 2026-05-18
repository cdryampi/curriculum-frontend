import { useState, useEffect } from "react"

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23333' width='400' height='300'/%3E%3Ctext fill='%23777' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImagen no disponible%3C/text%3E%3C/svg%3E"

const SafeImage = ({ src, alt, className, loading, fetchpriority, ...props }) => {
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setError(false)
    setImgSrc(src)
  }, [src])

  const handleError = () => {
    if (!error) {
      setError(true)
      setImgSrc(FALLBACK)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      className={className}
      loading={loading}
      fetchpriority={fetchpriority}
      onError={handleError}
      {...props}
    />
  )
}

export default SafeImage
