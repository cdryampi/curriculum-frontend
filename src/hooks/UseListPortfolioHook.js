import useApiWithCache from "./useApiWithCache"
import { fetchPortfolioList } from "../api"
import { useTranslation } from "react-i18next"

const usePortfolioList = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`portfolio:${lang}`, fetchPortfolioList, [lang])
}

export default usePortfolioList
