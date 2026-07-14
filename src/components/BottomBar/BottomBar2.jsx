import { Link } from "react-router-dom"
import React from "react"
import { useTranslation } from "react-i18next"
import useStaticPages from "../../hooks/UseListStaticPagesHook"
import { BottomBarSkeleton } from "../Skeleton"
import { ErrorState } from "../ErrorState"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

const BottomBar2 = () => {
  const { t } = useTranslation()
  const lang = useCurrentLanguage()
  const { data: staticPageData, loading, error, refetch } = useStaticPages()

  if (error) {
    return (
      <div className="bottomBarWrap relative w-full py-8">
        <div className="container mx-auto">
          <ErrorState message={t("footer.error")} onRetry={refetch} />
        </div>
      </div>
    )
  }

  if (loading) return <BottomBarSkeleton />

  return (
    <div className="bottomBarWrap relative w-full py-8">
      <div className="container mx-auto">
        <div className="bottomBar gap-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <p className="text-desc2 text-[1rem] md:text-[1.0625rem] font-NunitoSans font-semibold">&copy; {new Date().getFullYear()} Yampi. {t("footer.rights")}</p>
          {staticPageData && staticPageData.length > 0 ? (
            <ul className="flex relative divide-x divide-solid -mr-6">
              {staticPageData.map((item) => (
                <li className="text-desc2 text-[1rem] md:text-[1.0625rem] font-NunitoSans font-semibold px-6 leading-none" key={item?.slug}>
                  <Link className="hover:text-accent" to={`/${lang}/static-page/${item?.slug}`} title={item?.title}>{item?.title}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default BottomBar2
