import useApiWithCache from "./useApiWithCache"
import { fetchStaticPages } from "../api"
import { useTranslation } from "react-i18next"

const useStaticPages = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`staticPages:${lang}`, fetchStaticPages, [lang])
}

export default useStaticPages
