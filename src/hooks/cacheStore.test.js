import { describe, it, expect, beforeEach, vi } from "vitest"
import { cacheGet, cacheSet, cacheDelete, cacheClear } from "./cacheStore"

describe("cacheStore", () => {
  beforeEach(() => {
    cacheClear()
  })

  it("returns null for missing keys", () => {
    expect(cacheGet("missing")).toBeNull()
  })

  it("stores and retrieves values", () => {
    cacheSet("k", { foo: 1 })
    expect(cacheGet("k")).toEqual({ foo: 1 })
  })

  it("deletes entries explicitly", () => {
    cacheSet("k", 42)
    cacheDelete("k")
    expect(cacheGet("k")).toBeNull()
  })

  it("expires entries after the TTL", () => {
    const now = vi.spyOn(Date, "now")
    now.mockReturnValue(1_000)
    cacheSet("k", "v")
    now.mockReturnValue(1_000 + 5 * 60 * 1000 + 1)
    expect(cacheGet("k")).toBeNull()
    now.mockRestore()
  })
})
