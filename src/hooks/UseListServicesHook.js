import useApiWithCache from "./useApiWithCache"
import { fetchServicesList } from "../api"
import { useTranslation } from "react-i18next"

const useServicesList = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`services:${lang}`, fetchServicesList, [lang])
}

export default useServicesList
