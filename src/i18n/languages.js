export const DEFAULT_LANGUAGE = "es"

export const SUPPORTED_LANGUAGES = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
  { code: "qu", label: "QU", name: "Runasimi" },
]

const SUPPORTED_CODES = SUPPORTED_LANGUAGES.map((language) => language.code)

export const getSupportedLanguage = (language) => {
  const code = language?.split("-")[0]?.toLowerCase()
  return SUPPORTED_CODES.includes(code) ? code : DEFAULT_LANGUAGE
}

export const getStoredLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE
  return getSupportedLanguage(localStorage.getItem("i18nextLng") || navigator.language)
}

export const detectInitialLanguage = () => getStoredLanguage()
