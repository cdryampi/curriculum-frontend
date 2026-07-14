import useApiWithCache from "./useApiWithCache"
import { fetchUserProfile } from "../api"
import { useTranslation } from "react-i18next"

const useUserProfile = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`userProfile:${lang}`, fetchUserProfile, [lang])
}

export default useUserProfile
