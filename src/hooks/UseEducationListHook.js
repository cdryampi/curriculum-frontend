import useApiWithCache from "./useApiWithCache"
import { fetchEducationList } from "../api"
import { useTranslation } from "react-i18next"

const useEducationList = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`education:${lang}`, fetchEducationList, [lang])
}

export default useEducationList
