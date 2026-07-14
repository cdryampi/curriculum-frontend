import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SmoothScroll from "../components/SmoothScroll/SmoothScroll"
import { HeaderSkeleton, BottomBarSkeleton } from "../components/Skeleton"
import { detectInitialLanguage, getSupportedLanguage, SUPPORTED_LANGUAGES } from "../i18n/languages"
import i18n from "../i18n"

const HomePage = lazy(() => import("../pages/HomePages/HomePage"))
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"))
const StaticPage = lazy(() => import("../pages/StaticPage/StaticPage"))

const PageFallback = () => (
  <div className="bg-dark min-h-screen">
    <HeaderSkeleton />
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse text-white/50 text-lg">{i18n.t("common.loading")}</div>
    </div>
    <BottomBarSkeleton />
  </div>
)

const SkipLink = () => {
  const { t } = useTranslation()
  return (
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-bold">
      {t("nav.skip")}
    </a>
  )
}

const LanguageRedirect = () => {
  const location = useLocation()
  return <Navigate to={`/${detectInitialLanguage()}${location.search}${location.hash}`} replace />
}

const LanguageLayout = () => {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const location = useLocation()
  const isSupported = SUPPORTED_LANGUAGES.some((language) => language.code === lang)
  const language = getSupportedLanguage(lang)

  useEffect(() => {
    if (isSupported && i18n.resolvedLanguage !== language) {
      i18n.changeLanguage(language)
    }
  }, [i18n, isSupported, language])

  if (!isSupported) {
    return <Navigate to={`/${detectInitialLanguage()}${location.pathname}${location.search}${location.hash}`} replace />
  }

  if (i18n.resolvedLanguage !== language) {
    return <PageFallback />
  }

  return <Outlet />
}

const RouterLinks = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SkipLink />
      <SmoothScroll>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<LanguageRedirect />} />
            <Route path="/:lang" element={<LanguageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="404" element={<ErrorPage />} />
              <Route path="static-page/:slug" element={<StaticPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default RouterLinks
