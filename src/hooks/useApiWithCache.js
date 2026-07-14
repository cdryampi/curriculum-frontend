import { useState, useEffect, useCallback, useRef } from "react"
import { cacheGet, cacheSet } from "./cacheStore"

const useApiWithCache = (cacheKey, fetchFn, deps = []) => {
  const [data, setData] = useState(() => cacheGet(cacheKey))
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(null)
  const cancelledRef = useRef(false)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFn()
      if (cancelledRef.current) return
      const result = response?.data
      cacheSet(cacheKey, result)
      setData(result)
    } catch (err) {
      if (!cancelledRef.current) setError(err)
    } finally {
      if (!cancelledRef.current) setLoading(false)
    }
  }, deps)

  useEffect(() => {
    cancelledRef.current = false
    const cached = cacheGet(cacheKey)
    if (cached !== null && cached !== undefined) {
      setData(cached)
      setLoading(false)
      setError(null)
      return
    }
    const call = async () => {
      setData(null)
      setLoading(true)
      setError(null)
      try {
        const response = await fetchFn()
        if (cancelledRef.current) return
        const result = response?.data
        cacheSet(cacheKey, result)
        setData(result)
      } catch (err) {
        if (!cancelledRef.current) setError(err)
      } finally {
        if (!cancelledRef.current) setLoading(false)
      }
    }
    call()
    return () => {
      cancelledRef.current = true
    }
  }, deps)

  return { data, loading, error, refetch: execute }
}

export default useApiWithCache
