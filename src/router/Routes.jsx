import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SmoothScroll from "../components/SmoothScroll/SmoothScroll"
import { HeaderSkeleton, BottomBarSkeleton } from "../components/Skeleton"

const HomePage = lazy(() => import("../pages/HomePages/HomePage"))
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"))
const StaticPage = lazy(() => import("../pages/StaticPage/StaticPage"))

const PageFallback = () => (
  <div className="bg-dark min-h-screen">
    <HeaderSkeleton />
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse text-white/50 text-lg">Cargando...</div>
    </div>
    <BottomBarSkeleton />
  </div>
)

const RouterLinks = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-bold">
        Saltar al contenido principal
      </a>
      <SmoothScroll>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/static-page/:slug" element={<StaticPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default RouterLinks
