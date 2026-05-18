import { useState, useEffect, useCallback } from "react"
import { cacheGet, cacheSet } from "./cacheStore"

const useApiWithCache = (cacheKey, fetchFn, deps = []) => {
  const [data, setData] = useState(() => cacheGet(cacheKey))
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFn()
      const result = response.data
      cacheSet(cacheKey, result)
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, deps)

  useEffect(() => {
    const cached = cacheGet(cacheKey)
    if (cached) {
      setData(cached)
      setLoading(false)
      return
    }
    let cancelled = false
    const call = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchFn()
        if (!cancelled) {
          const result = response.data
          cacheSet(cacheKey, result)
          setData(result)
        }
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    call()
    return () => { cancelled = true }
  }, deps)

  return { data, loading, error, refetch: execute }
}

export default useApiWithCache
