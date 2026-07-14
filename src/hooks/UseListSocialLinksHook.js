import useApiWithCache from "./useApiWithCache"
import { fetchSocialLinks } from "../api"
import { useTranslation } from "react-i18next"

const useSocialLinks = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`socialLinks:${lang}`, fetchSocialLinks, [lang])
}

export default useSocialLinks
