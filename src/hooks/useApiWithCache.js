import { useState, useEffect, useCallback, useRef } from "react"
import { cacheGet, cacheSet } from "./cacheStore"

const useApiWithCache = (cacheKey, fetchFn, deps = []) => {
  const [data, setData] = useState(() => cacheGet(cacheKey))
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(null)
  const generationRef = useRef(0)
  const inFlightRef = useRef(false)

  const load = useCallback(async () => {
    // Evita lanzar dos peticiones simultáneas para el mismo recurso.
    if (inFlightRef.current) return
    const generation = generationRef.current
    inFlightRef.current = true
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFn()
      if (generation !== generationRef.current) return
      const result = response?.data
      cacheSet(cacheKey, result)
      setData(result)
    } catch (err) {
      if (generation !== generationRef.current) return
      setError(err)
    } finally {
      if (generation === generationRef.current) {
        inFlightRef.current = false
        setLoading(false)
      }
    }
  }, deps)

  useEffect(() => {
    generationRef.current += 1
    inFlightRef.current = false
    const cached = cacheGet(cacheKey)
    if (cached !== null && cached !== undefined) {
      setData(cached)
      setLoading(false)
      setError(null)
      return
    }
    load()
    return () => {
      generationRef.current += 1
      inFlightRef.current = false
    }
  }, deps)

  return { data, loading, error, refetch: load }
}

export default useApiWithCache
