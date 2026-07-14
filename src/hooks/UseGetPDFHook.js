import useApiWithCache from "./useApiWithCache"
import { fetchUserPDF } from "../api"
import { useTranslation } from "react-i18next"

const usePDF = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`userPDF:${lang}`, fetchUserPDF, [lang])
}

export default usePDF
