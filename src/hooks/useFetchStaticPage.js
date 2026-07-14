import useApiWithCache from "./useApiWithCache"
import { fetchStaticPage } from "../api"
import { useTranslation } from "react-i18next"

const useFetchStaticPage = (slug) => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`staticPage:${lang}:${slug}`, () => fetchStaticPage(slug), [lang, slug])
}

export default useFetchStaticPage
