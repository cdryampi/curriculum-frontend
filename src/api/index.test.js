// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import MockAdapter from "axios-mock-adapter"
import { apiClient, fetchSocialLinks, fetchUserProfile } from "./index"
import { getStoredLanguage } from "../i18n/languages"

describe("apiClient", () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(apiClient)
    localStorage.setItem("i18nextLng", "en")
  })

  afterEach(() => {
    mock.restore()
    localStorage.clear()
  })

  it("configures a 15s timeout", () => {
    expect(apiClient.defaults.timeout).toBe(15000)
  })

  it("sends the stored language via Accept-Language", async () => {
    let captured = null
    mock.onGet("/social/private/").reply((config) => {
      captured = config.headers
      return [200, []]
    })
    await fetchSocialLinks()
    expect(captured["Accept-Language"]).toBe("en")
  })

  it("falls back to the browser language when none is stored", async () => {
    localStorage.clear()
    let captured = null
    mock.onGet("/social/private/").reply((config) => {
      captured = config.headers
      return [200, []]
    })
    await fetchSocialLinks()
    expect(captured["Accept-Language"]).toBe(getStoredLanguage())
    expect(getStoredLanguage()).toMatch(/^(es|en|qu)$/)
  })

  it("normalizes timeout errors into a friendly message", async () => {
    mock.onGet("/social/private/").timeout()
    await expect(fetchSocialLinks()).rejects.toThrow(/No se pudo conectar/)
  })

  it("normalizes network errors into a friendly message", async () => {
    mock.onGet("/base/userprofile/private/").networkError()
    await expect(fetchUserProfile()).rejects.toThrow(/No se pudo conectar/)
  })

  it("propagates HTTP errors unchanged", async () => {
    mock.onGet("/social/private/").reply(404, { detail: "Not found" })
    const error = await fetchSocialLinks().catch((e) => e)
    expect(error.response.status).toBe(404)
  })

  it("attaches the JSON content type by default", async () => {
    let captured = null
    mock.onGet("/social/private/").reply((config) => {
      captured = config.headers
      return [200, []]
    })
    await fetchSocialLinks()
    expect(captured["Content-Type"]).toContain("application/json")
  })

  it("does not re-use a stale error normalization", async () => {
    // El interceptor no debe transformar respuestas 2xx.
    mock.onGet("/social/private/").reply(200, [{ id: 1 }])
    const res = await fetchSocialLinks()
    expect(Array.isArray(res.data)).toBe(true)
    expect(vi.isMockFunction(apiClient.interceptors.response)).toBe(false)
  })
})
