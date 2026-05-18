const store = new Map()
const TTL = 5 * 60 * 1000

export const cacheGet = (key) => {
  const entry = store.get(key)
  if (!entry) return null
  if (Date.now() - entry.ts > TTL) {
    store.delete(key)
    return null
  }
  return entry.data
}

export const cacheSet = (key, data) => {
  store.set(key, { data, ts: Date.now() })
}

export const cacheDelete = (key) => store.delete(key)

export const cacheClear = () => store.clear()

if (typeof window !== "undefined") {
  window.__cacheClear = cacheClear
}
