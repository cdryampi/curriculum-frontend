import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { API_BASE_URL } from '../config'
import { fetchSkillFilterNextPrev } from '../api/index'
import { cacheGet, cacheSet } from './cacheStore'

const CATEGORY_CACHE_PREFIX = 'skills:'

const useSkillListCategoryHook = (initialCategory) => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  const [category, setCategoryState] = useState(initialCategory)
  const cacheKey = `${CATEGORY_CACHE_PREFIX}${lang}:${category}`
  const [data, setData] = useState(() => cacheGet(`${CATEGORY_CACHE_PREFIX}${lang}:${initialCategory}`) || [])
  const [loading, setLoading] = useState(!cacheGet(`${CATEGORY_CACHE_PREFIX}${lang}:${initialCategory}`))
  const [error, setError] = useState(null)
  const [nextPageURL, setNextPageURL] = useState(null)
  const [prevPageURL, setPrevPageURL] = useState(null)

  const fetchSkills = useCallback((url = `${API_BASE_URL}/education_and_skills/skill_list_category/${category}/`) => {
    const cached = !url.includes('page=') ? cacheGet(cacheKey) : null
    if (cached) {
      setData(cached.data)
      setNextPageURL(cached.next)
      setPrevPageURL(cached.prev)
      setLoading(false)
      return
    }
    setLoading(true)
    fetchSkillFilterNextPrev(url)
      .then(response => {
        const results = response.data.results
        const next = response.data.next
        const previous = response.data.previous
        if (!url.includes('page=')) {
          cacheSet(cacheKey, { data: results, next, prev: previous })
        }
        setData(results)
        setNextPageURL(next)
        setPrevPageURL(previous)
        setLoading(false)
      })
      .catch(err => {
        setError(`Error fetching data: ${err.response ? err.response.data.message || err.message : err.message}`)
        setLoading(false)
      })
  }, [cacheKey, category])

  useEffect(() => {
    setNextPageURL(null)
    setPrevPageURL(null)
    fetchSkills()
  }, [category, fetchSkills])

  const setCategory = (newCategory) => {
    if (newCategory !== category) {
      setCategoryState(newCategory)
    }
  }

  const loadNextPage = () => nextPageURL && fetchSkills(nextPageURL)
  const loadPrevPage = () => prevPageURL && fetchSkills(prevPageURL)

  const refetch = () => fetchSkills()

  return { data, loading, error, loadNextPage, loadPrevPage, nextPageURL, prevPageURL, category, setCategory, refetch }
}

export default useSkillListCategoryHook
