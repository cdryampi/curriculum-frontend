import { useParams } from "react-router-dom"
import { getSupportedLanguage } from "../i18n/languages"

const useCurrentLanguage = () => {
  const { lang } = useParams()
  return getSupportedLanguage(lang)
}

export default useCurrentLanguage
