import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SmoothScroll from "../components/SmoothScroll/SmoothScroll"
import { HeaderSkeleton, BottomBarSkeleton } from "../components/Skeleton"
import { detectInitialLanguage, getSupportedLanguage, SUPPORTED_LANGUAGES } from "../i18n/languages"
import i18n from "../i18n"
import HomePage from "../pages/HomePages/HomePage"

const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"))
const StaticPage = lazy(() => import("../pages/StaticPage/StaticPage"))

const PageFallback = () => (
  <main id="main-content" className="min-h-screen bg-[#f6f4ef] grid place-items-center p-8 text-center">
    <div><p className="text-[#2457e6] text-xs font-bold tracking-[.15em] uppercase">YS·DEV</p><p className="mt-3 text-slate-600">{i18n.t("common.loading")}</p></div>
  </main>
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
