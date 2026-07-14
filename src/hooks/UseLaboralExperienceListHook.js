import useApiWithCache from "./useApiWithCache"
import { fetchLaboralExperience } from "../api"
import { useTranslation } from "react-i18next"

const useLaboralExperience = () => {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  return useApiWithCache(`workExperience:${lang}`, fetchLaboralExperience, [lang])
}

export default useLaboralExperience
