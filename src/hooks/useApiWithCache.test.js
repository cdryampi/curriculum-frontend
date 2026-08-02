// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act, waitFor } from "@testing-library/react"
import useApiWithCache from "./useApiWithCache"
import { cacheClear } from "./cacheStore"

describe("useApiWithCache", () => {
  beforeEach(() => cacheClear())

  it("fetches on mount when no cache exists", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ data: [1, 2, 3] })
    const { result } = renderHook(() => useApiWithCache("test:mount", fetchFn, []))

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(fetchFn).toHaveBeenCalledTimes(1)
    expect(result.current.data).toEqual([1, 2, 3])
    expect(result.current.error).toBeNull()
  })

  it("reuses cached data without refetching on mount", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ data: "from-api" })
    const { result, unmount } = renderHook(() => useApiWithCache("test:cache", fetchFn, []))
    await waitFor(() => expect(result.current.loading).toBe(false))
    unmount()

    const secondFetch = vi.fn().mockResolvedValue({ data: "should-not-be-called" })
    const { result: cached } = renderHook(() => useApiWithCache("test:cache", secondFetch, []))
    await waitFor(() => expect(cached.current.loading).toBe(false))

    expect(secondFetch).not.toHaveBeenCalled()
    expect(cached.current.data).toBe("from-api")
  })

  it("refetch updates data and cache", async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({ data: "v1" })
      .mockResolvedValueOnce({ data: "v2" })
    const { result } = renderHook(() => useApiWithCache("test:refetch", fetchFn, []))

    await waitFor(() => expect(result.current.data).toBe("v1"))
    await act(async () => {
      await result.current.refetch()
    })

    expect(result.current.data).toBe("v2")
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })

  it("sets an error when the fetch rejects", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("boom"))
    const { result } = renderHook(() => useApiWithCache("test:error", fetchFn, []))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toEqual(new Error("boom"))
    expect(result.current.data).toBeNull()
  })

  it("ignores stale responses after unmount", async () => {
    let resolveFetch
    const fetchFn = vi.fn().mockReturnValue(new Promise((resolve) => { resolveFetch = resolve }))
    const { unmount } = renderHook(() => useApiWithCache("test:stale", fetchFn, []))
    unmount()
    resolveFetch({ data: "stale" })
    // No debe lanzar errores por setState tras desmontar.
    await new Promise((r) => setTimeout(r, 10))
  })
})
